# ArtPixUI

ArtPixUI is a reusable React and TypeScript UI library. It builds as an ESM package with TypeScript declarations and a separately imported stylesheet. Its components combine parchment surfaces, pixel details, green and amber colors, rounded outlines, and tactile raised edges.

## Development

```bash
npm install
npm run dev
```

The Vite playground is under `src/playground/` and is excluded from the distributed package.

```bash
npm run typecheck
npm run lint
npm run build
npm pack
```

## Consumer usage

Install a packed tarball during local development:

```bash
npm install path/to/art-pix-ui-0.1.0.tgz
```

Import the stylesheet once in the consumer application's global entry:

```ts
import "art-pix-ui/styles.css";
```

Available components: `InfoMessage`, `SuccessMessage`, `WarningMessage`, `ErrorMessage`, `ValidationMessage`, `NotificationDot`, `NotificationBadge`, `NotificationBanner`, `EmptyState`, `ErrorState`, `SuccessState`, `Toast`, `Snackbar`, `UndoNotification`, `ProgressNotification`, `StatusMessage`, `Alert`, `LoadingScreen`, `LoadingOverlay`, `BufferingIndicator`, `DownloadProgress`, `UploadProgress`, `LoadingButton`, `ShimmerSkeleton`, `SkeletonLoader`, `ProgressSteps`, `CircularProgress`, `IndeterminateProgressBar`, `ProgressBar`, `PulseLoader`, `DotsLoader`, `SpinnerStatus`, `FaqAccordion`, `Pagination`, `Breadcrumbs`, `Sidebar`, `NavigationBar`, `Footer`, `Header`, `Timeline`, `Table`, `KeyValueDisplay`, `List`, `ImageWithOverlay`, `Logo`, `AvatarGroup`, `Avatar`, `Thumbnail`, `Image`, `PlaceholderImage`, `FileUpload`, `Slider`, `ToggleSwitch`, `RadioButton`, `Checkbox`, `TextArea`, `TextInput`, `BasicCard`, `IconGroup`, `Icon`, `CodeBlock`, `Link`, `Title`, `Label`, `ContactCard`, `Button`, and `IconButton`. Their corresponding props types are also exported. Review status is tracked separately in `task-list.md`.

```tsx
import { Button, ContactCard, IconButton } from "art-pix-ui";
import "art-pix-ui/styles.css";

export function Contact() {
  return (
    <ContactCard
      title="Creative collaborator"
      name="Mira Chen"
      img="/mira.jpg"
      phone="+1 (415) 555-0142"
      email="mira@example.com"
    >
      <p>Available for a new project.</p>
      <Button link="mailto:mira@example.com">Say hello</Button>
      <IconButton link="/contacts/mira" aria-label="View Mira's profile">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </IconButton>
    </ContactCard>
  );
}
```

### Feedback, notifications, and states batch

The rest of phase 6 is implemented and awaiting review. See [feedback-review.md](./feedback-review.md) for props, timer/dismissal rules, field associations, examples, and the review checklist for all 15 new components. No dependencies were added. Run `node scripts/check-feedback-states.mjs` after building, plus the existing Alert and StatusMessage checks.

### StatusMessage

Compact monospaced feedback without an Alert card surface. A small decorative pixel icon and visible severity label accompany the message, with matching info, success, warning and error accents. No animation is included.

```tsx
import { StatusMessage } from "art-pix-ui";

<StatusMessage severity="success">Your notes have been saved.</StatusMessage>
<StatusMessage severity="error" announcement="assertive">Connection lost.</StatusMessage>
<StatusMessage announcement="off">Your map is available offline.</StatusMessage>
```

`severity` defaults to info. `announcement` defaults to polite (role=status), with assertive (role=alert) and off (no live-region role) available independently of severity. Announcements are atomic unless disabled. StatusMessage and Alert share private icon definitions, severity types and announcement conventions. Keep a polite region mounted before changing its content where possible; actual announcements depend on assistive technology and mounting behavior. Reserve assertive announcements for urgent changes and use off for static text.

`StatusMessageProps` includes native div attributes and ref except role, aria-live and aria-atomic, which are managed by the announcement prop. Children may contain text, rich content or links; long messages wrap and RTL is supported. There is no title, card, auto-dismissal, focus movement or timer. Run `node scripts/check-status-message.mjs` and `node scripts/check-alert.mjs` after building to verify all severity/announcement combinations and shared conventions.

### Alert

A persistent parchment message surface with dark rounded outlines, pixel severity icons and distinct accent colors. Visible severity text accompanies the icon so color is not the only state cue. No animation or automatic dismissal is included.

```tsx
import { Alert } from "art-pix-ui";

<Alert severity="success" title="Supplies saved">Everything is ready.</Alert>
<Alert severity="error" title="Save failed" announcement="assertive">
  Your changes could not be saved. Please try again.
</Alert>
```

`severity` is info (default), success, warning or error. `title` is optional React content; `children` supplies the message. `announcement` is polite (default role=status), assertive (role=alert), or off (no live-region role). Active announcements are atomic; severity never automatically escalates urgency. Prefer off for static informational content and reserve assertive for urgent updates. Actual announcements depend on assistive technology and how content is inserted or updated; keep a polite region mounted before updating its text where possible.

`AlertProps` supports native div attributes and ref, excluding title/role/aria-live/aria-atomic which are managed by the component API. Icons use the shared decorative Icon primitive. Links or actions may be supplied within children; no focus movement, timer or dismissal control is added. The accent uses a logical border for RTL and long text wraps. Run `node scripts/check-alert.mjs` after building for all 12 severity/announcement combinations, title, children, props and static CSS checks.

### LoadingScreen

A full-height parchment loading view with subtle pixel grain, a centered large green pixel spinner and monospaced message. It stays in normal document flow and is intended to replace page content, not cover it as an overlay.

```tsx
import { LoadingScreen } from "art-pix-ui";

return loading ? (
  <LoadingScreen label="Preparing your next adventure…">
    <p>Gathering maps and supplies.</p>
  </LoadingScreen>
) : <AdventurePage />;
```

`label` defaults to "Loading…"; optional children supply supporting text or caller-owned actions. `LoadingScreenProps` includes native wrapper div attributes and ref. Default minimum height is 100svh with a 100vh fallback; override minHeight through style when embedding in a smaller region. Long content can grow and scroll naturally. The shared spinner exposes polite atomic status and becomes static with reduced motion; supporting content is outside that live region.

The caller owns display, completion and focus management. No automatic navigation, timers, focus trap, modal semantics, page locking or main landmark are added. Run `node scripts/check-loading-screen.mjs` after building for labels, status semantics, children, native props, in-flow layout and shared reduced-motion CSS checks.

### LoadingOverlay

A local translucent parchment layer with a centered pixel spinner and outlined loading label. `loading` defaults to false and `label` to "Loading…". It wraps children without unmounting them, preserving their state while loading.

```tsx
import { LoadingOverlay } from "art-pix-ui";

<LoadingOverlay loading={refreshing} label="Refreshing your adventure…">
  <AdventurePanel />
</LoadingOverlay>
```

`LoadingOverlayProps` supports native wrapper div attributes and ref. While loading, the inner content receives native `inert` and `aria-busy`, removing its descendants from keyboard interaction and the accessibility tree. The local layer intercepts pointers. A persistent polite atomic status is a sibling outside the inert/busy content, with the shared spinner presented decoratively. Reduced motion stops spinner rotation.

This is not a modal: it does not trap focus, lock the page, manage asynchronous work, restore focus, or block outside controls. Keep completion/cancellation controls outside its children. Native inert applies to DOM descendants; content portalled elsewhere and top-layer dialogs require caller coordination. The grid layer can expand short regions to fit the indicator (minimum 112px), and long labels wrap. Run `node scripts/check-loading-overlay.mjs` after building for retained children, inert/busy markup, live-status placement, native props and blocking CSS checks. Browser keyboard/pointer review remains necessary.

