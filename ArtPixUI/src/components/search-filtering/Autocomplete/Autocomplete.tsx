import { ComboBoxPopup, type ComboBoxPopupProps } from "../../overlays-menus/ComboBoxPopup/ComboBoxPopup.js";
import { matchesQuery } from "../_shared/model.js";
import "../_shared/search.css";
export type AutocompleteProps = ComboBoxPopupProps & { filterOptions?: boolean };
/** Local case-insensitive matching by default; disable it for externally filtered data. */
export function Autocomplete({ filterOptions = true, options, value, ...props }: AutocompleteProps) {
 return <div className="art-pix-search-stack"><ComboBoxPopup {...props} value={value} options={filterOptions ? options.filter(option => matchesQuery(option.label, value)) : options} /></div>;
}
