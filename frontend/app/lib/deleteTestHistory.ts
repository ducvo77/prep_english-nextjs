export default async function deleteTestHistory(id: number, jwt: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/training-histories/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return res;
  } catch (err) {
    return null;
  }
}
