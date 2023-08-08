// https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AnswerState = {
  name: string;
  data: {
    number: number;
    answer: string;
  }[];
};
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
        return state.map((item) => {
          if (
            item.data.every(
              (item) => item.number !== action.payload.data[0].number
            )
          ) {
            return {
              name: item.name,
              data: [
                ...item.data,
                {
                  number: action.payload.data[0].number,
                  answer: action.payload.data[0].answer,
                },
              ],
            };
          }
          return item;
        });
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
        return state.map((item) => {
          if (
            item.data.some(
              (item) => item.number === action.payload.data[0].number
            )
          ) {
            return {
              name: item.name,
              data: [
                {
                  answer: "alo",
                  number: 2,
                },
                // item.data.map((item) => {
                //   if (item.number === action.payload.data[0].number) {
                //     return {
                //       number: item.number,
                //       answer: action.payload.data[0].answer,
                //     };
                //   }
                //   return item;
                // }),
              ],
            };
          }
          return item;
        });
      }

      //   {
      //     data: [
      //       {
      //         answer: "",
      //         number: "1",
      //       }
      //     ],
      //     name: "recording 1",
      //   },

      // if (
      //   action.payload.data[0].answer !== "" &&
      //   !state.find((item) => item.data[0].number === action.payload.data[0].number)
      // ) {
      //   return [

      //     ...state,
      // action.payload.name,
      // data: [
      //   {
      //     ...state.data,
      //     number: action.payload.data.number,
      //     answer:action.payload.data.answer
      //   }

      // ]
      // ...state,
      // {
      //   number: action.payload.number,
      //   value: action.payload.value,
      // },
      //     ];
      //   }

      //   if (action.payload.value === "") {
      //     return state.filter((item) => item.number !== action.payload.number);
      //   }

      //   if (
      //     action.payload.value !== "" &&
      //     state.find((item) => item.number === action.payload.number)
      //   ) {
      //     return state.map((item) => {
      //       if (item.number === action.payload.number) {
      //         return { ...item, value: action.payload.value };
      //       }
      //       return item;
      //     });
      //   }

      //   return state;
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
// [
//   {
//     data: [
//       {
//         answer: "",
//         number: "1",
//       }
//     ],
//     name: "recording 1",
//   },
//   {
//     data: [
//       {
//         answer: "",
//         number: "11",
//       },
//       {
//         answer: "",
//         number: "12",
//       },
//     ],
//     name: "recording 2",
//   },
// ],
