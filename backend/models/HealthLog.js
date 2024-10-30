const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weight: Number,
  sleep: {
    hours: Number,
    quality: {
      type: String,
      enum: ['poor', 'fair', 'good', 'excellent']
    },
    startTime: Date,
    endTime: Date,
    interruptions: Number
  },
  vitals: {
    heartRate: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    temperature: Number,
    oxygenLevel: Number
  },
  mood: {
    type: String,
    enum: ['very_bad', 'bad', 'neutral', 'good', 'very_good']
  },
  stress: {
    level: {
      type: Number,
      min: 1,
      max: 10
    },
    factors: [String]
  },
  waterIntake: Number,
  symptoms: [{
    name: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    },
    duration: Number
  }],
  medications: [{
    name: String,
    dosage: String,
    timeTaken: Date
  }],
  notes: String
});

const HealthLog = mongoose.model('HealthLog', healthLogSchema);
module.exports = HealthLog;
