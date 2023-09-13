import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "./components/NextAuthProvider";
import BackToTop from "./components/BackToTop";
import { Providers } from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prep English",
  description: "Prep English - Luyện IELTS với ChatGPT",
};
interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Providers>
            {children}
            <Toaster />
            <BackToTop />
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
