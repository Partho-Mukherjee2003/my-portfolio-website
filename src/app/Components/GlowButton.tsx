import Link from "next/link";
import type { ReactNode } from "react";

type GlowButtonProps = {
  href: string;
  children: ReactNode;
};

/** Pill button: Electric Blue at rest, Neon Cyan glow on hover. */
export default function GlowButton({ href, children }: GlowButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#3B82F6] px-8 py-3.5 text-base font-semibold text-[#0B0F19] shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00E5FF] hover:shadow-[0_0_36px_rgba(0,229,255,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E5FF]"
    >
      {children}
    </Link>
  );
}
