import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/userSlice';
import profileSlice from '../store/profileSlice';
import requestSlice from '../store/requestSlice';
import connectionSlice from '../store/connectionSlice';
import feedSlice from '../store/feedSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    request: requestSlice,
    connection: connectionSlice,
    feed: feedSlice,
  },
});

export default store;
