import { useRef, useState, type ReactNode } from "react";
import { SearchInput, SearchBar, SearchSuggestions, Autocomplete, SearchHistory, CommandMenu, CommandSearch, CheckboxFilter, RadioFilter, RangeFilter, RangeFilterSlider, RatingFilter, CategoryFilter, SortSelect, SortDirectionToggle, ResultsCount, ClearFilters, NoResultsDisplay, FilterChips, FilterDropdown, FilterMenu, FilterBar, FilterPanel, FacetedFilters, SavedSearch, Button, type FilterValues, type FilterFacet, type SavedSearchEntry, type SearchConfiguration } from "../index.js";

const routes = [
 { id: "moss", label: "Mossglen trail", region: "forest", difficulty: "easy", price: 20 },
 { id: "pine", label: "Pine ridge", region: "forest", difficulty: "hard", price: 70 },
 { id: "dune", label: "Amber dunes", region: "desert", difficulty: "hard", price: 50 },
 { id: "bay", label: "Quiet bay", region: "coast", difficulty: "easy", price: 10 },
];
const regionOptions = [{ id: "forest", label: "Forest" }, { id: "desert", label: "Desert" }, { id: "coast", label: "Coast" }];
const difficultyOptions = [{ id: "easy", label: "Easy" }, { id: "hard", label: "Challenging" }];
function Exhibit({ id, name, number, children }: { id: string; name: string; number: number; children: ReactNode }) {
 return <section className="playground-exhibit" id={`${id}-demo`} aria-labelledby={`${id}-heading`}><div className="playground-exhibit-heading"><span className="playground-number">{number}</span><h2 id={`${id}-heading`}>{name}</h2><span className="playground-kind">AWAITING REVIEW</span></div><div style={{ display: "grid", gap: 20, padding: 28, minWidth: 0 }}>{children}</div></section>;
}
export function SearchFilteringDemo() {
 const [query, setQuery] = useState(""); const [submitted, setSubmitted] = useState(""); const [suggested, setSuggested] = useState("No suggestion selected.");
 const [autoQuery, setAutoQuery] = useState(""); const [autoId, setAutoId] = useState<string>();
 const [history, setHistory] = useState(["Forest", "Mossglen", "Coast"]);
 const [commandOpen, setCommandOpen] = useState(false); const [commandResult, setCommandResult] = useState("No command run.");
 const [categories, setCategories] = useState<string[]>(["forest"]); const [difficulty, setDifficulty] = useState("easy");
 const [range, setRange] = useState<[number, number]>([10, 70]); const [rating, setRating] = useState<number | null>(null);
 const [sort, setSort] = useState("name"); const [direction, setDirection] = useState<"asc" | "desc">("asc");
 const [facetValues, setFacetValues] = useState<FilterValues>({});
 const [saved, setSaved] = useState<SavedSearchEntry[]>([{ id: "initial", name: "Forest walks", configuration: { query: "", filters: { region: ["forest"] }, ranges: { price: [0, 100] }, sort: "name", direction: "asc" } }]);
 const savedId = useRef(0);
 const commands = [{ id: "save", label: "Save adventure", keywords: ["store", "notes"], onSelect: () => setCommandResult("Save requested; demo only.") }, { id: "share", label: "Share route", description: "Prepare a link to your route", onSelect: () => setCommandResult("Share requested; nothing sent.") }, { id: "unavailable", label: "Download offline map", disabled: true, onSelect: () => {} }];
 const chips = categories.map(id => ({ id, label: regionOptions.find(option => option.id === id)?.label ?? id }));
 const removeCategory = (id: string) => setCategories(values => values.filter(value => value !== id));
 const categoryPicker = <CategoryFilter value={categories} onChange={setCategories} options={regionOptions} />;
 const filterRows = (route: typeof routes[number], skip?: string) => route.label.toLowerCase().includes(query.trim().toLowerCase()) && route.price >= range[0] && route.price <= range[1] && ["region", "difficulty"].every(key => key === skip || !facetValues[key]?.length || facetValues[key].includes(route[key as "region" | "difficulty"]));
 const visible = routes.filter(route => filterRows(route)).sort((a, b) => (sort === "price" ? a.price - b.price : a.label.localeCompare(b.label)) * (direction === "asc" ? 1 : -1));
 const facets: FilterFacet[] = [{ id: "region", label: "Region", options: regionOptions.map(option => ({ ...option, count: routes.filter(route => filterRows(route, "region") && route.region === option.id).length })) }, { id: "difficulty", label: "Difficulty", mode: "single", options: difficultyOptions.map(option => ({ ...option, count: routes.filter(route => filterRows(route, "difficulty") && route.difficulty === option.id).length })) }];
 const snapshot: SearchConfiguration = { query, filters: facetValues, ranges: { price: range }, sort, direction };
 const loadSearch = (value: SearchConfiguration) => { setQuery(value.query); setFacetValues(value.filters); setRange(value.ranges?.price ?? [0, 100]); setSort(value.sort ?? "name"); setDirection(value.direction ?? "asc"); };
 return <>
 <Exhibit id="search-input" name="Find your next adventure" number={88}><label htmlFor="phase8-search-input">Search routes</label><SearchInput id="phase8-search-input" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try Mossglen…" /><SearchInput aria-label="Disabled search example" disabled placeholder="Unavailable" /><span>Query: {query || "empty"}</span></Exhibit>
 <Exhibit id="search-bar" name="A search with purpose" number={89}><SearchBar label="Search the atlas" value={query} onValueChange={setQuery} onSearch={value => { setSubmitted(value); if (value.trim()) setHistory(previous => [value.trim(), ...previous.filter(item => item !== value.trim())]); }} /><span role="status">Last submitted: {submitted || "none"}</span></Exhibit>
 <Exhibit id="search-suggestions" name="A few good directions" number={90}><SearchSuggestions suggestions={routes.map(route => ({ id: route.id, label: route.label, description: route.region }))} onSelect={item => setSuggested(item.label)} /><span role="status">{suggested}</span></Exhibit>
 <Exhibit id="autocomplete" name="A helpful head start" number={91}><Autocomplete label="Choose a route" value={autoQuery} onInputChange={setAutoQuery} selectedId={autoId} options={[...routes.map(route => ({ id: route.id, label: route.label })), { id: "closed", label: "Closed trail", disabled: true }]} onSelect={option => { setAutoQuery(option.label); setAutoId(option.id); }} /><span>Selected: {autoId ?? "none"}. Try an unmatched query for the empty state.</span></Exhibit>
 <Exhibit id="search-history" name="Paths you've explored" number={92}><SearchHistory queries={history} onSelect={value => { setQuery(value); setSubmitted(value); }} onRemove={query => setHistory(values => values.filter(value => value !== query))} onClear={() => setHistory([])} /><span>Chosen query: {query || "none"}</span></Exhibit>
 <Exhibit id="command-menu" name="Every action within reach" number={93}><Button onClick={() => setCommandOpen(true)}>Open commands</Button><CommandMenu open={commandOpen} onOpenChange={setCommandOpen} commands={commands} /><span role="status">{commandResult}</span></Exhibit>
 <Exhibit id="command-search" name="Find the right action" number={94}><CommandSearch commands={commands} /><span>{commandResult}</span><small>No global keyboard shortcuts are installed.</small></Exhibit>
 <Exhibit id="checkbox-filter" name="More than one possibility" number={95}><CheckboxFilter label="Regions" options={[...regionOptions, { id: "moon", label: "Moon (unavailable)", disabled: true }]} value={categories} onChange={setCategories} /><span>Selected: {categories.join(", ") || "none"}</span></Exhibit>
 <Exhibit id="radio-filter" name="One clear preference" number={96}><RadioFilter label="Difficulty" options={difficultyOptions} value={difficulty} onChange={setDifficulty} /><span>Selected: {difficulty}</span></Exhibit>
 <Exhibit id="range-filter" name="Set your limits" number={97}><RangeFilter label="Budget" min={0} max={100} value={range} onChange={setRange} /><span>Budget: {range[0]}–{range[1]}. Blank/invalid drafts reset on blur.</span></Exhibit>
 <Exhibit id="range-filter-slider" name="A range you can feel" number={98}><RangeFilterSlider label="Budget with sliders" min={0} max={100} value={range} onChange={setRange} /></Exhibit>
 <Exhibit id="rating-filter" name="Choose your standard" number={99}><RatingFilter value={rating} onChange={setRating} /><span>{rating === null ? "Any rating" : `${rating} stars and up`}</span></Exhibit>
 <Exhibit id="category-filter" name="Explore by category" number={100}>{categoryPicker}</Exhibit>
 <Exhibit id="sort-select" name="Put things in order" number={101}><SortSelect value={sort} onChange={setSort} options={[{ id: "name", label: "Name" }, { id: "price", label: "Price" }]} /></Exhibit>
 <Exhibit id="sort-direction-toggle" name="Which way around?" number={102}><SortDirectionToggle value={direction} onChange={setDirection} /></Exhibit>
 <Exhibit id="results-count" name="Know what you've found" number={103}><ResultsCount count={visible.length} total={routes.length} /><ResultsCount count={0} announcement="off" /><ResultsCount count={0} loading announcement="off" /></Exhibit>
 <Exhibit id="clear-filters" name="Start fresh" number={104}><ClearFilters activeCount={categories.length} onClear={() => setCategories([])} /><span>Selected regions: {categories.join(", ") || "none"}</span><Button variant="secondary" onClick={() => setCategories(["forest", "coast"])}>Add sample filters</Button></Exhibit>
 <Exhibit id="no-results-display" name="Another path to try" number={105}><NoResultsDisplay query="Moon kingdom" onClear={() => { setQuery(""); setFacetValues({}); setRange([0, 100]); }} /></Exhibit>
 <Exhibit id="filter-chips" name="Your choices at a glance" number={106}><FilterChips items={chips} onRemove={removeCategory} /><Button variant="secondary" onClick={() => setCategories(["forest", "coast"])}>Restore sample chips</Button></Exhibit>
 <Exhibit id="filter-dropdown" name="Filters when you need them" number={107}><FilterDropdown label="Choose regions" activeCount={categories.length}>{categoryPicker}</FilterDropdown><span>{categories.join(", ") || "No regions selected"}</span></Exhibit>
 <Exhibit id="filter-menu" name="A quick selection" number={108}><FilterMenu label="Region menu" options={regionOptions} value={categories} onChange={setCategories} /><span>{categories.join(", ") || "No regions selected"}</span></Exhibit>
 <Exhibit id="filter-bar" name="Everything close at hand" number={109}><FilterBar chips={chips} onRemove={removeCategory} onClear={() => setCategories([])} count={routes.filter(route => !categories.length || categories.includes(route.region)).length}><FilterDropdown label="Regions" activeCount={categories.length}>{categoryPicker}</FilterDropdown></FilterBar></Exhibit>
 <Exhibit id="filter-panel" name="Room to refine" number={110}><FilterPanel description="These controls share state with the examples above." actions={<ClearFilters activeCount={categories.length} onClear={() => setCategories([])} />}>{categoryPicker}<RadioFilter label="Difficulty" options={difficultyOptions} value={difficulty} onChange={setDifficulty} /></FilterPanel></Exhibit>
 <Exhibit id="faceted-filters" name="Find your own path" number={111}><FacetedFilters facets={facets} value={facetValues} onChange={setFacetValues} onClear={() => setFacetValues({})} /><ResultsCount count={visible.length} total={routes.length} />{visible.length ? <ul>{visible.map(route => <li key={route.id}>{route.label} — {route.price} coins</li>)}</ul> : <NoResultsDisplay query={query} onClear={() => { setQuery(""); setFacetValues({}); setRange([0, 100]); }} />}<small>Counts respect query/budget and other facets, excluding each facet's own selection.</small></Exhibit>
 <Exhibit id="saved-search" name="Keep a useful discovery" number={112}><SavedSearch entries={saved} current={snapshot} onSave={(name, configuration) => setSaved(previous => [...previous, { id: `saved-${++savedId.current}`, name, configuration }])} onLoad={loadSearch} onRemove={id => setSaved(previous => previous.filter(entry => entry.id !== id))} /><span>Current query: {query || "empty"}; budget: {range.join("–")}; results: {visible.length}.</span><small>Demo storage is in memory only; reloading the page resets saved searches.</small></Exhibit>
 </>;
}
