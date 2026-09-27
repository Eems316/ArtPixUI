import { TextInput, type TextInputProps } from "../../forms-inputs/TextInput/TextInput.js";
import "../_shared/search.css";
export type SearchInputProps = Omit<TextInputProps, "type">;
/** Supply an external label or aria-label, just as for TextInput. */
export function SearchInput({ className = "", ...props }: SearchInputProps) {
 return <div className="art-pix-search-field"><svg className="art-pix-search-mark" viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="currentColor" shapeRendering="crispEdges"><path fillRule="evenodd" d="M2 1h7v2h2v7H9v2H2v-2H0V3h2zm1 2v7h5V3zm7 8h2v2h2v2h-3v-2H9v-2z" /></svg><TextInput {...props} type="search" className={`art-pix-search-input ${className}`} /></div>;
}
