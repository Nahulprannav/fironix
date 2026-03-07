import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INTERNSHIP_FORM_URL, SITE_NAME } from "@/lib/site";
import Particles from "./Particles";

export default function HeroSection() {
  const openRegistration = () => {
    window.open(INTERNSHIP_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-35 saturate-[1.05] contrast-125"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="hero-grid absolute inset-0 opacity-50" />
      <div className="hero-vignette absolute inset-0" />

      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="absolute h-[420px] w-[420px] md:h-[560px] md:w-[560px] object-contain opacity-[0.05]"
        style={{ animation: "rotate-slow 60s linear infinite" }}
      />

      <Particles count={46} />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="section-shell mx-auto px-6 py-12 md:px-12 md:py-16 text-center">
          <div className="animate-slide-up">
            <img src="/logo.png" alt={SITE_NAME} className="h-20 w-20 mx-auto mb-6 drop-shadow-lg" />
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow leading-tight animate-slide-up animation-delay-200">
            Building the Future of <span className="gradient-text">Technology Innovation</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-400">
            Fironix is a technology-driven service company specializing in innovative digital solutions and professional
            IT services, including software development, web design, data processing, and IT consulting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
            <Button
              size="lg"
              className="text-base font-semibold box-glow transition-transform duration-300 hover:-translate-y-1"
              onClick={openRegistration}
            >
              Register for Internship <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base border-glow glass-panel transition-transform duration-300 hover:-translate-y-1"
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More <ChevronDown className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-soft-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
