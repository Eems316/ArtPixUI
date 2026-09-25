import type { ComponentPropsWithoutRef } from "react";
import "./Icon.css";

export type IconProps = Omit<ComponentPropsWithoutRef<"svg">, "width" | "height" | "role" | "tabIndex" | "focusable" | "aria-hidden"> & {
  /** Preset dimensions in pixels: small 16, medium 24, large 32. */
  size?: "small" | "medium" | "large";
};

const sizes = { small: 16, medium: 24, large: 32 };

/** Supply SVG shapes, not a nested svg. Label meaningful icons with aria-label. */
export function Icon({ size = "medium", children, className, viewBox = "0 0 16 16", ...props }: IconProps) {
  const meaningful = Boolean(props["aria-label"]?.trim() || props["aria-labelledby"]?.trim());

  return (
    <svg
      viewBox={viewBox}
      fill="currentColor"
      shapeRendering="crispEdges"
      {...props}
      width={sizes[size]}
      height={sizes[size]}
      className={["art-pix-icon", className].filter(Boolean).join(" ")}
      role={meaningful ? "img" : undefined}
      aria-hidden={meaningful ? undefined : true}
      focusable="false"
      tabIndex={-1}
    >
      {children}
    </svg>
  );
}
