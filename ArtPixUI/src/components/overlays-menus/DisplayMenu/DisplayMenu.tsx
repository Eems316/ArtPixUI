import { MenuTrigger } from "../_shared/menu.js";
export type DisplayMenuProps = { label?: string; options: { id: string; label: string; checked: boolean; disabled?: boolean }[]; onCheckedChange: (id: string, checked: boolean) => void; };
export function DisplayMenu({ label = "Display options", options, onCheckedChange }: DisplayMenuProps) {
 return <MenuTrigger label={label} items={options.map(option => ({ ...option, onSelect: () => onCheckedChange(option.id, !option.checked) }))} />;
}
