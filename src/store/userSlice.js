import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.userDetails = action.payload;
    },
    removeUser: (state, action) => {
      state.userDetails = null;
    },
  },
});

export default userSlice.reducer;

export const { saveUser, removeUser } = userSlice.actions;
