const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number },
      duration: { type: Number }, // duration in minutes
    },
  ],
});

module.exports = mongoose.model('Workout', workoutSchema);
