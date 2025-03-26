import pdf from 'pdf-parse';
import { getContent } from "../clients/gemini.js";
import { prompts } from './prompts.js';

export const parsePdf = async (fileBuffer) => {
    try {
        const data = await pdf(fileBuffer);
        const parsedData = data.text;
        const prompt = prompts.parseText.replace('__TRANSACTION_DETAILS__', parsedData);
        const result = (await getContent(prompt)).replace('```json\n', '').replace('```', '');
        const jsonResult = JSON.parse(result);
        // Handle both array and single object responses
        const transactions = Array.isArray(jsonResult) ? jsonResult : [jsonResult];
        return transactions;
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF: ' + error.message);
    }
};