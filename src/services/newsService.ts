import axios from 'axios';
import { optimizeSearchQuery } from './geminiService';
import type { Article, NewsResponse } from '../types/article';

// API Keys
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const NEWSDATA_API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

// URLs
const NEWSAPI_BASE_URL = 'https://newsapi.org/v2';
const GNEWS_BASE_URL = 'https://gnews.io/api/v4';
const NEWSDATA_BASE_URL = 'https://newsdata.io/api/1';

// Provider Availability
const HAS_NEWSDATA = !!NEWSDATA_API_KEY;
const HAS_GNEWS = !!GNEWS_API_KEY;
const HAS_NEWSAPI = !!NEWS_API_KEY;

const apiClient = axios.create();

// Helper to infer country from URL TLD
const getCountryCode = (url: string): string => {
    try {
        const hostname = new URL(url).hostname;
        const parts = hostname.split('.');
        const tld = parts[parts.length - 1];
        const secondTld = parts.length > 2 ? parts[parts.length - 2] : null;

        if (tld === 'in') return 'IN';
        if (tld === 'uk' || (secondTld === 'co' && tld === 'uk')) return 'GB';
        if (tld === 'au' || (secondTld === 'com' && tld === 'au')) return 'AU';
        if (tld === 'ca') return 'CA';
        if (tld === 'jp') return 'JP';
        if (tld === 'de') return 'DE';
        if (tld === 'fr') return 'FR';
        if (tld === 'br') return 'BR';
        if (tld === 'ru') return 'RU';
        if (tld === 'cn') return 'CN';
        // Tech news defaults
        if (tld === 'com' || tld === 'net' || tld === 'org' || tld === 'io' || tld === 'ai') return 'US';

        return 'US'; // Default to US/Global for unknown
    } catch {
        return 'US';
    }
};

// Transformers
const transformNewsDataArticle = (article: any): Article => ({
    title: article.title,
    description: article.description,
    url: article.link,
    urlToImage: article.image_url,
    publishedAt: article.pubDate,
    source: article.source_id,
    content: article.content,
    countryCode: article.country ? article.country[0].toUpperCase() : getCountryCode(article.link)
});

const transformGNewsArticle = (article: any): Article => ({
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.image,
    publishedAt: article.publishedAt,
    source: article.source.name,
    content: article.content,
    countryCode: getCountryCode(article.url)
});

const transformNewsAPIArticle = (article: any): Article => ({
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    source: article.source.name,
    content: article.content,
    countryCode: getCountryCode(article.url)
});

// Expanded strict query
const AI_STRICT_QUERY = `
"artificial intelligence" OR "machine learning" OR "generative AI" OR "large language model" OR "LLM" OR 
"OpenAI" OR "Anthropic" OR "DeepMind" OR "Google Gemini" OR "Claude AI" OR "Perplexity AI" OR "Meta Llama" OR 
"AI Agents" OR "Multimodal AI" OR "Reasoning Models" OR "Neural Network" OR 
"NVIDIA H100" OR "NVIDIA B200" OR "AI Chips" OR "TPU" OR "Neural Engine" OR 
"Hugging Face" OR "Mistral AI" OR "Open Source LLMs" OR "Local AI"
`.replace(/\n/g, ' ').trim();

// --- Aggregation & Deduplication Logic ---

const fetchFromNewsData = async (params: any): Promise<Article[]> => {
    if (!HAS_NEWSDATA) return [];
    try {
        console.log(`[NewsService] Fetching from NewsData.io...`);
        const response = await apiClient.get(`${NEWSDATA_BASE_URL}/latest`, {
            params: {
                apikey: NEWSDATA_API_KEY,
                language: 'en',
                removeduplicate: 1,
                ...params
            },
        });
        const results = response.data.results || [];
        console.log(`[NewsService] NewsData returned ${results.length} articles.`);
        return results.map(transformNewsDataArticle);
    } catch (e) {
        console.error('[NewsService] NewsData fetch failed:', e);
        return [];
    }
};

const fetchFromGNews = async (params: any): Promise<Article[]> => {
    if (!HAS_GNEWS) return [];
    try {
        console.log(`[NewsService] Fetching from GNews...`);
        const response = await apiClient.get(`${GNEWS_BASE_URL}/search`, {
            params: {
                apikey: GNEWS_API_KEY,
                lang: 'en',
                sortby: 'publishedAt',
                ...params
            },
        });
        const articles = response.data.articles || [];
        console.log(`[NewsService] GNews returned ${articles.length} articles.`);
        return articles.map(transformGNewsArticle);
    } catch (e) {
        console.error('[NewsService] GNews fetch failed:', e);
        return [];
    }
};

const fetchFromNewsAPI = async (endpoint: string, params: any): Promise<Article[]> => {
    if (!HAS_NEWSAPI) return [];
    try {
        console.log(`[NewsService] Fetching from NewsAPI...`);
        const response = await apiClient.get<NewsResponse>(`${NEWSAPI_BASE_URL}/${endpoint}`, {
            params: {
                apiKey: NEWS_API_KEY,
                language: 'en',
                ...params
            },
        });
        const articles = response.data.articles || [];
        console.log(`[NewsService] NewsAPI returned ${articles.length} articles.`);
        return articles
            .filter(a => a.title !== '[Removed]')
            .map(transformNewsAPIArticle);
    } catch (e) {
        console.error('[NewsService] NewsAPI fetch failed:', e);
        return [];
    }
};

