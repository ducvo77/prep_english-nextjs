import ContainerAuthen from "@/app/components/authentication/ContainerAuthen";
import { getSession } from "@/app/lib/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session: User = await getSession();

  if (session) redirect("/");

  return <ContainerAuthen />;
}
