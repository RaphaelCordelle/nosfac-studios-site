import Image from "next/image";

/**
 * Brand mark — chaleureux et clair.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-foreground ring-1 ring-border-subtle">
        <Image
          src="/brand/icon.png"
          alt=""
          width={32}
          height={32}
          className="size-full object-cover"
          priority
        />
      </span>
      <span className="flex items-baseline gap-1 text-[15px] font-semibold tracking-[-0.01em] text-foreground">
        <span>Nosfac</span>
        <span className="font-normal text-foreground-muted">Studios</span>
      </span>
    </span>
  );
}
