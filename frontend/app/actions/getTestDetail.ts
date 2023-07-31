export default async function getTestDetail() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/listening-tests/1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
