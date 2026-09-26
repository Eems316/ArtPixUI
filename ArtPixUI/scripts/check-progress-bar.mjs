import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProgressBar } from "../dist/art-pix-ui.js";

for (const [value, max, expected, safeMax] of [[0,100,0,100],[40,100,40,100],[150,100,100,100],[-3,100,0,100],[NaN,100,0,100],[Infinity,100,100,100],[-Infinity,100,0,100],[3,8,3,8],[5,0,5,100],[5,-2,5,100],[5,Infinity,5,100],[5,NaN,5,100]]) {
  const html = renderToStaticMarkup(createElement(ProgressBar, { value, max, label: "Packing", showPercentage: true }));
  for (const attr of ['role="progressbar"', 'aria-label="Packing"', 'aria-valuemin="0"', `aria-valuenow="${expected}"`, `aria-valuemax="${safeMax}"`]) assert(html.includes(attr), html);
  assert(html.includes(`${Math.round(expected / safeMax * 100)}%`));
  assert(html.includes(`width:${expected / safeMax * 100}%`));
  assert(!html.includes("tabindex"));
}
const html = renderToStaticMarkup(createElement(ProgressBar, { value: 20, className: "custom", "aria-label": "Upload" }));
assert(html.includes('aria-label="Upload"'));
assert(html.includes("art-pix-progress-bar custom"));
assert(!html.includes('class="art-pix-progress-bar__percentage"'));
const css = readFileSync(new URL("../src/components/loading-progress/ProgressBar/ProgressBar.css", import.meta.url), "utf8");
assert.match(css, /prefers-reduced-motion: reduce[^}]+transition: none/);
console.log("ProgressBar normalization, percentage, accessibility, props, and reduced-motion CSS checks passed.");
