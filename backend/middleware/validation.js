const AppError = require('../utils/ErrorHandler');

// Validate Registration Inputs
exports.validateRegistration = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  // Password Length Check
  if (!password || password.length < 8) {
    return next(new AppError('Password must be at least 8 characters long.', 400));
  }

  // Confirm Password Match
  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match.', 400));
  }

  next();
};

// Validate Login Inputs
exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required.', 400));
  }

  next();
};

// Validate Health Log Entries
exports.validateHealthLog = (req, res, next) => {
  const { weight, sleep, vitals } = req.body;

  // Weight Validation
  if (weight && (isNaN(weight) || weight < 0)) {
    return next(new AppError('Invalid weight value.', 400));
  }

  // Sleep Validation
  if (sleep) {
    if (sleep.hours && (isNaN(sleep.hours) || sleep.hours < 0 || sleep.hours > 24)) {
      return next(new AppError('Sleep hours must be between 0 and 24.', 400));
    }
    if (sleep.quality && !['poor', 'fair', 'good', 'excellent'].includes(sleep.quality)) {
      return next(new AppError('Sleep quality must be one of: poor, fair, good, excellent.', 400));
    }
  }

  // Vitals Validation
  if (vitals) {
    if (vitals.heartRate && (isNaN(vitals.heartRate) || vitals.heartRate < 0)) {
      return next(new AppError('Invalid heart rate value.', 400));
    }

    if (vitals.bloodPressure) {
      const { systolic, diastolic } = vitals.bloodPressure;
      if (
        (systolic && (isNaN(systolic) || systolic <= 0)) ||
        (diastolic && (isNaN(diastolic) || diastolic <= 0))
      ) {
        return next(new AppError('Blood pressure values must be positive numbers.', 400));
      }
    }

    if (vitals.temperature && (isNaN(vitals.temperature) || vitals.temperature <= 0)) {
      return next(new AppError('Invalid temperature value.', 400));
    }
  }

  next();
};

// Validate Profile Update Inputs
exports.validateProfileUpdate = (req, res, next) => {
  const { firstName, lastName, age, height, weight } = req.body;

  // Name Validation (optional, but recommended for consistency)
  if (firstName && typeof firstName !== 'string') {
    return next(new AppError('First name must be a string.', 400));
  }
  if (lastName && typeof lastName !== 'string') {
    return next(new AppError('Last name must be a string.', 400));
  }

  // Age Validation
  if (age && (isNaN(age) || age < 0 || age > 150)) {
    return next(new AppError('Age must be a number between 0 and 150.', 400));
  }

  // Height Validation
  if (height && (isNaN(height) || height <= 0)) {
    return next(new AppError('Height must be a positive number.', 400));
  }

  // Weight Validation
  if (weight && (isNaN(weight) || weight <= 0)) {
    return next(new AppError('Weight must be a positive number.', 400));
  }

  next();
};
