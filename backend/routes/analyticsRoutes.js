const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// Protect all analytics routes
router.use(auth);

// Get health summary
router.get('/summary', analyticsController.getHealthSummary);

// Generate specific reports
router.post('/report', analyticsController.generateReport);

module.exports = router;
