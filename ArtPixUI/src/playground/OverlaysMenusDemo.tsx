import { useRef, useState, type ReactNode } from "react";
import { Backdrop, Dialog, Modal, ConfirmationDialog, DestructiveConfirmation, AlertDialog, Drawer, Sheet, BottomSheet, Popover, Tooltip, HoverCard, DropdownMenu, Submenu, ContextMenu, ActionMenu, MenuBar, DisplayMenu, ComboBoxPopup, ColorPickerPopup, Button, type MenuItem } from "../index.js";

function Exhibit({ id, name, number, children }: { id: string; name: string; number: number; children: ReactNode }) {
 return <section className="playground-exhibit" id={`${id}-demo`} aria-labelledby={`${id}-heading`}><div className="playground-exhibit-heading"><span className="playground-number">{number}</span><h2 id={`${id}-heading`}>{name}</h2><span className="playground-kind">AWAITING REVIEW</span></div><div style={{ display: "grid", gap: 20, padding: 28, minWidth: 0 }}>{children}</div></section>;
}
export function OverlaysMenusDemo() {
 const [active, setActive] = useState<string | null>(null);
 const [result, setResult] = useState("No action taken.");
 const [nested, setNested] = useState(false);
 const [popover, setPopover] = useState(false); const anchor = useRef<HTMLButtonElement>(null);
 const [details, setDetails] = useState(true); const [grid, setGrid] = useState(false);
 const [query, setQuery] = useState(""); const [selected, setSelected] = useState<string>();
 const [color, setColor] = useState("#247b3b");
 const shared = (name: string) => ({ open: active === name, onOpenChange: (value: boolean) => setActive(value ? name : null), title: name });
 const items: MenuItem[] = [{ id: "save", label: "Save notes", onSelect: () => setResult("Save requested.") }, { id: "disabled", label: "Unavailable action", disabled: true }, { id: "share", label: "Share", children: [{ id: "link", label: "Copy link", onSelect: () => setResult("Copy link requested (demo only).") }, { id: "mail", label: "Email", onSelect: () => setResult("Email requested.") }] }];
 const options = [{ id: "forest", label: "Forest" }, { id: "desert", label: "Desert" }, { id: "ocean", label: "Ocean", disabled: true }];
 return <>
 <Exhibit id="backdrop" name="A quieter background" number={68}><div style={{ position: "relative", height: 110, isolation: "isolate", overflow: "hidden", borderRadius: 12 }}><p>Decorative scrim sample</p><Backdrop style={{ position: "absolute", zIndex: 1 }} /></div><p>Backdrop is decorative. Modal supplies focus and dismissal behavior.</p></Exhibit>
 <Exhibit id="dialog" name="A focused conversation" number={69}><Button onClick={() => setActive("Dialog")}>Open dialog</Button><Dialog {...shared("Dialog")} description="A parchment dialog with keyboard focus containment."><label>Adventure name <input defaultValue="Mossglen" /></label><Button onClick={() => setNested(true)}>Open nested dialog</Button><Dialog open={nested} onOpenChange={setNested} title="Nested dialog">Close me to return to the parent.</Dialog></Dialog></Exhibit>
 <Exhibit id="modal" name="One thing at a time" number={70}><Button onClick={() => setActive("Modal")}>Open modal</Button><Modal {...shared("Modal")}>Click outside, press Escape, or use Close.</Modal></Exhibit>
 <Exhibit id="confirmation-dialog" name="Before you continue" number={71}><Button onClick={() => setActive("Confirmation")}>Confirm save</Button><ConfirmationDialog {...shared("Confirmation")} onConfirm={() => { setResult("Save confirmed."); setActive(null); }}>Save this adventure?</ConfirmationDialog><span role="status">{result}</span></Exhibit>
 <Exhibit id="destructive-confirmation" name="A deliberate decision" number={72}><Button onClick={() => setActive("Delete route?")}>Review deletion</Button><DestructiveConfirmation {...shared("Delete route?")} onConfirm={() => { setResult("Demo deletion confirmed. No data changed."); setActive(null); }}>This example does not delete real data.</DestructiveConfirmation><span>{result}</span></Exhibit>
 <Exhibit id="alert-dialog" name="An important interruption" number={73}><Button onClick={() => setActive("Connection lost")}>Show alert dialog</Button><AlertDialog {...shared("Connection lost")}>Your notes are safe. Reconnect before syncing.</AlertDialog></Exhibit>
 <Exhibit id="drawer" name="From the edge" number={74}><Button onClick={() => setActive("Supplies")}>Open drawer</Button><Drawer {...shared("Supplies")}><p>Your travel supplies.</p><Button onClick={() => setResult("Supply added.")}>Add supply</Button></Drawer></Exhibit>
 <Exhibit id="sheet" name="A working surface" number={75}><Button onClick={() => setActive("Route details")}>Open sheet</Button><Sheet {...shared("Route details")}>A wider, centered surface for a focused task.</Sheet></Exhibit>
 <Exhibit id="bottom-sheet" name="Within reach" number={76}><Button onClick={() => setActive("Quick actions")}>Open bottom sheet</Button><BottomSheet {...shared("Quick actions")}>A bottom-mounted sheet; no drag-to-dismiss gesture.</BottomSheet></Exhibit>
 <Exhibit id="popover" name="A little more context" number={77}><button ref={anchor} className="art-pix-overlay-trigger" type="button" aria-haspopup="dialog" aria-expanded={popover} aria-controls={popover ? "demo-popover" : undefined} onClick={() => setPopover(v => !v)}>Open popover</button><Popover id="demo-popover" label="Route information" open={popover} onOpenChange={setPopover} anchorRef={anchor}><p>Three stops along the river.</p><button type="button" className="art-pix-overlay-trigger" onClick={() => { setPopover(false); anchor.current?.focus(); }}>Done</button></Popover></Exhibit>
 <Exhibit id="tooltip" name="A useful hint" number={78}><Tooltip trigger="What is a waypoint?">A saved stop along your route.</Tooltip></Exhibit>
 <Exhibit id="hover-card" name="A small introduction" number={79}><HoverCard trigger="Meet the guide"><strong>Mira Chen</strong><p>Guide to the Mossglen trails.</p><a href="#contact-demo">View contact card</a></HoverCard></Exhibit>
 <Exhibit id="dropdown-menu" name="Choose an action" number={80}><DropdownMenu label="Route menu" items={items} /><span>{result}</span></Exhibit>
 <Exhibit id="submenu" name="One level deeper" number={81}><div role="menu" aria-label="Standalone submenu example"><Submenu label="Share route" items={items[2].children!} /></div><p>Use Right Arrow to enter, Left Arrow to return.</p><span>{result}</span></Exhibit>
 <Exhibit id="context-menu" name="Actions in context" number={82}><ContextMenu label="Route context actions" items={items}><p>Right-click here, or focus this area and press Shift+F10.</p></ContextMenu><span>{result}</span></Exhibit>
 <Exhibit id="action-menu" name="Ready to act" number={83}><ActionMenu label="Actions" items={items} /><span>{result}</span></Exhibit>
 <Exhibit id="menu-bar" name="Tools together" number={84}><MenuBar label="Adventure tools" menus={[{ id: "file", label: "File", items }, { id: "edit", label: "Edit", items: [{ id: "rename", label: "Rename", onSelect: () => setResult("Rename requested.") }] }]} /><span>{result}</span></Exhibit>
 <Exhibit id="display-menu" name="Your preferred view" number={85}><DisplayMenu options={[{ id: "details", label: "Show details", checked: details }, { id: "grid", label: "Grid view", checked: grid }]} onCheckedChange={(id, checked) => id === "details" ? setDetails(checked) : setGrid(checked)} /><span>Details {details ? "on" : "off"}; grid {grid ? "on" : "off"}.</span></Exhibit>
 <Exhibit id="combo-box-popup" name="Find a destination" number={86}><ComboBoxPopup label="Destination" value={query} selectedId={selected} onInputChange={setQuery} options={options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()))} onSelect={option => { setSelected(option.id); setQuery(option.label); }} /><span>Selected: {selected ?? "none"}</span></Exhibit>
 <Exhibit id="color-picker-popup" name="Choose your colors" number={87}><ColorPickerPopup value={color} onChange={setColor} /><span>Selected color: {color}</span></Exhibit>
 </>;
}
