import { colors } from "../_shared/chart.js";
import "../_shared/chart.css";
export type LegendProps = {
    items: {
        id: string;
        label: string;
        color?: string;
        hidden?: boolean;
    }[];
    onToggle?: (id: string) => void;
};
export function Legend({ items, onToggle }: LegendProps) { return <ul className="art-pix-chart-legend" aria-label="Chart legend">{items.map((item, i) => { const content = <><span data-swatch="" aria-hidden="true" style={{ background: item.color ?? colors[i % colors.length] }}/>{item.label}</>; return <li key={item.id}>{onToggle ? <button type="button" aria-pressed={!item.hidden} onClick={() => onToggle(item.id)}>{content}</button> : content}</li>; })}</ul>; }
