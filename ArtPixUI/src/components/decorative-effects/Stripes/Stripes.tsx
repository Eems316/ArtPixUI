import type { ComponentPropsWithoutRef } from "react";
import { LayeredBackground } from "../LayeredBackground/LayeredBackground.js";
export type StripesProps = ComponentPropsWithoutRef<"div"> & {
    color?: string;
    background?: string;
    stripeWidth?: number;
    angle?: number;
};
export function Stripes({ color = "#c8b98355", background = "#fff9e6", stripeWidth = 12, angle = 45, ...props }: StripesProps) { const width = Number.isFinite(stripeWidth) ? Math.max(1, stripeWidth) : 12; const direction = Number.isFinite(angle) ? angle : 45; return <LayeredBackground {...props} layers={[`repeating-linear-gradient(${direction}deg,${color} 0,${color} ${width}px,${background} ${width}px,${background} ${width * 2}px)`]}/>; }
