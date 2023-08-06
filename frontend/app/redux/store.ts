import { combineReducers, configureStore } from "@reduxjs/toolkit";
import answerReducer from "./features/answerSlice";
import infoTestReducer from "./features/infoTestSlice";
import persistReducer from "redux-persist/es/persistReducer";
// import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";
// import createLogger from "redux-logger";

const reducers = combineReducers({
  answerReducer,
  infoTestReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
