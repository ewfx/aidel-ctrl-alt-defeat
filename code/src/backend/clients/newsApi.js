import fetch from "node-fetch";
import { NEWS_API_KEY } from "../utils/constants.js";

// Alternative version using negative keywords if sentiment analysis isn't available
const getNegativeNewsByKeywords = async (query) => {
    const negativeKeywords = [
        "scandal", "crime", "attack", "protest", "war",
        "controversy", "crisis", "accusation", "violence",
        "death", "resign", "investigation", "fraud", "corruption"
    ];

    const queryWithNegatives = `${query} (${negativeKeywords.join(" OR ")})`;
    return getNewsArticles(queryWithNegatives);
};

const getNewsArticles = async (query) => {
    try {
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.status === "ok" ? data.articles : [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};

export default getNegativeNewsByKeywords
