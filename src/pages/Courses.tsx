import { Code, Shield, Brain, BarChart, Gamepad, Camera, Video, PenTool, Sparkles, Cloud, Smartphone } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";

const courses = [
    {
        icon: Code,
        title: "Web Development (MERN)",
        desc: "Master MongoDB, Express.js, React, and Node.js to build powerful full-stack web applications from scratch.",
    },
    {
        icon: Shield,
        title: "Cyber Security",
        desc: "Learn ethical hacking, network defense, cryptography, and risk mitigation strategies to protect digital assets.",
    },
    {
        icon: Brain,
        title: "Machine Learning (ML)",
        desc: "Dive into data science, predictive modeling, and AI algorithms using Python, TensorFlow, and advanced techniques.",
    },
    {
        icon: BarChart,
        title: "Data Analytics",
        desc: "Transform raw data into actionable insights using advanced statistical analysis, visualization, and Python tools.",
    },
    {
        icon: Gamepad,
        title: "Game Development",
        desc: "Create immersive 2D and 3D gaming experiences using industry-standard game engines and modern mechanics.",
    },
    {
        icon: Camera,
        title: "Photography",
        desc: "Master the art of visual storytelling, lighting techniques, and professional post-processing photography skills.",
    },
    {
        icon: Video,
        title: "Video Editing",
        desc: "Learn professional video production, color grading, and dynamic cuts using modern industry editing software.",
    },
    {
        icon: PenTool,
        title: "Figma (UI & UX)",
        desc: "Design stunning user interfaces and craft intuitive user experiences using advanced Figma prototyping tools.",
    },
    {
        icon: Sparkles,
        title: "Vibe Coding",
        desc: "Write code that feels right. A modern, creative approach to programming prioritizing developer experience and flow.",
    },
    {
        icon: Cloud,
        title: "Cloud Computing",
        desc: "Deploy, scale, and manage modern cloud architectures and infrastructure across leading cloud providers.",
    },
    {
        icon: Smartphone,
        title: "App Development",
        desc: "Build cross-platform mobile applications for iOS and Android using modern frameworks and intuitive design patterns.",
    },
] as const;

export default function Courses() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-24">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <Navbar />
            <main className="flex-1 py-12 px-4 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <div className="section-shell p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16 relative z-10"
                        >
                            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Courses</h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Comprehensive training programs designed to build your expertise in modern technology and creative fields.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
                        >
                            {courses.map((course, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="interactive-card glass-panel group p-6 rounded-2xl border-glow flex items-start gap-4 transition-all hover:bg-card/60"
                                >
                                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-[0_0_15px_hsl(40_90%_55%_/_0.1)] shrink-0 mt-1">
                                        <course.icon size={26} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">{course.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{course.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
