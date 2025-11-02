import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./notificationSlice";
import chatbotReducer from "./chatbotSlice";
const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    chatbot: chatbotReducer,
  },
});
export default store;
