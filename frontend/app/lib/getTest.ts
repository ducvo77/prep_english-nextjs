export default async function getTest(testId: string) {
  const res = await fetch(
    `${process.env.API_URL}/tests/${testId}?populate=topic&populate=parts&populate=parts.audio`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    console.error("Invalid value!!");
    return null;
  }
  return res.json();
}
