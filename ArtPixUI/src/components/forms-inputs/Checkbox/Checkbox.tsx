import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "./Checkbox.css";

export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "children"> & {
  /** Mixed visual state, independent of checked and form submission. */
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { indeterminate = false, className, ...props }, ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate, props.checked]);

  return <input {...props} ref={inputRef} type="checkbox" className={["art-pix-checkbox", className].filter(Boolean).join(" ")} />;
});
