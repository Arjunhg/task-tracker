const TaskFilter = ({activeFilter, onFilterChange, taskCounts, searchQuery, onSearchChange, activePriorityFilter, onPriorityFilterChange, priorityCounts}) => {

    const filters = [
        { key: 'all', label: 'All', count: taskCounts.all },
        { key: 'pending', label: 'Pending', count: taskCounts.pending },
        { key: 'completed', label: 'Completed', count: taskCounts.completed }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-colors duration-300">
            {/* Search Bar */}
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md leading-5 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                    />
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex space-x-1 mb-3">
                {
                    filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => onFilterChange(filter.key)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${activeFilter === filter.key? 'bg-indigo-600 text-white': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            {filter.label}
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.key? 'bg-indigo-500 text-white': 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                                {filter.count}
                            </span>
                        </button>
                    ))
                }
            </div>

            {/* Priority Filter Tabs */}
            <div className="flex space-x-1">
                {[
                    { key: 'all', label: 'All Priorities', count: priorityCounts?.all || 0 },
                    { key: 'urgent', label: 'Urgent', count: priorityCounts?.urgent || 0, color: 'bg-red-100 text-red-700 border-red-300' },
                    { key: 'high', label: 'High', count: priorityCounts?.high || 0, color: 'bg-orange-100 text-orange-700 border-orange-300' },
                    { key: 'medium', label: 'Medium', count: priorityCounts?.medium || 0, color: 'bg-blue-100 text-blue-700 border-blue-300' },
                    { key: 'low', label: 'Low', count: priorityCounts?.low || 0, color: 'bg-gray-100 text-gray-700 border-gray-300' }
                ].map((priorityFilter) => (
                    <button
                        key={priorityFilter.key}
                        onClick={() => onPriorityFilterChange(priorityFilter.key)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                            activePriorityFilter === priorityFilter.key 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : priorityFilter.color + ' hover:bg-opacity-80'
                        }`}
                    >
                        {priorityFilter.label}
                        <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                            activePriorityFilter === priorityFilter.key 
                                ? 'bg-indigo-500 text-white' 
                                : 'bg-white bg-opacity-70 text-gray-700'
                        }`}>
                            {priorityFilter.count}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TaskFilter;