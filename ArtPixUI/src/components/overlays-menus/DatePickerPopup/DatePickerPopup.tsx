import { useId, useRef, useState } from "react";
import { Popover } from "../Popover/Popover.js";
import { DatePicker, type DatePickerProps } from "../../date-time/DatePicker/DatePicker.js";
export type DatePickerPopupProps = DatePickerProps;
export function DatePickerPopup({ label = "Choose date", ...props }: DatePickerPopupProps) {
    const [open, setOpen] = useState(false);
    const anchor = useRef<HTMLButtonElement>(null);
    const id = useId();
    return <><button type="button" ref={anchor} disabled={props.disabled} className="art-pix-overlay-trigger" aria-haspopup="dialog" aria-expanded={open && !props.disabled} aria-controls={open ? id : undefined} onClick={() => setOpen(v => !v)}>{label}: {props.value || "Not selected"}</button><Popover id={id} open={open && !props.disabled} onOpenChange={setOpen} anchorRef={anchor} label={label}><DatePicker {...props} label={label}/><button type="button" className="art-pix-overlay-trigger" onClick={() => { setOpen(false); anchor.current?.focus(); }}>Done</button></Popover></>;
}
