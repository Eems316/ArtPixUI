import { useChart, ticks, scale } from "../_shared/chart.js";
export type GridProps = {
    vertical?: boolean;
    horizontal?: boolean;
    radial?: {
        cx: number;
        cy: number;
        radius: number;
        count: number;
    };
};
export function Grid({ vertical = false, horizontal = true, radial }: GridProps) { const c = useChart(); if (radial)
    return <g stroke="#c8b983" fill="none" aria-hidden="true">{[.25, .5, .75, 1].map(r => <polygon key={r} points={Array.from({ length: Math.max(3, radial.count) }, (_, i) => `${radial.cx + Math.sin(i / radial.count * Math.PI * 2) * radial.radius * r},${radial.cy - Math.cos(i / radial.count * Math.PI * 2) * radial.radius * r}`).join(" ")}/>)}</g>; return <g stroke="#c8b983" strokeWidth=".7" aria-hidden="true">{horizontal && ticks(c.yDomain).map((v, i) => <line key={`y${i}`} x1={c.left} x2={c.width - c.right} y1={scale(v, c.yDomain, c.height - c.bottom, c.top)} y2={scale(v, c.yDomain, c.height - c.bottom, c.top)}/>)}{vertical && ticks(c.xDomain).map((v, i) => <line key={`x${i}`} y1={c.top} y2={c.height - c.bottom} x1={scale(v, c.xDomain, c.left, c.width - c.right)} x2={scale(v, c.xDomain, c.left, c.width - c.right)}/>)}</g>; }