const deduplicateArticles = (articles: Article[]): Article[] => {
    const seenMap = new Map<string, boolean>();
    return articles.filter(article => {
        // Create a unique key based on normalized title or URL
        // Titles are often slightly different, but URL is usually unique.
        // We'll try to use URL first, if not available, use Title.
        const titleKey = article.title.toLowerCase().trim().slice(0, 50); // First 50 chars of title
        const urlKey = article.url;

        if (seenMap.has(urlKey) || seenMap.has(titleKey)) {
            return false;
        }
        seenMap.set(urlKey, true);
        seenMap.set(titleKey, true);
        return true;
    });
};

const sortArticles = (articles: Article[]): Article[] => {
    // Sort: Images first, then by date (newest first)
    return articles.sort((a, b) => {
        // Prioritize images
        if (a.urlToImage && !b.urlToImage) return -1;
        if (!a.urlToImage && b.urlToImage) return 1;

        // Then Sort by date
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA; // Descending
    });
};

// --- Main Service Functions ---

export const fetchAINews = async (pageSize = 20): Promise<Article[]> => {
    try {
        console.log('[NewsService] Starting aggregated fetch for AI News...');

        // 1. Define promises for each source
        const newsDataPromise = fetchFromNewsData({
            q: 'Artificial Intelligence,LLM,Gemini,Claude,Chatgpt,Ai Models',
            country: 'us,gb,ae,in,fr',
            category: 'technology,science,health,environment,education',
        });

        const gNewsPromise = fetchFromGNews({
            q: AI_STRICT_QUERY,
            max: pageSize
        });

        const newsApiPromise = fetchFromNewsAPI('everything', {
            q: AI_STRICT_QUERY,
            sortBy: 'publishedAt',
            pageSize,
        });

        // 2. Wait for all to settle
        const results = await Promise.allSettled([newsDataPromise, gNewsPromise, newsApiPromise]);

        // 3. Collect successful results
        let allArticles: Article[] = [];

        // Log detailed breakdown
        const newsDataCount = results[0].status === 'fulfilled' ? results[0].value.length : 0;
        const gNewsCount = results[1].status === 'fulfilled' ? results[1].value.length : 0;
        const newsApiCount = results[2].status === 'fulfilled' ? results[2].value.length : 0;
        const newsDataStatus = results[0].status;
        const gNewsStatus = results[1].status;
        const newsApiStatus = results[2].status;

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                allArticles = [...allArticles, ...result.value];
            }
        });

        // 4. Deduplicate & Sort
        const uniqueArticles = deduplicateArticles(allArticles);
        const finalArticles = sortArticles(uniqueArticles);

        console.log(`
[NewsService Integration Summary]
----------------------------------------
Source      | Status      | Count
----------------------------------------
NewsData.io | ${newsDataStatus === 'fulfilled' ? 'OK' : 'ERR'}          | ${newsDataCount}
GNews       | ${gNewsStatus === 'fulfilled' ? 'OK' : 'ERR'}          | ${gNewsCount}
NewsAPI     | ${newsApiStatus === 'fulfilled' ? 'OK' : 'ERR'}          | ${newsApiCount}
----------------------------------------
Total Raw   |             | ${allArticles.length}
Unique      |             | ${finalArticles.length}
----------------------------------------
        `);
        return finalArticles;
    } catch (error) {
        console.error('Error fetching aggregated AI news:', error);
        return [];
    }
};

export const searchNews = async (query: string, pageSize = 10): Promise<Article[]> => {
    try {
        const originalQuery = query.trim();
        console.log(`[NewsService] Optimizing query with Gemini: "${originalQuery}"...`);

        const optimizedQuery = await optimizeSearchQuery(originalQuery);
        const finalQuery = optimizedQuery || originalQuery;

        console.log(`[NewsService] Search Query: "${finalQuery}"`);

        const newsDataPromise = fetchFromNewsData({
            q: finalQuery
        });

        const gNewsPromise = fetchFromGNews({
            q: finalQuery,
            sortby: 'relevance',
            max: pageSize
        });

        const newsApiPromise = fetchFromNewsAPI('everything', {
            q: finalQuery,
            sortBy: 'relevancy',
            pageSize
        });

        const results = await Promise.allSettled([newsDataPromise, gNewsPromise, newsApiPromise]);

        let allArticles: Article[] = [];
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                allArticles = [...allArticles, ...result.value];
            }
        });

        const uniqueArticles = deduplicateArticles(allArticles);
        const finalArticles = sortArticles(uniqueArticles);

        return finalArticles;
    } catch (error) {
        console.error('Error searching aggregated news:', error);
        return [];
    }
};

export const fetchNewsByCountry = async (countryCode: string, countryName: string, pageSize = 20): Promise<Article[]> => {
    try {
        console.log(`[NewsService] Fetching AI news for ${countryName} (${countryCode})...`);

        // NewsData
        const newsDataPromise = fetchFromNewsData({
            q: 'Artificial Intelligence, Global Tech',
            country: countryCode.toLowerCase(), // Note: NewsData might not support all codes
        });

        // GNews
        const gNewsPromise = fetchFromGNews({
            q: AI_STRICT_QUERY,
            country: countryCode.toLowerCase(),
            max: pageSize
        });

        // NewsAPI (Top Headlines for better country precision)
        const newsApiPromise = fetchFromNewsAPI('top-headlines', {
            country: countryCode.toLowerCase(),
            category: 'technology',
            pageSize
        });

        const results = await Promise.allSettled([newsDataPromise, gNewsPromise, newsApiPromise]);

        let allArticles: Article[] = [];
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                allArticles = [...allArticles, ...result.value];
            }
        });

        const uniqueArticles = deduplicateArticles(allArticles);
        const finalArticles = sortArticles(uniqueArticles);

        console.log(`[NewsService] Found ${finalArticles.length} aggregated articles for ${countryCode}.`);
        return finalArticles;

    } catch (error) {
        console.error('Error fetching aggregated country news:', error);
        return [];
    }
};
