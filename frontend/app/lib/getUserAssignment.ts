export default async function getUserAssignment(testId: string) {
  const res = await fetch(
    `${process.env.API_URL}/training-histories/${testId}`,
    {
      // cache: "no-cache",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
