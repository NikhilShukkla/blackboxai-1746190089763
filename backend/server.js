require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-progress-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Import routes
const workoutsRouter = require('./routes/workouts');
const weightLogsRouter = require('./routes/weightLogs');
const goalsRouter = require('./routes/goals');

// Basic route
app.get('/', (req, res) => {
  res.send('Fitness Progress Tracker API is running');
});

// Use routes
app.use('/api/workouts', workoutsRouter);
app.use('/api/weightlogs', weightLogsRouter);
app.use('/api/goals', goalsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
