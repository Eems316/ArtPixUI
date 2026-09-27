import { DropdownMenu } from "../../overlays-menus/DropdownMenu/DropdownMenu.js";
import { toggleChoice, type FilterOption } from "../_shared/model.js";
export type FilterMenuProps = { label: string; options: FilterOption[]; value: string[]; onChange: (value: string[]) => void; disabled?: boolean };
export function FilterMenu({ label, options, value, onChange, disabled }: FilterMenuProps) {
 return <DropdownMenu label={label} disabled={disabled || !options.length} items={options.map(option => ({ ...option, checked: value.includes(option.id), onSelect: () => onChange(toggleChoice(value, option.id, !value.includes(option.id))) }))} />;
}
