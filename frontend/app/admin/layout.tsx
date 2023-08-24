import SideBar from "../components/admin/SideBar";
import getCurrentUser from "../lib/getCurrentUser";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const data: User | null = await getServerSession(authOptions);
  const currentUser: CurrentUser = await getCurrentUser(data?.user.jwt);

  if (!currentUser || currentUser?.role?.type !== "admin") redirect("/");

  return (
    <div className="flex min-h-[100vh] bg-[#141B2D] text-[#E0E0E0] fixed inset-0 overflow-y-scroll">
      <SideBar user={currentUser} />
      <div className="flex-shrink flex-grow px-6 py-10 overflow-y-scroll bg-[#141B2D] ">
        {children}
      </div>
    </div>
  );
}
