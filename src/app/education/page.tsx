"use client";

/**
 * Education.tsx  →  app/components/Education.tsx
 *
 * Requirements:
 *   npm i framer-motion react-icons
 *
 * Usage (app/page.tsx):
 *   import Education from "./components/Education";
 *   <Education />
 *
 * Palette
 *   Background : #0B0F19 (Deep Navy)
 *   Text       : #F3F4F6 (Off-White) / #D1D5DB (Light Gray)
 *   Accent     : #3B82F6 (Electric Blue) / #00E5FF (Neon Cyan)
 */

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaGraduationCap,
  FaUniversity,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */
type BadgeData = {
  label: string;
  variant: "cyan" | "blue";
  pulse: boolean;
};

type EducationItem = {
  id: number;
  degree: string;
  affiliation: string;
  institution: string;
  location: string;
  period: string;
  badge: BadgeData;
  icon: IconType;
  link: { label: string; href: string };
  note: string | null;
};

/* -------------------------------------------------------------------------- */
/*  DATA – edit here to add / change milestones                               */
/* -------------------------------------------------------------------------- */
const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "B.Sc. in Computer Science & Engineering (CSE)",
    affiliation: "Professional Honours under National University (NU)",
    institution: "Institute of Science Trade & Technology (ISTT)",
    location: "Mirpur, Dhaka",
    period: "Ongoing",
    badge: { label: "Currently Pursuing", variant: "cyan", pulse: true },
    icon: FaGraduationCap,
    link: { label: "Visit ISTT Website", href: "https://istt.edu.bd/" },
    note: null,
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate (HSC) — Science Stream",
    affiliation: "Barishal Board",
    institution: "Govt. Brajamohun (BM) College",
    location: "Barishal",
    period: "Batch of 2022",
    badge: { label: "GPA 5.00 / 5.00", variant: "blue", pulse: false },
    icon: FaUniversity,
    // TODO: replace with the real college website
    link: { label: "Visit College Website", href: "https://example.com" },
    note: "A renowned and prestigious historical college in Bangladesh.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Small presentational pieces                                               */
/* -------------------------------------------------------------------------- */

/** Pill badge – cyan (status) or blue (result) */
function Badge({ label, variant, pulse }: BadgeData) {
  const styles =
    variant === "cyan"
      ? "border-[#00E5FF]/50 bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_0_14px_rgba(0,229,255,0.35)]"
      : "border-[#3B82F6]/60 bg-[#3B82F6]/15 text-[#3B82F6] shadow-[0_0_14px_rgba(59,130,246,0.35)]";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${styles}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5FF] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5FF]" />
        </span>
      )}
      {label}
    </span>
  );
}

/** Single education card (glassmorphism + gradient border on hover) */
function EducationCard({ item }: { item: EducationItem }) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative cursor-pointer rounded-2xl p-px transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(0,229,255,0.28)]"
    >
      {/* Gradient border – fades in on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E5FF] via-[#3B82F6] to-[#00E5FF] opacity-20 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Glass body */}
      <div className="relative rounded-2xl bg-[#111827]/90 p-5 backdrop-blur-xl sm:p-7">
        {/* Header: icon + badge */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#3B82F6]/40 bg-[#3B82F6]/10 text-2xl text-[#00E5FF] shadow-[0_0_16px_rgba(59,130,246,0.35)]">
            <Icon />
          </div>
          <Badge {...item.badge} />
        </div>

        {/* Degree */}
        <h3 className="text-lg font-bold leading-snug text-[#F3F4F6] sm:text-xl">
          {item.degree}
        </h3>

        {/* Affiliation */}
        <p className="mt-1 text-sm font-medium text-[#3B82F6]">
          {item.affiliation}
        </p>

        {/* Institution */}
        <p className="mt-3 text-base font-semibold text-[#F3F4F6]">
          {item.institution}
        </p>

        {/* Meta row */}
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#D1D5DB]">
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#00E5FF]" />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaCalendarAlt className="text-[#00E5FF]" />
            {item.period}
          </span>
        </div>

        {/* Optional note */}
        {item.note && (
          <p className="mt-3 text-sm italic leading-relaxed text-[#D1D5DB]/80">
            {item.note}
          </p>
        )}

        {/* Link button */}
        <a
          href={item.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#00E5FF]/50 px-4 py-2 text-sm font-semibold text-[#00E5FF] transition-all duration-300 hover:bg-[#00E5FF] hover:text-[#0B0F19] hover:shadow-[0_0_18px_rgba(0,229,255,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
        >
          {item.link.label}
          <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */
export default function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll progress of the timeline wrapper → drives the glowing line "draw"
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[#0B0F19] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Soft background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#3B82F6]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#00E5FF]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center sm:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00E5FF]">
            My Journey
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#F3F4F6] sm:text-4xl lg:text-5xl">
            Education
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Static faint track */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 bg-[#3B82F6]/15 md:left-1/2"
          />
          {/* Animated glowing line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#00E5FF] via-[#3B82F6] to-[#00E5FF] shadow-[0_0_12px_#00E5FF,0_0_24px_#3B82F6] md:left-1/2"
          />

          <ul className="space-y-12 md:space-y-20">
            {educationData.map((item, index) => {
              const isLeft = index % 2 === 0; // alternate sides on md+

              return (
                <li
                  key={item.id}
                  className={`relative pl-12 md:flex md:items-center md:pl-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline node */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="absolute left-4 top-6 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#00E5FF] bg-[#0B0F19] shadow-[0_0_14px_#00E5FF] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#00E5FF]" />
                  </motion.span>

                  {/* Card (slides in from its side) */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full md:w-[calc(50%-2.5rem)]"
                  >
                    <EducationCard item={item} />
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
