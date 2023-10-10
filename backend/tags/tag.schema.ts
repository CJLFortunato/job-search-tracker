import mongoose from 'mongoose';

import { Tag } from './types';

const tagSchema = new mongoose.Schema<Tag>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  label: {
    type: String,
    required: [true, 'Please add a label'],
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],
}, {
  timestamps: true,
});

export default mongoose.model<Tag>('Tag', tagSchema);
