import Navbar from "@/components/Navbar";
import DomainsSection from "@/components/DomainsSection";
import Footer from "@/components/Footer";

const Domains = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-accent/5 to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="relative z-10">
        <Navbar />
        <DomainsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Domains;
