const Notification = require('../models/Notification');
const AppError = require('../utils/ErrorHandler');

// Get notifications for the authenticated user
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      status: 'success',
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    next(new AppError('Failed to retrieve notifications. Please try again.', 500));
  }
};

// Mark a notification as read by ID
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true },
      { new: true, runValidators: true }
    );

    if (!notification) {
      return next(new AppError('Notification not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: notification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    next(new AppError('Failed to mark notification as read. Please try again.', 500));
  }
};

// Create a new notification
exports.createNotification = async (userId, type, title, message, data = {}) => {
  try {
    const notification = await Notification.create({
      user: userId,
      type,
      title,
      message,
      data
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new AppError('Failed to create notification. Please try again.', 500);
  }
};
