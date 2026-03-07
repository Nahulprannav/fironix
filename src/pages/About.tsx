import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const About = () => {
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
