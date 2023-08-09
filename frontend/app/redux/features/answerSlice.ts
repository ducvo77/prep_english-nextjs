// https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [] as AnswerState[];

export const answer = createSlice({
  name: "answer",
  initialState,
  reducers: {
    enteredAnswer: (state, action: PayloadAction<AnswerState>) => {
      //Trường hợp chưa có part đó trong mảng
      if (state.every((item) => item.name !== action.payload.name)) {
        return [
          ...state,
          {
            name: action.payload.name,
            data: [
              {
                number: action.payload.data[0].number,
                answer: action.payload.data[0].answer,
              },
            ],
          },
        ];
      }
      // Trường hợp có part đó trong mảng nhưng không có câu đó trong mảng
      if (
        state.some(
          (item) =>
            item.name === action.payload.name &&
            item.data.every(
              (item) => item.number !== action.payload.data[0].number
            )
        )
      ) {
        return [
          ...state.filter((item) => item.name !== action.payload.name),
          {
            name: action.payload.name,
            data: [
              ...state
                .filter((item) => item.name === action.payload.name)[0]
                .data.map((item) => item),
              {
                number: action.payload.data[0].number,
                answer: action.payload.data[0].answer,
              },
            ],
          },
        ];
      }

      // Trường hợp có part đó trong mảng, có câu đó trong mảng, muốn update lại value
      if (
        state.some(
          (item) =>
            item.name === action.payload.name &&
            item.data.some(
              (item) => item.number === action.payload.data[0].number
            )
        )
      ) {
        return [
          ...state.filter((item) => item.name !== action.payload.name),
          {
            name: action.payload.name,
            data: [
              ...state
                .filter((item) => item.name === action.payload.name)[0]
                .data.filter(
                  (item) => item.number !== action.payload.data[0].number
                ),
              {
                number: action.payload.data[0].number,
                answer: action.payload.data[0].answer,
              },
            ],
          },
        ];
      }
    },
    clearAnswer: () => {
      return [];
    },
  },
});

export const { enteredAnswer, clearAnswer } = answer.actions;
export default answer.reducer;
