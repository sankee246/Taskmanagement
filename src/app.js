const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = app;