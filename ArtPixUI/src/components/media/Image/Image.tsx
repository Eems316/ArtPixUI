import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { PlaceholderImage } from "../PlaceholderImage/index.js";
import "./Image.css";

export type ImageProps = Omit<ComponentPropsWithoutRef<"img">, "alt"> & {
  alt: string;
  fit?: "cover" | "contain";
  aspectRatio?: CSSProperties["aspectRatio"];
  fallbackText?: string;
};

function cssDimension(value: number | string | undefined) {
  return typeof value === "string" && /^\d+(\.\d+)?$/.test(value) ? Number(value) : value;
}

function ImageContent({ src, srcSet, alt, fit = "cover", aspectRatio, fallbackText, className, style, width, height, onError, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.currentSrc && image.naturalWidth === 0) setFailed(true);
  }, []);
  const classes = ["art-pix-image", className].filter(Boolean).join(" ");
  if ((!src?.trim() && !srcSet?.trim()) || failed) {
    return <PlaceholderImage
      id={props.id} title={props.title} className={classes}
      alt={props["aria-hidden"] === true || props["aria-hidden"] === "true" ? "" : alt}
      aria-describedby={props["aria-describedby"]}
      width={cssDimension(width)} height={cssDimension(height)}
      aspectRatio={aspectRatio ?? (width && height ? `${width} / ${height}` : "16 / 9")}
      text={fallbackText} style={style} />;
  }
  return <img {...props} ref={imageRef} src={src} srcSet={srcSet} alt={alt}
    width={width} height={height} className={classes}
    style={{ objectFit: fit, aspectRatio, ...style }}
    onError={event => { setFailed(true); onError?.(event); }} />;
}

/** Changing the source selection resets a failed image so it can load again. */
export function Image(props: ImageProps) {
  return <ImageContent key={JSON.stringify([props.src, props.srcSet, props.sizes])} {...props} />;
}
