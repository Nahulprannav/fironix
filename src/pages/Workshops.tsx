import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getCollection } from "@/lib/firestore";

const WORKSHOP_KEYS: Record<string, string> = {
    "Mastering React 19 State Architecture": "workshop-react-19",
    "Offensive Penetration Testing 101": "workshop-pentest",
    "Zero-Latency Docker Pipelines": "workshop-docker",
    "Figma to Framer Motion Conversion": "workshop-figma-framer",
};

const WORKSHOPS: any[] = [
    {
        title: "Workshop On Cyber Security",
        desc: "Master the art of cybersecurity - stay alert, stay protected, and outsmart every cyber threat before it strikes. Successful participants receive an Official Workshop completion Certificate.",
        date: "29 March 2026",
        time: "9:00 AM - 01:00 PM",
        location: "Online",
        seats: "Limited",
        type: "Advanced",
        color: "hsl(var(--accent))",
        colorClass: "text-accent border-accent/20 bg-accent/10",
    }
];

export default function Workshops() {
    useSEO({
        title: "Tech Workshops",
        description: "Intensive, mentor-led tech workshops on React, Docker, Cyber Security, and more. Register for free community passes.",
        keywords: "Tech Workshops, React Workshop, Cyber Security Workshop, Free Tech Events",
        ogImage: "https://fironix.in/logo.png",
        ogUrl: "https://fironix.in/workshops"
    });

    const navigate = useNavigate();
    const [dynamicWorkshops, setDynamicWorkshops] = useState<any[]>([]);

    useEffect(() => {
        getCollection("workshops").then(data => {
            if (data.length) setDynamicWorkshops(data);
        }).catch(err => console.error("Failed to fetch workshops:", err));
    }, []);

    const allWorkshops = [
        ...WORKSHOPS,
        ...dynamicWorkshops.map(w => ({
            ...w,
            color: w.color || "hsl(187 80% 50%)",
            colorClass: w.colorClass || "text-primary bg-primary/10 border-primary/20",
            seats: w.seats || "TBD",
            type: w.type || "Special"
        }))
    ];

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
                    {allWorkshops.map((workshop, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="interactive-card glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group border-glow">
                            <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: workshop.color }} />
                            <div className="flex-1">
                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-4 border ${workshop.colorClass}`}>{workshop.type} Level</span>
                                <h2 className="font-display text-2xl font-bold mb-3 text-foreground group-hover:text-glow transition-all">{workshop.title}</h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">{workshop.description || workshop.desc}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium text-foreground/80">
                                    <div className="flex items-center gap-2"><Calendar size={16} className="text-primary shrink-0" /> {workshop.date || "TBD"}</div>
                                    <div className="flex items-center gap-2"><Clock size={16} className="text-primary shrink-0" /> {workshop.time || "TBD"}</div>
                                    <div className="flex items-center gap-2"><MapPin size={16} className="text-primary shrink-0" /> {workshop.location || "Online"}</div>
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
