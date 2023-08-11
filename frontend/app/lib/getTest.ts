export default async function getTest(testId: string) {
  const res = await fetch(
    `${process.env.API_URL}/tests/${testId}?populate=test_kit&populate=parts&populate=parts.audio`,
    {
      // cache: "no-cache",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
