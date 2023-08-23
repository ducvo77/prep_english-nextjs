import { redirect } from "next/navigation";

export default async function getCurrentUser(jwt: string | undefined) {
  if (!jwt) redirect("/login");
  try {
    const res = await fetch(`${process.env.API_URL}/users/me?populate=role`, {
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
