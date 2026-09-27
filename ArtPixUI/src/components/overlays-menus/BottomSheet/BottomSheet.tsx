import { Sheet, type SheetProps } from "../Sheet/Sheet.js";
export type BottomSheetProps = Omit<SheetProps, "position">;
export function BottomSheet(props: BottomSheetProps) { return <Sheet {...props} position="bottom" />; }
