import axios from "../config/axios";

export default async function getTestKits() {
  const res = await axios({
    method: "get",
    url: `${process.env.API_URL}/test-kits?populate=tests&sort[0]=id`,
  });
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res.data;
}
