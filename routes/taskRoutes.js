// routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task');
const taskSchema = require('../validation/taskValidation');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Create a task
router.post('/', authenticateToken, async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const task = new Task({
    text: req.body.text,
    userId: req.user._id,
    completed: false, // By default, a task is not completed
  });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// Get all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(req.user._id)
    
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
console.log(req.body)
console.log(req.user._id)
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Mark task as completed
router.patch('/:id/complete', authenticateToken, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { completed: true } },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark task as completed' });
  }
});

// Unmark task as completed
router.patch('/:id/uncomplete', authenticateToken, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { completed: false } },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to unmark task as completed' });
  }
});

module.exports = router;
