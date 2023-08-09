export default async function getTestHistory(userId: number) {
  const res = await fetch(`${process.env.API_URL}/users/${userId}?populate=*`, {
    cache: "no-cache",
  });
  if (!res.ok) return null;
  return res.json();
}
