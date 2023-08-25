export default async function getTestList() {
  const res = await fetch(`${process.env.API_URL}/tests`, {
    cache: "no-cache",
  });
  if (!res.ok) return null;

  return res.json();
}
