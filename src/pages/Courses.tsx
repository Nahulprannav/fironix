import { useState } from "react";
import { Code, Shield, Brain, BarChart, Gamepad, Camera, Video, PenTool, Sparkles, Cloud, Smartphone, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";

const courses = [
    {
        icon: Code,
        title: "Web Development (MERN)",
        desc: "Master MongoDB, Express.js, React, and Node.js to build powerful full-stack web applications from scratch.",
        modules: [
            { title: "Frontend Mastery", period: "Weeks 1-4", description: "Master React, Vite, Tailwind CSS, and state management via Redux to build incredibly performant client-side applications." },
            { title: "Backend Architecture", period: "Weeks 5-8", description: "Learn to build REST API endpoints and GraphQL servers using Node.js and Express, connected to secure JWT architectures." },
            { title: "Database Integration", period: "Weeks 9-10", description: "Dive deep into NoSQL with MongoDB. Learn schema design, aggregation pipelines, and indexing for massive datasets." },
            { title: "Deployment & Scaling", period: "Weeks 11-12", description: "Deploy your full-stack applications to platforms like Vercel and AWS EC2 ensuring high scale and availability." }
        ]
    },
    {
        icon: Shield,
        title: "Cyber Security",
        desc: "Learn ethical hacking, network defense, cryptography, and risk mitigation strategies to protect digital assets.",
        modules: [
            { title: "Network Fundamentals", period: "Weeks 1-3", description: "Understand OSI models, TCP/IP, packet sniffing with Wireshark, and configuring impenetrable firewalls." },
            { title: "Offensive Security", period: "Weeks 4-7", description: "Learn ethical hacking using Kali Linux, Metasploit, Nmap, and finding vulnerabilities in enterprise networks." },
            { title: "Web App Hacking", period: "Weeks 8-10", description: "A deep dive into the OWASP Top 10, executing SQL injections, XSS, and CSRF attacks in controlled environments." },
            { title: "Cryptography & Forensics", period: "Weeks 11-12", description: "Implementing AES-256 encryption, hashing protocols, and performing digital forensics on compromised machines." }
        ]
    },
    {
        icon: Brain,
        title: "Machine Learning (ML)",
        desc: "Dive into data science, predictive modeling, and AI algorithms using Python, TensorFlow, and advanced techniques.",
        modules: [
            { title: "Python Data Science", period: "Weeks 1-3", description: "Mastering Pandas, NumPy, and Matplotlib to ingest, clean, and visualize complex datasets efficiently." },
            { title: "Supervised Learning", period: "Weeks 4-6", description: "Building exact linear regressions, decision trees, and random forests to predict distinct market outcomes." },
            { title: "Deep Learning Neural Nets", period: "Weeks 7-9", description: "Engineering immense neural networks using TensorFlow and Keras to tackle image and text classification." },
            { title: "Generative AI", period: "Weeks 10-12", description: "Integrating Large Language Models (LLMs) and mastering prompts and fine-tuning using modern transformers." }
        ]
    },
    {
        icon: BarChart,
        title: "Data Analytics",
        desc: "Transform raw data into actionable insights using advanced statistical analysis, visualization, and Python tools.",
        modules: [
            { title: "Data Collection & Cleaning", period: "Weeks 1-3", description: "Extracting data from APIs, writing SQL queries, and cleaning messy data using rigorous statistical methods." },
            { title: "Advanced SQL", period: "Weeks 4-6", description: "Mastering complex SQL joins, window functions, CTEs (Common Table Expressions) and subqueries." },
            { title: "Data Visualization", period: "Weeks 7-9", description: "Creating compelling visual narratives using Tableau, PowerBI, and D3.js to present directly to stakeholders." },
            { title: "Predictive Analytics", period: "Weeks 10-12", description: "Deploying basic ML predictive algorithms to forecast business growth and revenue run-rates." }
        ]
    },
    {
        icon: Gamepad,
        title: "Game Development",
        desc: "Create immersive 2D and 3D gaming experiences using industry-standard game engines and modern mechanics.",
        modules: [
            { title: "Engine Fundamentals", period: "Weeks 1-4", description: "Learning the absolute core mechanics of either Unity (C#) or Unreal Engine (C++) environments." },
            { title: "Physics & Movement", period: "Weeks 5-7", description: "Programming precise character controllers, rigid body physics, raycasting, and exact collision detection mapping." },
            { title: "Level Design & Lighting", period: "Weeks 8-10", description: "Building stunning environments, baking global illumination, and applying post-processing volumes for AAA quality." },
            { title: "Multiplayer Architecture", period: "Weeks 11-12", description: "Implementing basic netcode, server-client architecture, and latency remediation strategies." }
        ]
    },
    {
        icon: Camera,
        title: "Photography",
        desc: "Master the art of visual storytelling, lighting techniques, and professional post-processing photography skills.",
        modules: [
            { title: "Camera Mechanics", period: "Weeks 1-3", description: "The precise mathematics of exposure triangles: understanding shutter speed, aperture, and ISO inside out." },
            { title: "Lighting & Composition", period: "Weeks 4-6", description: "Mastering the rule of thirds, leading lines, off-camera flash, and studio strobe manipulation." },
            { title: "Lightroom Mastery", period: "Weeks 7-9", description: "Professional color grading, masking, batch processing, and RAW file architectural manipulation in Adobe Lightroom." },
            { title: "Commercial Portfolio", period: "Weeks 10-12", description: "Building a high-end portfolio tailored perfectly to acquire massive corporate clients and magazine covers." }
        ]
    },
    {
        icon: Video,
        title: "Video Editing",
        desc: "Learn professional video production, color grading, and dynamic cuts using modern industry editing software.",
        modules: [
            { title: "Premiere Pro Fundamentals", period: "Weeks 1-4", description: "Navigating timelines, executing exact J-cuts/L-cuts, multi-cam sequences, and audio rhythmic synchronization." },
            { title: "Color Grading", period: "Weeks 5-7", description: "Mastering DaVinci Resolve color wheels, scopes, LUT application, and cinematic grading techniques." },
            { title: "Motion Graphics", period: "Weeks 8-10", description: "Integrating Adobe After Effects to create stunning kinetic typography, tracking, and keyframing." },
            { title: "Sound Design", period: "Weeks 11-12", description: "Layering SFX, executing perfect audio EQ, compression, and mastering the final mix for cinematic punch." }
        ]
    },
    {
        icon: PenTool,
        title: "Figma (UI & UX)",
        desc: "Design stunning user interfaces and craft intuitive user experiences using advanced Figma prototyping tools.",
        modules: [
            { title: "Design Theory", period: "Weeks 1-3", description: "Understanding deep user psychology, color theory, typography pairings, and layout grid systems." },
            { title: "Figma Mastery", period: "Weeks 4-6", description: "Mastering auto-layout, nested components, interactive variants, and highly scalable design systems." },
            { title: "Prototyping & Animation", period: "Weeks 7-9", description: "Creating hyper-realistic interactive prototypes with smart-animate, scroll behaviors, and micro-interactions." },
            { title: "User Testing", period: "Weeks 10-12", description: "Conducting intense A/B testing, heatmapping, and iterating wireframes based entirely on exact analytical data." }
        ]
    },
    {
        icon: Sparkles,
        title: "Vibe Coding",
        desc: "Write code that feels right. A modern, creative approach to programming prioritizing developer experience and flow.",
        modules: [
            { title: "Flow State Mechanics", period: "Weeks 1-3", description: "Optimizing your IDE environment entirely around flow state preservation to dramatically increase coding stamina." },
            { title: "Intuitive Architecture", period: "Weeks 4-6", description: "Designing system structures that instinctively make sense, heavily reducing cognitive friction when scaling codebases." },
            { title: "Creative Logic", period: "Weeks 7-9", description: "Approaching complex algorithms not through brute forced mathematics, but through elegant, artful problem-solving patterns." },
            { title: "The Developer Experience", period: "Weeks 10-12", description: "Building highly advanced CLI tools, rapid deployment workflows, and ultra-fast CI/CD pipelines to ensure programming remains fun." }
        ]
    },
    {
        icon: Cloud,
        title: "Cloud Computing",
        desc: "Deploy, scale, and manage modern cloud architectures and infrastructure across leading cloud providers.",
        modules: [
            { title: "AWS Fundamentals", period: "Weeks 1-4", description: "Mastering exact EC2 provisioning, S3 bucket policies, VPC networking, and rigid IAM user definitions." },
            { title: "Containerization", period: "Weeks 5-7", description: "Wrapping entire applications into micro-containers using Docker, ensuring absolute consistency across all environments." },
            { title: "Kubernetes Orchestration", period: "Weeks 8-10", description: "Deploying self-healing Kubernetes clusters, managing nodes, pods, and massive ingress controllers." },
            { title: "Infrastructure as Code", period: "Weeks 11-12", description: "Automating massive cloud deployments instantaneously using exact Terraform and AWS CloudFormation scripts." }
        ]
    },
    {
        icon: Smartphone,
        title: "App Development",
        desc: "Build cross-platform mobile applications for iOS and Android using modern frameworks and intuitive design patterns.",
        modules: [
            { title: "React Native Cores", period: "Weeks 1-4", description: "Building precise cross-platform user interfaces using React Native, Expo, and the underlying exact mobile architecture." },
            { title: "Native Functionality", period: "Weeks 5-7", description: "Tapping directly into native device APIs like cameras, GPS location tracking, local storage, and push notifications." },
            { title: "App Performance", period: "Weeks 8-10", description: "Profiling and heavily reducing JS thread frame drops, optimizing exact memory leaks, and compiling via Hermes." },
            { title: "App Store Deployment", period: "Weeks 11-12", description: "Navigating the labyrinth of Apple App Store and Google Play Store policies to successfully publish to millions." }
        ]
    },
] as const;

export default function Courses() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");

    const openModal = (title: string) => {
        setSelectedCourse(title);
        setModalOpen(true);
    };

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
                <div className="container mx-auto max-w-6xl">
                    <div className="section-shell p-8 md:p-12 relative overflow-hidden mb-16">
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-6 relative z-10"
                        >
                            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Enterprise Courses</h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Comprehensive training programs designed to build your full-stack engineering expertise and creative professional capabilities.
                            </p>
                        </motion.div>
                    </div>

                    <div className="space-y-24">
                        {courses.map((course, courseIdx) => (
                            <motion.div
                                key={courseIdx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="glass-panel p-8 md:p-12 rounded-3xl border-glow relative overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start mb-12 relative z-10">
                                    <div className="p-5 rounded-2xl bg-accent/10 text-accent shadow-[0_0_20px_hsl(40_90%_55%_/_0.15)] shrink-0">
                                        <course.icon size={48} />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="font-display text-3xl font-bold mb-3 text-foreground">{course.title}</h2>
                                        <p className="text-xl text-muted-foreground leading-relaxed mb-6">{course.desc}</p>
                                        <Button size="lg" className="box-glow hover:-translate-y-1 transition-transform rounded-full" onClick={() => openModal(course.title)}>
                                            Register for Course
                                        </Button>
                                    </div>
                                </div>

                                <h3 className="font-display text-2xl font-bold mb-8 text-center bg-background/50 py-3 rounded-lg border border-border/50">Curriculum Roadmap</h3>

                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-accent/50 before:via-border before:to-transparent">
                                    {course.modules.map((module, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_hsl(40_90%_55%_/_0.2)] z-10">
                                                <Zap size={16} />
                                            </div>

                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl border border-border/50 hover:border-accent/40 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-bold text-xl text-foreground">{module.title}</h4>
                                                    <span className="text-xs font-semibold text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">{module.period}</span>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">{module.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />

            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                type="course"
                selection={selectedCourse}
            />
        </div>
    );
}
