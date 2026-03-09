import { useState } from "react";
import { SITE_NAME } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Briefcase, ChevronRight, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Workshops", href: "/workshops" },
  { label: "Internships", href: "/internship" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const REGISTER_TYPES = [
  { id: "course", icon: BookOpen, label: "Course", desc: "Structured learning programs" },
  { id: "workshop", icon: Wrench, label: "Workshop", desc: "Intensive hands-on sessions" },
  { id: "internship", icon: Briefcase, label: "Internship", desc: "Real-world work experience" },
];

export default function Footer() {
  const [showPicker, setShowPicker] = useState(false);
  const navigate = useNavigate();

  const handleTypeSelect = (type: string) => {
    setShowPicker(false);
    navigate(`/register?prefill=${type}`);
  };

  return (
    <>
      {/* Register Type Picker Overlay */}
      <AnimatePresence>
        {showPicker && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPicker(false)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="relative w-full max-w-sm glass-panel border-glow rounded-3xl p-8 z-10"
            >
              <button onClick={() => setShowPicker(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
              <h3 className="font-display text-2xl font-bold mb-2 text-foreground">What do you want to register for?</h3>
              <p className="text-muted-foreground text-sm mb-6">Choose a category to get started.</p>
              <div className="space-y-3">
                {REGISTER_TYPES.map(({ id, icon: Icon, label, desc }) => (
                  <button key={id} onClick={() => handleTypeSelect(id)} className="w-full glass-panel rounded-xl p-4 text-left flex items-center gap-4 hover:border-primary/50 transition-all group">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"><Icon size={20} /></div>
                    <div>
                      <p className="font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="soft-divider py-16 px-4 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-6xl"
        >
          <div className="glass-panel rounded-3xl p-8 md:p-10 border-glow">
            {/* Top row */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
              {/* Brand */}
              <div className="shrink-0">
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group mb-4">
                  <img src="/logo.png" alt={SITE_NAME} className="h-8 w-8 object-contain drop-shadow-[0_0_8px_hsl(187_80%_50%_/_0.8)] group-hover:scale-110 transition-transform" />
                  <span className="font-display text-xl font-bold gradient-text tracking-wider">FIRONIX</span>
                </Link>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">Building the future of technology — one engineer at a time.</p>
                <Button
                  onClick={() => setShowPicker(true)}
                  className="mt-5 box-glow rounded-full px-6 text-sm hover:-translate-y-0.5 transition-transform"
                >
                  Register Now ✨
                </Button>
              </div>

              {/* Quick links */}
              <div>
                <h4 className="font-bold text-sm text-foreground uppercase tracking-widest mb-4">Quick Links</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {QUICK_LINKS.map(({ label, href }) => (
                    <Link key={href} to={href} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-0.5 inline-block">{label}</Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-bold text-sm text-foreground uppercase tracking-widest mb-4">Contact</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Email:</span> ashiwini@fironix.in</p>
                  <p><span className="text-foreground font-medium">Admin:</span> <Link to="/admin/login" className="text-primary hover:underline">Login →</Link></p>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} <span className="text-primary font-medium">{SITE_NAME}</span>. All rights reserved.</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
                <Link to="/admin/login" className="hover:text-primary transition-colors">Admin</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  );
}
