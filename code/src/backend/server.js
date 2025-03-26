// Import Express
import express from 'express';
import { PORT } from './utils/constants.js';
import riskAnalysisRouter from './routes/riskAnalysisRoutes.js';

// Create an Express application
const app = express();
const port = PORT
app.use(express.json());


// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/risk-analysis', riskAnalysisRouter)


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});