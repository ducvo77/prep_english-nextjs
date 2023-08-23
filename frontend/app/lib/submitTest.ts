import axios from "axios";

const submitTest = async (
  infoData: InfoTestStates,
  userId: number,
  answer: AnswerState[]
) => {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/training-histories`,
      {
        data: {
          title: infoData.title,
          label: infoData.label,
          time: infoData.time,
          number_correct: infoData.correct_amount,
          total_sentences: infoData.question_number,
          user_name: userId,
          data: answer,
          testId: infoData.id,
        },
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default submitTest;

// export default async function submitTest(
//   infoData: InfoTestStates,
//   userId: number,
//   answer: AnswerState[]
// ) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/training-histories`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           data: {
//             title: infoData.title,
//             label: infoData.label,
//             time: infoData.time,
//             number_correct: infoData.correct_amount,
//             total_sentences: infoData.question_number,
//             user_name: userId,
//             data: answer,
//             testId: infoData.id,
//           },
//         }),
//       }
//     );
//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }
