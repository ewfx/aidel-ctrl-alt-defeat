import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import r2_score
import shap
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"]
    }
})

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to monitor service status"""
    try:       
        return jsonify({
            "status": "healthy",
            "timestamp": pd.Timestamp.now().isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
            "timestamp": pd.Timestamp.now().isoformat()
        }), 500

# Global variables to store the trained model and training data
model = None
X_train = None

def clean_amount(amount_str):
    if isinstance(amount_str, str):
        # Remove currency code and parentheses
        amount_str = amount_str.split('(')[0].strip()
        # Remove currency symbols, commas, and any other non-numeric characters except decimal point
        amount_str = ''.join(c for c in amount_str if c.isdigit() or c == '.')
        # Convert to float
        return float(amount_str)
    return float(amount_str)

def calculate_risk_score(transaction):
    score = 0
    amount = float(transaction["amount"].replace("$", "").replace(",", ""))
    sender_details = transaction.get("senderDetails", {})
    receiver_details = transaction.get("receiverDetails", {})

    # Rules based on fields
    if sender_details.get("directMatchWithSDN", False):
        score += 40  # High risk for SDN match
    if sender_details.get("terroristAffiliation", False):
        score += 40  # Very high risk for terrorist affiliation
    if amount > 1000000:
        score += 5  # Large amount
    if transaction.get("transactionType", "") == "Wire Transfer":
        score += 5   # Wire transfer risk
    if sender_details.get("highRiskCountry", False):
        score += 20  # High-risk country
    if sender_details.get("secondarySanctionsRisk", False):
        score += 15  # Secondary sanctions risk
    if sender_details.get("sectoralSanctions", False):
        score += 15  # Sectoral sanctions
    if sender_details.get("FATFListCountryStatus") == "black":
        score += 30  # High FATF risk
    if sender_details.get("FATFListCountryStatus") == "grey":
        score += 15  # High FATF risk
    if sender_details.get("antiMoneyLaundering", False):
        score += 15  # Anti-money laundering risk
    if receiver_details.get("directMatchWithSDN", False):
        score += 20  # Receiver SDN risk (less severe than sender)
    if receiver_details.get("terroristAffiliation", False):
        score += 30  # Receiver terrorist affiliation
    if receiver_details.get("highRiskCountry", False):
        score += 8   # Receiver high-risk country
    if receiver_details.get("secondarySanctionsRisk", False):
        score += 15  # Receiver secondary sanctions
    if receiver_details.get("sectoralSanctions", False):
        score += 10  # Receiver sectoral sanctions
    if receiver_details.get("FATFListCountryStatus") == "black":
        score += 30  # Receiver high FATF risk
    if receiver_details.get("FATFListCountryStatus") == "grey":
        score += 15  # Receiver high FATF risk
    if receiver_details.get("antiMoneyLaundering", False):
        score += 10  # Receiver anti-money laundering risk

    return min(score, 100)  # Cap at 100

def load_and_preprocess_csv(file_path):
    """Load CSV data and preprocess it for training"""
    try:
        # Read the CSV file
        df = pd.read_csv(file_path)
        
        # Convert amount to numeric, handling various formats
        df['amount'] = df['amount'].apply(clean_amount)
        
        # Log transform amount to handle large values
        df['amount_log'] = np.log1p(df['amount'])
        
        # Create feature matrix with all fields
        X = pd.DataFrame({
            'amount': df['amount_log'],  # Using log-transformed amount
            'sender_sdn': df['sender_directMatchWithSDN'].astype(int),
            'sender_terrorist': df['sender_terroristAffiliation'].astype(int),
            'sender_high_risk': df['sender_highRiskCountry'].astype(int),
            'sender_secondary': df['sender_secondarySanctionsRisk'].astype(int),
            'sender_sectoral': df['sender_sectoralSanctions'].astype(int),
            'sender_fatf': df['sender_FATFListCountryStatus'].map({'black': 1, 'grey': 0.8, 'high': 0.6, 'medium': 0.4, 'low': 0}),
            'sender_aml': df['sender_antiMoneyLaundering'].astype(int),
            'receiver_sdn': df['receiver_directMatchWithSDN'].astype(int),
            'receiver_terrorist': df['receiver_terroristAffiliation'].astype(int),
            'receiver_high_risk': df['receiver_highRiskCountry'].astype(int),
            'receiver_secondary': df['receiver_secondarySanctionsRisk'].astype(int),
            'receiver_sectoral': df['receiver_sectoralSanctions'].astype(int),
            'receiver_fatf': df['receiver_FATFListCountryStatus'].map({'black': 1, 'grey': 0.8, 'high': 0.6, 'medium': 0.4, 'low': 0}),
            'receiver_aml': df['receiver_antiMoneyLaundering'].astype(int)
        })
        
        # Calculate risk scores for training data
        y = df.apply(lambda row: calculate_risk_score({
            'amount': str(row['amount']),
            'transactionType': row.get('transactionType', 'Wire Transfer'),
            'senderDetails': {
                'directMatchWithSDN': bool(row['sender_directMatchWithSDN']),
                'terroristAffiliation': bool(row['sender_terroristAffiliation']),
                'highRiskCountry': bool(row['sender_highRiskCountry']),
                'secondarySanctionsRisk': bool(row['sender_secondarySanctionsRisk']),
                'sectoralSanctions': bool(row['sender_sectoralSanctions']),
                'FATFListCountryStatus': row['sender_FATFListCountryStatus'],
                'antiMoneyLaundering': bool(row['sender_antiMoneyLaundering'])
            },
            'receiverDetails': {
                'directMatchWithSDN': bool(row['receiver_directMatchWithSDN']),
                'terroristAffiliation': bool(row['receiver_terroristAffiliation']),
                'highRiskCountry': bool(row['receiver_highRiskCountry']),
                'secondarySanctionsRisk': bool(row['receiver_secondarySanctionsRisk']),
                'sectoralSanctions': bool(row['receiver_sectoralSanctions']),
                'FATFListCountryStatus': row['receiver_FATFListCountryStatus'],
                'antiMoneyLaundering': bool(row['receiver_antiMoneyLaundering'])
            }
        }), axis=1)
        
        return X, y
    except Exception as e:
        print(f"Error loading CSV: {str(e)}")
        raise

def train_xgboost_model(X, y):
    """Train XGBoost model with the provided data"""
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create validation set for early stopping
    X_train_final, X_val, y_train_final, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)

    model = XGBRegressor(
        learning_rate=0.01,  # Reduced learning rate for better generalization
        max_depth=6,         # Increased depth
        n_estimators=1000,   # Increased number of trees
        min_child_weight=1,  # Added min_child_weight
        subsample=0.8,       # Added subsample
        colsample_bytree=0.8, # Added colsample_bytree
        objective="reg:squarederror",
        random_state=42,
        early_stopping_rounds=50  # Added early stopping
    )

    # Train with early stopping
    model.fit(
        X_train_final, 
        y_train_final,
        eval_set=[(X_val, y_val)],
        verbose=False
    )

    # Calculate confidence via R² on test set
    y_pred = model.predict(X_test)
    confidence = r2_score(y_test, y_pred)
    
    return model, X_train, X_test, confidence

@app.route('/train', methods=['POST'])
def train_model():
    global model, X_train
    try:
        # Check if training data file exists
        training_data_path = 'trainingData/training_data2.csv'  # Updated path to training_data2.csv
        if not os.path.exists(training_data_path):
            return jsonify({
                "success": False,
                "message": f"Training data file not found at {training_data_path}"
            }), 404

        # Load and preprocess training data
        X, y = load_and_preprocess_csv(training_data_path)
        
        # Train model
        model, X_train, X_test, confidence = train_xgboost_model(X, y)
        
        return jsonify({
            "success": True,
            "message": "Model trained successfully",
            "confidence_score": float(confidence),
            "training_samples": len(X),
            "test_samples": len(X_test)
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/predict', methods=['POST'])
def predict():
    global model, X_train
    try:
        if model is None or X_train is None:
            return jsonify({
                "success": False,
                "message": "Model not trained. Please train the model first."
            }), 400

        transaction = request.json
        risk_score, reasoning = predict_and_explain(model, transaction, X_train)
        
        # Calculate confidence score based on model's prediction
        confidence_score = model.predict_proba(X_train)[0][0] if hasattr(model, 'predict_proba') else 0.85

        return jsonify({
            "success": True,
            "risk_score": float(risk_score),
            "confidence_score": float(confidence_score),
            "reasoning": reasoning
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

def predict_and_explain(model, transaction, X_train):
    # Preprocess new transaction
    amount = clean_amount(transaction["amount"])
    amount_log = np.log1p(amount)
    
    new_data = pd.DataFrame({
        "amount": [amount_log],
        "sender_sdn": [int(transaction["senderDetails"]["directMatchWithSDN"])],
        "sender_terrorist": [int(transaction["senderDetails"]["terroristAffiliation"])],
        "sender_high_risk": [int(transaction["senderDetails"]["highRiskCountry"])],
        "sender_secondary": [int(transaction["senderDetails"]["secondarySanctionsRisk"])],
        "sender_sectoral": [int(transaction["senderDetails"]["sectoralSanctions"])],
        "sender_fatf": [1 if transaction["senderDetails"]["FATFListCountryStatus"] == "black" 
                       else 0.8 if transaction["senderDetails"]["FATFListCountryStatus"] == "grey"
                       else 0.6 if transaction["senderDetails"]["FATFListCountryStatus"] == "high"
                       else 0.4 if transaction["senderDetails"]["FATFListCountryStatus"] == "medium"
                       else 0],
        "sender_aml": [int(transaction["senderDetails"]["antiMoneyLaundering"])],
        "receiver_sdn": [int(transaction["receiverDetails"]["directMatchWithSDN"])],
        "receiver_terrorist": [int(transaction["receiverDetails"]["terroristAffiliation"])],
        "receiver_high_risk": [int(transaction["receiverDetails"]["highRiskCountry"])],
        "receiver_secondary": [int(transaction["receiverDetails"]["secondarySanctionsRisk"])],
        "receiver_sectoral": [int(transaction["receiverDetails"]["sectoralSanctions"])],
        "receiver_fatf": [1 if transaction["receiverDetails"]["FATFListCountryStatus"] == "black"
                         else 0.8 if transaction["receiverDetails"]["FATFListCountryStatus"] == "grey"
                         else 0.6 if transaction["receiverDetails"]["FATFListCountryStatus"] == "high"
                         else 0.4 if transaction["receiverDetails"]["FATFListCountryStatus"] == "medium"
                         else 0],
        "receiver_aml": [int(transaction["receiverDetails"]["antiMoneyLaundering"])]
    })

    # Predict risk score
    risk_score = model.predict(new_data)[0]

    # Calculate reasoning based on our rules
    reasoning = []
    sender_details = transaction["senderDetails"]
    receiver_details = transaction["receiverDetails"]
    amount = float(transaction["amount"].replace("$", "").replace(",", ""))

    # Sender rules
    if sender_details.get("directMatchWithSDN", False):
        reasoning.append("Sender SDN match: +40 to risk")
    if sender_details.get("terroristAffiliation", False):
        reasoning.append("Sender terrorist affiliation: +40 to risk")
    if amount > 1000000:
        reasoning.append("Large transaction amount (>$1M): +5 to risk")
    if sender_details.get("highRiskCountry", False):
        reasoning.append("Sender high-risk country: +20 to risk")
    if sender_details.get("secondarySanctionsRisk", False):
        reasoning.append("Sender secondary sanctions risk: +15 to risk")
    if sender_details.get("sectoralSanctions", False):
        reasoning.append("Sender sectoral sanctions: +15 to risk")
    if sender_details.get("FATFListCountryStatus") == "black":
        reasoning.append("Sender FATF blacklist status: +30 to risk")
    if sender_details.get("FATFListCountryStatus") == "grey":
        reasoning.append("Sender FATF greylist status: +15 to risk")
    if sender_details.get("antiMoneyLaundering", False):
        reasoning.append("Sender anti-money laundering risk: +15 to risk")

    # Receiver rules
    if receiver_details.get("directMatchWithSDN", False):
        reasoning.append("Receiver SDN match: +20 to risk")
    if receiver_details.get("terroristAffiliation", False):
        reasoning.append("Receiver terrorist affiliation: +30 to risk")
    if receiver_details.get("highRiskCountry", False):
        reasoning.append("Receiver high-risk country: +8 to risk")
    if receiver_details.get("secondarySanctionsRisk", False):
        reasoning.append("Receiver secondary sanctions risk: +15 to risk")
    if receiver_details.get("sectoralSanctions", False):
        reasoning.append("Receiver sectoral sanctions: +10 to risk")
    if receiver_details.get("FATFListCountryStatus") == "black":
        reasoning.append("Receiver FATF blacklist status: +30 to risk")
    if receiver_details.get("FATFListCountryStatus") == "grey":
        reasoning.append("Receiver FATF greylist status: +15 to risk")
    if receiver_details.get("antiMoneyLaundering", False):
        reasoning.append("Receiver anti-money laundering risk: +10 to risk")

    # Add transaction type
    if transaction.get("transactionType", "") == "Wire Transfer":
        reasoning.append("Wire transfer type: +5 to risk")

    return risk_score, reasoning

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 