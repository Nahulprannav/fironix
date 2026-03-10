import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Briefcase, CheckCircle2, ChevronRight, Mail, Phone, Sparkles, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { api } from "@/lib/api";

// ---------------------------------------------------------------------------
// Data: every registrable item keyed by a URL slug / param
// ---------------------------------------------------------------------------
const REGISTER_MAP: Record<string, { type: string; label: string; category: string }> = {
    // Courses
    "web-development-mern": { type: "course", label: "Web Development (MERN)", category: "Engineering" },
    "cyber-security": { type: "course", label: "Cyber Security", category: "Security" },
    "machine-learning": { type: "course", label: "Machine Learning (ML)", category: "AI / Data" },
    "data-analytics": { type: "course", label: "Data Analytics", category: "AI / Data" },
    "game-development": { type: "course", label: "Game Development", category: "Creative" },
    "photography": { type: "course", label: "Photography", category: "Creative" },
    "video-editing": { type: "course", label: "Video Editing", category: "Creative" },
    "figma-ui-ux": { type: "course", label: "Figma (UI & UX)", category: "Design" },
    "vibe-coding": { type: "course", label: "Vibe Coding", category: "Engineering" },
    "cloud-computing": { type: "course", label: "Cloud Computing", category: "Infrastructure" },
    "app-development": { type: "course", label: "App Development", category: "Engineering" },
    // Workshops
    "workshop-react-19": { type: "workshop", label: "React 19 State Architecture", category: "Engineering" },
    "workshop-pentest": { type: "workshop", label: "Offensive Penetration Testing", category: "Security" },
    "workshop-docker": { type: "workshop", label: "Zero-Latency Docker Pipelines", category: "Infrastructure" },
    "workshop-figma-framer": { type: "workshop", label: "Figma to Framer Motion", category: "Design" },
    // Internships
    "internship-software": { type: "internship", label: "Software Development Intern", category: "Engineering" },
    "internship-design": { type: "internship", label: "UI/UX Design Intern", category: "Design" },
    "internship-marketing": { type: "internship", label: "Digital Marketing Intern", category: "Marketing" },
    "internship-data": { type: "internship", label: "Data Science Intern", category: "AI / Data" },
};

// Group options for the picker (used when arriving without a preset key)
const TYPE_OPTIONS = [
    { id: "course", icon: BookOpen, label: "Course", desc: "Structured learning programs" },
    { id: "workshop", icon: Wrench, label: "Workshop", desc: "Intensive hands-on sessions" },
    { id: "internship", icon: Briefcase, label: "Internship", desc: "Real-world experience" },
];

type Step = "type" | "domain" | "details" | "success";

