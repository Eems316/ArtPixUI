# ArtPixUI component task list

Build one component at a time in the numbered phase order below, and top to bottom within each list. This retains all **186 original catalog entries exactly once**: **0 completed after review**, **36 awaiting review** (35 implementations and 1 removal), **150 not yet implemented**. The active source catalog has 185 components after removing the duplicate TextBox stub. An item's position shows where it fits in the dependency plan, not when it was created.

## Status and review workflow

Status markers: `[ ]` = not yet implemented; `[-]` = implemented or explicitly removed and awaiting review (removals must be noted); `[x]` = reviewed and approved by the user, completed. A successful build or implementation alone does not qualify an item for `[x]`.

1. Before starting each component, suggest its **look**, **animation (or none)**, and **function (or none)** based on the agreed visual direction: Spritecraft's parchment palette, green/amber accents, pixel art and monospaced details, combined with Plinth's rounded outlines and raised, tactile surfaces.
2. Ask whether the user wants any changes before creating the component. Wait for their response and resolve requested changes before implementation; do not treat silence as approval.
3. Record the agreed design beside that task using a short **Look / Animation / Function** description. Unimplemented entries currently describe scope only unless explicitly labeled otherwise; their detailed design remains to be agreed. Keep proposals clearly separate from agreed designs.
4. Implement that component, its public exports, and a playground example. Verify applicable behavior, native semantics, accessibility, and states. Respect reduced-motion preferences for animation.
5. Mark the implemented item `[-]` and provide its preview for review. In that same handoff response, name the next component in the task order, suggest its look, animation, and function, and ask whether the user wants changes before building it. Do not wait for a separate "next item" request to make this proposal. Keep the implemented item's description aligned with the agreed design, including any subsequently requested revisions.
6. Make review changes while keeping the item `[-]`. Change it to `[x]` only after the user explicitly approves the result. Approval of the next component's proposal is permission to build that next component, not approval of earlier pending-review components. Continue one component at a time and wait for the user's response to each proposal before implementation; proposing the next item does not authorize building it.

Button, IconButton, and ContactCard were previously marked complete based on implementation. They are now `[-]` under this review workflow; their descriptions below capture the current review targets. Label, Title, Link, CodeBlock, Icon, IconGroup, BasicCard, TextInput, TextArea, Checkbox, RadioButton, and ToggleSwitch also await review. TextBox's duplicate stub was removed and its removal awaits review; renaming the existing TextInput to TextBox is recorded as a pending TextInput review change, not yet implemented. Earlier items retain their pending-review status. Slider also awaits review. FileUpload also awaits review. PlaceholderImage also awaits review. Image also awaits review. Thumbnail also awaits review. Avatar also awaits review. AvatarGroup also awaits review. Logo also awaits review. ImageWithOverlay also awaits review. List also awaits review. KeyValueDisplay also awaits review. Table also awaits review. Timeline also awaits review. Header also awaits review. Footer also awaits review. NavigationBar also awaits review. Sidebar also awaits review. Breadcrumbs also awaits review. Pagination also awaits review. FaqAccordion also awaits review. The next new component to propose is SpinnerStatus.

The phases are implementation milestones, not replacement source categories. Keep each component in its existing canonical source folder. Similar components can share an implementation while retaining their individual catalog entries; do not silently merge or delete them.

For each component, finish its props and native semantics, styling and applicable states, accessibility and keyboard behavior, public exports, and playground example before marking it awaiting review. Reuse shared primitives and validate behavior in proportion to complexity. Completion additionally requires user approval.

Dependency exceptions to the broad phase order: CommandMenu follows search primitives in phase 8; Lightbox follows ImageViewer in phase 10; DatePickerPopup and DateFilter follow the date controls in phase 11. Cards completed in phase 9 accept content/slots for later media, date, and chart composition.

## Agreed editable-text behavior

All editable text components should use a **steady, non-blinking insertion caret** by default. This applies to TextInput, TextBox, TextArea, editable search/autocomplete/command fields, and editable text fields within filters, date/time controls, or other composed components. Static text components such as Label are unaffected.

Include this requirement in each applicable component's animation description and review checks when it is implemented. Preserve caret visibility, native editing, selection, and accessibility. Verify support in the target browsers and document any browser limitation or fallback during review; do not hide the caret to suppress blinking. This preference is agreed; other pending component designs still require the normal proposal and review workflow.

## 1. Foundations: typography, icons, actions, and surfaces

Establish reusable appearance and native interaction conventions before building composed components.

- [-] `Label` — Agreed look: small uppercase monospaced text in muted brown, modest letter spacing, and an optional dark required asterisk on parchment. Animation: none. Function: native label with `children`, `htmlFor`, class-name merging, and standard label attributes; clicking focuses the associated field or activates a nested control. The marker is informational; required validation stays on the input.

  **Review:** Playground `#label-demo` shows required, optional, and nested-checkbox labels. Verified label-to-input focus, checkbox activation by label and keyboard, required marker semantics, public declarations, build, and lint. Demo text fields use a steady caret (`caret-animation: manual`, verified in the current browser); unsupported browsers retain their native caret. The demo controls are native HTML, not implementations of the pending TextInput or Checkbox components.

