"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toastInfo } from "@/utils/common/Toast";

const accentGradient =
  "bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/25 to-amber-400/25";

const rulesSections = [
  {
    title: "Eligibility",
    points: [
      "The competition is open to bonafide students of recognized colleges.",
      "Each band must consist of 6 to 10 members (minimum 2 vocals and 3 instruments).",
      "All participants must carry a valid college ID card.",
      "A participant may represent only one band in the competition.",
    ],
  },
  {
    title: "Performance Rules",
    points: [
      "Each band will be allotted 30 minutes (10-15 mins for performance), including setup and sound check.",
      "Exceeding the time limit will result in negative marking.",
      "Bands may perform songs from any genre.",
      "Use of pre-recorded backing tracks is strictly prohibited.",
      "Lyrics and performances must not contain obscene, offensive, or politically provocative content.",
      "Performances may be in English or any Indian language.",
    ],
  },
  {
    title: "Instruments & Technical Requirements",
    points: [
      "Bands must bring their own musical instruments.",
      "The organizers will provide a standard PA system (2 stereo jacks & 3 mono jack cable on stage), microphones, and drum kit.",
      "Any special technical requirements must be informed during registration (like condenser microphones).",
      "The organizing committee will not be responsible for technical failures caused by personal equipment.",
    ],
  },
  {
    title: "Judging Criteria",
    points: [
      "Bands will be judged based on: Musical precision & rhythm, Originality & creativity, Coordination & harmony, Stage presence & audience engagement, Overall impact.",
      "The verdict of the judging panel is final and shall not be questioned under any circumstances.",
    ],
  },
  {
    title: "Prize Money",
    points: [
      "First Prize: ₹30,000",
      "Second Prize: ₹20,000",
      "Third Prize: ₹10,000",
      "All winners will receive certificates and trophies.",
    ],
  },
  {
    title: "Code of Conduct",
    points: [
      "Participants must maintain discipline and sportsmanship throughout the event.",
      "Any form of misconduct, substance use, or violation of campus rules will result in immediate disqualification.",
      "Any damage to the venue or equipment will be the responsibility of the respective band.",
    ],
  },
  {
    title: "Registration & General Instructions",
    points: [
      "Bands must complete registration before the specified deadline.",
      "Reporting time will be announced; late reporting may lead to disqualification.",
      "The order of performance will be decided by draw of lots or organizer discretion.",
      "The organizing committee reserves the right to modify rules if necessary.",
      "Participation implies acceptance of all the above rules.",
    ],
  },
];

const chiefGuestImage = "/manjari.png"; // Replace with actual image path/URL

