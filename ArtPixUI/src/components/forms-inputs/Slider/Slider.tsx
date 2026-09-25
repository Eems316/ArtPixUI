import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "./Slider.css";

export type SliderProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "children" | "value" | "defaultValue"> & {
  value?: number;
  defaultValue?: number;
};

function updateFill(input: HTMLInputElement) {
  const min = input.min === "" ? 0 : Number(input.min);
  const max = input.max === "" ? 100 : Number(input.max);
  const percentage = max > min ? (input.valueAsNumber - min) / (max - min) * 100 : 0;
  input.style.setProperty("--art-pix-slider-fill", `${Math.max(0, Math.min(100, percentage || 0))}%`);
}

/** Native range input; the browser owns clamping, stepping, and keyboard behavior. */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, onInput, onChange, ...props }, ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    updateFill(input);
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    // Reset's default action runs after event dispatch, including microtasks.
    const reset = () => { clearTimeout(resetTimer); resetTimer = setTimeout(() => updateFill(input), 0); };
    const form = input.form;
    form?.addEventListener("reset", reset);
    return () => { form?.removeEventListener("reset", reset); clearTimeout(resetTimer); };
  });

  return <input {...props} ref={inputRef} type="range"
    className={["art-pix-slider", className].filter(Boolean).join(" ")}
    onInput={event => { updateFill(event.currentTarget); onInput?.(event); }}
    onChange={event => {
      const input = event.currentTarget;
      onChange?.(event);
      // Read after React restores a controlled value, including rejected edits.
      queueMicrotask(() => updateFill(input));
    }} />;
});
