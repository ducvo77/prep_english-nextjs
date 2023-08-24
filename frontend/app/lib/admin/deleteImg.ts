import axios from "axios";

export default async function deleteImg(id: number, jwt: string) {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/files/${id}`,
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
