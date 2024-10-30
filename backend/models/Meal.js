const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
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
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  foods: [{
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    portion: String
  }],
  totalCalories: Number,
  notes: String
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
