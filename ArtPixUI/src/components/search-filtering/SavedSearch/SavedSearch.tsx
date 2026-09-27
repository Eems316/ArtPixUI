import { useId, useState } from "react";
import { TextInput } from "../../forms-inputs/TextInput/TextInput.js";
import { Button } from "../../buttons-actions/Button/Button.js";
import { cloneConfiguration, type SearchConfiguration } from "../_shared/model.js";
import "../_shared/search.css";
export type SavedSearchEntry = { id: string; name: string; configuration: SearchConfiguration };
export type SavedSearchProps = { entries: SavedSearchEntry[]; current: SearchConfiguration; onSave: (name: string, configuration: SearchConfiguration) => void; onLoad: (configuration: SearchConfiguration, entry: SavedSearchEntry) => void; onRemove?: (id: string) => void; disabled?: boolean; label?: string };
/** Persistence, IDs and duplicate-name policy belong to the consumer. */
export function SavedSearch({ entries, current, onSave, onLoad, onRemove, disabled, label = "Saved searches" }: SavedSearchProps) {
 const [name, setName] = useState(""); const id = useId();
 return <section className="art-pix-search-surface art-pix-search-stack" aria-labelledby={`${id}-title`}><h3 id={`${id}-title`} style={{ margin: 0 }}>{label}</h3><label htmlFor={`${id}-name`}>Name this search</label><TextInput id={`${id}-name`} value={name} maxLength={100} disabled={disabled} onChange={event => setName(event.target.value)} /><Button disabled={disabled || !name.trim()} onClick={() => { onSave(name.trim(), cloneConfiguration(current)); setName(""); }}>Save current search</Button>{entries.length ? <ul className="art-pix-search-list">{entries.map(entry => <li key={entry.id} className="art-pix-search-row"><button type="button" className="art-pix-search-list-item" disabled={disabled} onClick={() => onLoad(cloneConfiguration(entry.configuration), entry)}>{entry.name}</button>{onRemove && <button type="button" className="art-pix-filter-chip" disabled={disabled} aria-label={`Remove saved search: ${entry.name}`} onClick={() => onRemove(entry.id)}>×</button>}</li>)}</ul> : <p>No saved searches yet.</p>}</section>;
}
