import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../utils/constants.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const getContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export { getContent };

