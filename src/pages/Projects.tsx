import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCollection } from "@/lib/firestore";
import { useSEO } from "@/hooks/useSEO";

const STATIC_PROJECTS: Array<{
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    github: string;
}> = [];

export default function Projects() {
    useSEO({
        title: "Our Portfolio",
        description: "Explore Fironix's curated showcase of innovative software, web, and data projects.",
        keywords: "Software Portfolio, Tech Projects, Web Development Portfolio, Tech Case Studies",
        ogImage: "https://fironix.in/logo.png",
        ogUrl: "https://fironix.in/projects"
    });

    const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);

    useEffect(() => {
        getCollection("projects").then(data => {
            if (data.length) setDynamicProjects(data);
        }).catch(err => console.error("Failed to fetch projects:", err));
    }, []);

    const allProjects = [...STATIC_PROJECTS, ...dynamicProjects];
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
    };

    return (
        <div className="min-h-screen bg-background flex flex-col pt-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <Navbar />

            <main className="flex-1 container mx-auto max-w-7xl px-4 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                        Our Portfolio
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow leading-tight">
                        Exceptional <span className="gradient-text">Digital Solutions</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Explore our curated showcase of innovative projects, where we transform complex challenges into elegant, scalable technological solutions for our clients.
                    </p>
                </motion.div>

                {allProjects.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {allProjects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="glass-panel rounded-2xl overflow-hidden flex flex-col interactive-card group border-glow"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    <img
                                        loading="lazy"
                                        src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-card/40 to-card/80">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <h3 className="font-display text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {(Array.isArray(project.tags) ? project.tags : (typeof project.tags === "string" ? project.tags.split(",").map((t: string) => t.trim()) : [])).map((tag: string) => (
                                            <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                                        <Button variant="default" size="sm" className="flex-1 box-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                                            View Project <ExternalLink size={14} className="ml-2" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="glass-panel border-glow hover:bg-primary/10 hover:text-primary transition-colors">
                                            <Github size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="glass-panel p-16 text-center rounded-3xl border-dashed border-2 border-primary/20 max-w-3xl mx-auto shadow-[0_0_30px_hsl(187_80%_50%_/_0.05)]"
                    >
                        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                            <span className="text-4xl relative z-10">🚀</span>
                        </div>
                        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Amazing Projects Incoming!</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
                            We are currently curating our latest and greatest completed projects to showcase here. Check back soon for actual client implementations!
                        </p>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <div className="glass-panel rounded-2xl p-8 md:p-12 border-glow max-w-4xl mx-auto relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                        <h2 className="font-display text-3xl font-bold mb-4">Have a project in mind?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">Let's build something extraordinary together.</p>
                        <Button size="lg" className="rounded-full px-8 box-glow-accent bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12">
                            Start a Conversation <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
