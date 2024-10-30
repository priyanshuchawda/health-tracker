const EmailService = require('../utils/emailService');
require('dotenv').config();

// Instantiate the EmailService
const emailService = new EmailService();

async function testEmailService() {
  try {
    await emailService.sendHealthReminder(
      'test@example.com',
      'daily' // Adjust according to your method signature
    );
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Email test failed:', error);
  }
}

testEmailService();
