import { useState } from "react";
import { Slider } from "../../forms-inputs/Slider/Slider.js";
import { rangeBounds, normalizeRange, clampRangeValue } from "./model.js";
import "./search.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type RangeProps = { label: string; value: [number, number]; onChange: (value: [number, number]) => void; min?: number; max?: number; step?: number; disabled?: boolean; minimumLabel?: string; maximumLabel?: string };
function NumberEndpoint({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
 const [draft, setDraft] = useState(String(value)); const [previous, setPrevious] = useState(value);
 if (previous !== value) { setPrevious(value); setDraft(String(value)); }
 const invalid = draft === "" || !Number.isFinite(Number(draft)) || Number(draft) < min || Number(draft) > max;
 return <label className="art-pix-search-stack">{label}<input type="number" className="art-pix-text-input" min={min} max={max} step={step} value={draft} aria-invalid={invalid || undefined} onChange={event => { const next = event.target.value; setDraft(next); const n = event.target.valueAsNumber; if (next !== "" && Number.isFinite(n) && n >= min && n <= max) onChange(clampRangeValue(n, min, max, step)); }} onBlur={() => setDraft(String(value))} /></label>;
}
export function RangeFields({ label, value, onChange, min = 0, max = 100, step = 1, disabled, minimumLabel = "Minimum", maximumLabel = "Maximum", sliders = false }: RangeProps & { sliders?: boolean }) {
 const bounds = rangeBounds(min, max, step); const pair = normalizeRange(value, bounds.min, bounds.max, bounds.step);
 return <fieldset disabled={disabled} className="art-pix-filter-group art-pix-search-stack"><legend>{label}</legend><div className="art-pix-range-fields"><NumberEndpoint label={minimumLabel} value={pair[0]} min={bounds.min} max={pair[1]} step={bounds.step} onChange={next => onChange([Math.min(next, pair[1]), pair[1]])} /><NumberEndpoint label={maximumLabel} value={pair[1]} min={pair[0]} max={bounds.max} step={bounds.step} onChange={next => onChange([pair[0], Math.max(pair[0], next)])} /></div>{sliders && <><label className="art-pix-search-stack">{minimumLabel} slider: {pair[0]}<Slider min={bounds.min} max={bounds.max} step={bounds.step} value={pair[0]} onChange={event => onChange([Math.min(event.target.valueAsNumber, pair[1]), pair[1]])} /></label><label className="art-pix-search-stack">{maximumLabel} slider: {pair[1]}<Slider min={bounds.min} max={bounds.max} step={bounds.step} value={pair[1]} onChange={event => onChange([pair[0], Math.max(event.target.valueAsNumber, pair[0])])} /></label></>}</fieldset>;
}
