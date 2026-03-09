import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WORKSHOP_KEYS: Record<string, string> = {
    "Mastering React 19 State Architecture": "workshop-react-19",
    "Offensive Penetration Testing 101": "workshop-pentest",
    "Zero-Latency Docker Pipelines": "workshop-docker",
    "Figma to Framer Motion Conversion": "workshop-figma-framer",
};

const WORKSHOPS = [
    {
        title: "Mastering React 19 State Architecture",
        description: "An incredibly fast-paced hybrid workshop dissecting the deeply internal mechanics of handling complex asynchronous state.",
        date: "April 12, 2026", time: "10:00 AM - 4:00 PM EST",
        location: "Virtual & Fironix HQ", seats: 40, type: "Advanced",
        color: "hsl(187 80% 50%)", colorClass: "text-primary bg-primary/10 border-primary/20"
    },
    {
        title: "Offensive Penetration Testing 101",
        description: "Executing complex red-team operations against simulated enterprise networks. Nmap, Metasploit, Active Directory lateral movement.",
        date: "April 18, 2026", time: "9:00 AM - 5:00 PM EST",
        location: "Virtual Only", seats: 100, type: "Intermediate",
        color: "hsl(40 90% 55%)", colorClass: "text-accent bg-accent/10 border-accent/20"
    },
    {
        title: "Zero-Latency Docker Pipelines",
        description: "Alpine containers, multi-stage caching, and Kubernetes cluster deployment. Stop waiting for builds.",
        date: "April 25, 2026", time: "1:00 PM - 6:00 PM EST",
        location: "Virtual Only", seats: 250, type: "Advanced",
        color: "hsl(210 100% 60%)", colorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
        title: "Figma to Framer Motion Conversion",
        description: "Turn high-end Figma mockups into pixel-perfect React animations using Framer Motion spring physics.",
        date: "May 02, 2026", time: "11:00 AM - 3:00 PM EST",
        location: "Virtual & Fironix HQ", seats: 50, type: "Beginner",
        color: "hsl(320 80% 55%)", colorClass: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    }
];

export default function Workshops() {
    const navigate = useNavigate();
    const [, setUnused] = useState(false);
    void setUnused;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -30 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-24">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
            <Navbar />
            <main className="flex-1 container mx-auto max-w-5xl px-4 py-12 relative z-10">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="section-shell p-10 md:p-14 text-center mb-16 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                    <Zap className="mx-auto mb-6 text-accent" size={48} />
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-glow">Professional Tech Workshops</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Intensive, mentor-led deep dives into highly specialized engineering paradigms. Limited seating available.</p>
                </motion.div>

                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
                    {WORKSHOPS.map((workshop, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="interactive-card glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group border-glow">
                            <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: workshop.color }} />
                            <div className="flex-1">
                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-4 border ${workshop.colorClass}`}>{workshop.type} Level</span>
                                <h2 className="font-display text-2xl font-bold mb-3 text-foreground group-hover:text-glow transition-all">{workshop.title}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">{workshop.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium text-foreground/80">
                                    <div className="flex items-center gap-2"><Calendar size={16} className="text-primary shrink-0" /> {workshop.date}</div>
                                    <div className="flex items-center gap-2"><Clock size={16} className="text-primary shrink-0" /> {workshop.time}</div>
                                    <div className="flex items-center gap-2"><MapPin size={16} className="text-primary shrink-0" /> {workshop.location}</div>
                                    <div className="flex items-center gap-2"><Users size={16} className="text-primary shrink-0" /> {workshop.seats} Seats</div>
                                </div>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:items-end justify-center shrink-0 border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-8 mt-4 md:mt-0">
                                <div className="text-center md:text-right mb-4">
                                    <span className="block text-2xl font-bold text-foreground">Free</span>
                                    <span className="text-xs text-muted-foreground">Community Pass</span>
                                </div>
                                <Button size="lg" className="w-full box-glow hover:-translate-y-1 transition-transform rounded-full" onClick={() => navigate(`/register?key=${WORKSHOP_KEYS[workshop.title] ?? "workshop"}`)}>
                                    Register Now
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
