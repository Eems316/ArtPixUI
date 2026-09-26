import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ShimmerSkeleton, SkeletonLoader } from "../dist/art-pix-ui.js";

const render = (component, props = {}) => renderToStaticMarkup(createElement(component, props));
for (const shape of ["rectangle", "text", "circle"]) {
  const props = { shape, width: 64, height: 64, id: "sample", dir: "rtl", className: "custom", style: { marginTop: 8 } };
  const html = render(ShimmerSkeleton, props);
  assert.equal(html.replace("art-pix-shimmer-skeleton ", ""), render(SkeletonLoader, props));
  assert(html.includes('aria-hidden="true"'));
  assert(!/tabindex|aria-live|role=/.test(html));
}
assert(render(ShimmerSkeleton).includes("art-pix-skeleton-loader--rectangle"));
assert(render(ShimmerSkeleton, { width: "75%", height: "2rem" }).includes("width:75%;height:2rem"));
assert(!render(ShimmerSkeleton, { tabIndex: 0 }).includes("tabindex"));
const css = readFileSync(new URL("../src/components/loading-progress/ShimmerSkeleton/ShimmerSkeleton.css", import.meta.url), "utf8");
assert(css.includes("1.8s ease-in-out infinite"));
assert(css.includes("overflow: hidden"));
assert(css.includes("animation-direction: reverse"));
assert.match(css, /prefers-reduced-motion: reduce[^}]+animation: none; content: none/);
assert.match(css, /forced-colors: active[^}]+animation: none; content: none/);
console.log("ShimmerSkeleton composition, shapes, dimensions, decorative semantics, RTL and motion fallback CSS checks passed.");
