import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import User from './user.schema';

// Generate jwt token
const generateJWT = (id: Types.ObjectId) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

export default class UserControllers {
  static async registerUser (req, res) {
    const { body } = req;
    const {
      name,
      email,
      password,
    } = body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // check if user exists
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(24);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateJWT(user.id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }

  static async loginUser (req, res) {
    const { body } = req;
    const {
      email,
      password,
    } = body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400);
      throw new Error('Incorrect email address');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      res.status(200).json({
        _id: user.id,
        email: user.email,
        token: generateJWT(user.id),
      });
    } else {
      res.status(400);
      throw new Error('Incorrect password');
    }
  }
}
