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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import {
  Flag,
  Delete,
  Edit,
  Add as AddIcon
} from '@mui/icons-material';

const goalTypes = [
  { value: 'weight', label: 'Weight Goal' },
  { value: 'exercise', label: 'Exercise Goal' },
  { value: 'nutrition', label: 'Nutrition Goal' },
  { value: 'water', label: 'Water Intake Goal' }
];

const GoalsTracker = () => {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({
    type: '',
    target: '',
    deadline: '',
    notes: ''
  });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => {
    setCurrentGoal({
      ...currentGoal,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editing !== null) {
      const updatedGoals = [...goals];
      updatedGoals[editing] = currentGoal;
      setGoals(updatedGoals);
      setEditing(null);
    } else {
      setGoals([...goals, { ...currentGoal, id: Date.now() }]);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentGoal({
      type: '',
      target: '',
      deadline: '',
      notes: ''
    });
    setEditing(null);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Flag sx={{ mr: 1 }} />
          <Typography variant="h6">Goals</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Goal
        </Button>
      </Box>

      <List>
        {goals.map((goal, index) => (
          <ListItem
            key={goal.id}
            sx={{ border: '1px solid #eee', borderRadius: 1, mb: 1 }}
          >
            <ListItemText
              primary={goalTypes.find(t => t.value === goal.type)?.label}
              secondary={
                <>
                  <Typography variant="body2">
                    Target: {goal.target}
                  </Typography>
                  <Typography variant="body2">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  setCurrentGoal(goal);
                  setEditing(index);
                  setOpen(true);
                }}
                sx={{ mr: 1 }}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => {
                  const newGoals = goals.filter((_, i) => i !== index);
                  setGoals(newGoals);
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editing !== null ? 'Edit Goal' : 'Add New Goal'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              select
              label="Goal Type"
              name="type"
              value={currentGoal.type}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {goalTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Target"
              name="target"
              value={currentGoal.target}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Deadline"
              name="deadline"
              type="date"
              value={currentGoal.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              name="notes"
              value={currentGoal.notes}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editing !== null ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default GoalsTracker;
