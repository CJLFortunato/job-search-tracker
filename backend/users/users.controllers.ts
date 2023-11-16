import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import { User as UserType } from './types.js';
import User from './user.schema.js';

// Generate jwt token
const generateJWT = (id: Types.ObjectId) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

export default class UserControllers {
  static async registerUser (req: Request, res: Response, next) {
    const { body } = req;
    const {
      email,
      password,
    } = body;

    try {
      if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
      }

      // check if user exists
      const userExists: UserType = await User.findOne({
        email,
      });
      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user: UserType = await User.create({
        email,
        password: hashedPassword,
      });
      if (user) {
        res.cookie('cleanup', generateJWT(user._id), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'prod',
          path: '/',
        });
        res.status(200).json({
          _id: user._id,
          email: user.email,
        }).send();
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } catch (error) {
      next(error);
    }
  }

  static async loginUser (req: Request, res: Response, next) {
    const { body } = req;
    const {
      email,
      password,
    } = body;

    try {
      if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
      }

      const user: UserType = await User.findOne({
        email,
      });

      if (!user) {
        res.status(400);
        throw new Error('Incorrect email address');
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        res.cookie('cleanup', generateJWT(user._id), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'prod',
          path: '/',
        });
        res.status(200).json({
          _id: user._id,
          email: user.email,
        }).send();
      } else {
        res.status(400);
        throw new Error('Incorrect password');
      }
    } catch (error) {
      next(error);
    }
  }

  static async modifyUser (req: Request, res: Response, next) {
    const { body, params } = req;
    const { id } = params;

    try {
      const user: UserType = await User.findById(id);

      if (!user) {
        res.status(400);
        throw new Error('User not found');
      }

      let updatedUser: any = {};

      if (body.password) {
        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        updatedUser = await User.findByIdAndUpdate(id, {
          ...body,
          password: hashedPassword,
        }, {
          new: true,
        });
      } else {
        updatedUser = await User.findByIdAndUpdate(id, body, {
          new: true,
        });
      }

      const updatedUserWithoutPassword = {
        _id: updatedUser._id,
        email: updatedUser.email,
      };
      res.status(200).json(updatedUserWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser (req: Request, res: Response, next) {
    const { params } = req;

    const { id } = params;

    try {
      const user: UserType = await User.findById(id);

      if (!user) {
        res.status(400);
        throw new Error('User not found');
      }

      await User.findByIdAndDelete(id);
      res.clearCookie('cleanup', {
        httpOnly: true,
        secure: false,
        path: '/',
      }).send({});
    } catch (error) {
      next(error);
    }
  }

  static async logout (req: Request, res: Response, next) {
    try {
      res.clearCookie('cleanup', {
        httpOnly: true,
        secure: false,
        path: '/',
      }).send({});
    } catch (error) {
      next(error);
    }
  }
}
