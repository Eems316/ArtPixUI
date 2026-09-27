import { useEffect, useRef } from "react";
import { createDismissTimer } from "./dismissTimer.js";

export function useDismissTimer(duration: number, expire: () => void) {
  const callback = useRef(expire);
  const timer = useRef<ReturnType<typeof createDismissTimer> | null>(null);
  const paused = useRef(new Set<string>());
  useEffect(() => { callback.current = expire; }, [expire]);
  useEffect(() => {
    const current = createDismissTimer(duration, () => callback.current(), {
      now: () => performance.now(),
      set: (fn, ms) => window.setTimeout(fn, Math.min(ms, 2147483647)),
      clear: handle => window.clearTimeout(handle as number),
    });
    timer.current = current;
    for (const reason of paused.current) current.pause(reason);
    const visibility = () => { if (document.hidden) current.pause("hidden"); else current.resume("hidden"); };
    document.addEventListener("visibilitychange", visibility);
    visibility();
    current.start();
    return () => { current.cancel(); document.removeEventListener("visibilitychange", visibility); timer.current = null; };
  }, [duration]);
  return {
    pause(reason: string) { paused.current.add(reason); timer.current?.pause(reason); },
    resume(reason: string) { paused.current.delete(reason); timer.current?.resume(reason); },
    cancel() { timer.current?.cancel(); },
  };
}
