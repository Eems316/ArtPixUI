# Search, filtering, and sorting — awaiting review

All 25 phase 8 components are implemented and marked `[-]`, not `[x]`. The user authorized the entire phase without per-item approval. Earlier review statuses are unchanged. No dependencies, automatic network calls, global keyboard shortcuts, or hidden persistence were added. This batch has not been committed or pushed.

## Batch plan and design

1. Build SearchInput/SearchBar, standalone suggestions/history and a filtered ComboBoxPopup composition.
2. Build CommandMenu in its canonical overlays-menus folder and CommandSearch as its launcher.
3. Build native checkbox/radio/range/rating/category/sort controls with controlled values.
4. Add counts, clearing, no-results recovery and removable chips.
5. Compose dropdown/menu/bar/panel/faceted filters and saved search configurations.
6. Export all public APIs; add exhibits 88–112, callback/semantics/model regression checks, and review notes.

The design follows Spritecraft's parchment palette, green highlights, pixel magnifier and monospaced details with Plinth's dark rounded outlines and tactile buttons. No new decorative animation is introduced. Popup/dialog/button motion reuses phase 7 and foundation behavior, including reduced-motion support. Search, command, numeric and saved-name fields retain the visible steady-caret preference; unsupported browsers retain a native visible caret.

## Preview index

The local preview server remains running in the existing session at port 5173. Refresh the playground to load this batch. If restarted, use `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` from `ArtPixUI/`.

