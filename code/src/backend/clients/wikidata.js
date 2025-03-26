import fetch from 'node-fetch';

class WikiDataClient {
    constructor() {
        this.baseUrl = "https://www.wikidata.org";
    }

    async getEntityData(entityId) {
        const url = `${this.baseUrl}/wiki/Special:EntityData/${entityId}.json`;
        const response = await fetch(url);
        const data = await response.json();
        return data.entities[entityId];
    }

    async searchEntities(query) {
        const url = `${this.baseUrl}/w/api.php`;
        
        // Clean and prepare the search query
        const cleanQuery = query.trim()
            .replace(/[^\w\s&.-]/g, '') // Remove special characters except &, ., and -
            .replace(/\s+/g, ' ');      // Normalize whitespace
        
        // Create variations of the company name for better matching
        const queryVariations = [
            cleanQuery,
            cleanQuery.replace(/\s+/g, ''), // Remove spaces
            ...cleanQuery.split(/[\s&.-]+/) // Split into individual words
        ].filter(q => q.length > 1); // Filter out single characters
        
        // Search for all variations
        const searchPromises = queryVariations.map(async searchTerm => {
            const params = new URLSearchParams({
                action: "wbsearchentities",
                format: "json",
                language: "en",
                type: "item",
                search: searchTerm,
                limit: "10", // Increase limit to get more potential matches
                origin: "*"  // Required for CORS
            });
            
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            return data.search || [];
        });
        
        // Get all search results
        const searchResults = await Promise.all(searchPromises);
        
        // Flatten and deduplicate results
        const uniqueResults = Array.from(new Map(
            searchResults.flat()
                .map(item => [item.id, item])
        ).values());
        
        // Score and sort results
        const scoredResults = uniqueResults.map(result => {
            let score = 0;
            const resultLabel = (result.label || '').toLowerCase();
            const resultDesc = (result.description || '').toLowerCase();
            const originalQuery = query.toLowerCase();
            
            // Exact match gets highest score
            if (resultLabel === originalQuery) score += 100;
            // Starts with query
            if (resultLabel.startsWith(originalQuery)) score += 50;
            // Contains query
            if (resultLabel.includes(originalQuery)) score += 30;
            // Description contains query
            if (resultDesc.includes(originalQuery)) score += 10;
            // Contains individual words from query
            originalQuery.split(/\s+/).forEach(word => {
                if (resultLabel.includes(word.toLowerCase())) score += 5;
            });
            
            return { ...result, score };
        });
        
        // Sort by score and return top results
        const sortedResults = scoredResults
            .sort((a, b) => b.score - a.score)
            .filter(result => result.score > 0)
            .map(({ id, label, description }) => ({
                id,
                label,
                description: description || "No description available"
            }));
            
        return sortedResults.length > 0 ? sortedResults : null;
    }

    async getPersonData(personId) {
        const data = await this.getEntityData(personId);
        return {
            name: data.labels?.en?.value,
            description: data.descriptions?.en?.value
        };
    }

    extractValue(claims, property) {
        return claims?.[property]?.[0]?.mainsnak?.datavalue?.value;
    }
}

export const wikiDataClient = new WikiDataClient();