import dotenv from 'dotenv';
dotenv.config();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY
export const PORT = process.env.PORT || 3000
export const NEWS_API_KEY = process.env.NEWS_API_KEY

// OFAC API URL & Key

export const OFAC_KEY = process.env.OFAC_KEY;
export const OFAC_SOURCES = ["sdn", "nonsdn", "un", "ofsi", "eu", "dpl", "sema", "bfs", "mxsat", "lfiu"];
