"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Event {
  id: string;
  title: string;
  image: string;
  description?: string; // Optional for future hover tooltips
}

const SWIPE_THRESHOLD = 30;

export default function FeaturedEvents({ events }: { events: Event[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = events.length;
  const getIndex = useCallback((i: number) => (i + total) % total, [total]);
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    amount: 0.1, // at least 10% visible
    margin: "-80px",
  });

  const shouldPause = paused || !isInView;

  useEffect(() => {
    if (shouldPause) return;

    const interval = setInterval(() => {
      setActive((i) => getIndex(i + 1));
    }, 3250);

    return () => clearInterval(interval);
  }, [getIndex, shouldPause, total]);

  const visibleEvents = [
    events[getIndex(active - 1)],
    events[getIndex(active)],
    events[getIndex(active + 1)],
  ];

  const handleSwipe = (offsetX: number) => {
    if (offsetX > SWIPE_THRESHOLD) {
      setActive((i) => getIndex(i - 1)); // swipe right
    } else if (offsetX < -SWIPE_THRESHOLD) {
      setActive((i) => getIndex(i + 1)); // swipe left
    }
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#04050b] py-10 sm:py-15 "
      ref={sectionRef}
    >
      {/* Matching Hero ambient effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-indigo-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[150px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(79,70,229,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[100px_100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 sm:mb-28 text-center text-4xl font-bold leading-tight sm:text-5xl"
        >
          Featured{" "}
          <span className="bg-linear-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent animate-[pulse_6s_ease-in-out_infinite]">
            Events
          </span>
        </motion.h2>

        <div className="relative flex items-center justify-center gap-12">
          <AnimatePresence initial={false}>
            {visibleEvents.map((event, idx) => {
              const isCenter = idx === 1;
              return (
                <motion.div
                  key={event.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, info) => {
                    handleSwipe(info.offset.x);
                    setPaused(true);
                    setTimeout(() => setPaused(false), 100);
                  }}
                  whileTap={{ scale: 0.97 }}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.5,
                    scale: isCenter ? 1.05 : 0.85,
                    y: isCenter ? -35 : 0,
                    rotate: isCenter ? 0 : idx === 0 ? -8 : 8,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative ${isCenter ? "z-30" : "z-10"}`}
                  whileHover={isCenter ? { scale: 1.08, y: -30 } : {}}
                  onMouseEnter={() => isCenter && setPaused(true)}
                  onMouseLeave={() => isCenter && setPaused(false)}
                  onFocus={() => isCenter && setPaused(true)}
                  onBlur={() => isCenter && setPaused(false)}
                >
                  <Link href={`/events/${event.id}`} className="group">
                    <div
                      className={`relative aspect-4/5 w-70 overflow-hidden rounded-3xl border
                        ${
                          isCenter
                            ? "border-fuchsia-400/40 group-hover:scale-105 shadow-2xl shadow-fuchsia-500/30"
                            : "border-white/10"
                        }
                         transition-all duration-500`}
                    >
                      {/* Inner glow */}
                      <div className="absolute inset-0" />
                      <Image
                        src={event.image}
                        alt={event.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 3}
                        fill
                        className="object-contain transition-transform duration-700"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Glowing nav buttons */}
          <button
            onClick={() => setActive((i) => getIndex(i - 1))}
            className="absolute left-4 z-40 rounded-full bg-white/5 p-4 backdrop-blur hover:bg-white/10 hover:scale-110 transition"
          >
            <span className="text-4xl text-white/80">‹</span>
          </button>
          <button
            onClick={() => setActive((i) => getIndex(i + 1))}
            className="absolute right-4 z-40 rounded-full bg-white/5 p-4 backdrop-blur hover:bg-white/10 hover:scale-110 transition"
          >
            <span className="text-4xl text-white/80">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
