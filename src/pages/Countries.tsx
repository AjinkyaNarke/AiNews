import { useNavigate } from 'react-router-dom';
import { countryMap } from '../constants/countries';

const Countries = () => {
    const navigate = useNavigate();

    const trendingCodes = ['US', 'CN', 'GB', 'JP', 'IN'];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-12 text-center">
                Global AI News Hub
            </h1>

            {/* Trending Section */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white font-display">
                        Trending AI Hubs
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {trendingCodes.map(code => {
                        const country = countryMap[code];
                        if (!country) return null;
                        return (
                            <button
                                key={code}
                                onClick={() => navigate(`/country/${code}`)}
                                className="group relative flex flex-col items-center justify-center p-6 rounded-3xl glass-heavy hover:bg-white dark:hover:bg-white/10 transition-all duration-500 hover:scale-105 active:scale-95 border border-primary-500/20 shadow-xl shadow-primary-500/5 hover:shadow-primary-500/20 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="w-16 h-12 mb-3 relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                                    <img
                                        src={country.flag}
                                        alt={country.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).src = '/flag/us.png'; }}
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white relative z-10">{country.name}</h3>
                                <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mt-1">Top Source</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* All Countries Section */}
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 font-display whitespace-nowrap">
                    All Regions
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {Object.entries(countryMap)
                    .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                    .map(([code, country]) => (
                        <button
                            key={code}
                            onClick={() => navigate(`/country/${code}`)}
                            className="group flex flex-col items-center p-6 rounded-[2rem] glass-card hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 shadow-lg hover:shadow-xl"
                        >
                            <div className="w-16 h-12 mb-4 relative rounded-md overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                                <img
                                    src={country.flag}
                                    alt={country.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/flag/us.png'; }}
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-md" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-500 transition-colors">
                                {country.name}
                            </h3>
                            <span className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">
                                {code}
                            </span>
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default Countries;
