import type { ComponentPropsWithRef } from "react";
import "./List.css";

export type ListProps = (
  | ({ ordered?: false } & ComponentPropsWithRef<"ul">)
  | ({ ordered: true } & ComponentPropsWithRef<"ol">)
) & {
  /** Reduce direct-item spacing from 12px to 4px. */
  compact?: boolean;
};

/** Supply native li children, including nested lists inside an li. */
export function List(props: ListProps) {
  const className = ["art-pix-list", props.compact && "art-pix-list--compact", props.className].filter(Boolean).join(" ");
  if (props.ordered) {
    const { ordered: _ordered, compact: _compact, ...rest } = props;
    return <ol {...rest} className={className} />;
  }
  const { ordered: _ordered, compact: _compact, ...rest } = props;
  return <ul {...rest} className={className} />;
}
