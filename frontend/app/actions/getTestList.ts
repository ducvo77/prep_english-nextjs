import axios from "../config/axios";

export default function getTestList() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `/tests`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
