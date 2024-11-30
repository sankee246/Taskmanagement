const app = require('./app'); // Import the Express app
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});