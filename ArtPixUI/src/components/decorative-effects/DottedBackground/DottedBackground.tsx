import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import "./DottedBackground.css";

type DottedBackgroundStyle = CSSProperties & {
  "--art-pix-dotted-background-color"?: string;
  "--art-pix-dotted-background-dot-color"?: string;
  "--art-pix-dotted-background-dot-size"?: string;
  "--art-pix-dotted-background-spacing"?: string;
};

export type DottedBackgroundProps = ComponentPropsWithoutRef<"div"> & {
  background?: string;
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
};

/** A static CSS-generated dot grid. It adds no image asset or interaction. */
export function DottedBackground({
  background = "#eee5c8",
  dotColor = "#9a854526",
  dotSize = 0.7,
  spacing = 8,
  className = "",
  style,
  ...props
}: DottedBackgroundProps) {
  const normalizedDotSize = Number.isFinite(dotSize) ? Math.max(0, dotSize) : 0.7;
  const normalizedSpacing = Number.isFinite(spacing) ? Math.max(1, spacing) : 8;
  const dottedStyle: DottedBackgroundStyle = {
    ...style,
    "--art-pix-dotted-background-color": background,
    "--art-pix-dotted-background-dot-color": dotColor,
    "--art-pix-dotted-background-dot-size": `${normalizedDotSize}px`,
    "--art-pix-dotted-background-spacing": `${normalizedSpacing}px`,
  };

  return <div {...props} className={`art-pix-dotted-background ${className}`} style={dottedStyle} />;
}
