export default async function getTopicList() {
  const res = await fetch(
    `${process.env.API_URL}/topics?populate=tests&sort[0]=id`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) return null;

  return res.json();
}
