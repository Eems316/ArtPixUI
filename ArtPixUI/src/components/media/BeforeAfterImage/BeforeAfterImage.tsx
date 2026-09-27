import { useState } from "react";
import { Image } from "../Image/Image.js";
import { Slider } from "../../forms-inputs/Slider/Slider.js";
import { clamp } from "../_shared/media.js";
import "../_shared/advanced.css";
export type BeforeAfterImageProps = { before: { src: string; alt: string }; after: { src: string; alt: string }; label?: string; value?: number; defaultValue?: number; onChange?: (value: number) => void; beforeLabel?: string; afterLabel?: string };
export function BeforeAfterImage({ before, after, label = "Image comparison", value, defaultValue = 50, onChange, beforeLabel = "Before", afterLabel = "After" }: BeforeAfterImageProps) {
 const [local, setLocal] = useState(defaultValue); const position = clamp(value ?? local, 0, 100);
 return <div role="group" aria-label={label} className="art-pix-media-stack"><div className="art-pix-compare-stage"><Image src={after.src} alt={after.alt} /><div className="art-pix-compare-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Image src={before.src} alt={before.alt} /></div><span className="art-pix-compare-line" style={{ left: `${position}%` }} /></div><div className="art-pix-media-row"><span>{beforeLabel}</span><span>{afterLabel}</span></div><label>{label}<Slider min={0} max={100} step={1} value={position} aria-valuetext={`${position}% ${beforeLabel}, ${100 - position}% ${afterLabel}`} onChange={event => { const next = clamp(event.target.valueAsNumber, 0, 100); if (value === undefined) setLocal(next); onChange?.(next); }} /></label></div>;
}
