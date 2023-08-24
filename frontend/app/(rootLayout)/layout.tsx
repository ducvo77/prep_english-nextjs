import Header from "../components/header";
import Container from "../components/Container";
import Footer from "../components/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <Container>
        {children}
        <Footer />
      </Container>
    </>
  );
}
