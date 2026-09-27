import { Dialog } from "../Dialog/Dialog.js";
import { ImageViewer, type ImageViewerProps } from "../../media/ImageViewer/ImageViewer.js";
export type LightboxProps = ImageViewerProps & { open: boolean; onOpenChange: (open: boolean) => void; title?: string };
export function Lightbox({ open, onOpenChange, title = "Image preview", ...props }: LightboxProps) {
 return <Dialog open={open} onOpenChange={onOpenChange} title={title} className="art-pix-lightbox">{open && <ImageViewer {...props} />}</Dialog>;
}
