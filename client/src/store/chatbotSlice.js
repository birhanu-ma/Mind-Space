import { createSlice } from "@reduxjs/toolkit";

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    isOpen: false,
  },
  reducers: {
    switchChatbot: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { switchChatbot } = chatbotSlice.actions;
export default chatbotSlice.reducer;
