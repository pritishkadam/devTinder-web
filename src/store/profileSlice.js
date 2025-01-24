import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
  },
  reducers: {
    saveProfileDetails: (state, action) => {
      state.profile = action.payload;
    },
    removeProfileDetails: (state, action) => {
      state.profile = null;
    },
  },
});

export default profileSlice.reducer;

export const { saveProfileDetails, removeProfileDetails } =
  profileSlice.actions;
