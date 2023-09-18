import mongoose from 'mongoose';

import { User } from './types';

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
}, {
  timestamps: true,
});

export default mongoose.model<User>('User', userSchema);