### BufferingIndicator

Media buffering status composed from SpinnerStatus: green pixel spinner, muted monospaced label and stepped rotation. Reduced motion leaves a static spinner. It does not load media, change playback or attach media event listeners.

```tsx
import { BufferingIndicator } from "art-pix-ui";

<BufferingIndicator buffering={isBuffering} />
<BufferingIndicator buffering={isBuffering} label="Waiting for audio…" size="small" />
```

`buffering` defaults to true; false renders nothing. `label` defaults to "Buffering…" and size defaults to medium. `BufferingIndicatorProps` inherits SpinnerStatus props, including native span attributes and ref, custom className, and small/medium/large sizes. Default semantics are role=status, aria-live=polite and aria-atomic=true; the spinner is decorative. Visibility and completion remain caller-controlled, with no focus movement or blocked interactions. Run `node scripts/check-buffering-indicator.mjs` after building for visibility, labels, sizes, status semantics, composition and reduced-motion CSS checks.

### DownloadProgress

Matches UploadProgress with a filename, parchment track, green fill, percentage and readable downloaded/total byte counts. It only displays caller-provided progress and does not download, save or validate files.

```tsx
import { DownloadProgress } from "art-pix-ui";

<DownloadProgress fileName="adventure-map.png" downloadedBytes={400000} totalBytes={1000000} />
```

`fileName`, `downloadedBytes`, and `totalBytes` are required. Finite byte counts are floored; negative/non-finite downloaded counts become zero and known totals cap the received count. Totals below 1 or non-finite totals use IndeterminateProgressBar, omit the percentage and display "total unavailable". An empty filename uses "File download". Decimal units use 1000 B = 1 KB and at most one decimal above bytes, using the shared transfer formatter. A full bar indicates reported bytes received, not a successfully saved or verified file.

`DownloadProgressProps` includes native wrapper div attributes and ref except children. `aria-label` and `aria-labelledby` name the inner indicator; known totals expose actual byte values and readable aria-valuetext. Shared bars supply reduced-motion behavior. No timers, repeated live announcements or transfer controls are included. Run `node scripts/check-download-progress.mjs` after building; also run `node scripts/check-upload-progress.mjs` to check the shared byte formatter against UploadProgress.

### UploadProgress

Composes ProgressBar with a filename and readable uploaded/total byte counts. All data is caller-controlled: it does not access files, upload anything, manage timers or infer server-confirmed success.

```tsx
import { UploadProgress } from "art-pix-ui";

<UploadProgress fileName="adventure-map.png" uploadedBytes={400000} totalBytes={1000000} />
```

`fileName`, `uploadedBytes`, and `totalBytes` are required. Finite byte values are floored; negative or non-finite uploaded values become zero and known totals cap the uploaded count. A total below 1 byte or non-finite total is treated as unknown: IndeterminateProgressBar replaces the percentage and the count reads "total unavailable". An empty filename uses "File upload". Counts use decimal units (1000 B = 1 KB), rounded to at most one decimal above bytes. A 100% bar only indicates all reported bytes transferred, not acceptance by the server.

`UploadProgressProps` includes native wrapper div attributes and ref except children. `aria-label` and `aria-labelledby` target the inner progress indicator. Known totals expose actual byte values plus readable `aria-valuetext`; counts are not a repeatedly announcing live region. Shared progress styling supplies reduced-motion behavior. Run `node scripts/check-upload-progress.mjs` after building for formatting, normalization, unknown totals, percentages and accessibility checks.

### LoadingButton

Composes Button with the small pixel SpinnerStatus indicator. `LoadingButtonProps` preserves Button props (including `link`, native button `type`, children and primary/secondary variants) and adds `loading?: boolean` (default false) and `loadingText?: string`.

```tsx
import { LoadingButton } from "art-pix-ui";

<LoadingButton loading={saving} loadingText="Saving…" onClick={save}>
  Save adventure
</LoadingButton>
```

While loading, it sets `aria-busy`, displays a decorative spinner, and disables activation. A native button is disabled; a link loses its href, has aria-disabled and leaves the tab order. Existing disabled behavior remains independent of loading. Without loadingText, the original children remain visible. The spinner inherits the button text color and its stepped rotation becomes static for reduced motion. The caller owns asynchronous work, state, error handling and completion; no timers or promises are managed internally. This blocks this control only, not other submission paths in a surrounding form. Supply separate completion/error announcements as needed. Run `node scripts/check-loading-button.mjs` after building for idle/busy rendering, disabled link behavior, native type, variants, and shared spinner CSS checks.

### ShimmerSkeleton

Composes SkeletonLoader with a soft highlight sweeping across its shape every 1.8 seconds. The highlight is clipped to the placeholder, reverses in RTL, and disappears completely for reduced-motion or forced-color preferences, leaving the static base placeholder.

```tsx
import { ShimmerSkeleton } from "art-pix-ui";

<ShimmerSkeleton height={120} />
<ShimmerSkeleton shape="text" width="75%" />
<ShimmerSkeleton shape="circle" width={64} />
```

`ShimmerSkeletonProps` reuses `SkeletonLoaderProps`, including shape, width, height, native span attributes, ref, className and style. Defaults and dimension behavior are identical. It remains decorative (`aria-hidden`) and non-focusable, with no loading announcement, timer, or automatic replacement. Put loading status on the containing UI as needed. Run `node scripts/check-shimmer-skeleton.mjs` after building for composition, shape, dimension, accessibility and motion fallback CSS checks.

### SkeletonLoader

Static decorative placeholders in muted parchment with a subtle outline and highlight. `shape` is `"rectangle"` (default), `"text"`, or `"circle"`. Defaults are full width × 96px for rectangles, full width × 1em for text lines, and 48px with a square aspect ratio for circles.

```tsx
import { SkeletonLoader } from "art-pix-ui";

<SkeletonLoader height={120} />
<SkeletonLoader shape="text" width="75%" />
<SkeletonLoader shape="circle" width={64} />
```

`width` and `height` accept React CSS dimension values (numbers are pixels). Use width alone to resize a circle while keeping its aspect ratio; explicitly unequal width and height produce an oval. Width is capped to the available container width by default. Native span attributes, ref, className and style are supported; explicit width/height props override the matching style fields. `SkeletonLoaderProps` excludes children, editable content, tabIndex, raw HTML and aria-hidden overrides.

Placeholders are always `aria-hidden`, have no focus stop, and do not announce loading or set the surrounding region busy. Add meaningful loading status to the containing UI where needed. No animations, timers or automatic content replacement are included. Run `node scripts/check-skeleton-loader.mjs` after building for shape, dimensions, style merging, decorative semantics and static CSS checks.

### ProgressSteps

Display-only ordered steps with numbered parchment markers, dark rounded outlines, green completed markers and an amber current marker. Labels and visible Completed / Current step / Upcoming text keep state understandable without color. The layout wraps in narrow containers and respects text direction. Marker colors transition over 180ms unless reduced motion is requested.

```tsx
import { ProgressSteps } from "art-pix-ui";

<ProgressSteps
  currentStep={2}
  steps={[
    { id: "plan", label: "Plan", description: "Choose your adventure." },
    { id: "pack", label: "Pack", description: "Gather your supplies." },
    { id: "depart", label: "Depart" },
  ]}
/>
```

Each step requires a unique stable `id` and string `label`; `description` is optional. `currentStep` is one-based and defaults to 1. Earlier steps are completed, the current step uses `aria-current="step"`, and later steps are upcoming. Set `currentStep` to `steps.length + 1` for all completed. Finite values are floored and clamped to 1 through length + 1; non-finite values fall back to 1. Empty steps render nothing. No callbacks, links, navigation, timers, or focus stops are added: the application controls progression.

