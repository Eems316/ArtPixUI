import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader.js";
import type { SkeletonLoaderProps } from "../SkeletonLoader/SkeletonLoader.js";
import "./ShimmerSkeleton.css";

export type ShimmerSkeletonProps = SkeletonLoaderProps;

/** Decorative shimmer; falls back to the static placeholder with reduced motion. */
export function ShimmerSkeleton({ className, ...props }: ShimmerSkeletonProps) {
  return <SkeletonLoader {...props} className={["art-pix-shimmer-skeleton", className].filter(Boolean).join(" ")} />;
}
