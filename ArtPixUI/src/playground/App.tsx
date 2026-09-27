import { useState } from "react";
import { Button, ContactCard, IconButton, Label, Title, Link, CodeBlock, Icon, IconGroup, BasicCard, TextInput, TextArea, Checkbox, RadioButton, ToggleSwitch, Slider, FileUpload, PlaceholderImage, Image, Thumbnail, Avatar } from "../index.js";
import avatar from "./avatar.svg";
import { AvatarGroup, Logo, ImageWithOverlay, List, KeyValueDisplay, Table, Timeline, Header, Footer, NavigationBar, Sidebar, Breadcrumbs, Pagination, FaqAccordion, SpinnerStatus, DotsLoader, PulseLoader } from "../index.js";
import logo from "./logo.svg";

function PixelMark({ kind = "spark" }: { kind?: "spark" | "arrow" | "heart" | "plus" | "check" }) {
  const paths = {
    spark: "M7 0h2v5h2v2h5v2h-5v2H9v5H7v-5H5V9H0V7h5V5h2z",
    arrow: "M8 2h2v2h2v2h2v4h-2v2h-2v2H8v-4H1V6h7zm2 4v4h2V6z",
    heart: "M2 2h4v2h4V2h4v2h2v6h-2v2h-2v2h-2v2H6v-2H4v-2H2v-2H0V4h2z",
    plus: "M6 1h4v5h5v4h-5v5H6v-5H1V6h5z",
    check: "M12 2h3v3h-3v3H9v3H6v3H3v-3H0V8h3v3h3V8h3V5h3z",
  };
  return <svg viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

export function App() {
  const [count, setCount] = useState(0);
  const [faqOpenIds, setFaqOpenIds] = useState<string[]>(["start"]);
  const [demoPage, setDemoPage] = useState(1);
  const [longPage, setLongPage] = useState(10);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const sidebarItems = [
    { id: "home", label: "Overview", href: "#sidebar-heading", current: true, icon: <PixelMark kind="spark" /> },
    { id: "people", label: "People", href: "#contact-demo", icon: <PixelMark kind="heart" /> },
    { id: "notes", label: "Field notes", href: "#code-demo", icon: <PixelMark kind="check" /> },
  ];
  const [saved, setSaved] = useState(false);
  const [heroName, setHeroName] = useState("");
  const [story, setStory] = useState("");
  const [supplies, setSupplies] = useState([true, false]);
  const [route, setRoute] = useState("forest");
  const [questAlerts, setQuestAlerts] = useState(false);
  const [volume, setVolume] = useState(40);
  const [selectedFiles, setSelectedFiles] = useState(0);
  const [imageRecovered, setImageRecovered] = useState(false);
  const [avatarRecovered, setAvatarRecovered] = useState(false);

  return (
    <div className="playground">
      <header className="playground-header">
        <a href="#" className="playground-brand"><span><PixelMark /></span>ArtPix<span className="playground-brand-ui">UI</span></a>
        <span className="playground-header-note">A LITTLE PIXEL. A LITTLE PRESS.</span>
        <span className="playground-version">VOL. 001 <span aria-hidden="true">↗</span></span>
      </header>
      <main className="playground-main">
        <section className="playground-intro" aria-labelledby="playground-title">
          <div>
            <p className="playground-eyebrow"><span className="playground-status-dot" /> THE COMPONENT WORKSHOP</p>
            <h1 id="playground-title">Small details.<br /><span>A little character.</span></h1>
          </div>
          <div className="playground-intro-aside">
            <p>Parchment, pixels, and a satisfying press.<br />Familiar pieces with a playful second life.</p>
            <div className="playground-swatches" aria-label="Parchment, green, amber, and ink palette">
              <span /><span /><span /><span /><span className="playground-palette-label">SPRITE × SURFACE</span>
            </div>
          </div>
        </section>
        <div className="playground-section-label"><span>THE COMPONENT COLLECTION</span><span>BUILT TO BE TOUCHED</span></div>
        <div className="playground-exhibits">
          <section className="playground-exhibit playground-exhibit--contact" id="contact-demo" aria-labelledby="contact-heading">
            <div className="playground-exhibit-heading"><span className="playground-number">01</span><h2 id="contact-heading">A familiar face</h2><span className="playground-kind">CONTACT CARD</span></div>
            <div className="playground-contact-stage">
              <span className="playground-stage-note">GOOD PEOPLE. ONE CLICK AWAY.</span>
              <ContactCard title="Creative collaborator" name="Mira Chen" phone="+1 (415) 555-0142" email="mira@example.com" data-testid="contact-primary">
                <div className="playground-contact-note"><span className="playground-status-dot" /> Open for a new adventure</div>
                <Button link="mailto:mira@example.com">Say hello <PixelMark kind="arrow" /></Button>
              </ContactCard>
              <p className="playground-gesture">Hover to peek. Click to keep.</p>
              <div className="playground-contact-alt">
                <span className="playground-stage-note">WITH YOUR OWN IMAGE</span>
                <ContactCard title="Design engineer" name="Rory Brooks" img={avatar} imgAlt="Pixel portrait of Rory" phone="+1 (212) 555-0198" email="rory@example.com" />
              </div>
            </div>
            <div className="playground-exhibit-footer"><span>A small introduction, with more underneath.</span><span aria-hidden="true">↗</span></div>
          </section>
          <div className="playground-actions-column">
            <section className="playground-exhibit" aria-labelledby="button-heading">
              <div className="playground-exhibit-heading"><span className="playground-number">02</span><h2 id="button-heading">Make a move</h2><span className="playground-kind">BUTTON</span></div>
              <div className="playground-button-stage">
                <Button link="#contact-demo">Start a conversation <PixelMark kind="arrow" /></Button>
                <div className="playground-button-row">
                  <Button variant="secondary" onClick={() => setCount(count + 1)}><PixelMark kind="plus" /> Add to party</Button>
                  <Button disabled>Unavailable</Button>
                </div>
                <p className="playground-feedback" role="status">{count ? `${count} ${count === 1 ? "friend" : "friends"} added to the party.` : "A little lift. A lovely click."}</p>
              </div>
              <div className="playground-exhibit-footer"><span>Go somewhere. Do something.</span><span aria-hidden="true">↗</span></div>
            </section>
            <section className="playground-exhibit" aria-labelledby="icon-heading">
              <div className="playground-exhibit-heading"><span className="playground-number">03</span><h2 id="icon-heading">Less is plenty</h2><span className="playground-kind">ICON BUTTON</span></div>
              <div className="playground-icon-stage">
                <div className="playground-icon-example"><IconButton link="#contact-demo" aria-label="View contact"><PixelMark kind="arrow" /></IconButton><span>EXPLORE</span></div>
                <div className="playground-icon-example"><IconButton aria-label={saved ? "Unsave contact" : "Save contact"} aria-pressed={saved} onClick={() => setSaved(!saved)}><PixelMark kind={saved ? "check" : "heart"} /></IconButton><span role="status">{saved ? "SAVED" : "SAVE"}</span></div>
                <div className="playground-icon-example"><IconButton aria-label="Add contact (unavailable)" disabled><PixelMark kind="plus" /></IconButton><span>DISABLED</span></div>
              </div>
              <div className="playground-exhibit-footer"><span>Small footprint. Full of personality.</span><span aria-hidden="true">↗</span></div>
            </section>
          </div>
        </div>
        <section className="playground-exhibit playground-label-exhibit" id="label-demo" aria-labelledby="label-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">04</span><h2 id="label-heading">Give it a name</h2><span className="playground-kind">LABEL · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <div className="playground-label-example">
              <Label htmlFor="demo-hero-name" required>Hero name</Label>
              <input id="demo-hero-name" className="playground-label-input" required placeholder="Enter your name…" aria-describedby="demo-hero-hint" />
              <p id="demo-hero-hint">Click the label to focus the field. * Required.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="demo-guild-name">Guild name</Label>
              <input id="demo-guild-name" className="playground-label-input" placeholder="A place to belong…" aria-describedby="demo-guild-hint" />
              <p id="demo-guild-hint">An optional field, without the marker.</p>
            </div>
            <div className="playground-label-example">
              <Label className="playground-label-checkbox"><input type="checkbox" /> Remember this adventurer</Label>
              <p>A nested native control. Click the text to toggle it.</p>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Quiet type. Clear purpose. Native inputs shown only to demonstrate the labels.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-title-exhibit" id="title-demo" aria-labelledby="title-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">05</span><h2 id="title-heading">A few bold words</h2><span className="playground-kind">TITLE · AWAITING REVIEW</span></div>
          <div className="playground-title-stage">
            <div className="playground-title-example"><span>H1</span><Title level={1}>A new adventure</Title></div>
            <div className="playground-title-example"><span>H2</span><Title>Make yourself at home</Title></div>
            <div className="playground-title-example"><span>H3</span><Title level={3}>Meet your next collaborator</Title></div>
            <div className="playground-title-example"><span>H4</span><Title level={4}>Good things start small</Title></div>
            <div className="playground-title-example"><span>H5</span><Title level={5}>The details matter</Title></div>
            <div className="playground-title-example"><span>H6</span><Title level={6}>One little step at a time</Title></div>
          </div>
          <div className="playground-exhibit-footer"><span>Six semantic levels. Dark ink, bold type, no animation. Defaults to H2.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-link-exhibit" id="link-demo" aria-labelledby="link-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">06</span><h2 id="link-heading">Follow a little curiosity</h2><span className="playground-kind">LINK · AWAITING REVIEW</span></div>
          <div className="playground-link-stage">
            <div className="playground-link-example"><span className="playground-link-caption">SAME TAB</span><Link href="#contact-demo">Meet the collaborators</Link><p>A native link to the contact cards.</p></div>
            <div className="playground-link-example"><span className="playground-link-caption">NEW TAB</span><Link href="/#title-demo" target="_blank">Explore the headings (new tab)</Link><p>Opens separately with safe default link attributes.</p></div>
            <div className="playground-link-example"><span className="playground-link-caption">IN CONTEXT</span><p>Every adventure begins somewhere. <Link href="#link-note">Read the field notes</Link> before you set out.</p></div>
          </div>
          <div className="playground-exhibit-footer" id="link-note"><span>Field notes: hover for dark ink; use Tab to see the focus outline and Enter to follow a link.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-code-exhibit" id="code-demo" aria-labelledby="code-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">07</span><h2 id="code-heading">Notes from the workshop</h2><span className="playground-kind">CODE BLOCK · AWAITING REVIEW</span></div>
          <div className="playground-code-stage">
            <CodeBlock language="tsx" aria-label="Scrollable code example">{'<ContactCard\n  title="Creative collaborator"\n  name="Mira Chen"\n  email="mira@example.com"\n>\n  <Button link="mailto:mira@example.com">Say hello to your next creative collaborator</Button>\n</ContactCard>'}</CodeBlock>
            <CodeBlock wrap aria-label="Wrapped code example">{'// Optional wrapping; no language heading\nconst message = "Good things begin with a little curiosity, a few kind words, and room for one more adventurer.";\n\nconsole.log(message);'}</CodeBlock>
          </div>
          <div className="playground-exhibit-footer"><span>Plain text, preserved spacing. Tab into the first example and use arrow keys to scroll.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="icon-demo" aria-labelledby="icon-demo-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">08</span><h2 id="icon-demo-heading">A little pixel language</h2><span className="playground-kind">ICON · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            {(["small", "medium", "large"] as const).map(size => (
              <div className="playground-icon-demo-example" key={size}>
                <Icon size={size}><path d="M7 0h2v5h2v2h5v2h-5v2H9v5H7v-5H5V9H0V7h5V5h2z" /></Icon>
                <span>{size} · {size === "small" ? 16 : size === "medium" ? 24 : 32}px</span>
              </div>
            ))}
            <div className="playground-icon-demo-example">
              <Icon size="large" color="var(--art-pix-color-primary)" aria-label="Favorite"><path d="M2 2h4v2h4V2h4v2h2v6h-2v2h-2v2h-2v2H6v-2H4v-2H2v-2H0V4h2z" /></Icon>
              <span>Meaningful · Favorite</span>
            </div>
            <div className="playground-icon-demo-example">
              <IconButton link="#contact-demo" aria-label="View contact"><Icon><path d="M8 2h2v2h2v2h2v4h-2v2h-2v2H8v-4H1V6h7zm2 4v4h2V6z" /></Icon></IconButton>
              <span>Decorative inside a labeled action</span>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Inherits your text color. SVG shapes through children. No animation or added dependencies.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="icon-group-demo" aria-labelledby="icon-group-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">09</span><h2 id="icon-group-heading">Better together</h2><span className="playground-kind">ICON GROUP · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            <div className="playground-icon-demo-example">
              <IconGroup aria-label="Workshop symbols" spacing="small">
                {["M6 1h4v5h5v4h-5v5H6v-5H1V6h5z", "M7 0h2v5h2v2h5v2h-5v2H9v5H7v-5H5V9H0V7h5V5h2z"].map((path, index) => <Icon key={path} aria-label={index === 0 ? "Add" : "Spark"}><path d={path} /></Icon>)}
              </IconGroup>
              <span>Horizontal · small spacing</span>
            </div>
            <div className="playground-icon-demo-example">
              <IconGroup direction="vertical" spacing="large" aria-label="Explore components">
                <IconButton link="#contact-demo" aria-label="View contact"><PixelMark kind="arrow" /></IconButton>
                <IconButton link="#icon-demo" aria-label="View icons"><PixelMark /></IconButton>
              </IconGroup>
              <span>Vertical · large spacing</span>
            </div>
            <div className="playground-icon-demo-example">
              <IconGroup wrap aria-label="Party actions" style={{ width: 140 }}>
                <IconButton aria-label="Add friend" onClick={() => setCount(count + 1)}><PixelMark kind="plus" /></IconButton>
                <IconButton aria-label={saved ? "Unsave friend" : "Save friend"} aria-pressed={saved} onClick={() => setSaved(!saved)}><PixelMark kind={saved ? "check" : "heart"} /></IconButton>
                <IconButton link="#contact-demo" aria-label="Contact friend"><PixelMark kind="arrow" /></IconButton>
                <IconButton disabled aria-label="Invite friend (unavailable)"><PixelMark /></IconButton>
              </IconGroup>
              <span>Wrapping · medium spacing</span>
              <span role="status">{count} friends · {saved ? "Saved" : "Not saved"}</span>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Layout only. Tab visits each enabled action; the group adds no keyboard stop.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="basic-card-demo" aria-labelledby="basic-card-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">10</span><h2 id="basic-card-heading">Room for your ideas</h2><span className="playground-kind">BASIC CARD · AWAITING REVIEW</span></div>
          <div className="playground-basic-card-stage">
            <BasicCard padding="small" className="playground-basic-card-content">
              <span className="playground-stage-note">SMALL · 16PX</span>
              <Title level={3}>A little note</Title>
              <p>A quiet surface for whatever you want to share.</p>
            </BasicCard>
            <BasicCard className="playground-basic-card-content">
              <span className="playground-stage-note">MEDIUM · 24PX · DEFAULT</span>
              <Title level={3}>Start something good</Title>
              <p>Compose a heading, some words, and an action. The card stays still; the button does the work.</p>
              <Button link="#contact-demo">Meet a collaborator <PixelMark kind="arrow" /></Button>
            </BasicCard>
            <BasicCard padding="large" className="playground-basic-card-content">
              <span className="playground-stage-note">LARGE · 32PX</span>
              <Title level={3}>A little breathing room</Title>
              <p>Generous space, the same parchment texture, and a softly beveled edge.</p>
              <Link href="#code-demo">Explore the code examples</Link>
            </BasicCard>
          </div>
          <div className="playground-exhibit-footer"><span>Content through children. No built-in heading or actions, and no hover animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="text-input-demo" aria-labelledby="text-input-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">11</span><h2 id="text-input-heading">Your story starts here</h2><span className="playground-kind">TEXT INPUT · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <div className="playground-label-example">
              <Label htmlFor="text-hero" required>Adventurer name</Label>
              <TextInput id="text-hero" name="hero" required value={heroName} onChange={event => setHeroName(event.target.value)} placeholder="Enter your name…" aria-describedby="text-hero-hint" />
              <p id="text-hero-hint">Controlled value: {heroName || "(empty)"}. Required; steady caret where supported.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="text-guild">Your guild</Label>
              <TextInput id="text-guild" name="guild" defaultValue="Mossglen makers" aria-describedby="text-guild-hint" />
              <p id="text-guild-hint">Uncontrolled: native editing, selection, and undo.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="text-email">Contact email</Label>
              <TextInput id="text-email" type="email" defaultValue="not-an-email" aria-invalid="true" aria-describedby="text-email-error" />
              <p id="text-email-error">Example error: enter an email address such as hero@example.com. This example keeps its invalid state for review.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="text-readonly">Member code</Label>
              <TextInput id="text-readonly" readOnly defaultValue="ART-001" aria-describedby="text-readonly-hint" />
              <p id="text-readonly-hint">Read-only: focus and select to copy.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="text-disabled">Invite code</Label>
              <TextInput id="text-disabled" disabled defaultValue="Unavailable" />
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native input behavior. Label and descriptions are composed separately. Unsupported browsers retain their native caret.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="text-area-demo" aria-labelledby="text-area-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">12</span><h2 id="text-area-heading">A little more to say</h2><span className="playground-kind">TEXT AREA · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <div className="playground-label-example">
              <Label htmlFor="area-story" required>Your adventure</Label>
              <TextArea id="area-story" name="story" required value={story} onChange={event => setStory(event.target.value)} placeholder="Every adventure starts somewhere…" aria-describedby="area-story-hint" />
              <p id="area-story-hint">{story.length} characters. Resizable by default: drag the bottom-right corner. Width stays within its container.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="area-fixed">Field notes</Label>
              <TextArea id="area-fixed" resizable={false} rows={4} defaultValue={'Meet by the old oak.\nBring a little curiosity.'} aria-describedby="area-fixed-hint" />
              <p id="area-fixed-hint">Resizable is false. Native multiline editing remains available; overflowing text scrolls.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="area-invalid">Missing description</Label>
              <TextArea id="area-invalid" rows={3} aria-invalid="true" aria-describedby="area-error" />
              <p id="area-error">Example error: add a short description. Invalid styling stays on for review.</p>
            </div>
            <div className="playground-label-example">
              <Label htmlFor="area-readonly">Archived note</Label>
              <TextArea id="area-readonly" readOnly rows={3} defaultValue={'A good day in Mossglen.\nThree new friends.'} />
            </div>
            <div className="playground-label-example">
              <Label htmlFor="area-disabled">Unavailable notes</Label>
              <TextArea id="area-disabled" disabled resizable={false} rows={3} defaultValue="This notebook is locked." />
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native multiline editing and resize handle. Steady caret where supported; native caret otherwise.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="checkbox-demo" aria-labelledby="checkbox-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">13</span><h2 id="checkbox-heading">Pack a little possibility</h2><span className="playground-kind">CHECKBOX · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <div className="playground-label-example">
              <Label className="playground-checkbox-label"><Checkbox checked={supplies.every(Boolean)} indeterminate={supplies.some(Boolean) && !supplies.every(Boolean)} onChange={event => setSupplies([event.target.checked, event.target.checked])} /> All supplies</Label>
              <Label className="playground-checkbox-label"><Checkbox checked={supplies[0]} onChange={event => setSupplies([event.target.checked, supplies[1]])} /> Notebook</Label>
              <Label className="playground-checkbox-label"><Checkbox checked={supplies[1]} onChange={event => setSupplies([supplies[0], event.target.checked])} /> Map</Label>
              <p>Controlled selection. All supplies shows a dash when only some are selected.</p>
            </div>
            <div className="playground-label-example">
              <div className="playground-checkbox-label"><Checkbox id="checkbox-reminders" defaultChecked name="reminders" /><Label htmlFor="checkbox-reminders">Send reminders</Label></div>
              <Label className="playground-checkbox-label" required><Checkbox required name="agreement" /> Accept quest rules</Label>
              <p>Uncontrolled and native required examples. Click the text or press Space.</p>
            </div>
            <div className="playground-label-example">
              <Label className="playground-checkbox-label"><Checkbox disabled /> Unavailable</Label>
              <Label className="playground-checkbox-label"><Checkbox disabled defaultChecked /> Already assigned</Label>
              <p>Disabled controls cannot be toggled or reached with Tab.</p>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native checkbox semantics. Pixel check, mixed-state dash, and a little press.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="radio-button-demo" aria-labelledby="radio-button-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">14</span><h2 id="radio-button-heading">Choose your path</h2><span className="playground-kind">RADIO BUTTON · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <fieldset className="playground-radio-fieldset">
              <legend>Travel route · controlled</legend>
              <Label className="playground-checkbox-label"><RadioButton name="demo-route" value="forest" checked={route === "forest"} onChange={event => setRoute(event.target.value)} /> Forest trail</Label>
              <Label className="playground-checkbox-label"><RadioButton name="demo-route" value="mountain" disabled /> Mountain pass (closed)</Label>
              <Label className="playground-checkbox-label"><RadioButton name="demo-route" value="river" checked={route === "river"} onChange={event => setRoute(event.target.value)} /> River road</Label>
              <p>Selected: {route}. Arrow keys skip the disabled route.</p>
            </fieldset>
            <fieldset className="playground-radio-fieldset">
              <legend>Departure · uncontrolled</legend>
              <div className="playground-checkbox-label"><RadioButton id="radio-dawn" name="demo-departure" value="dawn" defaultChecked /><Label htmlFor="radio-dawn">At dawn</Label></div>
              <div className="playground-checkbox-label"><RadioButton id="radio-noon" name="demo-departure" value="noon" /><Label htmlFor="radio-noon">At noon</Label></div>
              <p>Only one option with the same name can be selected.</p>
            </fieldset>
            <fieldset className="playground-radio-fieldset">
              <legend>Quest length · required</legend>
              <Label className="playground-checkbox-label"><RadioButton name="demo-length" value="short" required /> Short quest</Label>
              <Label className="playground-checkbox-label"><RadioButton name="demo-length" value="long" required /> Long quest</Label>
              <p>Choose one. Native required validity applies to the group.</p>
            </fieldset>
          </div>
          <div className="playground-exhibit-footer"><span>Native grouping, labels, and arrow-key selection. Tab moves between groups.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="toggle-switch-demo" aria-labelledby="toggle-switch-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">15</span><h2 id="toggle-switch-heading">A little change of setting</h2><span className="playground-kind">TOGGLE SWITCH · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <div className="playground-label-example">
              <Label className="playground-checkbox-label"><ToggleSwitch checked={questAlerts} onChange={event => setQuestAlerts(event.target.checked)} aria-describedby="switch-alerts-hint" /> Quest alerts</Label>
              <p id="switch-alerts-hint">Controlled: alerts are {questAlerts ? "on" : "off"}. Click the label or press Space.</p>
            </div>
            <div className="playground-label-example">
              <div className="playground-checkbox-label"><ToggleSwitch id="switch-reminders" name="reminders" defaultChecked /><Label htmlFor="switch-reminders">Daily reminders</Label></div>
              <p>Uncontrolled, initially on. The thumb slides; the label stays the same.</p>
            </div>
            <div className="playground-label-example">
              <Label className="playground-checkbox-label"><ToggleSwitch disabled /> Unavailable setting</Label>
              <Label className="playground-checkbox-label"><ToggleSwitch disabled defaultChecked /> Always enabled</Label>
              <p>Disabled examples: on and off remain distinguishable by thumb position.</p>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native checked state with switch semantics. Reduced motion removes the thumb transition.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="slider-demo" aria-labelledby="slider-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">16</span><h2 id="slider-heading">Find your setting</h2><span className="playground-kind">SLIDER · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <div className="playground-label-example">
              <Label htmlFor="slider-volume">Music volume</Label>
              <Slider id="slider-volume" min={0} max={100} step={5} value={volume} onChange={event => setVolume(event.target.valueAsNumber)} aria-valuetext={`${volume} percent`} aria-describedby="slider-volume-hint" />
              <output htmlFor="slider-volume">{volume}%</output>
              <p id="slider-volume-hint">Controlled. Drag or use arrow keys; Home/End select the bounds.</p>
            </div>
            <form className="playground-label-example">
              <Label htmlFor="slider-distance">Travel distance</Label>
              <Slider id="slider-distance" name="distance" min={10} max={50} step={2} defaultValue={26} aria-describedby="slider-distance-hint" />
              <p id="slider-distance-hint">Uncontrolled: 10–50 in steps of 2. Reset restores 26 and its fill.</p>
              <Button type="reset" variant="secondary">Reset distance</Button>
            </form>
            <div className="playground-label-example">
              <Label htmlFor="slider-locked">Locked setting</Label>
              <Slider id="slider-locked" disabled defaultValue={65} />
              <p>Disabled: unavailable to pointer and keyboard input.</p>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native range behavior. Immediate thumb movement and a subtle pressed shadow.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="file-upload-demo" aria-labelledby="file-upload-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">17</span><h2 id="file-upload-heading">Bring something along</h2><span className="playground-kind">FILE UPLOAD · AWAITING REVIEW</span></div>
          <div className="playground-label-stage">
            <div className="playground-label-example">
              <Label htmlFor="upload-portrait">Portrait image</Label>
              <FileUpload id="upload-portrait" accept="image/*" aria-describedby="upload-portrait-hint" />
              <p id="upload-portrait-hint">Choose one image. Files stay local; nothing is uploaded.</p>
            </div>
            <form className="playground-label-example" onReset={() => setSelectedFiles(0)}>
              <Label htmlFor="upload-notes">Adventure notes</Label>
              <FileUpload id="upload-notes" name="notes" multiple accept=".txt,.md" onChange={event => setSelectedFiles(event.target.files?.length ?? 0)} aria-describedby="upload-notes-hint" />
              <p id="upload-notes-hint">{selectedFiles} files selected. Text or Markdown; multiple selection supported.</p>
              <Button type="reset" variant="secondary">Clear selection</Button>
            </form>
            <div className="playground-label-example">
              <Label htmlFor="upload-disabled">Unavailable attachment</Label>
              <FileUpload id="upload-disabled" disabled />
              <p>Disabled. Accepted types guide the picker, not security validation.</p>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native file selection and filename feedback. No automatic upload, progress UI, or added dependencies.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="placeholder-image-demo" aria-labelledby="placeholder-image-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">18</span><h2 id="placeholder-image-heading">A space for something good</h2><span className="playground-kind">PLACEHOLDER IMAGE · AWAITING REVIEW</span></div>
          <div className="playground-basic-card-stage">
            <div className="playground-label-example">
              <PlaceholderImage text="Image coming soon" alt="Landscape image coming soon" />
              <p>Default 16:9 ratio. Visible text with an accessible image description.</p>
            </div>
            <div className="playground-label-example">
              <PlaceholderImage aspectRatio="1 / 1" width={180} alt="Portrait unavailable" />
              <p>Square, 180px wide, with an icon only.</p>
            </div>
            <div className="playground-label-example">
              <PlaceholderImage width={220} height={120} alt="" />
              <p>Explicit dimensions. Decorative placeholder, hidden from assistive technology.</p>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>No image loading, animation, or network requests. A reusable fallback surface.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="image-demo" aria-labelledby="image-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">19</span><h2 id="image-heading">A picture with a place</h2><span className="playground-kind">IMAGE · AWAITING REVIEW</span></div>
          <div className="playground-basic-card-stage">
            <div className="playground-label-example">
              <Image src={avatar} alt="Pixel portrait, cropped to a wide frame" aspectRatio="16 / 9" fit="cover" />
              <p>Cover: fills the frame and crops the image.</p>
            </div>
            <div className="playground-label-example">
              <Image src={avatar} srcSet={`${avatar} 1x`} alt="Complete pixel portrait" width={260} height={180} fit="contain" loading="lazy" />
              <p>Contain: keeps the whole image visible. Native lazy loading and srcSet.</p>
            </div>
            <div className="playground-label-example">
              <Image alt="Portrait not supplied" fallbackText="No image supplied" aspectRatio="16 / 9" />
              <p>Missing source: the shared PlaceholderImage.</p>
            </div>
            <div className="playground-label-example">
              <Image src={imageRecovered ? avatar : "data:image/png;base64,broken"} alt="Recoverable pixel portrait" aspectRatio="16 / 9" fallbackText="Image unavailable" />
              <Button variant="secondary" onClick={() => setImageRecovered(!imageRecovered)}>{imageRecovered ? "Use broken source" : "Restore image"}</Button>
              <p>A failed source falls back. Changing the source retries loading.</p>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native image loading. No animation or added dependencies.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="thumbnail-demo" aria-labelledby="thumbnail-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">20</span><h2 id="thumbnail-heading">Small pictures, familiar faces</h2><span className="playground-kind">THUMBNAIL · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            {(["small", "medium", "large"] as const).map(size => <div className="playground-icon-demo-example" key={size}>
              <Thumbnail src={avatar} alt={`Pixel portrait, ${size} thumbnail`} size={size} />
              <span>{size} · {size === "small" ? 64 : size === "medium" ? 96 : 128}px</span>
            </div>)}
            <div className="playground-icon-demo-example"><Thumbnail src={avatar} alt="Uncropped portrait thumbnail" width={128} height={80} fit="contain" /><span>Contain · custom 128×80</span></div>
            <div className="playground-icon-demo-example"><Thumbnail size="small" alt="Portrait missing" /><span>Missing source</span></div>
            <div className="playground-icon-demo-example"><Thumbnail src="data:image/png;base64,broken" alt="Portrait unavailable" fallbackText="Unavailable" /><span>Failed source</span></div>
            <div className="playground-icon-demo-example"><Thumbnail src={avatar} alt="" size="small" /><span>Decorative image</span></div>
          </div>
          <div className="playground-exhibit-footer"><span>Built on Image. Shared loading and fallback behavior; no animation or built-in action.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="avatar-demo" aria-labelledby="avatar-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">21</span><h2 id="avatar-heading">A face in the party</h2><span className="playground-kind">AVATAR · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            {(["small", "medium", "large"] as const).map(size => <div className="playground-icon-demo-example" key={size}>
              <Avatar src={avatar} name="Rory Brooks" size={size} alt={`Rory Brooks, ${size} avatar`} />
              <span>{size} · {size === "small" ? 32 : size === "medium" ? 48 : 64}px</span>
            </div>)}
            <div className="playground-icon-demo-example"><Avatar name="Mira Chen" /><span>Missing image · initials</span></div>
            <div className="playground-icon-demo-example"><Avatar /><span>No name · pixel person</span></div>
            <div className="playground-icon-demo-example"><Avatar src={avatar} name="Rory Brooks" alt="" /><span>Decorative</span></div>
            <div className="playground-icon-demo-example">
              <Avatar src={avatarRecovered ? avatar : "data:image/png;base64,broken"} name="Alex Taylor" size="large" />
              <Button variant="secondary" onClick={() => setAvatarRecovered(!avatarRecovered)}>{avatarRecovered ? "Break avatar image" : "Restore avatar image"}</Button>
              <span>Failed source · initials, then recovery</span>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Portrait, initials, or pixel person. One accessible name; no animation or built-in action.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="avatar-group-demo" aria-labelledby="avatar-group-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">22</span><h2 id="avatar-group-heading">Gather your party</h2><span className="playground-kind">AVATAR GROUP · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            {(["small", "medium", "large"] as const).map(size => <div className="playground-icon-demo-example" key={size}>
              <AvatarGroup size={size} max={3} aria-label={`${size} party`}>
                <Avatar src={avatar} name="Rory Brooks" />
                <Avatar name="Mira Chen" />
                <Avatar name="Alex Taylor" />
                <Avatar name="Sam Lee" />
                <Avatar name="Robin Park" />
              </AvatarGroup>
              <span>{size} · three visible, two more</span>
            </div>)}
            <div className="playground-icon-demo-example">
              <AvatarGroup aria-label="Whole party"><Avatar src={avatar} name="Rory Brooks" /><Avatar name="Mira Chen" /><Avatar /></AvatarGroup>
              <span>No limit · everyone visible</span>
            </div>
            <div className="playground-icon-demo-example">
              <AvatarGroup max={0} aria-label="Count only"><Avatar name="Mira Chen" /><Avatar name="Sam Lee" /></AvatarGroup>
              <span>Zero visible · count only</span>
            </div>
            <div className="playground-icon-demo-example">
              <AvatarGroup dir="rtl" max={2} aria-label="Right-to-left party"><Avatar src={avatar} name="Rory Brooks" /><Avatar name="Mira Chen" /><Avatar name="Sam Lee" /></AvatarGroup>
              <span>Right-to-left · one more</span>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Overlapping portraits with an accessible overflow count. No animation or built-in action.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="logo-demo" aria-labelledby="logo-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">23</span><h2 id="logo-heading">Make your mark</h2><span className="playground-kind">LOGO · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            <div className="playground-icon-demo-example"><Logo src={logo} alt="ArtPixUI sample brand" width={216} /><span>Natural proportions · 216px wide</span></div>
            <div className="playground-icon-demo-example"><Logo src={logo} alt="ArtPixUI small sample brand" width={144} /><span>Scaled · 144px wide</span></div>
            <div className="playground-icon-demo-example"><Logo src={logo} alt="ArtPixUI" link="#logo-heading" linkLabel="ArtPixUI logo section" width={216} /><span>Linked · keyboard focus outline</span></div>
            <div className="playground-icon-demo-example"><Logo src={logo} alt="" width={180} height={80} /><span>Decorative · contained in 180×80</span></div>
          </div>
          <div className="playground-exhibit-footer"><span>Sample artwork only; supply your own brand image. No animation or forced image border.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="image-with-overlay-demo" aria-labelledby="image-with-overlay-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">24</span><h2 id="image-with-overlay-heading">A story in the frame</h2><span className="playground-kind">IMAGE WITH OVERLAY · AWAITING REVIEW</span></div>
          <div className="playground-basic-card-stage">
            {(["top", "center", "bottom"] as const).map(position => <ImageWithOverlay key={position} src={avatar} alt="" position={position} aspectRatio="1 / 1">
              <strong>{position.toUpperCase()} · The next adventure</strong>
              <span>Pixel portraits, familiar faces, and stories worth sharing.</span>
              <Button link="#image-with-overlay-heading">Explore</Button>
            </ImageWithOverlay>)}
            <ImageWithOverlay src="data:image/png;base64,broken" alt="Unavailable party portrait" aspectRatio="1 / 1">
              <strong>The story stays visible</strong>
              <span>A failed image uses the shared fallback. Content and actions remain available.</span>
            </ImageWithOverlay>
            <ImageWithOverlay alt="" aspectRatio="16 / 9">
              <strong>Room for a longer story</strong>
              <span>Missing images keep the same frame. Content participates in normal layout, so this panel can grow when words wrap on a narrow screen. Supply any children, including your own headings, descriptions, and buttons. The wrapper itself is not clickable.</span>
            </ImageWithOverlay>
          </div>
          <div className="playground-exhibit-footer"><span>Top, center, or bottom content. Shared image fallback; no animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="list-demo" aria-labelledby="list-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">25</span><h2 id="list-heading">Every little detail</h2><span className="playground-kind">LIST · AWAITING REVIEW</span></div>
          <div className="playground-basic-card-stage">
            <div className="playground-basic-card-content"><strong>Pack for the journey</strong>
              <List aria-label="Supplies"><li>A map of the forest</li><li>A notebook for discoveries and longer notes that wrap naturally</li><li><Link href="#list-heading">Read the packing guide</Link></li></List>
            </div>
            <div className="playground-basic-card-content"><strong>Continue your quest</strong>
              <List ordered start={3} aria-label="Quest steps"><li>Meet your party</li><li>Choose your trail</li><li>Begin the adventure</li></List>
            </div>
            <div className="playground-basic-card-content"><strong>Compact inventory</strong>
              <List compact aria-label="Inventory"><li>Compass</li><li>Lantern</li><li>Journal<List compact aria-label="Journal sections"><li>Field notes</li><li>Sketches</li></List></li></List>
            </div>
            <div className="playground-basic-card-content"><strong>Reverse order · RTL layout</strong>
              <List ordered reversed start={3} compact dir="rtl" aria-label="Countdown"><li>Prepare</li><li>Ready</li><li>Go</li></List>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Native lists and list items. Regular or compact spacing; no animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="key-value-display-demo" aria-labelledby="key-value-display-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">26</span><h2 id="key-value-display-heading">The details that matter</h2><span className="playground-kind">KEY VALUE DISPLAY · AWAITING REVIEW</span></div>
          <div style={{ padding: 24 }}>
            <KeyValueDisplay aria-label="Adventure details" items={[
              { id: "name", label: "Adventure", value: "The Mossglen trail" },
              { id: "guide", label: "Guide", value: <Link href="#key-value-display-heading">Mira Chen · View guide</Link> },
              { id: "supplies", label: "Supplies remaining", value: 0 },
              { id: "notes", label: "Field notes", value: "Follow the forest path past the old watchtower. Longer descriptions wrap without pushing the labels or values outside the frame." },
            ]} />
            <div style={{ maxWidth: 300, marginTop: 24 }}>
              <strong>Narrow container</strong>
              <KeyValueDisplay aria-label="Compact details" items={[
                { id: "party", label: "Party", value: <AvatarGroup aria-label="Travelers"><Avatar name="Mira Chen" /><Avatar name="Alex Taylor" /></AvatarGroup> },
                { id: "reference", label: "Reference", value: "MOSSGLEN-EXPEDITION-2026-EXTRA-LONG-REFERENCE" },
                { id: "status", label: "Status", value: "Ready for departure" },
              ]} />
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Semantic label/value pairs. Stacks at 400px container width; no animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="table-demo" aria-labelledby="table-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">27</span><h2 id="table-heading">A place for every detail</h2><span className="playground-kind">TABLE · AWAITING REVIEW</span></div>
          <div style={{ padding: 24, display: "grid", gap: 28, minWidth: 0 }}>
            <Table caption="Party supplies" scrollLabel="Party supplies — scroll horizontally" minWidth={600}>
              <thead><tr><th scope="col">Item</th><th scope="col">Keeper</th><th scope="col">Quantity</th><th scope="col">Notes</th></tr></thead>
              <tbody>
                <tr><th scope="row">Lantern</th><td><Link href="#table-heading">Mira Chen</Link></td><td>2</td><td>Ready for the forest trail</td></tr>
                <tr><th scope="row">Maps</th><td>Alex Taylor</td><td>3</td><td>Includes the old watchtower route</td></tr>
                <tr><th scope="row">Rations</th><td>Sam Lee</td><td>0</td><td>Restock before departure</td></tr>
              </tbody>
              <tfoot><tr><th scope="row" colSpan={2}>Total supplies</th><td>5</td><td>Three categories</td></tr></tfoot>
            </Table>
            <div style={{ maxWidth: 300, minWidth: 0 }}>
              <Table aria-label="Upcoming quests" scrollLabel="Upcoming quests — scroll horizontally">
                <thead><tr><th scope="col">Quest</th><th scope="col">Destination</th><th scope="col">Status</th></tr></thead>
                <tbody><tr><td colSpan={3}>No quests scheduled. Add your own empty-state content.</td></tr></tbody>
              </Table>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Tab to a scrolling region and use arrow keys. Native headers and cells; no sorting or pagination.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="timeline-demo" aria-labelledby="timeline-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">28</span><h2 id="timeline-heading">One step, then another</h2><span className="playground-kind">TIMELINE · AWAITING REVIEW</span></div>
          <div className="playground-basic-card-stage">
            <Timeline aria-label="Adventure events" items={[
              { id: "gather", title: "Party assembled", timestamp: "September 25 · 8:00 AM", dateTime: "2026-09-25T08:00:00-04:00", content: "Mira and Alex meet at the old oak." },
              { id: "trail", title: "The trail begins", timestamp: "Later that morning", content: <>A longer field note wraps naturally without interrupting the line between events. <Link href="#timeline-heading">Read the field notes</Link></> },
              { id: "camp", title: "Camp established", content: <AvatarGroup aria-label="Camp companions"><Avatar name="Mira Chen" /><Avatar name="Alex Taylor" /></AvatarGroup> },
            ]} />
            <div className="playground-basic-card-content"><strong>Single event · right-to-left</strong>
              <Timeline dir="rtl" aria-label="Single event" items={[{ id: "ready", title: "Ready for the next chapter", timestamp: "Whenever you are", content: "One marker, no trailing connector." }]} />
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Supplied order and timestamps. Optional custom content; no animation or automatic date formatting.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="header-demo" aria-labelledby="header-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">29</span><h2 id="header-heading">A welcoming beginning</h2><span className="playground-kind">HEADER · AWAITING REVIEW</span></div>
          <div style={{ padding: 24, display: "grid", gap: 28, minWidth: 0 }}>
            <Header aria-label="Workshop header" brand={<Logo src={logo} alt="ArtPixUI" width={180} link="#header-heading" linkLabel="ArtPixUI workshop" />}
              navigationLabel="Workshop navigation"
              navigation={<><Link href="#header-heading" aria-current="page">Overview</Link><Link href="#contact-demo">People</Link><Link href="#table-demo">Supplies</Link></>}
              actions={<Button link="#contact-demo">Say hello</Button>}>
              <span>A home for little things with character.</span>
            </Header>
            <div style={{ maxWidth: 300, minWidth: 0 }}>
              <Header aria-label="Compact section header" brand={<strong>Adventure journal</strong>}
                navigationLabel="Journal navigation" navigation={<><Link href="#header-heading">Entries</Link><Link href="#timeline-demo">Timeline</Link></>}
                actions={<IconButton link="#contact-demo" aria-label="Meet the party"><PixelMark kind="arrow" /></IconButton>} />
            </div>
            <Header aria-label="Simple section header" brand={<strong>Field notes</strong>}>A title and supporting content, without navigation or actions.</Header>
          </div>
          <div className="playground-exhibit-footer"><span>Native page or section header. Flexible slots wrap naturally; no sticky behavior or animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="footer-demo" aria-labelledby="footer-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">30</span><h2 id="footer-heading">A thoughtful sign-off</h2><span className="playground-kind">FOOTER · AWAITING REVIEW</span></div>
          <div style={{ padding: 24, display: "grid", gap: 28, minWidth: 0 }}>
            <Footer aria-label="Workshop footer" brand={<Logo src={logo} alt="ArtPixUI" width={180} link="#footer-heading" linkLabel="ArtPixUI footer example" />}
              navigationLabel="Workshop footer links" navigation={<><Link href="#footer-heading">About</Link><Link href="#contact-demo">Contact</Link><Link href="#code-demo">Documentation</Link></>}>
              <span>© 2026 ArtPixUI. Made of little things, with room for your own story.</span>
            </Footer>
            <div style={{ maxWidth: 300, minWidth: 0 }}>
              <Footer aria-label="Compact journal footer" brand={<strong>Adventure journal</strong>}
                navigationLabel="Journal footer links" navigation={<><Link href="#timeline-demo">Past adventures</Link><Link href="#footer-heading">Back to the journal</Link></>}>
                <span>A longer supporting note wraps naturally inside this narrow 300px container.</span>
              </Footer>
            </div>
            <Footer aria-label="Simple section footer">End of the field notes. No brand or navigation required.</Footer>
          </div>
          <div className="playground-exhibit-footer"><span>Native page or section footer. Optional slots and wrapping content; no fixed positioning or animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="navigation-bar-demo" aria-labelledby="navigation-bar-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">31</span><h2 id="navigation-bar-heading">Find your way</h2><span className="playground-kind">NAVIGATION BAR · AWAITING REVIEW</span></div>
          <div style={{ padding: 24, display: "grid", gap: 28, minWidth: 0 }}>
            <NavigationBar aria-label="Workshop primary navigation"
              brand={<Logo src={logo} alt="ArtPixUI" width={180} />}
              items={[{ id: "overview", label: "Overview", href: "#navigation-bar-heading", current: true }, { id: "people", label: "People", href: "#contact-demo" }, { id: "supplies", label: "Supplies", href: "#table-demo" }]}
              actions={<Button link="#contact-demo">Say hello</Button>} />
            <div style={{ maxWidth: 300, minWidth: 0 }}>
              <NavigationBar aria-label="Compact journal navigation" brand={<strong>Adventure journal</strong>}
                items={[{ id: "journal", label: "Journal", href: "#navigation-bar-heading", current: true }, { id: "past", label: "Past adventures and field notes", href: "#timeline-demo" }]}
                actions={<IconButton link="#contact-demo" aria-label="Meet the party"><PixelMark kind="arrow" /></IconButton>} />
            </div>
            <NavigationBar aria-label="Right-to-left section navigation" dir="rtl" items={[{ id: "notes", label: "Notes", href: "#navigation-bar-heading" }, { id: "history", label: "History", href: "#timeline-demo", current: true }]} />
          </div>
          <div className="playground-exhibit-footer"><span>Current page is caller-supplied. Native links and wrapping layout; no mobile drawer or added motion.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="sidebar-demo" aria-labelledby="sidebar-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">32</span><h2 id="sidebar-heading">A companion at your side</h2><span className="playground-kind">SIDEBAR · AWAITING REVIEW</span></div>
          <div className="playground-basic-card-stage">
            <div className="playground-basic-card-content"><strong>Static · collapse disabled</strong>
              <Sidebar heading="Workshop" aria-label="Static sidebar" navigationLabel="Static workshop links" items={sidebarItems} collapsed animated={false}>Always expanded, even with collapsed=true.</Sidebar>
            </div>
            <div className="playground-basic-card-content"><strong>Collapsible · hover to peek</strong>
              <Sidebar heading="Workshop" aria-label="Collapsible sidebar" navigationLabel="Collapsible workshop links" items={sidebarItems} collapse collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed}>
                <Link href="#sidebar-heading">Supporting content</Link>
              </Sidebar>
              <span>{sidebarCollapsed ? "Collapsed" : "Expanded"} · controlled by the example</span>
            </div>
            <div className="playground-basic-card-content"><strong>Optional drawer</strong>
              <Button onClick={() => setSidebarOpen(true)}>Open sidebar drawer</Button>
              <span>Escape, backdrop, or Close dismisses it. Focus returns to this button.</span>
              <Sidebar drawer open={sidebarOpen} onOpenChange={setSidebarOpen} collapse collapsed={drawerCollapsed} onCollapsedChange={setDrawerCollapsed}
                heading="Your workshop" aria-label="Workshop drawer" navigationLabel="Drawer workshop links"
                items={sidebarItems.map(item => ({ ...item, onClick: () => setSidebarOpen(false) }))}>
                <span>Content remains available when expanded.</span>
              </Sidebar>
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Capability and state are separate. Hover/focus peeks; expand control opens fully. Reduced motion removes sidebar animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="breadcrumbs-demo" aria-labelledby="breadcrumbs-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">33</span><h2 id="breadcrumbs-heading">Remember the way here</h2><span className="playground-kind">BREADCRUMBS · AWAITING REVIEW</span></div>
          <div style={{ padding: 24, display: "grid", gap: 28, minWidth: 0 }}>
            <Breadcrumbs aria-label="Workshop breadcrumb trail" items={[{ id: "home", label: "Home", href: "#breadcrumbs-heading" }, { id: "components", label: "Components", href: "#navigation-bar-demo" }, { id: "current", label: "Breadcrumbs", href: "#breadcrumbs-heading" }]} />
            <div style={{ maxWidth: 240 }}><Breadcrumbs aria-label="Narrow breadcrumb trail" items={[{ id: "home", label: "Home", href: "#breadcrumbs-heading" }, { id: "journal", label: "Adventure journal", href: "#timeline-demo" }, { id: "current", label: "A very long field note from the Mossglen expedition" }]} /></div>
            <Breadcrumbs aria-label="Single-page breadcrumb trail" items={[{ id: "current", label: "Workshop home" }]} />
            <Breadcrumbs dir="rtl" aria-label="Right-to-left breadcrumb trail" items={[{ id: "home", label: "Home", href: "#breadcrumbs-heading" }, { id: "section", label: "Archive" }, { id: "current", label: "Field notes" }]} />
          </div>
          <div className="playground-exhibit-footer"><span>The last item is the current page, never a link. Decorative separators; wrapping without truncation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="pagination-demo" aria-labelledby="pagination-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">34</span><h2 id="pagination-heading">A little further along</h2><span className="playground-kind">PAGINATION · AWAITING REVIEW</span></div>
          <div style={{ padding: 24, display: "grid", gap: 28, minWidth: 0 }}>
            <div><strong>Five pages</strong><Pagination aria-label="Short results pagination" page={demoPage} totalPages={5} onPageChange={setDemoPage} /><p aria-live="polite">Showing page {demoPage} of 5</p></div>
            <div style={{ maxWidth: 300 }}><strong>Long range · narrow container</strong><Pagination aria-label="Long results pagination" page={longPage} totalPages={20} onPageChange={setLongPage} /><p aria-live="polite">Showing page {longPage} of 20</p></div>
            <div><strong>Single page</strong><Pagination aria-label="Single-page results" page={1} totalPages={1} onPageChange={() => {}} /></div>
            <div><strong>Disabled controls</strong><Pagination aria-label="Disabled results pagination" page={2} totalPages={3} onPageChange={() => {}} disabled /></div>
          </div>
          <div className="playground-exhibit-footer"><span>Controlled, one-based pages. Ellipses are decorative; native buttons support Tab, Enter, and Space.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="faq-accordion-demo" aria-labelledby="faq-accordion-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">35</span><h2 id="faq-accordion-heading">A few good questions</h2><span className="playground-kind">FAQ ACCORDION · AWAITING REVIEW</span></div>
          <div style={{ padding: 24, display: "grid", gap: 28, minWidth: 0 }}>
            <FaqAccordion aria-label="Workshop questions" items={[
              { id: "pack", question: "What should I bring?", answer: <>A notebook, a little curiosity, and comfortable shoes. <Link href="#faq-accordion-heading">Read the packing notes</Link></> },
              { id: "friends", question: "Can I invite a friend?", answer: <><p>There is always room for one more adventurer.</p><Button link="#contact-demo">Meet the party</Button></> },
              { id: "long", question: "What happens when a longer question or answer needs room on a small screen?", answer: "Both wrap naturally, and the open panel grows with its content. No fixed answer height or text truncation is needed." },
            ]} />
            <div style={{ maxWidth: 300 }}><strong>Single open · controlled</strong>
              <FaqAccordion aria-label="Journey questions" singleOpen openIds={faqOpenIds} onOpenChange={setFaqOpenIds} items={[
                { id: "start", question: "Where do we start?", answer: "At the old oak, just after sunrise." },
                { id: "return", question: "When do we return?", answer: "Before the lanterns are lit. Opening this answer closes the other." },
              ]} />
            </div>
          </div>
          <div className="playground-exhibit-footer"><span>Enter or Space toggles a question. Closed answers are inert and hidden from assistive technology. Reduced motion removes transitions.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="spinner-status-demo" aria-labelledby="spinner-status-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">36</span><h2 id="spinner-status-heading">A little moment</h2><span className="playground-kind">SPINNER STATUS · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            <SpinnerStatus size="small" label="Saving field notes…" />
            <SpinnerStatus />
            <SpinnerStatus size="large" label="Gathering your party…" />
            <div style={{ maxWidth: 200 }}><SpinnerStatus label="Loading a longer status message that wraps in a narrow space…" /></div>
            <Button link="#spinner-status-heading">Still available</Button>
          </div>
          <div className="playground-exhibit-footer"><span>16 / 24 / 32px indicators. Stepped rotation; static with reduced motion. No blocked interactions.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="dots-loader-demo" aria-labelledby="dots-loader-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">37</span><h2 id="dots-loader-heading">Good things take a moment</h2><span className="playground-kind">DOTS LOADER · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            <DotsLoader size="small" label="Saving notes…" />
            <DotsLoader />
            <DotsLoader size="large" label="Gathering supplies…" />
            <div style={{ maxWidth: 180 }}><DotsLoader label="Loading a longer message that wraps in a narrow space…" /></div>
            <Button link="#dots-loader-heading">Still available</Button>
          </div>
          <div className="playground-exhibit-footer"><span>Three square dots, staggered opacity pulses. Static dots with reduced motion; no blocked interactions.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit playground-icon-demo" id="pulse-loader-demo" aria-labelledby="pulse-loader-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">38</span><h2 id="pulse-loader-heading">A quiet little rhythm</h2><span className="playground-kind">PULSE LOADER · AWAITING REVIEW</span></div>
          <div className="playground-icon-demo-stage">
            <PulseLoader size="small" label="Saving notes…" />
            <PulseLoader />
            <PulseLoader size="large" label="Preparing your adventure…" />
            <div style={{ maxWidth: 180 }}><PulseLoader label="Loading a longer status message that wraps in a narrow space…" /></div>
            <Button link="#pulse-loader-heading">Still available</Button>
          </div>
          <div className="playground-exhibit-footer"><span>12 / 16 / 24px squares. Gentle scale and opacity pulse; static with reduced motion. No blocked interactions.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="progress-bar-demo" aria-labelledby="progress-bar-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">39</span><h2 id="progress-bar-heading">Every little step counts</h2><span className="playground-kind">PROGRESS BAR · AWAITING REVIEW</span></div>
          <ProgressBarDemo />
          <div className="playground-exhibit-footer"><span>Controlled progress. Optional percentage, clamped values, and reduced-motion support.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="indeterminate-progress-bar-demo" aria-labelledby="indeterminate-progress-bar-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">40</span><h2 id="indeterminate-progress-bar-heading">An adventure in the making</h2><span className="playground-kind">INDETERMINATE PROGRESS BAR · AWAITING REVIEW</span></div>
          <div style={{ display: "grid", gap: 28, padding: 28 }}>
            <IndeterminateProgressBar />
            <IndeterminateProgressBar label="Gathering your supplies…" />
            <div style={{ maxWidth: 180 }}><IndeterminateProgressBar label="A longer loading message in a narrow space…" /></div>
            <IndeterminateProgressBar dir="rtl" label="RTL loading preview" />
            <Button link="#indeterminate-progress-bar-heading">Still available</Button>
          </div>
          <div className="playground-exhibit-footer"><span>Unknown duration, no percentage. Repeating sweep; static centered segment with reduced motion.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="circular-progress-demo" aria-labelledby="circular-progress-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">41</span><h2 id="circular-progress-heading">Coming full circle</h2><span className="playground-kind">CIRCULAR PROGRESS · AWAITING REVIEW</span></div>
          <CircularProgressDemo />
          <div className="playground-exhibit-footer"><span>64 / 96 / 128px rings. Controlled progress, optional percentage, and reduced-motion support.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="progress-steps-demo" aria-labelledby="progress-steps-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">42</span><h2 id="progress-steps-heading">One step closer</h2><span className="playground-kind">PROGRESS STEPS · AWAITING REVIEW</span></div>
          <ProgressStepsDemo />
          <div className="playground-exhibit-footer"><span>Completed, current, upcoming. Display-only steps; your application controls progression.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="skeleton-loader-demo" aria-labelledby="skeleton-loader-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">43</span><h2 id="skeleton-loader-heading">Room for what's coming</h2><span className="playground-kind">SKELETON LOADER · AWAITING REVIEW</span></div>
          <div style={{ display: "grid", gap: 28, padding: 28 }}>
            <div style={{ display: "grid", gap: 12 }}><Label>Rectangle</Label><SkeletonLoader height={96} /></div>
            <div style={{ display: "grid", gap: 12 }}><Label>Text lines</Label><SkeletonLoader shape="text" /><SkeletonLoader shape="text" width="75%" /><SkeletonLoader shape="text" width="45%" /></div>
            <div style={{ display: "grid", gap: 12 }}><Label>Circle</Label><SkeletonLoader shape="circle" width={64} /></div>
            <BasicCard style={{ maxWidth: 260 }}>
              <div style={{ display: "grid", gap: 16 }}>
                <span>Profile loading…</span>
                <SkeletonLoader shape="circle" />
                <SkeletonLoader shape="text" width="65%" />
                <SkeletonLoader shape="text" />
                <SkeletonLoader shape="text" width="80%" />
              </div>
            </BasicCard>
          </div>
          <div className="playground-exhibit-footer"><span>Static decorative placeholders. Numeric or CSS dimensions; no animation or focus stops.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="shimmer-skeleton-demo" aria-labelledby="shimmer-skeleton-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">44</span><h2 id="shimmer-skeleton-heading">A little light on the way</h2><span className="playground-kind">SHIMMER SKELETON · AWAITING REVIEW</span></div>
          <div style={{ display: "grid", gap: 28, padding: 28 }}>
            <div style={{ display: "grid", gap: 12 }}><Label>Rectangle</Label><ShimmerSkeleton height={96} /></div>
            <div style={{ display: "grid", gap: 12 }}><Label>Text lines</Label><ShimmerSkeleton shape="text" /><ShimmerSkeleton shape="text" width="75%" /><ShimmerSkeleton shape="text" width="45%" /></div>
            <div style={{ display: "grid", gap: 12 }}><Label>Circle</Label><ShimmerSkeleton shape="circle" width={64} /></div>
            <BasicCard style={{ maxWidth: 260 }}>
              <div style={{ display: "grid", gap: 16 }}>
                <span>Profile loading…</span>
                <ShimmerSkeleton shape="circle" />
                <ShimmerSkeleton shape="text" width="65%" />
                <ShimmerSkeleton shape="text" />
                <ShimmerSkeleton shape="text" width="80%" />
              </div>
            </BasicCard>
            <div dir="rtl" style={{ display: "grid", gap: 12 }}><Label>Right-to-left sweep</Label><ShimmerSkeleton height={48} /></div>
          </div>
          <div className="playground-exhibit-footer"><span>Gentle highlight sweep. Static with reduced motion or forced colors; decorative and non-interactive.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="loading-button-demo" aria-labelledby="loading-button-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">45</span><h2 id="loading-button-heading">A moment for the adventure</h2><span className="playground-kind">LOADING BUTTON · AWAITING REVIEW</span></div>
          <LoadingButtonDemo />
          <div className="playground-exhibit-footer"><span>Controlled loading, optional busy text, blocked activation. Stepped spinner; static with reduced motion.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="upload-progress-demo" aria-labelledby="upload-progress-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">46</span><h2 id="upload-progress-heading">Supplies on their way</h2><span className="playground-kind">UPLOAD PROGRESS · AWAITING REVIEW</span></div>
          <UploadProgressDemo />
          <div className="playground-exhibit-footer"><span>Display only: no files are uploaded. Byte counts and percentage follow your application.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="download-progress-demo" aria-labelledby="download-progress-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">47</span><h2 id="download-progress-heading">A new adventure arriving</h2><span className="playground-kind">DOWNLOAD PROGRESS · AWAITING REVIEW</span></div>
          <DownloadProgressDemo />
          <div className="playground-exhibit-footer"><span>Display only: no files are downloaded. Byte counts and percentage follow your application.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="buffering-indicator-demo" aria-labelledby="buffering-indicator-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">48</span><h2 id="buffering-indicator-heading">The story will be right back</h2><span className="playground-kind">BUFFERING INDICATOR · AWAITING REVIEW</span></div>
          <BufferingIndicatorDemo />
          <div className="playground-exhibit-footer"><span>Caller-controlled visibility. Polite status, stepped spinner and reduced-motion support. No media playback.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="loading-overlay-demo" aria-labelledby="loading-overlay-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">49</span><h2 id="loading-overlay-heading">A pause in this corner</h2><span className="playground-kind">LOADING OVERLAY · AWAITING REVIEW</span></div>
          <LoadingOverlayDemo />
          <div className="playground-exhibit-footer"><span>Only this region is blocked. Children stay mounted; loading is controlled outside the overlay.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="loading-screen-demo" aria-labelledby="loading-screen-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">50</span><h2 id="loading-screen-heading">Your next chapter is loading</h2><span className="playground-kind">LOADING SCREEN · AWAITING REVIEW</span></div>
          <LoadingScreenDemo />
          <div className="playground-exhibit-footer"><span>Full-height page replacement, not an overlay. Shared pixel spinner; static with reduced motion.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="alert-demo" aria-labelledby="alert-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">51</span><h2 id="alert-heading">A note for your journey</h2><span className="playground-kind">ALERT · AWAITING REVIEW</span></div>
          <AlertDemo />
          <div className="playground-exhibit-footer"><span>Four severities. Polite by default; assertive only when requested. No automatic dismissal or animation.</span><span aria-hidden="true">↗</span></div>
        </section>
        <section className="playground-exhibit" id="status-message-demo" aria-labelledby="status-message-heading">
          <div className="playground-exhibit-heading"><span className="playground-number">52</span><h2 id="status-message-heading">Small notes along the way</h2><span className="playground-kind">STATUS MESSAGE · AWAITING REVIEW</span></div>
          <StatusMessageDemo />
          <div className="playground-exhibit-footer"><span>Compact feedback without a card. Shared severity and announcement conventions; no animation or automatic dismissal.</span><span aria-hidden="true">↗</span></div>
        </section>
        <FeedbackStatesDemo />
        <OverlaysMenusDemo />
        <SearchFilteringDemo />
        <SpecializedCardsDemo />
        <footer className="playground-footer"><span><PixelMark /> MADE OF LITTLE THINGS.</span><span>ARTPIXUI / COMPONENT STUDIES</span></footer>
      </main>
    </div>
  );
}

