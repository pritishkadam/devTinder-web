import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    feedData: null,
  },
  reducers: {
    addFeed: (state, action) => {
      state.feedData = action.payload;
    },
    removeFeed: (state, action) => {
      const { id } = action.payload;
      state.feedData = state.feedData.filter((element) => element._id !== id);
    },
  },
});

export default feedSlice.reducer;

export const { addFeed, removeFeed } = feedSlice.actions;
