import { BookOpen, Cpu, Eye, Globe, GraduationCap, Lightbulb, Shield, Target, Users, Zap } from "lucide-react";

const missions = [
  { icon: BookOpen, text: "Deliver innovative, reliable, and high-quality technology solutions" },
  { icon: Lightbulb, text: "Provide software development, web services, digital media, and IT consulting" },
  { icon: GraduationCap, text: "Help businesses grow through modern digital technologies" },
  { icon: Shield, text: "Support education and skill development in information technology" },
  { icon: Cpu, text: "Empower organizations through advanced technological solutions" },
] as const;

const values = [
  { icon: Zap, title: "Innovation", desc: "Constantly pushing boundaries with cutting-edge technology" },
  { icon: Users, title: "Collaboration", desc: "Working together to achieve exceptional results" },
  { icon: Globe, title: "Global Impact", desc: "Making a difference worldwide through technology" },
] as const;

export default function VisionMissionSection() {
  return (
    <>
      <section id="vision" className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="section-shell p-8 md:p-12 text-center">
            <Eye className="mx-auto mb-4 text-primary" size={40} />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 gradient-text">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed italic">
              "To become a leading global technology company that empowers businesses and individuals through
              innovative digital solutions, advanced IT services, and knowledge-driven education, shaping a smarter and
              more connected future."
            </p>
            <div className="mt-8 flex justify-center">
              <img src="/placeholder.svg" alt="Future Technology" className="w-24 h-24 opacity-30" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="section-shell p-8 md:p-10">
            <div className="text-center mb-12">
              <Target className="mx-auto mb-4 text-accent" size={40} />
              <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">Our Mission</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {missions.map((mission) => (
                <div key={mission.text} className="interactive-card glass-panel flex items-start gap-4 p-6 rounded-xl">
                  <mission.icon className="text-primary shrink-0 mt-1" size={24} />
                  <p className="text-foreground">{mission.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="section-shell p-8 md:p-10">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">Our Values</h2>
              <p className="text-muted-foreground mt-4">The principles that guide everything we do</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="interactive-card glass-panel text-center p-8 rounded-2xl">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-6">
                    <value.icon size={32} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-4 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                  <div className="mt-6">
                    <img src="/placeholder.svg" alt={value.title} className="w-16 h-16 mx-auto opacity-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
