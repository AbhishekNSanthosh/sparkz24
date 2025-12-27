"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const accentGradient =
  "bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/25 to-amber-400/25";

const eventPoints = [
  {
    title: "Epic Performances",
    body: "Showcase your band's talent in a high-energy competition with live audiences and professional judging.",
  },
  {
    title: "Lucrative Prizes",
    body: "Compete for ₹30,000 (1st), ₹20,000 (2nd), and ₹10,000 (3rd) – plus certificates and glory!",
  },
  {
    title: "Easy Registration",
    body: "Teams of 6-10 members: Just ₹1,000 fee. Date: 20 January 2026. Register now!",
  },
];

const chiefGuestImage = "/manjari.png"; // Replace with actual image path/URL

export default function BandCompetition() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section
      id="band-competition"
      className="relative isolate overflow-hidden bg-[#04050b] pt-10 pb-20 text-white sm:py-24"
    >
      {/* TOP = PURE BLACK (no glow at the very top) */}
      {mounted && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#04050b] via-transparent to-transparent h-64" />

          {/* GLOW STARTS LOWER & FLOWS DOWN — seamless from previous sections */}
          <div className="pointer-events-none absolute left-[-10%] top-[10%] h-96 w-96 rounded-full bg-indigo-600/25 blur-[140px]" />
          <div className="hidden sm:block pointer-events-none absolute right-[-5%] top-[15%] h-96 w-96 rounded-full bg-fuchsia-500/25 blur-[150px]" />
          <div className="hidden sm:block pointer-events-none absolute inset-x-0 top-[20%] h-full bg-linear-to-b from-indigo-600/12 via-fuchsia-500/10 to-amber-400/8 blur-3xl opacity-70" />

          {/* Stylish Patterns: Enhanced with musical motifs */}
          <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.15),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.12),transparent_40%)]" />
          <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_transparent_1px)] bg-size-[140px_140px] opacity-20" />
          <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.08),transparent_40%),linear-gradient(240deg,rgba(236,72,153,0.08),transparent_35%)] opacity-60" />

          {/* Circuit overlay with wave patterns for music theme */}
          <div className="hidden sm:block pointer-events-none absolute inset-0 mix-blend-screen opacity-25">
            <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(135deg,rgba(94,234,212,0.08)_1px,transparent_1px),linear-gradient(45deg,rgba(251,191,36,0.1)_2px,transparent_2px)] bg-size-[180px_180px,180px_180px,220px_220px,100px_100px]" />
          </div>

          {/* Floating chips — music note inspired */}
          {[
            { className: "right-[12%] top-[20%] h-10 w-10", color: "fuchsia" },
            {
              className: "left-1/2 top-[55%] -translate-x-1/2 h-12 w-12",
              color: "amber",
            },
            { className: "left-[10%] top-[70%] h-8 w-8", color: "indigo" },
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
      <div className="relative z-10 px-[5vw]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:w-2/5 lg:space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-bold uppercase tracking-widest backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                ABHERI - <span className="text-[9px]">Music Band Competition</span>
              </div>

              <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Rock the Stage
                <br />
                <span className="bg-linear-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                  with ABHERI
                </span>
              </h2>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="space-y-6 lg:w-3/5 lg:space-y-8"
            >
              {/* Chief Guest Photo */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
                <div
                  className={`px-6 py-4 ${accentGradient} border-b border-white/10`}
                >
                  <div className="text-sm font-bold uppercase tracking-widest text-white/80">
                    Chief Guest Spotlight
                  </div>
                </div>
                <div className="relative p-6">
                  <motion.div
                    className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={chiefGuestImage}
                      alt="Manjari, renowned playback singer, composer, and Hindustani classical & ghazal vocalist"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="relative z-10">
                        <h3 className="text-white text-xl font-bold mb-1 leading-tight">
                          Manjari
                        </h3>
                        <p className="text-indigo-200/90 text-sm font-medium leading-relaxed bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                          Playback Singer | Composer | Hindustani Classical &
                          Ghazal Vocalist
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Event Details Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
                <div
                  className={`px-6 py-4 ${accentGradient} border-b border-white/10`}
                >
                  <div className="text-sm font-bold uppercase tracking-widest text-white/80">
                    Competition Highlights
                  </div>
                </div>
                <div className="divide-y divide-white/10">
                  {eventPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-5 p-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 font-bold text-sm">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold leading-6">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-white/70 leading-relaxed">
                          {point.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View More Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center pt-2"
              >
                <a
                  href="https://sparkz.carmelcet.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/15 to-amber-400/20 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white/90 backdrop-blur hover:border-white/30 hover:bg-white/5 transition-all duration-300 w-full lg:w-auto"
                >
                  View More & Register
                  <span className="text-xs">→</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