`ProgressStepsProps` and `ProgressStepsItem` are exported. Native ordered-list attributes and ref are supported except children, role, start, reversed and type. The default accessible name is "Progress steps" and can be overridden with `aria-label` or `aria-labelledby`. Run `node scripts/check-progress-steps.mjs` after building for state normalization, empty/single cases, semantics, props, and reduced-motion CSS checks.

### CircularProgress

A determinate parchment ring with a dark outline and green clockwise arc starting at twelve o’clock. `value` is required. Defaults: `max={100}`, `label="Progress"`, `size="medium"`, and `showPercentage={false}`. Small, medium, and large rings are 64, 96, and 128px respectively, with a wrapping visible label below.

```tsx
import { CircularProgress } from "art-pix-ui";

<CircularProgress value={42} label="Gathering supplies" showPercentage />
<CircularProgress value={3} max={8} size="large" label="Files processed" />
```

Values clamp to zero/max. Invalid or non-positive max falls back to 100; NaN value becomes zero and infinities clamp to the endpoints. The optional centered percentage is rounded, while accessible progress retains the actual normalized value and max. Zero is an empty track and completion fills the full ring. Changes transition over 180ms; reduced motion disables the transition.

`CircularProgressProps` includes native div attributes and ref, excluding children and reserved progress semantics. Use `aria-label` or `aria-labelledby` to override its accessible name. The SVG is decorative; the outer element provides named progressbar semantics. The caller owns updates and completion, with no automatic progress or focus stop. Run `node scripts/check-circular-progress.mjs` after building for value/size cases, arc geometry, labels, props, and reduced-motion CSS checks.

### IndeterminateProgressBar

Unknown-duration loading using the same parchment track, rounded dark outline, and green fill styling as ProgressBar. A 35%-wide decorative segment sweeps every 1.6 seconds, reverses for RTL, and rests centered with reduced motion. Its size does not represent completion.

```tsx
import { IndeterminateProgressBar } from "art-pix-ui";

<IndeterminateProgressBar />
<IndeterminateProgressBar label="Gathering your supplies…" />
```

`label` defaults to "Loading…". `IndeterminateProgressBarProps` includes native div attributes and ref except children, role, and value-related ARIA attributes. It exposes a named `progressbar` with no known value or percentage. Override its accessible name with `aria-label` or `aria-labelledby` when needed. The caller controls visibility and completion; there are no timers, live announcements on each sweep, or blocked interactions. Run `node scripts/check-indeterminate-progress-bar.mjs` after building for rendering semantics, props, RTL and reduced-motion CSS checks.

### ProgressBar

A controlled determinate bar with a parchment track, dark rounded outline, green fill, and a visible monospaced label. `value` is required; `max` defaults to 100, `label` to "Progress", and `showPercentage` to false. Values clamp between zero and max. Invalid/non-positive max falls back to 100; NaN value becomes zero and infinities clamp to the endpoints. The rounded percentage is visual; accessible progress retains the actual value and max.

```tsx
import { ProgressBar } from "art-pix-ui";

<ProgressBar value={42} label="Gathering supplies" showPercentage />
<ProgressBar value={3} max={8} label="Files processed" />
```

`ProgressBarProps` is exported, including native div attributes and ref (excluding children and reserved progress semantics). Use `aria-label` or `aria-labelledby` to override the accessible name if needed. It has no automatic updates, timers, completion callbacks, or focus stop. Fill changes transition over 180ms and become immediate with reduced motion. Run `node scripts/check-progress-bar.mjs` after building to check normalization, rendering, accessibility attributes, and reduced-motion CSS.

### PulseLoader

One green pixel-square indicator with muted monospaced status text. `label` defaults to "Loading…"; supply meaningful nonempty text. `size` is `small` (12px), `medium` (16px, default), or `large` (24px), changing the indicator rather than the text. Longer labels wrap.

The square gently pulses between 75% and 100% scale and 45% and 100% opacity over 1.6 seconds, without changing layout dimensions. Reduced-motion preferences disable animation and leave a full-size, fully visible square. The graphic is decorative; the outer span defaults to role=status, aria-live=polite, and aria-atomic=true. Native span props and ref target that span.

There is no focus stop, blocked interaction, overlay, percentage tracking, or automatic completion. The caller controls visibility and aria-busy on surrounding content if needed. Keep a live region mounted before changing its label for more reliable announcements; actual behavior depends on assistive technology. Avoid duplicate nested status announcements.

```tsx
import { PulseLoader } from "art-pix-ui";

<PulseLoader />
<PulseLoader size="small" label="Saving notes…" />
<PulseLoader size="large" label="Preparing your adventure…" />
```

`PulseLoaderProps` is exported. After building, run `node scripts/check-pulse-loader.mjs` for rendering, status, and reduced-motion CSS checks.

### DotsLoader

Three green pixel-square dots with a muted monospaced label. `label` defaults to "Loading…"; provide meaningful nonempty text. `size` selects `small` (4px dots), `medium` (6px, default), or `large` (8px), with 4px gaps. Text size stays constant and longer labels wrap.

Dots pulse in opacity over 1.2 seconds, staggered by 150ms. Reduced-motion preferences remove animation and leave all three dots fully visible. The dots are decorative; the outer span defaults to role=status, aria-live=polite, and aria-atomic=true. Native span props and ref target that outer element.

There is no focus stop, overlay, automatic completion, or percentage tracking. The caller controls visibility and any aria-busy state on the surrounding content. For reliable status updates, keep a live region mounted before changing its label; actual announcements depend on assistive technology. Avoid duplicate nested live-region announcements.

```tsx
import { DotsLoader } from "art-pix-ui";

<DotsLoader />
<DotsLoader size="small" label="Saving notes…" />
<DotsLoader size="large" label="Gathering supplies…" />
```

`DotsLoaderProps` is exported. After building, run `node scripts/check-dots-loader.mjs` for rendering, three-dot structure, status semantics, and reduced-motion CSS checks.

### SpinnerStatus

A green pixel-style indeterminate spinner with muted monospaced text. `label` defaults to "Loading…"; provide a meaningful, nonempty status message. `size` is `small` (16px), `medium` (24px, default), or `large` (32px) and changes the indicator size, not the text size.

The indicator rotates in eight steps over one second. Reduced-motion preferences disable animation, retaining the static graphic and text. The SVG is decorative. The outer span defaults to role=status, aria-live=polite, and aria-atomic=true, with native span props and ref forwarded. There is no focus stop, overlay, disabled state, progress percentage, or automatic completion.

The caller decides when to render/remove the spinner and manages any aria-busy state on the loading content separately. A live region present before its text changes provides more reliable announcements than inserting a pre-filled live region; actual announcements depend on assistive technology. Avoid duplicating status announcements in nested live regions.

```tsx
import { SpinnerStatus } from "art-pix-ui";

<SpinnerStatus />
<SpinnerStatus size="small" label="Saving notes…" />
<SpinnerStatus size="large" label="Loading your workspace…" />
```

`SpinnerStatusProps` is exported. After building, run `node scripts/check-spinner-status.mjs` for rendering and reduced-motion CSS checks.

### FaqAccordion

Parchment disclosure panels with dark rounded borders, bold questions, and green plus/minus indicators. Each `items` entry has a unique stable `id`, a string `question`, and React-content `answer`. Questions render as native buttons inside headings; `headingLevel` defaults to 3 and accepts 2–6. Choose a level appropriate to the surrounding page.

By default, multiple answers may be open and internal state starts closed. `defaultOpenIds` sets initial uncontrolled state. For controlled state, provide `openIds` and update it through `onOpenChange`. `singleOpen` permits at most one open answer, while still allowing every answer to close. Unknown IDs and duplicates are ignored; if singleOpen receives several valid IDs, the first supplied ID is used. Default IDs are read only on mount; keep controlled/uncontrolled usage consistent.

