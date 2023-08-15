import axios from "axios";

const submitTest = (
  infoData: InfoTestStates,
  userId: number,
  answer: AnswerState
) => {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/training-histories`,
      {
        data: {
          title: infoData.title,
          label: infoData.label,
          time: infoData.time,
          number_correct: 10,
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