function ProgressBarDemo() {
  const [value, setValue] = useState(40);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <ProgressBar label="Preparing your adventure" value={value} showPercentage />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button onClick={() => setValue((current) => Math.min(100, current + 20))} disabled={value === 100}>Advance 20%</Button>
      <Button onClick={() => setValue(0)}>Reset progress</Button>
    </div>
    <ProgressBar label="Waiting to begin" value={0} showPercentage />
    <ProgressBar label="All supplies gathered" value={250} max={250} showPercentage />
    <div style={{ maxWidth: 180 }}><ProgressBar label="A longer label in a narrow space" value={3} max={8} /></div>
  </div>;
}
function CircularProgressDemo() {
  const [value, setValue] = useState(40);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28 }}>
      <CircularProgress size="small" value={0} label="Ready to begin" showPercentage />
      <CircularProgress value={value} label="Gathering supplies" showPercentage />
      <CircularProgress size="large" value={8} max={8} label="All packed" showPercentage />
      <div style={{ maxWidth: 140 }}><CircularProgress value={3} max={8} label="A longer label in a narrow space" /></div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button onClick={() => setValue(current => Math.min(100, current + 20))} disabled={value === 100}>Advance ring 20%</Button>
      <Button onClick={() => setValue(0)}>Reset ring</Button>
    </div>
  </div>;
}

