import { useEffect, useId, useRef, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import "./FaqAccordion.css";

export type FaqAccordionItem = { id: string; question: string; answer: ReactNode };
export type FaqAccordionProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  items: readonly FaqAccordionItem[];
  singleOpen?: boolean;
  openIds?: readonly string[];
  defaultOpenIds?: readonly string[];
  onOpenChange?: (ids: string[]) => void;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

function FaqItem({ item, open, toggle, prefix, headingLevel }: {
  item: FaqAccordionItem; open: boolean; toggle: () => void; prefix: string; headingLevel: 2 | 3 | 4 | 5 | 6;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";
  const buttonId = `${prefix}-${encodeURIComponent(item.id)}-question`;
  const panelId = `${prefix}-${encodeURIComponent(item.id)}-answer`;
  useEffect(() => {
    if (!open && panelRef.current?.contains(document.activeElement)) buttonRef.current?.focus();
  }, [open]);
  return <div className="art-pix-faq-accordion__item">
    <Heading className="art-pix-faq-accordion__heading">
      <button ref={buttonRef} id={buttonId} type="button" className="art-pix-faq-accordion__trigger" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
        <span>{item.question}</span><span className="art-pix-faq-accordion__indicator" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
    </Heading>
    <div ref={panelRef} id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!open} inert={!open}
      className={["art-pix-faq-accordion__panel", open && "art-pix-faq-accordion__panel--open"].filter(Boolean).join(" ")}>
      <div className="art-pix-faq-accordion__clip"><div className="art-pix-faq-accordion__answer">{item.answer}</div></div>
    </div>
  </div>;
}

export function FaqAccordion({ items, singleOpen = false, openIds, defaultOpenIds = [], onOpenChange, headingLevel = 3, className, ...props }: FaqAccordionProps) {
  const prefix = useId();
  const [internalIds, setInternalIds] = useState<readonly string[]>(defaultOpenIds);
  const existingIds = new Set(items.map(item => item.id));
  const selected = [...new Set(openIds ?? internalIds)].filter(id => existingIds.has(id));
  const effectiveIds = singleOpen ? selected.slice(0, 1) : selected;
  const toggle = (id: string) => {
    const next = effectiveIds.includes(id) ? effectiveIds.filter(value => value !== id) : singleOpen ? [id] : [...effectiveIds, id];
    if (openIds === undefined) setInternalIds(next);
    onOpenChange?.(next);
  };
  return <div {...props} className={["art-pix-faq-accordion", className].filter(Boolean).join(" ")}>
    {items.map(item => <FaqItem key={item.id} item={item} prefix={prefix} headingLevel={headingLevel} open={effectiveIds.includes(item.id)} toggle={() => toggle(item.id)} />)}
  </div>;
}
