const express = require('express');
const router = express.Router();
const healthLogController = require('../controllers/healthLogController');
const auth = require('../middleware/auth');
const { validateHealthLog } = require('../middleware/validation');

// All routes require authentication
router.use(auth);

router.post('/logs', validateHealthLog, healthLogController.createLog);
router.get('/logs', healthLogController.getLogs);
router.patch('/logs/:id', validateHealthLog, healthLogController.updateLog);
router.delete('/logs/:id', healthLogController.deleteLog);

module.exports = router;
