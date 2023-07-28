export default async function getTest() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/listening-tests/1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
