import { MenuTrigger, type MenuProps } from "../_shared/menu.js";
export type ActionMenuProps = MenuProps;
export function ActionMenu({ label = "Actions", ...props }: ActionMenuProps) { return <MenuTrigger {...props} label={label} />; }
