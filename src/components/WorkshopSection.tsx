import { motion } from "framer-motion";
import { Shield, Calendar, Clock, Phone, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WorkshopSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  };

  return (
    <section id="workshops" className="py-24 relative overflow-hidden bg-background/50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="section-shell glass-panel p-8 md:p-12 lg:p-16 border-glow-accent overflow-hidden"
        >
          {/* Cyber grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent font-semibold text-sm">
                  <Shield size={16} /> Free Registration
                </span>
              </motion.div>

              <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold font-bold uppercase tracking-tight leading-[1.1]">
                Workshop On <span className="gradient-text block mt-2 text-glow-accent">Cyber Security</span>
              </motion.h2>

              <motion.p variants={itemVariants} className="text-lg text-muted-foreground/90 uppercase tracking-wide leading-relaxed border-l-2 border-primary/50 pl-4 font-medium">
                Master the art of cybersecurity - stay alert, stay protected, and outsmart every cyber threat before it strikes.
              </motion.p>

              <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-border/50">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Date</p>
                    <p className="font-semibold">29 MARCH 2026</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-border/50">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Time</p>
                    <p className="font-semibold">9:00 AM - 01:00 PM</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-3 mt-2 text-primary/90 font-medium">
                <CheckCircle size={20} className="text-primary flex-shrink-0" />
                <span className="text-sm md:text-base">Successful participants receive an Official Workshop completion Certificate</span>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-full box-glow-accent group w-full sm:w-auto"
                  onClick={() => window.open("https://forms.gle/yoWL3EwQmF4WFXaBA", "_blank")}
                >
                  JOIN NOW
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-border/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Globe size={18} className="text-primary" />
                  <a href="https://fironix.in" target="_blank" rel="noreferrer noopener" className="hover:text-primary transition-colors font-medium">https://fironix.in</a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Phone size={18} className="text-primary" />
                  <a href="tel:+918300880695" className="hover:text-primary transition-colors font-medium">+91 83008 80695</a>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Visual Representation */}
            <motion.div 
              variants={itemVariants} 
              className="relative hidden lg:flex items-center justify-center p-8"
            >
              <div className="relative w-80 h-80 flex items-center justify-center">
                {/* Glowing ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 shadow-[0_0_50px_hsl(var(--primary)/0.2)]"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-accent/40 shadow-[0_0_30px_hsl(var(--accent)/0.2)]"
                />
                
                {/* Center Icon */}
                <div className="relative z-20 w-48 h-48 bg-background/80 backdrop-blur-md rounded-full border-4 border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.4)] flex items-center justify-center">
                  <Shield size={80} className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full bg-primary/20 rounded-full blur-xl"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
