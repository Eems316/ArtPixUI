import { useState, type ReactNode } from "react";
import { Button } from "../../buttons-actions/Button/Button.js";
import { slideIndex } from "../_shared/media.js";
import "../_shared/advanced.css";
export type CarouselSlide = { id: string; label: string; content: ReactNode };
export type CarouselProps = { slides: CarouselSlide[]; label: string; index?: number; defaultIndex?: number; onIndexChange?: (index: number) => void; loop?: boolean };
export function Carousel({ slides, label, index, defaultIndex = 0, onIndexChange, loop = false }: CarouselProps) {
 const [local, setLocal] = useState(defaultIndex); const selected = slideIndex(index ?? local, slides.length);
 const go = (next: number) => { const n = loop && slides.length ? (next + slides.length) % slides.length : slideIndex(next, slides.length); if (index === undefined) setLocal(n); onIndexChange?.(n); };
 return <section className="art-pix-media-stack" aria-label={label} aria-roledescription="carousel">{slides.length ? <><div className="art-pix-carousel-slide" role="group" aria-roledescription="slide" aria-label={`${selected + 1} of ${slides.length}: ${slides[selected].label}`} key={slides[selected].id}>{slides[selected].content}</div><div className="art-pix-media-row"><Button variant="secondary" disabled={slides.length < 2 || (!loop && selected === 0)} onClick={() => go(selected - 1)}>Previous</Button><span role="status" aria-live="polite" aria-atomic="true">{selected + 1} of {slides.length}</span><Button variant="secondary" disabled={slides.length < 2 || (!loop && selected === slides.length - 1)} onClick={() => go(selected + 1)}>Next</Button></div></> : <p>No slides to display.</p>}</section>;
}
