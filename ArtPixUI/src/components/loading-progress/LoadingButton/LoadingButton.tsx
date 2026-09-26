import { Button, type ButtonProps } from "../../buttons-actions/Button/Button.js";
import { SpinnerStatus } from "../SpinnerStatus/SpinnerStatus.js";
import "./LoadingButton.css";

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
  loadingText?: string;
};

/** Controlled busy action; does not start or complete asynchronous work itself. */
export function LoadingButton({ loading = false, loadingText, disabled, children, className, ...props }: LoadingButtonProps) {
  return <Button {...props} disabled={loading || disabled} aria-busy={loading}
    className={["art-pix-loading-button", className].filter(Boolean).join(" ")}>
    {loading && <SpinnerStatus size="small" label="" role="presentation" aria-live="off" aria-hidden="true" className="art-pix-loading-button__spinner" />}
    <span className="art-pix-loading-button__text">{loading ? loadingText ?? children : children}</span>
  </Button>;
}
