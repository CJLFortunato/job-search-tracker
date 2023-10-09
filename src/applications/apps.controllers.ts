import { Response } from 'express';

import Application from './apps.schema.js';

export default class ApplicationsControllers {
  static async getApps(req: any, res: Response, next) {
    try {
      const apps = await Application.find({ user: req.user.id });

      res.status(200).json(apps);
    } catch (error) {
      next(error);
    }
  }

  static async createApp(req: any, res: Response, next) {
    try {
      const newApp = await Application.create({
        ...req.body,
        user: req.user.id,
      });

      res.status(201).json(newApp);
    } catch (error) {
      next(error);
    }
  }

  static async updateApp(req: any, res: Response, next) {
    try {
      const app = await Application.findById(req.params.id);

      if (!app) {
        res.status(400);
        throw new Error('Goal not found');
      }

      if (app.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
      }

      const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(updatedApp);
    } catch (error) {
      next(error);
    }
  }

  static async deleteApp(req: any, res: Response, next) {
    try {
      const app = await Application.findById(req.params.id);

      if (!app) {
        res.status(400);
        throw new Error('Goal not found');
      }

      if (app.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
      }

      const deletedApp = await Application.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedApp);
    } catch (error) {
      next(error);
    }
  }
}
