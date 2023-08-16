import axios from "axios";

export default async function deleteTestHistory(id: number) {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/training-histories/${id}`
    );
    return res;
  } catch (error) {
    console.error("Error deleting test history:", error);
    return null;
  }
}
