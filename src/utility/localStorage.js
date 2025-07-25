export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

export const getFromLocalStorage = (key, defaultValue=null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

export const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}

export const saveUser = (username) => {
    saveToLocalStorage('currentUser', username);
}

export const getUser = () => {
    return getFromLocalStorage('currentUser', null);
}

export const logoutUser = () => {
    removeFromLocalStorage('currentUser');
}

export const saveTasks = (tasks) => {
    saveToLocalStorage('tasks', tasks);
}

export const getTask = () => {
    return getFromLocalStorage('tasks', []);
}