import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    unreadByRoom: {},
  },
  reducers: {
    incrementUnread: (state, action) => {
      const room = action.payload;
      state.unreadByRoom[room] = (state.unreadByRoom[room] || 0) + 1;
    },
    clearUnread: (state, action) => {
      const room = action.payload;
      state.unreadByRoom[room] = 0;
    },
    crearAllUnread: (state) => {
      state.unreadByRoom = {};
    },
  },
});

export const { incrementUnread, clearUnread, crearAllUnread } =
  notificationSlice.actions;
export default notificationSlice.reducer;
