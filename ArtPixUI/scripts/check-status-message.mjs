import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StatusMessage, Alert } from "../dist/art-pix-ui.js";

const render = (props = {}, children = "Message") => renderToStaticMarkup(createElement(StatusMessage, props, children));
for (const severity of ["info", "success", "warning", "error"]) {
  for (const announcement of ["polite", "assertive", "off"]) {
    const html = render({ severity, announcement });
    assert(html.includes(`art-pix-status-message--${severity}`));
    assert(html.includes(`aria-live="${announcement}"`));
    assert(html.includes('aria-hidden="true"'));
    assert(html.includes('width="16"'));
    assert(html.includes('Message'));
    const alert = renderToStaticMarkup(createElement(Alert, { severity, announcement }, "Message"));
    for (const attr of ['role', 'aria-live', 'aria-atomic']) {
      const re = new RegExp(` ${attr}="[^"]*"`);
      assert.equal(html.match(re)?.[0], alert.match(re)?.[0]);
    }
    if (announcement === "off") assert(!html.includes('role='));
    else assert(html.includes(`role="${announcement === "assertive" ? "alert" : "status"}"`));
  }
}
assert(render().includes('art-pix-status-message--info'));
assert(render().includes('aria-live="polite"'));
const custom = render({ className: "custom", id: "notice", dir: "rtl", style: { maxWidth: 190 } }, createElement("a", { href: "/help" }, "Help"));
for (const expected of ['art-pix-status-message--info custom', 'id="notice"', 'dir="rtl"', 'max-width:190px', '<a href="/help">Help</a>']) assert(custom.includes(expected));
const css = readFileSync(new URL("../src/components/feedback-notifications/StatusMessage/StatusMessage.css", import.meta.url), "utf8");
assert(!/animation:|transition:|@keyframes|box-shadow:|background:/.test(css));
assert(css.includes('overflow-wrap: anywhere'));
console.log("StatusMessage: 12 severity/announcement cases, shared Alert semantics, children, native props and compact static styling checks passed.");
