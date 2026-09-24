#!/usr/bin/env node
/**
 * Expired-domain shortlister.
 *
 * Takes a CSV export from a drop-list source (dropped.uk, ExpiredDomains.net,
 * SpamZilla, DomCop) and produces a ranked shortlist, then checks each finalist
 * against the Wayback Machine for the failure mode that no filter catches:
 * a domain that was a legitimate site for years, then spent its last stretch
 * as gambling/pharma spam. Majestic still reports the old topic, so those
 * domains look perfect in a results grid and are radioactive.
 *
 * Usage:
 *   node scripts/domain-shortlist.mjs droplist.csv
 *   node scripts/domain-shortlist.mjs droplist.csv --top 40 --out shortlist.csv
 *   node scripts/domain-shortlist.mjs droplist.csv --no-enrich
 *
 * Flags:
 *   --top N        How many top-scoring domains to Wayback-check (default 25)
 *   --out FILE     Write the ranked shortlist to CSV
 *   --no-enrich    Skip Wayback entirely (fast, but skips the spam check)
 *   --all          Show rejected domains and why
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// ---------------------------------------------------------------------------
// CONFIG - edit this block, everything below is machinery
// ---------------------------------------------------------------------------

const CONFIG = {
  // Name must contain at least one of these. Empty array = accept any name.
  includeKeywords: [
    "hair", "transplant", "restoration", "follicle", "fue", "fut",
    "alopecia", "baldness", "trichology", "scalp", "hairloss", "clinic",
  ],

  // Reject if the name contains any of these.
  // "chair" is the important one: a substring search for "hair" matches
  // wheelchair, armchair and office chair, which is most of a raw result set.
  excludeKeywords: [
    "chair", "mohair", "hairdress", "extension", "wig", "weave",
    "straighten", "curl", "shampoo", "salon", "barber",
    "casino", "poker", "loan", "porn", "escort", "crypto",
  ],

  // Thresholds. A threshold is SKIPPED if its column is missing from the CSV,
  // so a metrics-light export (dropped.uk) still works.
  minBacklinks: 50,
  minRefDomains: 20,
  minTrustFlow: 10,
  minTrustRatio: 0.5,       // TF / CF - the cheapest link-farm detector there is
  maxFirstSeenYear: 2020,   // must predate this: real history
  minLastSeenYear: 2024,    // must be archived since: not long dead

  rejectNumbers: true,
  rejectHyphens: true,
  maxNameLength: 22,

  // Topical Trust Flow categories to accept, if the column exists.
  topicalAllow: ["health"],
};

// Scoring weights. Score is only used for ranking, not for pass/fail.
const WEIGHTS = {
  refDomains: 1.6,   // referring domains matter far more than raw backlink count
  trustFlow: 2.0,
  trustRatio: 25,
  age: 1.2,          // years of history
  topicalMatch: 20,
  edu: 8,
  gov: 10,
};

// Content that means the domain was hijacked for spam at some point.
const SPAM_TERMS = [
  "casino", "poker", "slot gacor", "online slots", "sportsbook", "betting site",
  "judi", "situs", "togel", "bandar", "viagra", "cialis", "payday loan",
  "escort service", "replica watches", "essay writing service", "cbd gummies",
  "binary options", "카지노", "토토", "바카라",
  "オンラインカジノ", "博彩", "赌场",
  "娱乐城", "百家乐", "казино",
  // CJK adult/spam, the most common payload on hijacked English domains
  "无码", "毛片", "成人视频", "成年人视频", "在线观看", "色情", "三级片",
  "私人影院", "無修正", "アダルト", "야동", "성인",
];

// Not spam, but not a live site either: parking pages, host defaults, error
// stubs. Worth a flag rather than an outright reject.
const PARKED_TERMS = [
  "没有找到站点", "site not found", "domain is for sale", "buy this domain",
  "this domain is parked", "domain parking", "coming soon", "under construction",
  "welcome to nginx", "apache2 ubuntu default", "index of /", "default web site page",
  "赞助商链接", "domain expired", "account suspended",
];

// Header aliases across the different export formats.
const COLUMN_ALIASES = {
  domain: ["domain", "domainname", "name", "url", "domains"],
  backlinks: ["bl", "backlinks", "extbl", "externalbacklinks", "majesticbl", "links"],
  refDomains: ["dp", "domainpop", "refdomains", "referringdomains", "rd", "majesticrefdomains"],
  trustFlow: ["tf", "trustflow", "majestictf", "majestictrustflow"],
  citationFlow: ["cf", "citationflow", "majesticcf", "majesticcitationflow"],
  topicalTF: ["ttf", "topicaltrustflow", "topic", "majesticttf", "topical", "category"],
  firstSeen: ["aby", "archivebirthyear", "birthyear", "created", "createddate", "age", "firstseen"],
  lastSeen: ["wby", "wayback", "waybackyear", "lastseen", "lastcrawl"],
  eduLinks: ["extbledu", "domainpopedu", "edu", "edulinks"],
  govLinks: ["extblgov", "domainpopgov", "gov", "govlinks"],
  price: ["price", "cost", "buynow", "status", "bid"],
  dropDate: ["dropdate", "drop", "expiry", "expires", "deletedate", "enddate", "adddate"],
};

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  const src = text.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const delimiter = detectDelimiter(src);

  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];

    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i += 1; }
        else quoted = false;
      } else field += ch;
      continue;
    }

    if (ch === '"') quoted = true;
    else if (ch === delimiter) { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += ch;
  }

  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

function detectDelimiter(sample) {
  const line = sample.slice(0, 4000).split("\n")[0] ?? "";
  const counts = [",", ";", "\t", "|"].map((d) => [d, line.split(d).length]);
  counts.sort((a, b) => b[1] - a[1]);
  return counts[0][1] > 1 ? counts[0][0] : ",";
}

const normaliseHeader = (h) => h.toLowerCase().replace(/[^a-z0-9]/g, "");

function mapColumns(header) {
  const normalised = header.map(normaliseHeader);
  const mapping = {};

  for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
    let index = normalised.findIndex((h) => aliases.includes(h));
    if (index === -1) {
      index = normalised.findIndex((h) => h && aliases.some((a) => a.length > 3 && h.includes(a)));
    }
    if (index !== -1) mapping[field] = index;
  }
  return mapping;
}

const num = (value) => {
  if (value == null) return null;
  const cleaned = String(value).replace(/[,\s]/g, "").replace(/([\d.]+)k$/i, (_, n) => String(Number(n) * 1000));
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};

const year = (value) => {
  const match = String(value ?? "").match(/(19|20)\d{2}/);
  return match ? Number(match[0]) : null;
};

// ---------------------------------------------------------------------------
// Filtering and scoring
// ---------------------------------------------------------------------------

function toRecord(cells, mapping) {
  const pick = (field) => (mapping[field] != null ? cells[mapping[field]]?.trim() : undefined);
  const domain = (pick("domain") ?? "").toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!domain || !domain.includes(".")) return null;

  const tf = num(pick("trustFlow"));
  const cf = num(pick("citationFlow"));

  return {
    domain,
    label: domain.split(".")[0],
    tld: domain.slice(domain.indexOf(".") + 1),
    backlinks: num(pick("backlinks")),
    refDomains: num(pick("refDomains")),
    trustFlow: tf,
    citationFlow: cf,
    trustRatio: tf != null && cf ? Number((tf / cf).toFixed(2)) : null,
    topicalTF: pick("topicalTF") ?? null,
    firstSeen: year(pick("firstSeen")),
    lastSeen: year(pick("lastSeen")),
    eduLinks: num(pick("eduLinks")),
    govLinks: num(pick("govLinks")),
    price: pick("price") ?? null,
    dropDate: pick("dropDate") ?? null,
  };
}

function reject(record) {
  const { label, domain } = record;
  const c = CONFIG;

  for (const bad of c.excludeKeywords) {
    if (label.includes(bad)) return `name contains "${bad}"`;
  }
  if (c.includeKeywords.length && !c.includeKeywords.some((k) => label.includes(k))) {
    return "no target keyword in name";
  }
  if (c.rejectNumbers && /\d/.test(label)) return "contains numbers";
  if (c.rejectHyphens && label.includes("-")) return "contains hyphen";
  if (label.length > c.maxNameLength) return `name longer than ${c.maxNameLength}`;

  // Threshold checks are skipped when the column is absent.
  if (record.backlinks != null && record.backlinks < c.minBacklinks) {
    return `backlinks ${record.backlinks} < ${c.minBacklinks}`;
  }
  if (record.refDomains != null && record.refDomains < c.minRefDomains) {
    return `referring domains ${record.refDomains} < ${c.minRefDomains}`;
  }
  if (record.trustFlow != null && record.trustFlow < c.minTrustFlow) {
    return `TF ${record.trustFlow} < ${c.minTrustFlow}`;
  }
  if (record.trustRatio != null && record.trustRatio < c.minTrustRatio) {
    return `TF/CF ${record.trustRatio} < ${c.minTrustRatio} (link farm signature)`;
  }
  if (record.firstSeen != null && record.firstSeen > c.maxFirstSeenYear) {
    return `first seen ${record.firstSeen}, too recent`;
  }
  if (record.lastSeen != null && record.lastSeen < c.minLastSeenYear) {
    return `last archived ${record.lastSeen}, long dead`;
  }
  if (record.topicalTF && c.topicalAllow.length) {
    const topic = record.topicalTF.toLowerCase();
    if (topic !== "-" && topic !== "" && !c.topicalAllow.some((t) => topic.includes(t))) {
      return `topical trust flow "${record.topicalTF}" off-niche`;
    }
  }
  if (domain.endsWith(".xxx") || domain.endsWith(".adult")) return "adult TLD";
  return null;
}

function score(record) {
  let total = 0;
  if (record.refDomains) total += Math.min(record.refDomains, 150) * WEIGHTS.refDomains;
  if (record.trustFlow) total += record.trustFlow * WEIGHTS.trustFlow;
  if (record.trustRatio) total += record.trustRatio * WEIGHTS.trustRatio;
  if (record.firstSeen) total += Math.max(0, new Date().getFullYear() - record.firstSeen) * WEIGHTS.age;
  if (record.topicalTF && CONFIG.topicalAllow.some((t) => record.topicalTF.toLowerCase().includes(t))) {
    total += WEIGHTS.topicalMatch;
  }
  if (record.eduLinks) total += Math.min(record.eduLinks, 10) * WEIGHTS.edu;
  if (record.govLinks) total += Math.min(record.govLinks, 10) * WEIGHTS.gov;
  return Math.round(total);
}

// ---------------------------------------------------------------------------
// Wayback Machine
// ---------------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, { attempts = 3, asText = false } = {}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "domain-shortlist/1.0 (research)" },
        signal: AbortSignal.timeout(25000),
      });
      if (response.status === 429 || response.status >= 500) throw new Error(`HTTP ${response.status}`);
      if (!response.ok) return null;
      return asText ? await response.text() : await response.json();
    } catch {
      if (attempt === attempts) return null;
      await sleep(1500 * attempt);
    }
  }
  return null;
}

/** One capture per month, so year-by-year gaps are visible. */
async function waybackTimeline(domain) {
  const url = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(domain)}`
    + "&output=json&fl=timestamp,original&filter=statuscode:200"
    + "&collapse=timestamp:6&limit=3000";

  const rows = await fetchWithRetry(url);
  if (!Array.isArray(rows) || rows.length < 2) return null;

  const timestamps = rows.slice(1).map((r) => r[0]).filter(Boolean).sort();
  const byYear = new Map();
  for (const ts of timestamps) {
    const y = Number(ts.slice(0, 4));
    byYear.set(y, (byYear.get(y) ?? 0) + 1);
  }

  const years = [...byYear.keys()].sort((a, b) => a - b);
  const first = years[0];
  const last = years[years.length - 1];

  const gaps = [];
  for (let y = first; y <= last; y += 1) {
    if (!byYear.has(y)) {
      const previous = gaps[gaps.length - 1];
      if (previous && previous.to === y - 1) previous.to = y;
      else gaps.push({ from: y, to: y });
    }
  }

  return { first, last, years, byYear, gaps, timestamps };
}

/** Spam is routinely entity-encoded to slip past scanners. Decode first. */
function decodeEntities(html) {
  return html
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function scriptShift(text) {
  const sample = text.slice(0, 200000);
  const foreign = (sample.match(/[぀-ヿ一-鿿가-힯Ѐ-ӿ฀-๿]/g) ?? []).length;
  return sample.length ? foreign / sample.length : 0;
}

/** Check the LAST captures, not the first. The recent history is what matters. */
async function spamCheck(domain, timeline) {
  if (!timeline) return { checked: 0, hits: [], snapshots: [] };

  const recent = timeline.timestamps.slice(-4).reverse();
  const hits = new Set();
  const parked = new Set();
  const snapshots = [];
  let checked = 0;

  for (const ts of recent.slice(0, 3)) {
    const url = `https://web.archive.org/web/${ts}id_/http://${domain}/`;
    const html = await fetchWithRetry(url, { attempts: 2, asText: true });
    await sleep(700);
    if (!html) continue;

    checked += 1;
    const decoded = decodeEntities(html);
    const text = decoded.toLowerCase().replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ");
    const title = (decoded.match(/<title[^>]*>([\s\S]{0,160}?)<\/title>/i)?.[1] ?? "").trim().replace(/\s+/g, " ");

    for (const term of SPAM_TERMS) if (text.includes(term)) hits.add(term);
    for (const term of PARKED_TERMS) if (text.includes(term)) parked.add(term);

    // A language shift on an English-market domain means it changed hands.
    const foreignRatio = scriptShift(text);
    if (foreignRatio > 0.05) {
      const label = `non-latin content ${Math.round(foreignRatio * 100)}%`;
      if (hits.size) hits.add(label);
      else parked.add(label);
    }

    snapshots.push({ year: ts.slice(0, 4), month: ts.slice(4, 6), title: title || "(no title)" });
  }

  return { checked, hits: [...hits], parked: [...parked], snapshots };
}

