/**
 * sRGB mix helpers for html2canvas — avoid `color-mix()`, `lab()`, `oklab()`, etc.
 */

export function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.trim().replace(/^#/, "");
  let h = raw;
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-f]{6}$/i.test(h)) {
    throw new Error(`html2canvas-colors: invalid hex "${hex}"`);
  }
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** `t` = fraction of `a`; `(1-t)` of `b` (linear sRGB). */
export function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(
    ar * t + br * (1 - t),
    ag * t + bg * (1 - t),
    ab * t + bb * (1 - t),
  );
}

export function rgbaFromHex(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${r},${g},${b},${a})`;
}

/** Approximate `color-mix(accent, #000 with implied weight)` for gradient ends. */
export function mixAccentWithBlack(accent: string, accentFraction: number): string {
  return mixHex(accent, "#000000", accentFraction);
}
