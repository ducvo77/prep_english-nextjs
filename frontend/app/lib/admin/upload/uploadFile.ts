import axios from "axios";

const uploadFile = async (file: any, jwt: string) => {
  const formData = new FormData();
  formData.append("files", file);
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default uploadFile;
