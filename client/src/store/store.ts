import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import trainReducer from "./train/trainSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    train: trainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
