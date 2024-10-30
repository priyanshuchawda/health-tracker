import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';

const exerciseTypes = [
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength Training' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'sports', label: 'Sports' }
];

const ExerciseTracker = () => {
  const [open, setOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState({
    type: '',
    name: '',
    duration: '',
    intensity: 'moderate',
    caloriesBurned: ''
  });

  const handleChange = (e) => {
    setExerciseData({
      ...exerciseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // TODO: Implement exercise logging
    console.log('Exercise data:', exerciseData);
    setOpen(false);
  };

  return (
    <>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FitnessCenter sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Exercise Tracker
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Log Exercise
        </Button>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Log Exercise</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Exercise Type"
                name="type"
                value={exerciseData.type}
                onChange={handleChange}
              >
                {exerciseTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Exercise Name"
                name="name"
                value={exerciseData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                name="duration"
                type="number"
                value={exerciseData.duration}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Intensity"
                name="intensity"
                value={exerciseData.intensity}
                onChange={handleChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Calories Burned"
                name="caloriesBurned"
                type="number"
                value={exerciseData.caloriesBurned}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExerciseTracker;
