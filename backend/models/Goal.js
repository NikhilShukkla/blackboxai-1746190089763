const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
  },
  achieved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Goal', goalSchema);
