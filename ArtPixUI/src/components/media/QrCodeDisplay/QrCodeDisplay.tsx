import { useId } from "react";
import { encodeQr } from "../_shared/qr.js";
import { clamp } from "../_shared/media.js";
import "../_shared/advanced.css";
export type QrCodeDisplayProps = { value: string; label?: string; size?: number; showValue?: boolean };
export function QrCodeDisplay({ value, label = "QR code", size = 232, showValue = true }: QrCodeDisplayProps) {
 const id = useId(); let matrix: boolean[][];
 try { matrix = encodeQr(value); } catch { return <figure className="art-pix-qr"><p role="status">QR content is too long. Use at most 105 UTF-8 bytes.</p><figcaption>{label}: {value}</figcaption></figure>; }
 const edge = matrix.length + 8;
 const path = matrix.flatMap((row, y) => row.flatMap((dark, x) => dark ? [`M${x + 4} ${y + 4}h1v1h-1z`] : [])).join("");
 return <figure className="art-pix-qr"><svg role="img" aria-labelledby={`${id}-title ${id}-description`} width={clamp(size, 116, 1200)} height={clamp(size, 116, 1200)} viewBox={`0 0 ${edge} ${edge}`} shapeRendering="crispEdges"><title id={`${id}-title`}>{label}</title><desc id={`${id}-description`}>{value || "Empty text"}</desc><rect width={edge} height={edge} fill="#fff" /><path d={path} fill="#000" /></svg><figcaption>{label}{showValue && <>: <span>{value || "Empty text"}</span></>}</figcaption></figure>;
}
