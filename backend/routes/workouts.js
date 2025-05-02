const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Get all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new workout
router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a workout by ID
router.get('/:id', getWorkout, (req, res) => {
  res.json(res.workout);
});

// Update a workout by ID
router.put('/:id', getWorkout, async (req, res) => {
  Object.assign(res.workout, req.body);
  try {
    const updatedWorkout = await res.workout.save();
    res.json(updatedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a workout by ID
router.delete('/:id', getWorkout, async (req, res) => {
  try {
    await res.workout.remove();
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get workout by ID
async function getWorkout(req, res, next) {
  let workout;
  try {
    workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.workout = workout;
  next();
}

module.exports = router;
