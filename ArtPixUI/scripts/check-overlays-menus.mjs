import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import * as ui from "../dist/art-pix-ui.js";

const names = ["Backdrop", "Dialog", "Modal", "ConfirmationDialog", "DestructiveConfirmation", "AlertDialog", "Drawer", "Sheet", "BottomSheet", "Popover", "Tooltip", "HoverCard", "DropdownMenu", "Submenu", "ContextMenu", "ActionMenu", "MenuBar", "DisplayMenu", "ComboBoxPopup", "ColorPickerPopup"];
for (const name of names) assert.equal(typeof ui[name], "function", name);
const render = (name, props, children) => renderToStaticMarkup(createElement(ui[name], props, children));
const noop = () => {};
assert.equal(render("Backdrop", { open: false }), "");
assert.match(render("Backdrop", {}), /aria-hidden="true"/);
for (const name of ["Dialog", "Modal", "ConfirmationDialog", "DestructiveConfirmation", "AlertDialog", "Drawer", "Sheet", "BottomSheet"]) {
 const html = render(name, { open: false, onOpenChange: noop, title: "A named dialog", description: "Helpful context", onConfirm: noop }, "Content");
 assert.match(html, /<dialog/); assert.match(html, /aria-labelledby=/); assert.match(html, /aria-describedby=/);
 assert.match(html, /A named dialog/); assert.match(html, /Helpful context/); assert.match(html, /Content/);
 assert(!html.includes(' open=""'), "Native showModal owns opening after hydration");
 if (["ConfirmationDialog", "DestructiveConfirmation", "AlertDialog"].includes(name)) assert.match(html, /role="alertdialog"/);
}
const destructive = render("DestructiveConfirmation", { open: false, onOpenChange: noop, onConfirm: noop, title: "Delete?" });
assert.match(destructive, /art-pix-overlay-danger/); assert.equal((destructive.match(/>Cancel<\/button>/g) ?? []).length, 1);
const busy = render("ConfirmationDialog", { open: false, onOpenChange: noop, onConfirm: noop, busy: true, title: "Save?" });
assert.equal((busy.match(/disabled=""/g) ?? []).length, 2);
let confirms = 0, closes = 0;
const confirmTree = ui.ConfirmationDialog({ open: true, title: "Confirm", onOpenChange: () => closes++, onConfirm: () => confirms++ });
assert.equal(confirmTree.props.closeOnBackdrop, false); assert.equal(confirmTree.props.initialFocus, "[data-cancel]");
const buttons = confirmTree.props.children[1].props.children;
buttons[0].props.onClick(); buttons[1].props.onClick(); assert.equal(closes, 1); assert.equal(confirms, 1);
for (const name of ["DropdownMenu", "ActionMenu"]) assert.match(render(name, { label: "Actions", items: [], disabled: true }), /disabled=""/);
assert.match(render("Submenu", { label: "More", items: [] }), /tabindex="0"/);
assert.match(render("ContextMenu", { label: "Actions", items: [] }, "Target"), /tabindex="0"/);
assert.match(render("MenuBar", { label: "Tools", menus: [{ id: "a", label: "Disabled", disabled: true, items: [] }, { id: "b", label: "File", items: [] }] }), /role="menubar"/);
assert.match(render("Tooltip", { trigger: "Help" }, "Description"), /Help/);
assert.match(render("HoverCard", { trigger: "Guide" }, "Biography"), /aria-haspopup="dialog"/);
assert.equal(render("Popover", { open: false, onOpenChange: noop, anchorRef: { current: null }, label: "Details" }), "");
const pop = render("Popover", { open: true, onOpenChange: noop, anchorRef: { current: null }, label: "Details" }, "Detail content");
assert.match(pop, /popover="manual"/); assert.match(pop, /aria-label="Details"/);
let choice;
const displayTree = ui.DisplayMenu({ options: [{ id: "grid", label: "Grid", checked: false }], onCheckedChange: (...args) => { choice = args; } });
displayTree.props.items[0].onSelect(); assert.deepEqual(choice, ["grid", true]);
const combo = render("ComboBoxPopup", { label: "Destination", value: "", options: [], onInputChange: noop, onSelect: noop });
assert.match(combo, /role="combobox"/); assert.match(combo, /aria-autocomplete="list"/); assert.match(combo, /aria-expanded="false"/);
assert.match(render("ColorPickerPopup", { value: "#247b3b", onChange: noop, disabled: true }), /disabled=""/);

// Exercise production geometry/navigation helpers without browser dependencies.
const source = readFileSync(new URL("../src/components/overlays-menus/_shared/geometry.ts", import.meta.url), "utf8");
const compile = text => ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const load = text => import(`data:text/javascript;base64,${Buffer.from(compile(text)).toString("base64")}`);
const { popupPosition, nextOptionIndex } = await load(source);
assert.equal(nextOptionIndex(3, -1, "previous"), 2);
assert.equal(nextOptionIndex(3, 2, "next"), 0);
assert.equal(nextOptionIndex(3, 0, "previous"), 2);
assert.equal(nextOptionIndex(0, -1, "next"), -1);
const viewport = { width: 360, height: 640 }, anchor = { left: 40, right: 140, top: 500, bottom: 530 };
assert.deepEqual(popupPosition(anchor, 200, 150, viewport, "bottom"), { x: 40, y: 342 });
assert.deepEqual(popupPosition(anchor, 200, 150, viewport, "bottom", { x: 355, y: 635 }), { x: 152, y: 482 });
for (const placement of ["top", "bottom", "left", "right"]) for (const width of [40, 200, 344]) {
 const p = popupPosition(anchor, width, 150, viewport, placement);
 assert(p.x >= 8 && p.x + width <= 352); assert(p.y >= 8 && p.y + 150 <= 632);
}
const menuSource = readFileSync(new URL("../src/components/overlays-menus/_shared/menu.tsx", import.meta.url), "utf8");
const menuFunction = menuSource.slice(menuSource.indexOf("function menuKey"), menuSource.indexOf("export function MenuSurface"));
const { menuKey } = await load(`${source}\nexport ${menuFunction}`);
const nodes = ["Save", "Share", "Settings"].map(textContent => ({ textContent, focus() { globalThis.document.activeElement = this; } }));
globalThis.document = { activeElement: nodes[0] };
const press = key => { const event = { key, currentTarget: { querySelectorAll: () => nodes }, preventDefault() {}, stopPropagation() {} }; menuKey(event); };
press("ArrowUp"); assert.equal(document.activeElement, nodes[2]);
press("ArrowDown"); assert.equal(document.activeElement, nodes[0]);
press("End"); assert.equal(document.activeElement, nodes[2]);
press("Home"); assert.equal(document.activeElement, nodes[0]);
press("s"); assert.equal(document.activeElement, nodes[1]);
delete globalThis.document;
console.log("20 overlay/menu exports, SSR semantics, callbacks, geometry, and navigation checks passed. Live browser focus/pointer/AT checks remain manual.");
