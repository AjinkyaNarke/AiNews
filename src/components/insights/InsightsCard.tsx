import { Lightbulb, Sparkles } from 'lucide-react';

export const InsightsCard = ({ insights, loading }: { insights: string[], loading: boolean }) => {
    if (loading) return (
        <div className="glass-card rounded-2xl p-8 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10" />
                <div className="h-7 bg-slate-200 dark:bg-white/10 w-48 rounded-lg" />
            </div>
            <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-4 bg-slate-200 dark:bg-white/5 rounded w-full" />)}
            </div>
        </div>
    );

    if (!insights || insights.length === 0) return null;

    return (
        <div className="relative overflow-hidden rounded-3xl p-8 isolate">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 -z-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

            <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-500 blur-lg opacity-50" />
                    <div className="relative p-2.5 bg-gradient-to-br from-primary-500 to-accent-600 rounded-xl text-white shadow-lg">
                        <Lightbulb className="w-6 h-6" />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Daily AI Insights</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Curated by Gemini AI</p>
                </div>

            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {insights.map((insight, idx) => (
                    <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                            <Sparkles className="w-4 h-4 text-primary-500" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{insight}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
