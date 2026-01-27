import { Link } from 'react-router-dom';
import { Newspaper, Github, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary-600 p-1.5 rounded-lg text-white">
                                <Newspaper className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">AI News Hub</span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Stay ahead of the curve with the latest breakthroughs in Artificial Intelligence, Machine Learning, and Robotics. Curated daily.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Latest News</Link></li>
                            <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link to="/search" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Search</Link></li>
                            <li><Link to="/subscribe" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Newsletter</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        © {new Date().getFullYear()} AI News Hub. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600 flex items-center gap-1">
                        Powered by <a href="https://newsapi.org" target="_blank" rel="noreferrer" className="hover:underline">NewsAPI</a> & <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noreferrer" className="hover:underline">Google Gemini</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
