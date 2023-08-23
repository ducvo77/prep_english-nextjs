import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "../components/admin/SideBar";
import getCurrentUser from "../lib/getCurrentUser";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextAuthProvider } from "../components/NextAuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const data: User | null = await getServerSession(authOptions);
  const currentUser: CurrentUser | undefined = await getCurrentUser(
    data?.user.jwt
  );

  if (!currentUser || currentUser?.role?.type !== "admin") redirect("/");

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="flex min-h-[100vh] bg-[#141B2D] text-[#E0E0E0] fixed inset-0 overflow-y-scroll">
            <SideBar />
            <div className="flex-shrink flex-grow px-6 py-10 border-l-4 border-[#888888] overflow-y-scroll bg-[#141B2D] ">
              {children}
            </div>
            <Toaster />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