export default function AbheriPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#04050b] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-10 pb-20 sm:py-24">
        {mounted && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#04050b] via-transparent to-transparent h-64" />
            <div className="pointer-events-none absolute left-[-10%] top-[10%] h-96 w-96 rounded-full bg-indigo-600/25 blur-[140px]" />
            <div className="hidden sm:block pointer-events-none absolute right-[-5%] top-[15%] h-96 w-96 rounded-full bg-fuchsia-500/25 blur-[150px]" />
            <div className="hidden sm:block pointer-events-none absolute inset-x-0 top-[20%] h-full bg-linear-to-b from-indigo-600/12 via-fuchsia-500/10 to-amber-400/8 blur-3xl opacity-70" />
            <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.15),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.12),transparent_40%)]" />
            <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_transparent_1px)] bg-size-[140px_140px] opacity-20" />
            <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.08),transparent_40%),linear-gradient(240deg,rgba(236,72,153,0.08),transparent_35%)] opacity-60" />
            <div className="hidden sm:block pointer-events-none absolute inset-0 mix-blend-screen opacity-25">
              <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(135deg,rgba(94,234,212,0.08)_1px,transparent_1px),linear-gradient(45deg,rgba(251,191,36,0.1)_2px,transparent_2px)] bg-size-[180px_180px,180px_180px,220px_220px,100px_100px]" />
            </div>
            {[
              {
                className: "right-[12%] top-[20%] h-10 w-10",
                color: "fuchsia",
              },
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
        <div className="relative z-10 px-[5vw]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-bold uppercase tracking-widest backdrop-blur mx-auto">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Inter-College Band Competition
              </div>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  ABHERI
                </span>
                <br />
                Rock the Stage on 20 Jan 2026
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Unleash your band's energy at Sparkz '26 – Prizes up to ₹30,000
                | Teams of 6-10 | Reg: ₹1,000
              </p>
              <Link
                href=""
                // target="_blank"
                onClick={() => {
                  toastInfo("Registrations opening soon. Stay tuned!");
                }}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/15 to-amber-400/20 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white/90 backdrop-blur hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                Register Now
                <span className="text-xs">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chief Guest Section */}
      <section className="relative isolate overflow-hidden py-20 bg-[#04050b]/80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        {mounted && (
          <>
            <div className="pointer-events-none absolute left-[-5%] top-[-20%] h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[200px]" />
            <div className="hidden sm:block pointer-events-none absolute right-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-amber-400/15 blur-[150px]" />
          </>
        )}
        <div className="relative z-10 px-[5vw]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-bold uppercase tracking-widest backdrop-blur mx-auto">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Chief Guest
              </div>
              <h2 className="text-3xl font-black sm:text-4xl">
                Spotlight on <span className="text-orange-400">Manjari</span>
              </h2>
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl">
                <Image
                  src={chiefGuestImage}
                  alt="Manjari, renowned playback singer, composer, and Hindustani classical & ghazal vocalist"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="relative z-10">
                    <h3 className="text-white text-xl font-bold mb-1 leading-tight">
                      Manjari
                    </h3>
                    <p className="text-indigo-200/90 text-sm font-medium leading-relaxed bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                      Playback Singer | Composer | Hindustani Classical & Ghazal
                      Vocalist
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="relative py-20">
        {mounted && (
          <>
            <div className="pointer-events-none absolute left-[-10%] top-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />
            <div className="hidden sm:block pointer-events-none absolute right-[-5%] bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[100px]" />
          </>
        )}
        <div className="relative z-10 px-[5vw]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8 mb-16"
            >
              <h2 className="text-3xl font-black sm:text-4xl">
                Rules & Regulations
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Know the guidelines to rock the stage without a hitch.
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rulesSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden"
                >
                  <div
                    className={`px-6 py-4 ${accentGradient} border-b border-white/10`}
                  >
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/80">
                      {section.title}
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {section.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs mt-0.5">
                          {pIdx + 1}
                        </div>
                        <p className="text-white/80 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts & CTA Section */}
      <section className="relative py-20 bg-[#04050b]/80">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {mounted && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.1),transparent_50%)]" />
          </>
        )}
        <div className="relative z-10 px-[5vw]">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <h2 className="text-3xl font-black sm:text-4xl">Ready to Jam?</h2>
              <p className="text-xl text-white/70">
                Reg fee: ₹1,000 per team (6-10 members). Date: 20 January 2026.
              </p>
              <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-orange-400">
                    Faculty Coordinator
                  </h3>
                  <p className="text-white/80">Ashin Sabu</p>
                  <p className="text-white/70 text-sm">+91 9487752512</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-orange-400">
                    Student Coordinator
                  </h3>
                  <p className="text-white/80">Jacs J Jacob</p>
                  <p className="text-white/70 text-sm">+91 8590204413</p>
                </div>
              </div>
              <Link
                href=""
                // target="_blank"
                 onClick={() => {
                  toastInfo("Registrations opening soon. Stay tuned!");
                }}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-orange-500/20 via-amber-400/15 to-orange-500/20 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white/90 backdrop-blur hover:border-white/30 hover:bg-white/5 transition-all duration-300 w-full md:w-auto"
              >
                Register Your Band
                <span className="text-xs">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
