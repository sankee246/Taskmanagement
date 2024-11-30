const fs = require('fs');
const path =require('path');
const DATA_FILE = './data/tasks.json';

const loadTasks = () => {
    let filename=path.join(__dirname,DATA_FILE);
    console.log(filename);
    if (fs.existsSync(filename)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

const saveTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

module.exports = { loadTasks, saveTasks };