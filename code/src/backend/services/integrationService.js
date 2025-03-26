import { getContent } from "../clients/gemini.js";
import { getAllNews } from "./newsService.js";
import { prompts } from "../utils/prompts.js";

export const analyzeTransactionComprehensively = async (transaction, mlPrediction) => {
    try {
        // Fetch news related to both sender and receiver
        const senderNews = await getAllNews(transaction.sender);
        const receiverNews = await getAllNews(transaction.receiver);

        // Prepare the LLM analysis prompt without ML results
        const llmPrompt = prompts.comprehensiveAnalysis
            .replace('__TRANSACTION_DATA__', JSON.stringify(transaction))
            .replace('__SENDER_NEWS__', JSON.stringify(senderNews))
            .replace('__RECEIVER_NEWS__', JSON.stringify(receiverNews));
        // Get LLM analysis
        const llmResult = await getContent(llmPrompt);
        console.log(llmResult);
        const parsedLLMResult = JSON.parse(llmResult.replace('```json\n', '').replace('```', ''));

        // Combine ML and LLM summary results
        const combinedAnalysis = {
            transactionId: transaction.transactionId,
            Entities: parsedLLMResult.summary.Entity_Names,
            EntityType: parsedLLMResult.summary.Entity_Types,
            RiskScore: calculateFinalRiskScore(mlPrediction.risk_score, parsedLLMResult.summary.Risk_Score),
            SupportingEvidence: parsedLLMResult.summary.Supporting_Evidence,
            ConfidenceScore: calculateFinalConfidenceScore(mlPrediction.confidence_score, parsedLLMResult.summary.Confidence_Score),
            Reason: parsedLLMResult.summary.Reason,
            timestamp: new Date().toISOString()
        };
        console.log("combinedAnalysis : ",combinedAnalysis);
        return {
            detailedAnalysis: parsedLLMResult.detailedAnalysis,
            combinedAnalysis: combinedAnalysis
        };
    } catch (error) {
        console.error('Error in comprehensive analysis:', error);
        throw error;
    }
};

const calculateFinalRiskScore = (mlScore, llmScore) => {
    // Weighted average of ML and LLM scores
    // You can adjust these weights based on your confidence in each model
    const mlWeight = 0.4;
    const llmWeight = 0.6;
    return Math.max((mlScore * mlWeight + llmScore * llmWeight).toFixed(4), mlScore, llmScore);
}; 

const calculateFinalConfidenceScore = (mlScore, llmScore) => {
    // Weighted average of ML and LLM scores
    // You can adjust these weights based on your confidence in each model
    const mlWeight = 0.4;
    const llmWeight = 0.6;
    return Math.max((mlScore * mlWeight + llmScore * llmWeight).toFixed(4), mlScore, llmScore);
}; 