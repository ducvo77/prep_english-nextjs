import axios from "axios";

export default async function deleteBlog(id: number, jwt: string) {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return res;
  } catch (err) {
    return null;
  }
}
