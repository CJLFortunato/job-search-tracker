import { Response } from 'express';

import Tag from './tag.schema.js';

export default class TagsControllers {
  static async getTags(req: any, res: Response, next) {
    try {
      const apps = await Tag.find({ user: req.user.id });

      res.status(200).json(apps);
    } catch (error) {
      next(error);
    }
  }

  static async createTag(req: any, res: Response, next) {
    try {
      const newApp = await Tag.create({
        ...req.body,
        user: req.user.id,
      });

      res.status(201).json(newApp);
    } catch (error) {
      next(error);
    }
  }

  static async updateTag(req: any, res: Response, next) {
    try {
      const app = await Tag.findById(req.params.id);

      if (!app) {
        res.status(400);
        throw new Error('Goal not found');
      }

      if (app.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
      }

      const updatedApp = await Tag.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(updatedApp);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTag(req: any, res: Response, next) {
    try {
      const app = await Tag.findById(req.params.id);

      if (!app) {
        res.status(400);
        throw new Error('Goal not found');
      }

      if (app.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
      }

      const deletedApp = await Tag.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedApp);
    } catch (error) {
      next(error);
    }
  }
}
