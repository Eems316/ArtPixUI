import type { ComponentPropsWithRef, CSSProperties } from "react";
import { Icon } from "../Icon/index.js";
import "./PlaceholderImage.css";

export type PlaceholderImageProps = Omit<ComponentPropsWithRef<"div">, "children" | "role" | "aria-hidden" | "aria-label" | "aria-labelledby"> & {
  /** Accessible description; an empty string makes the placeholder decorative. */
  alt?: string;
  /** Optional visible caption, independent of the accessible description. */
  text?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  aspectRatio?: CSSProperties["aspectRatio"];
};

/** Static image fallback, without network requests or loading behavior. */
export function PlaceholderImage({ alt = "Image unavailable", text, width = "100%", height, aspectRatio = "16 / 9", className, style, ...props }: PlaceholderImageProps) {
  const label = alt.trim();
  return (
    <div {...props} role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}
      className={["art-pix-placeholder-image", className].filter(Boolean).join(" ")}
      style={{ width, height, aspectRatio, ...style }}>
      <Icon size="large"><path d="M1 1h14v14H1zm2 2v10h10V3zM4 4h3v3H4zm0 7 3-3 2 2 2-3 2 4v2H3v-2z" fillRule="evenodd" /></Icon>
      {text && <span className="art-pix-placeholder-image__text">{text}</span>}
    </div>
  );
}
