import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BufferingIndicator, SpinnerStatus } from "../dist/art-pix-ui.js";

const render = (props = {}) => renderToStaticMarkup(createElement(BufferingIndicator, props));
assert.equal(render({ buffering: false }), "");
assert.equal(render({ buffering: false, label: "Hidden", id: "hidden" }), "");
const defaults = render();
for (const expected of ['Buffering…', 'role="status"', 'aria-live="polite"', 'aria-atomic="true"', 'aria-hidden="true"', 'focusable="false"']) assert(defaults.includes(expected));
assert(!/tabindex|<video|<audio|<button/.test(defaults));
assert(!defaults.includes('buffering='));
for (const size of ["small", "medium", "large"]) {
  const props = { size, label: "Waiting for audio…", className: "custom", id: "buffer", dir: "rtl" };
  const html = render(props);
  assert.equal(html.replace("art-pix-buffering-indicator ", ""), renderToStaticMarkup(createElement(SpinnerStatus, props)));
}
const custom = render({ "aria-live": "off", "aria-label": "Media status" });
assert(custom.includes('aria-live="off"'));
assert(custom.includes('aria-label="Media status"'));
const css = readFileSync(new URL("../src/components/loading-progress/SpinnerStatus/SpinnerStatus.css", import.meta.url), "utf8");
assert(css.includes("steps(8, end)"));
assert.match(css, /prefers-reduced-motion: reduce[^}]+animation: none/);
console.log("BufferingIndicator visibility, labels, sizes, status semantics, shared rendering and reduced-motion CSS checks passed.");
