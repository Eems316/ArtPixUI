import type { ComponentPropsWithRef } from "react";
import "./ProgressSteps.css";

export type ProgressStepsItem = {
  id: string;
  label: string;
  description?: string;
};

export type ProgressStepsProps = Omit<ComponentPropsWithRef<"ol">, "children" | "start" | "reversed" | "type" | "role"> & {
  steps: readonly ProgressStepsItem[];
  /** One-based current position. steps.length + 1 marks every step completed. */
  currentStep?: number;
};

/** Display-only steps; navigation and progression belong to the caller. */
export function ProgressSteps({ steps, currentStep = 1, className, "aria-label": ariaLabel = "Progress steps", ...props }: ProgressStepsProps) {
  const position = Number.isFinite(currentStep)
    ? Math.min(steps.length + 1, Math.max(1, Math.floor(currentStep))) : 1;
  if (steps.length === 0) return null;

  return <ol {...props} role="list" aria-label={ariaLabel}
    className={["art-pix-progress-steps", className].filter(Boolean).join(" ")}>
    {steps.map((step, index) => {
      const state = index + 1 < position ? "completed" : index + 1 === position ? "current" : "upcoming";
      return <li key={step.id} className={`art-pix-progress-steps__item art-pix-progress-steps__item--${state}`}
        aria-current={state === "current" ? "step" : undefined}>
        <span className="art-pix-progress-steps__marker" aria-hidden="true">{index + 1}</span>
        <div className="art-pix-progress-steps__content">
          <span className="art-pix-progress-steps__label">{step.label}</span>
          <span className="art-pix-progress-steps__status">{state === "completed" ? "Completed" : state === "current" ? "Current step" : "Upcoming"}</span>
          {step.description && <span className="art-pix-progress-steps__description">{step.description}</span>}
        </div>
      </li>;
    })}
  </ol>;
}
