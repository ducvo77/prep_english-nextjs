import SideBar from "../components/admin/SideBar";
import getCurrentUser from "../lib/getCurrentUser";
import { redirect } from "next/navigation";
import { getSession } from "../lib/getSession";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session: User = await getSession();

  const currentUser: CurrentUser = await getCurrentUser(session?.user?.jwt);

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
