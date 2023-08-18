export default async function getBlogList() {
  const res = await fetch(`${process.env.API_URL}/blogs?populate=imageURL`, {
    cache: "no-cache",
  });
  if (!res.ok) return null;
  return res.json();
}
