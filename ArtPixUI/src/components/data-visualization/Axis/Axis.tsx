import { useChart, scale, ticks, format } from "../_shared/chart.js";
export type AxisProps = {
    orientation?: "x" | "y";
    labels?: string[];
    label?: string;
    formatValue?: (value: number) => string;
    radial?: {
        cx: number;
        cy: number;
        radius: number;
    };
};
export function Axis({ orientation = "x", labels, label, formatValue = format, radial }: AxisProps) {
    const c = useChart(), x = orientation === "x";
    const range = x ? c.xDomain : c.yDomain;
    const values = labels ? labels.map((_, i) => i) : ticks(range);
    const bottom = c.height - c.bottom;
    if (radial)
        return <g aria-hidden="true">{labels?.map((text, i) => { const angle = i / labels.length * Math.PI * 2, dx = Math.sin(angle) * radial.radius, dy = -Math.cos(angle) * radial.radius; return <g key={i}><line x1={radial.cx} y1={radial.cy} x2={radial.cx + dx} y2={radial.cy + dy} stroke="#c8b983"/><text x={radial.cx + dx * 1.25} y={radial.cy + dy * 1.25} textAnchor="middle"><title>{text}</title>{text.length > 14 ? text.slice(0, 13) + "…" : text}</text></g>; })}</g>;
    return <g aria-hidden="true"><line x1={c.left} y1={x ? bottom : c.top} x2={x ? c.width - c.right : c.left} y2={bottom} stroke="currentColor"/>{values.map((v, i) => { const pos = scale(v, range, x ? c.left : bottom, x ? c.width - c.right : c.top); const text = labels?.[i] ?? formatValue(v); return <text key={i} x={x ? pos : c.left - 8} y={x ? bottom + 20 : pos + 4} textAnchor={x ? "middle" : "end"}><title>{text}</title>{text.length > 12 ? text.slice(0, 11) + "…" : text}</text>; })}{label && <text x={x ? c.width / 2 : 12} y={x ? c.height - 8 : c.height / 2} transform={x ? undefined : `rotate(-90 12 ${c.height / 2})`} textAnchor="middle">{label}</text>}</g>;
}