| Component | Preview | Review target |
| --- | --- | --- |
| SearchInput | [Preview](http://127.0.0.1:5173/#search-input-demo) | Native clear/editing, label association, disabled/required states and narrow-width fit. |
| SearchBar | [Preview](http://127.0.0.1:5173/#search-bar-demo) | Enter/click submission, busy guard and query updates; avoid nesting it inside another form. |
| SearchSuggestions | [Preview](http://127.0.0.1:5173/#search-suggestions-demo) | Tab/Enter selection, long suggestions and callback output; not a duplicate listbox. |
| Autocomplete | [Preview](http://127.0.0.1:5173/#autocomplete-demo) | Typing, IME, arrows/Enter/Escape, visible active option and active-descendant announcement. |
| SearchHistory | [Preview](http://127.0.0.1:5173/#search-history-demo) | Empty history, duplicate queries, disabled actions and keyboard removal. |
| CommandMenu | [Preview](http://127.0.0.1:5173/#command-menu-demo) | Focus entry/return, Escape, composition input, empty matches and one callback per activation. |
| CommandSearch | [Preview](http://127.0.0.1:5173/#command-search-demo) | Open/close and execute a matching command; disabled launcher. |
| CheckboxFilter | [Preview](http://127.0.0.1:5173/#checkbox-filter-demo) | Select/deselect, preserved unrelated selections, zero-count and empty groups. |
| RadioFilter | [Preview](http://127.0.0.1:5173/#radio-filter-demo) | Arrow-key grouping, disabled/empty options and independent multiple instances. |
| RangeFilter | [Preview](http://127.0.0.1:5173/#range-filter-demo) | Boundary/crossing/decimal values, blank drafts and disabled fieldset. |
| RangeFilterSlider | [Preview](http://127.0.0.1:5173/#range-filter-slider-demo) | Keyboard and pointer adjustment of both sliders, constrained endpoints and values. |
| RatingFilter | [Preview](http://127.0.0.1:5173/#rating-filter-demo) | Any/reset and each threshold, arrow navigation, no unlabeled star-only controls. |
| CategoryFilter | [Preview](http://127.0.0.1:5173/#category-filter-demo) | Multi-category changes, disabled options and counts. |
| SortSelect | [Preview](http://127.0.0.1:5173/#sort-select-demo) | Native keyboard/mobile selection and invalid-value fallback. |
| SortDirectionToggle | [Preview](http://127.0.0.1:5173/#sort-direction-toggle-demo) | Both directions, pressed state and disabled behavior. |
| ResultsCount | [Preview](http://127.0.0.1:5173/#results-count-demo) | Zero/one/many, nonfinite inputs and loading; avoid redundant live regions in a consuming page. |
| ClearFilters | [Preview](http://127.0.0.1:5173/#clear-filters-demo) | Clears only caller-owned state via callback; no implicit data mutation. |
| NoResultsDisplay | [Preview](http://127.0.0.1:5173/#no-results-display-demo) | No-match wording, query escaping, recovery action and custom content. |
| FilterChips | [Preview](http://127.0.0.1:5173/#filter-chips-demo) | Keyboard removal through the last chip and long labels. |
| FilterDropdown | [Preview](http://127.0.0.1:5173/#filter-dropdown-demo) | Multiple filter changes without closing, viewport placement and focus return. |
| FilterMenu | [Preview](http://127.0.0.1:5173/#filter-menu-demo) | Checked states, disabled skipping, keyboard selection and reopen behavior. |
| FilterBar | [Preview](http://127.0.0.1:5173/#filter-bar-demo) | Wrapping at narrow widths, linked chip/count changes and clear action; child control disabled state is caller-owned. |
| FilterPanel | [Preview](http://127.0.0.1:5173/#filter-panel-demo) | Heading relationship, long content, optional description/actions and narrow layouts. |
| FacetedFilters | [Preview](http://127.0.0.1:5173/#faceted-filters-demo) | Cross-facet changes and counts; demo recomputes counts excluding each facet's own selection. |
| SavedSearch | [Preview](http://127.0.0.1:5173/#saved-search-demo) | Blank names, snapshot isolation, restore/remove, disabled state; demo is memory-only. |

## Public API and ownership

Import components/types from `art-pix-ui` and include `art-pix-ui/styles.css` once.

- **SearchInput:** native TextInput props except `type`, which is fixed to search; forwards `ref` to the input. Provide a visible external label with `htmlFor/id` or an accessible name. The decorative pixel icon never receives focus.
- **SearchBar:** `label`, `value`, `onValueChange`, `onSearch`; optional `placeholder`, `disabled`, `busy`, `submitLabel`, `children`, `className`. Submits the raw controlled query. Busy disables submission, not editing. It renders a form: do not nest it inside another form.
- **SearchSuggestions:** `suggestions` (`id/label/description?/disabled?`) and `onSelect`; optional `label`, `emptyText`, `disabled`, `className`. Standalone suggestion actions use a native list/buttons; they are intentionally not another combobox/listbox.
- **Autocomplete:** ComboBoxPopup props: `label/value/onInputChange/options/onSelect`, optional `selectedId/disabled/placeholder/emptyText`, plus `filterOptions` (default true). Local matching is case-insensitive substring matching. Set false when passing server-filtered results. The component does not fetch, debounce, rank, or persist queries. It inherits the input/listbox relationship and active-descendant keyboard behavior rather than nesting SearchSuggestions buttons inside options.
- **SearchHistory:** `queries/onSelect`, optional `onRemove/onClear/label/disabled`. Exact duplicate strings are displayed once. The caller records queries and performs any persistence.
- **CommandMenu:** `open/onOpenChange/commands`, optional `title/placeholder/emptyText`. Each CommandItem has `id/label/onSelect`, optional `description/keywords/disabled`. Labels and keywords are matched; Up/Down/Home/End select, Enter executes, Escape closes through Dialog. Every opening resets the search query. Commands are callback-only; consumer code owns async/error handling and side effects.
- **CommandSearch:** CommandMenu props except open-state props, plus `triggerLabel/disabled`. Owns launcher/open state only. No global shortcut is registered.
- **CheckboxFilter:** `label/options/value/onChange`, optional `disabled/name/className`. Values are string ID arrays. FilterOption is `id/label/count?/disabled?`; counts normalize to nonnegative integers. Group disabled uses a native fieldset.
- **RadioFilter:** same choice data, with optional string `value` and string-valued `onChange`. Radio names are unique per instance unless supplied. To offer an “all” option, include one in the caller's options.
- **CategoryFilter:** CheckboxFilter composition with optional `label` (Categories by default); multi-select only.
- **RatingFilter:** `value: number | null`, `onChange`, optional `label/disabled/name`. Supported choices are null (any) and integers 1–5, interpreted as minimum star rating.
- **RangeFilter / RangeFilterSlider:** `label/value/onChange`, where value is a two-number tuple; optional `min/max/step/disabled/minimumLabel/maximumLabel`. Defaults 0/100/1. Nonfinite/reversed incoming values are normalized for display; emitted values are ordered and snapped to the step grid. If the maximum is off-grid, the last reachable step is below it. Invalid or blank numeric drafts remain editable and reset to the controlled value on blur. RangeFilterSlider adds two labeled native sliders rather than an unlabeled custom dual-thumb control.
- **SortSelect:** `value/options/onChange`, optional `label/disabled/name`; uses native select behavior. Unknown selected IDs render a disabled placeholder; empty choices disable the select.
- **SortDirectionToggle:** controlled `value: asc | desc`, `onChange`, optional `label/disabled`. The stable accessible label names the descending toggle; aria-pressed indicates descending, while visible text shows the current direction. It does not sort arrays itself.
- **ResultsCount:** `count`, optional `total/singular/plural/announcement/loading`. Total is normalized to at least count. Default announcement is polite; use off for static or duplicate counts to avoid redundant announcements.
- **ClearFilters:** `onClear`, optional `disabled/activeCount/children`. A nonpositive/nonfinite supplied activeCount disables it. The callback owns which fields reset.
- **NoResultsDisplay:** EmptyState props plus `query/onClear`. Defaults to search-specific text and optional clear action. Query is rendered as escaped text. Consumers choose whether to render it based on actual search state.
- **FilterChips:** `items/onRemove`, optional `label/disabled`. Items use `id/label/disabled?`. Removing a chip moves focus to its next or previous enabled neighbor, or the list when none remain. Parent must update items; no state is hidden.
- **FilterDropdown:** `label/children`, optional `disabled/activeCount`. Owns open state; Popover supplies positioning/dismissal. Controls remain open until Done, outside interaction, focus departure or Escape. Values update immediately through child callbacks; there is no separate Apply transaction.
- **FilterMenu:** `label/options/value/onChange`, optional `disabled`. DropdownMenu checkbox items; selecting an option closes the menu, unlike FilterDropdown's in-place controls.
- **FilterBar:** optional `label/children/chips/onRemove/count/activeCount/onClear/disabled`. Responsive composition, not a state manager. Disabled applies to its chip/reset actions; supply disabled separately to caller-owned child controls. activeCount defaults to chip count.
- **FilterPanel:** `children`, optional `title/description/actions/className`; semantic titled section with content and action slots.
- **FacetedFilters:** `facets/value/onChange`, optional `title/disabled/onClear`. FilterValues is a record of group IDs to string arrays. Facets use `id/label/options/mode?/disabled?`; default mode multiple, optional single. Updating one facet preserves other entries. Caller computes result sets and facet counts, and reconciles obsolete selections when data changes.
- **SavedSearch:** `entries/current/onSave/onLoad`, optional `onRemove/disabled/label`. Entries contain unique `id/name/configuration`. SearchConfiguration contains `query/filters`, optional `ranges/sort/direction`. onSave receives a trimmed nonempty name and copied snapshot; onLoad receives a copied configuration and original entry. Nested filter/range arrays are copied to prevent accidental edits leaking between saved/current state. The caller owns IDs, duplicate-name policy, persistence, async status and errors. No localStorage/database writes occur.

Use unique IDs within option/command/entry collections. Controlled callbacks require the parent to update the corresponding value. Disabled controls never intentionally trigger callbacks through native user interaction.

## Integrated playground behavior

The phase 8 examples share visible state. SearchBar adds submitted nonempty queries to in-memory history. FacetedFilters combines the query, budget range and facet selections with sample routes; counts ignore the current facet's own selection but respect other constraints. Sorting examples affect those results. SavedSearch can save/load the query, filters, budget and sort together. Reloading resets the demo. No action changes real user data.

Integration changes to the existing ComboBoxPopup are limited to IME composition guards and scrolling the active option into view, needed by Autocomplete. Its public API remains unchanged.

## Verification and pending review

Automated coverage in `scripts/check-search-filtering.mjs`: 25 exports, server-rendered field/form/list/group semantics, empty/disabled/selected states, filtering and callbacks, choice preservation, range normalization/step invariants, count normalization, query escaping, nested snapshot isolation and steady-caret styling. Existing overlay/feedback/loading checks are also rerun, along with typecheck/library build, production playground build, lint and whitespace checks.

Live browser verification is not claimed. The browser tool was previously blocked by URL-security policy; this batch does not bypass that restriction. The existing Vite session is running, but automated rendering checks do not establish browser or assistive-technology behavior. No new screenshots were captured. Future images belong in workspace-root `samples/`; do not embed them in local handoffs unless requested.

Still review manually: native search clear/submit, IME composition, keyboard focus/return, command and autocomplete navigation/selection, active-option scrolling, touch selection, menu dismissal, screen-reader naming/announcements, slider/numeric editing, chip removal focus, narrow viewport/zoom/RTL, forced colors and reduced-motion settings. Popup/dialog features retain the phase 7 browser requirements.

Phase 9 is not implemented by this batch. Its next unimplemented item is UserCard; ContactCard already awaits review. DateFilter remains deferred to phase 11.
