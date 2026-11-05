export default function NavSkeleton() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-gray-800/60 bg-[#0B0F19]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
      {/* Logo Placeholder (Glowing Gradient Pulse) */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-28 rounded-lg bg-gradient-to-r from-[#3B82F6]/20 via-[#00E5FF]/30 to-[#3B82F6]/20 animate-pulse border border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.15)]" />
      </div>

      {/* Desktop Navigation Links Skeleton */}
      <div className="hidden md:flex items-center gap-8">
        <div className="h-4 w-16 rounded bg-[#111827] border border-gray-800 animate-pulse" />
        <div className="h-4 w-20 rounded bg-[#111827] border border-gray-800 animate-pulse" />
        <div className="h-4 w-20 rounded bg-[#111827] border border-gray-800 animate-pulse" />
        <div className="h-4 w-16 rounded bg-[#111827] border border-gray-800 animate-pulse" />
      </div>

      {/* Action / Resume Button Skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-24 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#00E5FF]/20 border border-[#00E5FF]/40 animate-pulse shadow-[0_0_15px_rgba(0,229,255,0.2)]" />
      </div>
    </header>
  );
}
