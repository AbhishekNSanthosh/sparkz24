"use client";

import Image, { ImageLoaderProps } from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Particles from "@/widgets/common/Particles";

import { events as eventsData, departments } from "@/utils/constants/Constants";

const loader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 50}`; // Default quality to 75 if not provided
};

export default function EventsPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const filteredEvents = useMemo(
    () =>
      eventsData.filter(
        (e) => selectedDept === "All" || e.department === selectedDept
      ),
    [selectedDept]
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#04050b] text-white min-h-screen py-20">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-72 w-72 rounded-full bg-indigo-600/18 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-fuchsia-500/14 blur-[130px] animate-[pulse_10s_ease-in-out_infinite]"
      />

      {/* Gentle grid for 'circuit' texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-12"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:140px_140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.header
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              Sparkz Events
            </span>
          </h1>

          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Choose your battlefield, learn something new, and compete for glory
            — curated challenges across all departments.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {departments.map((dept) => {
              const active = selectedDept === dept;
              return (
                <motion.button
                  key={dept}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/30 ${
                    active
                      ? "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 text-white shadow-lg"
                      : "border border-white/12 bg-white/[0.04] text-white/80 hover:bg-white/[0.06]"
                  }`}
                >
                  {dept === "All" ? "All Events" : dept}
                </motion.button>
              );
            })}
          </div>
        </motion.header>

        {/* Events grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.28,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.03,
                }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link
                  href={`/events/${event.id}`}
                  className="block rounded-2xl max-w-[360px] border border-white/10 bg-black/40 backdrop-blur transition-all duration-300hover:border-fuchsia-400/40 hover:shadow-lg hover:shadow-fuchsia-500/15"
                >
                  {/* Poster frame */}
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      loader={loader}
                      fill
                      className="object-contain transition-transform duration-500"
                      priority={false}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Decorative particles near header (subtle, not full-screen) */}
        <Particles />

        {/* small footer of the section */}
        <div className="mt-12 border-t border-white/8 pt-6 text-center text-sm text-white/50">
          <p>
            Can&apos;t find an event? Contact the tech team — we&apos;re happy
            to help.
          </p>
        </div>
      </div>
    </section>
  );
}
