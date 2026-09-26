import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SkeletonLoader } from "../dist/art-pix-ui.js";

const render = (props = {}) => renderToStaticMarkup(createElement(SkeletonLoader, props));
for (const shape of ["rectangle", "text", "circle"]) {
  const html = render({ shape });
  assert(html.includes(`art-pix-skeleton-loader--${shape}`));
  assert(html.includes('aria-hidden="true"'));
  assert(!/tabindex|role=|aria-live/.test(html));
}
assert(render().includes("art-pix-skeleton-loader--rectangle"));
const dimensions = render({ width: 120, height: 24, className: "custom", id: "placeholder", style: { width: 20, marginTop: 8 } });
for (const expected of ['width:120px', 'height:24px', 'margin-top:8px', 'art-pix-skeleton-loader--rectangle custom', 'id="placeholder"']) assert(dimensions.includes(expected));
assert(render({ width: "75%", height: "2rem" }).includes('width:75%;height:2rem'));
assert(render({ width: 0, height: 0 }).includes('width:0;height:0'));
assert(!render({ tabIndex: 0, "aria-hidden": false, contentEditable: true }).includes('tabindex'));
assert(render({ "aria-hidden": false }).includes('aria-hidden="true"'));
const css = readFileSync(new URL("../src/components/loading-progress/SkeletonLoader/SkeletonLoader.css", import.meta.url), "utf8");
assert(!/animation:|transition:|@keyframes/.test(css));
assert(css.includes("aspect-ratio: 1"));
assert(css.includes("max-width: 100%"));
console.log("SkeletonLoader shapes, dimensions, style merging, decorative semantics and static CSS checks passed.");
