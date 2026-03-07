const team = [
  { name: "Aswini B", role: "CEO & Director", image: "/team-photo.jpeg" },
  { name: "Nahul Prannav S", role: "Co-Founder", image: "/team-photo-n.jpeg" },
] as const;

export default function TeamSection() {
  return (
    <section id="team" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="section-shell p-8 md:p-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gradient-text">Leadership Team</h2>
            <p className="text-muted-foreground">The minds driving Fironix forward.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member) => (
              <div key={member.name} className="interactive-card glass-panel group w-64 text-center p-6 rounded-2xl">
                <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-500 box-glow">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="font-display text-3xl text-primary font-bold">
                        {member.name
                          .split(" ")
                          .map((namePart) => namePart[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
