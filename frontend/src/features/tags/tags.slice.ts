/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { State, Tag, NewTag } from './types';

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
      state.error = '';
    },
    getTagsSuccess: (state, action: PayloadAction<Tag[]>) => {
      state.isLoading = false;
      state.tags = action.payload;
    },
    getTagsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTags: (state, action: PayloadAction<NewTag[]>) => {
      state.isLoading = true;
      state.error = '';
    },
    createTagsSuccess: (state, action: PayloadAction<Tag[]>) => {
      state.isLoading = false;
      state.tags = [...state.tags, ...action.payload];
    },
    createTagsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteTags: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = '';
    },
    deleteTagsSuccess: (state, action: PayloadAction<Tag>) => {
      state.isLoading = false;
      state.tags = state.tags.filter((tag) => tag._id !== action.payload._id);
    },
    deleteTagsFailure: (state, action: PayloadAction<string>) => {
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
