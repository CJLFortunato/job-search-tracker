import mongoose from 'mongoose';

import { Application } from './types';

const appSchema = new mongoose.Schema<Application>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  jobTitle: {
    type: String,
    required: [true, 'Please make sure all fields are filled'],
  },
  companyName: {
    type: String,
    required: [true, 'Please make sure all fields are filled'],
  },
  contractType: {
    type: String,
    required: [true, 'Please make sure all fields are filled'],
  },
  jobLink: {
    type: String,
    required: [true, 'Please make sure all fields are filled'],
  },
  companyLink: {
    type: String,
  },
  appType: {
    type: String,
    required: [true, 'Please make sure all fields are filled'],
  },
  location: {
    type: String,
    required: [true, 'Please make sure all fields are filled'],
  },
  contactName: {
    type: String,
    required: false,
  },
  coverLetter: {
    type: Boolean,
    required: [true, 'Please make sure all fields are filled'],
  },
  status: {
    type: Number,
    required: [true, 'Please make sure all fields are filled'],
  },
  steps: {
    apply: {
      date: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
    },
    followUp: {
      date: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
    },
    interview: {
      date: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
    },
    answer: {
      date: {
        type: String,
        required: false,
      },
      outcome: {
        type: String,
        required: false,
      },
    },
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
}, {
  timestamps: true,
});

export default mongoose.model<Application>('Application', appSchema);
