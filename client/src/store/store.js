import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./notificationSlice";
import chatbotReducer from "./chatbotSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    chatbot: chatbotReducer,
    user: userReducer,

  },
});
export default store;
