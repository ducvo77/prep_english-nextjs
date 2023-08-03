import axios from "../config/axios";

export default function getSectionTest(id: number, testSection: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `/tests/${id}?populate=test_kit&populate=${testSection}&populate=${testSection}.audio`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
