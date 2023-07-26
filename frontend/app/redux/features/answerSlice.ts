// // https://blog.openreplay.com/state-management-in-next-js-with-redux-toolkit
// // https://www.youtube.com/watch?v=Yokjzp91A4o

// import { createSlice } from "@reduxjs/toolkit";

// interface AnswerState {
//   number: number;
//   value: string;
// }

// const initialState = [
//   {
//     number: NaN,
//     value: "",
//   },
// ];

// export const answerSlice = createSlice({
//   name: "answer",
//   initialState,
//   reducers: {
//     answerValue: (state, action) => {
//       [
//         ...state,
//         {
//           number: action,
//           value: action,
//         },
//       ];
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { answerSlice } = answerSlice.actions;

// export default answerSlice.reducer;
