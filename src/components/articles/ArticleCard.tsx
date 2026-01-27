import type { Article } from '../../types/article';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ExternalLink, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

export const ArticleCard = ({ article }: { article: Article }) => {
    const code = article.countryCode || 'US';
    // Use lower case code for file path if not found in map, as a fallback strategy? 
    // Actually our map handles specific names. For others, we might want a generic fallback.
    const country = countryMap[code] || { flag: `/flag/${code.toLowerCase()}.png`, name: code };

    return (
        <div className="group flex flex-col glass-card overflow-hidden h-full relative z-0">
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden">
                {article.urlToImage ? (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />

                        {/* Source Badge - Floating on Image */}
                        <div className="absolute top-3 left-3 z-20">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                                <span className="flex items-center gap-1.5">
                                    <img
                                        src={country.flag}
                                        alt={country.name}
                                        className="w-4 h-3 object-cover rounded-sm shadow-sm"
                                        onError={(e) => { (e.target as HTMLImageElement).src = '/flag/us.png'; }} // Fallback to US if custom flag fails
                                    />
                                    <span className="text-xs text-slate-200">{country.name}</span>
                                </span>
                                <div className="w-px h-3 bg-white/20" />
                                <span className="text-white">{article.source}</span>
                            </span>
                        </div>

                        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                            <button className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-primary-500 transition-colors">
                                <Bookmark size={14} />
                            </button>
                            <button className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-primary-500 transition-colors">
                                <Share2 size={14} />
                            </button>
                        </div>

                        <LazyLoadImage
                            src={article.urlToImage}
                            alt={article.title}
                            effect="blur"
                            width="100%"
                            height="100%"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            wrapperClassName="w-full h-full"
                        />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-sm mb-4 relative z-10">
                            <span className="flex items-center gap-1.5">
                                <img
                                    src={country.flag}
                                    alt={country.name}
                                    className="w-4 h-3 object-cover rounded-sm shadow-sm"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/flag/us.png'; }}
                                />
                                <span className="text-xs text-white/90">{country.name}</span>
                            </span>
                            <div className="w-px h-3 bg-white/30" />
                            <span>{article.source}</span>
                        </span>
                        <h3 className="text-white font-bold font-display text-lg md:text-xl leading-tight line-clamp-4 relative z-10 drop-shadow-md">
                            {article.title}
                        </h3>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow p-6 space-y-4 relative">
                {/* Date */}
                <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 dark:text-primary-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) : 'Recently'}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white line-clamp-2 leading-[1.3] group-hover:text-primary-500 transition-colors">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-2">
                        {article.title}
                        <ExternalLink size={16} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300/80 line-clamp-3 leading-relaxed flex-grow">
                    {article.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10 mt-auto">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 rounded-full text-sm font-semibold transition-all duration-300">
                        <span>Read Full Article</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>

                    <div className="flex items-center gap-1">
                        <button className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-full transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-full transition-colors">
                            <Bookmark className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
