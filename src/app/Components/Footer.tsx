"use client";

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

type LinkItem = { name: string; href: string; Icon: IconType };

const CONTACTS: LinkItem[] = [
  {
    name: "Email",
    href: "mailto:parthomukherjee582@gmail.com",
    Icon: MdEmail,
  },
  { name: "Phone", href: "tel:+8801778827812", Icon: FaPhoneAlt },
  { name: "WhatsApp", href: "https://wa.me/8801778827812", Icon: FaWhatsapp },
];

const SOCIALS: LinkItem[] = [
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
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* -------------------------------------------------------------------------- */
/*  Icon link                                                                  */
/* -------------------------------------------------------------------------- */

function IconLink({ name, href, Icon }: LinkItem) {
  // mailto: and tel: open the user's apps; everything else opens in a new tab
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      aria-label={name}
      className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#111827] text-sm text-[#D1D5DB] transition-all duration-300 hover:border-[#00E5FF]/60 hover:text-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
    >
      <Icon
        aria-hidden="true"
        className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.9)]"
      />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

const Footer = () => {
  return (
    // reducedMotion="user" turns off movement for users who ask for less motion
    <MotionConfig reducedMotion="user">
      <footer className="border-t border-white/5 bg-[#0B0F19]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl px-4 pt-5 sm:px-6 lg:px-8"
        >
          {/* Stacked + centered on mobile, one row from md up */}
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            {/* Brand */}
            <motion.div variants={fadeUp}>
              <p className="bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] bg-clip-text text-lg font-bold tracking-tight text-transparent">
                Partho Mukherjee
              </p>
              <p className="text-xs text-[#D1D5DB]">Full Stack Web Developer</p>
            </motion.div>

            {/* Contact + social icons */}
            <motion.ul
              variants={fadeUp}
              aria-label="Contact and social links"
              className="flex items-center gap-2.5"
            >
              {CONTACTS.map((item) => (
                <li key={item.name}>
                  <IconLink {...item} />
                </li>
              ))}

              {/* Thin divider between contact and social icons */}
              <li aria-hidden="true" className="mx-1 h-5 w-px bg-white/10" />

              {SOCIALS.map((item) => (
                <li key={item.name}>
                  <IconLink {...item} />
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Copyright bar */}
          <motion.div
            variants={fadeUp}
            className="mt-4 border-t border-white/10 py-3 text-center"
          >
            <p className="text-xs text-[#D1D5DB]">
              © 2026 Partho Mukherjee. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </footer>
    </MotionConfig>
  );
};

export default Footer;
