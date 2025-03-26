import { getContent } from "../clients/gemini.js";
import { prompts } from './prompts.js';

export const parseText = async (fileBuffer) => {
    try {
        const parsedData = fileBuffer.toString('utf-8'); // Convert buffer to string
        const prompt = prompts.parseText.replace('__TRANSACTION_DETAILS__', parsedData);
        const result = (await getContent(prompt)).replace('```json\n', '').replace('```', '');
        const jsonResult = JSON.parse(result);
        console.log(jsonResult);
        return jsonResult;
    } catch (error) {
        throw new Error('Failed to parse text file: ' + error.message);
    }
};

