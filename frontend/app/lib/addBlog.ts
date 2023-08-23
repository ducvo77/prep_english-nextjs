import axios from "axios";

const addBlog = async (
  title: string,
  content: string,
  author: string,
  imageURL: any,
  jwt: string
) => {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
      {
        data: {
          title,
          content,
          author,
          imageURL,
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

export default addBlog;
