import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Action.css";

type NativeActionProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  link?: undefined;
  children: ReactNode;
};

type LinkActionProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "children"> & {
  link: string;
  children: ReactNode;
  disabled?: boolean;
};

export type ActionProps = NativeActionProps | LinkActionProps;

/** Implementation shared by the two public action components. */
export function Action(props: ActionProps) {
  if (props.link !== undefined) {
    const { link, children, className, disabled, onClick, tabIndex, target, rel, ...rest } = props;

    return (
      <a
        {...rest}
        className={["art-pix-action", className].filter(Boolean).join(" ")}
        href={disabled ? undefined : link}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        role={disabled ? "link" : rest.role}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  }

  const { link: _link, children, className, type = "button", ...rest } = props;

  return (
    <button
      {...rest}
      type={type}
      className={["art-pix-action", className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
