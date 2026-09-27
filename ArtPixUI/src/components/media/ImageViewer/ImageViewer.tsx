import { Carousel, type CarouselProps } from "../Carousel/Carousel.js";
import { ZoomableImage } from "../ZoomableImage/ZoomableImage.js";
import type { GalleryImage } from "../_shared/media.js";
export type ImageViewerProps = Omit<CarouselProps, "slides" | "label"> & { images: GalleryImage[]; label?: string; maxZoom?: number };
export function ImageViewer({ images, label = "Image viewer", maxZoom, ...props }: ImageViewerProps) {
 return <Carousel {...props} label={label} slides={images.map(image => ({ id: image.id, label: image.alt || image.caption || "Image", content: <figure><ZoomableImage src={image.src} alt={image.alt} maxZoom={maxZoom} />{image.caption && <figcaption>{image.caption}</figcaption>}</figure> }))} />;
}
