import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Alert } from "../dist/art-pix-ui.js";

const render = (props = {}, children = "Message") => renderToStaticMarkup(createElement(Alert, props, children));
for (const severity of ["info", "success", "warning", "error"]) {
  for (const announcement of ["polite", "assertive", "off"]) {
    const html = render({ severity, announcement, title: "Heading" });
    assert(html.includes(`art-pix-alert--${severity}`));
    assert(html.includes(`aria-live="${announcement}"`));
    assert(html.includes('aria-hidden="true"'));
    assert(html.includes('focusable="false"'));
    assert(html.includes('>Heading</strong>'));
    assert(html.includes('Message'));
    if (announcement === "off") { assert(!html.includes('role=')); assert(!html.includes('aria-atomic=')); }
    else { assert(html.includes(`role="${announcement === "assertive" ? "alert" : "status"}"`)); assert(html.includes('aria-atomic="true"')); }
  }
}
const defaults = render();
assert(defaults.includes('art-pix-alert--info'));
assert(defaults.includes('aria-live="polite"'));
assert(!defaults.includes('art-pix-alert__title'));
const custom = render({ className: "custom", id: "notice", dir: "rtl", style: { maxWidth: 240 } }, createElement("a", { href: "/help" }, "Help"));
for (const value of ['art-pix-alert--info custom', 'id="notice"', 'dir="rtl"', 'max-width:240px', '<a href="/help">Help</a>']) assert(custom.includes(value));
const css = readFileSync(new URL("../src/components/feedback-notifications/Alert/Alert.css", import.meta.url), "utf8");
assert(!/animation:|transition:|@keyframes/.test(css));
assert(css.includes('border-inline-start'));
console.log("Alert: 12 severity/announcement combinations, title/children, native props, decorative icons and static CSS checks passed.");
