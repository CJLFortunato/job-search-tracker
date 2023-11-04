import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import validatePayload from '../middlewares/validateMiddleware.js';
import UsersControllers from './users.controllers.js';

const router = express.Router();
// GET logout current user by deleting cookie, protected
router.route('/logout').get(authMiddleware, UsersControllers.logout);

// POST register user
router.route('/register').post(validatePayload, UsersControllers.registerUser);

// PUT modify current user, protected
router.route('/:id').put(authMiddleware, validatePayload, UsersControllers.modifyUser);

// DELETE current user, protected
router.route('/:id').delete(authMiddleware, UsersControllers.deleteUser);

// POST login
router.route('/login').post(validatePayload, UsersControllers.loginUser);

export default router;
