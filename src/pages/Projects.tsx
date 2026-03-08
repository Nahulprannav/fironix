import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "EcoTrack Dashboard",
        description: "A comprehensive analytics platform for sustainability metrics, featuring real-time data visualization and automated reporting.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
        link: "#",
        github: "#"
    },
    {
        title: "NexGen E-Commerce",
        description: "High-performance headless e-commerce solution with dynamic inventory management and AI-powered product recommendations.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
        link: "#",
        github: "#"
    },
    {
        title: "SecureVault API",
        description: "Enterprise-grade secure document storage and sharing API with end-to-end encryption and granular access controls.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        tags: ["Node.js", "Express", "MongoDB", "AWS S3"],
        link: "#",
        github: "#"
    },
    {
        title: "HealthSync Mobile",
        description: "Cross-platform mobile application for patient health monitoring, appointment scheduling, and telemedicine consultations.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        tags: ["React Native", "Firebase", "Redux", "WebRTC"],
        link: "#",
        github: "#"
    },
    {
        title: "SmartCity IoT Hub",
        description: "Centralized control dashboard for smart city infrastructure, monitoring traffic, energy usage, and environmental sensors in real-time.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        tags: ["Vue.js", "Python", "MQTT", "TimescaleDB"],
        link: "#",
        github: "#"
    },
    {
        title: "FinServe Portal",
        description: "Modern banking portal with advanced financial analysis tools, portfolio tracking, and automated investment strategies.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Go", "GraphQL", "Docker"],
        link: "#",
        github: "#"
    }
];

export default function Projects() {
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

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="glass-panel rounded-2xl overflow-hidden flex flex-col interactive-card group border-glow"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                <img
                                    src={project.image}
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
                                    {project.tags.map(tag => (
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
