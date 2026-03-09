import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";

const team = [
  { name: "Aswini B", role: "CEO & Director", image: "/team-photo.jpeg", path: "#" },
  { name: "Nahul Prannav S", role: "Co-Founder", image: "/team-photo-n.jpeg", path: "/portfolio-template" },
] as const;

export default function TeamSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <section id="team" className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-shell p-8 md:p-10 relative"
        >
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-16 relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">Leadership Team</h2>
            <p className="text-muted-foreground">The minds driving Fironix forward.</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-8 relative z-10"
          >
            {team.map((member) => (
              <Link
                to={member.path}
                key={member.name}
                className={member.path === "#" ? "cursor-default" : "cursor-pointer"}
              >
                <motion.div
                  variants={itemVariants}
                  className="interactive-card glass-panel group w-64 text-center p-6 rounded-2xl border-glow"
                >
                  <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500 box-glow">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <span className="font-display text-3xl text-primary font-bold">
                          {member.name
                            .split(" ")
                            .map((namePart) => namePart[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  {member.path !== "#" && (
                    <div className="mt-4 text-xs font-medium text-primary/50 group-hover:text-primary transition-colors">
                      View Portfolio →
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
