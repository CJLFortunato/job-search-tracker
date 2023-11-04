import jwt from 'jsonwebtoken';

import User from '../users/user.schema.js';

const authMiddleware = async (req, res, next) => {
  try {
    const { cookies } = req;
    const token = cookies.cleanup;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        res.status(401);
        throw new Error('User not authorized');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
