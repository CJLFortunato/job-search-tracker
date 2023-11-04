import { Response } from 'express';

import Tag from './tag.schema.js';
import { Tag as TagType } from './types.js';

export default class TagsControllers {
  static async getTags(req: any, res: Response, next) {
    try {
      const tags = await Tag.find({ user: req.user.id });

      res.status(200).json(tags);
    } catch (error) {
      next(error);
    }
  }

  static async createTags(req: any, res: Response, next) {
    try {
      const newTagsWithUsers = req.body.map((tag: TagType) => ({
        ...tag,
        user: req.user.id,
      }));
      const newTags = await Tag.create(newTagsWithUsers);

      res.status(201).json(newTags);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTag(req: any, res: Response, next) {
    try {
      const tag = await Tag.findById(req.params.id);

      if (!tag) {
        res.status(400);
        throw new Error('Goal not found');
      }

      if (tag.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
      }

      const deletedTag = await Tag.findByIdAndDelete(req.params.id);

      res.status(200).json(deletedTag);
    } catch (error) {
      next(error);
    }
  }
}
