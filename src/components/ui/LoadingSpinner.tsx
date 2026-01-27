export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
    return (
        <div className="flex justify-center items-center">
            <div className={`${sizes[size]} border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin`} />
        </div>
    );
};
