import axios from "axios";

const uploadImg = async (imageFile: any) => {
  const formData = new FormData();
  formData.append("files", imageFile);
  formData.append("name", "testfile.png");
  formData.append("type", "image/png");

  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default uploadImg;
