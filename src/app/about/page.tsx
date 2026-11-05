"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaBolt,
  FaBrain,
  FaFilm,
  FaFire,
  FaHeadphones,
  FaPlane,
  FaPuzzlePiece,
  FaRoute,
  FaStar,
  FaUsers,
} from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/*  Content: edit this part to change text, traits or hobbies                  */
/* -------------------------------------------------------------------------- */

// Put your photo in /public and use its path here, e.g. "/partho.jpg"
const PROFILE_IMAGE = "/Pictures/profile.jpeg";

const INTRO =
  "I’m a Computer Science & Engineering (CSE) student and an ambitious full stack web developer. I enjoy turning ideas into working products, from the interface people see to the server and database behind it.";

const JOURNEY = [
  "My days are full. I teach private tuition, keep up with my CSE studies, and take care of my responsibilities at home. Coding happens in the hours that remain.",
  "Some days that is two hours, some days it is twenty minutes. I sit down and write code either way. That consistency has taught me more than any single course or project: small, steady progress adds up, and a hard week is never a reason to lose hope.",
];

const VISION =
  "I’m eager to learn AI / ML, and I love the feeling of solving a hard problem. My goal is to use technology to help people and to serve my country.";

type Item = { label: string; Icon: IconType };

const STRENGTHS: Item[] = [
  { label: "Problem Solver", Icon: FaPuzzlePiece },
  { label: "Quick Learner", Icon: FaBolt },
  { label: "Great Leader", Icon: FaUsers },
  { label: "Dedicated & Driven", Icon: FaFire },
];

const HOBBIES: Item[] = [
  { label: "Traveling", Icon: FaPlane },
  { label: "Watching movies", Icon: FaFilm },
  { label: "Audio stories & dramas", Icon: FaHeadphones },
];

/* -------------------------------------------------------------------------- */
/*  Scroll-reveal animation variants                                           */
/* -------------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Used on a list: the list staggers its items in one after another
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// The glowing underline under the heading grows from the left
const underline: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
};

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

/** Fades and slides its children up when they scroll into view */
function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Sub-heading with a small accent icon */
function SubHeading({ Icon, children }: { Icon: IconType; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-[#F3F4F6]">
      <Icon aria-hidden="true" className="text-base text-[#00E5FF]" />
      {children}
    </h3>
  );
}

/** Card with an icon tile and a label. Used for both strengths and hobbies. */
function TraitCard({
  label,
  Icon,
  layout,
}: Item & { layout: "stacked" | "inline" }) {
  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      // `group/chip` is a named group, so it won't clash with other hover groups
      className="group/chip relative rounded-2xl bg-white/10 p-px transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(0,229,255,0.35)]"
    >
      {/* Gradient border: fades in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#00E5FF] opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100"
      />
      <div
        className={`relative flex h-full items-center gap-3 rounded-[15px] bg-[#111827] p-4 ${
          layout === "stacked" ? "flex-col text-center" : "flex-row"
        }`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#3B82F6]/40 bg-[#3B82F6]/10 text-lg text-[#3B82F6] transition-all duration-300 group-hover/chip:border-[#00E5FF]/60 group-hover/chip:text-[#00E5FF] group-hover/chip:shadow-[0_0_16px_rgba(0,229,255,0.45)]">
          <Icon
            aria-hidden="true"
            className="transition-all duration-300 group-hover/chip:scale-110 group-hover/chip:drop-shadow-[0_0_8px_rgba(0,229,255,0.9)]"
          />
        </span>
        <span className="text-sm font-medium text-[#F3F4F6]">{label}</span>
      </div>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Left column: photo card                                                    */
/* -------------------------------------------------------------------------- */

function ProfileCard() {
  return (
    <Reveal className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
      {/* Soft glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-[#3B82F6]/30 to-[#00E5FF]/20 blur-2xl"
      />

      {/* Gradient border: 2px of Blue → Cyan around the photo */}
      <div className="rounded-3xl bg-gradient-to-br from-[#3B82F6] via-[#00E5FF] to-[#3B82F6] p-0.5 shadow-[0_0_40px_rgba(59,130,246,0.35)]">
        <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-[#111827]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PROFILE_IMAGE}
            alt="Partho Mukherjee"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Floating badge on the bottom edge */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#00E5FF]/40 bg-[#0B0F19]/90 px-5 py-2.5 text-sm font-medium text-[#F3F4F6] shadow-[0_0_24px_rgba(0,229,255,0.35)] backdrop-blur"
        >
          <FaStar aria-hidden="true" className="text-[#00E5FF]" />
          Passionate Learner & Leader
        </motion.div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  About section                                                              */
/* -------------------------------------------------------------------------- */

const About = () => {
  return (
    // reducedMotion="user" turns off movement for users who ask for less motion
    <MotionConfig reducedMotion="user">
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative isolate scroll-mt-16 overflow-hidden bg-[#0B0F19] py-20 sm:py-24"
      >
        {/* Static glow blobs on both sides, same as the other sections */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-80 w-80 rounded-full bg-[#3B82F6]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-[#00E5FF]/10 blur-3xl"
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Stacked on mobile; photo on the left, story on the right from lg up */}
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[5fr_7fr] lg:gap-14">
            {/* ---------- Left: photo ---------- */}
            <ProfileCard />

            {/* ---------- Right: story & details ---------- */}
            <div className="space-y-10">
              {/* Heading with a glowing underline */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.h2
                  variants={fadeUp}
                  id="about-heading"
                  className="text-3xl font-bold tracking-tight text-[#F3F4F6] sm:text-4xl lg:text-5xl"
                >
                  About Me
                </motion.h2>
                <motion.div
                  variants={underline}
                  aria-hidden="true"
                  className="mt-4 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] shadow-[0_0_16px_rgba(0,229,255,0.6)]"
                />
              </motion.div>

              {/* Introduction */}
              <Reveal>
                <p className="text-lg leading-relaxed text-[#D1D5DB]">{INTRO}</p>
              </Reveal>

              {/* Programming journey */}
              <Reveal className="space-y-3">
                <SubHeading Icon={FaRoute}>My programming journey</SubHeading>
                {JOURNEY.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="leading-relaxed text-[#D1D5DB]"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              {/* Core strengths */}
              <div className="space-y-4">
                <Reveal>
                  <SubHeading Icon={FaBolt}>Core strengths</SubHeading>
                </Reveal>
                <motion.ul
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {STRENGTHS.map((item) => (
                    <TraitCard key={item.label} {...item} layout="stacked" />
                  ))}
                </motion.ul>
              </div>

              {/* Tech vision & impact */}
              <Reveal>
                <div className="rounded-2xl border border-[#3B82F6]/30 bg-gradient-to-br from-[#3B82F6]/10 to-[#00E5FF]/5 p-5 transition-all duration-300 hover:border-[#00E5FF]/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] sm:p-6">
                  <SubHeading Icon={FaBrain}>Tech vision & impact</SubHeading>
                  <p className="mt-3 leading-relaxed text-[#D1D5DB]">{VISION}</p>
                </div>
              </Reveal>

              {/* Beyond coding */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <Reveal>
                  <SubHeading Icon={FaStar}>Beyond coding</SubHeading>
                </Reveal>
                <motion.ul
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {HOBBIES.map((item) => (
                    <TraitCard key={item.label} {...item} layout="inline" />
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default About;
