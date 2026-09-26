import type { ComponentPropsWithRef, ReactNode } from "react";
import "./KeyValueDisplay.css";

export type KeyValueDisplayItem = {
  /** Unique, stable identifier within this display. */
  id: string;
  label: ReactNode;
  value: ReactNode;
};

export type KeyValueDisplayProps = Omit<ComponentPropsWithRef<"dl">, "children"> & {
  items: readonly KeyValueDisplayItem[];
};

/** Native description-list semantics with container-responsive rows. */
export function KeyValueDisplay({ items, className, ...props }: KeyValueDisplayProps) {
  return <dl {...props} className={["art-pix-key-value-display", className].filter(Boolean).join(" ")}>
    {items.map(({ id, label, value }) => <div key={id} className="art-pix-key-value-display__row">
      <dt className="art-pix-key-value-display__label">{label}</dt>
      <dd className="art-pix-key-value-display__value">{value}</dd>
    </div>)}
  </dl>;
}
