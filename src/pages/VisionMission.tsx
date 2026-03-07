import Navbar from "@/components/Navbar";
import VisionMissionSection from "@/components/VisionMissionSection";
import Footer from "@/components/Footer";

const VisionMission = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="relative z-10">
        <Navbar />
        <VisionMissionSection />
        <Footer />
      </div>
    </div>
  );
};

export default VisionMission;
