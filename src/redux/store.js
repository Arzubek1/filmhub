import { configureStore } from "@reduxjs/toolkit";
import  mainSlice  from "./mainSlice"; // default экспорт – reducer

export const store = configureStore({
  reducer: {
    firstReducer: mainSlice, // key (state slice) жана reducer
  },
});
