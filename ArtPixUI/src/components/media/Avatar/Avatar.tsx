import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithRef } from "react";
import { Icon } from "../Icon/index.js";
import "./Avatar.css";

export type AvatarProps = Omit<ComponentPropsWithRef<"div">, "children" | "role" | "aria-label" | "aria-labelledby" | "aria-hidden"> & {
  src?: string;
  /** Supplies initials and the default accessible name. */
  name?: string;
  /** Overrides the accessible name; empty makes the avatar decorative. */
  alt?: string;
  size?: "small" | "medium" | "large";
};

function Portrait({ src, initials }: { src?: string; initials: string }) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.currentSrc && image.naturalWidth === 0) setFailed(true);
  }, []);
  if (src?.trim() && !failed) {
    return <img ref={imageRef} className="art-pix-avatar__image" src={src} alt="" aria-hidden="true" onError={() => setFailed(true)} />;
  }
  if (initials) return <span aria-hidden="true">{initials}</span>;
  return <Icon className="art-pix-avatar__fallback"><path d="M5 1h6v1h2v7h-2v2H5V9H3V2h2zm0 11h6v1h3v3H2v-3h3z" /></Icon>;
}

export function Avatar({ src, name, alt, size = "medium", className, ...props }: AvatarProps) {
  const words = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const initials = (Array.from(words[0] ?? "")[0] ?? "") + (words.length > 1 ? Array.from(words[words.length - 1])[0] ?? "" : "");
  const label = (alt ?? (name?.trim() || "User avatar")).trim();
  return <div {...props} className={["art-pix-avatar", `art-pix-avatar--${size}`, className].filter(Boolean).join(" ")}
    role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
    <Portrait key={src} src={src} initials={initials.toLocaleUpperCase()} />
  </div>;
}
