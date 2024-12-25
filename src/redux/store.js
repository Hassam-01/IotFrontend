import { configureStore } from "@reduxjs/toolkit";
import userIDReducer from "../features/userID/userIDSlice";

const store = configureStore({
  reducer: {
    userID: userIDReducer,
  },
});

export default store;