function ProgressStepsDemo() {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = [
    { id: "plan", label: "Plan", description: "Choose your adventure." },
    { id: "pack", label: "Pack", description: "Gather your supplies." },
    { id: "depart", label: "Depart", description: "The journey awaits." },
  ];
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <ProgressSteps steps={steps} currentStep={currentStep} aria-label="Adventure preparation" />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button onClick={() => setCurrentStep(step => Math.max(1, step - 1))} disabled={currentStep === 1}>Previous step</Button>
      <Button onClick={() => setCurrentStep(step => Math.min(4, step + 1))} disabled={currentStep === 4}>{currentStep === 3 ? "Complete steps" : "Next step"}</Button>
      <Button onClick={() => setCurrentStep(1)}>Reset steps</Button>
    </div>
    <div style={{ maxWidth: 220 }}><ProgressSteps steps={steps} currentStep={3} aria-label="Narrow layout" /></div>
    <ProgressSteps dir="rtl" steps={steps} currentStep={4} aria-label="Completed RTL example" />
  </div>;
}

function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <LoadingButton loading={loading} loadingText="Saving adventure…" onClick={() => { setAttempts(count => count + 1); setLoading(true); }}>Save adventure</LoadingButton>
      <Button variant="secondary" disabled={!loading} onClick={() => setLoading(false)}>Finish demo loading</Button>
      <span>Actions started: {attempts}</span>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <LoadingButton loading>Gather supplies</LoadingButton>
      <LoadingButton loading variant="secondary" loadingText="Preparing…">Prepare</LoadingButton>
      <LoadingButton disabled>Unavailable</LoadingButton>
      <LoadingButton loading link="#loading-button-heading" loadingText="Opening…">Open adventure</LoadingButton>
    </div>
  </div>;
}

