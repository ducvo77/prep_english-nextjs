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
          title: infoData.title, //ok
          label: infoData.label, //ok
          time: infoData.time, //ok
          number_correct: 20,
          total_sentences: 40, //ok
          user_name: userId, //ok
          data: answer,
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
