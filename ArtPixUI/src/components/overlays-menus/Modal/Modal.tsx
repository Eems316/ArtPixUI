import { DialogCore, type DialogProps } from "../_shared/dialog.js";
export type ModalProps = DialogProps;
export function Modal(props: ModalProps) { return <DialogCore {...props} />; }