Opening/closing uses a 180ms grid-height and opacity transition, removed for reduced-motion preferences. Answers stay mounted to preserve their state, but closed panels are inert and aria-hidden, so their controls leave the tab order immediately. Questions use aria-expanded/aria-controls, and answer regions are named by their questions. Tab follows normal document order; Enter and Space toggle a question. Native div props, `className`, `style`, and `ref` target the outer wrapper.

```tsx
import { FaqAccordion } from "art-pix-ui";

<FaqAccordion singleOpen defaultOpenIds={["start"]} items={[
  { id: "start", question: "Where do we start?", answer: "At the old oak." },
  { id: "bring", question: "What should I bring?", answer: <p>A notebook and a little curiosity.</p> },
]} />
```

`FaqAccordionProps` and `FaqAccordionItem` are exported. An empty items array renders an empty wrapper. This component does not fetch answers or impose a fixed panel height.

### Pagination

Controlled, one-based pagination with `page`, `totalPages`, and `onPageChange`. The caller updates page state and owns fetching, result rendering, and any loading announcements. Selecting the current page does not emit a change. Buttons do not change URLs or submit forms.

Previous/Next disable at the boundaries; `disabled` disables every button. The current page has `aria-current="page"`, green styling, and an underline. Long ranges retain first/last pages and a compact nearby window with non-interactive decorative ellipses. The list wraps at narrow widths. Shared Button press/hover behavior respects its existing reduced-motion rules.

Counts are floored and capped at the maximum safe integer. Non-finite or non-positive totals render nothing. Page values are floored and clamped into the available range; non-finite pages display page 1. Normalization does not emit callbacks or rewrite caller state. A single page displays page 1 with disabled Previous/Next controls.

Native nav props, `className`, `style`, and `ref` target the outer navigation. Its accessible name defaults to "Pagination"; use `aria-label` or `aria-labelledby` to distinguish multiple controls.

```tsx
const [page, setPage] = useState(1);

<Pagination page={page} totalPages={20} onPageChange={setPage} />
```

Import `useState` from React and `Pagination` from `art-pix-ui`. `PaginationProps` is exported. After building, run `node scripts/check-pagination.mjs` for dependency-free rendering checks covering boundaries, compact ranges, and invalid inputs.

### Breadcrumbs

Named native navigation containing an ordered list. Each item has a unique stable `id`, React-content `label`, and optional `href`. The last item is always the current page: it renders as dark text with `aria-current="page"`, ignoring any supplied href. Earlier items use the shared green Link when href is supplied, otherwise plain muted text. Do not put interactive elements inside labels.

Pixel-chevron separators are decorative, hidden from assistive technology, and mirrored in RTL. Trails and long labels wrap without truncation. A single item has no separator; an empty array renders an empty navigation list. No route inference or added animation is performed; links retain their existing hover/focus and reduced-motion behavior.

Native nav props, `className`, `style`, and `ref` target the outer element. The accessible name defaults to "Breadcrumbs"; customize it with `aria-label` or `aria-labelledby`. `BreadcrumbsProps` and `BreadcrumbsItem` are exported.

```tsx
import { Breadcrumbs } from "art-pix-ui";

<Breadcrumbs items={[
  { id: "home", label: "Home", href: "/" },
  { id: "library", label: "Library", href: "/library" },
  { id: "current", label: "Field notes" },
]} />
```

### Sidebar

Parchment `aside` with a dark border, optional `heading`, `items`, and custom `children`. Items require unique `id`, string `label`, and `href`; optional `icon` is decorative (do not pass interactive content), and `current` marks the current page. Other Link props are supported. Missing icons use a small square. `navigationLabel` names the inner nav. Use `aria-label` to name the sidebar and its drawer dialog. Native aside props and `ref` target the panel.

Capability and state are separate:

- `collapse` defaults to false: the sidebar stays expanded, ignores `collapsed`, and has no collapse control.
- `collapse={true}` enables the toggle. `collapsed` (default false) is controlled; update it in `onCollapsedChange`.
- The collapsed 72px rail peeks to 112px on hover-capable pointers or keyboard focus, without changing state. The expand control requests full 280px expansion. Links navigate rather than expand. Heading and custom content are hidden and non-focusable while collapsed; link names remain accessible.
- `drawer` defaults to false (inline). When true, `open` (default false) controls visibility independently of collapse, with `onOpenChange` handling requests to dismiss.
- Drawer mode uses a native modal dialog: backdrop, Escape/Close dismissal, Tab wrapping, focus restoration, and background scroll locking. Keep an accessible external trigger. Links do not automatically close it; use their onClick handlers if desired.
- `animated` defaults to true: 180ms width changes and drawer entry slide. False or reduced-motion preference removes these sidebar animations. Closing is immediate. Shared Link/Button animations retain their own reduced-motion handling.

The drawer opens from the left. Width is constrained to available space, and drawer contents scroll vertically. Custom content should be responsive. Use inline composition for a static sidebar; enabling drawer does not require enabling collapse.

```tsx
const [collapsed, setCollapsed] = useState(true);
const [open, setOpen] = useState(false);
const items = [{ id: "home", label: "Home", href: "/", current: true }];

<Sidebar collapse collapsed={collapsed} onCollapsedChange={setCollapsed}
  heading="Workspace" items={items} />

<Button onClick={() => setOpen(true)}>Open navigation</Button>
<Sidebar drawer open={open} onOpenChange={setOpen}
  aria-label="Workspace navigation" heading="Workspace" items={items} />
```

Import `useState` from React and `Sidebar`/`Button` from `art-pix-ui`. `SidebarProps` and `SidebarItem` are exported. Collapse and drawer state remain owned by the caller; callbacks must update that state for controls to take effect.

### NavigationBar

A named native `nav` with a parchment surface, wrapping green Link components, and optional `brand` and `actions` slots. Supply `items` with unique `id`, `label` (React content), and `href`. Each item also accepts Link props such as `target`, `rel`, and click handlers. Do not put interactive elements inside an item's label, since the label is already inside an anchor.

Set `current: true` on the current item to add `aria-current="page"`, a light background, and a green bottom border. Supply at most one current item per navigation set. Current state is controlled by your app, not inferred from the URL or changed automatically on click. New-tab safety and reduced-motion behavior come from the shared Link component.

Native nav props, `className`, `style`, and `ref` target the outer element. It defaults to the accessible name "Primary navigation"; use `aria-label` or `aria-labelledby` to distinguish multiple navigation regions. This is already a nav, so do not place it inside Header/Footer's navigation slot (which creates another nav); it can be composed as their supporting children instead.

Links and actions wrap naturally, including in RTL layouts. There is no mobile drawer, sticky positioning, router dependency, or added animation. Custom brand/action content should be responsive.

```tsx
import { NavigationBar, Button } from "art-pix-ui";

<NavigationBar aria-label="Main sections"
  brand={<strong>Your brand</strong>}
  items={[
    { id: "home", label: "Home", href: "/", current: true },
    { id: "about", label: "About", href: "/about" },
  ]}
  actions={<Button link="/contact">Contact</Button>}
/>
```

`NavigationBarProps` and `NavigationBarItem` are also exported.

### Footer

A native `footer` with a parchment background, dark top border, and muted mono supporting text. Optional `brand` and `navigation` props accept React content; `children` supplies a full-width supporting row. Missing slots are not rendered. Slots wrap naturally on narrow screens. There is no animation, fixed positioning, automatic copyright text, or date calculation.

The navigation slot renders inside a native `nav`, named with `navigationLabel` (default "Footer navigation"). Pass links or a list, not another nav element. Use distinct labels when a page contains multiple navigation regions. Custom content should be responsive; links retain their native keyboard behavior.

Native footer props, `className`, `style`, and `ref` target the outer footer. Landmark semantics depend on context: a page-level footer can be contentinfo, while one inside a section is a section footer. No contentinfo role is forced. Playground examples are section footers.

