import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Pagination } from "../dist/art-pix-ui.js";

const render = (page, totalPages) => renderToStaticMarkup(createElement(Pagination, { page, totalPages, onPageChange() {} }));
let checked = 0;
for (const total of [1, 2, 5, 7, 8, 20, 100]) {
  for (let page = 1; page <= total; page++) {
    const html = render(page, total);
    const pages = [...html.matchAll(/aria-label="Page (\d+)"/g)].map(match => Number(match[1]));
    assert.equal(pages[0], 1);
    assert.equal(pages.at(-1), total);
    assert(pages.includes(page));
    assert.equal(new Set(pages).size, pages.length);
    assert.deepEqual(pages, [...pages].sort((a, b) => a - b));
    assert(pages.length <= 7);
    assert.equal((html.match(/aria-current="page"/g) ?? []).length, 1);
    for (const tag of html.matchAll(/<button[^>]*>/g)) {
      if (tag[0].includes('aria-label="Previous page"')) assert.equal(tag[0].includes('disabled=""'), page === 1);
      if (tag[0].includes('aria-label="Next page"')) assert.equal(tag[0].includes('disabled=""'), page === total);
    }
    checked++;
  }
}
assert.equal(render(1, 0), "");
assert.equal(render(1, NaN), "");
assert.equal(render(-4, 5), render(1, 5));
assert.equal(render(999, 5), render(5, 5));
assert.equal(render(2.9, 5.9), render(2, 5));
assert.equal(render(Infinity, 5), render(1, 5));
assert(render(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER).length < 10000);
console.log(`Pagination checks passed: ${checked} page states plus invalid/large inputs.`);
