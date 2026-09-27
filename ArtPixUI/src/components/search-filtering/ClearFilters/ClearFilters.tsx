import { Button } from "../../buttons-actions/Button/Button.js";
import type { ReactNode } from "react";
export type ClearFiltersProps = { onClear: () => void; disabled?: boolean; activeCount?: number; children?: ReactNode };
export function ClearFilters({ onClear, disabled, activeCount, children = "Clear filters" }: ClearFiltersProps) {
 return <Button variant="secondary" disabled={disabled || (activeCount !== undefined && (!Number.isFinite(activeCount) || activeCount <= 0))} onClick={onClear}>{children}</Button>;
}
