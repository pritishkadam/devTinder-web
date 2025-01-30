import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    receivedRequestDetails: null,
  },
  reducers: {
    addRequestData: (state, action) => {
      state.receivedRequestDetails = action.payload;
    },
    removeRequestData: (state, action) => {
      const {id} = action.payload;
      state.receivedRequestDetails = state.receivedRequestDetails.filter((item) => item._id !== id);
    },
  },
});

export default requestSlice.reducer;

export const { addRequestData, removeRequestData } = requestSlice.actions;