```tsx
import { Footer, Logo, Link } from "art-pix-ui";

<Footer
  brand={<Logo src="/brand.svg" alt="Your brand" width={180} />}
  navigation={<><Link href="/about">About</Link><Link href="/contact">Contact</Link></>}
>
  © 2026 Your brand. Made with care.
</Footer>
```

### Header

A native `header` with a parchment background and dark bottom border. Optional React-content slots are `brand`, `navigation`, and `actions`; `children` adds a full-width supporting row. Missing slots are not rendered. Flex wrapping accommodates narrow containers without a collapsed menu. There is no animation, sticky positioning, or built-in state.

The navigation slot is wrapped in a native `nav` with `navigationLabel` (default "Main navigation"). Pass links or a list of links, not another nav element. Give multiple navigation regions distinct names. Brand content can be a Logo or a heading appropriate to your page. Actions retain their own behavior. Custom slot content should also be responsive.

Native header props, `className`, `style`, and `ref` apply to the outer header. Landmark behavior depends on context: a page-level header can be a banner; one inside a section is a section header. No banner role is forced. The playground examples are section headers.

```tsx
import { Header, Logo, Link, Button } from "art-pix-ui";

<Header
  brand={<Logo src="/brand.svg" alt="Your brand" width={180} link="/" />}
  navigation={<><Link href="/">Home</Link><Link href="/about">About</Link></>}
  actions={<Button link="/contact">Contact</Button>}
>
  A little introduction to your workspace.
</Header>
```

### Timeline

Displays an `items` array in supplied order using an `ol` and `li` elements, a solid vertical connector, and green square markers. Each item requires a unique stable `id` and `title`; optional `content` accepts custom React content. Titles are bold text rather than fixed heading levels. An empty array renders an empty list, and a single event has no connector. There is no animation, sorting, or automatic date formatting.

Optional `timestamp` is displayed exactly as supplied. With a valid machine-readable `dateTime`, it renders as a native `time` element; without one, it is plain text so labels such as "Later that morning" remain valid. The caller is responsible for valid dateTime values. Omitting timestamp hides it entirely.

Native ordered-list props, `ref`, `className`, and `style` target the outer list, except numbering props (`start`, `reversed`, `type`) are excluded because this is a marker-based display. Use `aria-label` or `aria-labelledby` to name the timeline. Right-to-left layouts use logical positioning; child links and controls retain their native behavior.

```tsx
import { Timeline } from "art-pix-ui";

<Timeline aria-label="Adventure events" items={[
  { id: "start", title: "Party assembled", timestamp: "September 25 · 8:00 AM", dateTime: "2026-09-25T08:00:00-04:00", content: "Meet at the old oak." },
  { id: "camp", title: "Camp established", content: <p>Ready for the next chapter.</p> },
]} />
```

`TimelineItem` and `TimelineProps` are also exported.

### Table

A native table inside a rounded parchment scrolling frame. Compose `thead`, `tbody`, optional `tfoot`, and native `tr`/`th`/`td` children. Supply appropriate `scope="col"` or `scope="row"` on headers. Custom cell content, `colSpan`, and `rowSpan` retain native behavior. There is no sorting, pagination, animation, or automatic empty state.

`caption` renders a native caption before the table sections. If omitted, provide an accessible name through `aria-label` or `aria-labelledby`. Use either the caption prop or your own caption child, not both. `minWidth` defaults to 480px and can be adjusted for your columns. Native table props, `className`, `style`, and `ref` target the table, not its frame.

The frame always has a keyboard tab stop, a visible focus ring, and horizontal overflow scrolling. Arrow keys scroll when overflow is present. `scrollLabel` names this region (default "Scrollable table"); give it a specific name when multiple tables appear together. Long unbroken content can make the table wider and remains accessible by scrolling.

```tsx
import { Table } from "art-pix-ui";

<Table caption="Party supplies" scrollLabel="Party supplies — scroll horizontally">
  <thead><tr><th scope="col">Item</th><th scope="col">Quantity</th></tr></thead>
  <tbody><tr><th scope="row">Lantern</th><td>2</td></tr></tbody>
</Table>
```

### KeyValueDisplay

Displays `items` as a native description list (`dl` with paired `dt` and `dd`). Each item has a unique stable `id`, a `label`, and a `value`. Labels and values accept React content, including strings, numbers, links, and composed components. Numeric zero renders normally; null/undefined values render blank. An empty items array produces an empty list, not an automatic empty-state message.

Muted labels and dark mono values appear in 1:2 columns with solid dividers between rows. At a container width of 400px or less, each label stacks above its value. The layout responds to its own available width, not just the viewport, using CSS container queries. Text wraps; consumers should make custom content responsive too. There is no animation or built-in action.

Native description-list props, `className`, `style`, and `ref` apply to the `dl`. Use `aria-label` or `aria-labelledby` when a named grouping is useful. `KeyValueDisplayItem` and `KeyValueDisplayProps` are exported.

```tsx
import { KeyValueDisplay } from "art-pix-ui";

<KeyValueDisplay aria-label="Adventure details" items={[
  { id: "name", label: "Adventure", value: "The Mossglen trail" },
  { id: "remaining", label: "Supplies remaining", value: 0 },
  { id: "guide", label: "Guide", value: <a href="/guide">Mira Chen</a> },
]} />
```

### List

Renders a native `ul` with green square bullets, or an `ol` when `ordered` is true. Text uses the mono font and inherits the library text color. Direct items have 12px vertical spacing; `compact` reduces it to 4px. There is no animation or built-in interaction.

Supply native `li` children; put nested lists inside an `li`. The component does not wrap arbitrary children automatically. Native props, events, and `ref` target the selected list element. Ordered lists support `start`, `reversed`, and native numbering `type`. Links and controls inside items retain normal keyboard behavior. Use `aria-label` or `aria-labelledby` when a list needs an accessible name.

```tsx
import { List } from "art-pix-ui";

<List compact>
  <li>Compass</li>
  <li>Journal</li>
</List>

<List ordered start={3}>
  <li>Meet your party</li>
  <li>Begin the adventure</li>
</List>
```

### ImageWithOverlay

A rounded, dark-outlined image frame with parchment-colored children over a dark gradient. `src` supplies a cover-cropped image; required `alt` describes it. Use `alt=""` when the image is decorative or redundant with the overlay text. Missing or failed sources use the shared Image fallback without hiding the content.

`position` is `top`, `center`, or `bottom` (default); content stays start-aligned horizontally. `aspectRatio` defaults to `"16 / 9"`. The frame is full width with a 180px minimum height and grows to accommodate longer content. Native div props, `style`, `className`, and `ref` apply to the outer frame. Explicit fixed heights can constrain content; prefer width and aspect ratio for responsive layouts.

There is no animation or built-in click action. Pass your own headings, text, links, or buttons as children. Plain children inherit the light text color; components with their own color styles should be checked for contrast against the dark gradient.

```tsx
import { ImageWithOverlay, Button } from "art-pix-ui";

<ImageWithOverlay src="/landscape.jpg" alt="" position="bottom">
  <h2>Find your next adventure</h2>
  <p>A new trail is waiting.</p>
  <Button link="/explore">Explore</Button>
</ImageWithOverlay>
```

### Logo

Displays your brand image without adding a frame, background, or animation. `src` and required `alt` use native image semantics. `width` or `height` alone preserves natural proportions; both define a contain-fit box without cropping or stretching the artwork. Images shrink to their container width and use pixelated rendering for raster pixel art; SVG artwork remains vector-rendered.

`link` optionally wraps the image in a native anchor with a visible keyboard focus outline. The image alt names the link unless `linkLabel` supplies its destination name. Use meaningful alt text for informative logos; `alt=""` is decorative and requires a nonempty `linkLabel` if linked. Optional `target` and `rel` apply to the anchor; new-tab links default to `noopener noreferrer`. Other native image props, events, `className`, `style`, and `ref` target the image. Image failures retain native browser behavior; no custom fallback is added.

