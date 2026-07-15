import Image from "next/image";

/**
 * Brand mark + wordmark.
 * The logo image (public/brand/icon.png) is placed inside a fixed dark chip so the
 * baked-in dark background stays consistent across themes. The wordmark uses tight
 * tracking and a subtle accent character on hover (via CSS in parent group).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0a0b0f] ring-1 ring-white/10">
        <Image
          src="/brand/icon.png"
          alt=""
          width={32}
          height={32}
          className="size-full object-cover"
          priority
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent-500/0 to-accent-500/20 opacity-0 transition-opacity duration-(--duration-standard) group-hover:opacity-100"
        />
      </span>
      <span className="flex items-baseline text-[15px] font-semibold tracking-[-0.015em]">
        <span>Nosfac</span>
        <span className="ml-1 font-normal text-foreground-muted">Studios</span>
      </span>
    </span>
  );
}
