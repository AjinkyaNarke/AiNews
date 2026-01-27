import type { Article } from '../../types/article';
import { ArticleCard } from './ArticleCard';

export const ArticleGrid = ({ articles }: { articles: Article[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {articles.map((article, idx) => (
                <ArticleCard key={`${article.url}-${idx}`} article={article} />
            ))}
        </div>
    );
};
