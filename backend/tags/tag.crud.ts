/* eslint-disable no-await-in-loop */
// import { Application } from '../applications/types.js';
import Tag from './tag.schema.js';

const addTagToApp = async (tags: any[], app: any, userId: any) => {
  const newTags = [];
  for (let i = 0; i < tags.length; i += 1) {
    const tagInDb = await Tag.findById(tags[i]);
    if (tagInDb) {
      if (!tagInDb.applications.find((a) => a === app._id)) {
        console.log({
          ...tagInDb,
          applications: [...tagInDb.applications, app._id],
        });
        const newObj = {
          _id: tagInDb._id,
          label: tagInDb.label,
          user: tagInDb.user,
          applications: [...tagInDb.applications, app._id],
        };
        console.log('newobj');
        console.log(newObj);
        const updatedTag = await Tag.findByIdAndUpdate(tagInDb._id, newObj);
        console.log('updated tag', updatedTag);
        newTags.push(updatedTag._id);
      }
    } else {
      const newTag = await Tag.create({
        ...tags[i],
        user: userId,
        applications: [app._id],
      });
      console.log('new tag', newTag);
      newTags.push(newTag._id);
    }
  }
  return newTags;
};

export default addTagToApp;
