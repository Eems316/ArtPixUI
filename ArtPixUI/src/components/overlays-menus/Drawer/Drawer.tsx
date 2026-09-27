import { DialogCore, type DialogProps } from "../_shared/dialog.js";
export type DrawerProps = DialogProps & { side?: "left" | "right" };
export function Drawer({ side = "right", className = "", ...props }: DrawerProps) { return <DialogCore {...props} side={side} className={`art-pix-drawer ${className}`} />; }
