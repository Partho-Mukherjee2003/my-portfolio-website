"use client";

import  { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation items.
 * Fill in each `href` later (e.g. '/skills'). Until then they stay empty.
 */
const NAV_LINKS = [
  { label: "Skills", href: "/skill" },
  { label: "About Me", href: "/about" },
  { label: "Education", href: "" },
  { label: "Projects", href: "" },
  { label: "Contract", href: "/contract" },
];

const NavBar = () => {
  const pathname = usePathname();

  // Mobile menu open/closed
  const [isOpen, setIsOpen] = useState(false);

  // Fallback active link, used while hrefs are still empty
  const [activeLabel, setActiveLabel] = useState<string>("");

  /**
   * A link is active when:
   *  - it has an href, and the current route matches it, or
   *  - it has no href yet, and it was the last link clicked.
   */
  const isActive = (link: { label: string; href: string }) =>
    link.href ? pathname === link.href : activeLabel === link.label;

  const handleNavigate = (label: string) => {
    setActiveLabel(label);
    setIsOpen(false); // close the mobile menu after choosing a link
  };

  // Close the mobile menu with the Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* ---------- Logo ---------- */}
        <Link
          href=""
          onClick={() => setActiveLabel("")}
          className="cursor-pointer rounded text-2xl font-semibold tracking-tight text-[#F3F4F6] transition-colors duration-200 hover:text-[#3B82F6]  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6]"
        >
          Partho
          <span className="text-[#3B82F6]">.</span>
        </Link>

        {/* ---------- Desktop links (lg and up) ---------- */}
        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => handleNavigate(link.label)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative cursor-pointer py-1 text-[15px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] ${
                    active
                      ? "text-[#3B82F6]"
                      : "text-[#D1D5DB] hover:text-[#3B82F6]"
                  }`}
                >
                  {link.label}

                  {/* Underline: slides in from the left on hover, stays on when active */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-[#3B82F6] transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ---------- Hamburger button (below lg) ---------- */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#F3F4F6] transition-colors duration-200 hover:text-[#3B82F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] lg:hidden"
        >
          {/* Three bars that morph into an X */}
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 rounded bg-current transition-all duration-300 motion-reduce:transition-none ${
              isOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 rounded bg-current transition-all duration-300 motion-reduce:transition-none ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 rounded bg-current transition-all duration-300 motion-reduce:transition-none ${
              isOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </nav>

      {/* ---------- Mobile / tablet menu ---------- */}
      {/* grid-rows trick lets the panel animate its height smoothly */}
      <div
        id="mobile-menu"
        className={`grid bg-[#111827] transition-all duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          isOpen
            ? "grid-rows-[1fr] border-t border-white/5 opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="overflow-hidden">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => handleNavigate(link.label)}
                  aria-current={active ? "page" : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  className={`block cursor-pointer border-l-2 px-6 py-3.5 text-base font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#3B82F6] ${
                    active
                      ? "border-[#3B82F6] bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "border-transparent text-[#D1D5DB] hover:bg-white/5 hover:text-[#3B82F6]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
