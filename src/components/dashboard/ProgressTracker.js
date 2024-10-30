import React from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Grid,
  Tooltip
} from '@mui/material';
import { Timeline } from '@mui/icons-material';

const ProgressTracker = ({ goals }) => {
  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Timeline sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Progress Tracking
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {goals.map((goal) => (
          <Grid item xs={12} key={goal.id}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">{goal.name}</Typography>
                <Typography variant="body2">
                  {goal.current} / {goal.target} {goal.unit}
                </Typography>
              </Box>
              <Tooltip title={`${calculateProgress(goal.current, goal.target).toFixed(1)}%`}>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(goal.current, goal.target)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ProgressTracker;
