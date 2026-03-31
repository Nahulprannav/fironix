import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowRight, Clock } from "lucide-react";

import { BLOG_POSTS as POSTS, BlogPost } from "@/data/blogData";
import { useSEO } from "@/hooks/useSEO";

const TAG_COLORS: Record<string, string> = {
    engineering: "text-primary bg-primary/10 border-primary/20",
    security: "text-red-400 bg-red-500/10 border-red-500/20",
    ai: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    data: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    creative: "text-accent bg-accent/10 border-accent/20",
    design: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    infra: "text-green-400 bg-green-500/10 border-green-500/20",
};

export default function Blog() {
    useSEO({
        title: "Engineering Blog",
        description: "Fironix engineering insights, tutorials, deep dives, and career guides written by our expert instructors.",
        keywords: "Tech Blog, Coding Tutorials, Engineering Insights, Cyber Security Guides",
        ogImage: "https://fironix.in/logo.png",
        ogUrl: "https://fironix.in/blog"
    });

    return (
        <div className="min-h-screen bg-background flex flex-col pt-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <Navbar />

            <main className="flex-1 container mx-auto max-w-6xl px-4 py-12 relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">Fironix Blog</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">Engineering Insights</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Tutorials, deep dives, and career guides written by our instructors — covering every course we teach.</p>
                </motion.div>

                {/* Featured top posts */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {POSTS.slice(0, 2).map((post, i) => (
                        <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="glass-panel border-glow rounded-2xl p-8 flex flex-col justify-between interactive-card group hover:shadow-[0_0_40px_hsl(187_80%_50%_/_0.1)] transition-shadow"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${TAG_COLORS[post.tag]}`}>{post.category}</span>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} />{post.readTime} read</span>
                                </div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                                <p className="text-muted-foreground leading-relaxed text-sm">{post.excerpt}</p>
                            </div>
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <User size={12} /> {post.author} · <Calendar size={12} /> {post.date}
                                </div>
                                <Link to={`/blog/${post.id}`} className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">Read <ArrowRight size={12} /></Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Grid of remaining posts */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {POSTS.slice(2).map((post, i) => (
                        <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }}
                            className="glass-panel rounded-2xl p-6 flex flex-col justify-between interactive-card group border border-border/40 hover:border-primary/30 transition-all"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${TAG_COLORS[post.tag]}`}>{post.category}</span>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={10} />{post.readTime}</span>
                                </div>
                                <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{post.excerpt}</p>
                            </div>
                            <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/30">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Tag size={10} /> {post.author}
                                </div>
                                <Link to={`/blog/${post.id}`} className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">Read <ArrowRight size={10} /></Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
