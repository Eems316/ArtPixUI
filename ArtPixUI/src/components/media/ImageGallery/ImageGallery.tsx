import { useState } from "react";
import { ImageGrid, type ImageGridProps } from "../ImageGrid/ImageGrid.js";
import { Lightbox } from "../../overlays-menus/Lightbox/Lightbox.js";
export type ImageGalleryProps = Omit<ImageGridProps, "onSelect"> & { viewerTitle?: string };
export function ImageGallery({ images, viewerTitle = "Gallery preview", ...props }: ImageGalleryProps) {
 const [open, setOpen] = useState(false); const [index, setIndex] = useState(0);
 return <><ImageGrid {...props} images={images} onSelect={next => { setIndex(next); setOpen(true); }} /><Lightbox open={open && images.length > 0} onOpenChange={setOpen} title={viewerTitle} images={images} index={index} onIndexChange={setIndex} /></>;
}
