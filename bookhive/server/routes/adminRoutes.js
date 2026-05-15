import express from 'express';
import { getUsers, deleteUser, getAdminStats } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/stats').get(protect, admin, getAdminStats);

export default router;
