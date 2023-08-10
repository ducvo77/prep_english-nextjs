// https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {} as InfoTestStates;

export const infoTest = createSlice({
  name: "partTest",
  initialState,
  reducers: {
    getPartTest(state, action: PayloadAction<InfoTestStates>) {
      return { ...state, part: action.payload.part };
    },
    getInfoTest(state, action: PayloadAction<InfoTestStates>) {
      return {
        ...state,
        title: action.payload.title,
        label: action.payload.label,
        question_number: action.payload.question_number,
      };
    },
    getTimeTest(state, action: PayloadAction<InfoTestStates>) {
      return { ...state, time: action.payload.time };
    },
    clearInfoTest() {
      return {
        title: "",
        label: "",
        part: "",
        time: "",
      };
    },
  },
});

export const { getInfoTest, getPartTest, clearInfoTest, getTimeTest } =
  infoTest.actions;
export default infoTest.reducer;
