export const About = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-12">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold">About AI News Hub</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    We are dedicated to bringing you the most relevant and up-to-date news from the world of Artificial Intelligence.
                </p>
            </section>

            <section className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        In an era where technology evolves at breakneck speed, staying informed is crucial. Our mission is to curate, summarize, and categorize the vast ocean of AI news into digestible, actionable insights for developers, researchers, and enthusiasts.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Technology</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Powered by cutting-edge APIs. We utilize NewsAPI for comprehensive coverage and Google Gemini for intelligent summarization and categorization, delivering a smarter news reading experience.
                    </p>
                </div>
            </section>
        </div>
    );
};
