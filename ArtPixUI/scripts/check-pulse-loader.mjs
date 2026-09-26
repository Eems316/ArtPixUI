import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PulseLoader } from "../dist/art-pix-ui.js";

for (const size of ["small", "medium", "large"]) {
  const html = renderToStaticMarkup(createElement(PulseLoader, { size, label: "Preparing notes…" }));
  assert(html.includes(`art-pix-pulse-loader--${size}`));
  assert.equal((html.match(/class="art-pix-pulse-loader__indicator"/g) ?? []).length, 1);
  for (const attribute of ['role="status"', 'aria-live="polite"', 'aria-atomic="true"', 'aria-hidden="true"']) assert(html.includes(attribute));
  assert(html.includes("Preparing notes…"));
  assert(!html.includes("tabindex"));
}
assert(renderToStaticMarkup(createElement(PulseLoader)).includes("Loading…"));
const css = readFileSync(new URL("../src/components/loading-progress/PulseLoader/PulseLoader.css", import.meta.url), "utf8");
assert(css.includes("scale(0.75)"));
assert.match(css, /prefers-reduced-motion: reduce[^}]+animation: none; transform: none; opacity: 1/);
console.log("PulseLoader rendering, sizes, status semantics, and reduced-motion CSS checks passed.");
