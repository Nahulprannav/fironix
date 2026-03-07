import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,rgba(34,197,94,0.1),transparent_50%)]" />

      <div className="relative z-10">
        <Navbar />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
