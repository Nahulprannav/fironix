import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard, BookOpen, Briefcase, FolderOpen, Settings, Users, LogOut,
    Plus, Trash2, Pencil, Check, X, ClipboardList, RefreshCw, ChevronRight, ShieldCheck, LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API = "http://localhost:3001";

type Collection = "courses" | "internships" | "projects" | "services" | "team";
type Registration = { id: string; name: string; email: string; phone?: string; type: string; selection: string; timestamp: string; status: string };

const TABS: { id: Collection | "registrations" | "home"; label: string; icon: LucideIcon }[] = [
    { id: "home", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "internships", label: "Internships", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "services", label: "Services", icon: Settings },
    { id: "team", label: "Team", icon: Users },
    { id: "registrations", label: "Registrations", icon: ClipboardList },
];

function useApi() {
    const token = localStorage.getItem("fironix_admin_token");
    return {
        get: (path: string) => fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        post: (path: string, body: object) => fetch(`${API}${path}`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) }).then(r => r.json()),
        put: (path: string, body: object) => fetch(`${API}${path}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) }).then(r => r.json()),
        del: (path: string) => fetch(`${API}${path}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    };
}

function StatsCard({ label, count, icon: Icon, color }: { label: string; count: number; icon: LucideIcon; color: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl border-glow flex items-center gap-5"
        >
            <div className={`p-4 rounded-xl ${color}`}>
                <Icon size={28} className={color.replace("bg-", "text-").replace("/10", "")} />
            </div>
            <div>
                <p className="text-3xl font-bold font-display text-foreground">{count}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        </motion.div>
    );
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const api = useApi();
    const [tab, setTab] = useState<Collection | "registrations" | "home">("home");
    const [data, setData] = useState<Record<string, object[]>>({});
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [newItem, setNewItem] = useState<Record<string, string>>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Record<string, string>>({});
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const adminUser = localStorage.getItem("fironix_admin_user") || "Admin";

    const loadData = useCallback(async () => {
        try {
            const db = await api.get("/api/admin/db");
            if (db.error) { toast.error("Session expired. Please log in."); navigate("/admin/login"); return; }
            setData(db);
            setRegistrations(db.registrations || []);
        } catch { toast.error("Cannot connect to API server."); }
    }, [api, navigate]);

    useEffect(() => {
        const token = localStorage.getItem("fironix_admin_token");
        if (!token) { navigate("/admin/login"); return; }
        loadData();
    }, [navigate, loadData]);

    const handleLogout = () => {
        localStorage.removeItem("fironix_admin_token");
        localStorage.removeItem("fironix_admin_user");
        navigate("/admin/login");
    };

    const handleAdd = async () => {
        if (tab === "registrations" || tab === "home") return;
        const filled = Object.values(newItem).filter(Boolean);
        if (filled.length === 0) { toast.error("Please fill in at least one field."); return; }
        await api.post(`/api/admin/content/${tab}`, newItem);
        toast.success("Item added!");
        setNewItem({});
        loadData();
    };

    const handleDelete = async (id: string) => {
        if (tab === "registrations" || tab === "home") return;
        if (!confirm("Delete this item? This cannot be undone.")) return;
        await api.del(`/api/admin/content/${tab}/${id}`);
        toast.success("Deleted.");
        loadData();
    };

    const handleEditSave = async (id: string) => {
        if (tab === "registrations" || tab === "home") return;
        await api.put(`/api/admin/content/${tab}/${id}`, editValues);
        toast.success("Updated.");
        setEditingId(null);
        loadData();
    };

    const currentItems = tab !== "home" && tab !== "registrations" ? (data[tab] as (Record<string, string>)[] || []) : [];
    const fieldKeys = currentItems.length > 0 ? Object.keys(currentItems[0]).filter(k => k !== "id") : ["title", "description"];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <motion.aside
                animate={{ width: sidebarOpen ? 260 : 72 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="fixed top-0 left-0 h-full bg-card border-r border-border/60 flex flex-col z-40 overflow-hidden"
            >
                {/* Logo */}
                <div className="flex items-center gap-3 p-5 border-b border-border/60">
                    <ShieldCheck className="text-primary shrink-0" size={32} />
                    {sidebarOpen && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-lg font-bold gradient-text whitespace-nowrap">
                            Fironix CMS
                        </motion.span>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id as typeof tab)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${tab === id ? "bg-primary/10 text-primary font-semibold border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
                        >
                            <Icon size={20} />
                            {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm whitespace-nowrap">{label}</motion.span>}
                        </button>
                    ))}
                </nav>

                {/* Collapse & Logout */}
                <div className="p-3 border-t border-border/60 space-y-2">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
                        <ChevronRight size={18} className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
                        {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm">Collapse</motion.span>}
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut size={18} />
                        {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm">Logout</motion.span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main content */}
            <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-[260px]" : "ml-[72px]"} p-8`}>

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground">
                            {tab === "home" ? `Welcome, ${adminUser}` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">Fironix Admin · Content Management System</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={loadData} className="gap-2 rounded-xl">
                        <RefreshCw size={14} /> Refresh
                    </Button>
                </div>

                {/* HOME TAB */}
                {tab === "home" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <StatsCard label="Courses" count={data.courses?.length || 0} icon={BookOpen} color="bg-primary/10" />
                        <StatsCard label="Internships" count={data.internships?.length || 0} icon={Briefcase} color="bg-blue-500/10" />
                        <StatsCard label="Projects" count={data.projects?.length || 0} icon={FolderOpen} color="bg-green-500/10" />
                        <StatsCard label="Services" count={data.services?.length || 0} icon={Settings} color="bg-purple-500/10" />
                        <StatsCard label="Team" count={data.team?.length || 0} icon={Users} color="bg-orange-500/10" />
                        <StatsCard label="Registrations" count={registrations.length} icon={ClipboardList} color="bg-accent/10" />
                    </div>
                )}

                {/* REGISTRATIONS TAB */}
                {tab === "registrations" && (
                    <div className="glass-panel rounded-2xl overflow-hidden border-glow">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-border/60">
                                    <tr className="text-left">
                                        {["Name", "Email", "Phone", "Type", "Selection", "Date", "Status"].map(h => (
                                            <th key={h} className="px-5 py-4 font-semibold text-muted-foreground">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.length === 0 ? (
                                        <tr><td colSpan={7} className="text-center py-16 text-muted-foreground">No registrations yet.</td></tr>
                                    ) : registrations.map((reg) => (
                                        <tr key={reg.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                                            <td className="px-5 py-3 font-medium text-foreground">{reg.name}</td>
                                            <td className="px-5 py-3 text-primary">{reg.email}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{reg.phone || "—"}</td>
                                            <td className="px-5 py-3"><span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs border border-primary/20">{reg.type}</span></td>
                                            <td className="px-5 py-3">{reg.selection}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{new Date(reg.timestamp).toLocaleDateString()}</td>
                                            <td className="px-5 py-3"><span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full text-xs border border-green-500/20">{reg.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* COLLECTION TABS */}
                {tab !== "home" && tab !== "registrations" && (
                    <div className="space-y-6">
                        {/* Add New Item */}
                        <div className="glass-panel border-glow rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-5 flex items-center gap-2"><Plus size={18} className="text-primary" /> Add New Entry</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {fieldKeys.map(k => (
                                    <div key={k}>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1 capitalize">{k}</label>
                                        <Input
                                            value={newItem[k] || ""}
                                            onChange={e => setNewItem(prev => ({ ...prev, [k]: e.target.value }))}
                                            placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                                            className="glass-panel border-border/50 h-10"
                                        />
                                    </div>
                                ))}
                                <div className="flex items-end">
                                    <Button onClick={handleAdd} className="box-glow w-full gap-2 rounded-xl">
                                        <Plus size={16} /> Add Entry
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Existing Items */}
                        <div className="glass-panel border-glow rounded-2xl overflow-hidden">
                            {currentItems.length === 0 ? (
                                <div className="text-center py-20 text-muted-foreground">
                                    <FolderOpen size={48} className="mx-auto mb-4 opacity-40" />
                                    <p>No items yet. Add one above.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-border/30">
                                    {currentItems.map((item) => (
                                        <div key={item.id} className="p-5 flex items-start gap-4 hover:bg-secondary/10 transition-colors">
                                            {editingId === item.id ? (
                                                <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                    {Object.keys(item).filter(k => k !== "id").map(k => (
                                                        <Input
                                                            key={k}
                                                            value={editValues[k] ?? item[k]}
                                                            onChange={e => setEditValues(prev => ({ ...prev, [k]: e.target.value }))}
                                                            className="glass-panel border-border/50 h-9"
                                                            placeholder={k}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
                                                    {Object.entries(item).filter(([k]) => k !== "id").map(([k, v]) => (
                                                        <div key={k}>
                                                            <span className="text-xs text-muted-foreground capitalize">{k}: </span>
                                                            <span className="text-sm text-foreground font-medium">{v}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex gap-2 shrink-0">
                                                {editingId === item.id ? (
                                                    <>
                                                        <Button size="icon" variant="ghost" className="rounded-xl w-8 h-8 hover:text-green-400" onClick={() => handleEditSave(item.id)}><Check size={15} /></Button>
                                                        <Button size="icon" variant="ghost" className="rounded-xl w-8 h-8 hover:text-muted-foreground" onClick={() => setEditingId(null)}><X size={15} /></Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button size="icon" variant="ghost" className="rounded-xl w-8 h-8 hover:text-primary" onClick={() => { setEditingId(item.id); setEditValues({}); }}><Pencil size={15} /></Button>
                                                        <Button size="icon" variant="ghost" className="rounded-xl w-8 h-8 hover:text-red-400" onClick={() => handleDelete(item.id)}><Trash2 size={15} /></Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
