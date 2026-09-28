import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as ui from "../dist/art-pix-ui.js";
const require = createRequire(import.meta.url);
async function helpers(path) {
 const source=readFileSync(new URL(path,import.meta.url),"utf8").replace('"react"',JSON.stringify(pathToFileURL(require.resolve("react")).href));
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 return import("data:text/javascript;base64,"+Buffer.from(js).toString("base64"));
}
const date=await helpers("../src/components/date-time/_shared/date.ts");
const chart=await helpers("../src/components/data-visualization/_shared/chart.tsx");
for (const good of ["0001-01-01","2024-02-29","2026-09-27","9999-12-31"]) assert.equal(date.isoDate(date.parseDate(good)),good);
for (const bad of ["2025-02-29","2026-02-30","2026-13-01","0000-01-01","2026-1-1","2026-09-27T00:00:00Z"]) assert.equal(date.parseDate(bad),null,bad);
assert.equal(date.addDays("2024-02-28",1),"2024-02-29");
assert.equal(date.addDays("2026-12-31",1),"2027-01-01");
assert.equal(date.moveMonth("2026-01",-1),"2025-12");
assert.equal(date.moveMonth("0001-01",-1),"0001-01");
assert.equal(date.monthDays("2026-09").length,42);
assert.equal(date.monthDays("2026-09")[0],"2026-08-31");
assert.equal(date.monthDays("2026-09",0)[0],"2026-08-30");
for (const month of ["0001-01","9999-12"]) { const days=date.monthDays(month).filter(Boolean); assert.equal(new Set(days).size,days.length); }
assert(date.validTime("23:59")); assert(!date.validTime("24:00")); assert(!date.validTime("9:00"));
assert(date.validZone("UTC")); assert(!date.validZone("Not/AZone"));
assert(date.instant("2026-09-27T12:00:00-04:00")); assert.equal(date.instant("2026-09-27T12:00:00"),null); assert.equal(date.instant("2026-02-30T12:00:00Z"),null); assert.equal(date.instant("2026-09-27T24:00:00Z"),null);
assert.equal(date.clockText(3661),"01:01:01"); assert.equal(date.clockText(-4),"00:00:00");
assert.deepEqual(chart.domain([]),[0,1]); assert.deepEqual(chart.domain([-5,10],true),[-5,10]); assert.deepEqual(chart.domain([NaN,Infinity,5],true),[0,5]);
for (const input of [[5],[0],[Number.MAX_VALUE],[-Number.MAX_VALUE],[-Number.MAX_VALUE,Number.MAX_VALUE]]) { const domain=chart.domain(input); assert(domain.every(Number.isFinite)); assert(domain[1]>domain[0]); assert(chart.ticks(domain).every(Number.isFinite)); for(const value of input) assert(Number.isFinite(chart.scale(value,domain,0,500))); }
assert.equal(chart.scale(5,[0,10],0,100),50);
const render=(name,props,children)=>renderToStaticMarkup(h(ui[name],props,children));
const onChange=()=>{};
const cases={
 Timestamp:{value:"2026-09-27T12:00:00Z"},DateBadge:{value:"2026-09-27"},
 DateInput:{label:"Date",value:"2026-09-27",onChange},TimeInput:{label:"Time",value:"09:30",onChange},DurationInput:{value:1800,onChange},TimezoneSelector:{value:"UTC",onChange},
 CalendarHeader:{month:"2026-09",onMonthChange:onChange},CalendarGrid:{month:"2026-09",value:"2026-09-27",onMonthChange:onChange,onChange},Calendar:{value:"2026-09-27",onChange},InlineCalendar:{value:"2026-09-27",onChange},
 MonthPicker:{value:"2026-09",onChange},YearPicker:{value:2026,onChange},WeekPicker:{value:"2026-W39",onChange},TimePicker:{label:"Time",value:"09:30",onChange},DatePicker:{value:"2026-09-27",onChange},DatePickerPopup:{value:"2026-09-27",onChange},
 CalendarRange:{value:{start:"2026-09-24",end:"2026-09-28"},onChange},DateRangePicker:{value:{start:"2026-09-24",end:"2026-09-28"},onChange},TimeRangePicker:{value:{start:"09:00",end:"17:00"},onChange},DateTimePicker:{value:{date:"2026-09-27",time:"09:30",timeZone:"UTC"},onChange},DateFilter:{value:{start:"",end:""},onChange},
 Countdown:{target:"2026-09-27T12:00:00Z"},Timer:{},Scheduler:{events:[],onCreate:onChange},
 ChartContainer:{title:"Surface",children:h("circle",{cx:10,cy:10,r:4})},ChartTitle:{children:"Chart title"},Axis:{},Grid:{},Legend:{items:[{id:"a",label:"Forest"}]},DataLabel:{x:10,y:20,value:5},ChartTooltip:{children:"Value 5"},ChartEmptyState:{},ChartLoadingState:{},
 Meter:{label:"Supplies",value:50},Gauge:{label:"Progress",value:50},TrendIndicator:{value:-5},Temperature:{value:20},
 BarChart:{title:"Bars",data:[{label:"Positive",value:10},{label:"Negative",value:-5}]},HorizontalBarChart:{title:"Horizontal",data:[{label:"Zero",value:0}]},
 StackedBarChart:{title:"Stacked",labels:["A","B"],series:[{id:"a",label:"First",values:[10,-5]},{id:"b",label:"Second",values:[5,-4]}]},
 LineChart:{title:"Lines",labels:["A","B","C"],series:[{id:"a",label:"First",values:[10,NaN,5]}]},
 AreaChart:{title:"Area",labels:["A","B"],series:[{id:"a",label:"First",values:[10,-5]}]},
 ScatterPlot:{title:"Points",data:[{label:"One",x:1,y:2}]},BubbleChart:{title:"Bubbles",data:[{label:"One",x:1,y:2,size:5}]},
 PieChart:{title:"Pie",data:[{label:"A",value:3},{label:"B",value:7}]},DonutChart:{title:"Donut",data:[{label:"A",value:10}]},
 RadarChart:{title:"Radar",labels:["A","B","C"],series:[{id:"a",label:"First",values:[3,4,5]}]},
 LayeredBackground:{children:"Readable content"},Stripes:{children:"Striped content"},DottedBackground:{children:"Dotted content"}
};
assert.equal(Object.keys(cases).length,50);
for(const [name,props]of Object.entries(cases)) { assert.equal(typeof ui[name],"function",name); const html=render(name,props); assert(html.length,name); assert(!html.includes("NaN"),name); assert(!html.includes("Infinity"),name); }
const calendar=render("Calendar",{...cases.Calendar,min:"2026-09-10",max:"2026-09-30"});
assert.equal((calendar.match(/data-date=/g)||[]).length,42);
assert.equal((calendar.match(/tabindex="0"/g)||[]).length,1);
assert.match(calendar,/aria-pressed="true"/);
assert.match(calendar,/disabled=""/);
assert.match(render("DateInput",{...cases.DateInput,disabled:true,required:true}),/disabled=""/);
assert.match(render("DatePickerPopup",cases.DatePickerPopup),/aria-expanded="false"/);
assert.match(render("DateRangePicker",{...cases.DateRangePicker,value:{start:"2026-10-01",end:"2026-09-01"}}),/aria-invalid="true"/);
assert.match(render("TimeRangePicker",{...cases.TimeRangePicker,value:{start:"17:00",end:"09:00"}}),/aria-invalid="true"/);
assert(!render("TimeRangePicker",{...cases.TimeRangePicker,value:{start:"17:00",end:"09:00"},allowOvernight:true}).includes('aria-invalid="true"'));
assert.match(render("Timestamp",{value:"2026-09-27T12:00:00Z",options:{year:"numeric"}}),/>2026</);
assert.match(render("Timestamp",{value:"bad"}),/Invalid date/);
assert.match(render("DateFilter",cases.DateFilter),/disabled=""/);
assert.match(render("Scheduler",{events:[{id:"x",title:"Trail day",date:"2026-09-27",time:"10:00",timeZone:"UTC"}],initialDate:"2026-09-27",onCreate:onChange}),/Trail day/);
assert.match(render("Timer",{}),/00:00:00/);
assert.match(render("Countdown",cases.Countdown),/aria-live="off"/);
for(const name of ["BarChart","HorizontalBarChart","StackedBarChart","LineChart","AreaChart","ScatterPlot","BubbleChart","PieChart","DonutChart","RadarChart"]) {
 const html=render(name,cases[name]); assert.match(html,/View chart data/); assert.match(html,/<caption>Full chart values/); assert.match(html,/tabindex="0"/); assert.match(html,/aria-label=/);
 assert.match(render(name,{...cases[name],loading:true}),/aria-busy="true"/);
 assert.match(render(name,{...cases[name],data:[],series:[]}),/No chart data|Supply finite|Provide positive|Radar needs/);
}
assert.match(render("Gauge",{label:"Extreme",value:Number.MAX_VALUE,min:-Number.MAX_VALUE,max:Number.MAX_VALUE}),/stroke-dasharray="100 100"/);
assert.match(render("Meter",{label:"Broken",value:1,min:5,max:5}),/Invalid range/);
assert.match(render("PieChart",{title:"Bad",data:[{label:"Negative",value:-1},{label:"Invalid",value:NaN}]}),/positive finite/);
assert.match(render("DonutChart",cases.DonutChart),/r="65"/);
assert.match(render("Legend",{items:[{id:"a",label:"A",hidden:true}],onToggle:onChange}),/aria-pressed="false"/);
const src=path=>readFileSync(new URL(path,import.meta.url),"utf8");
assert.match(src("../src/components/date-time/Timer/Timer.tsx"),/clearInterval/);
assert.match(src("../src/components/date-time/Countdown/Countdown.tsx"),/clearInterval/);
assert.match(src("../src/components/date-time/CalendarGrid/CalendarGrid.tsx"),/PageUp/);
console.log("Final sections: 50 export/SSR checks plus date parsing, boundaries, ranges, chart scales, geometry, labels, tables, loading/empty/invalid states passed. Live interaction checks remain manual.");