- [-] `Title` — Agreed look: bold, dark-ink monospaced headings with tight letter spacing, six level-appropriate sizes, responsive H1/H2 sizing, and wrapping for long text. Animation: none. Function: `children`, a `level` prop from 1 to 6 (default 2), native heading attributes, and merged `className`; renders the corresponding semantic heading element.

  **Review:** Playground `#title-demo` shows all six levels, including the default H2. Verified rendered heading levels and appearance in the browser; typecheck, library build, and lint passed. Layout spacing belongs to the consumer; headings have no default margin.
- [-] `Link` — Agreed look: green monospaced text with a solid underline, dark ink on hover, and a visible green keyboard-focus outline. Animation: subtle 140ms color transition, removed for reduced-motion preferences. Function: required `href`, `children`, native anchor attributes and events, merged `className`, and default `noopener noreferrer` for `target="_blank"` when `rel` is not supplied; explicit `rel` is preserved.

  **Review:** Playground `#link-demo` shows same-tab, new-tab, and inline examples. Verified native keyboard navigation, visible focus outline, underline, and new-tab attributes in the browser; typecheck, library build, and lint passed.
- [-] `CodeBlock` — Agreed look: parchment surface, rounded dark outline, shallow raised base, dark monospaced code, and optional muted-brown language heading. Animation: none. Function: string `children`, preserved indentation, horizontal scrolling by default, optional `wrap`, and native `<pre><code>` semantics. No syntax-highlighting dependency. Keyboard-focusable code region with visible focus outline; native pre attributes are forwarded, while `className` styles the outer surface.

  **Review:** Playground `#code-demo` shows scrolling/labeled and wrapped/unlabeled examples. Verified presentation, visible keyboard focus, right-arrow scrolling, literal markup display, and wrapping in the browser. Typecheck, library build, and lint passed.
- [-] `Icon` — Agreed look: crisp pixel-style SVG shapes with inherited text color, small/medium/large sizes (16/24/32px), and no background or border. Animation: none. Function: SVG shape children, optional color and viewBox, merged className, hidden decorative semantics by default, and meaningful image semantics when aria-label or aria-labelledby is supplied. Not an interactive control; use Button or IconButton for actions. No dependencies added.

  **Review:** Playground `#icon-demo` includes all sizes, a labeled green heart, and a decorative icon inside IconButton. Typecheck, build, lint, and server-rendered attribute assertions passed. Browser visual verification remains pending: the preview server was restarted, but browser-tool navigation was blocked from its connection-error page.
- [-] `IconGroup` — Agreed look: aligned icons with consistent spacing, no background or border; horizontal by default, optional vertical layout and wrapping. Animation: none. Function: children remain unchanged; direction, spacing (small 0.5rem, medium 0.75rem, large 1rem), and wrap props; native div attributes and merged className. An accessible label gives the container group semantics; child controls keep their individual labels and native keyboard behavior. Default spacing is medium and wrapping is off. Vertical wrapping requires a constrained height.

  **Review:** Playground `#icon-group-demo` shows horizontal symbols, vertical links, and wrapping actions. Verified layout at the current narrow browser width, named group/child semantics, Tab focus, and Enter/Space activation. Typecheck, build, and lint passed. No dependencies added.
- [-] `Button` — Look: green primary or parchment secondary surface, monospaced text, rounded dark outline, beveled edges, and a raised base. Animation: slight lift on hover and compression on press; reduced-motion support. Function: text/content through children, native link through `link` or native button action, disabled states, and visible keyboard focus.
- [-] `IconButton` — Look: compact amber square with rounded dark outline, beveled edges, raised base, and a centered supplied icon. Animation: slight lift on hover and compression on press; reduced-motion support. Function: icon through children, `link` or native button action, required accessible label, disabled states, and visible keyboard focus.
- [-] `BasicCard` — Agreed look: parchment surface and subtle grain, rounded dark outline, beveled inner edges, shallow raised base, and comfortable padding. Animation: none; the card is a content container, not an action. Function: children, native div attributes, merged className, and small/medium/large padding (1rem/1.5rem/2rem, medium default). No built-in heading, image, or actions; compose those inside. Child layout and spacing belong to the consumer.

  **Review:** Playground `#basic-card-demo` shows all padding sizes and composition with Title, Button, and Link. Verified appearance and content fit at the current narrow browser width, computed padding, no animation/transition, and no added tab stop. Typecheck, build, and lint passed. No dependencies added.

## 2. Forms and inputs

Build native controls first. Standardize labels, controlled/uncontrolled values, descriptions, invalid states, disabled states, and keyboard behavior.

