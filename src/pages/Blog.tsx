import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const POSTS = [
    {
        title: "The Future of Web Development in 2026",
        excerpt: "An in-depth analysis of how WebAssembly, AI-driven code generation, and Edge networking are fundamentally rewriting application architecture.",
        date: "March 15, 2026",
        author: "John Doe",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        category: "Technology"
    },
    {
        title: "Mastering Zero-Trust Cyber Security",
        excerpt: "Why the traditional firewall perimeter model is dead, and how enterprises are enforcing zero-trust policies inside their own internal subnets.",
        date: "March 10, 2026",
        author: "Jane Smith",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        category: "Security"
    },
    {
        title: "Designing for Flow State: Vibe Coding",
        excerpt: "How to strip away cognitive friction in your IDE and write code seamlessly by relying on intuition and beautifully structured patterns.",
        date: "March 05, 2026",
        author: "Alex Johnson",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
        category: "Software Engineering"
    },
    {
        title: "Big Data vs. Smart Data",
        excerpt: "Collecting massive data lakes is useless without proper schema indexing. How to transform raw logs into actionable business intelligence.",
        date: "February 28, 2026",
        author: "Sarah Connor",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        category: "Data Analytics"
    },
    {
        title: "Unreal Engine 6: The Leap in Rendering",
        excerpt: "Analyzing the new global illumination algorithms that allow independent indie studios to push AAA cinematic visual fidelity.",
        date: "February 22, 2026",
        author: "Mark Evans",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
        category: "Game Development"
    },
    {
        title: "Demystifying GraphQL for REST Veterans",
        excerpt: "A practical guide to transitioning your backend mindsets from strict REST endpoints to highly flexible, query-driven state architectures.",
        date: "February 15, 2026",
        author: "Elena Rodriguez",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        category: "Technology"
    }
];

export default function Blog() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-24">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <Navbar />

            <main className="flex-1 container mx-auto max-w-7xl px-4 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">Fironix Insights</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Deep technical explorations, architecture reviews, and industry analysis from our elite engineering teams.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {POSTS.map((post, idx) => (
                        <motion.article
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="interactive-card glass-panel rounded-2xl border-glow flex flex-col group overflow-hidden"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-background/80 backdrop-blur-md border border-border/50 text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1.5 border-r border-border/50 pr-4">
                                        <Calendar size={14} className="text-primary" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User size={14} className="text-primary" />
                                        {post.author}
                                    </div>
                                </div>

                                <h3 className="font-display text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <Button variant="ghost" className="w-fit p-0 h-auto text-primary text-sm font-semibold hover:text-primary hover:bg-transparent group/btn">
                                    Read Article <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
