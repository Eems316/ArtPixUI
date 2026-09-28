import type { ComponentPropsWithoutRef } from "react";
import "./LayeredBackground.css";
export type LayeredBackgroundProps = ComponentPropsWithoutRef<"div"> & {
    layers?: string[];
    scrim?: string;
};
/** Layers are CSS background-image values, front to back. Content stays interactive. */
export function LayeredBackground({ layers = ["radial-gradient(#c8b98355 1px, transparent 1px)", "linear-gradient(#fff9e6,#f3e8c5)"], scrim = "transparent", children, className = "", style, ...props }: LayeredBackgroundProps) { return <div {...props} className={`art-pix-layered-background ${className}`} style={style}><div aria-hidden="true" className="art-pix-layered-background__layers" style={{ backgroundImage: layers.join(","), backgroundSize: layers.length === 2 && layers[0].startsWith("radial-gradient(#c8b98355") ? "12px 12px, auto" : undefined }}/><div aria-hidden="true" className="art-pix-layered-background__scrim" style={{ background: scrim }}/><div className="art-pix-layered-background__content">{children}</div></div>; }
