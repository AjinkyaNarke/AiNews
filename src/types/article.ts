export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    source: string;
    content?: string;
    aiSummary?: string;
    category?: string;
    countryCode?: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}
