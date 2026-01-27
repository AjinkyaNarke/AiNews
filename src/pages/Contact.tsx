import { Mail, Github, Twitter, MessageSquare } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Have questions or feedback? We'd love to hear from you.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:border-primary-500 transition-colors border-2 border-transparent">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                        <Mail className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Email Us</h3>
                        <p className="text-sm text-gray-500">support@ainewshub.com</p>
                    </div>
                    <a href="mailto:support@ainewshub.com" className="text-primary-600 font-medium hover:underline">Send Email</a>
                </Card>

                <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:border-primary-500 transition-colors border-2 border-transparent">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                        <Github className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">GitHub</h3>
                        <p className="text-sm text-gray-500">Check out the code</p>
                    </div>
                    <a href="#" className="text-primary-600 font-medium hover:underline">View Repository</a>
                </Card>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:border-primary-500 transition-colors border-2 border-transparent">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-full text-blue-400">
                        <Twitter className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Twitter</h3>
                        <p className="text-sm text-gray-500">@ainewshub</p>
                    </div>
                    <a href="#" className="text-primary-600 font-medium hover:underline">Follow Us</a>
                </Card>
                <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:border-primary-500 transition-colors border-2 border-transparent">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Feedback</h3>
                        <p className="text-sm text-gray-500">Help us improve</p>
                    </div>
                    <a href="#" className="text-primary-600 font-medium hover:underline">Send Feedback</a>
                </Card>
            </div>
        </div>
    );
};
