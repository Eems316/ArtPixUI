import { DialogCore, type DialogProps } from "../_shared/dialog.js";
export type SheetProps = DialogProps & { position?: "center" | "bottom" };
export function Sheet({ position = "center", className = "", ...props }: SheetProps) { return <DialogCore {...props} className={`art-pix-sheet ${position === "bottom" ? "art-pix-bottom-sheet" : ""} ${className}`} />; }
