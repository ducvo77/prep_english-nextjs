import axios from "axios";

const editTest = async (
  testId: string | undefined,
  title: string,
  time: number,
  part_number: number,
  question_number: number,
  topic: number,
  jwt: string
) => {
  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/tests/${testId}`,
      {
        data: {
          title,
          time,
          part_number,
          question_number,
          topic,
        },
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${jwt}`,
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

export default editTest;
