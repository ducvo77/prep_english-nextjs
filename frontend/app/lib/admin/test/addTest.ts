import axios from "axios";

export default async function addTest(
  title: string,
  time: number,
  part_number: number,
  question_number: number,
  author: string,
  topic: number,
  jwt: string
) {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/tests`,
      {
        data: {
          title,
          time,
          part_number,
          question_number,
          author,
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
}
