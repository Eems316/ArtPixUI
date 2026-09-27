import { useEffect, useRef, useState } from "react";
import { instant, clockText } from "../_shared/date.js";
export type CountdownProps = {
    target: string | number | Date;
    label?: string;
    onComplete?: () => void;
};
export function Countdown({ target, label = "Time remaining", onComplete }: CountdownProps) {
    const end = instant(target)?.getTime();
    const [now, setNow] = useState<number | null>(null);
    const complete = useRef<number | null>(null);
    const callback = useRef(onComplete);
    useEffect(() => { callback.current = onComplete; }, [onComplete]);
    useEffect(() => { if (end === undefined)
        return; const tick = () => { const time = Date.now(); setNow(time); if (time >= end) {
        clearInterval(timer);
        if (complete.current !== end) {
            complete.current = end;
            callback.current?.();
        }
    } }; const timer = setInterval(tick, 250); tick(); return () => clearInterval(timer); }, [end]);
    return <div className="art-pix-date-stack"><span>{label}</span><output aria-live="off">{end === undefined ? "Invalid target" : now === null ? "—" : clockText(Math.ceil((end - now) / 1000))}</output></div>;
}
