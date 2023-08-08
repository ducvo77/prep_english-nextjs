import axios from "axios";

const register = (username: string, email: string, password: string) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
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
