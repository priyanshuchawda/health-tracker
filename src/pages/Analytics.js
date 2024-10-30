import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    CircularProgress,
    TextField,
    MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Line, Bar } from 'react-chartjs-2';
import api from '../services/api';

const Analytics = () => {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: dayjs().subtract(30, 'day'),
        endDate: dayjs()
    });
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, [dateRange]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await api.get('/analytics/summary', {
                params: {
                    startDate: dateRange.startDate.toISOString(),
                    endDate: dateRange.endDate.toISOString()
                }
            });
            setAnalyticsData(response.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const weightChartData = {
        labels: analyticsData?.weightProgress.map(wp => wp._id) || [],
        datasets: [{
            label: 'Weight (kg)',
            data: analyticsData?.weightProgress.map(wp => wp.weight) || [],
            borderColor: '#2196f3',
            tension: 0.1
        }]
    };

    const exerciseChartData = {
        labels: analyticsData?.exerciseSummary.map(es => es._id) || [],
        datasets: [{
            label: 'Duration (minutes)',
            data: analyticsData?.exerciseSummary.map(es => es.totalDuration) || [],
            backgroundColor: '#4caf50'
        }]
    };

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
                {/* Date Range Selector */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', gap: 2 }}>
                        <DatePicker
                            label="Start Date"
                            value={dateRange.startDate}
                            onChange={(newValue) => setDateRange(prev => ({
                                ...prev,
                                startDate: newValue
                            }))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="End Date"
                            value={dateRange.endDate}
                            onChange={(newValue) => setDateRange(prev => ({
                                ...prev,
                                endDate: newValue
                            }))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Paper>
                </Grid>

                {/* Trends Summary */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Trends
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1">
                                    Weight Change:
                                    <Typography component="span" color={
                                        analyticsData?.trends.weightChange > 0 ? 'error' : 'success'
                                    }>
                                        {` ${analyticsData?.trends.weightChange.toFixed(1)} kg`}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1">
                                    Avg. Calories Burned:
                                    <Typography component="span" color="success">
                                        {` ${analyticsData?.trends.averageCaloriesBurned.toFixed(0)} kcal`}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1">
                                    Avg. Calories Consumed:
                                    <Typography component="span" color="primary">
                                        {` ${analyticsData?.trends.averageCaloriesConsumed.toFixed(0)} kcal`}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Weight Progress Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Weight Progress
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <Line data={weightChartData} options={{ maintainAspectRatio: false }} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Exercise Summary Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Exercise Summary
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <Bar data={exerciseChartData} options={{ maintainAspectRatio: false }} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Analytics;
