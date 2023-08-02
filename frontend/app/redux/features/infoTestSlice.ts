// https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InfoTestStates = {
  title?: string;
  label?: string;
  part?: string;
  time?: string;
};

const initialState = {} as InfoTestStates;

export const infoTest = createSlice({
  name: "partTest",
  initialState,
  reducers: {
    getPartTest(state, action: PayloadAction<InfoTestStates>) {
      return { ...state, part: action.payload.part };
    },
    getTitleTest(state, action: PayloadAction<InfoTestStates>) {
      return { ...state, title: action.payload.title };
    },
    getLabelTest(state, action: PayloadAction<InfoTestStates>) {
      return { ...state, label: action.payload.label };
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

export const {
  getTitleTest,
  getLabelTest,
  getTimeTest,
  getPartTest,
  clearInfoTest,
} = infoTest.actions;
export default infoTest.reducer;
