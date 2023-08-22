export default async function getTestList() {
  const res = await fetch(
    `${process.env.API_URL}/test-kits?populate=tests&sort[0]=id`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) return null;

  return res.json();
}
