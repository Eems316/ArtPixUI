import { DialogCore, type DialogProps } from "../_shared/dialog.js";
export type AlertDialogProps = Omit<DialogProps, "role" | "closeOnBackdrop">;
export function AlertDialog({ closeLabel = "Understood", ...props }: AlertDialogProps) { return <DialogCore {...props} closeLabel={closeLabel} role="alertdialog" closeOnBackdrop={false} />; }
