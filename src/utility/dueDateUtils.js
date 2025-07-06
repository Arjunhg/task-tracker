export const getDueDateStatus = (dueDate, completed) => {
    if (!dueDate) return 'no-due-date';
    if (completed) return 'completed';
    
    const now = new Date();
    const due = new Date(dueDate);
    const diffHours = (due - now) / (1000 * 60 * 60);
    
    if (diffHours < 0) return 'overdue';
    if (diffHours < 24) return 'due-soon';
    return 'upcoming';
};

export const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));
    
    // Format: based on har far in future or past
    if (diffDays === 0) {
        return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
        return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === -1) {
        return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays > 1 && diffDays <= 7) {
        return date.toLocaleDateString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
};

export const getDueDateColor = (status) => {
    switch (status) {
        case 'completed':
            return 'text-green-600 dark:text-green-400';
        case 'overdue':
            return 'text-red-600 dark:text-red-400';
        case 'due-soon':
            return 'text-yellow-600 dark:text-yellow-400';
        case 'upcoming':
            return 'text-blue-600 dark:text-blue-400';
        default:
            return 'text-gray-500 dark:text-gray-400';
    }
};

export const getDueDateIcon = (status) => {
    switch (status) {
        case 'completed':
            return '✅';
        case 'overdue':
            return '🔴';
        case 'due-soon':
            return '🟡';
        case 'upcoming':
            return '🔵';
        default:
            return '⚪';
    }
}; 