/** Decimal byte units shared by transfer progress displays. */
export function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1000 && unit < units.length - 1) { value /= 1000; unit++; }
  return `${unit === 0 ? value : Number(value.toFixed(1))} ${units[unit]}`;
}
