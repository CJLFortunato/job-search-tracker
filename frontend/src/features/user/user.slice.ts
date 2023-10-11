import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  isLoading: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = '';
      state.user = undefined;
    }
  },
});

export const {
  reset
} = userSlice.actions;
export default userSlice.reducer;