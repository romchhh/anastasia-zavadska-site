import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfertaPage from "../components/Oferta";

export const metadata = {
  title: "Публічна оферта",
  description:
    "Публічна оферта на інформаційно-консультаційні послуги у сфері психології. Умови надання послуг ФОП Завадської А.С.",
  alternates: {
    canonical: "/oferta",
  },
  openGraph: {
    title: "Публічна оферта | Анастасія Завадська",
    description:
      "Договір про надання інформаційно-консультаційних послуг у галузі психології.",
    url: "/oferta",
  },
};

export default function OfertaRoutePage() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />
      <OfertaPage />
      <Footer />
    </main>
  );
}
