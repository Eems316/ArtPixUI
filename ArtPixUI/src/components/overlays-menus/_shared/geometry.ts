export type Placement = "bottom" | "top" | "right" | "left";
export function popupPosition(anchor: { left: number; right: number; top: number; bottom: number }, width: number, height: number, viewport: { width: number; height: number }, placement: Placement, point?: { x: number; y: number }) {
 let x = point?.x ?? anchor.left, y = point?.y ?? anchor.bottom + 8;
 if (!point) {
  if (placement === "top") y = anchor.top - height - 8;
  if (placement === "right") { x = anchor.right + 8; y = anchor.top; }
  if (placement === "left") { x = anchor.left - width - 8; y = anchor.top; }
  if (placement === "bottom" && y + height > viewport.height - 8) y = anchor.top - height - 8;
  if (placement === "top" && y < 8) y = anchor.bottom + 8;
  if (placement === "right" && x + width > viewport.width - 8) x = anchor.left - width - 8;
  if (placement === "left" && x < 8) x = anchor.right + 8;
 }
 return { x: Math.max(8, Math.min(x, viewport.width - width - 8)), y: Math.max(8, Math.min(y, viewport.height - height - 8)) };
}
export function nextOptionIndex(length: number, current: number, direction: "next" | "previous" | "first" | "last") {
 if (length === 0) return -1;
 if (direction === "first") return 0;
 if (direction === "last") return length - 1;
 if (current < 0) return direction === "previous" ? length - 1 : 0;
 return (current + (direction === "next" ? 1 : -1) + length) % length;
}
