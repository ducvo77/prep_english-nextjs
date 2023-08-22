import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "../components/admin/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-[100vh] bg-[#141B2D] text-[#E0E0E0] fixed inset-0 overflow-y-scroll">
          <SideBar />
          <div className="flex-grow flex-shrink-0 px-6 py-10 border-l-4 border-[#888888] overflow-y-scroll bg-[#141B2D] ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
