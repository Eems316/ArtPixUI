import { ConfirmationDialog, type ConfirmationDialogProps } from "../ConfirmationDialog/ConfirmationDialog.js";
export type DestructiveConfirmationProps = Omit<ConfirmationDialogProps, "destructive">;
export function DestructiveConfirmation({ confirmLabel = "Delete", ...props }: DestructiveConfirmationProps) { return <ConfirmationDialog {...props} confirmLabel={confirmLabel} destructive />; }
