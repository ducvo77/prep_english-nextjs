import { combineReducers, configureStore } from "@reduxjs/toolkit";
import answerReducer from "./features/answerSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// import createLogger from "redux-logger";

const reducers = combineReducers({
  answerReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// export const store = configureStore({
//   reducer: {
//     answerReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
