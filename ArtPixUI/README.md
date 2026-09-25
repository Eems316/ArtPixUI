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

Available components: `List`, `ImageWithOverlay`, `Logo`, `AvatarGroup`, `Avatar`, `Thumbnail`, `Image`, `PlaceholderImage`, `FileUpload`, `Slider`, `ToggleSwitch`, `RadioButton`, `Checkbox`, `TextArea`, `TextInput`, `BasicCard`, `IconGroup`, `Icon`, `CodeBlock`, `Link`, `Title`, `Label`, `ContactCard`, `Button`, and `IconButton`. Their corresponding props types are also exported. Review status is tracked separately in `task-list.md`.

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

The implemented components live in `data-display/List`, `media/ImageWithOverlay`, `media/Logo`, `media/AvatarGroup`, `media/Avatar`, `media/Thumbnail`, `media/Image`, `media/PlaceholderImage`, `forms-inputs/FileUpload`, `forms-inputs/Slider`, `forms-inputs/ToggleSwitch`, `forms-inputs/RadioButton`, `forms-inputs/Checkbox`, `forms-inputs/TextArea`, `forms-inputs/TextInput`, `cards-content/BasicCard`, `media/IconGroup`, `media/Icon`, `typography-text/CodeBlock`, `typography-text/Link`, `typography-text/Title`, `typography-text/Label`, `buttons-actions/Button`, `buttons-actions/IconButton`, and `cards-content/ContactCard`. The other 160 component folders remain empty stubs. The duplicate TextBox stub was removed, leaving 185 active catalog components. Each component folder contains a `.tsx` source file, a `.css` file, and an `index.ts`. The catalog is declared in `scripts/generate-component-stubs.mjs`; rerunning that script only creates missing files and preserves implementations.

## Adding a component implementation

1. Implement the component in its existing category folder using `art-pix-` classes and `--art-pix-` custom properties.
2. Export the component and props type from the component's `index.ts`.
3. Add explicit exports to a category-level `index.ts` and then to `src/index.ts`.
4. Demonstrate the component in `src/playground/App.tsx` through the public source entry.
5. Run typecheck, lint, build, pack, and a tarball consumer smoke test.

Changes reach consuming projects only after rebuilding and updating or reinstalling the package dependency.

## Next.js

Interactive components that use state or event handlers need an appropriate Client Component boundary. Import the package stylesheet from a Next.js entry that permits global CSS. Next.js is not a dependency of this library.
