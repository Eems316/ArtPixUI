import type { ComponentPropsWithRef, CSSProperties } from "react";
import "./SkeletonLoader.css";

export type SkeletonLoaderProps = Omit<ComponentPropsWithRef<"span">, "children" | "aria-hidden" | "tabIndex" | "contentEditable" | "dangerouslySetInnerHTML"> & {
  shape?: "rectangle" | "text" | "circle";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

/** Decorative, static placeholder. Loading announcements belong to its parent. */
export function SkeletonLoader({ shape = "rectangle", width, height, className, style, ...props }: SkeletonLoaderProps) {
  return <span {...props} aria-hidden="true" tabIndex={undefined} contentEditable={false}
    className={["art-pix-skeleton-loader", `art-pix-skeleton-loader--${shape}`, className].filter(Boolean).join(" ")}
    style={{ ...style, ...(width !== undefined ? { width } : {}), ...(height !== undefined ? { height } : {}) }} />;
}
