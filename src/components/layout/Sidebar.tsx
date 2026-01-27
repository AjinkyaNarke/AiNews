import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SearchBar } from './SearchBar';

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 pb-4 shadow-xl">
                            <div className="flex px-6 pt-6 pb-4 justify-between items-center border-b border-gray-100 dark:border-gray-800">
                                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">AI News Hub</span>
                                <button
                                    type="button"
                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                                    onClick={onClose}
                                >
                                    <X className="w-6 h-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-8 px-6 space-y-6">
                                <div className="mb-6">
                                    <SearchBar />
                                </div>
                                <Link onClick={onClose} to="/" className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
                                <Link onClick={onClose} to="/countries" className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">Countries</Link>
                                <Link onClick={onClose} to="/about" className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">About</Link>
                                <Link onClick={onClose} to="/terms" className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">Terms</Link>
                                <Link onClick={onClose} to="/privacy" className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">Privacy</Link>
                                <Link onClick={onClose} to="/contact" className="block text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">Contact</Link>
                            </div>
                            <div className="mt-auto px-6 pb-8">
                                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                                    <span className="text-sm font-medium">Appearance</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
