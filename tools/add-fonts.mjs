// Adds three font pairings to each concept in assets/concepts.js. Option 1 is the design's own pairing.
// [label, display family, body family, Google Fonts css2 family params ('' when the page already loads them)]
import { readFileSync, writeFileSync } from "node:fs";
const file = new URL("../assets/concepts.js", import.meta.url);
const src = readFileSync(file, "utf8");
const m = src.match(/window\.TP_CONCEPTS = (\[[\s\S]*?\n\]);/);
const list = new Function("return " + m[1])();
const G = {
  "Playfair Display": "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500",
  "Fraunces": "Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400",
  "Manrope": "Manrope:wght@300;400;500;600;700", "Inter": "Inter:wght@400;500;600;700",
  "Inter Tight": "Inter+Tight:wght@400;500;600;700", "Space Grotesk": "Space+Grotesk:wght@400;500;600;700",
  "IBM Plex Sans": "IBM+Plex+Sans:wght@400;500;600;700", "Outfit": "Outfit:wght@400;500;600;700;800",
  "DM Sans": "DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400", "Lexend": "Lexend:wght@400;500;600;700",
  "Source Sans 3": "Source+Sans+3:wght@400;500;600;700", "Plus Jakarta Sans": "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  "Instrument Serif": "Instrument+Serif:ital@0;1", "Work Sans": "Work+Sans:wght@400;500;600;700",
  "Lato": "Lato:ital,wght@0,400;0,700;1,400", "EB Garamond": "EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500",
  "Nunito Sans": "Nunito+Sans:wght@400;500;600;700;800", "Oswald": "Oswald:wght@400;500;600;700",
  "Source Serif 4": "Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400", "Public Sans": "Public+Sans:wght@400;500;600;700",
  "Cormorant Garamond": "Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500",
  "Newsreader": "Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400"
};
const F = {
  "01": [["Bodoni Moda", "Instrument Sans"], ["Playfair Display", "Inter"], ["Fraunces", "Manrope"]],
  "02": [["Geist", "Geist"], ["Inter Tight", "Inter"], ["Space Grotesk", "IBM Plex Sans"]],
  "03": [["Nunito", "Figtree"], ["Outfit", "DM Sans"], ["Lexend", "Source Sans 3"]],
  "04": [["Sora", "Inter"], ["Space Grotesk", "Inter"], ["Plus Jakarta Sans", "Manrope"]],
  "05": [["DM Serif Display", "Inter Tight"], ["Playfair Display", "Inter"], ["Instrument Serif", "Work Sans"]],
  "06": [["Cormorant Garamond", "Manrope"], ["Playfair Display", "Lato"], ["EB Garamond", "Inter"]],
  "07": [["Bricolage Grotesque", "Figtree"], ["Outfit", "Nunito Sans"], ["Plus Jakarta Sans", "DM Sans"]],
  "08": [["Archivo", "Archivo"], ["Oswald", "Inter"], ["Space Grotesk", "Space Grotesk"]],
  "09": [["Geist", "Geist"], ["Plus Jakarta Sans", "Inter"], ["Manrope", "Manrope"]],
  "10": [["IBM Plex Sans", "IBM Plex Sans"], ["Source Serif 4", "Source Sans 3"], ["Public Sans", "Public Sans"]],
  "11": [["Instrument Serif", "Sora"], ["Playfair Display", "DM Sans"], ["Cormorant Garamond", "Inter"]],
  "12": [["Bricolage Grotesque", "Inter Tight"], ["Fraunces", "Inter"], ["Newsreader", "Source Sans 3"]]
};
for (const c of list) c.fonts = F[c.id].map(([d, b], k) => {
  const own = F[c.id][0];
  const q = k === 0 ? "" : [...new Set([d, b])].filter(f => !own.includes(f)).map(f => { if (!G[f]) throw new Error("no G for " + f); return G[f]; }).join("&family=");
  return [k === 0 ? "Original" : d === b ? d : d + " + " + b, d, b, q];
});
const body = "[\n" + list.map(c => "  " + JSON.stringify(c).replace(/"(\w+)":/g, "$1:")).join(",\n") + "\n]";
writeFileSync(file, src.replace(m[1], body));
console.log("fonts added to", list.length);
