export default async function getData() {
  const res = await fetch(`http://localhost:1337/api/tests`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
