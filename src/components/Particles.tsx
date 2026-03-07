import { useMemo } from "react";

type ParticleConfig = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
};

export default function Particles({ count = 30 }: { count?: number }) {
  const particles = useMemo<ParticleConfig[]>(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${11 + Math.random() * 18}s`,
        size: `${1.5 + Math.random() * 3.5}px`,
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            bottom: "-10px",
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
