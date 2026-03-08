import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Code, Database, Globe, GraduationCap, LucideIcon, Megaphone, Palette, CheckCircle2, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TimelineItem {
    title: string;
    period: string;
    description: string;
}

interface ServiceData {
    icon: LucideIcon;
    title: string;
    desc: string;
    details: string;
    features: string[];
    timeline: TimelineItem[];
}

const servicesData: Record<string, ServiceData> = {
    "it-software": {
        icon: Code,
        title: "IT & Software Services",
        desc: "Custom Software Development, Computer Programming Services, Software Testing and Maintenance, IT Consulting and Technology Solutions, Computer System Design and Development.",
        details: "Our IT & Software Services provide end-to-end solutions for web, mobile, and enterprise platforms. We specialize in custom development, rigorous quality assurance, and comprehensive IT consulting to ensure your technological systems perform at their absolute peak.",
        features: ["Custom Software Development", "Enterprise System Design", "Quality Assurance", "IT Consulting"],
        timeline: [
            {
                title: "Custom Software Development",
                period: "Core Service",
                description: "Building scalable, robust, and highly secure custom applications tailored entirely to your distinct enterprise needs. Our tech stack is completely modern and optimized for immense traffic."
            },
            {
                title: "Computer Programming Services",
                period: "Core Service",
                description: "Deep-level code architecture. We write efficient algorithms and optimized backend logic to run resource-intensive calculations."
            },
            {
                title: "Software Testing & Maintenance",
                period: "Support Service",
                description: "Comprehensive QA loops including unit testing, E2E testing, load balancing, and constant uptime monitoring to guarantee flawless execution."
            },
            {
                title: "IT Consulting & Technology Solutions",
                period: "Consulting",
                description: "Strategizing your digital transformation. We help select the right tech stack, cloud providers, and development workflows for your business."
            },
            {
                title: "Computer System Design",
                period: "Infrastructure",
                description: "Architecting cloud and on-premise hardware-software integrations to establish high-throughput, low-latency enterprise environments."
            }
        ]
    },
    "web-digital": {
        icon: Globe,
        title: "Web & Digital Services",
        desc: "Website Design and Development, Web Application Development, Web Hosting Services, Domain and Website Management.",
        details: "From stunning, responsive web design to robust application development, our digital services ensure your online presence is both powerful and secure. We deliver seamless user experiences and provide reliable hosting architectures.",
        features: ["UI/UX Web Design", "Progressive Web Apps", "Secure Hosting", "Domain Mgmt"],
        timeline: [
            {
                title: "Website Design & Development",
                period: "Core Service",
                description: "Crafting visually stunning, highly responsive websites built for conversion, using frameworks like React, Next.js, and modern CSS."
            },
            {
                title: "Web Application Development",
                period: "Core Service",
                description: "Engineering interactive, stateful web apps that function identically to native desktop or mobile applications entirely via the browser."
            },
            {
                title: "Web Hosting Services",
                period: "Infrastructure",
                description: "Deploying sites to high-speed, global CDNs and edge networks to guarantee 99.99% uptime and lightning-fast load times anywhere on Earth."
            },
            {
                title: "Domain & Website Management",
                period: "Support Service",
                description: "Handling all DNS configurations, SSL certificate renewals, and ongoing technical SEO optimizations month-over-month."
            }
        ]
    },
    "data-info": {
        icon: Database,
        title: "Data & Information Services",
        desc: "Data Processing Services, Data Entry Services, Database Management, Report Writing and Data Analysis.",
        details: "Harness the true power of your data with our collection, processing, and analytics services. We specialize in turning raw, unstructured information into highly actionable intelligence and managing scalable relational databases.",
        features: ["Big Data Processing", "Database Architecture", "Advanced Analytics", "Reporting"],
        timeline: [
            {
                title: "Data Processing Services",
                period: "Core Service",
                description: "Ingesting massive datasets from various organizational silos and structuring them into clean, standardized formats for deep analysis."
            },
            {
                title: "Data Entry Services",
                period: "Core Service",
                description: "High-accuracy, manual and automated aggregation of physical and disjointed digital records into centralized schemas."
            },
            {
                title: "Database Management",
                period: "Infrastructure",
                description: "Designing, deploying, and maintaining high-availability SQL and NoSQL database clusters optimized for read/write speed."
            },
            {
                title: "Report Writing & Analysis",
                period: "Consulting",
                description: "Creating beautiful, interactive dashboards that translate complex mathematical models into plain, strategic business insights."
            }
        ]
    },
    "creative-media": {
        icon: Palette,
        title: "Digital Media & Creative Services",
        desc: "Video Production Services, Digital Content Creation, Graphic Design and Specialized Design Services, Branding and Creative Design.",
        details: "Elevate your corporate brand identity with our premium creative services. We offer high-quality 4K video production, cutting-edge graphic design, and complete visual branding packages to help you dominate your market sector.",
        features: ["Video Production", "Digital Content", "Brand Identity", "Creative Strategy"],
        timeline: [
            {
                title: "Video Production Services",
                period: "Core Service",
                description: "End-to-end media production including scripting, 4K filming, lighting, post-production editing, and VFX integration."
            },
            {
                title: "Digital Content Creation",
                period: "Core Service",
                description: "Crafting highly engaging social media assets, copy, and promotional material engineered specifically for high shareability."
            },
            {
                title: "Graphic & Specialized Design",
                period: "Core Service",
                description: "Producing stunning vector graphics, illustrations, UI mockups, and corporate collateral that visually separates you from competitors."
            },
            {
                title: "Branding & Creative Design",
                period: "Consulting",
                description: "Developing comprehensive corporate identity systems, including typography constraints, color theory guides, and logo design."
            }
        ]
    },
    "marketing": {
        icon: Megaphone,
        title: "Marketing Services",
        desc: "Digital Advertising, Online Marketing Support, Market Research Services, Technical Services.",
        details: "Reach your exact target audience through our data-driven digital advertising, comprehensive market correlation research, and highly strategic online marketing deployment campaigns.",
        features: ["Performance Marketing", "SEO Optimization", "Market Research", "Social Media Strategy"],
        timeline: [
            {
                title: "Digital Advertising",
                period: "Core Service",
                description: "Managing vast multi-platform ad spend across Google, Meta, and LinkedIn with surgically precise targeting parameters."
            },
            {
                title: "Online Marketing Support",
                period: "Core Service",
                description: "Executing long-term content strategies, email marketing funnels, and continuous A/B testing of landing page copy."
            },
            {
                title: "Market Research Services",
                period: "Consulting",
                description: "Running deep statistical analysis on competitor landscapes, demographic pricing thresholds, and consumer behavioral trends."
            },
            {
                title: "Technical Services",
                period: "Support Service",
                description: "Configuring complex tracking pixels, Google Tag Manager layouts, and server-side conversion tracking for exact ROI measurement."
            }
        ]
    },
    "education": {
        icon: GraduationCap,
        title: "Education & Training",
        desc: "Academic Tutoring Services, IT Skill Development Training, Programming and Software Development Training.",
        details: "Empower yourself and your enterprise teams with our elite educational programs. We offer highly specialized technical training, IT upskilling, and comprehensive programming bootcamps designed for real-world deployment.",
        features: ["Corporate IT Training", "Developer Bootcamps", "Skill Assessments", "Seminars"],
        timeline: [
            {
                title: "Programming & Software Dev Training",
                period: "Core Service",
                description: "Intensive, mentor-led bootcamps teaching modern MERN stack, Python data science, and secure cloud architecture."
            },
            {
                title: "IT Skill Development Training",
                period: "Core Service",
                description: "Upskilling corporate personnel on modern enterprise software usage, cybersecurity hygiene, and digital workflow optimization."
            },
            {
                title: "Academic Tutoring Services",
                period: "Support Service",
                description: "Providing 1-on-1 expert guidance for computer science students navigating complex algorithms and low-level computing concepts."
            }
        ]
    },
};

