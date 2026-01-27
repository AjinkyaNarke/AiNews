import { Tab } from '@headlessui/react';

interface Category {
    name: string;
    count?: number;
}

interface TabsProps {
    categories: Category[];
    selectedIndex: number;
    onChange: (index: number) => void;
}

export const Tabs = ({ categories, selectedIndex, onChange }: TabsProps) => {
    return (
        <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
            <Tab.List className="bg-slate-200/50 dark:bg-white/10 backdrop-blur-md p-1 rounded-full inline-flex font-medium text-sm">
                {categories.map((category) => (
                    <Tab
                        key={category.name}
                        className={({ selected }) =>
                            `px-6 py-2.5 rounded-full transition-all duration-300 outline-none
                            ${selected
                                ? 'bg-white dark:bg-[#2c2c2e] text-black dark:text-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] scale-105'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`
                        }
                    >
                        {category.name}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    );
};
