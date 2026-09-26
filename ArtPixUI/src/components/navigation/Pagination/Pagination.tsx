import type { ComponentPropsWithRef } from "react";
import { Button } from "../../buttons-actions/Button/index.js";
import "./Pagination.css";

export type PaginationProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

function pageRange(page: number, total: number): (number | string)[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const start = page <= 4 ? 2 : page >= total - 3 ? total - 4 : page - 1;
  const end = page <= 4 ? 5 : page >= total - 3 ? total - 1 : page + 1;
  const result: (number | string)[] = [1];
  if (start > 2) result.push("start-gap");
  for (let value = start; value <= end; value++) result.push(value);
  if (end < total - 1) result.push("end-gap");
  result.push(total);
  return result;
}

/** One-based controlled paging; the caller owns data fetching and page content. */
export function Pagination({ page, totalPages, onPageChange, disabled = false, className, "aria-label": label,
  "aria-labelledby": labelledBy, ...props }: PaginationProps) {
  const total = Number.isFinite(totalPages) ? Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, Math.floor(totalPages))) : 0;
  const current = Number.isFinite(page) ? Math.max(1, Math.min(total, Math.floor(page))) : 1;
  if (total === 0) return null;
  const requestPage = (next: number) => { if (!disabled && next !== current) onPageChange(next); };
  return <nav {...props} aria-label={label ?? (labelledBy ? undefined : "Pagination")} aria-labelledby={labelledBy}
    className={["art-pix-pagination", className].filter(Boolean).join(" ")}>
    <ul className="art-pix-pagination__items" role="list">
      <li><Button className="art-pix-pagination__button" variant="secondary" disabled={disabled || current === 1} aria-label="Previous page" onClick={() => requestPage(current - 1)}>Previous</Button></li>
      {pageRange(current, total).map(value => <li key={value}>
        {typeof value === "number" ? <Button className="art-pix-pagination__button" variant={value === current ? "primary" : "secondary"}
          aria-label={`Page ${value}`} aria-current={value === current ? "page" : undefined} disabled={disabled} onClick={() => requestPage(value)}>{value}</Button>
          : <span className="art-pix-pagination__ellipsis" aria-hidden="true">…</span>}
      </li>)}
      <li><Button className="art-pix-pagination__button" variant="secondary" disabled={disabled || current === total} aria-label="Next page" onClick={() => requestPage(current + 1)}>Next</Button></li>
    </ul>
  </nav>;
}
