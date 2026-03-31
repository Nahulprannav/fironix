import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const About = () => {
  useSEO({
    title: "About Us",
    description: "Learn more about Fironix, our mission, vision, and the team driving technology innovation.",
    keywords: "About Fironix, Tech Company, IT Services Company, Mission, Vision",
    ogImage: "https://fironix.in/logo.png",
    ogUrl: "https://fironix.in/about"
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-5" />

      <div className="relative z-10">
        <Navbar />
        <AboutSection />
        <Footer />
      </div>
    </div>
  );
};

export default About;
