import { safeCount } from "../_shared/model.js";
import "../_shared/search.css";
export type ResultsCountProps = { count: number; total?: number; singular?: string; plural?: string; announcement?: "polite" | "off"; loading?: boolean };
export function ResultsCount({ count, total, singular = "result", plural = "results", announcement = "polite", loading }: ResultsCountProps) {
 const n = safeCount(count); const whole = total === undefined ? undefined : Math.max(n, safeCount(total));
 return <span className="art-pix-search-muted" role={announcement === "polite" ? "status" : undefined} aria-live={announcement} aria-atomic="true">{loading ? "Searching…" : `${n}${whole === undefined ? "" : ` of ${whole}`} ${(whole ?? n) === 1 ? singular : plural}`}</span>;
}
