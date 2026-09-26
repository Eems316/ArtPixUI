import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProgressSteps } from "../dist/art-pix-ui.js";

const steps = [{ id: "one", label: "Plan", description: "Choose a route" }, { id: "two", label: "Pack" }, { id: "three", label: "Go" }];
const render = (props = {}) => renderToStaticMarkup(createElement(ProgressSteps, { steps, ...props }));
for (const [currentStep, completed, current, upcoming] of [[1,0,1,2],[2,1,1,1],[3,2,1,0],[4,3,0,0],[99,3,0,0],[-1,0,1,2],[2.9,1,1,1],[NaN,0,1,2],[Infinity,0,1,2],[-Infinity,0,1,2]]) {
  const html = render({ currentStep });
  for (const [state, count] of [["completed",completed],["current",current],["upcoming",upcoming]]) assert.equal((html.match(new RegExp(`__item--${state}`, "g")) ?? []).length, count);
  assert.equal((html.match(/aria-current="step"/g) ?? []).length, current);
  assert(!/tabindex|<button|<a /.test(html));
  assert(html.includes('role="list"'));
  assert(html.includes("Choose a route"));
}
assert.equal(render({ steps: [] }), "");
assert(render().includes('aria-label="Progress steps"'));
assert(render({ steps: [steps[0]], currentStep: 2 }).includes("Completed"));
const custom = render({ className: "custom", dir: "rtl", "aria-label": "Journey", id: "steps" });
for (const value of ['art-pix-progress-steps custom', 'dir="rtl"', 'aria-label="Journey"', 'id="steps"']) assert(custom.includes(value));
const css = readFileSync(new URL("../src/components/loading-progress/ProgressSteps/ProgressSteps.css", import.meta.url), "utf8");
assert.match(css, /prefers-reduced-motion: reduce[^}]+transition: none/);
assert(css.includes("flex-wrap: wrap"));
console.log("ProgressSteps: state normalization, empty/single steps, semantics, native props and reduced-motion CSS checks passed.");
