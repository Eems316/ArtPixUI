import "../_shared/search.css";
export type FilterChip = { id: string; label: string; disabled?: boolean };
export type FilterChipsProps = { items: FilterChip[]; onRemove: (id: string) => void; label?: string; disabled?: boolean };
export function FilterChips({ items, onRemove, label = "Active filters", disabled }: FilterChipsProps) {
 return <ul aria-label={label} tabIndex={-1} className="art-pix-search-row" style={{ listStyle: "none", padding: 0, margin: 0 }}>{items.map(item => <li key={item.id}><button type="button" className="art-pix-filter-chip" disabled={disabled || item.disabled} aria-label={`Remove filter: ${item.label}`} onClick={event => { const parent = event.currentTarget.closest("ul"); const controls = Array.from(parent?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []); const index = controls.indexOf(event.currentTarget); (controls[index + 1] ?? controls[index - 1] ?? parent)?.focus(); onRemove(item.id); }}>{item.label}<span aria-hidden="true">×</span></button></li>)}</ul>;
}
