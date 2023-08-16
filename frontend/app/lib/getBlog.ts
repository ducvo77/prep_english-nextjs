export default async function getBlog(id: string) {
  const res = await fetch(
    `${process.env.API_URL}/blogs/${id}?populate=imageURL`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) return null;
  return res.json();
}
