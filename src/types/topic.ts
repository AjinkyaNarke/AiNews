import type { Article } from './article';

export interface TopicCategory {
    name: string;
    articles: Article[];
    icon: string;
    color: string;
    count: number;
}

export interface GeminiTopicResponse {
    topics: {
        name: string;
        articleIndices: number[];
    }[];
}
