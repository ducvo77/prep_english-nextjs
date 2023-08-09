export default async function getTest(testId: string) {
  const res = await fetch(
    `${process.env.API_URL}/tests/${testId}?populate=test_kit&populate=parts&populate=parts.audio`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
