import axios from "axios";

const addTopic = async (title: string, author: string, jwt: string) => {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/topics`,
      {
        data: {
          title,
          author,
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

export default addTopic;
