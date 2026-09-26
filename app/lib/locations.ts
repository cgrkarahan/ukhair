import { applyProjectTokens } from "@/app/lib/contentTemplates";
import {
  locationInputs,
  type LocationInput,
  type LocationTravelInfo,
  type Nation,
} from "@/app/lib/locationData";
import type { TopicCard, TopicFaq, TopicSection } from "@/app/lib/siteContent";

export type { LocationTravelInfo };

export type LocationPageContent = {
  slug: string;
  city: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  keywords: string[];
  heroChips: string[];
  cards: TopicCard[];
  travel: LocationTravelInfo;
  sections: TopicSection[];
  faq: TopicFaq[];
  relatedSlugs: string[];
  publishedAt: string;
};

const relatedSlugs = [
  "hair-transplant-london",
  "hair-transplant-cost-london",
  "our-clinical-standards",
  "uk-vs-turkey-hair-transplant",
  "why-turkiye",
  "hair-transplant-recovery-timeline",
];

// The CQC covers England only, so the regulator check has to follow the city.
const regulatorCheck: Record<Nation, string> = {
  england:
    "Ask how the clinic is regulated: independent clinics in England performing surgery should be registered with the Care Quality Commission (CQC), which you can confirm on the CQC's public register.",
  scotland:
    "Ask how the clinic is regulated: in Scotland, independent clinics are registered with Healthcare Improvement Scotland rather than the CQC, so check that register, and bear in mind that a London clinic will be CQC-registered instead.",
  wales:
    "Ask how the clinic is regulated: in Wales, independent healthcare is overseen by Healthcare Inspectorate Wales rather than the CQC, so ask how the clinic is registered there and check that register, bearing in mind that a London clinic will be CQC-registered instead.",
};

function chooseProviderSection({ city, nation }: LocationInput): TopicSection {
  return {
    title: "How to choose a provider, wherever you book",
    body: [
      `The questions that separate a strong choice from a weak one are the same whether you are looking at a clinic in ${city} or one on Harley Street. Ask who performs the procedure and whether they are GMC-registered. ${regulatorCheck[nation]} Ask what the quote includes beyond the procedure itself: aftercare reviews, medication, and follow-up contact.`,
      "Graft count is worth particular attention. A quote built around an inflated graft estimate can look generous on paper and disappoint on the day. Ask how the graft range was assessed and whether it was based on an in-person or photo-based review of your donor area.",
    ],
    bullets: [
      "Confirm GMC registration for whoever performs the procedure, not just the clinic's name on the door.",
      "Ask what counts as included versus extra: PRP, medication, and aftercare reviews are common places quotes diverge.",
      "Treat a graft estimate given without seeing your donor area properly as provisional, not final.",
    ],
  };
}

function recoverySection({ city }: LocationInput): TopicSection {
  return {
    title: `Recovery and getting back to normal life in ${city}`,
    body: [
      `Whichever route you choose, recovery happens at home, not at the clinic. The first week typically involves visible redness and scabbing at the donor and recipient areas, some swelling that can reach the forehead by day three or four, and a washing routine that needs to be followed precisely. Most patients plan to work from home or take time off for around five to seven days before returning to a ${city} office or client-facing role.`,
      "This is where the gap between a strong and a weak provider shows up most clearly for out-of-town patients. A clinic that is easy to reach for follow-up appointments can simply have you come back in. A clinic further away needs a proper remote aftercare plan: clear written guidance, photo-based review if something looks wrong, and a real person to contact rather than a generic support inbox.",
      "Ask any provider, London or local, exactly how they support patients who do not live nearby once the initial appointment is over. A vague answer here is one of the more reliable warning signs, because aftercare is where problems are usually caught early or missed entirely.",
    ],
    bullets: [
      "Plan for five to seven days before returning to visible, client-facing work.",
      "Ask specifically how follow-up works for patients who live outside the local area.",
      "A clinic that cannot describe its remote aftercare process clearly is worth treating with caution.",
    ],
  };
}

function turkeySection({ city, turkey }: LocationInput): TopicSection {
  return {
    title: `The Turkey option from ${city}`,
    body: [
      turkey.airport,
      "Package pricing there is usually built around a lower headline figure than a UK clinic: our own curated Turkiye route starts from £1,800 against £2,750 for the London route, and independent Turkish clinics often price lower again. The trade-off is not really about quality on average, since strong clinics exist in both countries. It is about what you can verify before you travel, how easily you can get back in front of the person who treated you if something needs following up, and whether English-language aftercare communication is as clear as you would want for a medical procedure. Our own comparison of UK and Turkey routes goes into this properly rather than assuming one is automatically right.",
    ],
    bullets: [
      turkey.airportBullet,
      "Turkey pricing is usually lower headline, London pricing usually easier to verify and follow up on.",
      "See our full UK vs Turkey comparison before treating either as the obvious default.",
    ],
  };
}

