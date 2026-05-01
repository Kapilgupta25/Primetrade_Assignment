import express from 'express';
import { body, param } from 'express-validator';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(
    [
      body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
      body('description').trim().isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
      body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
      body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
    ],
    validate,
    createTask
  )
  .get(getTasks);

router
  .route('/:id')
  .get([param('id').isMongoId().withMessage('Invalid task id')], validate, getTaskById)
  .put(
    [
      param('id').isMongoId().withMessage('Invalid task id'),
      body('title').optional().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
      body('description').optional().trim().isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
      body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
      body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
    ],
    validate,
    updateTask
  )
  .delete([param('id').isMongoId().withMessage('Invalid task id')], validate, deleteTask);

export default router;
