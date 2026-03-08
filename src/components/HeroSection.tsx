import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INTERNSHIP_FORM_URL, SITE_NAME } from "@/lib/site";
import Particles from "./Particles";
import { motion, Variants } from "framer-motion";

export default function HeroSection() {
  const openRegistration = () => {
    window.open(INTERNSHIP_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-35 saturate-[1.05] contrast-[1.15]"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="hero-grid absolute inset-0 opacity-50" />
      <div className="hero-vignette absolute inset-0" />

      <motion.img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="absolute h-[420px] w-[420px] md:h-[560px] md:w-[560px] object-contain opacity-[0.05]"
      />

      <Particles count={46} />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <motion.div
          className="section-shell mx-auto px-6 py-12 md:px-12 md:py-16 text-center border-glow glass-panel"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <img src="/logo.png" alt={SITE_NAME} className="h-20 w-20 mx-auto mb-6 drop-shadow-[0_0_15px_hsl(187_80%_50%_/_0.5)] transition-transform duration-500 hover:scale-110" />
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow leading-tight tracking-tight">
            Building the Future of <span className="gradient-text drop-shadow-lg">Technology Innovation</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Fironix is a technology-driven service company specializing in innovative digital solutions and professional
            IT services, including software development, web design, data processing, and IT consulting.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button
              size="lg"
              className="text-base font-semibold box-glow transition-all duration-300 hover:-translate-y-1 rounded-full px-8 h-12 group"
              onClick={openRegistration}
            >
              Register for Internship <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base border-glow glass-panel transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 rounded-full px-8 h-12 group text-foreground font-medium"
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More <ChevronDown className="ml-2 opacity-70 group-hover:opacity-100 transition-opacity" size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary cursor-pointer hover:text-accent transition-colors"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={32} className="drop-shadow-[0_0_8px_hsl(187_80%_50%_/_0.8)]" />
      </motion.div>
    </section>
  );
}
