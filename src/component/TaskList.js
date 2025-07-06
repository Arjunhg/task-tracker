import TaskItem from "./TaskItem";

const TaskList = ({task, onEditTask, onDeleteTask, onToggleComplete}) => {

    if(task.length===0){
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No task found
                </h3>
                <p className="text-gray-500">
                    Get started by adding your first task
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