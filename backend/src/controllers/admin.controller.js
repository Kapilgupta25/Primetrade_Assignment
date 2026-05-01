import User from '../models/User.js';
import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, users });
});

export const getStats = asyncHandler(async (req, res) => {
  const [users, tasks, completedTasks, pendingTasks] = await Promise.all([
    User.countDocuments(),
    Task.countDocuments(),
    Task.countDocuments({ status: 'completed' }),
    Task.countDocuments({ status: 'pending' })
  ]);

  res.json({
    success: true,
    stats: { users, tasks, completedTasks, pendingTasks }
  });
});
