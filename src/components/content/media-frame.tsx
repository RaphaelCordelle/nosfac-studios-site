import Image from "next/image";
import type { Media } from "@/domain/media";
import { cn } from "@/lib/utils";

export interface MediaFrameProps {
  media: Media | undefined;
  className?: string;
  /** aspect-ratio Tailwind class, e.g. "aspect-video" — reserves space to avoid layout shift. */
  ratioClassName?: string;
  priority?: boolean;
  accentHex?: string;
  /** Use the media's real width/height instead of ratioClassName (e.g. a portrait phone
   *  screenshot shown uncropped on a project hero). Card grids should leave this off so
   *  every card keeps the same height (section 7.2 acceptance criteria). */
  respectMediaAspectRatio?: boolean;
}

/**
 * "Living Frames" media surface — docs/MASTER_SPECIFICATION.md section 5.1.
 * Always reserves its aspect ratio before load (CLS budget, section 14.1) and renders
 * an explicit, editorially-labelled placeholder rather than a fake screenshot when
 * no real media exists yet.
 */
export function MediaFrame({
  media,
  className,
  ratioClassName = "aspect-video",
  priority,
  accentHex,
  respectMediaAspectRatio = false,
}: MediaFrameProps) {
  const isRealImage = media?.type === "image" && media.src;
  const isVideo = media?.type === "video" && media.src;
  const { width, height } = media ?? {};
  const useRealRatio = respectMediaAspectRatio && Boolean(width && height);
  const isPortrait = useRealRatio && Boolean(width && height && height > width);

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated",
        !useRealRatio && ratioClassName,
        className,
      )}
      style={{
        ...(useRealRatio ? { aspectRatio: `${width} / ${height}` } : undefined),
        ...(accentHex ? { boxShadow: `inset 0 0 0 1px ${accentHex}22` } : undefined),
      }}
    >
      {isRealImage && media?.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className={isPortrait ? "object-contain" : "object-cover"}
        />
      ) : isVideo && media?.src ? (
        <video
          src={media.src}
          poster={media.poster}
          muted
          playsInline
          loop
          className="size-full object-cover"
          aria-label={media.alt}
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-3 bg-[#0b0d12] p-6 text-center">
          <Image
            src="/brand/icon.png"
            alt=""
            width={40}
            height={40}
            className="rounded-lg opacity-90"
          />
          <p className="text-xs font-medium text-white/70">
            {media?.alt ?? "Aperçu à venir — capture réelle non encore disponible"}
          </p>
        </div>
      )}
      {media?.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-xs text-white">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
