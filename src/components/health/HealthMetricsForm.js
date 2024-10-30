import React, { useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

const HealthMetricsForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    weight: initialData.weight || '',
    sleep: {
      hours: initialData.sleep?.hours || '',
      quality: initialData.sleep?.quality || '',
      startTime: initialData.sleep?.startTime || null,
      endTime: initialData.sleep?.endTime || null,
      interruptions: initialData.sleep?.interruptions || '',
    },
    vitals: {
      heartRate: initialData.vitals?.heartRate || '',
      bloodPressure: {
        systolic: initialData.vitals?.bloodPressure?.systolic || '',
        diastolic: initialData.vitals?.bloodPressure?.diastolic || '',
      },
      temperature: initialData.vitals?.temperature || '',
      oxygenLevel: initialData.vitals?.oxygenLevel || '',
    },
    mood: initialData.mood || '',
    stress: {
      level: initialData.stress?.level || '',
      factors: initialData.stress?.factors || [],
    },
    waterIntake: initialData.waterIntake || '',
    notes: initialData.notes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <Grid container spacing={3}>
        {/* Basic Metrics */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Basic Metrics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Water Intake (L)"
                name="waterIntake"
                type="number"
                value={formData.waterIntake}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Vitals */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Vitals
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Heart Rate (bpm)"
                type="number"
                value={formData.vitals.heartRate}
                onChange={(e) => handleNestedChange('vitals', 'heartRate', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Oxygen Level (%)"
                type="number"
                value={formData.vitals.oxygenLevel}
                onChange={(e) => handleNestedChange('vitals', 'oxygenLevel', e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Save Health Metrics
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default HealthMetricsForm;
