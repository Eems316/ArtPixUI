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
const render=(name,props,children)=>renderToStaticMarkup(h(ui[name],props,children));
const onChange=()=>{};
const cases={
 Timestamp:{value:"2026-09-27T12:00:00Z"},DateBadge:{value:"2026-09-27"},
 DateInput:{label:"Date",value:"2026-09-27",onChange},TimeInput:{label:"Time",value:"09:30",onChange},DurationInput:{value:1800,onChange},TimezoneSelector:{value:"UTC",onChange},
 CalendarHeader:{month:"2026-09",onMonthChange:onChange},CalendarGrid:{month:"2026-09",value:"2026-09-27",onMonthChange:onChange,onChange},Calendar:{value:"2026-09-27",onChange},InlineCalendar:{value:"2026-09-27",onChange},
 MonthPicker:{value:"2026-09",onChange},YearPicker:{value:2026,onChange},WeekPicker:{value:"2026-W39",onChange},TimePicker:{label:"Time",value:"09:30",onChange},DatePicker:{value:"2026-09-27",onChange},DatePickerPopup:{value:"2026-09-27",onChange},
 CalendarRange:{value:{start:"2026-09-24",end:"2026-09-28"},onChange},DateRangePicker:{value:{start:"2026-09-24",end:"2026-09-28"},onChange},TimeRangePicker:{value:{start:"09:00",end:"17:00"},onChange},DateTimePicker:{value:{date:"2026-09-27",time:"09:30",timeZone:"UTC"},onChange},DateFilter:{value:{start:"",end:""},onChange},
 Countdown:{target:"2026-09-27T12:00:00Z"},Timer:{},Scheduler:{events:[],onCreate:onChange},

};
assert.equal(Object.keys(cases).length,24);
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
const src=path=>readFileSync(new URL(path,import.meta.url),"utf8");
assert.match(src("../src/components/date-time/Timer/Timer.tsx"),/clearInterval/);
assert.match(src("../src/components/date-time/Countdown/Countdown.tsx"),/clearInterval/);
assert.match(src("../src/components/date-time/CalendarGrid/CalendarGrid.tsx"),/PageUp/);
console.log("Date and time: 24 export/SSR checks, parsing, date boundaries, ranges, native semantics and static cleanup checks passed. Live interaction review remains pending.");