- [-] `TextInput` — Agreed look: parchment field, rounded dark outline, inset bevel, dark monospaced text, muted placeholder, green focus outline, distinct invalid state (rust double border), and subdued disabled styling. Animation: none; steady non-blinking caret where supported, native visible caret otherwise. Function: native input with text/email/password/search/tel/url types, controlled or uncontrolled values, native required/readOnly/disabled attributes, ref support, merged className, aria-invalid styling, external Label via id/htmlFor, and external descriptions via aria-describedby. No internal validation or generated messages.

  **Review:** Playground `#text-input-demo` shows controlled required, uncontrolled, invalid, read-only, and disabled fields. Verified label focus, controlled/uncontrolled typing, read-only edit prevention, disabled tab skipping, focus/invalid styling, and computed `caret-animation: manual` support in the current browser. Unsupported browsers retain their native caret. Typecheck, build, and lint passed; no new dependencies.
  **Requested review change (pending):** Rename the existing `TextInput` component to `TextBox`, preserving its look and functionality. Update its source folder/files, component and props names, public exports, generator catalog, examples, documentation, and internal references together. The public name remains `TextInput` until this review change is implemented; do not create a second duplicate implementation.

- [-] `TextBox` — REMOVED: deleted the unused duplicate component's three empty stub files and removed it from the scaffold generator so it is not recreated. Removal awaits review. Its name is intended for the existing TextInput implementation via the pending rename above; this historical entry does not represent a second component to build.
- [-] `TextArea` — Agreed look: matching parchment field, inset bevel, rounded outline, monospaced text, focus outline, and invalid/read-only/disabled treatments. Animation: none; steady caret where supported, visible native caret otherwise. Function: native multiline textarea with rows (default 4), controlled/uncontrolled values, ref and native attributes, external labels/descriptions, and boolean resizable (default true). True enables the native bottom-right handle for horizontal and vertical resizing; false removes user resizing. Width is capped at the parent width by default, with a 44px minimum size; overflow scrolls. The resizable prop takes precedence over style.resize.

  **Review:** Playground `#text-area-demo` shows resizable controlled, fixed uncontrolled, invalid, read-only, and disabled examples. Browser checks verified label focus, multiline controlled editing, manual caret styling, actual corner dragging changing both width and height, and a fixed field remaining unchanged after a corner drag. Typecheck, build, and lint passed. Native handle availability depends on browser/device; unsupported caret-animation browsers retain their native caret.
- [-] `Checkbox` — Agreed look: rounded parchment square, dark outline and raised base, green selected surface with a pixel checkmark, and dash for indeterminate state. Animation: subtle 120ms press feedback, movement/transition removed for reduced motion. Function: native checkbox with controlled checked/onChange or uncontrolled defaultChecked, required/disabled states, ref forwarding, indeterminate prop, native keyboard and external/nested label support. Mixed state is separate from checked/form submission; native activation clears it, and consumers derive/update it in onChange. Forced-colors mode uses native checkbox appearance.

  **Review:** Playground `#checkbox-demo` shows a controlled select-all group (initially mixed), uncontrolled and required controls, plus checked/unchecked disabled states. Verified pixel appearance, Space activation, controlled and uncontrolled label toggling, accessibility mixed state, and native required validity. Typecheck, build, and lint passed. No added dependencies.
- [-] `RadioButton` — Agreed look: parchment circle with dark outline, raised base, green selected center, visible focus outline, and subdued disabled state. Animation: subtle 120ms press feedback, removed for reduced motion. Function: native radio input with shared-name exclusive selection, controlled checked/onChange or uncontrolled defaultChecked, native required/disabled states, React 19 refs, merged className, labels, and arrow-key navigation. Forced-colors mode uses native appearance. Consumers provide group names and fieldset/legend context.

  **Review:** Playground `#radio-button-demo` shows controlled, uncontrolled, disabled, and required examples. Verified selected appearance/focus, arrow-key selection skipping disabled options, Tab between groups, external label clicks, exclusive checked state, and native required validity. Typecheck, build, and lint passed; no dependencies added.
- [-] `ToggleSwitch` — Agreed look: rounded parchment track, dark outline, raised circular thumb, and green on state. Animation: 140ms thumb slide, removed for reduced motion. Function: native checkbox with switch role, controlled checked/onChange or uncontrolled defaultChecked, disabled support, native attributes and React 19 refs, merged className, external/nested labels, and Space toggling. The label stays constant; state follows native checked. RTL reverses thumb direction; forced-colors styling uses system colors.

  **Review:** Playground `#toggle-switch-demo` shows controlled, uncontrolled, and disabled on/off examples. Verified switch accessibility state, Space activation, label toggling, and on/off thumb positions in the browser. Typecheck, build, and lint passed; no new dependencies.
- [-] `Slider` — Agreed look: inset parchment track, green filled portion, raised light thumb with dark outline, and visible focus outline. Animation: immediate native dragging with subtle pressed-shadow feedback and no movement transition. Function: native range input, min/max/step, numeric controlled value/onChange or uncontrolled defaultValue, disabled state, refs, labels, and native keyboard adjustment. Fill follows the browser-normalized value and form resets; no built-in label or value display.

  **Review:** Playground `#slider-demo` shows controlled volume, uncontrolled distance with nonzero minimum and reset, and disabled state. Verified dragging, arrow stepping, Home/End bounds, fill synchronization, and reset restoring both value and fill. Fixed a reset-timing bug found during browser verification. Typecheck, build, and lint passed.
