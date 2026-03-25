import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PraktikumSection from "./components/PraktikumSection";
import ReviewsSection from "./components/ReviewsSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PraktikumSection />
      <ReviewsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
