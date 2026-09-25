import type { ComponentPropsWithoutRef } from "react";
import "./Title.css";

export type TitleProps = ComponentPropsWithoutRef<"h2"> & {
  /** Semantic heading level. Defaults to h2 for section headings. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

/** A semantic heading with the shared ArtPixUI typography. */
export function Title({ level = 2, children, className, ...props }: TitleProps) {
  const Heading = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <Heading {...props} className={["art-pix-title", `art-pix-title--${level}`, className].filter(Boolean).join(" ")}>
      {children}
    </Heading>
  );
}
