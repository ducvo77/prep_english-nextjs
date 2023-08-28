import axios from "axios";

export default async function addPart(
  name: string,
  audio: number,
  topic: string,
  number: number,
  question: string,
  answer: string,
  explain: string,
  test: number,
  jwt: string
) {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/parts`,
      {
        data: {
          name,
          audio,
          topic,
          data: {
            number,
            question,
            answer,
            explain,
          },
          test,
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
