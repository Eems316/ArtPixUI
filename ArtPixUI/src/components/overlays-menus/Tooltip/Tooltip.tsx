import { HoverCore, type HoverProps } from "../_shared/hover.js";
export type TooltipProps = Omit<HoverProps, "children"> & { children: string };
export function Tooltip(props: TooltipProps) { return <HoverCore {...props} tooltip />; }
