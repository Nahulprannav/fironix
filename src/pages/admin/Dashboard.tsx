import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard, BookOpen, Briefcase, FolderOpen, Settings, Users, LogOut,
    Plus, Trash2, Pencil, Check, X, ClipboardList, RefreshCw, ChevronRight, ShieldCheck, LucideIcon, Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
    getCollection,
    addItem,
    updateItem,
    deleteItem,
    Collection,
} from "@/lib/firestore";

type Registration = { id: string; name: string; email: string; phone?: string; type: string; selection: string; _createdAt?: any; status: string };

const TABS: { id: Collection | "registrations" | "home" | "import"; label: string; icon: LucideIcon }[] = [
    { id: "home", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "internships", label: "Internships", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "services", label: "Services", icon: Settings },
    { id: "team", label: "Team", icon: Users },
    { id: "workshops", label: "Workshops", icon: ClipboardList },
    { id: "registrations", label: "Registrations", icon: ClipboardList },
    { id: "import", label: "Code Import", icon: Code2 },
];

function StatsCard({ label, count, icon: Icon, color }: { label: string; count: number; icon: LucideIcon; color: string }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-2xl border-glow flex items-center gap-5">
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

type Tab = Collection | "registrations" | "home" | "import";

const CONTENT_COLLECTIONS: Collection[] = ["courses", "internships", "projects", "services", "team", "workshops"];

const defaultFieldsForTab: Record<string, string[]> = {
    courses: ["title", "description", "duration", "price", "requirements", "skills_acquired", "modules"],
    internships: ["title", "description", "duration", "stipend", "role", "requirements", "skills", "icon"],
    projects: ["title", "description", "techStack", "githubLink", "image", "tags"],
    services: ["title", "description", "details", "features", "slug"],
    team: ["name", "photoURL", "role", "skills", "experience", "bio"],
    workshops: ["title", "description", "date", "time", "location", "seats", "type", "color"],
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [tab, setTab] = useState<Tab>("home");
    const [data, setData] = useState<Record<string, any[]>>({});
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [newItem, setNewItem] = useState<Record<string, string>>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Record<string, string>>({});
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [importJson, setImportJson] = useState("");
    const [importCollection, setImportCollection] = useState<Collection>("courses");
    const [adminUser, setAdminUser] = useState("Admin");
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/admin/login");
            } else {
                setAdminUser(user.email || "Admin");
                setAuthChecked(true);
            }
        });
        return unsub;
    }, [navigate]);

    const loadData = useCallback(async () => {
        try {
            const [regs, ...colData] = await Promise.all([
                getCollection("registrations"),
                ...CONTENT_COLLECTIONS.map((col) => getCollection(col)),
            ]);

            const newData: Record<string, any[]> = {};
            CONTENT_COLLECTIONS.forEach((col, i) => { newData[col] = colData[i]; });
            setData(newData);
            setRegistrations(regs as Registration[]);
        } catch (err: any) {
            toast.error(err.message || "Failed to load data from Firebase.");
        }
    }, []);

    useEffect(() => {
        if (authChecked) loadData();
    }, [authChecked, loadData]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/admin/login");
    };

    const handleAdd = async () => {
        if (tab === "registrations" || tab === "home" || tab === "import") return;
        const filled = Object.values(newItem).filter(Boolean);
        if (filled.length === 0) { toast.error("Please fill in at least one field."); return; }

        const processedItem: Record<string, unknown> = { ...newItem };
        if (tab === "courses" && typeof processedItem.modules === "string") {
            try { processedItem.modules = JSON.parse(processedItem.modules); } catch { /* keep as string */ }
        }

        try {
            await addItem(tab as Collection, processedItem);
            toast.success("Item added!");
            setNewItem({});
            await loadData();
        } catch (err: any) {
            toast.error(err.message || "Failed to add item.");
        }
    };

    const handleDelete = async (id: string) => {
        if (tab === "registrations" || tab === "home" || tab === "import") return;
        if (!confirm("Delete this item? This cannot be undone.")) return;
        try {
            await deleteItem(tab as Collection, id);
            toast.success("Deleted.");
            await loadData();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete item.");
        }
    };

    const handleEditSave = async (id: string) => {
        if (tab === "registrations" || tab === "home" || tab === "import") return;
        try {
            await updateItem(tab as Collection, id, editValues);
            toast.success("Updated.");
            setEditingId(null);
            await loadData();
        } catch (err: any) {
            toast.error(err.message || "Failed to update item.");
        }
    };

    const handleImport = async () => {
        let parsed: object[];
        try { parsed = JSON.parse(importJson); }
        catch { toast.error("Invalid JSON."); return; }
        if (!Array.isArray(parsed)) { toast.error("JSON must be an array."); return; }
        try {
            for (const item of parsed) await addItem(importCollection, item as Record<string, unknown>);
            toast.success(`Imported ${parsed.length} item(s) into ${importCollection}.`);
            setImportJson("");
            await loadData();
        } catch (err: any) {
            toast.error(err.message || "Import failed.");
        }
    };

    const currentItems = (tab !== "home" && tab !== "registrations" && tab !== "import")
        ? (data[tab] as any[] || [])
        : [];

    const addEntryFields = defaultFieldsForTab[tab as string] || ["title", "description"];

    if (!authChecked) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <motion.aside
                animate={{ width: sidebarOpen ? 260 : 72 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className="fixed top-0 left-0 h-full bg-card border-r border-border/60 flex flex-col z-40 overflow-hidden"
            >
                <div className="flex items-center gap-3 p-5 border-b border-border/60">
                    <ShieldCheck className="text-primary shrink-0" size={32} />
                    {sidebarOpen && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-lg font-bold gradient-text whitespace-nowrap">
                            Fironix CMS
                        </motion.span>
                    )}
                </div>
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

            {/* Main */}
            <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-[260px]" : "ml-[72px]"} p-8`}>
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground">
                            {tab === "home" ? `Welcome, ${adminUser}` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">Fironix Admin — Firebase CMS</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={loadData} className="gap-2 rounded-xl">
                        <RefreshCw size={14} /> Refresh
                    </Button>
                </div>

                {/* HOME */}
                {tab === "home" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <StatsCard label="Courses" count={data.courses?.length || 0} icon={BookOpen} color="bg-primary/10" />
                        <StatsCard label="Internships" count={data.internships?.length || 0} icon={Briefcase} color="bg-blue-500/10" />
                        <StatsCard label="Projects" count={data.projects?.length || 0} icon={FolderOpen} color="bg-green-500/10" />
                        <StatsCard label="Services" count={data.services?.length || 0} icon={Settings} color="bg-purple-500/10" />
                        <StatsCard label="Team" count={data.team?.length || 0} icon={Users} color="bg-orange-500/10" />
                        <StatsCard label="Workshops" count={data.workshops?.length || 0} icon={ClipboardList} color="bg-amber-500/10" />
                        <StatsCard label="Registrations" count={registrations.length} icon={ClipboardList} color="bg-accent/10" />
                    </div>
                )}

                {/* REGISTRATIONS */}
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
                                            <td className="px-5 py-3 text-muted-foreground">{reg.phone || "-"}</td>
                                            <td className="px-5 py-3"><span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs border border-primary/20">{reg.type}</span></td>
                                            <td className="px-5 py-3">{reg.selection}</td>
                                            <td className="px-5 py-3 text-muted-foreground">
                                                {reg._createdAt?.toDate ? reg._createdAt.toDate().toLocaleDateString() : "—"}
                                            </td>
                                            <td className="px-5 py-3"><span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full text-xs border border-green-500/20">{reg.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* CODE IMPORT */}
                {tab === "import" && (
                    <div className="glass-panel border-glow rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Code2 size={20} className="text-primary" />
                            <h2 className="font-bold text-xl text-foreground">Bulk JSON Import</h2>
                        </div>
                        <p className="text-muted-foreground text-sm mb-6">
                            Paste a JSON array of objects. Each object will be added to the selected Firestore collection.<br />
                            Example: <code className="bg-secondary/50 px-2 py-0.5 rounded text-xs font-mono">{`[{"title":"Web Dev","description":"..."}]`}</code>
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">Target Collection</label>
                                <select value={importCollection} onChange={e => setImportCollection(e.target.value as Collection)}
                                    className="glass-panel border border-border/60 rounded-xl px-4 py-2.5 text-sm bg-card text-foreground w-full md:w-auto min-w-[200px]">
                                    {CONTENT_COLLECTIONS.map(c => (
                                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">JSON Data</label>
                                <textarea value={importJson} onChange={e => setImportJson(e.target.value)} rows={12}
                                    className="w-full glass-panel border border-border/50 rounded-xl p-4 text-sm font-mono bg-card text-foreground resize-y focus:border-primary/60 outline-none transition-colors"
                                    placeholder={`[\n  {"title": "Course Name", "description": "..."}\n]`}
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={handleImport} className="box-glow rounded-xl gap-2"><Plus size={16} /> Import Data</Button>
                                <Button variant="outline" onClick={() => setImportJson("")} className="rounded-xl">Clear</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* COLLECTION TABS */}
                {tab !== "home" && tab !== "registrations" && tab !== "import" && (
                    <div className="space-y-6">
                        <div className="glass-panel border-glow rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-5 flex items-center gap-2"><Plus size={18} className="text-primary" /> Add New Entry</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {addEntryFields.map(k => (
                                    <div key={k}>
                                        <label className="block text-xs font-semibold text-muted-foreground mb-1 capitalize">{k.replace("_", " ")}</label>
                                        <Input value={newItem[k] || ""} onChange={e => setNewItem(prev => ({ ...prev, [k]: e.target.value }))}
                                            placeholder={k.charAt(0).toUpperCase() + k.slice(1).replace("_", " ")}
                                            className="glass-panel border-border/50 h-10" />
                                    </div>
                                ))}
                                <div className="flex items-end">
                                    <Button onClick={handleAdd} className="box-glow w-full gap-2 rounded-xl"><Plus size={16} /> Add Entry</Button>
                                </div>
                            </div>
                        </div>

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
                                                    {Object.keys(item).filter(k => k !== "id" && !k.startsWith("_")).map(k => (
                                                        <Input key={k}
                                                            value={editValues[k] ?? (typeof item[k] === "object" ? JSON.stringify(item[k]) : item[k])}
                                                            onChange={e => setEditValues(prev => ({ ...prev, [k]: e.target.value }))}
                                                            className="glass-panel border-border/50 h-9" placeholder={k} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
                                                    {Object.entries(item).filter(([k]) => k !== "id" && !k.startsWith("_")).map(([k, v]) => (
                                                        <div key={k}>
                                                            <span className="text-xs text-muted-foreground capitalize">{k}: </span>
                                                            <span className="text-sm text-foreground font-medium">{typeof v === "object" ? "[Complex]" : String(v)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex gap-2 shrink-0">
                                                {editingId === item.id ? (
                                                    <>
                                                        <Button size="icon" variant="ghost" className="rounded-xl w-8 h-8 hover:text-green-400" onClick={() => handleEditSave(item.id)}><Check size={15} /></Button>
                                                        <Button size="icon" variant="ghost" className="rounded-xl w-8 h-8" onClick={() => setEditingId(null)}><X size={15} /></Button>
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
