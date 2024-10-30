const mongoose = require('mongoose');
require('dotenv').config();

async function updateSchema() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all existing health logs
    const healthLogs = await mongoose.connection.collection('healthlogs').find({}).toArray();

    // Update each document
    for (const log of healthLogs) {
      await mongoose.connection.collection('healthlogs').updateOne(
        { _id: log._id },
        {
          $set: {
            vitals: {
              heartRate: log.heartRate || null,
              bloodPressure: {
                systolic: log.bloodPressure?.systolic || null,
                diastolic: log.bloodPressure?.diastolic || null
              },
              temperature: log.temperature || null
            },
            sleep: {
              hours: log.sleep?.hours || null,
              quality: log.sleep?.quality || null,
              startTime: log.sleep?.startTime || null,
              endTime: log.sleep?.endTime || null,
              interruptions: log.sleep?.interruptions || 0
            }
          }
        }
      );
    }

    console.log('Schema update completed');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

updateSchema();
