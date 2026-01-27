import axios from 'axios';
import type { Article } from '../types/article';
import type { GeminiTopicResponse } from '../types/topic';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const generateContent = async (prompt: string) => {
    if (!GEMINI_API_KEY) {
        console.warn('Gemini API Key is missing');
        return null;
    }
    try {
        const response = await axios.post(
            `${BASE_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            }
        );

        if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
            return response.data.candidates[0].content.parts[0].text;
        }
        return null;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return null; // Return null gracefully
    }
};

export const summarizeArticle = async (title: string, description: string): Promise<string> => {
    const prompt = `Summarize this AI news article in 2-3 concise sentences, highlighting the key insights: Title: ${title}, Description: ${description}. Provide a clear, informative summary suitable for quick reading.`;
    const result = await generateContent(prompt);
    return result || "Summary unavailable.";
};

export const getKeyInsights = async (articleTitles: string[]): Promise<string[]> => {
    const titlesList = articleTitles.slice(0, 20).join('\n');
    const prompt = `Based on these recent AI news headlines, identify 3 key trends or themes: \n${titlesList}\n. Provide 3 bullet points of key insights.`;
    const result = await generateContent(prompt);
    if (!result) return [];

    return result.split('\n')
        .filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('*') || /^\d+\./.test(line.trim()))
        .map((line: string) => line.replace(/^[-*\d\.]+\s*/, '').trim())
        .filter(Boolean);
};

export const optimizeSearchQuery = async (query: string): Promise<string> => {
    const prompt = `Act as an expert search query optimizer for a technical AI news database. Convert the following user input into a precise, high-quality Boolean search string for a News API.
    User Input: "${query}"
    
    Rules:
    1. Expand with relevant technical synonyms (e.g., "AI" -> "Artificial Intelligence").
    2. Use OR operators for related terms.
    3. Keep it concise but comprehensive.
    4. Return ONLY the search string. No explanations.
    
    Example:
    Input: "robots"
    Output: "robotics" OR "robots" OR "humanoid" OR "Boston Dynamics"`;

    try {
        const text = await generateContent(prompt);
        return text ? text.replace(/"/g, '').trim() : query; // naive cleanup, but API usually handles quotes fine. actually news API likes quotes for phrases.
        // Let's trust Gemini's output but trim it.
    } catch (e) {
        console.error("Gemini query optimization failed", e);
        return query;
    }
};

export const categorizeArticles = async (articles: Article[]): Promise<GeminiTopicResponse> => {
    // ... existing code ...
    const inputs = articles.map((a, i) => `${i}. ${a.title}`).join('\n');
    const prompt = `Analyze these ${articles.length} AI news article titles. Categorize them into exactly these 6 distinct topics:
    
    1. "Machine Learning" (ML trends, algorithms, technical updates)
    2. "Generative AI" (Image generation, video gen, creative AI)
    3. "LLMs" (Large Language Models, ChatGPT, Gemini, Claude, text generation)
    4. "Neural Networks" (Deep learning research, architectures)
    5. "Ethics & Regulation" (Safety, policy, laws, bias, societal impact)
    6. "General AI" (Broad news, business, industry updates, or anything not fitting above)

    For each topic, provide: 1) The exact topic name from the list above, 2) A list of article indices that belong to this topic. Ensure every article is assigned to exactly one category (best fit). Return the response in strictly valid JSON format: {"topics": [{"name": "topic name", "articleIndices": [0, 5, 12, ...]}, ...]}. Do not include markdown code blocks. \n\n${inputs}`;

    try {
        const text = await generateContent(prompt);
        if (!text) return { topics: [] };

        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to categorize", e);
        return { topics: [] };
    }
}
