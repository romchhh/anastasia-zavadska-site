import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PraktikumSection from "./components/PraktikumSection";
import ReviewsSection from "./components/ReviewsSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { CONTACTS } from "./data/siteData";

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anastasia-zavadska.com";
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Анастасія Завадська",
    jobTitle: "Психологиня, гештальт-терапевтка",
    description:
      "Психологиня, яка працює в гештальт-підході. Індивідуальна та групова терапія онлайн.",
    url: siteUrl,
    image: `${siteUrl}/hero.jpg`,
    sameAs: [
      CONTACTS.telegramLink,
      `https://www.instagram.com/${CONTACTS.instagram.replace(/^@/, "")}/`,
    ],
    email: CONTACTS.email,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Анастасія Завадська - психологиня",
    url: siteUrl,
    inLanguage: "uk",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PraktikumSection />
      <div className="reveal-wrap-reviews">
        <ReviewsSection />
      </div>
      <div className="reveal-wrap-education">
        <EducationSection />
      </div>
      <ContactSection />
      <Footer />
    </main>
  );
}
