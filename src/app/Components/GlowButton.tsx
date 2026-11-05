import Link from "next/link";
import type { ReactNode } from "react";

type GlowButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  download?: boolean;
};

const base =
  "inline-flex cursor-pointer items-center justify-center rounded-full border-2 px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E5FF]";

const variants = {
  // Electric Blue fill, Neon Cyan glow on hover
  solid:
    "border-transparent bg-[#3B82F6] text-[#0B0F19] shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:bg-[#00E5FF] hover:shadow-[0_0_36px_rgba(0,229,255,0.85)]",
  // Blue outline, turns cyan with a glow on hover
  outline:
    "border-[#3B82F6] text-[#F3F4F6] hover:border-[#00E5FF] hover:text-[#00E5FF] hover:shadow-[0_0_28px_rgba(0,229,255,0.55)]",
};

export default function GlowButton({
  href,
  children,
  variant = "solid",
  download = false,
}: GlowButtonProps) {
  const className = `${base} ${variants[variant]}`;

  // Files (like a PDF) use a plain <a download>, pages use Next.js <Link>
  if (download) {
    return (
      <a href={href} download className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
