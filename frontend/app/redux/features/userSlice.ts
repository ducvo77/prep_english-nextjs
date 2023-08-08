// https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserStates = {};

const initialState = {} as UserStates;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logOut: () => {
      return {};
    },
  },
});

export const { getUser, logOut } = user.actions;
export default user.reducer;
