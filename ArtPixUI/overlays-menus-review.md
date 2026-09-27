# Overlays and menus — awaiting review

All 20 phase 7 components are implemented and marked `[-]`, not `[x]`. The user authorized this phase as an autonomous batch. Earlier pending reviews remain unchanged. No dependencies were added, and nothing was committed or pushed.

## Design and implementation plan

1. Establish the dark scrim and native modal dialog lifecycle, including nested focus return and reference-counted body scroll locking.
2. Compose confirmation, alert, edge drawer, centered sheet and bottom sheet variants from that foundation.
3. Establish a non-modal top-layer popup with resize/scroll positioning, viewport flip/clamp and dismissal.
4. Compose text hints, rich hover previews, keyboard menus, nested/context/action/display menus and a roving-tab-stop menu bar.
5. Compose an input/listbox popup and an RGB color picker from the existing input/slider controls.
6. Export all components, add playground exhibits 68–87, run automated checks, and record outstanding live review checks.

Look: Spritecraft parchment, green and amber palette, monospaced details, square check indicators; Plinth rounded ink outlines and raised bases. Destructive actions use a restrained dark red. Animation: 140ms entry fade/lift; drawers enter from their edge, bottom sheets from below. Closing is immediate. All surface animation is disabled for reduced motion. Hover hints have a 300ms opening delay and 180ms leaving grace. Editable fields reuse the steady-caret preference, with the browser's native visible caret as fallback.

## Preview index

Open the local playground with `npm run dev`. These links use its usual port; use the port printed by Vite if it differs.

