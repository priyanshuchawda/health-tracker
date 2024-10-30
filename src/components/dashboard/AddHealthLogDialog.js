import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Alert
} from '@mui/material';
import { health } from '../../services/api';

const AddHealthLogDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    weight: '',
    waterIntake: '',
    mood: 'good',
    notes: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await health.createLog(formData);
      onSubmit();
      onClose();
      setFormData({
        weight: '',
        waterIntake: '',
        mood: 'good',
        notes: ''
      });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add health log');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Health Log</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Water Intake (L)"
              name="waterIntake"
              type="number"
              value={formData.waterIntake}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Mood"
              name="mood"
              value={formData.mood}
              onChange={handleChange}
            >
              <MenuItem value="very_good">Very Good</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="bad">Bad</MenuItem>
              <MenuItem value="very_bad">Very Bad</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Log
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHealthLogDialog;
