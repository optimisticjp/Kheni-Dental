/**
 * Read the palette out of src/app/globals.css.
 *
 * Two scripts need the site's real colours: the contrast record and the
 * brand asset build. Neither keeps its own copy, because one that did went
 * stale after a palette change and reported "0 failing" while testing
 * colours the site had stopped using. A checker that can go stale is worse
 * than no checker, because it is trusted.
 *
 * `need` throws on a missing token rather than returning undefined, so a
 * renamed token fails the script loudly instead of silently painting black.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

export function readPalette() {
  const css = readFileSync(`${ROOT}/src/app/globals.css`, "utf8");
  /** Every `--name: #rrggbb;` declaration in the stylesheet. */
  const tokens = Object.fromEntries(
    [...css.matchAll(/(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2].toLowerCase()]),
  );
  const need = (name) => {
    const v = tokens[name];
    if (!v) throw new Error(`Token ${name} not found in globals.css. Update this script alongside the palette.`);
    return v;
  };
  return { tokens, need };
}
