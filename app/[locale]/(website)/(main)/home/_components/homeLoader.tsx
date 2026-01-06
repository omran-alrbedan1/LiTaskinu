import FilterSection, { FilterState } from './FilterSection';

const HomeLoader = ({filters,onFiltersChange}:{
      filters: FilterState;
      onFiltersChange: (filters: FilterState) => void;
}) => {
  return (
    <div className="pb-32 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* FilterSection Skeleton */}
        <FilterSection filters={filters} onFiltersChange={onFiltersChange} />
        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, index) => (
            <div 
              key={index} 
              className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 border border-gray-200 dark:border-gray-700"
            >
              {/* Image skeleton */}
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-2xl"></div>
              
              <div className="p-4">
                {/* Name skeleton */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                
                {/* Occupation skeleton */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                
                {/* Location skeleton */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                
                {/* Time skeleton */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                
                {/* Buttons skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1 mr-2"></div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;