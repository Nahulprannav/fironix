import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        text: "Hi there! 👋 Welcome to Fironix. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
    },
];

const SUGGESTIONS = [
    "Tell me about Courses",
    "How to register?",
    "Available Internships",
    "Contact Support",
];

const BOT_RESPONSES: Record<string, { text: string; suggestions?: string[] }> = {
    greeting: {
        text: "Hello! 👋 I'm your Fironix assistant. How can I help you today?",
        suggestions: ["Explore Courses", "Internship Opportunities", "Register Now"]
    },
    courses_general: {
        text: "Fironix specializes in Industry-Ready training! Our top programs include MERN Full Stack, Cyber Security (Ethical Hacking), AI/ML, and Data Analytics. Which one interests you?",
        suggestions: ["Course Fees?", "Syllabus details", "Placement Support"]
    },
    course_fees: {
        text: "Our course fees are highly competitive and include all study materials and certifications. Generally, professional tracks range from ₹15,000 to ₹35,000 depending on depth and duration. Would you like a detailed quote for a specific course?",
        suggestions: ["MERN Stack Fees", "Cyber Security Fees", "Scholarships?"]
    },
    course_syllabus: {
        text: "Each program follows a rigorous industry-vetted curriculum. For example, MERN covers everything from React to MongoDB, while Cyber Security includes Network Security and Penetration Testing. I can send you the full PDF syllabus!",
        suggestions: ["Get MERN Syllabus", "Get AI Syllabus", "Placement Support"]
    },
    placement: {
        text: "Fironix has a dedicated placement cell! We provide resume building, mock interviews, and direct referrals to our hiring partners. Over 90% of our students land jobs within 3-6 months. Ready to start your career?",
        suggestions: ["Recent Placements", "Hire from us", "Register Now"]
    },
    training_mode: {
        text: "We offer maximum flexibility! You can join our Interactive Online batches (from anywhere) or Classroom Offline batches at our Coimbatore center. Both modes include recorded sessions and 24/7 mentor support.",
        suggestions: ["Upcoming Batches", "Contact Support"]
    },
    register: {
        text: "Enrolling is easy! Go to /register, pick your course, and fill in the form. Once submitted, our counselor will call you within 24 hours to guide you through the next steps.",
        suggestions: ["View Registration Form", "Payment modes"]
    },
    internships: {
        text: "Our 'Hands-On Practical Internship' is a real-world experience program. You'll work on live projects, get mentored by experts, and receive an official certificate upon completion. It's perfect for portfolio building!",
        suggestions: ["Apply for Internship", "Internship FAQ"]
    },
    contact: {
        text: "Reach us via email at ashwini@fironix.in or call our hotline at +91 6382147517. You can also visit our Coimbatore office during business hours!",
        suggestions: ["Office location", "Email Support"]
    },
    thanks: {
        text: "You're very welcome! I'm glad I could help. Do you have any other questions about our programs?",
        suggestions: ["Browse Courses", "Our Services"]
    },
    farewell: {
        text: "Goodbye! Have a great day and feel free to reach out anytime you need assistance. ✨",
        suggestions: ["Start over"]
    },
    default: {
        text: "I want to be as helpful as possible! Could you please specify if you're asking about Course Fees, Syllabus, Placement, or how to Register?",
        suggestions: ["View All Courses", "Speak with Staff"]
    },
};

const INTENTS = [
    { key: "greeting", patterns: ["hi", "hello", "hey", "good morning", "restart", "start"] },
    { key: "course_fees", patterns: ["fee", "cost", "price", "how much", "amount", "payment"] },
    { key: "course_syllabus", patterns: ["syllabus", "curriculum", "what will i learn", "topics", "content", "learning path"] },
    { key: "placement", patterns: ["placement", "job", "career", "support", "hiring", "salary", "work", "recruit"] },
    { key: "training_mode", patterns: ["online", "offline", "hybrid", "mode", "classroom", "live", "center", "location"] },
    { key: "courses_general", patterns: ["course", "learn", "study", "training", "mern", "stack", "cyber", "ai", "ml", "python", "javascript", "program"] },
    { key: "register", patterns: ["register", "apply", "join", "enroll", "form", "admission", "how to", "process"] },
    { key: "internships", patterns: ["intern", "placement", "job", "career", "project", "hands-on", "certificate"] },
    { key: "contact", patterns: ["contact", "support", "help", "email", "phone", "address", "call", "office", "visit"] },
    { key: "thanks", patterns: ["thank", "thanks", "helpful", "great", "awesome", "perfect", "good"] },
    { key: "farewell", patterns: ["bye", "goodbye", "cya", "exit", "close", "see you"] },
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(SUGGESTIONS);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages(INITIAL_MESSAGES);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping]);

    const getResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        let matchedIntent = "default";

        // Find best match based on pattern density
        let maxPatterns = 0;
        for (const intent of INTENTS) {
            const matches = intent.patterns.filter(p => lowerText.includes(p)).length;
            if (matches > maxPatterns) {
                maxPatterns = matches;
                matchedIntent = intent.key;
            }
        }

        return BOT_RESPONSES[matchedIntent];
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Attempt to connect to local Ollama API for generative response
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3", 
                    prompt: `You are Fironix Assistant, a helpful AI for the technology company Fironix. Keep answers concise, friendly. The company provides web design, software development, data processing, and internships.\nUser: ${text}\nAssistant:`,
                    stream: false
                }),
            });

            if (!response.ok) throw new Error("Ollama API failed");

            const data = await response.json();
            
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response || "I'm having trouble thinking right now.",
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMsg]);
            setCurrentSuggestions(["Tell me about Courses", "Contact Support"]);
            setIsTyping(false);

        } catch (error) {
            // Fallback to static responses if Ollama is unavailable
            console.log("Falling back to static responses (Ollama not found/running)");
            setTimeout(() => {
                const response = getResponse(text);
                
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: response.text,
                    sender: "bot",
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, botMsg]);
                if (response.suggestions) {
                    setCurrentSuggestions(response.suggestions);
                }
                setIsTyping(false);
            }, 800);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="glass-panel border-glow w-[350px] sm:w-[400px] h-[500px] rounded-3xl mb-4 overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-5 flex items-center justify-between border-b border-primary/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">Fironix Support</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Online</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-primary/10">
                                <X size={20} />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.sender === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg"
                                            : "glass-panel border-border/40 text-foreground rounded-tl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="glass-panel border-border/40 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Suggestions */}
                        {currentSuggestions.length > 0 && !isTyping && (
                            <div className="px-5 pb-2 flex flex-wrap gap-2">
                                {currentSuggestions.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSend(s)}
                                        className="text-[11px] bg-secondary/50 hover:bg-primary/20 border border-border/40 hover:border-primary/40 px-3 py-1.5 rounded-full transition-all text-muted-foreground hover:text-primary whitespace-nowrap"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                            className="p-5 border-t border-border/40 flex gap-2 bg-background/50"
                        >
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="glass-panel h-11 border-border/60 focus:border-primary/60 rounded-xl"
                            />
                            <Button type="submit" size="icon" className="h-11 w-11 shrink-0 box-glow rounded-xl">
                                <Send size={18} />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center box-glow relative group border-2 border-primary-foreground/10"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-lg">
                        1
                    </span>
                )}
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none group-hover:block hidden" />
            </motion.button>
        </div>
    );
}
