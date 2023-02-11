import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/currentUserSlice";

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