export default function ServiceDetails() {
    const { id } = useParams<{ id: string }>();
    const service = id ? servicesData[id] : null;

    if (!service) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-24">
                <Navbar />
                <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
                <Link to="/services">
                    <Button>Return to Services</Button>
                </Link>
                <Footer />
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-24">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <Navbar />

            <main className="flex-1 container mx-auto max-w-5xl px-4 py-12 relative z-10">
                <Link to="/services" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
                </Link>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-12 rounded-3xl border-glow relative overflow-hidden mb-12"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        <div className="p-6 rounded-2xl bg-primary/10 text-primary shadow-[0_0_20px_hsl(187_80%_50%_/_0.2)] shrink-0">
                            <Icon size={48} />
                        </div>

                        <div>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{service.title}</h1>
                            <p className="text-xl text-primary font-medium mb-6">{service.desc}</p>

                            <div className="prose prose-invert max-w-none mb-10">
                                <p className="text-muted-foreground leading-relaxed text-lg">{service.details}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 border-t border-border/50">
                                <Link to="/contact">
                                    <Button size="lg" className="box-glow hover:-translate-y-1 transition-transform rounded-full px-8">Require This Service</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tree View / Timeline Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="glass-panel p-8 md:p-12 rounded-3xl border-glow relative overflow-hidden"
                >
                    <h3 className="font-display text-3xl font-bold mb-10 text-center">Service Roadmap</h3>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
                        {service.timeline.map((item: TimelineItem, idx: number) => (
                            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_hsl(187_80%_50%_/_0.3)] z-10">
                                    <Zap size={16} />
                                </div>

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl border border-border/50 hover:border-primary/40 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-xl text-foreground">{item.title}</h4>
                                        <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">{item.period}</span>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
