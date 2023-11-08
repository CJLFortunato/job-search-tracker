/* eslint-disable no-await-in-loop */
import { Types } from 'mongoose';

import Tag from './tag.schema.js';
import { Tag as TagType } from './types.js';

const addTagToApp = async (tags: any[], app: any, userId: any) => {
  const newTags: Types.ObjectId[] = [];

  for (let i = 0; i < tags.length; i += 1) {
    const tagInDb: TagType = await Tag.findById(tags[i]);

    if (tagInDb) {
      if (!tagInDb.applications.find((a) => a === app._id)) {
        const newObj: TagType = {
          _id: tagInDb._id,
          label: tagInDb.label,
          user: tagInDb.user,
          applications: [...tagInDb.applications, app._id],
        };

        const updatedTag: TagType = await Tag.findByIdAndUpdate(tagInDb._id, newObj);
        newTags.push(updatedTag._id);
      } else {
        newTags.push(tagInDb._id);
      }
    } else {
      const newTag: TagType = await Tag.create({
        ...tags[i],
        user: userId,
        applications: [app._id],
      });
      newTags.push(newTag._id);
    }
  }

  return newTags;
};

export default addTagToApp;
