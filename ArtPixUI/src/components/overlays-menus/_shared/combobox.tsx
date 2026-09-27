import { useId, useRef, useState } from "react";
import { TextInput } from "../../forms-inputs/TextInput/TextInput.js";
import { PopupCore } from "./popup.js";
import { nextOptionIndex } from "./geometry.js";
export type ComboBoxOption = { id: string; label: string; disabled?: boolean };
export type ComboBoxPopupProps = { label: string; value: string; onInputChange: (value: string) => void; options: ComboBoxOption[]; onSelect: (option: ComboBoxOption) => void; selectedId?: string; disabled?: boolean; placeholder?: string; emptyText?: string };
/** Options are supplied/filtered by the caller. Typing focus stays in the input. */
export function ComboBoxCore({ label, value, onInputChange, options, onSelect, selectedId, disabled, placeholder, emptyText = "No options" }: ComboBoxPopupProps) {
 const [open, setOpen] = useState(false); const [active, setActive] = useState<string>(); const ref = useRef<HTMLInputElement>(null); const id = useId();
 const enabled = options.filter(option => !option.disabled);
 const current = enabled.find(option => option.id === active);
 const select = (option: ComboBoxOption) => { if (option.disabled) return; setOpen(false); onSelect(option); ref.current?.focus(); };
 return <div><label htmlFor={`${id}-input`}>{label}</label><TextInput ref={ref} id={`${id}-input`} role="combobox" aria-autocomplete="list" aria-expanded={open && !disabled} aria-controls={open && !disabled ? `${id}-list` : undefined} aria-activedescendant={open && current ? `${id}-option-${options.indexOf(current)}` : undefined} value={value} disabled={disabled} placeholder={placeholder}
 onChange={event => { onInputChange(event.target.value); setActive(undefined); setOpen(true); }} onClick={() => setOpen(true)} onBlur={() => setOpen(false)} onKeyDown={event => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); const i = enabled.findIndex(option => option.id === active); setActive(enabled[nextOptionIndex(enabled.length, i, event.key === "ArrowDown" ? "next" : "previous")]?.id); }
  if (open && (event.key === "Home" || event.key === "End")) { event.preventDefault(); setActive((event.key === "Home" ? enabled[0] : enabled.at(-1))?.id); }
  if (event.key === "Enter" && open && current) { event.preventDefault(); select(current); }
  if (event.key === "Escape") setOpen(false);
 }}/><PopupCore id={`${id}-list`} open={open && !disabled} onOpenChange={setOpen} anchorRef={ref} label={label} role="listbox" focus={false} className="art-pix-menu">
 {options.length ? options.map((option, index) => <div key={option.id} id={`${id}-option-${index}`} role="option" aria-selected={option.id === (current?.id ?? selectedId)} aria-disabled={option.disabled || undefined} className="art-pix-menu-item" onPointerDown={event => event.preventDefault()} onPointerMove={() => { if (!option.disabled) setActive(option.id); }} onClick={() => select(option)}>{option.label}</div>) : <div role="option" aria-disabled="true" aria-selected="false">{emptyText}</div>}
 </PopupCore></div>;
}
