import { EmptyState } from "../../feedback-notifications/EmptyState/EmptyState.js";
export type ChartEmptyStateProps = {
    title?: string;
    message?: string;
};
export function ChartEmptyState({ title = "No chart data", message = "Supply finite values to display this chart." }: ChartEmptyStateProps) { return <EmptyState title={title}>{message}</EmptyState>; }
