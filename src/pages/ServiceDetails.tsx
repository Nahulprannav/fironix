import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Code, Database, Globe, GraduationCap, Megaphone, Palette, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const servicesData = {
    "it-software": {
        icon: Code,
        title: "IT & Software Services",
        desc: "Custom Software Development, Computer Programming Services, Software Testing and Maintenance, IT Consulting and Technology Solutions, Computer System Design and Development.",
        details: "Our IT & Software Services provide end-to-end solutions for web, mobile, and enterprise platforms. We specialize in custom development, rigorous quality assurance, and comprehensive IT consulting to ensure your technological systems perform at their absolute peak.",
        features: ["Custom Software Development", "Enterprise System Design", "Quality Assurance & Testing", "IT Consulting & Strategy"],
    },
    "web-digital": {
        icon: Globe,
        title: "Web & Digital Services",
        desc: "Website Design and Development, Web Application Development, Web Hosting Services, Domain and Website Management.",
        details: "From stunning, responsive web design to robust application development, our digital services ensure your online presence is both powerful and secure. We deliver seamless user experiences and provide reliable hosting architectures.",
        features: ["UI/UX Web Design", "Progressive Web Apps", "Secure Hosting Solutions", "Domain Management"],
    },
    "data-info": {
        icon: Database,
        title: "Data & Information Services",
        desc: "Data Processing Services, Data Entry Services, Database Management, Report Writing and Data Analysis.",
        details: "Harness the true power of your data with our collection, processing, and analytics services. We specialize in turning raw, unstructured information into highly actionable intelligence and managing scalable relational databases.",
        features: ["Big Data Processing", "Database Architecture", "Advanced Analytics", "Automated Reporting"],
    },
    "creative-media": {
        icon: Palette,
        title: "Digital Media & Creative Services",
        desc: "Video Production Services, Digital Content Creation, Graphic Design and Specialized Design Services, Branding and Creative Design.",
        details: "Elevate your corporate brand identity with our premium creative services. We offer high-quality 4K video production, cutting-edge graphic design, and complete visual branding packages to help you dominate your market sector.",
        features: ["Video Production", "Digital Content Creation", "Brand Identity Design", "Creative Strategy"],
    },
    "marketing": {
        icon: Megaphone,
        title: "Marketing Services",
        desc: "Digital Advertising, Online Marketing Support, Market Research Services, Technical Services.",
        details: "Reach your exact target audience through our data-driven digital advertising, comprehensive market correlation research, and highly strategic online marketing deployment campaigns.",
        features: ["Performance Marketing", "SEO Optimization", "Market Research", "Social Media Strategy"],
    },
    "education": {
        icon: GraduationCap,
        title: "Education & Training",
        desc: "Academic Tutoring Services, IT Skill Development Training, Programming and Software Development Training.",
        details: "Empower yourself and your enterprise teams with our elite educational programs. We offer highly specialized technical training, IT upskilling, and comprehensive programming bootcamps designed for real-world deployment.",
        features: ["Corporate IT Training", "Developer Bootcamps", "Skill Assessments", "Technical Seminars"],
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

            <main className="flex-1 container mx-auto max-w-4xl px-4 py-12 relative z-10">
                <Link to="/services" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-12 rounded-3xl border-glow relative overflow-hidden"
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

                            <h3 className="text-2xl font-bold text-foreground mb-6">Key Offerings</h3>
                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                {service.features.map((feature: string, idx: number) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={idx}
                                        className="flex items-center gap-3 bg-secondary/30 p-4 rounded-xl border border-white/5"
                                    >
                                        <CheckCircle2 className="text-accent shrink-0" size={20} />
                                        <span className="text-foreground font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-border/50">
                                <Link to="/contact">
                                    <Button size="lg" className="box-glow hover:-translate-y-1 transition-transform rounded-full px-8">Require This Service</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
