/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
} from '@reduxjs/toolkit';

import { State } from './types';

const initialState: State = {
  tags: [],
  isLoading: false,
  error: '',
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = '';
      state.tags = [];
    },
    getTags: (state) => {
      state.isLoading = true;
    },
    getTagsSuccess: (state, action) => {
      state.isLoading = false;
      state.tags = action.payload;
    },
    getTagsFailure: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.error = action.payload;
    },
    createTags: (state, action) => {
      state.isLoading = true;
    },
    createTagsSuccess: (state, action) => {
      state.isLoading = false;
      state.tags = [...state.tags, ...action.payload];
    },
    createTagsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteTags: (state, action) => {
      state.isLoading = true;
    },
    deleteTagsSuccess: (state, action) => {
      state.isLoading = false;
      state.tags = state.tags.filter((tag) => tag._id !== action.payload._id);
    },
    deleteTagsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  actions: {
    reset,
    getTags,
    getTagsSuccess,
    getTagsFailure,
    createTags,
    createTagsSuccess,
    createTagsFailure,
    deleteTags,
    deleteTagsSuccess,
    deleteTagsFailure,
  },
} = tagsSlice;
export default tagsSlice.reducer;
