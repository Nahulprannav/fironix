import { Code, Database, Globe, GraduationCap, Megaphone, Palette } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="section-shell p-8 md:p-12">
            <div className="text-center mb-16">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Services</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive technology solutions and services to empower your business and drive innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.title} className="interactive-card glass-panel group p-8 rounded-2xl">
                  <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <service.icon size={32} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-4 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground border border-border">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
