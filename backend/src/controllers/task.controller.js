import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    user: req.user._id
  });

  res.status(201).json({ success: true, message: 'Task created successfully', task });
});

export const getTasks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };

  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;

  const [tasks, total] = await Promise.all([
    Task.find(filter).populate('user', 'name email role').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Task.countDocuments(filter)
  ]);

  res.json({
    success: true,
    count: tasks.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    tasks
  });
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('user', 'name email role');

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (req.user.role !== 'admin' && task.user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not allowed to access this task');
  }

  res.json({ success: true, task });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (req.user.role !== 'admin' && task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not allowed to update this task');
  }

  const allowedUpdates = ['title', 'description', 'status', 'priority'];
  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) task[field] = req.body[field];
  });

  const updatedTask = await task.save();
  res.json({ success: true, message: 'Task updated successfully', task: updatedTask });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (req.user.role !== 'admin' && task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not allowed to delete this task');
  }

  await task.deleteOne();
  res.json({ success: true, message: 'Task deleted successfully' });
});
