import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import Navbar from "../../components/Navbar";
import ScrollToHash from "../../components/ScrollToHash";
import ServicePageHero from "../../components/ServicePageHero";
import ServiceBookingSection from "../../components/ServiceBookingSection";
import Footer from "../../components/Footer";
import { getServiceBySlug, getServiceSlugs, SERVICES } from "../../data/siteData";
import { getSessionPriceUah } from "@/utils/price";
import SessionPaymentsFeed from "../../components/SessionPaymentsFeed";

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

const INDIVIDUAL_SESSION_SLUG = SERVICES[0].slug;

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const bookingNotifyKind = service.slug === "branchi-ta-retryty" ? "event" : "service";
  const sessionPriceUah =
    slug === INDIVIDUAL_SESSION_SLUG ? getSessionPriceUah() : undefined;

  return (
    <main>
      <ScrollToHash />
      <Navbar />
      <ServicePageHero service={service} />
      <ServiceBookingSection
        service={service}
        sessionPriceUah={sessionPriceUah}
        bookingNotifyKind={bookingNotifyKind}
      />
      {slug === INDIVIDUAL_SESSION_SLUG ? <SessionPaymentsFeed /> : null}
      <Footer />
    </main>
  );
}
