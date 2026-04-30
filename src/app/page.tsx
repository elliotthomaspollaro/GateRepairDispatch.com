import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HeroSection from "@/components/Sections/HeroSection";
import HowItWorks from "@/components/Sections/HowItWorks";
import StatsBar from "@/components/Sections/StatsBar";
import WhyChooseUs from "@/components/Sections/WhyChooseUs";
import Testimonials from "@/components/Sections/Testimonials";
import FAQ from "@/components/Sections/FAQ";
import FinalCTA from "@/components/Sections/FinalCTA";
import StickyCTA from "@/components/UI/StickyCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <StatsBar />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
