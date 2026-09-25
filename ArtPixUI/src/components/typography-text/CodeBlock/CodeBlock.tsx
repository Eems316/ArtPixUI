import type { ComponentPropsWithoutRef } from "react";
import "./CodeBlock.css";

export type CodeBlockProps = Omit<ComponentPropsWithoutRef<"pre">, "children"> & {
  /** Plain text, rendered without interpreting markup. */
  children: string;
  /** Display label only; does not enable syntax highlighting. */
  language?: string;
  /** Wrap long lines instead of scrolling horizontally. */
  wrap?: boolean;
};

export function CodeBlock({ children, language, wrap = false, className, tabIndex = 0, ...props }: CodeBlockProps) {
  return (
    <div className={["art-pix-code-block", wrap && "art-pix-code-block--wrap", className].filter(Boolean).join(" ")}>
      {language && <div className="art-pix-code-block__language">{language}</div>}
      <pre {...props} tabIndex={tabIndex} className="art-pix-code-block__pre"><code>{children}</code></pre>
    </div>
  );
}
