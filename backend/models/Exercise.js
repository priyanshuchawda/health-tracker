const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['cardio', 'strength', 'flexibility', 'sports', 'other'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  duration: Number, // in minutes
  intensity: {
    type: String,
    enum: ['low', 'moderate', 'high']
  },
  caloriesBurned: Number,
  notes: String
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
