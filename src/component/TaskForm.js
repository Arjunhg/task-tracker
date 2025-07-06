import { useState } from "react";


const TaskForm = ({onAddTask}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low'); // Default priority
    const [dueDate, setDueDate] = useState(''); // Due date state
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title.trim()) {
            setError('Title is required');
            return;
        }

        const newtask = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            priority: priority,
            dueDate: dueDate || null, // Add due date to task object
            completed: false,
            createdAt: new Date().toISOString(),
        }

        onAddTask(newtask);

        setTitle('');
        setDescription('');
        setPriority('low'); // Reset priority to default
        setDueDate(''); // Reset due date
        setError('');
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Add New Task
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                        Task Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        placeholder="Enter task title here"
                        required
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setError('');
                        }}
                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                         Description (Optional)
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        value={description}
                        rows="3"
                        placeholder="Enter task description here"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setError('');
                        }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                        Priority Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-700 border-gray-300', activeColor: 'bg-gray-200 border-gray-400' },
                            { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-700 border-blue-300', activeColor: 'bg-blue-200 border-blue-400' },
                            { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-300', activeColor: 'bg-orange-200 border-orange-400' },
                            { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-300', activeColor: 'bg-red-200 border-red-400' }
                        ].map((priorityOption) => (
                            <button
                                key={priorityOption.value}
                                type="button"
                                onClick={() => setPriority(priorityOption.value)}
                                className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                                    priority === priorityOption.value 
                                        ? priorityOption.activeColor 
                                        : priorityOption.color 
                                }`}
                            >
                                {priorityOption.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                        Due Date (Optional)
                    </label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                    />
                </div>

                {
                    error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )
                }

                <button type='submit' className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default TaskForm;