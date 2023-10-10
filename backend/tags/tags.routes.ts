import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import TagsControllers from './tags.controllers.js';

const router = express.Router();

// GET all applications
router.route('/').get(authMiddleware, TagsControllers.getTags);

// POST create an application
router.route('/').post(authMiddleware, TagsControllers.createTag);

// PUT modify an application
router.route('/:id').put(authMiddleware, TagsControllers.updateTag);

// DELETE an application
router.route('/:id').delete(authMiddleware, TagsControllers.deleteTag);

export default router;