function UploadProgressDemo() {
  const [uploaded, setUploaded] = useState(400000);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <UploadProgress fileName="adventure-map.png" uploadedBytes={uploaded} totalBytes={1000000} />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button disabled={uploaded >= 1000000} onClick={() => setUploaded(value => Math.min(1000000, value + 200000))}>Simulate 200 KB</Button>
      <Button onClick={() => setUploaded(0)}>Reset upload preview</Button>
    </div>
    <UploadProgress fileName="supplies.zip" uploadedBytes={2500000} totalBytes={2500000} />
    <UploadProgress fileName="unknown-size.bin" uploadedBytes={12000} totalBytes={0} />
    <div style={{ maxWidth: 200 }}><UploadProgress fileName="a-very-long-adventure-map-filename.png" uploadedBytes={3} totalBytes={8} /></div>
  </div>;
}

function DownloadProgressDemo() {
  const [downloaded, setDownloaded] = useState(400000);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <DownloadProgress fileName="adventure-map.png" downloadedBytes={downloaded} totalBytes={1000000} />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button disabled={downloaded >= 1000000} onClick={() => setDownloaded(value => Math.min(1000000, value + 200000))}>Receive 200 KB (demo)</Button>
      <Button onClick={() => setDownloaded(0)}>Reset download preview</Button>
    </div>
    <DownloadProgress fileName="supplies.zip" downloadedBytes={2500000} totalBytes={2500000} />
    <DownloadProgress fileName="unknown-size.bin" downloadedBytes={12000} totalBytes={0} />
    <div style={{ maxWidth: 200 }}><DownloadProgress fileName="a-very-long-adventure-map-filename.png" downloadedBytes={3} totalBytes={8} /></div>
  </div>;
}

