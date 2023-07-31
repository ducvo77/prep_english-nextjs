export default async function getListeningTest(
  id: number,
  testSection: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tests/${id}?populate=test_kit&populate=${testSection}&populate=${testSection}.audio`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
