import { FormEvent, useEffect, useRef, useState } from "react";
import { Instagram, Linkedin, Mail, Phone, Send, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_LINK, SOCIAL_LINKS } from "@/lib/site";
import { z } from "zod";

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
    submitTimerRef.current = setTimeout(() => {
      toast({ title: "Message sent!", description: "We will get back to you soon." });
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
      submitTimerRef.current = null;
    }, 600);
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="section-shell p-8 md:p-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
            <p className="text-muted-foreground">Have a question? We would love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 space-y-5">
              <Input
                required
                autoComplete="name"
                aria-label="Your Name"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-card/60 border-border focus:border-primary"
              />
              <Input
                required
                type="email"
                autoComplete="email"
                aria-label="Your Email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-card/60 border-border focus:border-primary"
              />
              <Textarea
                required
                rows={5}
                aria-label="Your Message"
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-card/60 border-border focus:border-primary"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full box-glow transition-transform duration-300 hover:-translate-y-1"
              >
                {loading ? "Sending..." : "Send Message"} <Send className="ml-2" size={16} />
              </Button>
            </form>

            <div className="space-y-5">
              <div className="interactive-card glass-panel rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a className="text-foreground hover:text-primary transition-colors" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="interactive-card glass-panel rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a className="text-foreground hover:text-primary transition-colors" href={`tel:${CONTACT_PHONE_LINK}`}>
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-5">
                <p className="text-sm text-muted-foreground mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((socialLink) => {
                    const Icon = socialIconByName[socialLink.name];
                    return (
                      <a
                        key={socialLink.name}
                        href={socialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={socialLink.name}
                        className="interactive-card p-3 rounded-xl border border-border bg-card/40 text-muted-foreground transition-all hover:text-primary hover:border-primary/40"
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
