export const ArticleSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md h-full animate-pulse border border-gray-100 dark:border-gray-700">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
            <div className="p-5 space-y-4">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-20 rounded" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 w-24 rounded" />
                </div>
                <div className="space-y-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 w-32 rounded mt-4" />
            </div>
        </div>
    )
}
