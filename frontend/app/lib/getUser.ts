export default async function getUser(jwt: string | undefined) {
  try {
    const res = await fetch(`${process.env.API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}
