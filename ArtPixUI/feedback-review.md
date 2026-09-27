# Feedback, notifications, and states — review guide

All 17 phase 6 components are implemented and marked `[-]` awaiting review in task-list.md. Alert and StatusMessage preceded this 15-component batch. No item is approved, no dependencies were added, and this batch has not been committed or pushed.

## Message variants and field feedback

InfoMessage, SuccessMessage, WarningMessage and ErrorMessage use StatusMessage without exposing a severity prop. Each accepts children and native div attributes/ref, plus `announcement="polite" | "assertive" | "off"` (polite by default). Text, icon shape and a visible severity label distinguish states without relying on color. There is no animation, dismissal or card surface.

ValidationMessage adds required `id` and `state="error" | "success" | "warning" | "info"` (error default). The caller owns validation and field association:

```tsx
<TextInput aria-invalid={invalid} aria-describedby="name-feedback" />
<ValidationMessage id="name-feedback" state={invalid ? "error" : "success"}>
  {invalid ? "Use at least two characters." : "Ready to save."}
</ValidationMessage>
```

Do not use assertive announcements on every keystroke. For more reliable live updates, keep the message region mounted before changing its content. Actual announcements need testing with your assistive technology.

## Dots and badges

- NotificationDot: `visible=true`, `decorative=false`, `label="Unread activity"`. It is a named image unless decorative; no tab stop or live announcement. Set decorative when the surrounding control already communicates the same information.
- NotificationBadge: optional `count`, `max=99`, `showZero=false`, and `label`. Counts are floored and clamped to zero; non-finite values become zero. Display caps at max+, but the accessible name retains the full count. With no count it displays label (default New). With a count, label describes what is counted, e.g. label="unread messages". Override aria-label for custom grammar. Native span attributes/ref are supported. Neither component is a button.

## Persistent banner and state views

NotificationBanner accepts Alert props plus `open=true`, optional `onDismiss()`, `dismissLabel`, and an `action` slot. Dismiss merely requests closure: the parent must set open=false. Controls sit outside the live announcement. There is no timeout or fixed placement.

EmptyState, ErrorState and SuccessState accept optional React `title`, children, `action`, native div attributes/ref and announcement mode (off by default). Defaults are Nothing here yet, Something went wrong, and All done. They share a centered BasicCard and pixel icon. Actions are caller-owned; no retry/navigation happens automatically. Supply a heading element through title if a semantic heading is needed.

## Toast, Snackbar, and UndoNotification

Toast requires `open` and `onDismiss(reason)`, where reason is timeout, dismiss or escape. It accepts Alert content/severity/announcement props, optional action, dismissLabel, and `duration` in milliseconds. Native attributes target the inner Alert; ref, className and focus/mouse/key handlers target the outer notification. There is no portal, global stack or fixed positioning; place it in your application layout.

- Default duration: 5000ms without an action; 0 (persistent) with an action. Negative or non-finite durations also mean persistent; positive durations cap at the platform timeout maximum (2147483647ms).
- Hover, keyboard focus within the notification and a hidden document independently pause the remaining time. Resume only when all pause reasons clear. Changing duration resets the timer; changing text does not. Close then reopen (or use a new React key) for a new message session.
- Dismiss and Escape inside the notification request closure once per session. Escape is not a global shortcut. The caller must update open. Timers clean up on unmount.
- If dismissal occurs while focus is inside the notification, focus returns to the connected element that was active when it opened. No focus is moved on opening. The application remains responsible when it removes the opener or dismisses via its own action.
- Entrance is a 140ms fade/4px rise; reduced motion removes it. Closing is immediate. Use duration=0 for important information, especially when it is not available elsewhere.

Snackbar reuses Toast with more compact padding. Action-bearing snackbars persist by default.

UndoNotification adds required `onUndo()`, optional `onExpire()`, `undoLabel="Undo"`, and an onDismiss reason that also permits undo. Default duration is 10000 active milliseconds, with the same pause rules; duration=0 disables expiry. Undo and expiry are guarded to fire once per open session. Undo becomes unavailable after handling; the caller must close the notification. Only timeout calls onExpire; manual dismissal does not. This is a UI undo window, not a business transaction deadline: no data is deleted/restored, and callbacks must implement and validate any real undo operation. If asynchronous undo is needed, manage its progress/error separately. Callback exceptions are not swallowed.

```tsx
<Toast open={savedNotice} onDismiss={() => setSavedNotice(false)} severity="success">
  Notes saved.
</Toast>
<UndoNotification open={undoOpen} onUndo={restoreItem}
  onExpire={endUndoWindow} onDismiss={() => setUndoOpen(false)}>
  Item removed.
</UndoNotification>
```

## ProgressNotification

Persistent NotificationSurface followed by a progress indicator. Accepts `open=true`, optional value, max=100, progressLabel="Progress", Alert props, optional onDismiss/dismissLabel and action. Undefined value selects IndeterminateProgressBar; supplied value uses ProgressBar normalization and percentage. Controls and progress are outside the message live region. Announcements default off to avoid speaking each numeric update; the named progress indicator remains accessible. No timer, transfer, cancellation or automatic dismissal at 100%. Native div props/ref target the Alert surface; className targets the outer layout.

## Verification and review

Run `npm run build`, `npm run lint`, `node scripts/check-feedback-states.mjs`, `node scripts/check-alert.mjs`, and `node scripts/check-status-message.mjs` using the installed toolchain.

The batch suite covers rendering of all 15 components, severity/announcement composition, badge normalization, callback wiring, hidden states, known/unknown progress, and fake-clock expiry/pause/resume/cancellation. Browser checks exercise validation, dismissals, actions, undo and keyboard behavior. Reduced-motion and hidden-tab handling have source/fake-clock checks; do not treat these as screen-reader or OS preference emulation tests.

Review at the playground sections from `#info-message-demo` through `#progress-notification-demo`. Inspect narrow layouts/RTL, all severity colors, focus visibility, persistent actions, timeout pause, undo expiry, and screen-reader announcements. Screenshot samples, if captured, belong in the workspace-root samples folder; local handoffs use preview links without embedded pictures.

Verified in the browser: field validation text/aria-invalid updates; keyboard banner dismissal and snackbar action; undo and expiry callbacks; toast expiry, focus-paused timer, Escape dismissal and focus return; retry callback; progress value update. All 15 new sections fit the observed viewport without horizontal overflow. Samples saved in `../samples/feedback-banner-preview.png`, `../samples/feedback-states-preview.png`, and `../samples/feedback-toast-preview.png`. Pointer/hover behavior, additional viewport sizes, OS reduced-motion settings and screen-reader output remain review targets; the automated timer tests cover overlapping pause reasons independently.
