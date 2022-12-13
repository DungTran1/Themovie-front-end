import { configureStore, combineReducers } from "@reduxjs/toolkit";
import rootReducer from "../reducer/currentUserSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootRedu = combineReducers({ currentUserReducer: rootReducer });
const persistedReducer = persistReducer(persistConfig, rootRedu);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof rootRedu>;
