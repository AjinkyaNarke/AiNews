import { ExternalLink, Share2, Bookmark, Sparkles, Clock } from 'lucide-react';
import type { Article } from '../../types/article';
import { formatDistanceToNow } from 'date-fns';

interface FeaturedArticleProps {
    article: Article;
}

const countryMap: Record<string, { flag: string; name: string }> = {
    US: { flag: '/flag/us.png', name: 'USA' },
    IN: { flag: '/flag/in.png', name: 'India' },
    GB: { flag: '/flag/gb.png', name: 'UK' },
    AU: { flag: '/flag/au.png', name: 'Australia' },
    CA: { flag: '/flag/ca.png', name: 'Canada' },
    JP: { flag: '/flag/jp.png', name: 'Japan' },
    DE: { flag: '/flag/de.png', name: 'Germany' },
    FR: { flag: '/flag/fr.png', name: 'France' },
    BR: { flag: '/flag/br.png', name: 'Brazil' },
    RU: { flag: '/flag/ru.png', name: 'Russia' },
    CN: { flag: '/flag/cn.png', name: 'China' },
    ZA: { flag: '/flag/za.png', name: 'South Africa' },
    ES: { flag: '/flag/es.png', name: 'Spain' },
    IT: { flag: '/flag/it.png', name: 'Italy' },
    KR: { flag: '/flag/kr.png', name: 'South Korea' },
    ID: { flag: '/flag/id.png', name: 'Indonesia' },
    NL: { flag: '/flag/nl.png', name: 'Netherlands' },
    SA: { flag: '/flag/sa.png', name: 'Saudi Arabia' },
    SE: { flag: '/flag/se.png', name: 'Sweden' },
    CH: { flag: '/flag/ch.png', name: 'Switzerland' }
};

export const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
    const code = article.countryCode || 'US';
    // Use lower case code for file path if not found in map, as a fallback strategy? 
    // Actually our map handles specific names. For others, we might want a generic fallback.
    const country = countryMap[code] || { flag: `/flag/${code.toLowerCase()}.png`, name: code };

    return (
        <div className="group relative rounded-3xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 mb-8 border border-white/10 dark:border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-80 lg:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse-slow" />
                    {article.urlToImage && (
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-900/10 lg:to-slate-900/90 pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white shadow-lg shadow-primary-500/30">
                            <Sparkles className="w-3 h-3" />
                            Featured Source
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 md:p-10 flex flex-col justify-center gap-6 bg-white/40 dark:bg-[#0a0a0b]/60 backdrop-blur-md">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-primary-600 dark:text-primary-400">
                                <span className="flex items-center gap-1.5">
                                    <img
                                        src={country.flag}
                                        alt={country.name}
                                        className="w-4 h-3 object-cover rounded-sm shadow-sm"
                                        onError={(e) => { (e.target as HTMLImageElement).src = '/flag/us.png'; }}
                                    />
                                    <span className="text-xs font-semibold">{country.name}</span>
                                </span>
                                <div className="w-px h-3 bg-slate-300 dark:bg-white/20" />
                                <span>{article.source}</span>
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) : 'Recently'}
                            </span>
                        </div>

                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block group/title">
                            <h2 className="text-2xl md:text-4xl font-bold font-display leading-tight text-slate-900 dark:text-white group-hover/title:text-primary-500 transition-colors">
                                {article.title}
                            </h2>
                        </a>

                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                            {article.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/10">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10 dark:shadow-white/10"
                        >
                            Read Full Story
                            <ExternalLink className="w-4 h-4" />
                        </a>

                        <div className="flex items-center gap-2">
                            <button className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-all">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-all">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
