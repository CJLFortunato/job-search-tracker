import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

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
        const tokenCookie = cookie.serialize('jwt_token', generateJWT(user.id), {
          httpOnly: true, // il ne se transmet que via les requetes HTTP -> Impossible de le recupérer en JS avec document.cookie
          secure: false, // si true, le cookie ne sera transmis que si il y a un certificat SSL en place (imperatif sur un site en production)
          maxAge: 21600, // durée de validité du token, en secondes
          path: '/', // le chemin depuis l'URL racine de votre app qui indique où est valide le token
        });

        res.setHeader('Set-Cookie', tokenCookie);
        res.status(201).json({
          _id: user.id,
          email: user.email,
        });
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

      const user = await User.findOne({
        email,
      });

      if (!user) {
        res.status(400);
        throw new Error('Incorrect email address');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const tokenCookie = cookie.serialize('jwt_token', generateJWT(user.id), {
          httpOnly: true, // il ne se transmet que via les requetes HTTP -> Impossible de le recupérer en JS avec document.cookie
          secure: false, // si true, le cookie ne sera transmis que si il y a un certificat SSL en place (imperatif sur un site en production)
          maxAge: 21600, // durée de validité du token, en secondes
          path: '/', // le chemin depuis l'URL racine de votre app qui indique où est valide le token
        });

        res.setHeader('Set-Cookie', tokenCookie);
        res.status(200).json({
          _id: user.id,
          email: user.email,
        });
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
    const {
      email,
      password,
    } = body;

    const { id } = params;

    try {
      if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
      }

      const user = await User.findById(id);

      if (!user) {
        res.status(400);
        throw new Error('User not found');
      }

      const updatedUser = await User.findByIdAndUpdate(id, body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser (req: Request, res: Response, next) {
    const { params } = req;

    const { id } = params;

    try {
      const user = await User.findById(id);

      if (!user) {
        res.status(400);
        throw new Error('User not found');
      }

      await User.findByIdAndDelete(id);
      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  static async findUser (req: Request, res: Response, next) {
    const { params } = req;

    const { id } = params;

    try {
      const user = await User.findById(id);

      if (!user) {
        res.status(400);
        throw new Error('User not found');
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
