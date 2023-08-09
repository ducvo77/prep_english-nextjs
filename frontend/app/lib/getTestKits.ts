export default async function getTestKits() {
  const res = await fetch(
    `${process.env.API_URL}/test-kits?populate=tests&sort[0]=id`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}
