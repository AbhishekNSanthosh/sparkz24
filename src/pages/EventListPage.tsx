"use client";

import Image, { ImageLoaderProps } from "next/image";
import { Suspense, useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Particles from "@/widgets/common/Particles";
import GradientBackground from "@/components/ui/GradientBackground";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { departments } from "@/utils/constants/Constants";
import { Event } from "@/utils/types/event";

const loader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 50}`; // Default quality to 75 if not provided
};

// ... (rest of imports)

export default function EventsPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            if (!querySnapshot.empty) {
                const eventsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Event[];
                setEvents(eventsList);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setEvents([]); 
        } finally {
            setLoading(false);
        }
    };
    
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
      let data = events;
      // If DB is empty and loading is done, maybe we fallback to defaults?
      // No, sticking to DB source of truth is cleaner. The admin must Seed.
      // However, to avoid "breaking" the site for the user right now, I will start with defaultEvents as initial state?
      // No, empty state is better to verify it works.
      
      if (selectedDept !== "All") {
          data = data.filter((event) => event.department === selectedDept);
      }
      return data;
  }, [events, selectedDept]);

  return (
    <section className="relative isolate overflow-hidden bg-[#04050b] text-white min-h-screen py-10">
      <GradientBackground />

      <div className="relative mx-auto max-w-348 px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="bg-linear-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
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
                      ? "bg-linear-to-r from-indigo-500 via-fuchsia-500 to-amber-400 text-white shadow-lg"
                      : "border border-white/12 bg-white/4 text-white/80 hover:bg-white/6"
                  }`}
                >
                  {dept === "All" ? "All Events" : dept}
                </motion.button>
              );
            })}
          </div>
        </motion.header>

        {/* Events grid */}
        <Suspense
          fallback={<div className="h-8 w-full bg-white/10 rounded-lg"></div>}
        >
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
                    className="block rounded-2xl max-w-90 border border-white/10 bg-black/40 backdrop-blur transition-all duration-300hover:border-fuchsia-400/40 hover:shadow-lg hover:shadow-fuchsia-500/15"
                  >
                    {/* Poster frame */}
                    <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-black">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        loader={loader}
                        fill
                        sizes="(100vw - 2rem) / 3 * 100vw / 100vw"
                        quality={75}
                        className="object-contain  rounded-2xl transition-transform duration-500"
                        priority={idx < 3}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Suspense>

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
