import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SpinnerStatus } from "../dist/art-pix-ui.js";

for (const size of ["small", "medium", "large"]) {
  const html = renderToStaticMarkup(createElement(SpinnerStatus, { size, label: "Loading notes…" }));
  assert(html.includes(`art-pix-spinner-status--${size}`));
  assert(html.includes('role="status"'));
  assert(html.includes('aria-live="polite"'));
  assert(html.includes('aria-atomic="true"'));
  assert(html.includes('aria-hidden="true"'));
  assert(html.includes("Loading notes…"));
  assert(!html.includes("tabindex"));
}
assert(renderToStaticMarkup(createElement(SpinnerStatus)).includes("Loading…"));
const css = readFileSync(new URL("../src/components/loading-progress/SpinnerStatus/SpinnerStatus.css", import.meta.url), "utf8");
assert(css.includes("steps(8, end)"));
assert.match(css, /prefers-reduced-motion: reduce[^}]+animation: none/);
console.log("SpinnerStatus rendering, sizes, status semantics, and reduced-motion CSS checks passed.");
