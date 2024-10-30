const HealthLog = require('../models/HealthLog');

// Create a new health log
exports.createLog = async (req, res) => {
  try {
    const healthLog = new HealthLog({
      ...req.body,
      user: req.user._id
    });
    await healthLog.save();
    res.status(201).json(healthLog);
  } catch (error) {
    console.error('Error creating health log:', error);
    res.status(500).json({ error: 'Failed to create health log. Please try again.' });
  }
};

// Get health logs with optional filtering by date range
exports.getLogs = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { user: req.user._id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const logs = await HealthLog.find(query).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching health logs:', error);
    res.status(500).json({ error: 'Failed to retrieve health logs. Please try again.' });
  }
};

// Update an existing health log by ID
exports.updateLog = async (req, res) => {
  try {
    const log = await HealthLog.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true } // Ensures validation on update
    );
    if (!log) {
      return res.status(404).json({ error: 'Health log not found' });
    }
    res.json(log);
  } catch (error) {
    console.error('Error updating health log:', error);
    res.status(500).json({ error: 'Failed to update health log. Please try again.' });
  }
};

// Delete a health log by ID
exports.deleteLog = async (req, res) => {
  try {
    const log = await HealthLog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!log) {
      return res.status(404).json({ error: 'Health log not found' });
    }
    res.json({ message: 'Health log deleted successfully' });
  } catch (error) {
    console.error('Error deleting health log:', error);
    res.status(500).json({ error: 'Failed to delete health log. Please try again.' });
  }
};
