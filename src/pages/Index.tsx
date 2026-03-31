import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import InternshipSection from "@/components/InternshipSection";
import WorkshopSection from "@/components/WorkshopSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Technology Solutions & IT Services",
    description: "Fironix is an innovative technology company providing custom software, web design, data processing, and IT training.",
    keywords: "Fironix, IT Services, Web Development, Software Development, Internships, Tech Courses",
    ogImage: "https://fironix.in/logo.png",
    ogUrl: "https://fironix.in/"
  });
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WorkshopSection />
      <AboutSection />
      <VisionMissionSection />
      <InternshipSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