- [-] `FileUpload` — Agreed look: parchment field, raised green native choose-file button, and selected filenames below. Animation: subtle press feedback, removed for reduced motion. Function: native single/multiple file picker, accept hints, disabled support, refs, external labels, and native onChange callback with FileList. Filenames are announced through a status region. No automatic uploading, file reading, progress, or security validation. Native form reset clears selection and filenames; value/defaultValue are not supported.

  **Review:** Playground `#file-upload-demo` shows single image, multiple text/Markdown files with reset, and disabled input. Verified single/multiple chooser modes, filename display, callback counts, and reset after a parent rerender using local project fixtures; no files were transmitted. Fixed a stale filename-list reset issue during verification. Build, typecheck, and lint passed.

## 3. Basic media and data display

Supply content primitives that richer cards, menus, and screens can reuse.

- [-] `PlaceholderImage` — Agreed look: parchment surface, rounded dark outline, centered muted pixel-image symbol, and optional visible text. Animation: none. Function: static reusable fallback with width/height/aspectRatio props (default full width, 16:9), native div attributes/ref, and merged className/style. Alt supplies its accessible image description (default Image unavailable); empty alt makes it decorative. No network requests or image loading. Width is capped at its container by default; style can override sizing.

  **Review:** Playground `#placeholder-image-demo` shows labeled 16:9, 180px square icon-only, and decorative 220×120 examples. Verified dimensions/ratio, appearance at the current narrow width, image labels, decorative aria-hidden, and no animation. Typecheck, build, and lint passed.
- [-] `Image` — Agreed look: rounded dark outline, configurable dimensions/aspect ratio, cover (default) or contain fit. Animation: none. Function: native image with required alt, optional src, srcSet/sizes, optional native lazy loading, and shared PlaceholderImage for missing/failed sources. Optional fallbackText; source/srcSet/sizes changes reset failure state. Empty alt remains decorative. Image load/error callbacks stay native; fallback retains id/title, class/style, dimensions, alt, and description. No added dependencies.

  **Review:** Playground `#image-demo` shows loaded cover/contain images, native lazy/srcSet attributes, missing-source fallback, and a broken-source toggle. Browser checks verified actual loading, fit and dimensions, alternative text, failed/missing placeholders, recovery to a valid source, and fallback after another failure. Typecheck, build, and lint passed.
- [-] `Thumbnail` — Agreed look: compact image with rounded dark outline, square by default. Animation: none. Function: composes Image with small/medium/large default dimensions (64/96/128px, medium default), cover/contain fit, required alt, shared native loading and missing/failed-source fallback. Explicit width/height override size defaults. No built-in click action. Compact fallback icon and optional short text.

  **Review:** Playground `#thumbnail-demo` shows all preset sizes, custom 128×80 contain fit, missing and failed sources, and decorative alt text. Browser checks verified exact dimensions, loaded images, fit, fallback sizing/appearance, and decorative semantics. Typecheck, build, and lint passed; no dependencies added.
- [-] `Avatar` — Agreed look: circular portrait with dark outline, parchment surface, and green initials or pixel-person fallback; small/medium/large sizes (32/48/64px, medium default). Animation: none. Function: src displays a cover-cropped portrait; name supplies initials and the default accessible label; alt overrides that label, with an empty string making it decorative. Missing/failed images show initials, or a pixel person without a name. Changing src retries the image. No built-in action.
  - Review: confirm the three sizes, image cropping, initials and unnamed fallback, decorative accessibility, and broken-image recovery in the playground. Build, lint, and browser checks passed.
- [-] `AvatarGroup` — Agreed look: overlapping circular portraits with dark outlines and a parchment/green +N overflow count; consistent small/medium/large sizes. Animation: none. Function: groups direct Avatar children with an optional max visible count, accessible group naming, and an accessible remaining-person count. No built-in click action. Supports right-to-left layout.
  - Review: check overlap and sizes, no-limit and zero-visible cases, plural/singular overflow labels, and right-to-left layout. Build, lint, and browser checks passed.
- [-] `Logo` — Agreed look: supplied brand image with preserved proportions and crisp pixel-art rendering; no forced background or border. Animation: none. Function: native image source, required alt text, adjustable width/height, and optional link with destination label, target, rel, and visible keyboard focus. Both dimensions use contain fitting without distortion. Native image props/ref remain on the image; decorative unlinked images use empty alt.
  - Review: inspect scaling, fixed-box containment, decorative semantics, and linked keyboard navigation/focus. Playground artwork is a sample, not a required brand asset. Build, lint, and browser checks passed.
- [-] `ImageWithOverlay` — Agreed look: rounded dark frame with cover-cropped image, dark gradient, and parchment-colored content. Animation: none. Function: src and required alt, children for overlay content, top/center/bottom positioning (bottom default), and adjustable aspect ratio (16:9 default). Content can grow the frame; shared Image handles missing/failed sources. The wrapper has no built-in action; child controls keep their own semantics.
  - Review: check all positions, image cropping and text contrast, missing/failed-image fallbacks, long-content wrapping, and child keyboard navigation/focus. Build, lint, and browser checks passed.
