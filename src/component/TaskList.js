import TaskItem from "./TaskItem";

const TaskList = ({task, onEditTask, onDeleteTask, onToggleComplete, totalTasks = 0}) => {

    if(task.length===0){
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center transition-colors duration-300">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                    No tasks found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    {totalTasks === 0 ? "Get started by adding your first task" : "No tasks match your search criteria"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {
                task.map((t) => (
                    <TaskItem
                        key={t.id}
                        task={t}
                        onEditTask={onEditTask}
                        onDeleteTask={onDeleteTask}
                        onToggleComplete={onToggleComplete}
                    />
                ))
            }
        </div>
    )
}

export default TaskList;