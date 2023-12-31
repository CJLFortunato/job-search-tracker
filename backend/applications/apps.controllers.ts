import { Response } from 'express';

import { Types } from 'mongoose';

import addTagToApp from '../tags/tag.crud.js';
import Application from './apps.schema.js';
import { Application as AppType } from './types.js';

export default class ApplicationsControllers {
  static async getApps(req: any, res: Response, next) {
    try {
      const apps: AppType[] = await Application.find({ user: req.user.id }).populate('tags').exec();

      res.status(200).json(apps);
    } catch (error) {
      next(error);
    }
  }

  static async createApp(req: any, res: Response, next) {
    try {
      const newApp: AppType = await Application.create({
        ...req.body,
        user: req.user.id,
      });

      const tags: Types.ObjectId[] = await addTagToApp(req.body.tags, newApp, req.user.id);

      const newAppWithTags: AppType = await Application.findByIdAndUpdate(newApp._id, {
        ...newApp,
        tags,
      }, {
        new: true,
      }).populate('tags');
      res.status(201).json(newAppWithTags);
    } catch (error) {
      next(error);
    }
  }

  static async updateApp(req: any, res: Response, next) {
    try {
      const app: AppType = await Application.findById(req.params.id);
      if (!app) {
        res.status(400);
        throw new Error('Application not found');
      }

      if (app.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
      }
      const tags: Types.ObjectId[] = await addTagToApp(req.body.tags, app, req.user.id);

      const updatedApp: AppType = await Application.findByIdAndUpdate(req.params.id, {
        ...req.body,
        tags,
      }, {
        new: true,
      }).populate('tags');

      res.status(200).json(updatedApp);
    } catch (error) {
      next(error);
    }
  }

  static async deleteApp(req: any, res: Response, next) {
    try {
      const app: AppType = await Application.findById(req.params.id);

      if (!app) {
        res.status(400);
        throw new Error('Goal not found');
      }

      if (app.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
      }

      const deletedApp: AppType = await Application.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedApp);
    } catch (error) {
      next(error);
    }
  }
}
