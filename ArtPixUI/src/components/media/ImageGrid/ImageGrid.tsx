import type { CSSProperties } from "react";
import { Image } from "../Image/Image.js";
import type { GalleryImage } from "../_shared/media.js";
import "../_shared/advanced.css";
export type ImageGridProps = { images: GalleryImage[]; label?: string; onSelect?: (index: number, image: GalleryImage) => void; minItemWidth?: number; emptyText?: string };
export function ImageGrid({ images, label = "Images", onSelect, minItemWidth = 160, emptyText = "No images to display." }: ImageGridProps) {
 const width = Number.isFinite(minItemWidth) ? Math.max(64, minItemWidth) : 160;
 return images.length ? <ul className="art-pix-media-grid" aria-label={label} style={{ "--art-pix-grid-min": `${width}px` } as CSSProperties}>{images.map((image, index) => <li key={image.id}><figure>{onSelect ? <button type="button" aria-label={`View ${image.alt || image.caption || `image ${index + 1}`}`} onClick={() => onSelect(index, image)}><Image src={image.thumbnail ?? image.src} alt="" aspectRatio="4 / 3" /></button> : <Image src={image.thumbnail ?? image.src} alt={image.alt} aspectRatio="4 / 3" />}{image.caption && <figcaption>{image.caption}</figcaption>}</figure></li>)}</ul> : <p>{emptyText}</p>;
}
