export default async function getTestHistory(userId: string) {
  const res = await fetch(`${process.env.API_URL}/users/${userId}?populate=*`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
