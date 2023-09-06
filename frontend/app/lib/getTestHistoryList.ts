export default async function getTestHistoryList(jwt: string | undefined) {
  try {
    const res = await fetch(`${process.env.API_URL}/training-histories`, {
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
