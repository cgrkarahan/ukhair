import { NextRequest } from "next/server";

export const runtime = "nodejs";

function hashSeed(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function paletteFor(topic: string) {
  if (topic === "transplant-outcomes") {
    return ["#063b52", "#0b7189", "#d9b887"] as const;
  }
  if (topic === "androgenetic-alopecia") {
    return ["#173f4f", "#5a7f78", "#e2c9a5"] as const;
  }
  if (topic === "alopecia-areata") {
    return ["#17384c", "#648fa0", "#e6c6a2"] as const;
  }
  return ["#103e4b", "#4b8178", "#ddc49d"] as const;
}

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get("topic") ?? "hair-research";
  const seed = request.nextUrl.searchParams.get("seed") ?? topic;
  const hash = hashSeed(`${topic}:${seed}`);
  const [ink, accent, warm] = paletteFor(topic);
  const offset = 80 + (hash % 240);
  const offsetTwo = 180 + ((hash >>> 8) % 300);
  const rotation = -8 + ((hash >>> 16) % 17);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="Abstract hair research illustration">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${ink}"/>
          <stop offset="1" stop-color="${accent}"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".3"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#background)"/>
      <circle cx="${1180 + (hash % 100)}" cy="230" r="330" fill="url(#glow)"/>
      <g transform="rotate(${rotation} 800 450)" fill="none" stroke-linecap="round">
        <path d="M${-120 + offset} 810 C 280 570, 270 250, 650 70" stroke="#ffffff" stroke-opacity=".72" stroke-width="18"/>
        <path d="M${80 + offsetTwo} 900 C 410 650, 500 270, 870 -40" stroke="${warm}" stroke-opacity=".88" stroke-width="13"/>
        <path d="M520 950 C 700 710, 850 400, 1030 -80" stroke="#ffffff" stroke-opacity=".38" stroke-width="9"/>
        <path d="M850 980 C 980 690, 1180 350, 1510 -20" stroke="${warm}" stroke-opacity=".56" stroke-width="16"/>
      </g>
      <g fill="none" stroke="#ffffff" stroke-opacity=".65">
        <circle cx="1180" cy="420" r="118" stroke-width="7"/>
        <circle cx="1180" cy="420" r="62" stroke-width="4"/>
        <circle cx="1180" cy="420" r="18" fill="${warm}" stroke="none"/>
        <path d="M1265 505 L1410 650" stroke-width="20" stroke-linecap="round"/>
      </g>
      <g fill="${warm}" opacity=".7">
        <circle cx="250" cy="180" r="8"/><circle cx="315" cy="145" r="5"/>
        <circle cx="1340" cy="160" r="7"/><circle cx="1420" cy="235" r="5"/>
      </g>
    </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
    },
  });
}
