const ML_SERVICE_URL = 'http://127.0.0.1:5001';

export const trainMLModel = async () => {
    try {
        console.log('Training ML model...');
        const response = await fetch(`${ML_SERVICE_URL}/train`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({})
        });
        const data = await response.json();
        console.log('Training response:', data);
        return data;
    } catch (error) {
        console.error('Error training ML model:', error.message);
        throw error;
    }
};

export const predictRiskScore = async (transaction) => {
    try {
        console.log('Predicting risk score for transaction:', transaction);
        const response = await fetch(`${ML_SERVICE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
        const data = await response.json();
        console.log('Prediction response:', data);
        return data;
    } catch (error) {
        console.error('Error predicting risk score:', error.message);
        throw error;
    }
}; 

export const callMLServiceHealthCheck = async () => {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/health`);
        return await response.json();
    } catch (error) {
        console.error('Error checking health:', error.message);
        throw error;
    }
};

