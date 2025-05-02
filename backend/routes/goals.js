const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new goal
router.post('/', async (req, res) => {
  const goal = new Goal(req.body);
  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a goal by ID
router.get('/:id', getGoal, (req, res) => {
  res.json(res.goal);
});

// Update a goal by ID
router.put('/:id', getGoal, async (req, res) => {
  Object.assign(res.goal, req.body);
  try {
    const updatedGoal = await res.goal.save();
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a goal by ID
router.delete('/:id', getGoal, async (req, res) => {
  try {
    await res.goal.remove();
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get goal by ID
async function getGoal(req, res, next) {
  let goal;
  try {
    goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.goal = goal;
  next();
}

module.exports = router;
