import axios from "axios";

const editBlog = async (
  blogId: string,
  title: string,
  content: string,
  author: string,
  imageURL: any,
  jwt: string
) => {
  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
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

export default editBlog;
