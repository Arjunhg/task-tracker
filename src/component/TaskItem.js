import { useState } from "react";
import { getDueDateStatus, formatDueDate, getDueDateColor, getDueDateIcon } from "../utility/dueDateUtils";


const TaskItem = ({task, onEditTask, onDeleteTask, onToggleComplete}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || "");
    const [editPriority, setEditPriority] = useState(task.priority || 'low');
    const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleEdit = () => {
        if(editTitle.trim()){
            onEditTask(task.id, {
                ...task,
                title: editTitle.trim(),
                description: editDescription.trim(),
                priority: editPriority,
                dueDate: editDueDate || null
            })
            setIsEditing(false);
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setEditPriority(task.priority || 'low');
        setEditDueDate(task.dueDate || '');
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }; 

    const handleDelete = () => {
        onDeleteTask(task.id)
        setShowDeleteConfirm(false);
    }

    if(isEditing){
        return(
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500 transition-colors duration-300">
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-colors duration-300"
                        placeholder="Edit task title"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="Edit task description"
                    />
                    
                    {/* Priority Selector in Edit Mode */}
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
                                    onClick={() => setEditPriority(priorityOption.value)}
                                    className={`px-2 py-1 text-xs font-medium rounded border transition-colors ${
                                        editPriority === priorityOption.value 
                                            ? priorityOption.activeColor 
                                            : priorityOption.color + ' hover:' + priorityOption.activeColor.split(' ')[0]
                                    }`}
                                >
                                    {priorityOption.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Due Date Input in Edit Mode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                            Due Date (Optional)
                        </label>
                        <input
                            type="datetime-local"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        />
                    </div>
                    
                    <div className="flex space-x-2">
                        <button
                            onClick={handleEdit}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 border-l-4 transition-colors duration-300 ${task.completed ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-blue-500'}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(task.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <h3 className={`text-lg font-medium transition-colors duration-300 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            {task.title}
                        </h3>
                        {/* Priority Badge */}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.priority === 'low' ? 'bg-gray-100 text-gray-700' :
                            task.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                            task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Low'}
                        </span>
                    </div>

                    {
                        task.description && (
                            <p className={`mt-2 text-sm transition-colors duration-300 ${task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                                {task.description}
                            </p>
                        )
                    }

                    <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">
                            Created: {formatDate(task.createdAt)}
                        </p>
                        {task.dueDate && (
                            <div className="flex items-center space-x-1">
                                <span className="text-sm">{getDueDateIcon(getDueDateStatus(task.dueDate, task.completed))}</span>
                                <span className={`text-xs font-medium ${getDueDateColor(getDueDateStatus(task.dueDate, task.completed))}`}>
                                    Due: {formatDueDate(task.dueDate)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex space-x-2 ml-4">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-1"
                        title="Edit Task"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 p-1"
                        title="Delete Task"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>

            {
                showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this task? This action cannot be undone.
                            </p>

                            <div className="flex space-x-3">
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TaskItem;