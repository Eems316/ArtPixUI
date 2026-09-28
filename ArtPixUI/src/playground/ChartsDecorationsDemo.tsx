import { useState, type ReactNode } from "react";
import { ChartContainer, ChartTitle, Axis, Grid, Legend, DataLabel, ChartTooltip, ChartEmptyState, ChartLoadingState, Meter, Gauge, TrendIndicator, Temperature, BarChart, HorizontalBarChart, StackedBarChart, LineChart, AreaChart, ScatterPlot, BubbleChart, PieChart, DonutChart, RadarChart, LayeredBackground, Stripes, DottedBackground, Button } from "../index.js";
function Exhibit({ id, name, number, children }: {
    id: string;
    name: string;
    number: number;
    children: ReactNode;
}) { return <section className="playground-exhibit" id={`${id}-demo`} aria-labelledby={`${id}-heading`}><div className="playground-exhibit-heading"><span className="playground-number">{number}</span><h2 id={`${id}-heading`}>{name}</h2><span className="playground-kind">AWAITING REVIEW</span></div><div style={{ display: "grid", gap: 24, padding: 28, minWidth: 0 }}>{children}</div></section>; }
const bars = [{ label: "Maps", value: 12 }, { label: "Provisions", value: 24 }, { label: "Used", value: -8 }, { label: "Tools", value: 16 }];
const labels = ["Spring", "Summer", "Autumn", "Winter"];
const series = [{ id: "forest", label: "Forest", values: [12, 24, 18, 9] }, { id: "coast", label: "Coast", values: [8, 16, -4, 14] }];
const points = [{ label: "Mira", x: 3, y: 8, size: 4 }, { label: "Rowan", x: 8, y: 12, size: 12 }, { label: "Alex", x: 12, y: 6, size: 8 }, { label: "Eli", x: 5, y: 16, size: 6 }];
const shares = [{ label: "Forest", value: 42 }, { label: "Coast", value: 28 }, { label: "Mountains", value: 30 }];
export function ChartsDecorationsDemo() {
    const [hidden, setHidden] = useState<string[]>([]);
    return <>
    <Exhibit id="chart-container" name="Chart Container" number={161}><ChartContainer title="The plotting surface" description="A responsive SVG canvas with an accessible title."><rect x="68" y="28" width="548" height="246" fill="#f3e8c5"/></ChartContainer></Exhibit>
    <Exhibit id="chart-title" name="Chart Title" number={162}><figure><ChartTitle description="A caption that connects the chart to its meaning.">Trails explored this season</ChartTitle></figure></Exhibit>
    <Exhibit id="axis" name="Axis" number={163}><ChartContainer title="Shared axes" xDomain={[0, 100]} yDomain={[-50, 50]}><Axis label="Distance"/><Axis orientation="y" label="Elevation"/></ChartContainer></Exhibit>
    <Exhibit id="grid" name="Grid" number={164}><ChartContainer title="Shared grid" xDomain={[0, 100]} yDomain={[-50, 50]}><Grid vertical/><Axis /><Axis orientation="y"/></ChartContainer></Exhibit>
    <Exhibit id="legend" name="Legend" number={165}><Legend items={[{ id: "forest", label: "Forest", hidden: hidden.includes("forest") }, { id: "coast", label: "Coast", hidden: hidden.includes("coast") }]} onToggle={id => setHidden(list => list.includes(id) ? list.filter(value => value !== id) : [...list, id])}/><p>Legend state: {hidden.join(", ") || "All visible"}</p></Exhibit>
    <Exhibit id="data-label" name="Data Label" number={166}><ChartContainer title="Labels near their values"><DataLabel x={320} y={150} value={1234.5}/></ChartContainer></Exhibit>
    <Exhibit id="chart-tooltip" name="Chart Tooltip" number={167}><ChartTooltip>Forest route: 42 discoveries</ChartTooltip><p>Charts use this fixed inspection region for both pointer hover and keyboard focus.</p></Exhibit>
    <Exhibit id="chart-empty-state" name="Chart Empty State" number={168}><ChartEmptyState /></Exhibit>
    <Exhibit id="chart-loading-state" name="Chart Loading State" number={169}><ChartLoadingState /></Exhibit>
    <Exhibit id="meter" name="Meter" number={170}><Meter label="Supplies remaining" value={68}/><Meter label="Invalid range example" value={10} min={10} max={10}/></Exhibit>
    <Exhibit id="gauge" name="Gauge" number={171}><Gauge label="Route progress" value={72} unit="%"/></Exhibit>
    <Exhibit id="trend-indicator" name="Trend Indicator" number={172}><TrendIndicator label="Exploration" value={12.5}/><TrendIndicator label="Delays" value={-8} positiveIsGood={false}/><TrendIndicator value={0}/></Exhibit>
    <Exhibit id="temperature" name="Temperature" number={173}><Temperature value={21} min={-10} max={40}/><Temperature value={70} unit="F"/></Exhibit>
    <Exhibit id="bar-chart" name="Bar Chart" number={174}><BarChart title="Supplies gained and spent" data={bars} showLabels/><BarChart title="No supplies yet" data={[]}/></Exhibit>
    <Exhibit id="horizontal-bar-chart" name="Horizontal Bar Chart" number={175}><HorizontalBarChart title="Supplies by type" data={bars} showLabels/></Exhibit>
    <Exhibit id="stacked-bar-chart" name="Stacked Bar Chart" number={176}><StackedBarChart title="Trail supplies" labels={labels} series={series}/></Exhibit>
    <Exhibit id="line-chart" name="Line Chart" number={177}><LineChart title="Trail distance" labels={labels} series={series} showLabels/></Exhibit>
    <Exhibit id="area-chart" name="Area Chart" number={178}><AreaChart title="Supplies over time" labels={labels} series={series}/></Exhibit>
    <Exhibit id="scatter-plot" name="Scatter Plot" number={179}><ScatterPlot title="Distance and discoveries" data={points}/></Exhibit>
    <Exhibit id="bubble-chart" name="Bubble Chart" number={180}><BubbleChart title="Distance, discoveries, and group size" data={points}/></Exhibit>
    <Exhibit id="pie-chart" name="Pie Chart" number={181}><PieChart title="A share of discoveries" data={shares}/></Exhibit>
    <Exhibit id="donut-chart" name="Donut Chart" number={182}><DonutChart title="Discoveries around the valley" data={shares}/></Exhibit>
    <Exhibit id="radar-chart" name="Radar Chart" number={183}><RadarChart title="Explorer skills" labels={["Endurance", "Navigation", "Craft", "Observation", "Teamwork"]} series={[{ id: "mira", label: "Mira", values: [8, 9, 5, 8, 7] }, { id: "rowan", label: "Rowan", values: [6, 7, 9, 6, 9] }]}/></Exhibit>
    <Exhibit id="layered-background" name="Layered Background" number={184}><LayeredBackground><h3>Notes from Mossglen</h3><p>Quiet layers, readable content, no motion.</p><Button>Keep exploring</Button></LayeredBackground></Exhibit>
    <Exhibit id="stripes" name="Stripes" number={185}><Stripes stripeWidth={14}><div style={{ background: "#fff9e6", padding: 20, borderRadius: 10 }}><h3>A little texture</h3><p>A static stripe pattern behind your content.</p></div></Stripes></Exhibit>
    <Exhibit id="dotted-background" name="Dotted Background" number={186}><DottedBackground style={{ minHeight: 220, padding: 32, borderRadius: 16 }}><div style={{ background: "#fff9e6", border: "2px solid #2c3025", borderRadius: 14, boxShadow: "0 8px 0 #2c3025", padding: 24 }}><h3>A field of tiny details</h3><p>The dots are a CSS radial gradient repeated every eight pixels.</p></div></DottedBackground></Exhibit>
 </>;
}
