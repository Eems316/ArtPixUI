import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as ui from "../dist/art-pix-ui.js";

const render = (name, props = {}, child = "Message") => renderToStaticMarkup(createElement(ui[name], props, child));
for (const [name, severity] of [["InfoMessage","info"],["SuccessMessage","success"],["WarningMessage","warning"],["ErrorMessage","error"]]) {
  for (const announcement of ["polite","assertive","off"]) {
    const html = render(name, { announcement });
    assert(html.includes(`art-pix-status-message--${severity}`));
    assert(html.includes(`aria-live="${announcement}"`));
    assert(html.includes('Message'));
  }
}
assert(render("ValidationMessage", { id: "field-feedback" }).includes('id="field-feedback"'));
assert(render("ValidationMessage", { id: "ok", state: "success" }).includes('art-pix-status-message--success'));
assert.equal(render("NotificationDot", { visible: false }, null), "");
assert(render("NotificationDot", {}, null).includes('aria-label="Unread activity"'));
assert(render("NotificationDot", { decorative: true }, null).includes('aria-hidden="true"'));
assert(!render("NotificationDot", { decorative: true }, null).includes('role="img"'));
assert.equal(render("NotificationBadge", { count: 0 }, null), "");
assert(render("NotificationBadge", { count: 0, showZero: true }, null).includes('>0</span>'));
assert(render("NotificationBadge", { count: 125 }, null).includes('aria-label="125 notifications"'));
assert(render("NotificationBadge", { count: 125 }, null).includes('>99+</span>'));
assert(render("NotificationBadge", { label: "Beta" }, null).includes('>Beta</span>'));
for (const count of [NaN, Infinity, -3]) assert.equal(render("NotificationBadge", { count }, null), "");
assert.equal(render("NotificationBanner", { open: false }), "");
assert(!render("NotificationBanner").includes('Dismiss</button>'));
let dismissed = 0;
const banner = ui.NotificationBanner({ onDismiss: () => dismissed++, children: "Hello" });
const surface = banner.type(banner.props);
const dismissButton = surface.props.children[1].props.children[1];
dismissButton.props.onClick();
assert.equal(dismissed, 1);
for (const [name, title] of [["EmptyState","Nothing here yet"],["ErrorState","Something went wrong"],["SuccessState","All done"]]) {
  const html = render(name, { action: createElement("button", { type: "button" }, "Action") });
  assert(html.includes(title)); assert(html.includes('aria-live="off"')); assert(html.includes('Action</button>'));
  assert(!html.includes('aria-modal'));
}
for (const name of ["Toast", "Snackbar", "UndoNotification"]) {
  const props = { open: false, onDismiss() {}, onUndo() {} };
  assert.equal(render(name, props), "");
  const html = render(name, { ...props, open: true });
  assert(html.includes('Dismiss</button>')); assert(html.includes('role="status"'));
  assert.equal((html.match(/role="status"/g) ?? []).length, 1);
}
assert(render("UndoNotification", { open: true, onDismiss() {}, onUndo() {} }).includes('>Undo</button>'));
const known = render("ProgressNotification", { value: 25, max: 50 });
assert(known.includes('aria-valuenow="25"')); assert(known.includes('>50%</span>'));
assert(!render("ProgressNotification").includes('aria-valuenow='));
assert.equal(render("ProgressNotification", { open: false }), "");

// Test the actual shared timer source with deterministic fake time, no browser waits.
const source = readFileSync(new URL("../src/components/feedback-notifications/_shared/dismissTimer.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { createDismissTimer } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
function clock() {
  let now = 0, id = 0;
  const jobs = new Map();
  return {
    scheduler: { now: () => now, set: (fn, delay) => { jobs.set(++id, { fn, at: now + delay }); return id; }, clear: key => jobs.delete(key) },
    tick(ms) { now += ms; for (const [key, job] of [...jobs]) if (job.at <= now) { jobs.delete(key); job.fn(); } },
    pending: () => jobs.size,
  };
}
for (const duration of [0,-1,NaN,Infinity]) { const c=clock(); const timer=createDismissTimer(duration,()=>assert.fail("persistent expired"),c.scheduler); timer.start(); c.tick(1e7); assert.equal(c.pending(),0); }
const c=clock(); let expired=0;
const timer=createDismissTimer(1000,()=>expired++,c.scheduler);
timer.start(); c.tick(300); timer.pause("hover"); timer.pause("focus"); c.tick(5000);
assert.equal(expired,0); timer.resume("hover"); c.tick(5000); assert.equal(expired,0);
timer.resume("focus"); c.tick(699); assert.equal(expired,0); c.tick(1); assert.equal(expired,1);
timer.start(); timer.resume("focus"); c.tick(5000); assert.equal(expired,1);
const hiddenClock=clock(); let hiddenExpired=0;
const hidden=createDismissTimer(100,()=>hiddenExpired++,hiddenClock.scheduler);
hidden.pause("hidden"); hidden.start(); hiddenClock.tick(1000); assert.equal(hiddenExpired,0);
hidden.resume("hidden"); hiddenClock.tick(100); assert.equal(hiddenExpired,1);
const cancelClock=clock(); const cancelled=createDismissTimer(10,()=>assert.fail("cancelled expired"),cancelClock.scheduler); cancelled.start(); cancelled.cancel(); cancelClock.tick(100); assert.equal(cancelClock.pending(),0);
const css = readFileSync(new URL("../src/components/feedback-notifications/Toast/Toast.css", import.meta.url), "utf8");
assert.match(css, /prefers-reduced-motion: reduce[^}]+animation: none/);
console.log("15 feedback components: rendering, callbacks, normalization, single live status, timer pause/resume/cancel/hidden handling and reduced-motion CSS passed.");
