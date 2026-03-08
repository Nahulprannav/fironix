import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { INTERNSHIP_FORM_URL, SITE_NAME } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Vision & Mission", href: "/vision-mission" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Workshops", href: "/workshops" },
  { label: "Projects", href: "/projects" },
  { label: "Internship", href: "/internship" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/80 shadow-[0_12px_30px_hsl(230_60%_3%_/_0.5)]"
        : "bg-transparent border-b border-transparent shadow-none"
        }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-3 relative group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/logo.png" alt={SITE_NAME} className="h-10 w-10 object-contain drop-shadow-[0_0_8px_hsl(187_80%_50%_/_0.8)] transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display text-xl font-bold gradient-text tracking-wider group-hover:drop-shadow-[0_0_12px_hsl(187_80%_50%_/_0.6)] transition-all duration-300">FIRONIX</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-primary hover:-translate-y-0.5"
              activeClassName="text-primary font-semibold relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:shadow-[0_0_8px_hsl(187_80%_50%)]"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-2xl border-t border-border/70"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block w-full text-left py-3 text-base text-muted-foreground transition-all hover:text-primary hover:translate-x-2"
                    activeClassName="text-primary font-bold"
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
