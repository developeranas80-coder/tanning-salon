"use client";

/**
 * Coconut palm silhouettes — narrow drooping frond ribbons (not wedge blobs).
 * Crown ~(200, 498); trunk base y=558.
 */

type PalmSide = "left" | "right";

/** Each frond: crown → outer edge → tip → inner edge → crown */
const FRONDS_LEFT = [
  "M200 498 C194 468 88 295 12 72 C58 155 168 420 200 498Z",
  "M200 498 C188 440 98 255 42 138 C82 228 162 455 200 498Z",
  "M200 498 C196 410 128 268 62 178 C98 268 172 468 200 498Z",
  "M200 498 C204 395 178 305 122 228 C148 312 188 478 200 498Z",
  "M200 498 C212 425 288 275 372 98 C318 188 242 452 200 498Z",
  "M200 498 C218 455 302 335 352 218 C302 292 232 472 200 498Z",
];

/** Mirror path horizontally — x/y pairs, flip x only. */
function mirrorPathX(d: string, width = 400): string {
  let pairIndex = 0;
  return d.replace(/-?\d+(\.\d+)?/g, (match) => {
    const isX = pairIndex % 2 === 0;
    pairIndex++;
    if (!isX) return match;
    const v = parseFloat(match);
    return String(Math.round((width - v) * 10) / 10);
  });
}

const FRONDS_RIGHT = FRONDS_LEFT.map((d) => mirrorPathX(d));

const TRUNK_LEFT =
  "M201 558 C198 510 197 465 199 430 C200 408 200 498 201 558Z";

const TRUNK_RIGHT =
  "M199 558 C202 510 203 465 201 430 C200 408 200 498 199 558Z";

function PalmTree({ side, className }: { side: PalmSide; className: string }) {
  const fronds = side === "left" ? FRONDS_LEFT : FRONDS_RIGHT;
  const trunk = side === "left" ? TRUNK_LEFT : TRUNK_RIGHT;
  const id = `palm-${side}`;

  return (
    <svg
      className={className}
      viewBox="0 0 400 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#B48B78" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#B48B78" stopOpacity="0.48" />
          <stop offset="100%" stopColor="#B48B78" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient
          id={`${id}-sun`}
          gradientUnits="userSpaceOnUse"
          x1={side === "left" ? "320" : "80"}
          y1="80"
          x2={side === "left" ? "120" : "280"}
          y2="400"
        >
          <stop offset="0%" stopColor="#B48B78" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B48B78" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-fade`}>
          <linearGradient id={`${id}-fade-grad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="72%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <rect width="400" height="560" fill={`url(#${id}-fade-grad)`} />
        </mask>
      </defs>

      <g className="palm-sway-group" mask={`url(#${id}-fade)`}>
        <path className="palm-trunk" d={trunk} fill={`url(#${id}-body)`} />
        <g className="palm-fronds">
          {fronds.map((d, i) => (
            <path key={i} className="palm-frond" d={d} fill={`url(#${id}-body)`} />
          ))}
        </g>
        <g className="palm-fronds" opacity="0.55">
          {fronds.map((d, i) => (
            <path key={`h${i}`} d={d} fill={`url(#${id}-sun)`} />
          ))}
        </g>
      </g>
    </svg>
  );
}

export default function HeroPalmShadows() {
  return (
    <div className="hero-palm-shadows pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-palm-ground-blob hero-palm-ground-blob-left" />
      <div className="hero-palm-ground-blob hero-palm-ground-blob-right" />

      <PalmTree side="left" className="hero-palm-tree hero-palm-left" />
      <PalmTree side="right" className="hero-palm-tree hero-palm-right" />
    </div>
  );
}
