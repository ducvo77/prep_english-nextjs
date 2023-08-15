export default async function getUserAssignment(testId: string) {
  const res = await fetch(
    `${process.env.API_URL}/training-histories/${testId}`,
    {
      // cache: "no-cache",
    }
  );
  if (!res.ok) return null;

  return res.json();
}
