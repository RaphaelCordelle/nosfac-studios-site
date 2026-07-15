import Image from "next/image";

/**
 * Brand mark — Sobre. Un logo dans un carré, pas de gradient hover.
 * "Nosfac Studios" en une seule ligne, une seule graisse. Pas de contrast artificiel.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[#0a0b0f] ring-1 ring-white/10">
        <Image
          src="/brand/icon.png"
          alt=""
          width={28}
          height={28}
          className="size-full object-cover"
          priority
        />
      </span>
      <span className="text-[14px] font-medium tracking-[-0.01em]">
        Nosfac Studios
      </span>
    </span>
  );
}
