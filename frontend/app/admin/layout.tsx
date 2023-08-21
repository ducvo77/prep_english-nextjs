import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "../components/admin/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Initial App",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-[100vh] gap-10 bg-[#141B2D] text-[#E0E0E0]">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
