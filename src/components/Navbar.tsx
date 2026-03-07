import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { INTERNSHIP_FORM_URL, SITE_NAME } from "@/lib/site";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Vision & Mission", href: "/vision-mission" },
  { label: "Domains", href: "/domains" },
  { label: "Services", href: "/services" },
  { label: "Internship", href: "/internship" },
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

  const openRegistration = () => {
    window.open(INTERNSHIP_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/80 shadow-[0_12px_30px_hsl(230_60%_3%_/_0.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/logo.png" alt={SITE_NAME} className="h-10 w-10 object-contain" />
          <span className="font-display text-xl font-bold gradient-text">FIRONIX</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            size="sm"
            className="box-glow transition-transform duration-300 hover:-translate-y-0.5"
            onClick={openRegistration}
          >
            Register
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-panel animate-fade-in border-t border-border/70 px-4 pb-4">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block w-full text-left py-2.5 text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            className="w-full mt-3 box-glow transition-transform duration-300 hover:-translate-y-0.5"
            size="sm"
            onClick={() => {
              setOpen(false);
              openRegistration();
            }}
          >
            Register
          </Button>
        </div>
      )}
    </nav>
  );
}
