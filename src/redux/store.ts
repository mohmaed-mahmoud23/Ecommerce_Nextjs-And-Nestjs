// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "./slices/ApiSlice";
import addressReducer from "../redux/slices/AdreeSlice";

export const store = configureStore({
  reducer: {
    


        [ApiSlice.reducerPath]: ApiSlice.reducer,
  address: addressReducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware({
      serializableCheck :false
    }).concat([ApiSlice.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