- [-] `List` — Agreed look: monospaced text with green square bullets or numbered markers; regular 12px or compact 4px item spacing. Animation: none. Function: native unordered list by default or ordered list with ordered=true; accepts native li children and nested lists. Ordered lists retain start/reversed/type support. Native props and ref target the selected list element; child links and controls retain their own behavior.
  - Review: check markers, regular/compact spacing, nested content, long-text wrapping, starting/reversed numbers, right-to-left layout, and child keyboard navigation/focus. Build, lint, and browser checks passed.
- [-] `KeyValueDisplay` — Agreed look: muted labels, dark monospaced values, and subtle solid dividers. Animation: none. Function: semantic dl/dt/dd label/value pairs, side-by-side above 400px container width and stacked at or below 400px. Accepts items with unique id, label, and value; labels and values support custom React content. Long text wraps, zero values remain visible, and child controls retain keyboard behavior.
  - Review: inspect wide and narrow layouts, divider styling, long values, numeric zero, custom avatar/link content, and keyboard navigation/focus. Build, lint, and browser checks passed.
- [-] `Table` — Agreed look: parchment surface, rounded dark outline, monospaced text, and solid row dividers. Animation: none. Function: native table with composed headers/cells, optional caption, custom cell content, and keyboard-focusable horizontal scrolling region for narrow containers. Native table props/ref are forwarded; minWidth defaults to 480px. No built-in sorting or pagination.
  - Review: inspect caption, column/row header scopes, custom links, zero values, footer and colSpan content, narrow-container scrolling, and visible keyboard focus. Build, lint, and browser checks passed.
- [-] `Timeline` — Agreed look: solid vertical connector, green square markers, dark monospaced titles, and muted timestamps. Animation: none. Function: semantic ordered events with unique ids, titles, optional preformatted timestamps and machine-readable dateTime, and custom content. Supplied order is preserved with no sorting or date formatting. Connector ends at the last marker; logical positioning supports RTL.
  - Review: inspect multi-event and single-event layouts, connector endpoints, wrapped text, timestamps with/without dateTime, absent timestamps, custom content, and child keyboard navigation/focus. Build, lint, and browser checks passed.

## 4. Layout and navigation

Assemble the first reusable page structures and navigation patterns.

- [-] `Header` — Agreed look: parchment background, dark bottom border, brand/title area, and space for navigation/actions. Animation: none. Function: native header with optional brand, navigation, and actions slots plus full-width supporting children. Slots wrap in narrow containers. Navigation has a configurable accessible label; child links/actions retain native behavior. No sticky behavior by default.
  - Review: inspect full, compact 300px, and simple section examples; slot wrapping, optional slots, navigation names, and keyboard navigation/focus. Build, lint, and browser checks passed.
- [-] `Footer` — Agreed look: parchment background, dark top border, and muted monospaced supporting text. Animation: none. Function: native footer with optional brand/navigation slots and full-width supporting children; content wraps in narrow containers. Navigation has a configurable accessible label, while child links retain their behavior. No fixed positioning or automatic copyright content.
  - Review: inspect full, compact 300px, and content-only examples; wrapping, optional slots, navigation names, and keyboard navigation/focus. Build, lint, and browser checks passed.
- [-] `NavigationBar` — Agreed look: parchment surface, green links, and a distinct current-page indicator (light surface, green bottom border, thicker underline). Animation: no added motion; existing Link/Button interactions remain. Function: native named navigation with caller-supplied link items, optional brand/actions, aria-current for current items, and wrapping layout. No mobile drawer or automatic routing state.
  - Review: inspect full, compact 300px, and RTL examples; current-page styling/semantics, long-label wrapping, optional slots, navigation names, and keyboard navigation/focus. Build, lint, and browser checks passed.
- [-] `Sidebar` — Agreed look: parchment panel, dark border, vertical green links/current-page indicator, and an icon rail when collapsed. Animation: optional 180ms width transition and drawer entry slide, disabled by animated=false or reduced-motion preferences; dismissal is immediate. Function: collapse enables the capability (false is static); collapsed controls state through onCollapsedChange and is ignored when collapse=false. Collapsed rail is 72px, peeks to 112px on hover/focus, and expands to 280px using the expand control. Optional drawer mode uses controlled open/onOpenChange, modal backdrop, Escape/Close dismissal, keyboard focus wrapping/restoration, and background scroll locking. Navigation links still navigate; headings and custom content are hidden when collapsed. Drawer behavior was brought forward by user request.
  - Review: inspect static-with-collapsed=true, rail/peek/full expansion, icons and accessible names, custom content visibility, drawer open/close, backdrop/Escape dismissal, focus wrapping/restoration, and animation settings. Build/lint and live interaction checks passed; reduced-motion rules checked in source.
- [-] `Breadcrumbs` — Agreed look: green links, muted pixel-chevron separators, and dark current-page text. Animation: shared Link interactions only. Function: named native navigation with ordered items, final item rendered as non-linked aria-current=page text, and wrapping without truncation. Separators are decorative and mirror for RTL. Earlier items without href render as plain text.
  - Review: inspect regular, narrow 240px, single-item, and RTL trails; current page stays unlinked even with href supplied, separator semantics, wrapping, and keyboard navigation/focus. Build, lint, and browser checks passed.
