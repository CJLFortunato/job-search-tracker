import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import UsersControllers from './users.controllers.js';

const router = express.Router();

router.route('/logout').get(authMiddleware, UsersControllers.logout);
// GET current user, protected
router.route('/:id').get(authMiddleware, UsersControllers.findUser);

// POST register user
router.route('/register').post(UsersControllers.registerUser);

// PUT modify current user, protected
router.route('/:id').put(authMiddleware, UsersControllers.modifyUser);

// DELETE current user, protected
router.route('/:id').delete(authMiddleware, UsersControllers.deleteUser);

// POST login
router.route('/login').post(UsersControllers.loginUser);

export default router;
