import Header from "../components/header";
import Container from "../components/Container";
import Footer from "../components/Footer";
import getCurrentUser from "../lib/getCurrentUser";
import { getSession } from "../lib/getSession";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session: User = await getSession();
  const userData: CurrentUser = await getCurrentUser(session?.user?.jwt);
  return (
    <>
      <Header userData={userData} />
      <Container>
        {children}
        <Footer />
      </Container>
    </>
  );
}
