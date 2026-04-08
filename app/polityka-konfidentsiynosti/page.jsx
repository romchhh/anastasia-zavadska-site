import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivacyPolicyPage from "../components/PrivacyPolice";

export const metadata = {
  title: "Політика конфіденційності",
  description:
    "Політика конфіденційності сайту психологині Анастасії Завадської: збір, використання та захист персональних даних.",
  alternates: {
    canonical: "/polityka-konfidentsiynosti",
  },
  openGraph: {
    title: "Політика конфіденційності | Анастасія Завадська",
    description: "Як ми обробляємо та захищаємо ваші персональні дані.",
    url: "/polityka-konfidentsiynosti",
  },
};

export default function PolitykaKonfidentsiynostiPage() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />
      <PrivacyPolicyPage />
      <Footer />
    </main>
  );
}
