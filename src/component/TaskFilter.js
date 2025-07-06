
const TaskFilter = ({activeFilter, onFilterChange, taskCounts}) => {

    const filters = [
        { key: 'all', label: 'All', count: taskCounts.all },
        { key: 'pending', label: 'Pending', count: taskCounts.pending },
        { key: 'completed', label: 'Completed', count: taskCounts.completed }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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