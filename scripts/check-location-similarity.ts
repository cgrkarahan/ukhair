/**
 * Fails when two city pages share too much wording, which search engines read
 * as doorway pages. Compares every pair of pages on 5-word phrases, with city
 * names masked so "Leeds" vs "York" does not count as a difference.
 *
 *   npm run check:locations
 */
import { locationPageList, type LocationPageContent } from "@/app/lib/locations";

const MAX_PAIR_SIMILARITY = 0.12;
const SHINGLE = 5;

const cityNames = locationPageList.map((page) => page.city.toLowerCase());

function pageText(page: LocationPageContent) {
  return [
    page.title,
    page.description,
    page.lead,
    ...page.heroChips,
    ...page.cards.flatMap((card) => [card.title, card.text]),
    page.travel.sameDayReturnNote,
    ...page.sections.flatMap((section) => [section.title, ...section.body, ...(section.bullets ?? [])]),
    ...page.faq.flatMap((item) => [item.question, item.answer]),
  ].join(" ");
}

function shingles(text: string) {
  let normalised = text.toLowerCase();
  for (const city of cityNames) normalised = normalised.replaceAll(city, "city");
  const words = normalised.replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  const set = new Set<string>();
  for (let i = 0; i + SHINGLE <= words.length; i++) set.add(words.slice(i, i + SHINGLE).join(" "));
  return { words: words.length, set };
}

const pages = locationPageList.map((page) => ({ city: page.city, ...shingles(pageText(page)) }));
const pairs: { a: string; b: string; score: number }[] = [];

for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    let shared = 0;
    for (const phrase of pages[i].set) if (pages[j].set.has(phrase)) shared++;
    const score = shared / (pages[i].set.size + pages[j].set.size - shared);
    pairs.push({ a: pages[i].city, b: pages[j].city, score });
  }
}

pairs.sort((x, y) => y.score - x.score);
console.log("Most similar city pairs (5-word phrase overlap):");
for (const pair of pairs.slice(0, 8)) {
  console.log(`  ${(pair.score * 100).toFixed(1)}%  ${pair.a} / ${pair.b}`);
}
console.log(`\nWords per page: ${Math.min(...pages.map((p) => p.words))} to ${Math.max(...pages.map((p) => p.words))}`);

const failures = pairs.filter((pair) => pair.score > MAX_PAIR_SIMILARITY);
if (failures.length) {
  console.error(`\n${failures.length} pair(s) exceed ${MAX_PAIR_SIMILARITY * 100}% overlap.`);
  process.exit(1);
}
console.log(`\nAll pairs are under ${MAX_PAIR_SIMILARITY * 100}% overlap.`);
