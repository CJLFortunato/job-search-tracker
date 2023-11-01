import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import validatePayload from '../middlewares/validateMiddleware.js';
import TagsControllers from './tags.controllers.js';

const router = express.Router();

// GET all tags for a given user
router.route('/').get(authMiddleware, TagsControllers.getTags);

// POST create a tag
router.route('/').post(authMiddleware, validatePayload, TagsControllers.createTags);

// DELETE a tag
router.route('/:id').delete(authMiddleware, TagsControllers.deleteTag);

export default router;
