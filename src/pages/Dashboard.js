import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  Timeline,
  FitnessCenter,
  WaterDrop,
  Restaurant,
  SentimentSatisfiedAlt,
  Add as AddIcon
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { health } from '../services/api';
import AddHealthLogDialog from '../components/dashboard/AddHealthLogDialog';
import ExerciseTracker from '../components/dashboard/ExerciseTracker';
import MealTracker from '../components/dashboard/MealTracker';
import ProgressTracker from '../components/dashboard/ProgressTracker';
import GoalsTracker from '../components/dashboard/GoalsTracker';  // Add this import

const Dashboard = () => {
  const [healthLogs, setHealthLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddLog, setOpenAddLog] = useState(false);

  useEffect(() => {
    fetchHealthLogs();
  }, []);

  const fetchHealthLogs = async () => {
    try {
      const response = await health.getLogs();
      setHealthLogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching health logs:', error);
      setLoading(false);
    }
  };

  const chartData = {
    labels: healthLogs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (kg)',
        data: healthLogs.map(log => log.weight),
        borderColor: '#2196f3',
        tension: 0.1
      }
    ]
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="Weight"
            value={`${healthLogs[0]?.weight || 0} kg`}
            icon={<Timeline color="primary" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Exercise"
            value="30 min"
            icon={<FitnessCenter color="secondary" />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Water"
            value={`${healthLogs[0]?.waterIntake || 0}L`}
            icon={<WaterDrop color="info" />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Mood"
            value={healthLogs[0]?.mood || 'Good'}
            icon={<SentimentSatisfiedAlt color="success" />}
            color="success"
          />
        </Grid>

        {/* Progress Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weight Progress
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        {/* Goals Tracker */}
        <Grid item xs={12} md={4}>
          <GoalsTracker />
        </Grid>

        {/* Exercise Tracker */}
        <Grid item xs={12} md={6}>
          <ExerciseTracker />
        </Grid>

        {/* Meal Tracker */}
        <Grid item xs={12} md={6}>
          <MealTracker />
        </Grid>

        {/* Progress Tracker */}
        <Grid item xs={12}>
          <ProgressTracker
            goals={[
              { id: 1, name: 'Weight Loss', current: 5, target: 10, unit: 'kg' },
              { id: 2, name: 'Exercise', current: 3, target: 5, unit: 'days/week' },
              { id: 3, name: 'Water Intake', current: 2, target: 3, unit: 'L' }
            ]}
          />
        </Grid>
      </Grid>

      <AddHealthLogDialog
        open={openAddLog}
        onClose={() => setOpenAddLog(false)}
        onSubmit={fetchHealthLogs}
      />
    </Container>
  );
};

export default Dashboard;
