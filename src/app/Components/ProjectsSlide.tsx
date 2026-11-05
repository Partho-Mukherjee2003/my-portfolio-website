"use client";

import { motion } from "framer-motion";
import GlowButton from "./GlowButton";

type Props = { isActive: boolean };

// Three fanned-out placeholder cards. Rotation is driven by Framer Motion.
const CARDS = [
  { position: "left-0 top-10 z-10", rotate: -8, delay: 0.1 },
  { position: "right-0 top-2 z-20", rotate: 6, delay: 0.25 },
  { position: "left-[16%] top-20 z-30", rotate: -1, delay: 0.4 },
];

/** A tiny browser-window placeholder to stand in for a project screenshot. */
function MockCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-[0_0_40px_rgba(59,130,246,0.3)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#D1D5DB]/30" />
        <span className="h-2 w-2 rounded-full bg-[#D1D5DB]/30" />
        <span className="h-2 w-2 rounded-full bg-[#D1D5DB]/30" />
      </div>
      <div className="space-y-2 p-3">
        <div className="h-16 rounded-lg bg-gradient-to-br from-[#3B82F6]/40 to-[#00E5FF]/30 sm:h-20" />
        <div className="h-2 w-3/4 rounded bg-[#D1D5DB]/25" />
        <div className="h-2 w-1/2 rounded bg-[#D1D5DB]/15" />
      </div>
    </div>
  );
}

export default function ProjectsSlide({ isActive }: Props) {
  return (
    <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      {/* ---------- Text ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="order-1 text-center lg:order-2 lg:text-left"
      >
        <h2 className="text-3xl font-bold tracking-tight text-[#F3F4F6] sm:text-4xl lg:text-5xl">
          Things I’ve built
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-[#D1D5DB] sm:text-lg lg:mx-0">
          Full stack projects, from the database to the interface. Take a look
          at the work.
        </p>
        <div className="mt-8">
          <GlowButton href="/projects">View Projects</GlowButton>
        </div>
      </motion.div>

      {/* ---------- Placeholder cards ---------- */}
      <div className="relative order-2 mx-auto h-60 w-full max-w-sm sm:h-72 lg:order-1 lg:h-80 lg:max-w-md">
        {CARDS.map(({ position, rotate, delay }) => (
          <motion.div
            key={position}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={
              isActive
                ? { opacity: 1, y: 0, rotate }
                : { opacity: 0, y: 40, rotate: 0 }
            }
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: isActive ? delay : 0,
            }}
            className={`absolute w-[62%] ${position}`}
          >
            {/* Floating loop, one layer inside the entrance animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + delay * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MockCard />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

