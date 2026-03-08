import { Code, Database, Globe, GraduationCap, Megaphone, Palette } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";

const services = [
  {
    icon: Code,
    title: "IT & Software Services",
    desc: "Custom Software Development, Computer Programming Services, Software Testing and Maintenance, IT Consulting and Technology Solutions, Computer System Design and Development.",
    features: ["Custom Development", "System Design", "Quality Assurance", "IT Consulting"],
  },
  {
    icon: Globe,
    title: "Web & Digital Services",
    desc: "Website Design and Development, Web Application Development, Web Hosting Services, Domain and Website Management.",
    features: ["Web Design", "App Development", "Hosting Solutions", "Domain Management"],
  },
  {
    icon: Database,
    title: "Data & Information Services",
    desc: "Data Processing Services, Data Entry Services, Database Management, Report Writing and Data Analysis.",
    features: ["Data Processing", "Database Mgmt", "Analytics", "Reporting"],
  },
  {
    icon: Palette,
    title: "Digital Media & Creative Services",
    desc: "Video Production Services, Digital Content Creation, Graphic Design and Specialized Design Services, Branding and Creative Design.",
    features: ["Video Production", "Content Creation", "Graphic Design", "Branding"],
  },
  {
    icon: Megaphone,
    title: "Marketing Services",
    desc: "Digital Advertising, Online Marketing Support, Market Research Services, Technical Services.",
    features: ["Digital Ads", "Online Marketing", "Market Research", "Tech Services"],
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    desc: "Academic Tutoring Services, IT Skill Development Training, Programming and Software Development Training.",
    features: ["Tutoring", "Skill Training", "Programming", "Dev Training"],
  },
] as const;

export default function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-24">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <Navbar />
      <main className="flex-1 py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="section-shell p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 relative z-10"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Services</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive technology solutions and services to empower your business and drive innovation.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            >
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="interactive-card glass-panel group p-8 rounded-2xl border-glow flex flex-col"
                >
                  <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_15px_hsl(187_80%_50%_/_0.2)]">
                    <service.icon size={32} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground border border-border">
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
