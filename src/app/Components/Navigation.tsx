"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiFolder } from "react-icons/fi";

/* -------------------------------------------------------------------------- */
/*  Pages, in the same order as the top navbar.                                */
/*  Each href must match the real route folder name exactly                    */
/*  (e.g. app/skill/page.tsx -> "/skill").                                     */
/* -------------------------------------------------------------------------- */

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  { label: "Skills", href: "/skill" },
  { label: "About Me", href: "/about" },
  { label: "Education", href: "/education" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contract" },
];

// Drops a trailing slash so "/about/" and "/about" are treated the same
const normalize = (path: string) =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

/* -------------------------------------------------------------------------- */
/*  Previous / Next card                                                       */
/* -------------------------------------------------------------------------- */

function PageLink({
  direction,
  page,
}: {
  direction: "prev" | "next";
  page: NavLink;
}) {
  const isPrev = direction === "prev";
  const Chevron = isPrev ? FiChevronLeft : FiChevronRight;

  return (
    <Link
      href={page.href}
      aria-label={`${isPrev ? "Previous" : "Next"} page: ${page.label}`}
      className={`group flex min-h-11 max-w-full min-w-0 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-[#111827] px-3 py-2 text-[#D1D5DB] transition-all duration-300 hover:border-[#00E5FF]/50 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF] active:scale-95 ${
        isPrev
          ? "justify-self-start"
          : "flex-row-reverse justify-self-end text-right"
      }`}
    >
      <Chevron
        aria-hidden="true"
        className={`h-5 w-5 shrink-0 text-[#00E5FF] transition-transform duration-300 ${
          isPrev
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
      />
      <span className="min-w-0">
        {/* The small hint only shows from sm up, to keep phones compact */}
        <span className="hidden text-xs text-[#D1D5DB]/70 sm:block">
          {isPrev ? "Previous" : "Next"}
        </span>
        <span className="block truncate text-sm font-medium">{page.label}</span>
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page navigation (small screens only: below the navbar's lg breakpoint)     */
/* -------------------------------------------------------------------------- */

export default function PageNavigation() {
  const pathname = normalize(usePathname() ?? "/");
  const lastIndex = NAV_LINKS.length - 1;

  // Matches the page itself and anything nested under it (e.g. /projects/abc)
  const currentIndex = NAV_LINKS.findIndex(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  );

  // Cyclic rotation. On a page that isn't in the list (like Home), Previous
  // goes to the last page and Next goes to the first one.
  const prevPage =
    currentIndex === -1
      ? NAV_LINKS[lastIndex]
      : NAV_LINKS[(currentIndex - 1 + NAV_LINKS.length) % NAV_LINKS.length];
  const nextPage =
    currentIndex === -1
      ? NAV_LINKS[0]
      : NAV_LINKS[(currentIndex + 1) % NAV_LINKS.length];

  // No point showing "View Projects" while the visitor is already there
  const onProjects =
    pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    // lg:hidden: shows only while the top navbar is collapsed into the hamburger
    <nav
      aria-label="Page navigation"
      className="relative z-20 border-t border-white/5 bg-[#0B0F19] lg:hidden"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-5 sm:px-6">
        <PageLink direction="prev" page={prevPage} />

        {onProjects ? (
          <span aria-hidden="true" />
        ) : (
          <Link
            href="/projects"
            className="group inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] px-4 py-2.5 text-sm font-semibold text-[#0B0F19] shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF] active:scale-95 sm:px-6 sm:py-3"
          >
            <FiFolder
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
            />
            View Projects
          </Link>
        )}

        <PageLink direction="next" page={nextPage} />
      </div>
    </nav>
  );
}
