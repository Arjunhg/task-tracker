import { useEffect, useState } from "react";
import { getUser, logoutUser } from "../utility/localStorage";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";


const Dashboard = ({onLogout}) => {

    const [username, setUsername] = useState('');
    const [task, setTask] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activePriorityFilter, setActivePriorityFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const savedUsername = getUser();

        setUsername(savedUsername || 'Guest');
    },[]);

    const handleLogout = () => {
        logoutUser();
        onLogout();
    }

    const handleAddTask = (newTask) => {
        // task.push(newTask); //Mutate original array
        setTask([...task, newTask]);
        console.log('Task added:', newTask);
    }

    // Filter tasks by search query, status, and priority
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
        
        // Finally filter by priority
        if(activePriorityFilter !== 'all') {
            return t.priority === activePriorityFilter;
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

    // Calculate priority counts based on search results
    const priorityCounts = {
        all: searchFilteredTasks.length,
        urgent: searchFilteredTasks.filter(t => t.priority === 'urgent').length,
        high: searchFilteredTasks.filter(t => t.priority === 'high').length,
        medium: searchFilteredTasks.filter(t => t.priority === 'medium').length,
        low: searchFilteredTasks.filter(t => t.priority === 'low').length
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
                            <p className="text-sm text-gray-600">Welcome back, {username}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                            Logout
                        </button>
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