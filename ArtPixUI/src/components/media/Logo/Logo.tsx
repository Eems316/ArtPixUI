import type { ComponentPropsWithRef } from "react";
import "./Logo.css";

export type LogoProps = Omit<ComponentPropsWithRef<"img">, "alt" | "children"> & {
  alt: string;
  link?: string;
  target?: ComponentPropsWithRef<"a">["target"];
  rel?: string;
  /** Optional destination label for the enclosing link. */
  linkLabel?: string;
};

/** Native brand image; image props and ref always target the img element. */
export function Logo({ alt, link, target, rel, linkLabel, className, ...props }: LogoProps) {
  const image = <img {...props} alt={alt} className={["art-pix-logo", className].filter(Boolean).join(" ")} />;
  if (link === undefined) return image;
  return <a className="art-pix-logo-link" href={link} target={target}
    rel={rel ?? (target?.toLowerCase() === "_blank" ? "noopener noreferrer" : undefined)}
    aria-label={linkLabel}>{image}</a>;
}
