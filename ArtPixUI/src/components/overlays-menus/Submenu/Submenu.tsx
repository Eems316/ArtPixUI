import { useId } from "react";
import { NestedItem, type MenuProps } from "../_shared/menu.js";
export type SubmenuProps = MenuProps & { onSelectComplete?: () => void };
/** Place inside a menu. DropdownMenu also supports nested item.children. */
export function Submenu({ label, items, disabled, onSelectComplete = () => {} }: SubmenuProps) {
 const id = useId();
 return <NestedItem item={{ id, label, disabled, children: items }} tabIndex={0} onExit={onSelectComplete} />;
}
