import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, ContactCard, IconButton, type ButtonProps, type ContactCardProps, type IconButtonProps } from "art-pix-ui";
import "art-pix-ui/styles.css";
import "./theme.css";

const contact: ContactCardProps = { title: "Package consumer", name: "Sample Contact", img: "/missing-avatar.png", phone: "+1 (555) 010-1234", email: "contact@example.com" };
const link: ButtonProps = { link: "#destination", children: "Navigate", target: "_self" };
const icon: IconButtonProps = { link: "#destination", "aria-label": "Navigate with icon", children: "→" };

function Consumer() {
  const [clicks, setClicks] = useState(0);
  const [submits, setSubmits] = useState(0);
  const [disabledClicks, setDisabledClicks] = useState(0);
  return (
    <main>
      <h1>ArtPixUI consumer smoke test</h1>
      <ContactCard {...contact}><p>Additional child content</p></ContactCard>
      <form onSubmit={(event) => { event.preventDefault(); setSubmits(submits + 1); }}>
        <Button onClick={(event) => { event.currentTarget.focus(); setClicks(clicks + 1); }}>Count clicks</Button>
        <Button type="submit">Submit</Button>
        <Button disabled>Disabled action</Button>
        <Button {...link} />
        <Button link="#should-not-navigate" disabled onClick={() => setDisabledClicks(disabledClicks + 1)}>Disabled link</Button>
        <IconButton {...icon} />
        <IconButton aria-label="Increment with icon" onClick={() => setClicks(clicks + 1)}>+</IconButton>
        <IconButton link="#should-not-navigate" disabled aria-label="Disabled icon link" onClick={() => setDisabledClicks(disabledClicks + 1)}>×</IconButton>
      </form>
      <p role="status">Clicks: {clicks}; submits: {submits}; disabled clicks: {disabledClicks}</p>
      <p id="destination">Navigation destination</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><Consumer /></StrictMode>);
