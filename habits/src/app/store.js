import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habitslice";

export const store = configureStore({
  reducer: {
    habit: habitReducer,
  },
});
