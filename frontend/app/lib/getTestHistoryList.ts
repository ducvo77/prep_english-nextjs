export default async function getTestHistoryList(jwt: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/training-histories`, {
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
