export default async function getTest(id: string) {
  const res = await fetch(`${process.env.API_URL}/tests/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) return null;
  return res.json();
}
