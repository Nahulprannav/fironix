import { ArrowRight, Award, BarChart3, BookOpen, Brain, Gamepad2, Globe, Shield, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INTERNSHIP_FORM_URL } from "@/lib/site";

const internshipDetails = [
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
] as const;

const features = [
  { icon: BookOpen, text: "Practical training sessions" },
  { icon: Wrench, text: "Mini projects with real industry tools" },
  { icon: Users, text: "Mentorship support from experts" },
  { icon: Award, text: "Official internship certificate" },
] as const;

export default function InternshipSection() {
  const openRegistration = () => {
    window.open(INTERNSHIP_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="section-shell p-8 md:p-12 mb-16">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />

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

            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {internshipDetails.map((program) => (
                <div
                  key={program.title}
                  className="glass-panel interactive-card flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-foreground"
                >
                  <program.icon size={16} className="text-primary" />
                  {program.title}
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature.text} className="glass-panel interactive-card rounded-lg p-4 flex items-center gap-3 text-muted-foreground">
                  <feature.icon size={18} className="text-accent shrink-0" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

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
        </div>

        <div className="section-shell p-8 md:p-10">
          <h3 className="font-display text-2xl font-bold mb-8 text-center gradient-text">Internship Programs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipDetails.map((program) => (
              <div key={program.title} className="interactive-card glass-panel p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <program.icon size={24} className="text-primary" />
                  <h4 className="font-display text-lg font-semibold text-foreground">{program.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{program.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
