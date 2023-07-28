export default async function getTestList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/test-kits?populate=tests&sort[0]=id`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