function verdict(record) {
  const flags = [];
  if (record.spamHits?.length) flags.push("SPAM HISTORY");
  if (record.parkedHits?.length) flags.push(`parked/foreign (${record.parkedHits[0]})`);
  const longGap = record.gaps?.find((g) => g.to - g.from >= 1);
  if (longGap) flags.push(`gap ${longGap.from}-${longGap.to}`);
  if (record.waybackLast && record.waybackLast < new Date().getFullYear() - 2) flags.push("stale");
  if (record.timelineMissing) flags.push("no archive");

  if (flags.includes("SPAM HISTORY")) return { level: "REJECT", flags };

  // A multi-year gap followed by foreign-language content is the textbook
  // hijack signature: the original owner dropped it, someone else rebuilt it
  // in another language on the old links. Treat that as a reject on its own.
  if (record.parkedHits?.length && longGap) {
    return { level: "REJECT", flags: [...flags, "hijack pattern"] };
  }

  if (flags.length) return { level: "CHECK", flags };
  return { level: "OK", flags: [] };
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

function table(rows, columns) {
  const widths = columns.map((c) =>
    Math.max(c.header.length, ...rows.map((r) => String(c.get(r) ?? "").length)));

  const line = (cells) => cells.map((cell, i) =>
    (columns[i].right ? String(cell).padStart(widths[i]) : String(cell).padEnd(widths[i]))).join("  ");

  const out = [line(columns.map((c) => c.header)), widths.map((w) => "-".repeat(w)).join("  ")];
  for (const row of rows) out.push(line(columns.map((c) => c.get(row) ?? "")));
  return out.join("\n");
}

const csvCell = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { file: null, top: 25, out: null, enrich: true, all: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--top") args.top = Number(argv[++i]) || 25;
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--no-enrich") args.enrich = false;
    else if (a === "--all") args.all = true;
    else if (!a.startsWith("--")) args.file = a;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.file) {
    console.error("Usage: node scripts/domain-shortlist.mjs <droplist.csv> [--top 25] [--out shortlist.csv] [--no-enrich] [--all]");
    process.exit(1);
  }

  const raw = await readFile(path.resolve(args.file), "utf8");
  const rows = parseCsv(raw);
  if (rows.length < 2) throw new Error("CSV has no data rows");

  const mapping = mapColumns(rows[0]);
  if (mapping.domain == null) {
    throw new Error(`Could not find a domain column. Headers seen: ${rows[0].join(", ")}`);
  }

  const found = Object.keys(mapping);
  const missing = Object.keys(COLUMN_ALIASES).filter((f) => !found.includes(f));

  console.log(`\nParsed ${rows.length - 1} rows from ${path.basename(args.file)}`);
  console.log(`Columns detected: ${found.join(", ")}`);
  if (missing.length) console.log(`Not in this export (thresholds skipped): ${missing.join(", ")}`);

  const kept = [];
  const rejected = [];

  for (const cells of rows.slice(1)) {
    const record = toRecord(cells, mapping);
    if (!record) continue;
    const reason = reject(record);
    if (reason) rejected.push({ ...record, reason });
    else kept.push({ ...record, score: score(record) });
  }

  kept.sort((a, b) => b.score - a.score);
  console.log(`\n${kept.length} passed filters, ${rejected.length} rejected.`);

  if (args.all && rejected.length) {
    console.log("\nRejected:");
    console.log(table(rejected.slice(0, 60), [
      { header: "DOMAIN", get: (r) => r.domain },
      { header: "REASON", get: (r) => r.reason },
    ]));
  }

  if (!kept.length) {
    console.log("\nNothing passed. Loosen CONFIG at the top of this file, or widen includeKeywords.");
    return;
  }

  const finalists = kept.slice(0, args.top);

  if (args.enrich) {
    console.log(`\nChecking Wayback history for the top ${finalists.length}. This is the slow part.\n`);

    for (const [index, record] of finalists.entries()) {
      process.stdout.write(`  [${index + 1}/${finalists.length}] ${record.domain} ... `);

      const timeline = await waybackTimeline(record.domain);
      if (!timeline) {
        record.timelineMissing = true;
        console.log("no archive data");
        await sleep(500);
        continue;
      }

      record.waybackFirst = timeline.first;
      record.waybackLast = timeline.last;
      record.gaps = timeline.gaps;

      const spam = await spamCheck(record.domain, timeline);
      record.spamHits = spam.hits;
      record.parkedHits = spam.parked;
      record.snapshots = spam.snapshots;

      const v = verdict(record);
      record.verdict = v.level;
      record.flags = v.flags;
      console.log(`${timeline.first}-${timeline.last}  ${v.level}${v.flags.length ? ` (${v.flags.join(", ")})` : ""}`);
      await sleep(400);
    }
  }

  const columns = [
    { header: "#", get: (_, i) => i, right: true },
    { header: "DOMAIN", get: (r) => r.domain },
    { header: "SCORE", get: (r) => r.score, right: true },
    { header: "RD", get: (r) => r.refDomains ?? "-", right: true },
    { header: "TF", get: (r) => r.trustFlow ?? "-", right: true },
    { header: "TF/CF", get: (r) => r.trustRatio ?? "-", right: true },
    { header: "ARCHIVE", get: (r) => (r.waybackFirst ? `${r.waybackFirst}-${r.waybackLast}` : "-") },
    { header: "VERDICT", get: (r) => r.verdict ?? "-" },
    { header: "FLAGS", get: (r) => (r.flags?.length ? r.flags.join("; ") : "") },
    { header: "PRICE", get: (r) => r.price ?? "-" },
  ];

  const ranked = finalists.map((r, i) => ({ ...r, rank: i + 1 }));
  console.log("\n" + table(ranked, columns.map((c) => ({
    ...c, get: (r) => (c.header === "#" ? r.rank : c.get(r)),
  }))));

  const clean = ranked.filter((r) => r.verdict === "OK" || !args.enrich);
  const check = ranked.filter((r) => r.verdict === "CHECK");
  const bad = ranked.filter((r) => r.verdict === "REJECT");

  if (args.enrich) {
    console.log(`\n${clean.length} clean, ${check.length} need a manual look, ${bad.length} rejected on spam history.`);
    for (const r of bad) {
      const why = [...(r.spamHits ?? []), ...(r.parkedHits ?? [])].slice(0, 5).join(", ");
      console.log(`  REJECT ${r.domain}: ${why}`);
    }
    if (clean.length) {
      console.log("\nStill do these by hand on anything you are about to bid on:");
      console.log("  - Wayback timeline, eyes on the last 2 years of captures");
      console.log("  - Anchor text distribution in Majestic proper (cached data goes stale)");
      console.log("  - UK IPO trademark search");
      console.log("  - Who the previous owner was, and whether they had ASA or CQC trouble");
    }
  }

  if (args.out) {
    const fields = ["rank", "domain", "score", "refDomains", "backlinks", "trustFlow",
      "citationFlow", "trustRatio", "topicalTF", "waybackFirst", "waybackLast",
      "verdict", "flags", "spamHits", "parkedHits", "price", "dropDate"];
    const lines = [fields.join(",")];
    for (const r of ranked) {
      lines.push(fields.map((f) => csvCell(Array.isArray(r[f]) ? r[f].join(" | ") : r[f])).join(","));
    }
    await writeFile(path.resolve(args.out), lines.join("\n") + "\n", "utf8");
    console.log(`\nWrote ${ranked.length} rows to ${args.out}`);
  }
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exit(1);
});
