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
            content: [
              {
                number: action.payload.content[0].number,
                answer: action.payload.content[0].answer,
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
            item.content.every(
              (item) => item.number !== action.payload.content[0].number
            )
        )
      ) {
        return [
          ...state.filter((item) => item.name !== action.payload.name),
          {
            name: action.payload.name,
            content: [
              ...state
                .filter((item) => item.name === action.payload.name)[0]
                .content.map((item) => item),
              {
                number: action.payload.content[0].number,
                answer: action.payload.content[0].answer,
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
            item.content.some(
              (item) =>
                item.number === action.payload.content[0].number &&
                action.payload.content[0].answer !== ""
            )
        )
      ) {
        return [
          ...state.filter((item) => item.name !== action.payload.name),
          {
            name: action.payload.name,
            content: [
              ...state
                .filter((item) => item.name === action.payload.name)[0]
                .content.filter(
                  (item) => item.number !== action.payload.content[0].number
                ),
              {
                number: action.payload.content[0].number,
                answer: action.payload.content[0].answer,
              },
            ],
          },
        ];
      }
      // Trường hợp có part đó trong mảng, có câu đó trong mảng, muốn xóa value câu đó

      if (
        state.some(
          (item) =>
            item.name === action.payload.name &&
            item.content.some(
              (item) =>
                item.number === action.payload.content[0].number &&
                action.payload.content[0].answer === ""
            )
        )
      ) {
        return [
          ...state.filter((item) => item.name !== action.payload.name),
          {
            name: action.payload.name,
            content: [
              ...state
                .filter((item) => item.name === action.payload.name)[0]
                .content.filter(
                  (item) => item.number !== action.payload.content[0].number
                ),
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
