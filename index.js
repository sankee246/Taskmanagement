// Import necessary modules
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const PORT = 3000;
const DATA_FILE = 'tasks.json';

// function to load tasks from the file
const loadTasks = () => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    }
    return [];
};

//  function to save tasks to the file
const saveTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

// Initial tasks array (loaded from file)
let tasks = loadTasks();

// DELETE route to remove a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        res.status(200).json({ message: "Task deleted successfully" });
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

// GET route to filter tasks by status
app.get('/tasks/status/:status', (req, res) => {
    const status = req.params.status;
    const filteredTasks = tasks.filter(task => task.status === status);

    res.status(200).json(filteredTasks);
});

// Bonus: Add other CRUD operations if necessary

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
