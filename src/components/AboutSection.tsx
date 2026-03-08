import { Award, Code, Users, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";

const stats = [
  { icon: Code, value: "100+", label: "Projects Completed" },
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: Zap, value: "24/7", label: "Support" },
] as const;

export default function AboutSection() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="section-shell p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -left-32 -top-32 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 gradient-text">About Fironix</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Fironix is a technology-driven service company specializing in innovative digital solutions and
              professional IT services. The company provides a wide range of services including computer programming,
              software development, web design, data processing, web hosting, and IT consulting. Fironix focuses on
              delivering reliable, scalable, and efficient technology solutions tailored to meet the specific needs of
              businesses and individuals.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-panel rounded-xl p-5 text-center border-glow transition-colors hover:bg-card/60"
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4 shadow-[0_0_15px_hsl(187_80%_50%_/_0.3)]">
                  <stat.icon size={28} />
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1 drop-shadow-md">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-xl p-8 hover:border-primary/40 transition-colors border border-border/50"
            >
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Our Expertise</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In addition to software and IT services, Fironix also offers digital media production, advertising
                support, specialized design services, and technical analysis. The company supports organizations in
                improving their digital presence through modern web technologies, data management solutions, and
                creative design strategies.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover:scale-150 group-hover:shadow-[0_0_8px_hsl(187_80%_50%)] transition-all" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Custom Software Development</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover:scale-150 group-hover:shadow-[0_0_8px_hsl(187_80%_50%)] transition-all" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Digital Media Production</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover:scale-150 group-hover:shadow-[0_0_8px_hsl(187_80%_50%)] transition-all" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">IT Consulting & Support</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-xl p-8 hover:border-accent/40 transition-colors border border-border/50"
            >
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Education & Innovation</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fironix also contributes to education and knowledge development by providing academic tutoring services
                and technical training programs in emerging technologies such as software development, digital systems,
                and information technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full group-hover:scale-150 group-hover:shadow-[0_0_8px_hsl(40_90%_55%)] transition-all" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Academic Tutoring Services</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full group-hover:scale-150 group-hover:shadow-[0_0_8px_hsl(40_90%_55%)] transition-all" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Technical Training Programs</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full group-hover:scale-150 group-hover:shadow-[0_0_8px_hsl(40_90%_55%)] transition-all" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Skill Development Workshops</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
