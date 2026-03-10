import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Award, BarChart3, BookOpen, Brain, Gamepad2, Globe, Shield, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INTERNSHIP_FORM_URL } from "@/lib/site";
import { motion, Variants } from "framer-motion";
import { getCollection } from "@/lib/firestore";

type InternshipProgram = {
  title: string;
  desc: string;
  skills: string[];
  icon: LucideIcon;
};

type DynamicInternship = {
  title?: string;
  name?: string;
  desc?: string;
  description?: string;
  skills?: string[] | string;
};

const STATIC_INTERNSHIPS: InternshipProgram[] = [
  {
    title: "Web Development",
    desc: "Learn modern web technologies including React, Node.js, and full-stack development.",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
    icon: Globe,
  },
  {
    title: "Game Development",
    desc: "Create interactive games using Unity and game development best practices.",
    skills: ["Unity", "C#", "Game Design", "3D Modeling"],
    icon: Gamepad2,
  },
  {
    title: "Data Analyst",
    desc: "Master data analysis, visualization, and business intelligence tools.",
    skills: ["Python", "SQL", "Tableau", "Statistics"],
    icon: BarChart3,
  },
  {
    title: "Machine Learning",
    desc: "Build AI models and machine learning applications.",
    skills: ["Python", "TensorFlow", "Data Science", "AI"],
    icon: Brain,
  },
  {
    title: "Cyber Security",
    desc: "Learn ethical hacking, security protocols, and cybersecurity best practices.",
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Risk Assessment"],
    icon: Shield,
  },
];

const FEATURES = [
  { icon: BookOpen, text: "Practical training sessions" },
  { icon: Wrench, text: "Mini projects with real industry tools" },
  { icon: Users, text: "Mentorship support from experts" },
  { icon: Award, text: "Official internship certificate" },
] as const;

function normalizeSkills(skills: DynamicInternship["skills"]): string[] {
  if (Array.isArray(skills)) return skills.map((skill) => String(skill).trim()).filter(Boolean);
  if (typeof skills === "string") return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
  return [];
}

export default function InternshipSection() {
  const [dynamicInternships, setDynamicInternships] = useState<DynamicInternship[]>([]);

  useEffect(() => {
    let active = true;

    getCollection("internships")
      .then((items) => {
        if (!active) return;
        setDynamicInternships(items as DynamicInternship[]);
      })
      .catch((err) => console.error("Failed to fetch internships:", err));

    return () => {
      active = false;
    };
  }, []);

  const allInternships = useMemo<InternshipProgram[]>(() => {
    const mappedDynamic: InternshipProgram[] = dynamicInternships
      .map((item) => ({
        title: String(item.title || item.name || "").trim(),
        desc: String(item.desc || item.description || "").trim(),
        skills: normalizeSkills(item.skills),
        icon: Globe,
      }))
      .filter((item) => item.title.length > 0);

    const seenTitles = new Set<string>();
    return [...STATIC_INTERNSHIPS, ...mappedDynamic].filter((item) => {
      const key = item.title.toLowerCase();
      if (seenTitles.has(key)) return false;
      seenTitles.add(key);
      return true;
    });
  }, [dynamicInternships]);

  const openRegistration = () => {
    window.open(INTERNSHIP_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-shell p-8 md:p-12 mb-16 relative"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 mb-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                Upcoming Program
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
                2 Month Practical <span className="gradient-text">Internship Program</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                A hands-on internship program designed to provide real-world skills and project experience.
                Participants who successfully complete the program will receive an official internship certificate.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mb-8 justify-center"
            >
              {allInternships.map((program, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={program.title + idx}
                  className="glass-panel interactive-card flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-foreground"
                >
                  <program.icon size={16} className="text-primary" />
                  {program.title}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4 mb-10"
            >
              {FEATURES.map((feature) => (
                <motion.div variants={itemVariants} key={feature.text} className="glass-panel interactive-card rounded-lg p-4 flex items-center gap-3 text-muted-foreground">
                  <feature.icon size={18} className="text-accent shrink-0" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <Button
                size="lg"
                className="text-base font-semibold box-glow transition-transform duration-300 hover:-translate-y-1"
                onClick={openRegistration}
              >
                Register Now <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-shell p-8 md:p-10"
        >
          <h3 className="font-display text-2xl font-bold mb-8 text-center gradient-text">Internship Programs</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allInternships.map((program, idx) => (
              <motion.div variants={itemVariants} key={program.title + idx} className="interactive-card glass-panel p-6 rounded-xl border-glow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <program.icon size={24} />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground">{program.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{program.desc}</p>
                {program.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {program.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 text-xs rounded-md bg-secondary/80 text-secondary-foreground border border-border/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
