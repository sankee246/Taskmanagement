const fs = require('fs');
const DATA_FILE = './data/tasks.json';

const loadTasks = () => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

const saveTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

module.exports = { loadTasks, saveTasks };