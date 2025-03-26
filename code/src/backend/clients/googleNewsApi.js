import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const fetchGoogleNewsArticles = async (query) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        const rssUrl = `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-US`;

        const response = await fetch(rssUrl);
        const xmlText = await response.text();
        const parsedResult = await parseStringPromise(xmlText, { explicitArray: false, trim: true });

        const rawArticles = Array.isArray(parsedResult.rss.channel.item)
            ? parsedResult.rss.channel.item
            : [parsedResult.rss.channel.item];

        return rawArticles.map(article => ({
            source: { id: null, name: article.source?._ || "Unknown Source" },
            author: article.source?._ || "Unknown Author",
            title: article.title || "No Title",
            description: article.description?.replace(/<[^>]*>/g, '').trim() || "No Description",
            url: article.link || "#",
            urlToImage: null, // Google News RSS does not provide image URLs
            publishedAt: new Date(article.pubDate).toISOString(),
            content: article.description?.replace(/<[^>]*>/g, '').trim() || "No Content"
        }));
    } catch (error) {
        console.error('Error fetching news articles:', error.message);
        return [];
    }
}

export default fetchGoogleNewsArticles 