function BufferingIndicatorDemo() {
  const [buffering, setBuffering] = useState(true);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <BasicCard>
      <div style={{ display: "grid", gap: 20 }}>
        <span>Media status preview — no audio or video is loaded.</span>
        <div style={{ minHeight: 32 }}><BufferingIndicator buffering={buffering} /></div>
        <Button aria-pressed={buffering} onClick={() => setBuffering(value => !value)}>Toggle buffering preview</Button>
      </div>
    </BasicCard>
    <BufferingIndicator size="small" label="Waiting for audio…" />
    <BufferingIndicator size="large" label="Preparing the next scene…" />
    <div style={{ maxWidth: 180 }}><BufferingIndicator label="Waiting for a longer scene to finish buffering…" /></div>
  </div>;
}

function LoadingOverlayDemo() {
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState(0);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <Button aria-pressed={loading} onClick={() => setLoading(value => !value)}>Toggle region loading</Button>
    <LoadingOverlay loading={loading} label="Refreshing your adventure…">
      <BasicCard>
        <div style={{ display: "grid", gap: 16 }}>
          <Label htmlFor="overlay-notes">Adventure notes</Label>
          <TextInput id="overlay-notes" defaultValue="Keep these notes while loading" />
          <Button onClick={() => setActions(value => value + 1)}>Use region action</Button>
          <span>Region actions: {actions}</span>
        </div>
      </BasicCard>
    </LoadingOverlay>
    <Button link="#loading-overlay-heading">Outside region link</Button>
    <div style={{ maxWidth: 240 }}><LoadingOverlay loading label="Loading a longer message in a narrow region…"><BasicCard>Underlying sample content.</BasicCard></LoadingOverlay></div>
  </div>;
}

