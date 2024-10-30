const jwt = require('jsonwebtoken');
const AppError = require('../utils/ErrorHandler');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    next();
  } catch (error) {
    return next(new AppError('Invalid token. Please log in again.', 401));
  }
};

module.exports = auth;
