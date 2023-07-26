import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header";
import Container from "./components/Container";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prep English",
  description: "Initial App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Container>
          {children}
          <Footer />
        </Container>
        <BackToTop />
      </body>
    </html>
  );
}