```tsx
import { Logo } from "art-pix-ui";

<Logo src="/brand.svg" alt="Your brand" width={180} />
<Logo src="/brand.svg" alt="Your brand" width={180} link="/" linkLabel="Your brand home" />
<Logo src="/brand.svg" alt="" width={120} height={60} />
```

### AvatarGroup

Groups direct `Avatar` children in an overlapping row, with no animation or built-in interaction. `size` sets all portraits to `small`, `medium` (default), or `large`, overriding child sizes. Supply `aria-label` or `aria-labelledby` to name the group. Native div props and `ref` target the group.

`max` limits visible portraits; the additional parchment `+N` badge announces how many people remain. Hidden portraits are not rendered. Omit `max` to show everyone; zero shows only the count. Negative values become zero, fractions round down, and non-finite values mean no limit. Null/false conditional children are ignored. Use direct Avatar elements, not fragments or wrapper elements. Empty children produce an empty group. Right-to-left layout is supported through `dir="rtl"`; the count stays in +N order.

```tsx
import { Avatar, AvatarGroup } from "art-pix-ui";

<AvatarGroup max={2} size="medium" aria-label="Project team">
  <Avatar src="/mira.jpg" name="Mira Chen" />
  <Avatar name="Alex Taylor" />
  <Avatar name="Sam Lee" />
</AvatarGroup>
```

### Avatar

Circular portraits with a dark outline and parchment background. `size` is `small` (32px), `medium` (48px, default), or `large` (64px). Images use cover cropping. There is no animation or built-in action.

`src` supplies the portrait. Missing or failed images show initials from the first and last words of `name` (one initial for a single word), or a green pixel person when no name is supplied. Changing `src` retries the image. `name` also supplies the accessible label, falling back to "User avatar". `alt` overrides the label; use `alt=""` for a decorative avatar. Native div props and `ref` target the outer element.

```tsx
import { Avatar } from "art-pix-ui";

<Avatar src="/portrait.jpg" name="Mira Chen" size="large" />
<Avatar name="Mira Chen" />
<Avatar />
<Avatar src="/portrait.jpg" alt="" />
```

### Thumbnail

Compact Image composition with a rounded dark outline and no animation or built-in action. Inherits Image props and behavior, including required alt, cover/contain fit, loading, srcSet/sizes, and fallback/recovery. Set `size` to small (64px), medium (default, 96px), or large (128px). Each defaults to a square; explicit width/height override the corresponding preset dimensions. For a non-square frame set both dimensions. CSS/style can further customize presentation.

Fallbacks use a smaller icon and compact text; keep optional fallbackText short. Use alt="" for decorative thumbnails. If a thumbnail should navigate or perform an action, compose it inside an appropriately labeled native link or button.

```tsx
import { Thumbnail } from "art-pix-ui";

<Thumbnail src="/portrait.jpg" alt="Mira" size="small" />
<Thumbnail src="/landscape.jpg" alt="Forest trail" width={128} height={80} fit="contain" />
```

### Image

Native image with a rounded dark outline and parchment background. Requires `alt` (use an empty string for decorative images). Supports native image attributes including src/srcSet/sizes, width/height, loading, decoding, and load/error handlers. Optional `fit` is cover (default) or contain; `aspectRatio` sets a CSS ratio. Without dimensions the image fills the available width and uses its natural ratio. Supply dimensions or aspectRatio to reserve a frame. Style can override presentation.

Missing src/srcSet or a loading failure renders PlaceholderImage with the same alt, id/title, className/style, description, and configured dimensions. Set `fallbackText` for optional visible fallback text. If no dimensions/ratio are known, fallback uses 16:9. Image-specific attributes/events apply only to the native img. Changing src, srcSet, or sizes retries a failed image by remounting it. No animation; lazy loading is opt-in with loading="lazy".

```tsx
import { Image } from "art-pix-ui";

<Image src="/portrait.jpg" alt="Mira at the workshop"
  width={320} height={240} fit="contain" loading="lazy"
  fallbackText="Portrait unavailable" />
```

### PlaceholderImage

Static parchment fallback with a rounded dark outline and muted pixel-image symbol. No loading behavior, animation, or network requests. Accepts optional visible `text`, CSS-compatible `width`/`height`/`aspectRatio`, native div attributes/ref, and merged className/style. Defaults to width 100% and aspect ratio 16 / 9; explicit width and height take precedence over the ratio. Width is capped at its container unless overridden by style.

`alt` is the accessible image description, defaulting to "Image unavailable". Use `alt=""` for a decorative placeholder; otherwise provide a description suitable for the missing image. Visible text is separate from alt. The internal icon is decorative. Do not put interactive content in this static image placeholder.

```tsx
import { PlaceholderImage } from "art-pix-ui";

<PlaceholderImage alt="Landscape unavailable" text="Image coming soon" />
<PlaceholderImage width={180} aspectRatio="1 / 1" alt="Portrait unavailable" />
<PlaceholderImage width={220} height={120} alt="" />
```

### FileUpload

Native file picker with parchment styling, a raised green file-selection button, and a wrapping filename list. Accepts native input attributes, forwarded ref, and className (applied to the input), except type/children/value/defaultValue. Use Label with id/htmlFor, or aria-label. Native button wording is browser-localized. Use `multiple` for several files and `accept` to guide file types. Read `event.target.files` in `onChange`; file inputs are uncontrolled.

Selection only: no automatic uploading, file-content reading, or validation. Accept is a picker hint, not a security check; validate files in the consuming application/server. Filenames are rendered as text in a status region. A native form reset clears both selection and displayed filenames; for programmatic clearing, use form.reset() rather than assigning input.value directly. Press feedback respects reduced motion.

```tsx
import { FileUpload, Label } from "art-pix-ui";

<Label htmlFor="attachments">Attachments</Label>
<FileUpload id="attachments" name="attachments" multiple accept=".txt,.md"
  onChange={event => console.log(event.target.files)} />
```

### Slider

Native horizontal range input with an inset parchment track, green fill, raised thumb, and focus outline. Supports numeric `value`/`defaultValue`, native `min`/`max`/`step`, disabled state, forwarded ref, and native input attributes except type/children. Defaults follow the browser: 0–100, step 1, midpoint when no value is supplied. Use `event.target.valueAsNumber` for controlled updates. The browser clamps and steps values and handles keyboard navigation.

Compose Label and optional output separately; use aria-valuetext for meaningful units. Uncontrolled form reset restores value and fill. Fill initializes after mounting. Dragging has no delayed animation; press feedback changes only the shadow. RTL reverses fill direction. This is a single-value horizontal slider, not a range selector.

```tsx
import { Slider, Label } from "art-pix-ui";

<Label htmlFor="volume">Volume</Label>
<Slider id="volume" min={0} max={100} step={5} defaultValue={40} />
```

### ToggleSwitch

An on/off switch using a native checkbox with `role="switch"`. Rounded parchment track, dark outline, raised circular thumb, and green on state. Supports controlled `checked`/`onChange` or uncontrolled `defaultChecked`, native input attributes and React 19 refs, disabled behavior, and merged className. Native checked state supplies accessible state and form submission; no separate aria-checked is needed. Use a constant accessible name with Label or aria-label. Space toggles the focused switch.

The 140ms thumb slide is removed for reduced-motion preferences. RTL reverses thumb direction; forced-colors mode uses system colors. The component does not apply a setting itself—handle onChange to update your application's setting.

```tsx
import { ToggleSwitch, Label } from "art-pix-ui";

<Label><ToggleSwitch name="alerts" defaultChecked /> Quest alerts</Label>
```

### RadioButton

