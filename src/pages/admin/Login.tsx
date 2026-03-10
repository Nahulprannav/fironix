import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, LogIn, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { api } from "@/lib/api";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data: any = await api.post("/login", { username, password });

            localStorage.setItem("fironix_admin_token", data.token);
            localStorage.setItem("fironix_admin_user", data.username);
            toast.success("Welcome back, Admin!");
            navigate("/admin/dashboard");
        } catch (err: any) {
            toast.error(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

            <Link to="/" className="absolute top-8 left-8 inline-flex items-center text-muted-foreground hover:text-primary transition-colors group z-20">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="w-full max-w-md"
            >
                <div className="glass-panel border-glow rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-[60px]" />

                    {/* Header */}
                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-6 shadow-[0_0_20px_hsl(187_80%_50%_/_0.2)]">
                            <ShieldCheck size={40} />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-glow mb-2">Admin Portal</h1>
                        <p className="text-muted-foreground text-sm">Fironix Content Management System</p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-semibold px-4 py-2 rounded-full border border-accent/20">
                            <Lock size={12} />
                            Authorised Personnel Only
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-foreground font-medium">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin"
                                className="glass-panel border-border/60 focus:border-primary/60 h-12 text-base"
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••"
                                    className="glass-panel border-border/60 focus:border-primary/60 h-12 text-base pr-12"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full box-glow rounded-xl text-base font-semibold hover:-translate-y-0.5 transition-transform"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={18} className="mr-2" /> Sign In
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-xs text-muted-foreground/60 mt-8 relative z-10">
                        Access restricted to Fironix administrators only.<br />No public registration available.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
