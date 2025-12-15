"use client";

import { motion } from "framer-motion";

const particlesData = Array.from({ length: 10 }).map((_, i) => {
  const t = (i / 10) * Math.PI * 2;
  return {
    id: i,
    xSeed: Math.cos(t) * (120 + (i % 3) * 40),
    ySeed: Math.sin(t) * (40 + (i % 4) * 30),
    delay: (i % 5) * 0.3,
    duration: 8 + (i % 4) * 1.3,
    size: 6 - (i % 3),
  };
});

export default function Particles() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-36 -translate-x-1/2 w-full pointer-events-none"
    >
      <div className="relative h-40 w-full">
        {particlesData.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.8, 0.15], y: [0, -6, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
            style={{
              left: `calc(50% + ${p.xSeed}px)`,
              top: `${p.ySeed}px`,
              position: "absolute",
            }}
          >
            <div
              className="rounded-full shadow-[0_0_12px_rgba(6,182,212,0.14)]"
              style={{
                width: p.size,
                height: p.size,
                background: "rgba(6,182,212,0.9)",
                filter: "blur(6px)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
