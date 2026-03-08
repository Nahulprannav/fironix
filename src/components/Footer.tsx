import { SITE_NAME } from "@/lib/site";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="soft-divider py-12 px-4 mt-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-glow">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group cursor-pointer">
            <img src="/logo.png" alt={SITE_NAME} className="h-8 w-8 object-contain drop-shadow-[0_0_8px_hsl(187_80%_50%_/_0.8)] group-hover:scale-110 transition-transform duration-300" />
            <span className="font-display text-lg font-bold gradient-text tracking-wider group-hover:drop-shadow-[0_0_12px_hsl(187_80%_50%_/_0.6)] transition-all">FIRONIX</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            (c) {new Date().getFullYear()} <span className="text-primary font-medium">{SITE_NAME}</span>. All rights reserved.<br /> Building the future of technology.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

// Ensure Link is imported
import { Link } from "react-router-dom";