Native radio input styled as a raised parchment circle with a green selected center. Accepts native input props and React 19 refs (except type/children), merged className, controlled `checked`/`onChange` or uncontrolled `defaultChecked`, and native required/disabled behavior. Give related options the same `name` and distinct `value` attributes; use different names for independent groups. Native arrow-key selection, disabled skipping, form submission, and label activation are preserved. Use fieldset/legend to name a group and Label for individual options. Press feedback respects reduced motion; forced-colors mode restores native appearance.

```tsx
import { RadioButton, Label } from "art-pix-ui";

<fieldset>
  <legend>Travel route</legend>
  <Label><RadioButton name="route" value="forest" defaultChecked /> Forest</Label>
  <Label><RadioButton name="route" value="river" /> River</Label>
</fieldset>
```

### Checkbox

Native checkbox with a rounded parchment square, dark raised base, green selected state, pixel checkmark, and indeterminate dash. Accepts native input props (except type/children), forwarded ref, and merged className. Use controlled `checked`/`onChange` or uncontrolled `defaultChecked`; native required validation, disabled behavior, and form submission remain intact. Associate an external Label by id/htmlFor or nest the checkbox inside one. Standalone controls need an accessible name.

`indeterminate` defaults to false and sets the native DOM mixed state, independently of `checked`. It does not change submitted values. Native activation clears mixed state; derive/update the prop from your selection state in `onChange`, as the playground's select-all example does. Initial mixed state is applied after mounting. Press feedback respects reduced motion; forced-colors mode restores native appearance.

```tsx
import { Checkbox, Label } from "art-pix-ui";

<Label><Checkbox name="reminders" defaultChecked /> Send reminders</Label>
```

### TextArea

Native multiline textarea matching TextInput's appearance and states. Supports native textarea props and refs, controlled `value`/`onChange` or uncontrolled `defaultValue`, external labels and descriptions, `aria-invalid`, and `required`, `readOnly`, and `disabled`. `rows` defaults to 4.

`resizable` defaults to `true`: the native corner handle allows horizontal and vertical resizing where supported by the browser/device. `false` disables user resizing and removes the handle. This prop overrides `style.resize`. Width starts at 100% and is capped at its container width; CSS can override sizing constraints. Both dimensions have a 44px minimum. Overflowing text scrolls even when resizing is disabled. No animation; the steady caret uses `caret-animation: manual`, with a visible native caret fallback on unsupported browsers.

```tsx
import { Label, TextArea } from "art-pix-ui";

<Label htmlFor="notes">Notes</Label>
<TextArea id="notes" rows={5} defaultValue="A new adventure…" />
<TextArea aria-label="Fixed-size notes" resizable={false} />
```

### TextInput

Review note: the duplicate empty TextBox stub has been removed. Renaming this existing component to TextBox is a pending review change; the current public export remains `TextInput`.

Native single-line input with parchment styling, an inset bevel, and a visible green focus outline. Supports native input props and React 19 refs, merged `className`, controlled `value`/`onChange` or uncontrolled `defaultValue`, and `required`, `readOnly`, and `disabled`. `type` defaults to `text`; also accepts `email`, `password`, `search`, `tel`, and `url`. Other input categories have separate catalog components.

Pair with Label using `id`/`htmlFor`. Provide hint/error text externally and connect it using `aria-describedby`. Set `aria-invalid` when your validation requires the rust double-border error treatment; it does not itself enforce validity. Native constraints still apply. Error color is customizable with `--art-pix-color-error` (fallback `#a43d2d`). No animation; `caret-animation: manual` requests a steady caret and is supported in the current preview browser. Unsupported browsers keep a visible native caret, which may blink.

```tsx
import { Label, TextInput } from "art-pix-ui";

<Label htmlFor="contact-name" required>Name</Label>
<TextInput id="contact-name" name="name" required
  defaultValue="Mira" aria-describedby="contact-name-hint" />
<p id="contact-name-hint">How should we address you?</p>
```

### BasicCard

A static parchment surface with a rounded dark outline, subtle grain, beveled inner edges, and shallow raised base. Accepts `children`, native div attributes, and merged `className`. `padding` is `small` (1rem), `medium` (default, 1.5rem), or `large` (2rem). No animation, built-in content, added tab stop, or interactive semantics. Compose headings, images, and actions inside; supply child spacing and layout through your own CSS. Keep actions in native controls rather than making the whole container clickable.

```tsx
import { BasicCard, Title, Link } from "art-pix-ui";

<BasicCard padding="large">
  <Title level={3}>A new adventure</Title>
  <p>There is room for one more collaborator.</p>
  <Link href="/contacts">Meet the team</Link>
</BasicCard>
```

### IconGroup

A plain flex layout for icons and icon buttons, with no surface, border, or animation. Accepts `children`, native div attributes, and merged `className`. `direction` is `horizontal` (default) or `vertical`; `spacing` is `small` (0.5rem), `medium` (default, 0.75rem), or `large` (1rem). `wrap` defaults to false; enable it for constrained layouts. Vertical wrapping requires a height constraint supplied through style or CSS.

Set `aria-label` or `aria-labelledby` to give the container a named group role. Children are not modified: label each meaningful icon/action separately. The group adds no tab stop, arrow-key navigation, or toolbar behavior; controls retain native keyboard behavior.

```tsx
import { IconGroup, IconButton } from "art-pix-ui";

<IconGroup aria-label="Contact actions" spacing="large" wrap>
  <IconButton link="/contacts" aria-label="View contacts">{/* SVG icon */}</IconButton>
  <IconButton link="/favorites" aria-label="View favorites">{/* SVG icon */}</IconButton>
</IconGroup>
```

### Icon

An SVG primitive with no background, border, or animation. Supply SVG shapes such as `<path>` through `children`, not a nested `<svg>`. Defaults: `size="medium"` (24px), `viewBox="0 0 16 16"`, `fill="currentColor"`, and crisp-edge rendering. Small is 16px; large is 32px. Supports native SVG attributes, `color`, `style`, and merged `className`; override `viewBox`, `fill`, or `shapeRendering` for other artwork. This sizes supplied artwork; it does not convert arbitrary artwork into pixel art or provide an icon catalog.

Unlabeled icons are decorative and hidden from assistive technology. Supply a nonblank `aria-label` or `aria-labelledby` referencing visible text for a meaningful image. Icons are excluded from the tab order. For actions, place a decorative Icon in a labeled Button or IconButton.

```tsx
import { Icon } from "art-pix-ui";

<Icon size="large" color="#247b3b" aria-label="Add">
  <path d="M6 1h4v5h5v4h-5v5H6v-5H1V6h5z" />
</Icon>
```

### CodeBlock

Static parchment code surface with a rounded dark outline and shallow raised base. Pass code as a string through `children`; markup displays literally. Preserves indentation and scrolls horizontally by default. Set `wrap` for long-line wrapping and `language` for an optional display heading (no syntax highlighting). The code region is keyboard-focusable for scrolling and has a visible focus outline. Native `<pre>` attributes, including `aria-label`, `style`, and `tabIndex`, are forwarded to the code region; `className` merges onto the outer surface. No animation or extra dependencies.

```tsx
import { CodeBlock } from "art-pix-ui";

<CodeBlock language="tsx" aria-label="Button example">
  {'<Button link="/contacts">Say hello</Button>'}
</CodeBlock>
<CodeBlock wrap>{'const message = "A new adventure begins here.";'}</CodeBlock>
```

### Link

Green monospaced text with a solid underline, dark-ink hover color, and visible keyboard focus. The subtle color transition is disabled when reduced motion is requested. Requires `href`; accepts `children`, native anchor attributes/events, and merged `className`. For `target="_blank"`, `rel` defaults to `noopener noreferrer`; an explicitly supplied `rel` is preserved. Navigation uses a native anchor without a router dependency.

