import { useEffect, useState } from "react";
import { getTask, getUser, logoutUser, saveTasks } from "../utility/localStorage";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import { useTheme } from "../context/ThemeContext";
import { getDueDateStatus } from "../utility/dueDateUtils";


const Dashboard = ({onLogout}) => {

    const [username, setUsername] = useState('');
    const [task, setTask] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activePriorityFilter, setActivePriorityFilter] = useState('all');
    const [activeDueDateFilter, setActiveDueDateFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedTasks = getTask();
        const savedUsername = getUser();

        setTask(savedTasks);
        setUsername(savedUsername || 'Guest');
        setIsInitialized(true);
    },[])

    useEffect(() => {
        if(isInitialized){
            saveTasks(task);
        }
    },[task, isInitialized])

    const handleLogout = () => {
        logoutUser();
        onLogout();
    }

    const handleAddTask = (newTask) => {
        // task.push(newTask); //Mutate original array
        setTask([...task, newTask]);
        console.log('Task added:', newTask);
    }

    // Filter tasks by search query, status, priority, and due date
    const filteredTask = task.filter(t => {
        // First filter by search query
        const matchesSearch = searchQuery === '' || 
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        if (!matchesSearch) return false;
        
        // Then filter by status
        let matchesStatus = true;
        if(activeFilter==='completed') matchesStatus = t.completed;
        if(activeFilter==='pending') matchesStatus = !t.completed;
        
        if (!matchesStatus) return false;
        
        // Then filter by priority
        if(activePriorityFilter !== 'all') {
            if (t.priority !== activePriorityFilter) return false;
        }
        
        // Finally filter by due date
        if(activeDueDateFilter !== 'all') {
            const dueDateStatus = getDueDateStatus(t.dueDate, t.completed);
            if (dueDateStatus !== activeDueDateFilter) return false;
        }
        
        return true;
    })

    const handleToggleComplete = (taskId) => {
        setTask(task.map(t => 
            t.id===taskId ? {
                ...t,
                completed: !t.completed
            } : t
        ))
    }

    const handleEditTask = (taskId, updatedTask) => {
        setTask(task.map(t => 
            t.id===taskId ? updatedTask : t
        ))
    }

    const handleDeleteTask = (taskId) => {
        setTask(task.filter(t => t.id !== taskId));
    }

    const searchFilteredTasks = task.filter(t => {
        return searchQuery === '' || 
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    const taskCounts = {
        all: searchFilteredTasks.length,
        pending: searchFilteredTasks.filter(t => !t.completed).length,
        completed: searchFilteredTasks.filter(t => t.completed).length
    }

    // Priority based on search result
    const priorityCounts = {
        all: searchFilteredTasks.length,
        urgent: searchFilteredTasks.filter(t => t.priority === 'urgent').length,
        high: searchFilteredTasks.filter(t => t.priority === 'high').length,
        medium: searchFilteredTasks.filter(t => t.priority === 'medium').length,
        low: searchFilteredTasks.filter(t => t.priority === 'low').length
    }

    //dueDate count based on search result
    const dueDateCounts = {
        all: searchFilteredTasks.length,
        overdue: searchFilteredTasks.filter(t => getDueDateStatus(t.dueDate, t.completed) === 'overdue').length,
        'due-soon': searchFilteredTasks.filter(t => getDueDateStatus(t.dueDate, t.completed) === 'due-soon').length,
        upcoming: searchFilteredTasks.filter(t => getDueDateStatus(t.dueDate, t.completed) === 'upcoming').length,
        'no-due-date': searchFilteredTasks.filter(t => getDueDateStatus(t.dueDate, t.completed) === 'no-due-date').length
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Task Tracker</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Welcome back, {username}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md transition-colors duration-300"
                                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                {isDarkMode ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <TaskForm onAddTask={handleAddTask}/>
                <TaskFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    taskCounts={taskCounts}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activePriorityFilter={activePriorityFilter}
                    onPriorityFilterChange={setActivePriorityFilter}
                    priorityCounts={priorityCounts}
                    activeDueDateFilter={activeDueDateFilter}
                    onDueDateFilterChange={setActiveDueDateFilter}
                    dueDateCounts={dueDateCounts}
                />
                <TaskList
                    task={filteredTask}
                    onToggleComplete={handleToggleComplete}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    totalTasks={task.length}
                />
            </main>
        </div>
    )
}

export default Dashboard;