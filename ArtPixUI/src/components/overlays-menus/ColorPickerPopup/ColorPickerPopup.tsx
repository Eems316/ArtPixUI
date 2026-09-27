import { useId, useRef, useState } from "react";
import { PopupCore } from "../_shared/popup.js";
import { TextInput } from "../../forms-inputs/TextInput/TextInput.js";
import { Slider } from "../../forms-inputs/Slider/Slider.js";
export type ColorPickerPopupProps = { label?: string; value: string; onChange: (hex: string) => void; disabled?: boolean; swatches?: string[] };
const valid = (value: string) => /^#[0-9a-f]{6}$/i.test(value);
export function ColorPickerPopup({ label = "Choose color", value, onChange, disabled, swatches = ["#247b3b", "#f3ad38", "#fff9e5", "#2c3025"] }: ColorPickerPopupProps) {
 const [open, setOpen] = useState(false); const [draft, setDraft] = useState(value); const ref = useRef<HTMLButtonElement>(null); const id = useId();
 const [previousValue, setPreviousValue] = useState(value);
 if (previousValue !== value) { setPreviousValue(value); setDraft(value); }
 const color = valid(value) ? value : "#247b3b";
 const channels = [1, 3, 5].map(index => parseInt(color.slice(index, index + 2), 16));
 return <><button ref={ref} type="button" disabled={disabled} aria-haspopup="dialog" aria-expanded={open && !disabled} aria-controls={open && !disabled ? id : undefined} className="art-pix-overlay-trigger" onClick={() => setOpen(v => !v)}>{label}: {value}</button><PopupCore id={id} label={label} open={open && !disabled} onOpenChange={setOpen} anchorRef={ref}><div className="art-pix-color-picker">
 <div className="art-pix-color-preview" aria-hidden="true" style={{ backgroundColor: color }} />
 <label htmlFor={`${id}-hex`}>Hex color</label><TextInput id={`${id}-hex`} value={draft} aria-invalid={!valid(draft)} aria-describedby={`${id}-hint`} onChange={event => { setDraft(event.target.value); if (valid(event.target.value)) onChange(event.target.value); }} /><small id={`${id}-hint`}>Use six hex digits, for example #247b3b.</small>
 {channels.map((channel, index) => <label key={index}>{["Red", "Green", "Blue"][index]}: {channel}<Slider min={0} max={255} step={1} value={channel} onChange={event => { const next = [...channels]; next[index] = event.target.valueAsNumber; const hex = `#${next.map(n => n.toString(16).padStart(2, "0")).join("")}`; setDraft(hex); onChange(hex); }} /></label>)}
 <div className="art-pix-color-swatches">{swatches.filter(valid).map((swatch, index) => <button key={`${swatch}-${index}`} type="button" className="art-pix-color-swatch" style={{ backgroundColor: swatch }} aria-label={`Use ${swatch}`} aria-pressed={color.toLowerCase() === swatch.toLowerCase()} onClick={() => { setDraft(swatch); onChange(swatch); }} />)}</div>
 <button type="button" className="art-pix-overlay-trigger" onClick={() => { setOpen(false); ref.current?.focus(); }}>Done</button></div></PopupCore></>;
}