function LoadingScreenDemo() {
  const [loading, setLoading] = useState(true);
  return <div>
    <div style={{ padding: 24 }}><Button aria-pressed={loading} onClick={() => setLoading(value => !value)}>Toggle loading screen preview</Button></div>
    {loading ? <LoadingScreen label="Preparing your next adventure…">
      <p>Gathering maps, supplies, and a little inspiration.</p>
      <Button variant="secondary" onClick={() => setLoading(false)}>Finish loading preview</Button>
    </LoadingScreen> : <BasicCard><p>Your adventure is ready. The loading screen has been replaced.</p><Button onClick={() => setLoading(true)}>Show loading screen again</Button></BasicCard>}
  </div>;
}

function AlertDemo() {
  const [updated, setUpdated] = useState(false);
  return <div style={{ display: "grid", gap: 28, padding: 28 }}>
    <Alert title="Before you set off">Your map is available offline.</Alert>
    <Alert severity="success" title="Supplies saved" announcement="off">Everything is packed for the adventure.</Alert>
    <Alert severity="warning" title="Weather ahead" announcement="off">Check the forecast before leaving camp.</Alert>
    <Alert severity="error" title="Map unavailable" announcement="off">The map could not be loaded. <Link href="#alert-heading">Review your route</Link>.</Alert>
    <Button onClick={() => setUpdated(value => !value)}>Update polite message</Button>
    <Alert title="Route status">{updated ? "The alternate route is ready." : "Your original route is selected."}</Alert>
    <div style={{ maxWidth: 240 }}><Alert severity="warning" announcement="off">A longer message wraps in a narrow space without relying on color alone.</Alert></div>
    <Alert dir="rtl" severity="success" announcement="off">Right-to-left layout example.</Alert>
  </div>;
}

