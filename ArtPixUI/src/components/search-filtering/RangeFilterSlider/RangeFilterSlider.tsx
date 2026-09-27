import { RangeFields, type RangeProps } from "../_shared/range.js";
export type RangeFilterSliderProps = RangeProps;
export function RangeFilterSlider(props: RangeFilterSliderProps) { return <RangeFields {...props} sliders />; }
