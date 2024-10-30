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
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip
} from '@mui/material';
import { Restaurant, Delete, Edit } from '@mui/icons-material';

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' }
];

const MealTracker = () => {
  const [open, setOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [currentMeal, setCurrentMeal] = useState({
    type: '',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    notes: ''
  });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => {
    setCurrentMeal({
      ...currentMeal,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editing !== null) {
      const updatedMeals = [...meals];
      updatedMeals[editing] = currentMeal;
      setMeals(updatedMeals);
      setEditing(null);
    } else {
      setMeals([...meals, { ...currentMeal, id: Date.now() }]);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentMeal({
      type: '',
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      notes: ''
    });
    setEditing(null);
  };

  const handleEdit = (index) => {
    setCurrentMeal(meals[index]);
    setEditing(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);
  };

  return (
    <>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Restaurant sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Meal Tracker
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ alignSelf: 'flex-start', mb: 2 }}
        >
          Log Meal
        </Button>

        <List>
          {meals.map((meal, index) => (
            <ListItem
              key={meal.id}
              sx={{
                border: '1px solid #eee',
                borderRadius: 1,
                mb: 1
              }}
            >
              <ListItemText
                primary={meal.name}
                secondary={
                  <Box component="span" sx={{ mt: 1 }}>
                    <Chip
                      label={`${meal.calories} cal`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`P: ${meal.protein}g`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`C: ${meal.carbs}g`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`F: ${meal.fat}g`}
                      size="small"
                    />
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(index)}
                  sx={{ mr: 1 }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editing !== null ? 'Edit Meal' : 'Log Meal'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Meal Type"
                name="type"
                value={currentMeal.type}
                onChange={handleChange}
              >
                {mealTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Meal Name"
                name="name"
                value={currentMeal.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Calories"
                name="calories"
                type="number"
                value={currentMeal.calories}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Protein (g)"
                name="protein"
                type="number"
                value={currentMeal.protein}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Carbs (g)"
                name="carbs"
                type="number"
                value={currentMeal.carbs}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fat (g)"
                name="fat"
                type="number"
                value={currentMeal.fat}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Notes"
                name="notes"
                value={currentMeal.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editing !== null ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MealTracker;
