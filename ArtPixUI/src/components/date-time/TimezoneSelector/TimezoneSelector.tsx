import { useId } from "react";
import { validZone } from "../_shared/date.js";
import "../_shared/date.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type TimezoneSelectorProps = {
    value: string;
    onChange: (zone: string) => void;
    label?: string;
    zones?: string[];
    disabled?: boolean;
};
export function TimezoneSelector({ value, onChange, label = "Timezone", zones = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Australia/Sydney"], disabled }: TimezoneSelectorProps) { const id = useId(); const choices = [...new Set([value, ...zones])].filter(validZone); return <div className="art-pix-date-stack"><label htmlFor={id}>{label}</label><select id={id} className="art-pix-text-input" value={validZone(value) ? value : ""} disabled={disabled} onChange={event => onChange(event.target.value)}>{!validZone(value) && <option value="" disabled>Select a valid timezone</option>}{choices.map(zone => <option key={zone}>{zone}</option>)}</select></div>; }
