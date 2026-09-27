import { useId, type ReactNode } from "react";
import { BasicCard, type BasicCardProps } from "../BasicCard/BasicCard.js";
import { Image } from "../../media/Image/Image.js";
import "./cards.css";

export type CardContentProps = Omit<BasicCardProps, "title" | "children" | "role" | "aria-label" | "aria-labelledby" | "dangerouslySetInnerHTML"> & {
  title: ReactNode;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  eyebrow?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
};

/** Content-only card: no implicit click target or nested interactive wrapper. */
export function CardFrame({ title, headingLevel = 3, eyebrow, badge, children, actions, footer, className = "", leading, identity, ...props }: CardContentProps & { leading?: ReactNode; identity?: ReactNode }) {
  const id = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";
  return <BasicCard {...props} role="article" aria-labelledby={id} className={`art-pix-special-card ${className}`}>
    {leading != null && <div className="art-pix-special-card__leading">{leading}</div>}
    <div className="art-pix-special-card__header">
      {identity}
      <div className="art-pix-special-card__heading-group">
        {eyebrow != null && <div className="art-pix-special-card__eyebrow">{eyebrow}</div>}
        <Heading className="art-pix-special-card__title" id={id}>{title}</Heading>
      </div>
      {badge != null && <div className="art-pix-special-card__badge">{badge}</div>}
    </div>
    {children != null && <div className="art-pix-special-card__body">{children}</div>}
    {actions != null && <div className="art-pix-special-card__actions">{actions}</div>}
    {footer != null && <div className="art-pix-special-card__footer">{footer}</div>}
  </BasicCard>;
}

export type CardMediaProps = { media?: ReactNode; img?: string; imgAlt?: string };
export function CardMedia({ media, img, imgAlt = "" }: CardMediaProps) {
  if (media !== undefined) return <>{media}</>;
  return <Image src={img} alt={imgAlt} aspectRatio="16 / 9" fallbackText="Preview unavailable" />;
}
