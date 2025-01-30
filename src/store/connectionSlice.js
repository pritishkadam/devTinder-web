import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    connections: [],
  },
  reducers: {
    addConnection: (state, action) => {
      state.connections.push(action.payload);
    },
    removeConnection: (state, action) => {
      state.connections = null;
    },
  },
});

export default connectionSlice.reducer;

export const { addConnection, removeConnection } = connectionSlice.actions;