function marketingSection({ city, regionPhrase }: LocationInput): TopicSection {
  return {
    title: `Looking critically at ${city} clinic marketing`,
    body: [
      `Hair transplant advertising is heavy on social media ${regionPhrase}, and not all of it is straightforward. Common tactics worth recognising include headline prices that exclude PRP, medication, or aftercare, graft estimates given from a photo with no proper donor assessment, and countdown-style offers designed to rush a decision that should not be rushed.`,
      "A deposit-only booking process is not automatically a red flag, but it is worth understanding fully before you pay anything: what it secures, what happens if your circumstances change, and whether it is refundable. The strongest indicator of a trustworthy provider is usually how plainly they answer these questions when you ask directly, rather than how polished the advertising looks.",
    ],
    bullets: [
      "Treat a headline price as a starting point to verify, not a final figure.",
      "A graft estimate from a photo alone is provisional until a proper assessment happens.",
      "Ask about deposit terms in writing before paying anything.",
    ],
  };
}

function buildFaq({ city, answers }: LocationInput): TopicFaq[] {
  return [
    { question: `Is there a hair transplant clinic in ${city}?`, answer: answers.clinic },
    {
      question: `Can I have a hair transplant consultation without travelling from ${city}?`,
      answer:
        "Many clinics, including London-based ones, offer an initial video consultation before any travel is needed. That lets you cover suitability, likely graft range, and pricing before deciding whether an in-person visit is worthwhile.",
    },
    {
      question: `How long does it take to get from ${city} to London for a consultation?`,
      answer: answers.howLong,
    },
    { question: "Do I need to stay overnight in London for treatment?", answer: answers.overnight },
    {
      question: `Is it worth travelling to London instead of booking a ${city} clinic?`,
      answer: answers.worthIt,
    },
    {
      question: `How much does travel from ${city} add to the overall cost?`,
      answer: answers.travelCost,
    },
    {
      question: "What if my case turns out to be more complex once a doctor examines me properly?",
      answer:
        "This is exactly why an in-person or thorough photo-based assessment matters more than a quick quote. Donor density, scalp laxity, and the pattern of loss can change what is realistic once properly examined. A provider worth choosing will tell you this plainly rather than sticking to an initial estimate that no longer fits your case.",
    },
    {
      question: "Can someone come with me to a consultation or treatment day?",
      answer: `Most clinics are comfortable with a companion attending a consultation, and many patients travelling from ${city} for treatment day bring someone along, particularly given the length of the appointment and the journey home afterwards. Ask the specific clinic about their policy and any space constraints.`,
    },
    {
      question: `Can I fly to Turkey instead of travelling to London from ${city}?`,
      answer: `${answers.turkey} It is usually the lower headline price of the two travel routes, but it changes what you can verify in person and how you follow up afterwards, which is worth weighing properly rather than deciding on price alone.`,
    },
    {
      question: "What is the realistic total timeline from enquiry to finished recovery?",
      answer:
        "Expect several weeks between an initial enquiry and a treatment date, since proper planning takes time, followed by an immediate two-week visible recovery period and a longer growth timeline that typically runs to twelve months or more before the final result is clear. Our recovery timeline page sets this out stage by stage.",
    },
  ];
}

function buildLocationPage(input: LocationInput): LocationPageContent {
  const { city } = input;
  const lower = city.toLowerCase();

  return applyProjectTokens({
    slug: `hair-transplant-${lower.replace(/[^a-z]+/g, "-")}`,
    city,
    title: `Hair Transplant in ${city}: Your Options and How to Choose`,
    seoTitle: `Hair Transplant ${city}: Options & How to Choose`,
    description: `Researching a hair transplant from ${city}? Compare booking locally against travelling to London, what to check either way, and realistic journey times.`,
    eyebrow: `Hair transplant ${city}`,
    lead: input.lead,
    keywords: [
      `hair transplant ${lower}`,
      `hair transplant clinic ${lower}`,
      `hair transplant ${lower} cost`,
      `fue ${lower}`,
    ],
    heroChips: input.heroChips,
    cards: [
      ...input.cards,
      {
        title: "The checklist matters more than the postcode",
        text: `Doctor registration, aftercare, and realistic graft planning apply whether you book in ${city} or in London.`,
      },
    ],
    travel: input.travel,
    sections: [
      input.localMarket,
      chooseProviderSection(input),
      input.londonRoute,
      recoverySection(input),
      turkeySection(input),
      marketingSection(input),
    ],
    faq: buildFaq(input),
    relatedSlugs,
    publishedAt: input.publishedAt,
  });
}

export const locationPageList: LocationPageContent[] = locationInputs.map(buildLocationPage);

export const locationPages: Record<string, LocationPageContent> = Object.fromEntries(
  locationPageList.map((page) => [page.slug, page]),
);
