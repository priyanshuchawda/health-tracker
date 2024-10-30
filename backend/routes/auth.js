const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const authController = require('../controllers/authController');

router.put('/profile', auth, authController.updateProfile);

module.exports = router;