- [-] `Pagination` — Agreed look: parchment buttons with dark outlines, green/underlined current page, and muted disabled controls. Animation: shared tactile button interactions and reduced-motion support. Function: controlled one-based page/totalPages/onPageChange, numbered buttons, Previous/Next, decorative ellipses for long ranges, and disabled first/last boundaries. Optional disabled disables all controls. Native named navigation wraps in narrow containers; page content and fetching remain caller-owned.
  - Review: inspect short/long ranges, current-page semantics, single-page/disabled states, wrapping, Enter/Space and pointer changes, and boundary controls. Build, lint, browser interactions, and 143 automated page-state checks plus invalid/large inputs passed.
- [-] `FaqAccordion` — Agreed look: parchment panels, rounded dark outlines, bold questions, green plus/minus indicators, and solid answer dividers. Animation: 180ms height/opacity opening and closing, disabled by reduced-motion preference. Function: question/answer disclosures with custom answer content, optional singleOpen mode, default or controlled open IDs, and configurable heading level. Native buttons expose expanded state and panel IDs; closed answers are inert and hidden from assistive technology. All panels may be closed.
  - Review: inspect closed/open and long-content layouts, Enter/Space toggling, multiple-open and controlled single-open modes, panel associations, and Tab skipping closed answer links. Build, lint, and browser checks passed; reduced-motion rules checked in source.

## 5. Loading and progress

Build the small indicators before composing full loading surfaces, loading actions, or transfer-specific progress.

- [ ] `SpinnerStatus` — Labeled busy indicator.
- [ ] `DotsLoader` — Dots-based loading indicator.
- [ ] `PulseLoader` — Pulse-based loading indicator.
- [ ] `ProgressBar` — Accessible determinate linear progress.
- [ ] `IndeterminateProgressBar` — Linear progress without a known completion value.
- [ ] `CircularProgress` — Accessible circular progress.
- [ ] `ProgressSteps` — Current, completed, and upcoming steps.
- [ ] `SkeletonLoader` — Static content placeholders.
- [ ] `ShimmerSkeleton` — Animated SkeletonLoader treatment with reduced-motion support.
- [ ] `LoadingButton` — Button with a loading indicator and busy behavior.
- [ ] `UploadProgress` — Upload-specific composition of ProgressBar and status text.
- [ ] `DownloadProgress` — Download-specific composition of ProgressBar and status text.
- [ ] `BufferingIndicator` — Media buffering treatment using the shared indicators.
- [ ] `LoadingOverlay` — Local loading layer for an existing content region.
- [ ] `LoadingScreen` — Full loading view composed from the earlier indicators.

## 6. Feedback, notifications, and states

Build common message and state treatments before notification variants. Use shared live-region, timing, and dismissal behavior where appropriate.

- [ ] `Alert` — Base alert surface and severity styling.
- [ ] `StatusMessage` — Shared status text and announcement conventions.
- [ ] `InfoMessage` — Informational message treatment.
- [ ] `SuccessMessage` — Successful outcome message treatment.
- [ ] `WarningMessage` — Warning message treatment.
- [ ] `ErrorMessage` — Error message treatment.
- [ ] `ValidationMessage` — Field feedback associated with the phase 2 inputs.
- [ ] `NotificationDot` — Small unread/activity indicator.
- [ ] `NotificationBadge` — Count or status badge.
- [ ] `NotificationBanner` — Persistent, optionally dismissible notification surface.
- [ ] `EmptyState` — Reusable empty-content composition.
- [ ] `ErrorState` — Error-content composition using the shared state surface.
- [ ] `SuccessState` — Success-content composition using the shared state surface.
- [ ] `Toast` — Transient notifications with shared announcement and dismissal behavior.
- [ ] `Snackbar` — Compact Toast variant with optional action.
- [ ] `UndoNotification` — Notification with an undo action and explicit expiry behavior.
- [ ] `ProgressNotification` — Notification composed with phase 5 progress indicators.

## 7. Overlays and menus

Implement shared focus management, Escape handling, dismissal, positioning, and keyboard navigation before the specialized overlays. CommandMenu moves to phase 8, Lightbox to phase 10, and DatePickerPopup to phase 11 to follow their content dependencies.

- [ ] `Backdrop` — Shared overlay background.
- [ ] `Dialog` — Accessible dialog core and focus lifecycle.
- [ ] `Modal` — Modal presentation composed from Dialog and Backdrop.
- [ ] `ConfirmationDialog` — Confirmation content and actions using Dialog.
- [ ] `DestructiveConfirmation` — Destructive-action confirmation variant.
- [ ] `AlertDialog` — Urgent decision variant with appropriate alert-dialog semantics.
- [ ] `Drawer` — Edge-mounted dialog surface.
- [ ] `Sheet` — Shared sheet presentation using the dialog/drawer behavior.
- [ ] `BottomSheet` — Bottom-mounted Sheet variant.
- [ ] `Popover` — Anchored popup positioning and dismissal.
- [ ] `Tooltip` — Accessible short descriptions using the positioning primitive.
- [ ] `HoverCard` — Richer hover/focus preview content.
- [ ] `DropdownMenu` — Shared menu surface, items, and keyboard behavior.
- [ ] `Submenu` — Nested menu navigation using the base menu behavior.
- [ ] `ContextMenu` — Context-triggered menu with keyboard access.
- [ ] `ActionMenu` — Action-focused menu composition.
- [ ] `MenuBar` — Top-level menu navigation and Submenu composition.
- [ ] `DisplayMenu` — Display-options menu; settle the intended options before implementation.
- [ ] `ComboBoxPopup` — Accessible option-list popup for the upcoming autocomplete controls.
- [ ] `ColorPickerPopup` — Color controls composed with Popover, TextInput, and Slider.