function StatusMessageDemo() {
  const [saved, setSaved] = useState(false);
  const [urgent, setUrgent] = useState(false);
  return <div style={{ display: "grid", gap: 24, padding: 28 }}>
    <StatusMessage announcement="off">Your map is available offline.</StatusMessage>
    <StatusMessage severity="success" announcement="off">Supplies are packed.</StatusMessage>
    <StatusMessage severity="warning" announcement="off">Check the weather before leaving.</StatusMessage>
    <StatusMessage severity="error" announcement="off">The route could not be saved. <Link href="#status-message-heading">Review route</Link>.</StatusMessage>
    <Button onClick={() => setSaved(value => !value)}>Update polite status</Button>
    <StatusMessage severity={saved ? "success" : "info"}>{saved ? "Your notes have been saved." : "Your notes are ready to save."}</StatusMessage>
    <Button onClick={() => setUrgent(value => !value)}>Update urgent status</Button>
    <StatusMessage severity="error" announcement="assertive">{urgent ? "Connection lost. Your unsaved notes remain on this device." : null}</StatusMessage>
    <div style={{ maxWidth: 190 }}><StatusMessage severity="warning" announcement="off">A longer status message wraps in a narrow space.</StatusMessage></div>
    <StatusMessage dir="rtl" severity="success" announcement="off">Right-to-left layout example.</StatusMessage>
  </div>;
}

import { ProgressBar, IndeterminateProgressBar, CircularProgress, ProgressSteps, SkeletonLoader, ShimmerSkeleton, LoadingButton, UploadProgress, DownloadProgress, BufferingIndicator, LoadingOverlay, LoadingScreen, Alert, StatusMessage } from "../index.js";
import { FeedbackStatesDemo } from "./FeedbackStatesDemo.js";
import { OverlaysMenusDemo } from "./OverlaysMenusDemo.js";
import { SearchFilteringDemo } from "./SearchFilteringDemo.js";
import { SpecializedCardsDemo } from "./SpecializedCardsDemo.js";
