"use client";

import { motion, type Variants } from "framer-motion";
import GlowButton from "./GlowButton";
import { useTypewriter } from "./useTypewriter";

type Props = { isActive: boolean };

const ROLE = "Full Stack Web Developer";

// Children fade up one after another whenever the slide becomes active
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function IntroSlide({ isActive }: Props) {
  const typedRole = useTypewriter(ROLE, isActive);

  return (
    <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      {/* ---------- Text ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isActive ? "show" : "hidden"}
        className="order-2 text-center lg:order-1 lg:text-left"
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-bold tracking-tight text-[#F3F4F6] sm:text-5xl lg:text-6xl"
        >
          Hi, I am <span className="block">Partho Mukherjee</span>
        </motion.h1>

        {/* Typed line. Screen readers get the full text, not the partial one */}
        <motion.p
          variants={fadeUp}
          className="mt-4 text-xl font-medium text-[#00E5FF] sm:text-2xl lg:text-3xl"
        >
          <span className="sr-only">{ROLE}</span>
          <span aria-hidden="true">{typedRole}</span>
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[1em] w-0.5 translate-y-[0.15em] animate-pulse bg-[#00E5FF]"
          />
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8">
          <GlowButton href="/contact">Contact Me</GlowButton>
        </motion.div>
      </motion.div>

      {/* ---------- Profile picture ---------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-1 flex justify-center lg:order-2"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-48 w-48 rounded-full shadow-[0_0_60px_rgba(59,130,246,0.45)] sm:h-60 sm:w-60 lg:h-80 lg:w-80"
        >
          {/* Slowly rotating Blue → Cyan ring */}
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #3B82F6, #00E5FF, #0B0F19, #3B82F6)",
            }}
          />
          {/* Replace the src with your picture, e.g. "/partho.jpg" from /public */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Pictures/profile.jpeg"
            alt="Partho Mukherjee"
            className="relative m-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full bg-[#111827] object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
