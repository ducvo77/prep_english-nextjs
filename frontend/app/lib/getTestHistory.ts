export default async function getTestHistory(userId: string) {
  const res = await fetch(`${process.env.API_URL}/users/${userId}?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
