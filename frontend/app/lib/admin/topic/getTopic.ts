export default async function getTopic(id: string) {
  const res = await fetch(`${process.env.API_URL}/topics/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) return null;
  return res.json();
}
