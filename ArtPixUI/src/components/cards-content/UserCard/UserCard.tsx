import { CardFrame, type CardContentProps } from "../_shared/CardFrame.js";
import { Avatar } from "../../media/Avatar/Avatar.js";
import type { ReactNode } from "react";
export type UserCardProps = Omit<CardContentProps, "title"> & { name: string; subtitle?: ReactNode; img?: string; avatar?: ReactNode };
export function UserCard({ name, subtitle, img, avatar, children, className = "", ...props }: UserCardProps) {
  return <CardFrame {...props} title={name} className={`art-pix-user-card ${className}`} identity={avatar ?? <Avatar name={name} src={img} alt="" />}>
    {subtitle != null && <div className="art-pix-special-card__muted">{subtitle}</div>}{children}
  </CardFrame>;
}
