import { Award, Code, Users, Zap } from "lucide-react";

const stats = [
  { icon: Code, value: "100+", label: "Projects Completed" },
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: Zap, value: "24/7", label: "Support" },
] as const;

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="section-shell p-8 md:p-12">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 gradient-text">About Fironix</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Fironix is a technology-driven service company specializing in innovative digital solutions and
              professional IT services. The company provides a wide range of services including computer programming,
              software development, web design, data processing, web hosting, and IT consulting. Fironix focuses on
              delivering reliable, scalable, and efficient technology solutions tailored to meet the specific needs of
              businesses and individuals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="interactive-card glass-panel rounded-xl p-5 text-center">
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4">
                  <stat.icon size={28} />
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-panel interactive-card rounded-xl p-6">
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Our Expertise</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In addition to software and IT services, Fironix also offers digital media production, advertising
                support, specialized design services, and technical analysis. The company supports organizations in
                improving their digital presence through modern web technologies, data management solutions, and
                creative design strategies.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">Custom Software Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">Digital Media Production</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">IT Consulting & Support</span>
                </div>
              </div>
            </div>

            <div className="glass-panel interactive-card rounded-xl p-6">
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Education & Innovation</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fironix also contributes to education and knowledge development by providing academic tutoring services
                and technical training programs in emerging technologies such as software development, digital systems,
                and information technology.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">Academic Tutoring Services</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">Technical Training Programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">Skill Development Workshops</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block glass-panel interactive-card p-8 rounded-2xl">
              <img src="/placeholder.svg" alt="Technology" className="w-32 h-32 mx-auto mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">Advanced Technology Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
