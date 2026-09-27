import { CheckboxFilter, type CheckboxFilterProps } from "../CheckboxFilter/CheckboxFilter.js";
export type CategoryFilterProps = Omit<CheckboxFilterProps, "label"> & { label?: string };
export function CategoryFilter({ label = "Categories", ...props }: CategoryFilterProps) { return <CheckboxFilter {...props} label={label} />; }
