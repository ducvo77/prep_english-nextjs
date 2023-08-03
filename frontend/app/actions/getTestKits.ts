import axios from "../config/axios";

export default function getTestKits() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `/test-kits?populate=tests&sort[0]=id`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
