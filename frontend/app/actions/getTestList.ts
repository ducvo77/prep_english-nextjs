export default async function getTestKits() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tests`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
