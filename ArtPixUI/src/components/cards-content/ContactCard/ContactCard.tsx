import { useId, useRef, useState, type ComponentPropsWithoutRef } from "react";
import "./ContactCard.css";

export type ContactCardProps = Omit<ComponentPropsWithoutRef<"article">, "title"> & {
  title: string;
  name: string;
  img?: string;
  imgAlt?: string;
  phone?: string;
  email?: string;
};

function ContactIcon({ kind }: { kind: "phone" | "email" }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      {kind === "phone" ? (
        <path d="M2 1h4v4H5v2h2v2h2v2h2v-1h4v4h-2v1H9v-2H7v-2H5V9H3V7H1V3h1z" />
      ) : (
        <path fillRule="evenodd" d="M1 3h14v10H1zm2 2v1h2v2h2v2h2V8h2V6h2V5H3zm0 3v3h10V8h-2v2H9v1H7v-1H5V8z" />
      )}
    </svg>
  );
}

function AvatarPlaceholder() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      <path fill="var(--art-pix-color-primary)" d="M8 4h8v2h2v8h-2v2H8v-2H6V6h2zM6 18h12v2h2v4H4v-4h2z" />
      <path fill="var(--art-pix-color-on-primary)" d="M8 9h2v2H8zm6 0h2v2h-2zm-4 4h4v2h-4z" />
    </svg>
  );
}

/** Hover to preview; click or press Enter/Space to pin the details open. */
export function ContactCard({
  title, name, img, imgAlt, phone, email, children, className,
  onPointerEnter, onPointerLeave, onFocusCapture, onBlurCapture, onKeyDown,
  ...props
}: ContactCardProps) {
  const detailsId = useId();
  const nameId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const details = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [detailsFocused, setDetailsFocused] = useState(false);
  const [failedImg, setFailedImg] = useState<string>();
  const expanded = pinned || detailsFocused || (hovered && !dismissed);

  function toggle() {
    setPinned(!pinned);
    setDismissed(pinned);
    setDetailsFocused(false);
  }

  return (
    <article
      {...props}
      aria-labelledby={props["aria-labelledby"] ?? nameId}
      className={["art-pix-contact-card", className].filter(Boolean).join(" ")}
      data-expanded={expanded}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (!event.defaultPrevented && event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (!event.defaultPrevented) {
          setHovered(false);
          setDismissed(false);
        }
      }}
      onFocusCapture={(event) => {
        onFocusCapture?.(event);
        if (!event.defaultPrevented && details.current?.contains(event.target)) setDetailsFocused(true);
      }}
      onBlurCapture={(event) => {
        onBlurCapture?.(event);
        if (!event.defaultPrevented && !details.current?.contains(event.relatedTarget)) setDetailsFocused(false);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && event.key === "Escape" && expanded) {
          event.preventDefault();
          event.stopPropagation();
          trigger.current?.focus();
          setPinned(false);
          setDetailsFocused(false);
          setDismissed(true);
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="art-pix-contact-card__summary"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={toggle}
      >
        <span className="art-pix-contact-card__topline">
          <span className="art-pix-contact-card__title">{title}</span>
        </span>
        <span className="art-pix-contact-card__identity">
          <span id={nameId} className="art-pix-contact-card__name">{name}</span>
          <span className="art-pix-contact-card__avatar">
            {img && img !== failedImg ? (
              <img src={img} alt={imgAlt ?? ""} width="48" height="48" onError={() => setFailedImg(img)} />
            ) : <AvatarPlaceholder />}
          </span>
        </span>
      </button>

      <div ref={details} id={detailsId} hidden={!expanded} className="art-pix-contact-card__details">
        {(phone || email) && (
          <address className="art-pix-contact-card__contact">
            {phone && (
              <a className="art-pix-contact-card__contact-link" href={`tel:${phone.replace(/[^\d+*#,;]/g, "")}`}>
                <span className="art-pix-contact-card__contact-icon"><ContactIcon kind="phone" /></span>
                <span><span className="art-pix-contact-card__field">Phone</span>{phone}</span>
              </a>
            )}
            {email && (
              <a className="art-pix-contact-card__contact-link" href={`mailto:${email}`}>
                <span className="art-pix-contact-card__contact-icon"><ContactIcon kind="email" /></span>
                <span><span className="art-pix-contact-card__field">Email</span>{email}</span>
              </a>
            )}
          </address>
        )}
        {children != null && <div className="art-pix-contact-card__extra">{children}</div>}
      </div>
    </article>
  );
}
