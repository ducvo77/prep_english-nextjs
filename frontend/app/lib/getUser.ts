export default async function getUser(jwt: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    return null;
  }
}
