import { getContent } from "../clients/gemini.js";
import fetchGoogleNewsArticles from "../clients/googleNewsApi.js";
import getNegativeNewsByKeywords from "../clients/newsApi.js";
import { prompts } from "../utils/prompts.js";

export const getAllNews = async (query) => {
    try {
        const googleNews = await fetchGoogleNewsArticles(query)
        const newsApiNews = await getNegativeNewsByKeywords(query)
        const allNews = [...newsApiNews, ...googleNews]
        const prompt = prompts.analyzeNews.replace('__NEWS_DATA__', JSON.stringify(allNews));
        const result = (await getContent(prompt)).replace('```json\n', '').replace('```', '');
        const jsonResult = JSON.parse(result);
        return jsonResult
    } catch (error) {
        console.error('Error fetching news articles:', error.message);
        return
    }
}

console.log(await getAllNews('Wells Fargo'));