const TaskFilter = ({activeFilter, onFilterChange, taskCounts, searchQuery, onSearchChange}) => {

    const filters = [
        { key: 'all', label: 'All', count: taskCounts.all },
        { key: 'pending', label: 'Pending', count: taskCounts.pending },
        { key: 'completed', label: 'Completed', count: taskCounts.completed }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            {/* Search Bar */}
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1">
                {
                    filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => onFilterChange(filter.key)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeFilter === filter.key? 'bg-indigo-600 text-white': 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {filter.label}
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.key? 'bg-indigo-500 text-white': 'bg-gray-300 text-gray-700'}`}>
                                {filter.count}
                            </span>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default TaskFilter;