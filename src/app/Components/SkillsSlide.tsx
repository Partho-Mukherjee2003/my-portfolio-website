"use client";

import { motion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
  FaShieldAlt,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiExpress,
  SiHackerrank,
  SiLeetcode,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

type Props = { isActive: boolean };

const SKILLS: { name: string; Icon: IconType }[] = [
  { name: "HTML", Icon: FaHtml5 },
  { name: "CSS", Icon: FaCss3Alt },
  { name: "React", Icon: FaReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Express.js", Icon: SiExpress },
  // react-icons has no Better Auth logo, so this is a stand-in
  { name: "Better Auth", Icon: FaShieldAlt },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "C++", Icon: SiCplusplus },
  { name: "Python", Icon: FaPython },
  { name: "LeetCode", Icon: SiLeetcode },
  { name: "HackerRank", Icon: SiHackerrank },
];

// Each tile pops in with a spring, staggered by its position
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 16,
      delay: 0.3 + i * 0.06,
    },
  }),
};

export default function SkillsSlide({ isActive }: Props) {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-10 text-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-[#F3F4F6] sm:text-4xl lg:text-5xl">
          My tech stack
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-[#D1D5DB] sm:text-lg">
          The tools I use to design, build and ship full stack apps.
        </p>
      </motion.div>

      <ul className="mt-10 flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-4">
        {SKILLS.map(({ name, Icon }, i) => (
          <motion.li
            key={name}
            custom={i}
            variants={pop}
            initial="hidden"
            animate={isActive ? "show" : "hidden"}
          >
            {/* Gentle floating loop, each tile on its own rhythm */}
            <motion.div
              animate={
                isActive
                  ? {
                      y: [0, -8, 0],
                      transition: {
                        duration: 3 + (i % 4) * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2 + i * 0.15,
                      },
                    }
                  : { y: 0 }
              }
            >
              <div className="group relative flex h-24 w-[74px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/80 px-1 text-[#D1D5DB] backdrop-blur transition-all duration-300 hover:scale-110 hover:border-[#00E5FF]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] sm:h-28 sm:w-24 lg:h-32 lg:w-28">
                {/* Blue → Cyan gradient wash on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/25 to-[#00E5FF]/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <Icon
                  aria-hidden="true"
                  className="relative text-3xl transition-all duration-300 group-hover:text-[#00E5FF] group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.9)] sm:text-4xl lg:text-5xl"
                />
                <span className="relative text-center text-[11px] font-medium leading-tight transition-colors duration-300 group-hover:text-[#F3F4F6] sm:text-xs">
                  {name}
                </span>
              </div>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
