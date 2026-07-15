import Image from "next/image";
import type { Media } from "@/domain/media";

export interface HeroShowcaseProps {
  media: Media | undefined;
  accentHex: string;
  priority?: boolean;
}

/**
 * Home hero visual — docs/MASTER_SPECIFICATION.md section 5.1 ("Living Frames"): a soft
 * directional halo in the project's own accent color, a corner accent band, and the real
 * media presented at its true shape (a phone screenshot sits in a device frame instead of
 * being cropped into a generic landscape box).
 */
export function HeroShowcase({ media, accentHex, priority }: HeroShowcaseProps) {
  const width = media?.width;
  const height = media?.height;
  const isPortraitPhoto = Boolean(
    media?.type === "image" && media.src && width && height && height > width,
  );

  return (
    <div className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-border-subtle bg-surface-elevated p-8 md:min-h-[440px] md:p-12">
      {/* Corner accent band — a "cut" of color, not a decorative gradient wash. */}
      <div
        className="absolute top-0 left-0 h-1.5 w-24 rounded-br-full"
        style={{ backgroundColor: accentHex }}
        aria-hidden
      />

      {/* Directional halos, capped at two per viewport (section 5.1). */}
      <div
        className="absolute -top-24 -right-16 size-72 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: accentHex }}
        aria-hidden
      />
      <div
        className="absolute -bottom-28 -left-20 size-64 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: accentHex }}
        aria-hidden
      />

      {isPortraitPhoto && media?.src && width && height ? (
        <div
          className="relative w-[220px] shrink-0 overflow-hidden rounded-[2.25rem] border-[6px] border-[#0b0d12] bg-[#0b0d12] shadow-2xl sm:w-[250px] md:w-[270px]"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <div className="absolute top-0 right-0 left-0 z-10 flex justify-center">
            <div className="h-4 w-20 rounded-b-xl bg-[#0b0d12]" />
          </div>
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority={priority}
            sizes="270px"
            className="object-cover"
          />
        </div>
      ) : media?.type === "image" && media.src ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative flex flex-col items-center gap-3 text-center">
          <Image src="/brand/icon.png" alt="" width={56} height={56} className="rounded-xl opacity-90" />
          <p className="text-sm font-medium text-foreground-muted">
            {media?.alt ?? "Aperçu à venir — capture réelle non encore disponible"}
          </p>
        </div>
      )}
    </div>
  );
}
