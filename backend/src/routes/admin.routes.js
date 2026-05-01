import express from 'express';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';
import { getAllUsers, getStats } from '../controllers/admin.controller.js';

const router = express.Router();

router.use(protect, authorizeRoles('admin'));

router.get('/users', getAllUsers);
router.get('/stats', getStats);

export default router;
