import { FormEvent, useEffect, useRef, useState } from "react";
import { Instagram, Linkedin, Mail, Phone, Send, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_LINK, SOCIAL_LINKS } from "@/lib/site";
import { z } from "zod";
import { motion, Variants } from "framer-motion";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const socialIconByName = {
  LinkedIn: Linkedin,
  Twitter,
  Instagram,
} as const;

export default function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Error", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }

    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
    }

    setLoading(true);

    // Construct mailto link
    const subject = encodeURIComponent(`Contact Request from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:ashwini@fironix.in?subject=${subject}&body=${body}`;

    submitTimerRef.current = setTimeout(() => {
      toast({ title: "Message prepared!", description: "Your email client has been opened." });
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
      submitTimerRef.current = null;
    }, 600);
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="section-shell p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">Have a question? We would love to hear from you.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 border-glow">
              <div className="space-y-4">
                <Input
                  required
                  autoComplete="name"
                  aria-label="Your Name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all h-12"
                />
                <Input
                  required
                  type="email"
                  autoComplete="email"
                  aria-label="Your Email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all h-12"
                />
                <Textarea
                  required
                  rows={5}
                  aria-label="Your Message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full box-glow hover:box-glow-accent transition-all duration-300 hover:-translate-y-1 h-12 text-base font-semibold"
              >
                {loading ? "Sending..." : "Send Message"} <Send className="ml-2" size={18} />
              </Button>
            </motion.form>

            <motion.div variants={fadeUp} className="space-y-6">
              <div className="interactive-card glass-panel rounded-xl p-6 flex items-center gap-5 group">
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-[0_0_15px_hsl(187_80%_50%_/_0.2)]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <a className="text-foreground font-semibold hover:text-primary transition-colors text-lg" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="interactive-card glass-panel rounded-xl p-6 flex items-center gap-5 group">
                <div className="p-4 rounded-xl bg-accent/10 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-[0_0_15px_hsl(40_90%_55%_/_0.2)]">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                  <a className="text-foreground font-semibold hover:text-accent transition-colors text-lg" href={`tel:${CONTACT_PHONE_LINK}`}>
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((socialLink) => {
                    const Icon = socialIconByName[socialLink.name];
                    return (
                      <a
                        key={socialLink.name}
                        href={socialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={socialLink.name}
                        className="interactive-card p-3 rounded-xl border border-border/50 bg-background/50 text-muted-foreground transition-all hover:text-primary hover:border-primary/50 hover:bg-primary/10"
                      >
                        <Icon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
