import { useId, useState } from "react";
import { ChartContainer } from "../ChartContainer/ChartContainer.js";
import { Axis } from "../Axis/Axis.js";
import { Grid } from "../Grid/Grid.js";
import { Legend } from "../Legend/Legend.js";
import { DataLabel } from "../DataLabel/DataLabel.js";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip.js";
import { ChartEmptyState } from "../ChartEmptyState/ChartEmptyState.js";
import { ChartLoadingState } from "../ChartLoadingState/ChartLoadingState.js";
import { colors, domain, scale, format, defaultChart as c, type ChartDatum, type ChartPoint, type ChartSeries } from "./chart.js";
export type CommonChartProps = {
    title: string;
    description?: string;
    loading?: boolean;
    showLabels?: boolean;
};
export type ValueChartProps = CommonChartProps & {
    data: ChartDatum[];
    color?: string;
};
export type SeriesChartProps = CommonChartProps & {
    labels: string[];
    series: ChartSeries[];
};
export type PointChartProps = CommonChartProps & {
    data: ChartPoint[];
    color?: string;
};
const left = c.left, right = c.width - c.right, top = c.top, bottom = c.height - c.bottom;
function Table({ headers, rows }: {
    headers: string[];
    rows: (string | number)[][];
}) { return <details className="art-pix-chart-table"><summary>View chart data</summary><table><caption>Full chart values</caption><thead><tr>{headers.map((text, i) => <th key={i} scope="col">{text}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((value, j) => j === 0 ? <th key={j} scope="row">{value}</th> : <td key={j}>{typeof value === "number" ? String(value) : value}</td>)}</tr>)}</tbody></table></details>; }
export function Cartesian({ kind, title, description, loading, showLabels, data = [], labels = [], series = [], color = colors[0] }: CommonChartProps & {
    kind: "bar" | "horizontal" | "stacked" | "line" | "area" | "scatter" | "bubble";
    data?: (ChartDatum | ChartPoint)[];
    labels?: string[];
    series?: ChartSeries[];
    color?: string;
}) {
    const id = useId();
    const [inspection, setInspection] = useState<string>();
    const [hidden, setHidden] = useState<string[]>([]);
    const point = kind === "scatter" || kind === "bubble", horizontal = kind === "horizontal", multi = ["stacked", "line", "area"].includes(kind);
    const points = (data as ChartPoint[]).filter(d => Number.isFinite(d.x) && Number.isFinite(d.y) && (kind !== "bubble" || (Number.isFinite(d.size) && d.size! > 0)));
    const maximumSize = points.reduce((maximum, datum) => Math.max(maximum, datum.size ?? 0), 0) || 1;
    const bars = (data as ChartDatum[]).filter(d => Number.isFinite(d.value));
    const visible = series.filter(s => !hidden.includes(s.id));
    const categories = multi ? labels : bars.map(d => d.label);
    const values = multi ? visible.flatMap(s => s.values.slice(0, labels.length).filter(Number.isFinite)) : bars.map(d => d.value);
    const stacks = labels.map((_, i) => { let pos = 0, neg = 0; return visible.map(s => { const v = s.values[i]; if (!Number.isFinite(v))
        return null; const start = v >= 0 ? pos : neg; const end = start + v; if (!Number.isFinite(end))
        return null; if (v >= 0)
        pos = end;
    else
        neg = end; return { start, end, value: v }; }); });
    const valueDomain = domain(kind === "stacked" ? stacks.flatMap(stack => stack.flatMap(s => s ? [s.start, s.end] : [])) : values, true);
    const catDomain = [-.5, Math.max(.5, categories.length - .5)] as const;
    const xd = point ? domain(points.map(p => p.x)) : horizontal ? valueDomain : catDomain;
    const yd = point ? domain(points.map(p => p.y)) : horizontal ? catDomain : valueDomain;
    const sx = (n: number) => scale(n, xd, left, right), sy = (n: number) => scale(n, yd, bottom, top);
    const bw = Math.min(48, (right - left) / Math.max(categories.length, 1) * .65), bh = Math.min(40, (bottom - top) / Math.max(categories.length, 1) * .65);
    const mark = (text: string) => ({ tabIndex: 0, role: "img", "aria-label": text, "aria-describedby": id, onPointerEnter: () => setInspection(text), onPointerLeave: () => setInspection(undefined), onFocus: () => setInspection(text), onBlur: () => setInspection(undefined) });
    const legend = multi ? <Legend items={series.map((s, i) => ({ ...s, color: s.color ?? colors[i % colors.length], hidden: hidden.includes(s.id) }))} onToggle={key => setHidden(list => list.includes(key) ? list.filter(k => k !== key) : [...list, key])}/> : null;
    if (loading)
        return <ChartLoadingState label={`Loading ${title}`}/>;
    if (point ? !points.length : multi ? !labels.length || !series.some(s => s.values.slice(0, labels.length).some(Number.isFinite)) : !bars.length)
        return <ChartEmptyState title={title}/>;
    const rows = point ? points.map(p => [p.label, p.x, p.y, ...(kind === "bubble" ? [p.size!] : [])]) : multi ? labels.map((label, i) => [label, ...series.map(s => Number.isFinite(s.values[i]) ? s.values[i] : "Missing")]) : bars.map(d => [d.label, d.value]);
    return <ChartContainer title={title} description={description} xDomain={xd} yDomain={yd} footer={<>{legend}<ChartTooltip id={id}>{inspection}</ChartTooltip><Table headers={point ? ["Label", "X", "Y", ...(kind === "bubble" ? ["Size"] : [])] : multi ? ["Category", ...series.map(s => s.label)] : ["Category", "Value"]} rows={rows}/></>}>
 <Grid vertical={point || horizontal} horizontal={!horizontal}/><Axis orientation="x" labels={!point && !horizontal ? categories : undefined}/><Axis orientation="y" labels={horizontal ? categories : undefined}/>
 {!point && !multi && bars.map((d, i) => <g key={i}><rect {...mark(`${d.label}: ${d.value}`)} x={horizontal ? Math.min(sx(0), sx(d.value)) : sx(i) - bw / 2} y={horizontal ? sy(i) - bh / 2 : Math.min(sy(0), sy(d.value))} width={horizontal ? Math.abs(sx(d.value) - sx(0)) : bw} height={horizontal ? bh : Math.abs(sy(d.value) - sy(0))} fill={color} stroke="#2c3025" rx="2"/>{showLabels && <DataLabel x={horizontal ? sx(d.value) : sx(i)} y={horizontal ? sy(i) - bh / 2 - 5 : sy(d.value) - 5} value={d.value}/>}</g>)}
 {kind === "stacked" && stacks.map((stack, i) => stack.map((segment, j) => segment && <g key={`${i}-${j}`}><rect {...mark(`${labels[i]}, ${visible[j].label}: ${segment.value}`)} x={sx(i) - bw / 2} y={Math.min(sy(segment.start), sy(segment.end))} width={bw} height={Math.abs(sy(segment.end) - sy(segment.start))} fill={visible[j].color ?? colors[series.indexOf(visible[j]) % colors.length]} stroke="#fff9e6"/>{showLabels && <DataLabel x={sx(i)} y={(sy(segment.start) + sy(segment.end)) / 2} value={segment.value} />}</g>))}
 {(kind === "line" || kind === "area") && visible.map(s => {
            const tone = s.color ?? colors[series.indexOf(s) % colors.length];
            const segments: {
                x: number;
                y: number;
                v: number;
                i: number;
            }[][] = [];
            let segment: typeof segments[number] = [];
            labels.forEach((_, i) => { const v = s.values[i]; if (Number.isFinite(v))
                segment.push({ x: sx(i), y: sy(v), v, i });
            else if (segment.length) {
                segments.push(segment);
                segment = [];
            } });
            if (segment.length)
                segments.push(segment);
            return <g key={s.id}>{segments.map((group, i) => <g key={i}>{kind === "area" && <path d={`M${group[0].x},${sy(0)} L${group.map(p => `${p.x},${p.y}`).join(" L")} L${group.at(-1)!.x},${sy(0)} Z`} fill={tone} opacity=".18" aria-hidden="true"/>}<polyline points={group.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke={tone} strokeWidth="3" aria-hidden="true"/>{group.map(p => <g key={p.i}><circle {...mark(`${labels[p.i]}, ${s.label}: ${p.v}`)} cx={p.x} cy={p.y} r="5" fill={tone} stroke="#fff9e6"/>{showLabels && <DataLabel x={p.x} y={p.y - 10} value={p.v}/>}</g>)}</g>)}</g>;
        })}
 {point && points.map((p, i) => <g key={i}><circle {...mark(`${p.label}: x ${p.x}, y ${p.y}${kind === "bubble" ? `, size ${p.size}` : ""}`)} cx={sx(p.x)} cy={sy(p.y)} r={kind === "bubble" ? 4 + 20 * Math.sqrt(p.size! / maximumSize) : 6} fill={color} fillOpacity=".65" stroke="#2c3025"/>{showLabels && <DataLabel x={sx(p.x)} y={sy(p.y) - 12} value={p.y}/>}</g>)}
 </ChartContainer>;
}
export function Circular({ title, description, loading, data, showLabels, donut = false, centerLabel }: Omit<ValueChartProps, "color"> & {
    donut?: boolean;
    centerLabel?: string;
}) {
    const [inspection, setInspection] = useState<string>();
    const id = useId();
    const good = data.filter(d => Number.isFinite(d.value) && d.value > 0);
    const maximum = good.reduce((maximum, datum) => Math.max(maximum, datum.value), 1);
    const total = good.reduce((sum, d) => sum + d.value / maximum, 0);
    const cumulative = [0];
    for (const d of good)
        cumulative.push(cumulative.at(-1)! + d.value / maximum / total);
    if (loading)
        return <ChartLoadingState label={`Loading ${title}`}/>;
    if (!good.length)
        return <ChartEmptyState title={title} message="Provide positive finite values for slices."/>;
    return <ChartContainer title={title} description={description} footer={<><Legend items={good.map((d, i) => ({ id: String(i), label: d.label, color: colors[i % colors.length] }))}/><ChartTooltip id={id}>{inspection}</ChartTooltip><Table headers={["Category", "Value"]} rows={good.map(d => [d.label, d.value])}/></>}>{good.map((d, i) => {
            const start = -Math.PI / 2 + cumulative[i] * Math.PI * 2, fraction = d.value / maximum / total, end = -Math.PI / 2 + cumulative[i + 1] * Math.PI * 2;
            const cx = 320, cy = 164, r = 120;
            const a = [cx + r * Math.cos(start), cy + r * Math.sin(start)], b = [cx + r * Math.cos(end), cy + r * Math.sin(end)];
            const text = `${d.label}: ${d.value} (${format(fraction * 100)}%)`;
            const props = { fill: colors[i % colors.length], stroke: "#fff9e6", strokeWidth: 2, tabIndex: 0, role: "img", "aria-label": text, "aria-describedby": id, onFocus: () => setInspection(text), onBlur: () => setInspection(undefined), onPointerEnter: () => setInspection(text), onPointerLeave: () => setInspection(undefined) };
            return <g key={i}>{good.length === 1 ? <circle {...props} cx={cx} cy={cy} r={r}/> : <path {...props} d={`M${cx},${cy} L${a.join(",")} A${r},${r} 0 ${fraction > .5 ? 1 : 0} 1 ${b.join(",")} Z`}/>}{showLabels && <DataLabel x={cx + Math.cos((start + end) / 2) * 90} y={cy + Math.sin((start + end) / 2) * 90} value={d.value}/>}</g>;
        })}{donut && <circle cx="320" cy="164" r="65" fill="#fff9e6" pointerEvents="none" aria-hidden="true"/>}{donut && centerLabel && <text x="320" y="164" textAnchor="middle" pointerEvents="none">{centerLabel}</text>}</ChartContainer>;
}
export function Radar({ title, description, loading, labels, series, showLabels }: SeriesChartProps) {
    const [hidden, setHidden] = useState<string[]>([]);
    const [inspection, setInspection] = useState<string>();
    const id = useId();
    const visible = series.filter(s => !hidden.includes(s.id));
    const max = visible.flatMap(s => s.values.slice(0, labels.length).filter(v => Number.isFinite(v) && v >= 0)).reduce((maximum, value) => Math.max(maximum, value), 1);
    const point = (i: number, ratio: number) => [320 + Math.sin(i / labels.length * Math.PI * 2) * 110 * ratio, 160 - Math.cos(i / labels.length * Math.PI * 2) * 110 * ratio];
    if (loading)
        return <ChartLoadingState label={`Loading ${title}`}/>;
    if (labels.length < 3 || !series.some(s => labels.every((_, i) => Number.isFinite(s.values[i]) && s.values[i] >= 0)))
        return <ChartEmptyState title={title} message="Radar needs at least three categories and complete nonnegative series."/>;
    return <ChartContainer title={title} description={description} footer={<><Legend items={series.map((s, i) => ({ ...s, color: s.color ?? colors[i % colors.length], hidden: hidden.includes(s.id) }))} onToggle={key => setHidden(list => list.includes(key) ? list.filter(k => k !== key) : [...list, key])}/><ChartTooltip id={id}>{inspection}</ChartTooltip><Table headers={["Category", ...series.map(s => s.label)]} rows={labels.map((label, i) => [label, ...series.map(s => Number.isFinite(s.values[i]) ? s.values[i] : "Missing")])}/></>}>
 <Grid radial={{ cx: 320, cy: 160, radius: 110, count: labels.length }}/>{[.25, .5, .75, 1].map(r => <DataLabel key={r} x={325} y={160 - 110 * r} value={max * r} anchor="start"/>)}
 <Axis labels={labels} radial={{ cx: 320, cy: 160, radius: 110 }}/>
 {visible.filter(s => labels.every((_, i) => Number.isFinite(s.values[i]) && s.values[i] >= 0)).map(s => <g key={s.id}><polygon points={labels.map((_, i) => point(i, s.values[i] / max).join(",")).join(" ")} fill={s.color ?? colors[series.indexOf(s) % colors.length]} fillOpacity=".15" stroke={s.color ?? colors[series.indexOf(s) % colors.length]} aria-hidden="true"/>{labels.map((label, i) => { const p = point(i, s.values[i] / max), text = `${label}, ${s.label}: ${s.values[i]}`; return <g key={i}><circle cx={p[0]} cy={p[1]} r="5" fill={s.color ?? colors[series.indexOf(s) % colors.length]} tabIndex={0} role="img" aria-label={text} aria-describedby={id} onFocus={() => setInspection(text)} onBlur={() => setInspection(undefined)} onPointerEnter={() => setInspection(text)} onPointerLeave={() => setInspection(undefined)}/>{showLabels && <DataLabel x={p[0]} y={p[1] - 10} value={s.values[i]}/>}</g>; })}</g>)}
 </ChartContainer>;
}
