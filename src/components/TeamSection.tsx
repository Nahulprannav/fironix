import { useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { getCollection } from "@/lib/firestore";
import { User, Stars, Briefcase } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  image?: string;
  photoURL?: string;
  path: string;
  skills?: string;
  experience?: string;
  bio?: string;
};

type DynamicTeamMember = {
  name?: string;
  title?: string;
  role?: string;
  designation?: string;
  description?: string;
  image?: string;
  photoURL?: string;
  path?: string;
  skills?: string;
  experience?: string;
  bio?: string;
};

const STATIC_TEAM: TeamMember[] = [
  { name: "Aswini B", role: "CEO & Director", image: "/team-photo.jpeg", photoURL: "/team-photo.jpeg", path: "/portfolio/ashwini" },
  { name: "Nahul Prannav S", role: "Co-Founder", image: "/team-photo-n.jpeg", photoURL: "/team-photo-n.jpeg", path: "/portfolio/nahul" },
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function TeamSection() {
  const [dynamicTeam, setDynamicTeam] = useState<DynamicTeamMember[]>([]);

  useEffect(() => {
    let active = true;

    getCollection("team")
      .then((items) => {
        if (!active) return;
        setDynamicTeam(items as DynamicTeamMember[]);
      })
      .catch((err) => console.error("Failed to fetch team:", err));

    return () => {
      active = false;
    };
  }, []);

  const allTeam = useMemo<TeamMember[]>(() => {
    const normalizedDynamic = dynamicTeam
      .map((member) => {
        const name = String(member.name || member.title || "").trim();
        if (!name) return null;

        const role = String(member.role || member.designation || member.description || "Team Member").trim();
        const image = typeof (member.photoURL || member.image) === "string" ? (member.photoURL || member.image) : undefined;
        const path = typeof member.path === "string" && member.path.trim().length > 0
          ? member.path
          : `/portfolio/${slugify(name)}`;

        return { ...member, name, role, image, photoURL: image, path } as TeamMember;
      })
      .filter((member) => member !== null) as TeamMember[];

    const seen = new Set<string>();
    return [...STATIC_TEAM, ...normalizedDynamic].filter((member) => {
      const key = `${member.name}|${member.role}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [dynamicTeam]);

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
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-shell p-8 md:p-10 relative"
        >
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-16 relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">Leadership Team</h2>
            <p className="text-muted-foreground text-lg italic">The minds driving Fironix forward.</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            {allTeam.map((member, idx) => (
              <motion.div
                key={`${member.name}-${idx}`}
                variants={itemVariants}
                className="interactive-card glass-panel group flex flex-col items-center p-8 rounded-3xl border-glow relative overflow-hidden"
              >
                <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-500 box-glow shrink-0">
                  {(member.photoURL || member.image) ? (
                    <img src={member.photoURL || member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <User size={64} className="text-primary/40" />
                    </div>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">{member.role}</p>

                {member.bio && (
                  <p className="text-sm text-center text-muted-foreground line-clamp-3 mb-6 bg-secondary/20 p-3 rounded-xl italic border border-border/50">
                    "{member.bio}"
                  </p>
                )}

                <div className="w-full space-y-3 mt-auto border-t border-border/30 pt-6">
                  {member.skills && (
                    <div className="flex items-start gap-2">
                      <Stars size={14} className="text-accent mt-0.5" />
                      <div className="flex-1 text-left">
                        <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold leading-none mb-1">Expertise</p>
                        <p className="text-xs text-foreground font-medium">{member.skills}</p>
                      </div>
                    </div>
                  )}
                  {member.experience && (
                    <div className="flex items-start gap-2">
                      <Briefcase size={14} className="text-primary mt-0.5" />
                      <div className="flex-1 text-left">
                        <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold leading-none mb-1">Experience</p>
                        <p className="text-xs text-foreground font-medium">{member.experience}</p>
                      </div>
                    </div>
                  )}
                </div>

                {member.path && (
                  <Link to={member.path} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-accent transition-colors group/link">
                    View Portfolio <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
