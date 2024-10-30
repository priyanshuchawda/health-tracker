const AppError = require('../utils/ErrorHandler');
const logger = require('../utils/logger');

// Handle Mongoose CastError (invalid ObjectId or type)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handle Duplicate Fields in MongoDB (code 11000)
const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use a different value.`;
  return new AppError(message, 400);
};

// Handle Mongoose Validation Errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle Invalid JWT Token
const handleJWTError = () => 
  new AppError('Invalid token. Please log in again.', 401);

// Handle Expired JWT Token
const handleJWTExpiredError = () => 
  new AppError('Your token has expired! Please log in again.', 401);

// Main Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    user: req.user ? req.user._id : 'Anonymous'
  });

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Detailed Error in Development Mode
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // Simplified Error in Production Mode
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Specific Error Handling for Production
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // Send Operational Errors to Client
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }

    // Log Non-Operational Errors and Hide Details from Client
    console.error('ERROR 💥:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = errorHandler;
