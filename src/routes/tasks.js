const express = require('express');
const { loadTasks, saveTasks } = require('../utils/fileHandler');
const router = express.Router();

let tasks = loadTasks();

// Create a new task
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        description,
        status: "pending"
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json({ message: "Task created successfully", task: newTask });
});

// Get all tasks
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// Get tasks by status
router.get('/status/:status', (req, res) => {
    const { status } = req.params;
    const filteredTasks = tasks.filter((task) => task.status === status);
    res.status(200).json(filteredTasks);
});

// Update a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed'].includes(status)) {
        return res.status(400).json({ error: "Invalid status. Allowed values: 'pending', 'completed'" });
    }

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id, 10));
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks[taskIndex].status = status;
    saveTasks(tasks);
    res.status(200).json({ message: "Task updated successfully", task: tasks[taskIndex] });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id, 10));

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    res.status(200).json({ message: "Task deleted successfully" });
});
// GET route to filter tasks by status
router.get('/tasks/status/:status', (req, res) => {
    const status = req.params.status;
    const filteredTasks = tasks.filter(task => task.status === status);

    res.status(200).json(filteredTasks);
});


module.exports = router;
