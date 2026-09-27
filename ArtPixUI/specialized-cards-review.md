# Specialized cards — awaiting review

Section 8 was committed separately as `d9cf7dc` (`feat: Search, Filtering & Sorting components`). It was not pushed. The 10 previously unimplemented section 9 cards are now `[-]` awaiting review. ContactCard and its earlier review notes remain unchanged. Section 9 changes have not been committed.

## Plan and design

1. Share a BasicCard-based content frame: generated heading association, selectable heading level, optional eyebrow/badge, content, actions and footer.
2. Add identity/feature cards, then product/media/pricing compositions.
3. Add notification/event/testimonial cards using supplied status, dates and attribution.
4. Add KPI/dashboard containers with content slots for later charts.
5. Export each API, add exhibits 113–122, validate semantics/edge states, and retain `[-]` until explicit user review.

All cards retain Spritecraft's lightly textured parchment, green/amber details and monospaced text with Plinth's rounded ink outline and raised base. Card surfaces are static and are not themselves links/buttons. Interactive behavior belongs to separately supplied actions, preserving normal keyboard access and avoiding nested interactive wrappers. Existing buttons/links retain their motion and reduced-motion handling. No new dependencies or automatic network/data operations were introduced.

## Previews

Refresh the running local playground. If restarting it, run `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` from `ArtPixUI/`.

| Component | Preview |
| --- | --- |
| UserCard | [Preview](http://127.0.0.1:5173/#user-card-demo) |
| FeatureCard | [Preview](http://127.0.0.1:5173/#feature-card-demo) |
| ProductCard | [Preview](http://127.0.0.1:5173/#product-card-demo) |
| MediaCard | [Preview](http://127.0.0.1:5173/#media-card-demo) |
| PricingCard | [Preview](http://127.0.0.1:5173/#pricing-card-demo) |
| NotificationCard | [Preview](http://127.0.0.1:5173/#notification-card-demo) |
| EventCard | [Preview](http://127.0.0.1:5173/#event-card-demo) |
| TestimonialCard | [Preview](http://127.0.0.1:5173/#testimonial-card-demo) |
| KpiStatCard | [Preview](http://127.0.0.1:5173/#kpi-stat-card-demo) |
| DashboardCard | [Preview](http://127.0.0.1:5173/#dashboard-card-demo) |

## Shared API

Import components/prop types from `art-pix-ui` and import `art-pix-ui/styles.css` once. Each card composes BasicCard and accepts its native div attributes (except reserved title/role/naming/unsafe inner-HTML props), padding, className and style.

- A required `title` supplies the heading for most cards. UserCard uses `name`; TestimonialCard uses `author`.
- `headingLevel` accepts 2–6, default 3. Every root is a named article with a unique heading ID. Choose a level appropriate to the host page.
- Optional `eyebrow`, `badge`, `children`, `actions` and `footer` accept React content. Actions remain separate from the card body.
- Values such as prices, units, trends and date labels are supplied by the caller, without hidden formatting, calculation, navigation, checkout or persistence.
- Native root handlers are forwarded when explicitly supplied, but the component does not invent card-wide interactive semantics. Use a real Button/Link in the actions slot rather than making the entire card an unlabelled click target.

## Individual APIs and review targets

- **UserCard:** required `name`; optional `subtitle/img/avatar` and shared slots. Default Avatar renders image or initials and is decorative beside the name. A custom avatar slot owns its own accessibility. Review missing image fallback, long names, subtitle and action access.
- **FeatureCard:** shared title plus optional `icon/description`. Icon slot has a green parchment tile; give meaningful icons an accessible name, or make redundant ones decorative. Review icon sizing, omitted slots and action callback.
- **ProductCard:** shared title and required `price`; optional `previousPrice/availability/img/imgAlt/media`. Image uses the existing Image component with 16:9 ratio and placeholder fallback. The media slot takes precedence; passing null suppresses default media content. Default imgAlt is empty (decorative), so supply meaningful alternate text where the image adds information. Former price has explicit “Was” text and strikethrough. Consumer supplies stock logic and purchase actions; the demo only increments an in-memory bag count.
- **MediaCard:** title and optional `img/imgAlt/media/caption/metadata`. Media is inside a figure with optional figcaption. Caller-supplied video/audio controls own playback, captions, accessibility and sizing. No player or autoplay logic is implemented early. The example landscape is a local code-drawn SVG data image; no external image requests are needed.
- **PricingCard:** title, `price`, and `features: ReactNode[]`; optional `period/featured/featuredLabel`. Featured adds a green border and amber badge (Recommended by default), which a supplied badge can replace. Feature checks are decorative alongside feature text. Review empty features, zero/free pricing, badge wrapping and primary action. No subscription or billing action is implicit.
- **NotificationCard:** title, optional `unread/severity/status/timestamp/dateTime`. Unread defaults false; state is explicitly labeled Read/Unread and is not conveyed solely by dot/color. Severity applies to the optional status line, which uses announcement off. Supply a valid machine-readable dateTime to render time semantics; otherwise timestamp remains caller-formatted text. Caller owns read/dismiss state; no automatic announcement or dismissal occurs.
- **EventCard:** title and required `when`; optional `dateTime/location/organizer`. Labeled description-list details expose when, where and host. The caller supplies timezone text and a valid dateTime string when available. No parsing, timezone conversion, calendar management or booking is performed.
- **TestimonialCard:** required `quote/author`; optional `attribution/img/avatar/cite`. Uses blockquote, optional source URL in its cite attribute, and author heading. Attribution is ordinary descriptive text rather than misusing the HTML cite element for a person's name. Image/avatar is optional. Quote children may be rich content; string content is escaped.
- **KpiStatCard:** title and `value`, with optional `unit/trend/description`. Zero is displayed, not treated as empty. Trend is a caller-supplied slot, not an early TrendIndicator implementation. Supply understandable direction/comparison text instead of relying only on color. No number animation, chart generation or live-region announcement is added.
- **DashboardCard:** title, optional `state: ready | loading | empty` (ready by default), `loadingLabel/loadingContent/emptyContent`. Ready renders children. Loading replaces children with static decorative SkeletonLoader placeholders, exposes a separate polite loading status, marks content busy, and omits actions. Empty replaces children with default/custom empty content and can show caller-provided recovery actions. Replaced content is unmounted, not hidden/preserved; store state outside the card when it must survive transitions. Footer remains visible in all states. Custom loading/empty content owns its own semantics.

## Verification

The new `scripts/check-specialized-cards.mjs` checks all 10 exports, distinct heading associations, native props/classes, content/actions/footer slots, avatar initials, image fallback/alt text, custom media replacement, featured pricing, read/unread/status semantics, machine-readable times, quote escaping, zero KPI values, dashboard state replacement/action suppression, and static responsive/forced-colors styling. Typecheck/library build, production playground build, lint, all earlier regression scripts and whitespace checks are rerun.

Live visual and assistive-technology verification is still pending; this guide does not equate server-rendered markup tests with browser focus, screen-reader or visual verification. The browser-tool security limitation from earlier phases has not been bypassed. No screenshots were captured. Future screenshots belong in workspace-root `samples/`, not the package folder, and are embedded only for remote users without file access unless explicitly requested.

Review in the browser: narrow-width and zoom wrapping, light/forced-colors contrast, heading hierarchy in context, avatar/image load failure, optional/long slot content, keyboard action access, read/unread toggle, dashboard ready/loading/empty transitions and screen-reader loading announcement. No item is marked `[x]` without user approval.

Future player, calendar and chart components remain in their scheduled phases. This batch does not change ContactCard or begin section 10.
