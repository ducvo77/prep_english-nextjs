import axios from "axios";

const updateInfoCurrentUser = async (
  userId: number,
  name: string,
  bio: any,
  avatar: number,
  jwt: string
) => {
  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
      {
        name,
        bio,
        avatar,
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

export default updateInfoCurrentUser;
