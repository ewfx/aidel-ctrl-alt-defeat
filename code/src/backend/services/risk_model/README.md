# Risk Analysis Model Service

This service provides a machine learning-based risk analysis model for financial transactions. It uses XGBoost to predict risk scores and SHAP for model interpretability.

## Setup

1. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Service

Start the Flask server:
```bash
python risk_model.py
```
