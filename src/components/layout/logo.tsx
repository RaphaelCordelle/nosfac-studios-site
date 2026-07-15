import Image from "next/image";
import { SITE } from "@/config/site";

/**
 * The source mark (public/brand/icon.png) has a solid near-black backdrop baked in
 * (no transparency), so it's shown inside a fixed dark chip rather than directly on
 * the page background — that keeps it legible and consistent in both the light and
 * dark theme instead of showing a hard black square in light mode.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0b0d12]">
        <Image src="/brand/icon.png" alt="" width={32} height={32} className="size-full object-cover" priority />
      </span>
      <span className="text-base font-semibold tracking-tight">{SITE.name}</span>
    </span>
  );
}
