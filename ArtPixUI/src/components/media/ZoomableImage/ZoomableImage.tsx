import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Image } from "../Image/Image.js";
import { Button } from "../../buttons-actions/Button/Button.js";
import { clamp } from "../_shared/media.js";
import "../_shared/advanced.css";
export type ZoomableImageProps = { src: string; alt: string; maxZoom?: number; height?: number; label?: string };
export function ZoomableImage(props: ZoomableImageProps) { return <ZoomSurface key={JSON.stringify([props.src, props.maxZoom, props.height])} {...props} />; }
function ZoomSurface({ src, alt, maxZoom = 4, height = 320, label = "Image zoom" }: ZoomableImageProps) {
 const [scale, setScale] = useState(1); const [pan, setPan] = useState({ x: 0, y: 0 }); const [dragging, setDragging] = useState(false);
 const stage = useRef<HTMLDivElement>(null); const drag = useRef<{ id: number; x: number; y: number; px: number; py: number } | null>(null);
 const limit = clamp(maxZoom, 1, 8);
 useEffect(() => { const node = stage.current; if (!node) return; const observer = new ResizeObserver(() => { const box = node.getBoundingClientRect(); const x = box.width * (scale - 1) / 2, y = box.height * (scale - 1) / 2; setPan(previous => ({ x: clamp(previous.x, -x, x), y: clamp(previous.y, -y, y) })); }); observer.observe(node); return () => observer.disconnect(); }, [scale]);
 const move = (x: number, y: number, zoom = scale) => { const box = stage.current?.getBoundingClientRect(); const dx = (box?.width ?? 0) * (zoom - 1) / 2, dy = (box?.height ?? 0) * (zoom - 1) / 2; setPan({ x: clamp(x, -dx, dx), y: clamp(y, -dy, dy) }); };
 const zoom = (next: number) => { const n = clamp(next, 1, limit); setScale(n); move(pan.x, pan.y, n); };
 const reset = () => { setScale(1); setPan({ x: 0, y: 0 }); };
 return <div className="art-pix-media-stack" role="group" aria-label={label}><div ref={stage} tabIndex={0} role="group" aria-label="Image viewport. Use arrow keys to pan when zoomed." className="art-pix-zoom-stage" data-zoomed={scale > 1} data-dragging={dragging} style={{ "--art-pix-zoom-height": `${clamp(height, 120, 1200)}px` } as CSSProperties}
 onKeyDown={event => { if (scale > 1 && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(pan.x + (event.key === "ArrowLeft" ? 30 : event.key === "ArrowRight" ? -30 : 0), pan.y + (event.key === "ArrowUp" ? 30 : event.key === "ArrowDown" ? -30 : 0)); } }}
 onPointerDown={event => { if (scale <= 1 || event.button !== 0) return; event.preventDefault(); event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId); drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, px: pan.x, py: pan.y }; setDragging(true); }}
 onPointerMove={event => { const d = drag.current; if (d?.id === event.pointerId) move(d.px + event.clientX - d.x, d.py + event.clientY - d.y); }}
 onPointerUp={event => { if (drag.current?.id === event.pointerId) { drag.current = null; setDragging(false); event.currentTarget.releasePointerCapture(event.pointerId); } }} onPointerCancel={() => { drag.current = null; setDragging(false); }} onLostPointerCapture={() => { drag.current = null; setDragging(false); }}>
 <div className="art-pix-zoom-content" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}><Image src={src} alt={alt} fit="contain" draggable={false} /></div></div>
 <div className="art-pix-media-row"><Button variant="secondary" disabled={scale <= 1} onClick={() => zoom(scale - .5)}>Zoom out</Button><span>{Math.round(scale * 100)}%</span><Button variant="secondary" disabled={scale >= limit} onClick={() => zoom(scale + .5)}>Zoom in</Button><Button variant="secondary" onClick={reset}>Reset view</Button></div><p className="art-pix-media-note">Zoom with the buttons, then drag or use arrow keys to pan.</p></div>;
}