## 8. Search, filtering, and sorting

Compose the inputs and popup/menu primitives into search workflows. DateFilter is deliberately scheduled after the date-range controls in phase 11.

- [ ] `SearchInput` — Canonical search field using TextInput.
- [ ] `SearchBar` — SearchInput with actions and layout.
- [ ] `SearchSuggestions` — Reusable suggestion rendering and selection.
- [ ] `Autocomplete` — Search input with ComboBoxPopup and suggestions.
- [ ] `SearchHistory` — Previously used query presentation and selection.
- [ ] `CommandMenu` — Searchable command overlay using Dialog, SearchInput, and option navigation.
- [ ] `CommandSearch` — Command-search entry and matching built on CommandMenu.
- [ ] `CheckboxFilter` — Multiple-choice filter using Checkbox.
- [ ] `RadioFilter` — Single-choice filter using RadioButton.
- [ ] `RangeFilter` — Numeric range state and input controls.
- [ ] `RangeFilterSlider` — RangeFilter with slider interaction.
- [ ] `RatingFilter` — Rating-based selection.
- [ ] `CategoryFilter` — Category selection using the shared choice controls.
- [ ] `SortSelect` — Accessible sorting-option selection.
- [ ] `SortDirectionToggle` — Ascending/descending toggle.
- [ ] `ResultsCount` — Accessible result-count presentation.
- [ ] `ClearFilters` — Reset action for the shared filter state.
- [ ] `NoResultsDisplay` — Search-specific EmptyState.
- [ ] `FilterChips` — Active filter summaries with removal actions.
- [ ] `FilterDropdown` — Dropdown presentation of filter controls.
- [ ] `FilterMenu` — Menu-style filter selection.
- [ ] `FilterBar` — Inline filter controls, chips, count, and reset action.
- [ ] `FilterPanel` — Expanded filter groups and actions.
- [ ] `FacetedFilters` — Multiple coordinated filter groups and facet counts.
- [ ] `SavedSearch` — Saved query and filter configuration composition.

## 9. Specialized cards

Compose BasicCard and the earlier primitives. Card APIs should accept content and slots so advanced media, date, and chart components can be added later without coupling the card implementation to them.

- [-] `ContactCard` — Look: lightly textured parchment, rounded dark outline and raised base, monospaced title/name, circular image or pixel avatar fallback, pixel phone/email icons, and a solid divider; no yellow plus/minus indicator. Animation: subtle lift and detail reveal on expansion, respecting reduced motion. Function: `title`, `name`, `img`, `phone`, `email`, and children; hover previews details, click/Enter/Space toggles pinned expansion, Escape closes, and contact links remain keyboard accessible.
- [ ] `UserCard` — User identity, avatar, and actions.
- [ ] `FeatureCard` — Icon, heading, descriptive content, and action.
- [ ] `ProductCard` — Product image, details, price, and actions.
- [ ] `MediaCard` — Basic media preview and content slots; richer players follow in phase 10.
- [ ] `PricingCard` — Price, feature list, and primary action.
- [ ] `NotificationCard` — Notification details, status, and actions.
- [ ] `EventCard` — Event details with supplied date/time content; date-specific components follow in phase 11.
- [ ] `TestimonialCard` — Quote, attribution, and optional avatar.
- [ ] `KpiStatCard` — Metric, label, and optional trend slot; TrendIndicator follows in phase 12.
- [ ] `DashboardCard` — Content container with heading, loading/empty states, and visualization slots.

## 10. Advanced media and viewers

Build reusable controls and viewing primitives before complete galleries and players. Lightbox belongs here because it composes the phase 7 overlay behavior with an image viewer.

- [ ] `MediaControls` — Reusable playback, time, volume, and related controls.
- [ ] `ZoomableImage` — Image zoom and pan behavior.
- [ ] `ImageGrid` — Responsive image arrangement.
- [ ] `Carousel` — Shared slide navigation and accessibility.
- [ ] `ImageSlider` — Image-focused composition of Carousel.
- [ ] `ImageViewer` — Embedded viewing surface with image navigation and zoom.
- [ ] `Lightbox` — Modal image-viewing composition using ImageViewer and Dialog.
- [ ] `ImageGallery` — ImageGrid with viewer/lightbox selection.
- [ ] `BeforeAfterImage` — Accessible comparison of two images.
- [ ] `VideoThumbnail` — Video preview image and play affordance.
- [ ] `AudioPlayer` — Native audio playback with MediaControls.
- [ ] `VideoPlayer` — Native video playback, thumbnail, buffering state, and MediaControls.
- [ ] `MediaPreview` — Preview composition for supported media types.
- [ ] `QrCodeDisplay` — Valid QR encoding and accessible alternative content; resolve any encoding dependency before implementation.

