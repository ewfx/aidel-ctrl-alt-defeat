import axios from 'axios';

const FATF_API_URL = "https://countryrisk.ondorse.co/countries/fatf";

// Cache mechanism
let countriesCache = {
    black: new Set(),
    grey: new Set(),
    lastUpdate: null,
    lastFetchTime: null
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Fetches and caches FATF data
 * @private
 */
const updateFATFData = async () => {
    try {
        // Return cached data if valid
        if (countriesCache.lastFetchTime && 
            (Date.now() - countriesCache.lastFetchTime < CACHE_DURATION)) {
            return;
        }

        const response = await axios.get(FATF_API_URL);
        const data = response.data;

        // Update cache
        countriesCache.black = new Set(data.black.countries.map(country => country.name));
        countriesCache.grey = new Set(data.grey.countries.map(country => country.name));
        countriesCache.lastUpdate = data.black.last_update;
        countriesCache.lastFetchTime = Date.now();

    } catch (error) {
        console.error('Failed to fetch FATF data:', error.message);
        throw new Error('Failed to fetch FATF country risk data');
    }
};

/**
 * Checks if a country is in FATF black or grey list
 * @param {string} countryName - The name of the country to check
 * @returns {Promise<"black" | "grey" | "none">} The country's FATF list status
 */
export const checkCountryFATFStatus = async (countryName) => {
    try {
        await updateFATFData();
        
        if (countriesCache.black.has(countryName)) {
            return "black";
        }
        if (countriesCache.grey.has(countryName)) {
            return "grey";
        }
        return "none";
    } catch (error) {
        console.error('Error checking country FATF status:', error.message);
        return "none";
    }
};

/**
 * Gets all high-risk countries (combined black and grey lists)
 * @returns {Promise<string[]>} Array of all high-risk country names
 */
export const getHighRiskCountries = async () => {
    try {
        await updateFATFData();
        // Combine and return all countries from both lists
        return [...Array.from(countriesCache.black), ...Array.from(countriesCache.grey)];
    } catch (error) {
        console.error('Error getting high-risk countries:', error.message);
        return [];
    }
};