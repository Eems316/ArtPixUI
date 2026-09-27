import { Carousel, type CarouselProps } from "../Carousel/Carousel.js";
import { Image } from "../Image/Image.js";
import type { GalleryImage } from "../_shared/media.js";
export type ImageSliderProps = Omit<CarouselProps, "slides"> & { images: GalleryImage[] };
export function ImageSlider({ images, ...props }: ImageSliderProps) {
 return <Carousel {...props} slides={images.map(image => ({ id: image.id, label: image.alt || image.caption || "Image", content: <figure><Image src={image.src} alt={image.alt} fit="contain" aspectRatio="16 / 9" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure> }))} />;
}
