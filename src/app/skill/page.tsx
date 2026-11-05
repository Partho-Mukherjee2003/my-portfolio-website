"use client";

import type { CSSProperties, MouseEvent } from "react";
import { motion, MotionConfig, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaBrain,
  FaCss3Alt,
  FaCubes,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaLaptopCode,
  FaMicrochip,
  FaNodeJs,
  FaProjectDiagram,
  FaPuzzlePiece,
  FaPython,
  FaReact,
  FaServer,
  FaTools,
} from "react-icons/fa";
import {
  SiBetterauth,
  SiC,
  SiCplusplus,
  SiDaisyui,
  SiExpress,
  SiHeroui,
  SiMongodb,
  SiNextdotjs,
  SiShadcnui,
  SiTailwindcss,
} from "react-icons/si";

/* -------------------------------------------------------------------------- */
/*  Data: edit this array to add, remove or rename skills and categories       */
/* -------------------------------------------------------------------------- */

type Skill = { name: string; Icon: IconType };

type Category = {
  title: string;
  description: string;
  Icon: IconType;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    title: "Frontend & UI",
    description: "Building responsive, accessible interfaces.",
    Icon: FaLaptopCode,
    skills: [
      { name: "HTML", Icon: FaHtml5 },
      { name: "CSS", Icon: FaCss3Alt },
      { name: "React", Icon: FaReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "DaisyUI", Icon: SiDaisyui },
      { name: "HeroUI", Icon: SiHeroui },
      { name: "shadcn/ui", Icon: SiShadcnui },
    ],
  },
  {
    title: "Backend & Auth",
    description: "APIs, databases and secure sign-in.",
    Icon: FaServer,
    skills: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express.js", Icon: SiExpress },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Better Auth", Icon: SiBetterauth },
    ],
  },
  {
    title: "CS Core & Languages",
    description: "The fundamentals behind the code.",
    Icon: FaMicrochip,
    skills: [
      { name: "C", Icon: SiC },
      { name: "C++", Icon: SiCplusplus },
      { name: "Python", Icon: FaPython },
      { name: "DSA", Icon: FaProjectDiagram }, // Data Structures & Algorithms
      { name: "OOP", Icon: FaCubes }, // Object-Oriented Programming
    ],
  },
  {
    title: "Tools & Interests",
    description: "How I work and what I explore.",
    Icon: FaTools,
    skills: [
      { name: "Git", Icon: FaGitAlt },
      { name: "GitHub", Icon: FaGithub },
      { name: "Problem Solving", Icon: FaPuzzlePiece },
      { name: "AI / ML", Icon: FaBrain },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Scroll-reveal animation variants                                           */
/* -------------------------------------------------------------------------- */

// Section heading: simple fade up
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Category card: fades up, then staggers its skill pills in.
// `custom` is the card's index, so cards in the same row cascade left to right.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.1,
      delayChildren: 0.25 + index * 0.1,
      staggerChildren: 0.05,
    },
  }),
};

// Skill pill: pops up slightly
const pillVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* -------------------------------------------------------------------------- */
/*  Skill pill                                                                 */
/* -------------------------------------------------------------------------- */

function SkillPill({ name, Icon }: Skill) {
  return (
    <motion.li
      variants={pillVariants}
      // `group/pill` is a named group, so it doesn't clash with the card's hover
      className="group/pill relative cursor-pointer rounded-xl bg-white/10 p-px transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.35)]"
    >
      {/* Gradient border: fades in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#00E5FF] opacity-0 transition-opacity duration-300 group-hover/pill:opacity-100"
      />
      <div className="relative flex items-center gap-2 rounded-[11px] bg-[#0B0F19] px-3 py-2 text-sm font-medium text-[#D1D5DB] transition-colors duration-300 group-hover/pill:text-[#F3F4F6]">
        <Icon
          aria-hidden="true"
          className="text-lg text-[#3B82F6] transition-all duration-300 group-hover/pill:scale-110 group-hover/pill:text-[#00E5FF] group-hover/pill:drop-shadow-[0_0_8px_rgba(0,229,255,0.9)]"
        />
        {name}
      </div>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Category card                                                              */
/* -------------------------------------------------------------------------- */

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const { title, description, Icon, skills } = category;

  // Write the cursor position into CSS variables. The spotlight layers read
  // them, so the glow follows the mouse without re-rendering React.
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      onMouseMove={handleMouseMove}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      className="group/card relative flex cursor-pointer rounded-2xl bg-white/10 p-px transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
    >
      {/* Spotlight border: a Blue → Cyan gradient that lights up near the cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x) var(--y), #00E5FF, #3B82F6 45%, transparent 75%)",
        }}
      />

      <div className="relative flex-1 overflow-hidden rounded-[15px] bg-[#111827] p-5 sm:p-6">
        {/* Soft background glow that tracks the cursor */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--x) var(--y), rgba(0,229,255,0.12), transparent 65%)",
          }}
        />

        <div className="relative">
          {/* Card header */}
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#3B82F6]/40 bg-[#3B82F6]/10 text-xl text-[#3B82F6] transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-[#00E5FF]/60 group-hover/card:text-[#00E5FF] group-hover/card:shadow-[0_0_20px_rgba(0,229,255,0.45)]">
              <Icon aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-[#F3F4F6]">
              {title}
            </h3>
          </div>

          <p className="mt-3 text-sm text-[#D1D5DB]">{description}</p>

          {/* Skill pills */}
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <SkillPill key={skill.name} {...skill} />
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

const Skills = () => {
  return (
    // reducedMotion="user" turns off movement for users who ask for less motion
    <MotionConfig reducedMotion="user">
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="relative isolate scroll-mt-16 overflow-hidden bg-[#0B0F19] py-20 sm:py-24"
      >
        {/* Static glow blobs behind the content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-80 w-80 rounded-full bg-[#3B82F6]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-[#00E5FF]/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2
              id="skills-heading"
              className="text-3xl font-bold tracking-tight text-[#F3F4F6] sm:text-4xl lg:text-5xl"
            >
              Skills
            </h2>
            <p className="mt-4 text-base text-[#D1D5DB] sm:text-lg">
              The technologies and fundamentals I use to build full stack
              projects.
            </p>
          </motion.div>

          {/* 1 column on mobile, 2 on tablet, 4 on desktop */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Skills;
