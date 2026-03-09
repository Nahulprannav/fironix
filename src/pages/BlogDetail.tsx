import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, Share2, MessageSquare, Twitter, Linkedin, Facebook } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import { BLOG_POSTS as POSTS } from "@/data/blogData";

const TAG_COLORS: Record<string, string> = {
    engineering: "text-primary bg-primary/10 border-primary/20",
    security: "text-red-400 bg-red-500/10 border-red-500/20",
    ai: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    data: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    creative: "text-accent bg-accent/10 border-accent/20",
    design: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    infra: "text-green-400 bg-green-500/10 border-green-500/20",
};

export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = POSTS.find(p => p.id.toString() === id);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col pt-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <Navbar />

            <main className="flex-1 container mx-auto max-w-4xl px-4 py-8 relative z-10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-8 hover:text-primary gap-2">
                        <ArrowLeft size={16} /> Back to Insights
                    </Button>
                </motion.div>

                <article className="glass-panel border-glow rounded-[40px] p-8 md:p-16">
                    <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`text-xs font-bold px-4 py-1.5 rounded-full border ${TAG_COLORS[post.tag]}`}>
                                {post.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock size={14} /> {post.readTime} read
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between border-y border-border/40 py-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
                                    {post.author.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">{post.author}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar size={12} /> {post.date}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary"><Twitter size={18} /></Button>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary"><Linkedin size={18} /></Button>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary"><Facebook size={18} /></Button>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary"><Share2 size={18} /></Button>
                            </div>
                        </div>
                    </motion.header>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-invert prose-emerald max-w-none text-muted-foreground leading-relaxed text-lg
                        prose-h3:text-foreground prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-12 prose-h3:mb-6
                        prose-p:mb-8
                        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:my-12"
                        dangerouslySetInnerHTML={{ __html: post.content || "" }}
                    />

                    <div className="mt-20 pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h4 className="font-bold text-xl text-foreground mb-2">Did you enjoy this deep dive?</h4>
                            <p className="text-muted-foreground">Subscribe to our newsletter for weekly engineering insights.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Button size="lg" className="rounded-xl px-8 box-glow flex-1 md:flex-none">Share Thoughts</Button>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
