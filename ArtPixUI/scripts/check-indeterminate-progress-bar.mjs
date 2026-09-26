import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IndeterminateProgressBar } from "../dist/art-pix-ui.js";

const render = (props = {}) => renderToStaticMarkup(createElement(IndeterminateProgressBar, props));
const defaults = render();
assert(defaults.includes('role="progressbar"'));
assert(defaults.includes('aria-label="Loading…"'));
assert.equal((defaults.match(/aria-hidden="true"/g) ?? []).length, 2);
assert(!/aria-value|tabindex|%/.test(defaults));
const custom = render({ label: "Gathering supplies", "aria-label": "Loading inventory", className: "custom", id: "loading", dir: "rtl", "data-test": "passed" });
for (const expected of ['Gathering supplies', 'aria-label="Loading inventory"', 'art-pix-indeterminate-progress-bar custom', 'id="loading"', 'dir="rtl"', 'data-test="passed"']) assert(custom.includes(expected));
assert(render({ "aria-labelledby": "external-heading" }).includes('aria-labelledby="external-heading"'));
// JavaScript consumers cannot accidentally turn this into determinate progress.
assert(!/aria-value/.test(render({ "aria-valuenow": 50, "aria-valuemax": 100, "aria-valuemin": 0, "aria-valuetext": "50%" })));
const css = readFileSync(new URL("../src/components/loading-progress/IndeterminateProgressBar/IndeterminateProgressBar.css", import.meta.url), "utf8");
assert(css.includes("1.6s ease-in-out infinite"));
assert(css.includes(":dir(rtl)"));
assert.match(css, /prefers-reduced-motion: reduce[\s\S]*animation: none;[\s\S]*transform: none;[\s\S]*margin-inline-start: 32.5%/);
console.log("IndeterminateProgressBar labels, props, unknown-value semantics, RTL and reduced-motion CSS checks passed.");
