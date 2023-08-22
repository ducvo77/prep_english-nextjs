import axios from "axios";

export default async function deleteTestHistory(id: number, token: string) {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/training-histories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error deleting test history:", error);
    return null;
  }
}
