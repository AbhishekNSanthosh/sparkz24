"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const accentGradient =
  "bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/25 to-amber-400/25";

const aboutPoints = [
  {
    title: "Skill Development & Application",
    body: "Hands-on workshops and competitions turn theory into practice, building technical, organizational, and soft skills.",
  },
  {
    title: "Fostering Innovation",
    body: "Students innovate, prototype, and showcase visionary ideas in this incubator for future-ready talent.",
  },
  {
    title: "Networking & Exposure",
    body: "Home to a national techfest that builds prestige, creates invaluable networking, and exposes participants to the forefront of technology.",
  },
];

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#04050b] py-20 text-white sm:py-24"
    >
      {/* TOP = PURE BLACK (no glow at the very top) */}
      {mounted && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#04050b] via-transparent to-transparent h-64" />

          {/* GLOW STARTS LOWER & FLOWS DOWN — seamless from Hero */}
          <div className="pointer-events-none absolute left-[-10%] top-[10%] h-96 w-96 rounded-full bg-indigo-600/25 blur-[140px]" />
          <div className="hidden sm:block pointer-events-none absolute right-[-5%] top-[15%] h-96 w-96 rounded-full bg-fuchsia-500/25 blur-[150px]" />
          <div className="hidden sm:block pointer-events-none absolute inset-x-0 top-[20%] h-full bg-gradient-to-b from-indigo-600/12 via-fuchsia-500/10 to-amber-400/8 blur-3xl opacity-70" />

          {/* Rest of ambient effects (grid, circuits, etc.) */}
          <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.15),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.12),transparent_40%)]" />
          <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_transparent_1px)] bg-[size:140px_140px] opacity-20" />
          <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.08),transparent_40%),linear-gradient(240deg,rgba(236,72,153,0.08),transparent_35%)] opacity-60" />

          {/* Circuit overlay */}
          <div className="hidden sm:block pointer-events-none absolute inset-0 mix-blend-screen opacity-25">
            <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(135deg,rgba(94,234,212,0.08)_1px,transparent_1px)] bg-[size:180px_180px,180px_180px,220px_220px]" />
          </div>

          {/* Floating chips — now spread smoothly */}
          {[
            { className: "right-[12%] top-[20%] h-10 w-10", color: "fuchsia" },
            {
              className: "left-1/2 top-[55%] -translate-x-1/2 h-12 w-12",
              color: "amber",
            },
          ].map((chip, i) => (
            <motion.div
              key={i}
              className={`pointer-events-none absolute ${chip.className} rounded-xl border border-${chip.color}-300/50 bg-${chip.color}-400/15 blur-[1px]`}
              animate={{ y: [-10, 15, -10], rotate: [-8, 8, -8] }}
              transition={{
                duration: 7 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:w-2/5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-bold uppercase tracking-widest backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              About Sparkz
            </div>

            <h2 className="text-4xl font-black pt-5 sm:py-10 leading-tight sm:text-5xl lg:text-6xl">
              Ignite the
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                spark within you
              </span>
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-8 lg:w-3/5"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
              <div
                className={`px-6 py-4 ${accentGradient} border-b border-white/10`}
              >
                <div className="text-sm font-bold uppercase tracking-widest text-white/80">
                  Why is &quot;Sparkz&quot; Essential?
                </div>
              </div>
              <div className="divide-y divide-white/10">
                {aboutPoints.map((point, i) => (
                  <div key={i} className="flex gap-5 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{point.title}</h3>
                      <p className="mt-1 text-white/70">{point.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
