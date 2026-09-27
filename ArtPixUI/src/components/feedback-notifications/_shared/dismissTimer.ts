export type TimerScheduler = {
  now: () => number;
  set: (callback: () => void, delay: number) => unknown;
  clear: (handle: unknown) => void;
};
/** Pure pause-aware countdown; zero/non-finite durations mean persistent. */
export function createDismissTimer(duration: number, expire: () => void, scheduler: TimerScheduler) {
  let remaining = Number.isFinite(duration) ? Math.min(2147483647, Math.max(0, duration)) : 0;
  const enabled = remaining > 0;
  let started = 0;
  let handle: unknown;
  let running = false;
  let ended = false;
  const pauses = new Set<string>();
  const stop = () => {
    if (!running) return;
    scheduler.clear(handle);
    remaining = Math.max(0, remaining - Math.max(0, scheduler.now() - started));
    running = false;
  };
  const resume = () => {
    if (running || ended || pauses.size || !enabled) return;
    started = scheduler.now();
    running = true;
    handle = scheduler.set(() => { running = false; ended = true; remaining = 0; expire(); }, remaining);
  };
  return {
    start: resume,
    pause(reason: string) { pauses.add(reason); stop(); },
    resume(reason: string) { pauses.delete(reason); resume(); },
    cancel() { stop(); ended = true; },
  };
}
