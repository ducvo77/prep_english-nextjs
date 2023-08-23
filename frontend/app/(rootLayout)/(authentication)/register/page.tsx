import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ContainerAuthen from "@/app/components/authentication/ContainerAuthen";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const data: User | null = await getServerSession(authOptions);
  if (data) redirect("/");

  return <ContainerAuthen />;
}
