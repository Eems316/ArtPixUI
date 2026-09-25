import type { ComponentPropsWithRef, CSSProperties } from "react";
import { Image } from "../Image/index.js";
import "./ImageWithOverlay.css";

export type ImageWithOverlayProps = ComponentPropsWithRef<"div"> & {
  src?: string;
  alt: string;
  position?: "top" | "center" | "bottom";
  aspectRatio?: CSSProperties["aspectRatio"];
};

/** Content remains in normal layout so long text can grow the frame. */
export function ImageWithOverlay({ src, alt, position = "bottom", aspectRatio = "16 / 9", children, className, style, ...props }: ImageWithOverlayProps) {
  return (
    <div {...props} className={["art-pix-image-with-overlay", `art-pix-image-with-overlay--${position}`, className].filter(Boolean).join(" ")} style={{ aspectRatio, ...style }}>
      <Image src={src} alt={alt} className="art-pix-image-with-overlay__image" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, borderRadius: 0, aspectRatio: "auto" }} />
      <div className="art-pix-image-with-overlay__content">{children}</div>
    </div>
  );
}
