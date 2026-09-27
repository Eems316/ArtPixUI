// Optional online verification only; not part of the normal offline check-*.mjs suite.
// No packages are installed or bundled. The reference is Project Nayuki's MIT implementation.
import ts from "typescript";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const url = "https://raw.githubusercontent.com/nayuki/QR-Code-generator/master/typescript-javascript/qrcodegen.ts";
const response = await fetch(url);
if (!response.ok) throw Error(`Reference unavailable: ${response.status}`);
const source = await response.text();
const sourceHash = createHash("sha256").update(source).digest("hex");
if (sourceHash !== "1dc03fb5a10e0e2318ea162755bbdb9977ca6ce52cff959e9c9b6deafdccda9c") throw Error("Reference changed; review its source before updating the pinned hash.");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText, sandbox, { timeout: 3000 });
const own = readFileSync(new URL("../src/components/media/_shared/qr.ts", import.meta.url), "utf8");
const js = ts.transpileModule(own, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { encodeQr } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
const { QrCode, QrSegment } = sandbox.qrcodegen;
for (const text of ["", "ArtPixUI", "https://example.com", "Hello 🌲", ...[16,17,31,32,52,53,77,78,105].map(n => "x".repeat(n))]) {
 const reference = QrCode.encodeSegments([QrSegment.makeEci(26), QrSegment.makeBytes(Array.from(new TextEncoder().encode(text)))], QrCode.Ecc.LOW, 1, 5, 0, false);
 const rows = Array.from({ length: reference.size }, (_, y) => Array.from({ length: reference.size }, (_, x) => reference.getModule(x, y)));
 if (JSON.stringify(rows) !== JSON.stringify(encodeQr(text))) throw Error(`Matrix mismatch: ${text}`);
 console.log(JSON.stringify({ text, size: reference.size, hash: createHash("sha256").update(JSON.stringify(rows)).digest("hex") }));
}
console.log(`All matrices match. Reference source SHA256: ${createHash("sha256").update(source).digest("hex")}`);
