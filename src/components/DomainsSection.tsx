import { Code, Database, Globe, GraduationCap, Megaphone, Palette } from "lucide-react";

const domains = [
  {
    icon: Code,
    title: "IT & Software Services",
    desc: "Custom Software Development, Computer Programming Services, Software Testing and Maintenance, IT Consulting and Technology Solutions, Computer System Design and Development.",
    tech: ["React", "Node.js", "Python", "Java"],
    image: "/placeholder.svg",
  },
  {
    icon: Globe,
    title: "Web & Digital Services",
    desc: "Website Design and Development, Web Application Development, Web Hosting Services, Domain and Website Management.",
    tech: ["HTML5", "CSS3", "JavaScript", "Cloud"],
    image: "/placeholder.svg",
  },
  {
    icon: Database,
    title: "Data & Information Services",
    desc: "Data Processing Services, Data Entry Services, Database Management, Report Writing and Data Analysis.",
    tech: ["SQL", "MongoDB", "Analytics", "BI"],
    image: "/placeholder.svg",
  },
  {
    icon: Palette,
    title: "Digital Media & Creative Services",
    desc: "Video Production Services, Digital Content Creation, Graphic Design and Specialized Design Services, Branding and Creative Design.",
    tech: ["Adobe Suite", "Video Editing", "3D Design", "Animation"],
    image: "/placeholder.svg",
  },
  {
    icon: Megaphone,
    title: "Marketing Services",
    desc: "Digital Advertising, Online Marketing Support, Market Research Services, Technical Services.",
    tech: ["SEO", "Social Media", "Analytics", "PPC"],
    image: "/placeholder.svg",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    desc: "Academic Tutoring Services, IT Skill Development Training, Programming and Software Development Training.",
    tech: ["Online Learning", "Certifications", "Workshops", "Mentoring"],
    image: "/placeholder.svg",
  },
] as const;

export default function DomainsSection() {
  return (
    <section id="domains" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="section-shell p-8 md:p-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">Technology Domains</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our core areas of expertise and innovation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain) => (
              <div
                key={domain.title}
                className="interactive-card glass-panel group relative p-8 rounded-2xl cursor-default"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <domain.icon size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">{domain.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{domain.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {domain.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-secondary-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className="w-12 h-12 opacity-30 group-hover:opacity-50 transition-opacity"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
