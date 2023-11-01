import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import validatePayload from '../middlewares/validateMiddleware.js';
import ApplicationsControllers from './apps.controllers.js';

const router = express.Router();

// GET all applications
router.route('/').get(authMiddleware, ApplicationsControllers.getApps);

// POST create an application
router.route('/').post(authMiddleware, validatePayload, ApplicationsControllers.createApp);

// PUT modify an application
router.route('/:id').put(authMiddleware, validatePayload, ApplicationsControllers.updateApp);

// DELETE an application
router.route('/:id').delete(authMiddleware, ApplicationsControllers.deleteApp);

export default router;
