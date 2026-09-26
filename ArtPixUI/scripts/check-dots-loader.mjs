import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DotsLoader } from "../dist/art-pix-ui.js";

for (const size of ["small", "medium", "large"]) {
  const html = renderToStaticMarkup(createElement(DotsLoader, { size, label: "Loading notes…" }));
  assert(html.includes(`art-pix-dots-loader--${size}`));
  assert.equal((html.match(/class="art-pix-dots-loader__dot"/g) ?? []).length, 3);
  assert(html.includes('role="status"'));
  assert(html.includes('aria-live="polite"'));
  assert(html.includes('aria-atomic="true"'));
  assert(html.includes('aria-hidden="true"'));
  assert(html.includes("Loading notes…"));
  assert(!html.includes("tabindex"));
}
assert(renderToStaticMarkup(createElement(DotsLoader)).includes("Loading…"));
const css = readFileSync(new URL("../src/components/loading-progress/DotsLoader/DotsLoader.css", import.meta.url), "utf8");
assert(css.includes("animation-delay: 0.15s"));
assert(css.includes("animation-delay: 0.3s"));
assert.match(css, /prefers-reduced-motion: reduce[^}]+animation: none; opacity: 1/);
console.log("DotsLoader rendering, three-dot structure, status semantics, and reduced-motion CSS checks passed.");
