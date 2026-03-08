import { useState } from "react";
import { X, User, Mail, Phone, BookOpen, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API = "http://localhost:3001";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: "course" | "workshop" | "internship";
    selection: string;
}

export default function RegistrationModal({ isOpen, onClose, type, selection }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const reset = () => { setName(""); setEmail(""); setPhone(""); setDone(false); };

    const handleClose = () => {
        onClose();
        setTimeout(reset, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, type, selection }),
            });
            const data = await res.json();
            if (!res.ok) { toast.error(data.error || "Registration failed."); return; }
            setDone(true);
        } catch {
            toast.error("Cannot reach server. Is node server/index.js running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        className="relative w-full max-w-md glass-panel border-glow rounded-3xl p-8 shadow-2xl z-10"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {done ? (
                            <div className="text-center py-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <CheckCircle2 size={64} className="text-green-400 mx-auto mb-4" />
                                </motion.div>
                                <h2 className="font-display text-2xl font-bold mb-2 text-foreground">You're Registered!</h2>
                                <p className="text-muted-foreground mb-2">Thank you, <span className="text-primary font-semibold">{name}</span>!</p>
                                <p className="text-muted-foreground text-sm">You've registered for <span className="text-foreground font-medium">{selection}</span>.</p>
                                <p className="text-xs text-muted-foreground/60 mt-4">We will reach out via email at {email}.</p>
                                <Button onClick={handleClose} className="mt-8 box-glow rounded-full px-8">Close</Button>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-8">
                                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 mx-auto">
                                        <BookOpen size={28} />
                                    </div>
                                    <h2 className="font-display text-2xl font-bold text-foreground capitalize">Register for {type}</h2>
                                    <p className="text-primary text-sm font-medium mt-1">{selection}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-name">Full Name *</Label>
                                        <div className="relative">
                                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input id="reg-name" value={name} onChange={e => setName(e.target.value)} className="pl-9 glass-panel border-border/60 h-11" placeholder="Your full name" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-email">Email Address *</Label>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input id="reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9 glass-panel border-border/60 h-11" placeholder="you@example.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input id="reg-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="pl-9 glass-panel border-border/60 h-11" placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                    </div>
                                    <Button type="submit" size="lg" className="w-full box-glow rounded-xl" disabled={loading}>
                                        {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : "Confirm Registration"}
                                    </Button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
