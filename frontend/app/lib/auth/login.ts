import axios from "axios";

const login = (email: string, password: string) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
      identifier: email,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default login;