## 11. Date and time

Define shared private date parsing, formatting, selection, locale, and timezone conventions first. Then build inputs and calendar parts before complete calendars, popups, ranges, and the scheduler.

- [ ] `Timestamp` — Date/time formatting and semantic time output.
- [ ] `DateBadge` — Compact date presentation.
- [ ] `DateInput` — Validated date entry.
- [ ] `TimeInput` — Validated time entry.
- [ ] `DurationInput` — Duration entry with explicit units.
- [ ] `TimezoneSelector` — Timezone selection for the later date/time controls.
- [ ] `CalendarHeader` — Displayed month/year and calendar navigation.
- [ ] `CalendarGrid` — Day cells, selection, disabled dates, and keyboard navigation.
- [ ] `Calendar` — CalendarHeader and CalendarGrid composition.
- [ ] `InlineCalendar` — Embedded calendar selection variant.
- [ ] `MonthPicker` — Month selection.
- [ ] `YearPicker` — Year selection.
- [ ] `WeekPicker` — Week selection using the calendar conventions.
- [ ] `TimePicker` — TimeInput with time-selection controls.
- [ ] `DatePicker` — DateInput and Calendar selection behavior.
- [ ] `DatePickerPopup` — Popover presentation of DatePicker with focus and dismissal integration.
- [ ] `CalendarRange` — Calendar-based start/end range selection.
- [ ] `DateRangePicker` — Range inputs and CalendarRange composition.
- [ ] `TimeRangePicker` — Start/end time selection using TimePicker.
- [ ] `DateTimePicker` — Combined DatePicker and TimePicker with timezone handling.
- [ ] `DateFilter` — Date/DateRangePicker integrated with the phase 8 filter state.
- [ ] `Countdown` — Remaining-time display with cleanup and completion behavior.
- [ ] `Timer` — Elapsed-time controls and display.
- [ ] `Scheduler` — Scheduling composition using calendar, date/time selection, navigation, and dialogs.

## 12. Chart foundations, charts, and decorative effects

The order within this phase matters: shared chart infrastructure first, small indicators next, and actual charts afterward. Resolve the rendering approach and any dependency approval before implementation. Shared private domain/scale calculations, tick generation, formatting, geometry, responsive measurements, and accessible data descriptions must be defined alongside the infrastructure; they are implementation prerequisites, not additional public components.

### 12.1 Shared chart components — complete before the charts

- [ ] `ChartContainer` — Responsive plotting surface, dimensions, plot margins, and shared chart context.
- [ ] `ChartTitle` — Accessible chart heading and description integration.
- [ ] `Axis` — Scale/domain contract, ticks, labels, and orientation.
- [ ] `Grid` — Plot gridlines from the same scales and ticks as Axis; this is the chart Grid, not ImageGrid or a layout grid.
- [ ] `Legend` — Series labels, colors, symbols, and visibility conventions.
- [ ] `DataLabel` — Reusable value-label formatting and placement; this is the catalog name for data labels.
- [ ] `ChartTooltip` — Data inspection content, positioning, formatting, and keyboard-accessible equivalents.
- [ ] `ChartEmptyState` — Chart-specific empty/invalid-data presentation using EmptyState.
- [ ] `ChartLoadingState` — Chart-specific loading presentation using the phase 5 placeholders.

### 12.2 Small visualization components

- [ ] `Meter` — Value-within-a-range display and shared numeric-domain handling.
- [ ] `Gauge` — Gauge geometry using the established range and formatting conventions.
- [ ] `TrendIndicator` — Direction and change display using Icon and shared numeric formatting.
- [ ] `Temperature` — Temperature display with explicit units and range conventions.

### 12.3 Actual charts — reuse the shared components

- [ ] `BarChart` — First Cartesian chart; validates the container, axis, grid, labels, legend, tooltip, and state contracts.
- [ ] `HorizontalBarChart` — Horizontal orientation of the shared bar-chart behavior.
- [ ] `StackedBarChart` — Multiple stacked series using the established bar geometry and series contracts.
- [ ] `LineChart` — Line-series geometry using the shared Cartesian infrastructure.
- [ ] `AreaChart` — Filled-area variant built on LineChart's series geometry.
- [ ] `ScatterPlot` — Point plotting and data inspection.
- [ ] `BubbleChart` — ScatterPlot with an additional size scale.
- [ ] `PieChart` — Shared radial slice geometry and labels.
- [ ] `DonutChart` — PieChart geometry with an inner radius and optional center content.
- [ ] `RadarChart` — Radial axes, grid, and multiple series; extend the earlier Axis/Grid conventions for radial layouts.

### 12.4 Decorative effects

- [ ] `LayeredBackground` — Composable background layers with content readability controls.
- [ ] `Stripes` — Reusable repeating stripe treatment.