```tsx
import { Link } from "art-pix-ui";

<Link href="/contacts">Meet the collaborators</Link>
<Link href="/guide" target="_blank">Read the guide (new tab)</Link>
```

### Title

Bold dark-ink monospaced headings with tight letter spacing and no animation. `level` selects the semantic heading from 1 through 6 and defaults to 2. Sizes follow the level; H1 and H2 scale responsively. Supports native heading attributes, `children`, and merged `className`. Margins are zero so the consuming layout controls spacing. Choose levels for document hierarchy, not just appearance.

```tsx
import { Title } from "art-pix-ui";

<Title level={1} id="page-title">A new adventure</Title>
<Title>Make yourself at home</Title>
```

### Label

Small uppercase, muted-brown monospaced text with no animation. Supports native label attributes, `children`, and merged `className`. Use `htmlFor` to associate an input by ID or nest a control inside the label. `required` adds a visual asterisk; set `required` on the input itself for native validation and accessible required semantics.

```tsx
import { Label } from "art-pix-ui";

<Label htmlFor="hero-name" required>Hero name</Label>
<input id="hero-name" required />
```

The playground's native input examples use `caret-animation: manual` to request a steady caret. This CSS feature is browser-dependent; unsupported browsers keep their native caret. See the [caret-animation reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/caret-animation). Label itself is not editable.

### ContactCard

`title` and `name` are required. `img`, `imgAlt`, `phone`, `email`, and `children` are optional. Other native article props, including `className`, are supported. A missing or failed image shows a circular pixel avatar placeholder. The collapsed summary shows the title, name, and avatar. Details contain `tel:` and `mailto:` links with pixel icons, followed by any children.

Mouse hover previews the details; moving away closes the preview. Clicking the summary (or pressing Enter/Space) pins it open. Clicking again closes it even while hovering. Escape closes it and returns focus to the summary. Details remain visible while their links or children have keyboard focus. Touch users can tap the summary to toggle it.

### Button and IconButton

Pass `link` to render a native anchor, with support for `target`, `rel`, and other anchor attributes. Omit `link` for a native button with `onClick`, `disabled`, and a default `type="button"` (overridable for forms). Disabled links have no navigation target and are removed from keyboard tab order. `children` supplies the button text or icon. `IconButton` requires an `aria-label` describing the action. `Button` accepts `variant="primary"` (green, default) or `variant="secondary"` (parchment). Both merge `className` and provide visible keyboard focus.

```tsx
<Button onClick={() => console.log("Clicked")}>Add to party</Button>
<Button link="/about" variant="secondary">About</Button>
<Button disabled>Unavailable</Button>
```

## Theming

Override ArtPixUI's CSS variables in the consuming application:

```css
:root {
  --art-pix-color-primary: #247b3b;
  --art-pix-color-on-primary: #fffbea;
  --art-pix-color-surface: #fff9e5;
  --art-pix-color-text: #2c3025;
  --art-pix-color-border: #2c3025;
  --art-pix-color-focus: #247b3b;
  --art-pix-color-accent: #f3ad38;
  --art-pix-radius-action: 10px;
  --art-pix-radius-card: 16px;
}
```

## Component organization

The source catalog uses all 15 canonical categories:

| Category | Folder |
| --- | --- |
| Layout & containers | `src/components/layout-containers/` |
| Typography & text | `src/components/typography-text/` |
| Buttons & actions | `src/components/buttons-actions/` |
| Forms & inputs | `src/components/forms-inputs/` |
| Navigation | `src/components/navigation/` |
| Cards & content | `src/components/cards-content/` |
| Data Display | `src/components/data-display/` |
| Feedback & notifications | `src/components/feedback-notifications/` |
| Loading & progress | `src/components/loading-progress/` |
| Overlays & menus | `src/components/overlays-menus/` |
| Media | `src/components/media/` |
| Date & time | `src/components/date-time/` |
| Search & filtering | `src/components/search-filtering/` |
| Data visualization | `src/components/data-visualization/` |
| Decorative Effects | `src/components/decorative-effects/` |

The implemented components live in `feedback-notifications/InfoMessage`, `feedback-notifications/SuccessMessage`, `feedback-notifications/WarningMessage`, `feedback-notifications/ErrorMessage`, `feedback-notifications/ValidationMessage`, `feedback-notifications/NotificationDot`, `feedback-notifications/NotificationBadge`, `feedback-notifications/NotificationBanner`, `feedback-notifications/EmptyState`, `feedback-notifications/ErrorState`, `feedback-notifications/SuccessState`, `feedback-notifications/Toast`, `feedback-notifications/Snackbar`, `feedback-notifications/UndoNotification`, `feedback-notifications/ProgressNotification`, `feedback-notifications/StatusMessage`, `feedback-notifications/Alert`, `loading-progress/LoadingScreen`, `loading-progress/LoadingOverlay`, `loading-progress/BufferingIndicator`, `loading-progress/DownloadProgress`, `loading-progress/UploadProgress`, `loading-progress/LoadingButton`, `loading-progress/ShimmerSkeleton`, `loading-progress/SkeletonLoader`, `loading-progress/ProgressSteps`, `loading-progress/CircularProgress`, `loading-progress/IndeterminateProgressBar`, `loading-progress/ProgressBar`, `loading-progress/PulseLoader`, `loading-progress/DotsLoader`, `loading-progress/SpinnerStatus`, `cards-content/FaqAccordion`, `navigation/Pagination`, `navigation/Breadcrumbs`, `navigation/Sidebar`, `navigation/NavigationBar`, `layout-containers/Footer`, `layout-containers/Header`, `data-display/Timeline`, `data-display/Table`, `data-display/KeyValueDisplay`, `data-display/List`, `media/ImageWithOverlay`, `media/Logo`, `media/AvatarGroup`, `media/Avatar`, `media/Thumbnail`, `media/Image`, `media/PlaceholderImage`, `forms-inputs/FileUpload`, `forms-inputs/Slider`, `forms-inputs/ToggleSwitch`, `forms-inputs/RadioButton`, `forms-inputs/Checkbox`, `forms-inputs/TextArea`, `forms-inputs/TextInput`, `cards-content/BasicCard`, `media/IconGroup`, `media/Icon`, `typography-text/CodeBlock`, `typography-text/Link`, `typography-text/Title`, `typography-text/Label`, `buttons-actions/Button`, `buttons-actions/IconButton`, and `cards-content/ContactCard`. Phase 7 adds all 20 Overlays and menus components; see [their API and review guide](overlays-menus-review.md) for details and preview links. Phase 8 adds 25 Search, filtering, and sorting components, including CommandMenu; see [their API and review guide](search-filtering-review.md) for usage, ownership, verification limits and preview links. Section 9 adds the 10 remaining specialized cards; see [their API and review guide](specialized-cards-review.md). ContactCard keeps its existing review status. Section 10 adds 14 advanced media/viewer components, including a bounded locally encoded QR display; see [their API and review guide](advanced-media-review.md). The other 49 component folders remain empty stubs. The duplicate TextBox stub was removed, leaving 185 active catalog components. Each component folder contains a `.tsx` source file, a `.css` file, and an `index.ts`. The catalog is declared in `scripts/generate-component-stubs.mjs`; rerunning that script only creates missing files and preserves implementations.

## Adding a component implementation

1. Implement the component in its existing category folder using `art-pix-` classes and `--art-pix-` custom properties.
2. Export the component and props type from the component's `index.ts`.
3. Add explicit exports to a category-level `index.ts` and then to `src/index.ts`.
4. Demonstrate the component in `src/playground/App.tsx` through the public source entry.
5. Run typecheck, lint, build, pack, and a tarball consumer smoke test.

Changes reach consuming projects only after rebuilding and updating or reinstalling the package dependency.

## Next.js

Interactive components that use state or event handlers need an appropriate Client Component boundary. Import the package stylesheet from a Next.js entry that permits global CSS. Next.js is not a dependency of this library.
