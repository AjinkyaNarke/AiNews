import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'elevated' | 'outlined';
}

export const Card = ({ children, className = '', variant = 'elevated' }: CardProps) => {
    const baseStyles = 'bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-200';
    const variants = {
        elevated: 'shadow-md hover:shadow-lg',
        outlined: 'border border-gray-200 dark:border-gray-700',
    };
    return <div className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</div>;
};
