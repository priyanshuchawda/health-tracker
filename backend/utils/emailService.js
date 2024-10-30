const nodemailer = require('nodemailer');
const AppError = require('./ErrorHandler');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to Health Tracker!</h1>
          <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #4CAF50; color: white; padding: 14px 20px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Verify Email
            </a>
          </div>
          <p>If the button doesn't work, you can also click this link:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending error:', error);
      throw new AppError('Failed to send verification email', 500);
    }
  }

  async sendHealthReminder(email, reminderType) {
    const reminderTemplates = {
      daily: {
        subject: 'Daily Health Check-in Reminder',
        message: 'Don\'t forget to log your daily health metrics!'
      },
      weekly: {
        subject: 'Weekly Health Summary',
        message: 'Time to review your weekly health progress!'
      }
    };

    const template = reminderTemplates[reminderType];
    if (!template) {
      throw new AppError('Invalid reminder type', 400);
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: template.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${template.subject}</h2>
          <p>${template.message}</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard" 
               style="background-color: #4CAF50; color: white; padding: 14px 20px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending error:', error);
      throw new AppError('Failed to send reminder email', 500);
    }
  }
}

module.exports = new EmailService();
