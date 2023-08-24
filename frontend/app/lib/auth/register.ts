import axios from "axios";

const register = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
      name,
      username,
      email,
      password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default register;
