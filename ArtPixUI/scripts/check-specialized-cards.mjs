import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as ui from "../dist/art-pix-ui.js";

const render = (name, props, children) => renderToStaticMarkup(createElement(ui[name], props, children));
const cases = {
 UserCard: { name: "Mira Chen", subtitle: "Trail guide" },
 FeatureCard: { title: "Offline maps", description: "Take your maps anywhere" },
 ProductCard: { title: "Field guide", price: "24 coins" },
 MediaCard: { title: "Morning", caption: "Forest study" },
 PricingCard: { title: "Explorer", price: "12 coins", features: ["Maps", "Notes"] },
 NotificationCard: { title: "Ready", status: "Map prepared", unread: true },
 EventCard: { title: "Trail walk", when: "Saturday morning" },
 TestimonialCard: { author: "Rowan Ellis", quote: "A useful map" },
 KpiStatCard: { title: "Routes", value: 0 },
 DashboardCard: { title: "Overview" },
};
for (const [name, props] of Object.entries(cases)) {
 assert.equal(typeof ui[name], "function", name);
 const html = render(name, { ...props, headingLevel: 2, className: "custom-card", id: `test-${name}`, actions: createElement("button", { type: "button" }, "Action"), footer: "Footer", eyebrow: "Context", badge: "New" }, "Extra content");
 assert.match(html, /role="article"/); assert.match(html, /aria-labelledby=/); assert.match(html, /<h2/); assert.match(html, /custom-card/);
 assert.match(html, /Extra content/); assert.match(html, /Action/); assert.match(html, /Footer/); assert.match(html, /Context/); assert.match(html, /New/);
 assert(!html.includes('tabindex="0"'), "The card itself must not be a tab stop");
 assert(!html.includes('role="button"'), "The card itself must not become an interactive wrapper");
}
const combined = renderToStaticMarkup(createElement(Fragment, {}, ...Object.entries(cases).map(([name, props]) => createElement(ui[name], { ...props, key: name }))));
const headings = [...combined.matchAll(/aria-labelledby="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(headings).size, 10, "Each card has a distinct generated heading association");
for (const id of headings) assert(combined.includes(`id="${id}"`));

const user = render("UserCard", { name: "Mira Chen" });
assert.match(user, /MC/); assert.match(user, /aria-hidden="true"/); assert.match(user, /Mira Chen/);
const product = render("ProductCard", { title: "Guide", price: 0, previousPrice: 5, availability: "Unavailable", img: "", imgAlt: "Guide preview" });
assert.match(product, /Was <s>5<\/s>/); assert.match(product, />0<\/span>/); assert.match(product, /Unavailable/); assert.match(product, /Guide preview/);
const image = render("ProductCard", { title: "Guide", price: "$12", img: "guide.png", imgAlt: "Green field guide" });
assert.match(image, /alt="Green field guide"/);
const media = render("MediaCard", { title: "Audio", img: "unused.png", media: createElement("audio", { controls: true, "aria-label": "Trail recording" }), caption: "Recorded at dawn" });
assert.match(media, /<figure/); assert.match(media, /<figcaption/); assert.match(media, /<audio/); assert(!media.includes("unused.png"));
const pricing = render("PricingCard", { title: "Explorer", price: "12", period: "monthly", features: ["Maps", "Notes"], featured: true });
assert.match(pricing, /Recommended/); assert.match(pricing, /art-pix-pricing-card--featured/); assert.equal((pricing.match(/<li>/g) ?? []).length, 2);
assert(!render("PricingCard", { title: "Free", price: 0, features: [] }).includes("<ul"));
const notification = render("NotificationCard", { title: "Ready", unread: true, severity: "success", status: "Done", timestamp: "Today", dateTime: "2026-09-27" });
assert.match(notification, /Unread/); assert.match(notification, /art-pix-status-message--success/); assert.match(notification, /aria-live="off"/); assert.match(notification, /<time dateTime="2026-09-27"/); assert(!notification.includes('role="alert"'));
assert.match(render("NotificationCard", { title: "Read", unread: false }), /<span>Read<\/span>/);
const event = render("EventCard", { title: "Walk", when: "9 AM EDT", dateTime: "2026-10-03T09:00:00-04:00", location: "North gate", organizer: "Mira" });
assert.match(event, /<dl/); assert.match(event, /<time/); assert.match(event, /North gate/); assert.match(event, /Hosted by/);
assert(!render("EventCard", { title: "Later", when: "Time to be announced" }).includes("<time"));
assert.match(render("TestimonialCard", { author: "Rowan", quote: "<script>sample</script>", cite: "https://example.com/review", attribution: "Explorer" }), /<blockquote[^>]+cite=/);
assert.match(render("TestimonialCard", { author: "Rowan", quote: "<script>sample</script>" }), /&lt;script&gt;/);
assert.match(render("KpiStatCard", { title: "Routes", value: 0, unit: "routes", trend: "Up 12" }), />0<\/span>/);
for (const state of ["ready", "loading", "empty"]) {
 const html = render("DashboardCard", { title: "Overview", state, actions: createElement("button", {}, "Details"), emptyContent: "No routes" }, "Chart content");
 assert.equal(html.includes("Chart content"), state === "ready");
 assert.equal(html.includes("No routes"), state === "empty");
 assert.equal(html.includes("art-pix-skeleton-loader"), state === "loading");
 assert.equal(html.includes("Details"), state !== "loading");
 assert.match(html, new RegExp(`aria-busy="${state === "loading"}"`));
}
assert.match(render("DashboardCard", { title: "Overview", state: "loading", loadingContent: "Custom placeholder" }), /Custom placeholder/);
const css = readFileSync(new URL("../src/components/cards-content/_shared/cards.css", import.meta.url), "utf8");
assert(!/\banimation:|\btransition:/.test(css), "Card surfaces add no motion");
assert(css.includes("forced-colors")); assert(css.includes("flex-wrap: wrap"));
console.log("10 specialized cards: exports, heading associations, native props, content/action slots, zero values, media/empty/loading fallbacks, semantics and static responsive styling checks passed. Live visual/AT checks remain manual.");
