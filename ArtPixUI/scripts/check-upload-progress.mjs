import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { UploadProgress } from "../dist/art-pix-ui.js";

const render = (props = {}) => renderToStaticMarkup(createElement(UploadProgress, { fileName: "map.png", uploadedBytes: 400000, totalBytes: 1000000, ...props }));
const normal = render();
for (const expected of ['aria-label="Upload map.png"', 'role="progressbar"', 'aria-valuenow="400000"', 'aria-valuemax="1000000"', '400 KB / 1 MB', '>40%</span>']) assert(normal.includes(expected));
assert.equal((normal.match(/role="progressbar"/g) ?? []).length, 1);
for (const [input, expected] of [[-1,0],[NaN,0],[Infinity,0],[10.9,10],[2000000,1000000]]) assert(render({ uploadedBytes: input }).includes(`aria-valuenow="${expected}"`));
for (const totalBytes of [0, -1, NaN, Infinity, 0.5]) {
  const html = render({ totalBytes });
  assert(!html.includes('aria-valuenow='));
  assert(!html.includes('class="art-pix-progress-bar__percentage"'));
  assert(html.includes('total unavailable'));
}
assert(render({ uploadedBytes: 3, totalBytes: 8 }).includes('3 B / 8 B'));
assert(render({ uploadedBytes: 2500000, totalBytes: 2500000 }).includes('>100%</span>'));
assert(render({ fileName: "" }).includes('aria-label="Upload File upload"'));
const custom = render({ className: "custom", id: "upload", "aria-label": "Transfer", "aria-labelledby": "heading" });
for (const expected of ['art-pix-upload-progress custom', 'id="upload"', 'aria-label="Transfer"', 'aria-labelledby="heading"']) assert(custom.includes(expected));
assert(!/tabindex|<input|<button/.test(normal));
console.log("UploadProgress byte normalization, formatting, percentages, unknown totals, labels and composition checks passed.");