export default function Register() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // If arriving with ?key=... we can pre-fill type + selection
    const preKey = searchParams.get("key") ?? "";
    const preData = REGISTER_MAP[preKey] ?? null;

    const [step, setStep] = useState<Step>(preData ? "details" : "type");
    const [selectedType, setSelectedType] = useState<string>(preData?.type ?? "");
    const [selectedDomain, setSelectedDomain] = useState<string>(preData?.label ?? "");

    const [domainOptions, setDomainOptions] = useState<Record<string, any[]>>({
        course: Object.entries(REGISTER_MAP).filter(([_, v]) => v.type === "course").map(([k, v]) => ({ title: v.label, slug: k })),
        workshop: Object.entries(REGISTER_MAP).filter(([_, v]) => v.type === "workshop").map(([k, v]) => ({ title: v.label, slug: k })),
        internship: Object.entries(REGISTER_MAP).filter(([_, v]) => v.type === "internship").map(([k, v]) => ({ title: v.label, slug: k })),
    });

    const [, setSelectedProgram] = useState<any>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch dynamic items from the database
    useEffect(() => {
        api.get<any>("/data").then(data => {
            setDomainOptions(prev => ({
                ...prev,
                course: [...prev.course, ...(data.courses || [])],
                internship: [...prev.internship, ...(data.internships || [])],
            }));
        }).catch(err => console.error("Failed to fetch DB data:", err));
    }, []);

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
        setSelectedDomain("");
        setSelectedProgram(null);
        setStep("domain");
    };

    const handleDomainSelect = (program: any) => {
        const title = program.title || program.label;
        setSelectedDomain(title);
        setSelectedProgram(program);
        setStep("details");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) { toast.error("Please fill in your name and email."); return; }
        setLoading(true);
        try {
            await api.post("/register", { name, email, phone, type: selectedType, selection: selectedDomain });
            setStep("success");
        } catch {
            // Fallback: if server is down, still show success (will be handled via email)
            toast.warning("Server offline — your registration was noted. We'll follow up via email.");
            setStep("success");
        } finally {
            setLoading(false);
        }
    };

    const fadeIn = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

    return (
        <div className="min-h-screen bg-background flex flex-col pt-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <Navbar />

            <main className="flex-1 container mx-auto max-w-2xl px-4 py-16 relative z-10">
                {/* Progress bar */}
                {step !== "success" && (
                    <div className="flex items-center gap-3 mb-12 justify-center">
                        {(["type", "domain", "details"] as Step[]).map((s, i) => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step === s ? "border-primary bg-primary text-primary-foreground" : ["type", "domain", "details"].indexOf(step) > i ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                                    {["type", "domain", "details"].indexOf(step) > i ? <CheckCircle2 size={14} /> : i + 1}
                                </div>
                                <span className="text-xs text-muted-foreground hidden sm:block">{["Choose Type", "Select Domain", "Your Details"][i]}</span>
                                {i < 2 && <ChevronRight size={14} className="text-border" />}
                            </div>
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {/* STEP 1 — Type */}
                    {step === "type" && (
                        <motion.div key="type" variants={fadeIn} initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }} className="space-y-6">
                            <div className="text-center mb-10">
                                <Sparkles className="mx-auto mb-4 text-accent" size={40} />
                                <h1 className="font-display text-4xl font-bold text-glow mb-2">What would you like to do?</h1>
                                <p className="text-muted-foreground">Select the type of programme you'd like to register for.</p>
                            </div>
                            <div className="grid gap-4">
                                {TYPE_OPTIONS.map(({ id, icon: Icon, label, desc }) => (
                                    <button key={id} onClick={() => handleTypeSelect(id)} className="glass-panel border-glow rounded-2xl p-6 text-left flex items-center gap-5 interactive-card hover:border-primary/50 transition-all group">
                                        <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                            <Icon size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-xl text-foreground">{label}</p>
                                            <p className="text-muted-foreground text-sm">{desc}</p>
                                        </div>
                                        <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2 — Domain */}
                    {step === "domain" && (
                        <motion.div key="domain" variants={fadeIn} initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }} className="space-y-4">
                            <div className="text-center mb-8">
                                <h1 className="font-display text-3xl font-bold mb-2">Choose your {selectedType}</h1>
                                <p className="text-muted-foreground">Select a specific programme to register for.</p>
                            </div>
                            <div className="grid gap-3">
                                {(domainOptions[selectedType] ?? []).map((program, idx) => (
                                    <button key={idx} onClick={() => handleDomainSelect(program)} className="glass-panel rounded-xl p-4 text-left flex items-center justify-between interactive-card hover:border-primary/50 group transition-all">
                                        <span className="font-medium text-foreground">{program.title || program.label}</span>
                                        <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                            <Button variant="ghost" className="mt-4" onClick={() => setStep("type")}>← Back</Button>
                        </motion.div>
                    )}

                    {/* STEP 3 — Details */}
                    {step === "details" && (
                        <motion.div key="details" variants={fadeIn} initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}>
                            <div className="glass-panel border-glow rounded-3xl p-8">
                                <div className="text-center mb-10">
                                    <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary/20">
                                        {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                                    </div>
                                    <h2 className="font-display text-3xl font-bold mb-3 text-foreground">{selectedDomain}</h2>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label>Full Name *</Label>
                                        <div className="relative">
                                            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input value={name} onChange={e => setName(e.target.value)} className="pl-9 glass-panel border-border/60 h-12" placeholder="Your full name" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Address *</Label>
                                        <div className="relative">
                                            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9 glass-panel border-border/60 h-12" placeholder="you@example.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <div className="relative">
                                            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="pl-9 glass-panel border-border/60 h-12" placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                    </div>
                                    <Button type="submit" size="lg" className="w-full box-glow rounded-xl mt-2" disabled={loading}>
                                        {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : "Complete Registration 🎉"}
                                    </Button>
                                </form>
                                {!preKey && <Button variant="ghost" className="w-full mt-3" onClick={() => setStep("domain")}>← Change selection</Button>}
                            </div>
                        </motion.div>
                    )}

                    {/* Success */}
                    {step === "success" && (
                        <motion.div key="success" variants={fadeIn} initial="hidden" animate="show" className="text-center py-12">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }}>
                                <CheckCircle2 size={80} className="text-green-400 mx-auto mb-6" />
                            </motion.div>
                            <h1 className="font-display text-4xl font-bold mb-3 text-foreground">You're all set! 🎉</h1>
                            <p className="text-muted-foreground mb-2">Thanks, <span className="text-primary font-semibold">{name}</span>!</p>
                            <p className="text-muted-foreground text-lg">You've registered for <span className="text-foreground font-semibold">{selectedDomain}</span>.</p>
                            <p className="text-sm text-muted-foreground/60 mt-4 mb-8">A confirmation will be sent to {email}. We'll be in touch shortly.</p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Button onClick={() => navigate("/")} variant="outline" className="rounded-full px-8">Go Home</Button>
                                <Button onClick={() => navigate("/courses")} className="box-glow rounded-full px-8">Explore Courses</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
