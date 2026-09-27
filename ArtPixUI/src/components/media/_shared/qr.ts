/** Bounded QR Model 2 encoder: versions 1–5, level L, UTF-8 ECI 26, byte mode, mask 0.
 * Algorithm reference: https://www.nayuki.io/page/qr-code-generator-library
 * No third-party runtime is bundled. The fixed mask trades optimization for a small implementation.
 */
const dataWords = [19, 34, 55, 80, 108];
const parityWords = [7, 10, 15, 20, 26];
function multiply(a: number, b: number) {
 let product = 0;
 while (b) { if (b & 1) product ^= a; b >>>= 1; a <<= 1; if (a & 256) a ^= 0x11d; }
 return product;
}
function parity(data: number[], count: number) {
 let polynomial = [1], power = 1;
 for (let degree = 0; degree < count; degree++) {
  const next = Array<number>(polynomial.length + 1).fill(0);
  polynomial.forEach((coefficient, index) => { next[index] ^= coefficient; next[index + 1] ^= multiply(coefficient, power); });
  polynomial = next; power = multiply(power, 2);
 }
 const remainder = [...data, ...Array<number>(count).fill(0)];
 for (let i = 0; i < data.length; i++) { const factor = remainder[i]; polynomial.forEach((coefficient, j) => { remainder[i + j] ^= multiply(coefficient, factor); }); }
 return remainder.slice(-count);
}
export function encodeQr(value: string): boolean[][] {
 // Reject oversized input before allocating a large byte array. Never truncate a payload.
 if (value.length > 105) throw new RangeError("QR content exceeds the 105-byte UTF-8 limit.");
 const bytes = new TextEncoder().encode(value);
 const versionIndex = dataWords.findIndex(count => bytes.length * 8 + 24 <= count * 8);
 if (versionIndex < 0) throw new RangeError("QR content exceeds the 105-byte UTF-8 limit.");
 const bits: number[] = [];
 const append = (number: number, length: number) => { for (let shift = length - 1; shift >= 0; shift--) bits.push((number >>> shift) & 1); };
 append(7, 4); append(26, 8); append(4, 4); append(bytes.length, 8);
 bytes.forEach(byte => append(byte, 8));
 const capacity = dataWords[versionIndex] * 8;
 append(0, Math.min(4, capacity - bits.length));
 while (bits.length % 8) bits.push(0);
 let padding = 0;
 while (bits.length < capacity) append(padding++ % 2 ? 0x11 : 0xec, 8);
 const data: number[] = [];
 for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((byte, bit) => byte * 2 + bit, 0));
 const words = [...data, ...parity(data, parityWords[versionIndex])];
 const size = 21 + 4 * versionIndex;
 const matrix: (boolean | null)[][] = Array.from({ length: size }, () => Array<boolean | null>(size).fill(null));
 const set = (x: number, y: number, dark: boolean) => { if (x >= 0 && y >= 0 && x < size && y < size) matrix[y][x] = dark; };
 for (let i = 0; i < size; i++) { set(i, 6, i % 2 === 0); set(6, i, i % 2 === 0); }
 for (const [left, top] of [[0, 0], [size - 7, 0], [0, size - 7]]) {
  for (let y = -1; y <= 7; y++) for (let x = -1; x <= 7; x++) { const ring = Math.max(Math.abs(x - 3), Math.abs(y - 3)); set(left + x, top + y, ring !== 2 && ring !== 4); }
 }
 if (versionIndex > 0) for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) set(size - 7 + x, size - 7 + y, Math.max(Math.abs(x), Math.abs(y)) !== 1);
 // BCH-protected format word for level L and mask 0, including the required XOR mask.
 const format = 0x77c4;
 const first: [number, number][] = [...Array.from({ length: 6 }, (_, i) => [8, i] as [number, number]), [8, 7], [8, 8], [7, 8], ...Array.from({ length: 6 }, (_, i) => [5 - i, 8] as [number, number])];
 const second: [number, number][] = [...Array.from({ length: 8 }, (_, i) => [size - 1 - i, 8] as [number, number]), ...Array.from({ length: 7 }, (_, i) => [8, size - 7 + i] as [number, number])];
 for (const positions of [first, second]) positions.forEach(([x, y], bit) => set(x, y, Boolean((format >>> bit) & 1)));
 set(8, size - 8, true);
 let cursor = 0, upward = true;
 for (let right = size - 1; right > 0; right -= 2) {
  if (right === 6) right--;
  for (let row = 0; row < size; row++) {
   const y = upward ? size - row - 1 : row;
   for (const x of [right, right - 1]) if (matrix[y][x] === null) {
    const bit = cursor < words.length * 8 ? (words[Math.floor(cursor / 8)] >>> (7 - cursor % 8)) & 1 : 0;
    matrix[y][x] = Boolean(bit ^ ((x + y) % 2 === 0 ? 1 : 0)); cursor++;
   }
  }
  upward = !upward;
 }
 return matrix.map(row => row.map(Boolean));
}
