import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import ApplicationsControllers from './apps.controllers.js';

const router = express.Router();

// GET all applications
router.route('/').get(authMiddleware, ApplicationsControllers.getApps);

// POST create an application
router.route('/').post(authMiddleware, ApplicationsControllers.createApp);

// PUT modify an application
router.route('/:id').put(authMiddleware, ApplicationsControllers.updateApp);

// DELETE an application
router.route('/:id').delete(authMiddleware, ApplicationsControllers.deleteApp);

export default router;
