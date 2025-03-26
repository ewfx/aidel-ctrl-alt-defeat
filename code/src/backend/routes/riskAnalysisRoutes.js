import express from 'express';
import multer from "multer";
import riskAnalysisController from '../controllers/riskAnalysisController.js';

const upload = multer({ storage: multer.memoryStorage() });
const riskAnalysisRouter = express.Router()
riskAnalysisRouter.post('/calculate-risk', upload.single('file'), riskAnalysisController.calculateRisk)
riskAnalysisRouter.get('/health', riskAnalysisController.healthCheck)

export default riskAnalysisRouter