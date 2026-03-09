import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { Award, Briefcase, Code, Coffee, ExternalLink, Github, Linkedin, Mail, Zap } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { TEAM_DATA } from "@/data/teamData";

export default function PortfolioTemplate() {
    const { id } = useParams();
    const data = id ? TEAM_DATA[id] : null;

    if (!data) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Navbar />
                <div className="text-center space-y-6">
                    <h1 className="font-display text-4xl font-bold gradient-text">Portfolio Not Found</h1>
                    <p className="text-muted-foreground">The portfolio you are looking for doesn't exist or has been moved.</p>
                    <Button asChild className="box-glow rounded-full">
                        <Link to="/">Return Home</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col pt-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <Navbar />

            <main className="flex-1 container mx-auto max-w-5xl px-4 py-12 relative z-10 space-y-24">

                {/* Profile Hero */}
                <motion.section
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="glass-panel rounded-3xl p-8 md:p-12 border-glow relative overflow-hidden"
                >
                    <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px]" />
                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                        <motion.div variants={fadeUp} className="relative">
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-background/50 shadow-[0_0_30px_hsl(187_80%_50%_/_0.3)] overflow-hidden bg-muted">
                                <div className="w-full h-full flex items-center justify-center bg-card text-muted-foreground text-4xl font-display">
                                    {data.name.charAt(0)}
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                                <Code size={24} />
                            </div>
                        </motion.div>

                        <div className="flex-1 text-center md:text-left">
                            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-glow mb-2">
                                {data.name}
                            </motion.h1>
                            <motion.h2 variants={fadeUp} className="text-xl md:text-2xl text-primary font-medium mb-6">
                                {data.role}
                            </motion.h2>
                            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                                {data.bio}
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <Button className="box-glow rounded-full px-6 gap-2" asChild>
                                    <a href={`mailto:${data.email}`}>
                                        <Mail size={16} /> Contact Me
                                    </a>
                                </Button>
                                <div className="flex gap-2">
                                    {data.socialUrls.github && (
                                        <Button variant="outline" size="icon" className="rounded-full glass-panel border-glow hover:text-primary" asChild>
                                            <a href={data.socialUrls.github} target="_blank" rel="noreferrer"><Github size={18} /></a>
                                        </Button>
                                    )}
                                    {data.socialUrls.linkedin && (
                                        <Button variant="outline" size="icon" className="rounded-full glass-panel border-glow hover:text-primary" asChild>
                                            <a href={data.socialUrls.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Skills & Experience Grid */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:col-span-4 space-y-8"
                    >
                        <div className="glass-panel rounded-2xl p-8 border-border/50">
                            <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                                <Zap className="text-accent" size={24} /> Technical Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm border border-border/50 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel rounded-2xl p-8 border-border/50 text-center">
                            <Coffee className="mx-auto text-muted-foreground mb-4" size={32} />
                            <h4 className="font-bold text-foreground mb-2">Always Learning</h4>
                            <p className="text-sm text-muted-foreground">Constantly exploring new technologies and frameworks to deliver cutting-edge solutions.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:col-span-8 glass-panel rounded-2xl p-8 border-border/50"
                    >
                        <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
                            <Briefcase className="text-primary" size={24} /> Work Experience
                        </h3>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_hsl(187_80%_50%_/_0.3)] z-10">
                                        <Award size={16} />
                                    </div>

                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-5 rounded-xl border border-border/50 hover:border-primary/40 transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-bold text-lg text-foreground">{exp.role}</h4>
                                            <span className="text-xs font-medium text-primary px-2 py-1 rounded bg-primary/10">{exp.period}</span>
                                        </div>
                                        <h5 className="text-sm text-muted-foreground mb-3 font-medium">{exp.company}</h5>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </section>

                {/* Featured Projects */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-10"
                    >
                        <h2 className="font-display text-3xl font-bold mb-4">Featured Contributions</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Key projects and architectural implementations I've lead or significantly contributed to during my tenure.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {data.projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.1 }}
                                className="interactive-card glass-panel rounded-2xl p-6 border-glow flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                                    <Button variant="ghost" size="icon" className="hover:text-primary rounded-full" asChild>
                                        <a href={project.link} target="_blank" rel="noreferrer"><ExternalLink size={18} /></a>
                                    </Button>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
