export default async function getCurrentUser(jwt: string | undefined) {
  try {
    const res = await fetch(`${process.env.API_URL}/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-cache",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}
