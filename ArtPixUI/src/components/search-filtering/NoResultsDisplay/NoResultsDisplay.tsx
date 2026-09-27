import { EmptyState, type EmptyStateProps } from "../../feedback-notifications/EmptyState/EmptyState.js";
import { Button } from "../../buttons-actions/Button/Button.js";
export type NoResultsDisplayProps = EmptyStateProps & { query?: string; onClear?: () => void };
export function NoResultsDisplay({ query, onClear, title = "No results found", children, action, ...props }: NoResultsDisplayProps) {
 return <EmptyState {...props} title={title} action={action ?? (onClear && <Button variant="secondary" onClick={onClear}>Clear search and filters</Button>)}>{children ?? (query ? `Nothing matched “${query}”. Try another search or fewer filters.` : "Try another search or fewer filters.")}</EmptyState>;
}
