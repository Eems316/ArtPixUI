import { SkeletonLoader } from "../../loading-progress/SkeletonLoader/SkeletonLoader.js";
export type ChartLoadingStateProps = {
    label?: string;
};
export function ChartLoadingState({ label = "Loading chart" }: ChartLoadingStateProps) { return <div role="status" aria-busy="true"><span>{label}</span><SkeletonLoader width="100%" height={200}/></div>; }
