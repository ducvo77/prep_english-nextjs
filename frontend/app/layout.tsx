import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header";
import Container from "./components/Container";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { Providers } from "./redux/provider";
import { NextAuthProvider } from "./NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prep English",
  description: "Initial App",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Providers>
            <Header />
            <Container>
              {children}
              <Footer />
            </Container>
            <BackToTop />
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
