import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import ScrollToHash from "../../components/ScrollToHash";
import ServicePageHero from "../../components/ServicePageHero";
import ServiceBookingSection from "../../components/ServiceBookingSection";
import Footer from "../../components/Footer";
import { getServiceBySlug, getServiceSlugs } from "../../data/siteData";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Послуга" };
  }
  const title = `${service.title} | Анастасія Завадська`;
  const description =
    service.desc.length > 160 ? `${service.desc.slice(0, 157)}…` : service.desc;
  return {
    title,
    description,
    alternates: {
      canonical: `/poslugy/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/poslugy/${slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main>
      <ScrollToHash />
      <Navbar />
      <ServicePageHero service={service} />
      <ServiceBookingSection service={service} />
      <Footer />
    </main>
  );
}
