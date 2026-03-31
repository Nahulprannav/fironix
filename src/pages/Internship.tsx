import Navbar from "@/components/Navbar";
import InternshipSection from "@/components/InternshipSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Internship = () => {
  useSEO({
    title: "Internship Programs",
    description: "Launch your career with Fironix hands-on internship programs. Gain real-world experience in software engineering, design, and cybersecurity.",
    keywords: "IT Internship, Software Engineering Internship, Student Internship, Tech Careers",
    ogImage: "https://fironix.in/logo.png",
    ogUrl: "https://fironix.in/internship"
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="relative z-10">
        <Navbar />
        <InternshipSection />
        <Footer />
      </div>
    </div>
  );
};

export default Internship;
