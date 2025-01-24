import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/userSlice';
import profileSlice from '../store/profileSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
  },
});

export default store;
