import { useState, type ReactNode } from "react";
import { UserCard, FeatureCard, ProductCard, MediaCard, PricingCard, NotificationCard, EventCard, TestimonialCard, KpiStatCard, DashboardCard, Button, Icon, type DashboardCardProps } from "../index.js";

function Exhibit({ id, name, number, children }: { id: string; name: string; number: number; children: ReactNode }) {
  return <section className="playground-exhibit" id={`${id}-demo`} aria-labelledby={`${id}-heading`}>
    <div className="playground-exhibit-heading"><span className="playground-number">{number}</span><h2 id={`${id}-heading`}>{name}</h2><span className="playground-kind">AWAITING REVIEW</span></div>
    <div style={{ display: "grid", gap: 24, padding: 28, minWidth: 0 }}>{children}</div>
  </section>;
}
const landscape = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><path fill="#f3e8c5" d="M0 0h640v360H0z"/><path fill="#f3ad38" d="M480 48h64v64h-64z"/><path fill="#247b3b" d="M0 260h80v-60h80v-60h80v60h80v60h80v-60h80v-60h80v60h80v60h80v100H0z"/><path fill="#2c3025" d="M0 320h160v-40h160v40h160v-40h160v80H0z"/></svg>')}`;

export function SpecializedCardsDemo() {
  const [result, setResult] = useState("No action requested.");
  const [cart, setCart] = useState(0);
  const [unread, setUnread] = useState(true);
  const [dashboardState, setDashboardState] = useState<DashboardCardProps["state"]>("ready");
  return <>
    <Exhibit id="user-card" name="A familiar face" number={113}>
      <UserCard name="Mira Chen" subtitle="Trail guide · Mossglen" eyebrow="Your collaborator" badge="Available" actions={<Button onClick={() => setResult("Profile requested.")}>View profile</Button>} footer="Member since 2024"><p>Finding the quiet paths and sharing them with everyone.</p></UserCard>
      <span role="status">{result}</span>
    </Exhibit>
    <Exhibit id="feature-card" name="A little possibility" number={114}>
      <FeatureCard title="Maps that travel with you" icon={<Icon aria-label="Map"><path d="M1 2h4v1h6V2h4v12h-4v-1H5v1H1zm2 2v8h2V4zm4 1v6h2V5zm4-1v8h2V4z" /></Icon>} description="Keep your route close, even when the signal fades." actions={<Button variant="secondary" onClick={() => setResult("Offline map details requested.")}>Explore offline maps</Button>}><p>No real downloads are started by this example.</p></FeatureCard><span>{result}</span>
    </Exhibit>
    <Exhibit id="product-card" name="Supplies for the journey" number={115}>
      <ProductCard title="Mossglen field guide" img={landscape} imgAlt="Pixel-art forest hills beneath an amber sun" price="24 coins" previousPrice="30 coins" availability="In stock" badge="Field notes" actions={<Button onClick={() => setCart(value => value + 1)}>Add to demo bag</Button>}><p>A pocket-sized collection of trails, landmarks, and little discoveries.</p></ProductCard>
      <span role="status">Demo bag: {cart} {cart === 1 ? "item" : "items"}. No purchase is made.</span>
      <ProductCard title="Image fallback example" price="—" img="" imgAlt="Product preview unavailable" availability="Unavailable" actions={<Button disabled>Unavailable</Button>} />
    </Exhibit>
    <Exhibit id="media-card" name="A window onto the trail" number={116}>
      <MediaCard title="Morning in Mossglen" img={landscape} imgAlt="Blocky green hills and an amber sun" caption="An original code-drawn pixel landscape." metadata="Trail journal · 3 minute read" actions={<Button variant="secondary" link="#image-demo">View image examples</Button>}><p>Image, video or audio content can be supplied through the media slot. This card does not autoplay anything.</p></MediaCard>
    </Exhibit>
    <Exhibit id="pricing-card" name="Choose your adventure" number={117}>
      <PricingCard title="Explorer" price="12 coins" period="per month" featured features={["Save unlimited routes", "Keep notes together", "Share with your party"]} actions={<Button onClick={() => setResult("Explorer plan selected; no subscription created.")}>Choose Explorer</Button>} footer="Illustrative pricing only."><p>Everything you need for your next small adventure.</p></PricingCard><span>{result}</span>
    </Exhibit>
    <Exhibit id="notification-card" name="News from your party" number={118}>
      <NotificationCard title="Your route is ready" unread={unread} severity="success" status="Map preparation complete" timestamp="September 27, 2026 · 9:00 AM EDT" dateTime="2026-09-27T09:00:00-04:00" actions={<Button variant="secondary" onClick={() => setUnread(value => !value)}>{unread ? "Mark as read" : "Mark as unread"}</Button>}><p>The Mossglen field notes are ready to review.</p></NotificationCard>
    </Exhibit>
    <Exhibit id="event-card" name="Meet at the trailhead" number={119}>
      <EventCard title="Mossglen morning walk" when="October 3, 2026 · 9:00 AM EDT" dateTime="2026-10-03T09:00:00-04:00" location="North gate, Mossglen" organizer="Mira Chen" badge="All levels" actions={<Button onClick={() => setResult("Interest recorded in this demo only.")}>I'm interested</Button>}><p>Bring water, comfortable shoes, and a little curiosity.</p></EventCard><span>{result}</span>
    </Exhibit>
    <Exhibit id="testimonial-card" name="A story worth sharing" number={120}>
      <TestimonialCard author="Rowan Ellis" attribution="Explorer · illustrative testimonial" quote={<p>“The best part of a good map is the confidence to take a path you haven't tried before.”</p>} footer="Sample copy for component review." />
    </Exhibit>
    <Exhibit id="kpi-stat-card" name="The numbers at a glance" number={121}>
      <KpiStatCard title="Routes explored" value={128} unit="routes" trend={<span>↑ 12 more than last month</span>} description="Completed routes in your demo atlas." footer="Example data; not a live metric." />
      <KpiStatCard title="Unread messages" value={0} unit="messages" description="Zero is a meaningful value, not an empty state." />
    </Exhibit>
    <Exhibit id="dashboard-card" name="A place for the big picture" number={122}>
      <div className="art-pix-search-row" role="group" aria-label="Dashboard preview state">{(["ready", "loading", "empty"] as const).map(state => <Button key={state} variant="secondary" aria-pressed={dashboardState === state} onClick={() => setDashboardState(state)}>{state}</Button>)}</div>
      <DashboardCard title="Adventure overview" eyebrow="This month" state={dashboardState} emptyContent={<p>No routes yet. Your first adventure will appear here.</p>} actions={<Button variant="secondary" onClick={() => setResult("Dashboard details requested.")}>View details</Button>} footer="Chart implementations will arrive in the later chart phase."><dl className="art-pix-special-card__details"><div><dt>Routes</dt><dd>128</dd></div><div><dt>New discoveries</dt><dd>12</dd></div></dl><p>This content slot can hold charts, tables, or other visualizations later.</p></DashboardCard><span>{result}</span>
    </Exhibit>
  </>;
}
