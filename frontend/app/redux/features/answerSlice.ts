// https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AnswerState = {
  number: number;
  value: string;
};

const initialState = [] as AnswerState[];

export const answer = createSlice({
  name: "answer",
  initialState,
  reducers: {
    enteredAnswer: (state, action: PayloadAction<AnswerState>) => {
      if (
        action.payload.value !== "" &&
        !state.find((item) => item.number === action.payload.number)
      ) {
        return [
          ...state,
          {
            number: action.payload.number,
            value: action.payload.value,
          },
        ];
      }

      if (action.payload.value === "") {
        return state.filter((item) => item.number !== action.payload.number);
      }

      if (
        action.payload.value !== "" &&
        state.find((item) => item.number === action.payload.number)
      ) {
        return state.map((item) => {
          if (item.number === action.payload.number) {
            return { ...item, value: action.payload.value };
          }
          return item;
        });
      }
      return state;
    },
    clearAnswer: () => {
      return [];
    },
  },
});

export const { enteredAnswer, clearAnswer } = answer.actions;
export default answer.reducer;
//TH1: value = "" -> undifiend, number chua co => return
//TH2: value != "", number chua co => tao them 1 object
//TH3: value != "", number co roi => update value
//TH4: value != "" va value = value da co, number da co => return
