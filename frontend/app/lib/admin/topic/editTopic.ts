import axios from "axios";

const editTopic = async (
  topicId: string | undefined,
  title: string,
  jwt: string
) => {
  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}`,
      {
        data: {
          title,
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

export default editTopic;
