import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CircularProgress } from "../dist/art-pix-ui.js";

const render = props => renderToStaticMarkup(createElement(CircularProgress, props));
for (const size of ["small", "medium", "large"]) {
  for (const [value, max, expected, safeMax] of [[0,100,0,100],[40,100,40,100],[100,100,100,100],[150,100,100,100],[-3,100,0,100],[NaN,100,0,100],[Infinity,100,100,100],[-Infinity,100,0,100],[3,8,3,8],[5,0,5,100],[5,-2,5,100],[5,Infinity,5,100],[5,NaN,5,100]]) {
    const html = render({ value, max, size, label: "Packing", showPercentage: true });
    for (const attr of ['role="progressbar"', 'aria-label="Packing"', 'aria-valuemin="0"', `aria-valuenow="${expected}"`, `aria-valuemax="${safeMax}"`, `stroke-dashoffset="${100 - expected / safeMax * 100}"`, `art-pix-circular-progress--${size}`]) assert(html.includes(attr), html);
    assert(html.includes(`${Math.round(expected / safeMax * 100)}%`));
    assert(!html.includes("tabindex"));
    assert(html.includes('pathLength="100"'));
    assert(html.includes('transform="rotate(-90 50 50)"'));
  }
}
const defaults = render({ value: 20 });
assert(defaults.includes('aria-label="Progress"'));
assert(!defaults.includes('class="art-pix-circular-progress__percentage"'));
const custom = render({ value: 10, className: "custom", "aria-label": "Download", "aria-labelledby": "external", id: "ring" });
for (const expected of ['aria-label="Download"', 'aria-labelledby="external"', 'id="ring"', 'art-pix-circular-progress--medium custom']) assert(custom.includes(expected));
const css = readFileSync(new URL("../src/components/loading-progress/CircularProgress/CircularProgress.css", import.meta.url), "utf8");
assert.match(css, /prefers-reduced-motion: reduce[^}]+transition: none/);
assert(css.includes("stroke-linecap: butt"));
console.log("CircularProgress: 39 value/size cases, arc geometry, labels, props, percentage and reduced-motion CSS checks passed.");
