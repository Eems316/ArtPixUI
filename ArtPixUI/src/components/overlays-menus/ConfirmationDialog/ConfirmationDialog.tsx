import { DialogCore, type DialogProps } from "../_shared/dialog.js";
export type ConfirmationDialogProps = Omit<DialogProps, "role" | "closeOnBackdrop" | "initialFocus"> & { onConfirm: () => void; confirmLabel?: string; busy?: boolean; destructive?: boolean };
export function ConfirmationDialog({ onConfirm, confirmLabel = "Confirm", closeLabel = "Cancel", busy = false, destructive = false, children, ...props }: ConfirmationDialogProps) {
 return <DialogCore {...props} hideClose role="alertdialog" closeOnBackdrop={false} initialFocus="[data-cancel]" closeOnEscape={!busy && (props.closeOnEscape ?? true)} onOpenChange={value => { if (!busy) props.onOpenChange(value); }}>
  {children}
  <div className="art-pix-overlay-actions"><button type="button" data-cancel className="art-pix-overlay-trigger" disabled={busy} onClick={() => props.onOpenChange(false)}>{closeLabel}</button><button type="button" aria-busy={busy || undefined} disabled={busy} className={`art-pix-overlay-trigger ${destructive ? "art-pix-overlay-danger" : ""}`} onClick={onConfirm}>{busy ? "Working…" : confirmLabel}</button></div>
 </DialogCore>;
}
