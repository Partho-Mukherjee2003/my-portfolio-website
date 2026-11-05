"use client";

import type { CSSProperties, MouseEvent } from "react";
import { motion, MotionConfig, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

/* -------------------------------------------------------------------------- */
/*  Data: edit these arrays to change contact details or social links          */
/* -------------------------------------------------------------------------- */

type ContactItem = {
  label: string;
  value: string;
  href: string;
  Icon: IconType;
};
type SocialItem = { name: string; href: string; Icon: IconType };

const CONTACTS: ContactItem[] = [
  {
    label: "Email",
    value: "parthomukherjee582@gmail.com",
    href: "mailto:parthomukherjee582@gmail.com",
    Icon: MdEmail,
  },
  {
    label: "Phone",
    value: "+880 1778827812",
    href: "tel:+8801778827812",
    Icon: FaPhoneAlt,
  },
  {
    label: "WhatsApp",
    value: "+880 1778827812",
    href: "https://wa.me/8801778827812",
    Icon: FaWhatsapp,
  },
];

const SOCIALS: SocialItem[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/partho-mukherjee2005",
    Icon: FaLinkedinIn,
  },
  {
    name: "Twitter (X)",
    href: "https://x.com/Partho_M_2005",
    Icon: FaXTwitter,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/partho.mukherjee.144",
    Icon: FaFacebookF,
  },
];

/* -------------------------------------------------------------------------- */
/*  Scroll-reveal animation variants                                           */
/* -------------------------------------------------------------------------- */

// The wrapper only staggers its children; each child fades up
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                     */
/* -------------------------------------------------------------------------- */

/** Big contact card (same cursor-spotlight style as the Skills cards). The whole card is a link. */
function ContactCard({ label, value, href, Icon }: ContactItem) {
  // mailto: and tel: open the user's apps; WhatsApp opens in a new tab
  const isExternal = href.startsWith("http");

  // Write the cursor position into CSS variables so the glow follows the mouse
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.a
      variants={fadeUp}
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      onMouseMove={handleMouseMove}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
      className="group/card relative flex cursor-pointer rounded-2xl bg-white/10 p-px transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E5FF]"
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

      <div className="relative flex flex-1 flex-col items-center overflow-hidden rounded-[15px] bg-[#111827] p-6 text-center sm:p-8">
        {/* Soft background glow that tracks the cursor */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--x) var(--y), rgba(0,229,255,0.12), transparent 65%)",
          }}
        />

        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#3B82F6]/40 bg-[#3B82F6]/10 text-2xl text-[#3B82F6] transition-all duration-300 group-hover/card:border-[#00E5FF]/60 group-hover/card:text-[#00E5FF] group-hover/card:shadow-[0_0_20px_rgba(0,229,255,0.45)]">
          <Icon
            aria-hidden="true"
            className="transition-all duration-300 group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_8px_rgba(0,229,255,0.9)]"
          />
        </span>

        <span className="relative mt-5 text-sm text-[#D1D5DB]">{label}</span>
        <span className="relative mt-1 break-all text-base font-medium text-[#F3F4F6] transition-all duration-300 group-hover/card:text-[#00E5FF] group-hover/card:[text-shadow:0_0_12px_rgba(0,229,255,0.6)] sm:text-lg">
          {value}
        </span>
      </div>
    </motion.a>
  );
}

/** Round social icon button */
function SocialLink({ name, href, Icon }: SocialItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#111827] text-lg text-[#D1D5DB] transition-all duration-300 hover:border-[#00E5FF]/60 hover:text-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
    >
      <Icon
        aria-hidden="true"
        className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.9)]"
      />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact page                                                               */
/* -------------------------------------------------------------------------- */

const ContractPage = () => {
  return (
    // reducedMotion="user" turns off movement for users who ask for less motion
    <MotionConfig reducedMotion="user">
      {/*
        flex-1 stretches this section to fill the space between the navbar and
        the footer (needs <main className="flex flex-1 flex-col"> in layout.tsx).
        items-center keeps the content vertically centered.
      */}
      <section
        id="contact"
        className="relative isolate flex flex-1 items-center overflow-hidden bg-[#0B0F19] py-20 sm:py-24"
      >
        {/* Static glow blobs on both sides, same as the Skills section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-80 w-80 rounded-full bg-[#3B82F6]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-[#00E5FF]/10 blur-3xl"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          {/* ---------- Brand & identity ---------- */}
          <motion.div variants={fadeUp} className="text-center">
            <h1 className="bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Partho Mukherjee
            </h1>
            <p className="mt-3 text-xl font-medium text-[#F3F4F6] sm:text-2xl">
              Full Stack Web Developer
            </p>
            <p className="mx-auto mt-4 max-w-md text-base text-[#D1D5DB] sm:text-lg">
              Building digital products, brands, and experiences.
            </p>
          </motion.div>

          {/* ---------- Contact cards: 1 column, then 3 from lg up ---------- */}
          <motion.h2
            variants={fadeUp}
            className="mt-14 text-center text-2xl font-semibold tracking-tight text-[#F3F4F6] sm:text-3xl"
          >
            Get in touch
          </motion.h2>

          <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
            {CONTACTS.map((item) => (
              <ContactCard key={item.label} {...item} />
            ))}
          </div>

          {/* ---------- Social links ---------- */}
          <motion.ul
            variants={fadeUp}
            aria-label="Social media"
            className="mt-10 flex items-center justify-center gap-4"
          >
            {SOCIALS.map((item) => (
              <li key={item.name}>
                <SocialLink {...item} />
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>
    </MotionConfig>
  );
};

export default ContractPage;