| Component | Preview | Primary review target |
| --- | --- | --- |
| Backdrop | [Preview](http://127.0.0.1:5173/#backdrop-demo) | Decorative scrim; no focus or dismissal behavior by itself |
| Dialog | [Preview](http://127.0.0.1:5173/#dialog-demo) | Tab wrap, nested dialogs, Escape, return focus |
| Modal | [Preview](http://127.0.0.1:5173/#modal-demo) | Background inertness and outside dismissal |
| ConfirmationDialog | [Preview](http://127.0.0.1:5173/#confirmation-dialog-demo) | Cancel-first focus, confirm callback, busy state |
| DestructiveConfirmation | [Preview](http://127.0.0.1:5173/#destructive-confirmation-demo) | Deliberate destructive action, no backdrop dismissal |
| AlertDialog | [Preview](http://127.0.0.1:5173/#alert-dialog-demo) | Urgent semantics and acknowledgment |
| Drawer | [Preview](http://127.0.0.1:5173/#drawer-demo) | Edge entry, narrow-screen fit, scrolling |
| Sheet | [Preview](http://127.0.0.1:5173/#sheet-demo) | Wider modal working surface |
| BottomSheet | [Preview](http://127.0.0.1:5173/#bottom-sheet-demo) | Bottom alignment, max height, no drag gesture |
| Popover | [Preview](http://127.0.0.1:5173/#popover-demo) | Position, dismissal and focus return |
| Tooltip | [Preview](http://127.0.0.1:5173/#tooltip-demo) | Hover/focus/touch and described-by text |
| HoverCard | [Preview](http://127.0.0.1:5173/#hover-card-demo) | Pointer travel, keyboard access to rich content |
| DropdownMenu | [Preview](http://127.0.0.1:5173/#dropdown-menu-demo) | Disabled skipping, arrows, typeahead, nesting |
| Submenu | [Preview](http://127.0.0.1:5173/#submenu-demo) | Right to open; Left/Escape to return |
| ContextMenu | [Preview](http://127.0.0.1:5173/#context-menu-demo) | Right-click and Shift+F10/ContextMenu key |
| ActionMenu | [Preview](http://127.0.0.1:5173/#action-menu-demo) | Callback-only actions |
| MenuBar | [Preview](http://127.0.0.1:5173/#menu-bar-demo) | Roving tab stop, horizontal movement, nested menus |
| DisplayMenu | [Preview](http://127.0.0.1:5173/#display-menu-demo) | Controlled checked options |
| ComboBoxPopup | [Preview](http://127.0.0.1:5173/#combo-box-popup-demo) | Input focus retained, filtering/selection, disabled/empty states |
| ColorPickerPopup | [Preview](http://127.0.0.1:5173/#color-picker-popup-demo) | Hex validation, RGB sliders, swatches, Done |

## Public API notes

- Import components and prop types from `art-pix-ui`, and import `art-pix-ui/styles.css` once. Direct source component imports also load the shared overlay styles.
- `Dialog`, `Modal`, `Drawer`, `Sheet`, `BottomSheet` and alert/confirmation variants require `open`, `onOpenChange` and `title`; accept `children`, optional `description`, `className`, `closeLabel`, Escape/backdrop settings where appropriate, and an optional `initialFocus` CSS selector for the general dialog family. Keep the selector stable and valid. The native dialog owns the backdrop and modal top layer; `Backdrop` exposes its matching scrim treatment independently.
- `ConfirmationDialog` additionally requires `onConfirm`; optional `confirmLabel`, `busy` and `destructive`. It forces Cancel-first focus and disables backdrop dismissal. The parent owns async work, busy state and closing after confirmation. `DestructiveConfirmation` forces the destructive style, with default label Delete. `AlertDialog` defaults its acknowledgment label to Understood.
- `Drawer.side` is left/right (default right). `Sheet.position` is center/bottom (default center). `BottomSheet` fixes bottom placement. There is no drag/resize gesture.
- `Popover` requires `open`, `onOpenChange`, `anchorRef`, `label` and `children`. Optional `id`, `placement` (bottom/top/right/left), `className`, `focus`, `role`, `point`, and `onKeyDown` support compositions. The caller owns the trigger and its `aria-haspopup`, `aria-expanded`, `aria-controls`. Mount a popup inside its owning dialog when used within a modal. The popup is non-modal and does not trap focus. Keep anchor refs stable. Callbacks request closing; the parent must update `open`.
- `Tooltip` and `HoverCard` own a text-labeled button trigger (`trigger`); support `children`, `delay`, `placement`, `className`. Tooltip children must be plain text. HoverCard permits richer children. Use HoverCard for interactive content, never Tooltip.
- `DropdownMenu` and `ActionMenu` accept `label`, `items`, optional `disabled`, `className`. Each `MenuItem` has unique `id`, text `label`, optional `disabled`, `onSelect`, `checked`, or nested `children`. Selection closes the menu and invokes the callback; no navigation/data operation is implicit. `checked` renders a menuitemcheckbox. Keyboard: Up/Down, Home/End, single-character typeahead; Enter/Space activate; Escape closes the innermost popup; Tab exits. Nested children use Right/Left navigation. No multi-character typeahead buffer in this version.
- `Submenu` accepts the same item data plus `onSelectComplete`; place it inside a `role="menu"` container. For normal nested dropdowns, prefer `items[].children` so the complete parent chain closes automatically.
- `ContextMenu` accepts `label`, `items`, `children`, optional `className` and `disabled`. It creates a focusable target; put noninteractive context-preview content there rather than overlapping independent context handlers.
- `MenuBar` accepts a label and `menus` (`id`, `label`, `items`, optional `disabled`), plus `className`. Arrow Left/Right and Home/End move across launchers; Down opens the active menu.
- `DisplayMenu` accepts `label`, controlled `options` (`id`, `label`, `checked`, optional `disabled`) and `onCheckedChange(id, checked)`. The batch design uses generic caller-owned toggles rather than presuming a specific application's display settings.
- `ComboBoxPopup` includes the input so it can wire the input/listbox relationship reliably. Required: `label`, `value`, `onInputChange`, `options`, `onSelect`; optional `selectedId`, `disabled`, `placeholder`, `emptyText`. Options have unique `id`, `label`, optional `disabled`. Filtering is the caller's job; this is not the later Autocomplete component. It uses active-descendant navigation without moving DOM focus from the input.
- `ColorPickerPopup` requires `value` and `onChange`, with optional `label`, `disabled` and `swatches`. Values use `#RRGGBB`; invalid drafts are shown as invalid without emitting a change. Invalid incoming values render a green fallback preview until corrected. RGB sliders range 0–255. Alpha, HSV, eyedropper and saved palettes are not part of this implementation.

```tsx
const [open, setOpen] = useState(false);
<>
  <Button onClick={() => setOpen(true)}>Review deletion</Button>
  <DestructiveConfirmation
    title="Delete route?" description="This cannot be undone."
    open={open} onOpenChange={setOpen}
    onConfirm={() => { /* perform the app's action */ setOpen(false); }}
  />
</>
```

## Verification and remaining review

Automated checks: TypeScript/library declaration build, production playground build, lint, and all existing `scripts/check-*.mjs` checks pass. New `check-overlays-menus.mjs` covers 20 exports, server-rendered semantics, closed rendering, confirmation callbacks/busy controls, display callbacks, popup geometry/clamping, empty/reverse/wrapping option navigation, and the actual menu keyboard handler using deterministic node fixtures.

**Live browser verification is not claimed.** The browser tool refused the local preview under its URL-security policy. That block was not bypassed. No screenshots were captured; any future preview images belong in workspace-root `samples/` and should only be embedded in handoffs for remote users without file access.

Manual review still needed: pointer/hover/touch operation; native dialog/Popover API behavior; focus entry, containment, return and nested dismissal; viewport collision at narrow widths and zoom; reduced-motion rendering; steady caret support; screen-reader announcements/active-descendant behavior; context-menu invocation; long text/content, disabled/empty lists and multiple instances. Test current Chromium, Firefox and Safari. Native `HTMLDialogElement.showModal()`, the Popover API and ResizeObserver are required; no compatibility polyfill was added. The shared scroll lock covers this dialog family, not independent modal systems in a consuming app.

No phase 8+ components were implemented. CommandMenu, Lightbox and DatePickerPopup retain their later dependency slots. Next unimplemented task: SearchInput.
