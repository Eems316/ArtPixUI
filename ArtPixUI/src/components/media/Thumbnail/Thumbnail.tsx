import { Image } from "../Image/index.js";
import type { ImageProps } from "../Image/index.js";
import "./Thumbnail.css";

export type ThumbnailProps = ImageProps & {
  /** Square defaults: small 64px, medium 96px, large 128px. */
  size?: "small" | "medium" | "large";
};

const sizes = { small: 64, medium: 96, large: 128 };

/** Compact presentation of Image, without built-in interactive behavior. */
export function Thumbnail({ size = "medium", width = sizes[size], height = sizes[size], className, ...props }: ThumbnailProps) {
  return <Image {...props} width={width} height={height}
    className={["art-pix-thumbnail", className].filter(Boolean).join(" ")} />;
}
