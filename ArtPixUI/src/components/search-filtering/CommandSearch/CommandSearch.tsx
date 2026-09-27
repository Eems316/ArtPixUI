import { useState } from "react";
import { CommandMenu, type CommandMenuProps } from "../../overlays-menus/CommandMenu/CommandMenu.js";
import { Button } from "../../buttons-actions/Button/Button.js";
export type CommandSearchProps = Omit<CommandMenuProps, "open" | "onOpenChange"> & { triggerLabel?: string; disabled?: boolean };
/** Explicit launcher; no global keyboard shortcut is installed. */
export function CommandSearch({ triggerLabel = "Search commands", disabled, ...props }: CommandSearchProps) {
 const [open, setOpen] = useState(false);
 return <><Button variant="secondary" disabled={disabled} aria-haspopup="dialog" aria-expanded={open && !disabled} onClick={() => setOpen(true)}>{triggerLabel}</Button><CommandMenu {...props} open={open && !disabled} onOpenChange={setOpen} /></>;
}
