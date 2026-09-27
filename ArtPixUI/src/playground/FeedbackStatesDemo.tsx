import { useState, type ReactNode } from "react";
import { Button, TextInput, Label, InfoMessage, SuccessMessage, WarningMessage, ErrorMessage, ValidationMessage, NotificationDot, NotificationBadge, NotificationBanner, EmptyState, ErrorState, SuccessState, Toast, Snackbar, UndoNotification, ProgressNotification } from "../index.js";

function Exhibit({ id, name, number, children }: { id: string; name: string; number: number; children: ReactNode }) {
  return <section className="playground-exhibit" id={`${id}-demo`} aria-labelledby={`${id}-heading`}>
    <div className="playground-exhibit-heading"><span className="playground-number">{number}</span><h2 id={`${id}-heading`}>{name}</h2><span className="playground-kind">AWAITING REVIEW</span></div>
    <div style={{ display: "grid", gap: 20, padding: 28, minWidth: 0 }}>{children}</div>
  </section>;
}

export function FeedbackStatesDemo() {
  const [name, setName] = useState("");
  const [banner, setBanner] = useState(true);
  const [toast, setToast] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [undo, setUndo] = useState(false);
  const [undoResult, setUndoResult] = useState("No change yet.");
  const [progress, setProgress] = useState(30);
  const [notice, setNotice] = useState(true);
  const [actionResult, setActionResult] = useState("No action requested.");
  const invalid = name.trim().length < 2;
  return <>
    <Exhibit id="info-message" name="A useful note" number={53}><InfoMessage announcement="off">Your map is available offline.</InfoMessage><InfoMessage announcement="off" dir="rtl">Right-to-left information.</InfoMessage></Exhibit>
    <Exhibit id="success-message" name="A little success" number={54}><SuccessMessage announcement="off">Your supplies have been saved.</SuccessMessage></Exhibit>
    <Exhibit id="warning-message" name="Before you set off" number={55}><WarningMessage announcement="off">Check the weather before leaving camp.</WarningMessage></Exhibit>
    <Exhibit id="error-message" name="Something needs attention" number={56}><ErrorMessage announcement="off">The map is unavailable. Your notes are still here.</ErrorMessage></Exhibit>
    <Exhibit id="validation-message" name="Helpful field feedback" number={57}>
      <Label htmlFor="feedback-name">Adventure name</Label>
      <TextInput id="feedback-name" value={name} onChange={event => setName(event.target.value)} aria-invalid={invalid} aria-describedby="feedback-name-validation" />
      <ValidationMessage id="feedback-name-validation" state={invalid ? "error" : "success"}>{invalid ? "Use at least two characters." : "This name is ready."}</ValidationMessage>
    </Exhibit>
    <Exhibit id="notification-dot" name="A small signal" number={58}><span>Activity <NotificationDot /></span><span>Decorative example <NotificationDot decorative /></span></Exhibit>
    <Exhibit id="notification-badge" name="Count the little things" number={59}><div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}><NotificationBadge count={3} /><NotificationBadge count={125} /><NotificationBadge count={0} showZero /><NotificationBadge label="New" /></div></Exhibit>
    <Exhibit id="notification-banner" name="A note that stays" number={60}><Button onClick={() => setBanner(value => !value)}>Toggle banner</Button><NotificationBanner open={banner} title="Offline mode" onDismiss={() => setBanner(false)}>Your notes will sync when you reconnect.</NotificationBanner></Exhibit>
    <Exhibit id="empty-state" name="Room for a new adventure" number={61}><EmptyState title="No saved routes" action={<Button onClick={() => setActionResult("Create route requested.")}>Create route</Button>}>Your first route will appear here.</EmptyState><span>{actionResult}</span></Exhibit>
    <Exhibit id="error-state" name="A chance to try again" number={62}><ErrorState title="Map unavailable" action={<Button onClick={() => setActionResult("Retry requested.")}>Try again</Button>}>Check your connection, then try again.</ErrorState><span>{actionResult}</span></Exhibit>
    <Exhibit id="success-state" name="Ready for the next chapter" number={63}><SuccessState title="Adventure saved" action={<Button onClick={() => setActionResult("Continue requested.")}>Continue</Button>}>Your route and notes are ready.</SuccessState><span>{actionResult}</span></Exhibit>
    <Exhibit id="toast" name="A passing note" number={64}><Button onClick={() => setToast(true)}>Show toast</Button><Toast open={toast} onDismiss={() => setToast(false)} severity="success" title="Notes saved">Closes after five seconds. Hover or focus to pause.</Toast></Exhibit>
    <Exhibit id="snackbar" name="A quick action" number={65}><Button onClick={() => setSnackbar(true)}>Show snackbar</Button><Snackbar open={snackbar} onDismiss={() => setSnackbar(false)} action={<Button onClick={() => { setActionResult("Details requested."); setSnackbar(false); }}>View details</Button>}>Your supplies are packed. This action-bearing message stays until dismissed.</Snackbar><span>{actionResult}</span></Exhibit>
    <Exhibit id="undo-notification" name="A second chance" number={66}>
      <Button disabled={undo} onClick={() => { setUndoResult("Demo item removed; undo is available for ten active seconds."); setUndo(true); }}>Simulate removal</Button>
      <UndoNotification open={undo} onUndo={() => setUndoResult("Demo item restored.")} onExpire={() => setUndoResult("Undo window expired; no real data was changed.")} onDismiss={() => setUndo(false)}>Demo item removed.</UndoNotification>
      <span role="status">{undoResult}</span>
    </Exhibit>
    <Exhibit id="progress-notification" name="Progress worth knowing" number={67}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Button onClick={() => { setNotice(true); setProgress(value => Math.min(100, value + 10)); }}>Advance notice 10%</Button><Button onClick={() => { setNotice(true); setProgress(0); }}>Reset notice</Button></div>
      <ProgressNotification open={notice} value={progress} title="Preparing your map" progressLabel="Map preparation" onDismiss={() => setNotice(false)}>Progress is supplied by the application; 100% does not dismiss it.</ProgressNotification>
      <ProgressNotification title="Gathering supplies" progressLabel="Unknown progress">An unknown total uses the indeterminate bar.</ProgressNotification>
    </Exhibit>
  </>;
}
