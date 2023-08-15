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
        id: action.payload.id,
        title: action.payload.title,
        label: action.payload.label,
        question_number: action.payload.question_number,
      };
    },
    getTimeTest(state, action: PayloadAction<InfoTestStates>) {
      return { ...state, time: action.payload.time };
    },
    getCorrectAmount(state, action: PayloadAction<InfoTestStates>) {
      return {
        ...state,
        correct_amount: action.payload.correct_amount,
      };
    },
    clearInfoTest() {
      return {
        title: "",
        label: "",
        part: "",
        time: "",
        correct_amount: 0,
      };
    },
  },
});

export const {
  getInfoTest,
  getPartTest,
  clearInfoTest,
  getTimeTest,
  getCorrectAmount,
} = infoTest.actions;
export default infoTest.reducer;
