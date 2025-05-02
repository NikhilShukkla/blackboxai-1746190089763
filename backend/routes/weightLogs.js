const express = require('express');
const router = express.Router();
const WeightLog = require('../models/WeightLog');

// Get all weight logs
router.get('/', async (req, res) => {
  try {
    const weightLogs = await WeightLog.find().sort({ date: -1 });
    res.json(weightLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new weight log
router.post('/', async (req, res) => {
  const weightLog = new WeightLog(req.body);
  try {
    const newWeightLog = await weightLog.save();
    res.status(201).json(newWeightLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a weight log by ID
router.get('/:id', getWeightLog, (req, res) => {
  res.json(res.weightLog);
});

// Update a weight log by ID
router.put('/:id', getWeightLog, async (req, res) => {
  Object.assign(res.weightLog, req.body);
  try {
    const updatedWeightLog = await res.weightLog.save();
    res.json(updatedWeightLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a weight log by ID
router.delete('/:id', getWeightLog, async (req, res) => {
  try {
    await res.weightLog.remove();
    res.json({ message: 'Weight log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get weight log by ID
async function getWeightLog(req, res, next) {
  let weightLog;
  try {
    weightLog = await WeightLog.findById(req.params.id);
    if (!weightLog) {
      return res.status(404).json({ message: 'Weight log not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.weightLog = weightLog;
  next();
}

module.exports = router;
