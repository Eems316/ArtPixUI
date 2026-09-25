import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const categories = {
  "layout-containers": ["Header", "Footer"],
  "typography-text": ["Label", "Title", "Link", "CodeBlock"],
  "buttons-actions": ["Button", "IconButton"],
  "forms-inputs": ["TextInput", "TextArea", "Checkbox", "RadioButton", "ToggleSwitch", "Slider", "FileUpload"],
  navigation: ["Sidebar", "NavigationBar", "Breadcrumbs", "Pagination"],
  "cards-content": ["UserCard", "FaqAccordion", "BasicCard", "ProductCard", "MediaCard", "DashboardCard", "FeatureCard", "PricingCard", "NotificationCard", "EventCard", "ContactCard", "TestimonialCard"],
  "data-display": ["KpiStatCard", "Table", "List", "Timeline", "KeyValueDisplay"],
  "feedback-notifications": ["Alert", "Toast", "Snackbar", "NotificationBanner", "ValidationMessage", "ErrorMessage", "SuccessMessage", "WarningMessage", "InfoMessage", "StatusMessage", "NotificationDot", "NotificationBadge", "EmptyState", "ErrorState", "SuccessState", "UndoNotification", "ProgressNotification"],
  "loading-progress": ["ProgressBar", "SpinnerStatus", "CircularProgress", "IndeterminateProgressBar", "SkeletonLoader", "ShimmerSkeleton", "LoadingScreen", "LoadingOverlay", "LoadingButton", "ProgressSteps", "UploadProgress", "DownloadProgress", "BufferingIndicator", "DotsLoader", "PulseLoader"],
  "overlays-menus": ["Tooltip", "Modal", "Dialog", "ConfirmationDialog", "DestructiveConfirmation", "AlertDialog", "Drawer", "Sheet", "BottomSheet", "Popover", "DropdownMenu", "DisplayMenu", "ContextMenu", "ActionMenu", "MenuBar", "Submenu", "CommandMenu", "ComboBoxPopup", "DatePickerPopup", "ColorPickerPopup", "HoverCard", "Lightbox", "Backdrop"],
  media: ["Image", "Avatar", "AvatarGroup", "Thumbnail", "ImageGallery", "ImageGrid", "Carousel", "ImageSlider", "ImageViewer", "BeforeAfterImage", "ZoomableImage", "VideoPlayer", "VideoThumbnail", "AudioPlayer", "MediaControls", "MediaPreview", "Icon", "IconGroup", "Logo", "QrCodeDisplay", "PlaceholderImage", "ImageWithOverlay"],
  "date-time": ["Calendar", "DatePicker", "DateRangePicker", "TimePicker", "DateTimePicker", "MonthPicker", "YearPicker", "WeekPicker", "TimeRangePicker", "CalendarRange", "InlineCalendar", "CalendarHeader", "CalendarGrid", "DateInput", "TimeInput", "DurationInput", "Countdown", "Timestamp", "Timer", "Scheduler", "DateBadge", "TimezoneSelector"],
  "search-filtering": ["SearchInput", "SearchBar", "Autocomplete", "SearchSuggestions", "SearchHistory", "CommandSearch", "FilterBar", "FilterPanel", "FilterDropdown", "FilterMenu", "FilterChips", "FacetedFilters", "CheckboxFilter", "RadioFilter", "RangeFilter", "RangeFilterSlider", "DateFilter", "RatingFilter", "CategoryFilter", "SortSelect", "SortDirectionToggle", "ResultsCount", "ClearFilters", "NoResultsDisplay", "SavedSearch"],
  "data-visualization": ["BarChart", "PieChart", "StackedBarChart", "HorizontalBarChart", "LineChart", "AreaChart", "DonutChart", "ScatterPlot", "BubbleChart", "RadarChart", "Gauge", "Meter", "TrendIndicator", "Temperature", "Legend", "ChartTooltip", "Axis", "Grid", "DataLabel", "ChartTitle", "ChartContainer", "ChartEmptyState", "ChartLoadingState"],
  "decorative-effects": ["LayeredBackground", "Stripes"],
};

const componentsRoot = join(process.cwd(), "src", "components");
for (const [category, components] of Object.entries(categories)) {
  const categoryPath = join(componentsRoot, category);
  mkdirSync(categoryPath, { recursive: true });
  for (const component of components) {
    const componentPath = join(categoryPath, component);
    mkdirSync(componentPath, { recursive: true });
    for (const file of [`${component}.tsx`, `${component}.css`, "index.ts"]) {
      try {
        writeFileSync(join(componentPath, file), "", { flag: "wx" });
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
    }
  }
}
