import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "./FileUpload.css";

export type FileUploadProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "value" | "defaultValue" | "children">;

/** Selects local files only. Uploading and validation belong to the consumer. */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  { className, onChange, ...props }, ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [names, setNames] = useState<string[]>([]);
  useImperativeHandle(ref, () => inputRef.current!, []);
  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setNames(Array.from(input?.files ?? [], file => file.name)), 0);
    };
    form?.addEventListener("reset", reset);
    return () => { form?.removeEventListener("reset", reset); clearTimeout(timer); };
  }, [props.form]);

  return (
    <div className="art-pix-file-upload">
      <input {...props} ref={inputRef} type="file"
        className={["art-pix-file-upload__input", className].filter(Boolean).join(" ")}
        onChange={event => {
          setNames(Array.from(event.currentTarget.files ?? [], file => file.name));
          onChange?.(event);
        }} />
      <div className="art-pix-file-upload__selection" role="status" aria-atomic="true">
        {names.length > 0 && <ul aria-label="Selected files">{names.map((name, index) => <li key={`${index}-${name}`}>{name}</li>)}</ul>}
      </div>
    </div>
  );
});
