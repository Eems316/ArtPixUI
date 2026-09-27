import { useEffect, useId, useRef, useState } from "react";
import { Dialog } from "../Dialog/Dialog.js";
import { SearchInput } from "../../search-filtering/SearchInput/SearchInput.js";
import { matchesQuery } from "../../search-filtering/_shared/model.js";
import { nextOptionIndex } from "../_shared/geometry.js";
export type CommandItem = { id: string; label: string; description?: string; keywords?: string[]; disabled?: boolean; onSelect: () => void };
export type CommandMenuProps = { open: boolean; onOpenChange: (open: boolean) => void; commands: CommandItem[]; title?: string; placeholder?: string; emptyText?: string };
export function CommandMenu({ open, onOpenChange, commands, title = "Search commands", placeholder = "Type a command…", emptyText = "No matching commands" }: CommandMenuProps) {
 // Unmount search state between sessions so each opening starts fresh.
 return <Dialog open={open} onOpenChange={onOpenChange} title={title} initialFocus="[data-command-input]">{open && <CommandOptions commands={commands} onOpenChange={onOpenChange} placeholder={placeholder} emptyText={emptyText} />}</Dialog>;
}
function CommandOptions({ commands, onOpenChange, placeholder, emptyText }: Pick<CommandMenuProps, "commands" | "onOpenChange" | "placeholder" | "emptyText">) {
 const [query, setQuery] = useState(""); const [active, setActive] = useState<string>(); const id = useId(); const list = useRef<HTMLDivElement>(null);
 const matches = commands.filter(command => matchesQuery(command.label, query, command.keywords));
 const enabled = matches.filter(command => !command.disabled);
 const current = enabled.find(command => command.id === active) ?? enabled[0];
 useEffect(() => { if (current) list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" }); }, [current]);
 const choose = (command: CommandItem) => { if (command.disabled) return; onOpenChange(false); command.onSelect(); };
 return <div className="art-pix-search-stack"><label htmlFor={`${id}-input`}>Find a command</label><SearchInput data-command-input id={`${id}-input`} role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls={`${id}-list`} aria-activedescendant={current ? `${id}-option-${matches.indexOf(current)}` : undefined} value={query} placeholder={placeholder} onChange={event => { setQuery(event.target.value); setActive(undefined); }} onKeyDown={event => {
  if (event.nativeEvent.isComposing) return;
  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) { event.preventDefault(); const direction = event.key === "Home" ? "first" : event.key === "End" ? "last" : event.key === "ArrowDown" ? "next" : "previous"; setActive(enabled[nextOptionIndex(enabled.length, enabled.findIndex(command => command.id === current?.id), direction)]?.id); }
  if (event.key === "Enter") { event.preventDefault(); if (current) choose(current); }
 }}/><div ref={list} role="listbox" id={`${id}-list`} aria-label="Commands" className="art-pix-search-list art-pix-command-options">{matches.map((command, index) => <div id={`${id}-option-${index}`} key={command.id} role="option" aria-selected={current?.id === command.id} aria-disabled={command.disabled || undefined} className="art-pix-search-list-item" onPointerDown={event => event.preventDefault()} onPointerMove={() => { if (!command.disabled) setActive(command.id); }} onClick={() => choose(command)}>{command.label}{command.description && <small style={{ display: "block" }}>{command.description}</small>}</div>)}</div>{!matches.length && <p role="status">{emptyText}</p>}</div>;
}
