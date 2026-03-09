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

const BOT_RESPONSES: Record<string, string> = {
    "courses": "We offer premium courses in MERN Stack, Cyber Security, AI/ML, Data Analytics, and more! You can view them all on our /courses page.",
    "register": "You can register for any course, workshop, or internship via our /register page. Just pick your interest and fill in your details!",
    "internships": "Fironix provides hands-on internships in Software Development, UI/UX Design, Marketing, and Data Science. Check the /internship page for details.",
    "contact": "You can reach us at ashwini@fironix.in or visit our /contact page to send a direct message.",
    "default": "I'm not sure I understand. Feel free to ask about our courses, internships, or registration process!",
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
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

        // Simulate bot response
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let responseText = BOT_RESPONSES.default;

            if (lowerText.includes("course")) responseText = BOT_RESPONSES.courses;
            else if (lowerText.includes("register")) responseText = BOT_RESPONSES.register;
            else if (lowerText.includes("internship")) responseText = BOT_RESPONSES.internships;
            else if (lowerText.includes("contact") || lowerText.includes("support")) responseText = BOT_RESPONSES.contact;

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
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
                        {messages.length < 4 && !isTyping && (
                            <div className="px-5 pb-2 flex flex-wrap gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSend(s)}
                                        className="text-[11px] bg-secondary/50 hover:bg-primary/20 border border-border/40 hover:border-primary/40 px-3 py-1.5 rounded-full transition-all text-muted-foreground hover:text-primary"
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
