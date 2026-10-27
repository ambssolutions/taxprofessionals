// Merge designs/NN-slug/meta.json into assets/concepts.js (keeps id, slug and rec; replaces the rest).
// Run: node tools/merge-meta.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const file = path.join(SITE, "assets/concepts.js");
const src = readFileSync(file, "utf8");
const m = src.match(/window\.TP_CONCEPTS = (\[[\s\S]*?\n\]);/);
const list = new Function("return " + m[1])();
let n = 0;
for (const d of readdirSync(path.join(SITE, "designs")).filter(x => /^\d\d-/.test(x))) {
  const mf = path.join(SITE, "designs", d, "meta.json");
  if (!existsSync(mf)) continue;
  const meta = JSON.parse(readFileSync(mf, "utf8"));
  const c = list.find(x => x.slug === d);
  if (!c) continue;
  for (const k of ["name", "type", "style", "motion", "insp", "desc", "tags", "fx", "sw"]) if (meta[k] !== undefined) c[k] = meta[k];
  n++;
}
const body = "[\n" + list.map(c => "  " + JSON.stringify(c).replace(/"(\w+)":/g, "$1:")).join(",\n") + "\n]";
writeFileSync(file, src.replace(m[1], body));
console.log("merged", n, "meta files");
