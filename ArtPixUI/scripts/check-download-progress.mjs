import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DownloadProgress } from "../dist/art-pix-ui.js";

const render = (props = {}) => renderToStaticMarkup(createElement(DownloadProgress, { fileName: "map.png", downloadedBytes: 400000, totalBytes: 1000000, ...props }));
const normal = render();
for (const expected of ['aria-label="Download map.png"', 'role="progressbar"', 'aria-valuenow="400000"', 'aria-valuemax="1000000"', '400 KB / 1 MB', '>40%</span>', 'aria-valuetext="40%, 400 KB / 1 MB downloaded"']) assert(normal.includes(expected));
assert.equal((normal.match(/role="progressbar"/g) ?? []).length, 1);
for (const [input, expected] of [[0,0],[-1,0],[NaN,0],[Infinity,0],[-Infinity,0],[10.9,10],[2000000,1000000]]) assert(render({ downloadedBytes: input }).includes(`aria-valuenow="${expected}"`));
for (const totalBytes of [0, -1, NaN, Infinity, 0.5]) {
  const html = render({ totalBytes });
  assert(!html.includes('aria-valuenow='));
  assert(!html.includes('class="art-pix-progress-bar__percentage"'));
  assert(html.includes('400 KB downloaded · total unavailable'));
}
assert(render({ downloadedBytes: 3, totalBytes: 8.9 }).includes('3 B / 8 B'));
assert(render({ downloadedBytes: 2500000, totalBytes: 2500000 }).includes('>100%</span>'));
for (const [bytes, expected] of [[1,'1 B'],[1000,'1 KB'],[1500000,'1.5 MB'],[2000000000,'2 GB'],[1000000000000,'1 TB']]) assert(render({ downloadedBytes: bytes, totalBytes: bytes }).includes(`${expected} / ${expected}`));
assert(render({ fileName: "" }).includes('aria-label="Download File download"'));
const custom = render({ className: "custom", id: "download", "aria-label": "Transfer", "aria-labelledby": "heading" });
for (const expected of ['art-pix-download-progress custom', 'id="download"', 'aria-label="Transfer"', 'aria-labelledby="heading"']) assert(custom.includes(expected));
assert(!/tabindex|<input|<button|<a /.test(normal));
console.log("DownloadProgress byte normalization, formatting, percentages, unknown totals, labels and composition checks passed.");
