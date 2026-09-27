import { useEffect, useRef, useState } from "react";
import { Button } from "../../buttons-actions/Button/Button.js";
import { clockText } from "../_shared/date.js";
import "../_shared/date.css";
export type TimerProps = {
    label?: string;
};
export function Timer({ label = "Elapsed time" }: TimerProps) {
    const [running, setRunning] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const accumulated = useRef(0);
    const started = useRef(0);
    useEffect(() => { if (!running)
        return; const timer = setInterval(() => setElapsed(accumulated.current + performance.now() - started.current), 100); return () => clearInterval(timer); }, [running]);
    const toggle = () => { if (running) {
        accumulated.current += performance.now() - started.current;
        setElapsed(accumulated.current);
    }
    else
        started.current = performance.now(); setRunning(!running); };
    return <div className="art-pix-date-stack"><span>{label}</span><output aria-live="off">{clockText(elapsed / 1000)}</output><div className="art-pix-date-row"><Button onClick={toggle}>{running ? "Pause" : "Start"}</Button><Button variant="secondary" onClick={() => { accumulated.current = 0; setElapsed(0); setRunning(false); }}>Reset</Button></div></div>;
}
