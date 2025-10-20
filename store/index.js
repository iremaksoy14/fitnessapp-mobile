import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileReducer from "./profileSlice";

const rootReducer = combineReducers({
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["profile"], // sadece profile dilimini kalıcı yap
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
});

export const persistor = persistStore(store);

// Selectors
export const selectBooting = (state) => state.profile.booting;
export const selectHasProfile = (state) => state.profile.hasProfile;
export const selectProfile = (state) => state.profile.profile;
