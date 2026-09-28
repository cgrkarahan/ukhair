import type { LinkCard, TopicFaq } from "@/app/lib/siteContent";
import {
  applyProjectTokens,
  buildBlogImageAlt,
} from "@/app/lib/contentTemplates";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogSource = {
  label: string;
  href: string;
};

export type BlogPost = {
  sources: BlogSource[];
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  eyebrow: string;
  answerSummary: string;
  readTime: string;
  updatedAt: string;
  keywords: string[];
  keyTakeaways: string[];
  sections: BlogSection[];
  faq: TopicFaq[];
  relatedLinks: LinkCard[];
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
};

type BaseBlogPost = Omit<
  BlogPost,
  "imageSrc" | "imageAlt" | "imagePosition" | "sources"
>;

// Every URL here was checked to resolve before it was added. Re-check them when
// a regulator reorganises its site, since broken citations undo their purpose.
const source = {
  nhsHairTransplant: {
    label: "NHS: Hair transplant",
    href: "https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/cosmetic-surgery/hair-transplant/",
  },
  nhsHairLoss: { label: "NHS: Hair loss", href: "https://www.nhs.uk/symptoms/hair-loss/" },
  nhs111: { label: "NHS 111 online", href: "https://111.nhs.uk/" },
  gmcRegisters: {
    label: "General Medical Council: the medical register",
    href: "https://www.gmc-uk.org/registration-and-licensing/our-registers",
  },
  gmcConcerns: {
    label: "General Medical Council: raising a concern about a doctor",
    href: "https://www.gmc-uk.org/concerns",
  },
  cqcSearch: {
    label: "Care Quality Commission: find and check a service",
    href: "https://www.cqc.org.uk/search/all",
  },
  cqcComplain: {
    label: "Care Quality Commission: complaining about a service",
    href: "https://www.cqc.org.uk/contact-us/how-complain/complain-about-service-or-provider",
  },
  his: {
    label: "Healthcare Improvement Scotland",
    href: "https://www.healthcareimprovementscotland.scot/",
  },
  hiw: {
    label: "Healthcare Inspectorate Wales: find a service",
    href: "https://www.hiw.org.uk/find-service",
  },
  nmc: {
    label: "Nursing and Midwifery Council: search the register",
    href: "https://www.nmc.org.uk/registration/search-the-register/",
  },
  ishrs: { label: "International Society of Hair Restoration Surgery", href: "https://ishrs.org/" },
  iscas: {
    label: "Independent Sector Complaints Adjudication Service (ISCAS)",
    href: "https://iscas.org.uk/",
  },
  section75: {
    label: "Consumer Credit Act 1974, section 75",
    href: "https://www.legislation.gov.uk/ukpga/1974/39/section/75",
  },
  citizensAdviceCard: {
    label: "Citizens Advice: getting your money back if you paid by card",
    href: "https://www.citizensadvice.org.uk/consumer/somethings-gone-wrong-with-a-purchase/getting-your-money-back-if-you-paid-by-card-or-paypal/",
  },
  citizensAdviceHealth: {
    label: "Citizens Advice: advice about health services",
    href: "https://www.citizensadvice.org.uk/health/get-advice-about-health-services/",
  },
  cmaFakeReviews: {
    label: "Competition and Markets Authority: fake reviews guidance",
    href: "https://www.gov.uk/government/publications/fake-reviews",
  },
  dmcc: {
    label: "Digital Markets, Competition and Consumers Act 2024",
    href: "https://www.legislation.gov.uk/ukpga/2024/13/contents",
  },
  cra49: {
    label: "Consumer Rights Act 2015, section 49: reasonable care and skill",
    href: "https://www.legislation.gov.uk/ukpga/2015/15/section/49",
  },
  nhsSurgeryAbroad: {
    label: "NHS: Cosmetic surgery abroad",
    href: "https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/advice/cosmetic-surgery-abroad/",
  },
  travelAware: {
    label: "Travel Aware (UK government): surgery abroad",
    href: "https://travelaware.campaign.gov.uk/surgery-abroad-cut-out-the-risk/",
  },
  fcdoTurkeyHealth: {
    label: "GOV.UK: Turkey travel advice, health",
    href: "https://www.gov.uk/foreign-travel-advice/turkey/health",
  },
  healthTurkiye: {
    label: "HealthTürkiye (Turkish Ministry of Health portal)",
    href: "https://healthturkiye.gov.tr/",
  },
} satisfies Record<string, BlogSource>;

const blogPostSources: Record<string, BlogSource[]> = {
  "hair-transplant-consultation-london-what-to-expect": [
    source.nhsHairTransplant,
    source.gmcRegisters,
    source.cqcSearch,
  ],
  "how-to-choose-a-hair-transplant-clinic": [
    source.nhsHairTransplant,
    source.gmcRegisters,
    source.cqcSearch,
    source.his,
    source.hiw,
  ],
  "how-to-check-hair-transplant-surgeon-registration": [
    source.nhsHairTransplant,
    source.gmcRegisters,
    source.cqcSearch,
    source.his,
    source.hiw,
    source.nmc,
    source.ishrs,
  ],
  "hair-transplant-red-flags": [source.nhsHairTransplant, source.gmcRegisters, source.cqcSearch],
  "how-hair-transplant-graft-counts-get-inflated": [source.nhsHairTransplant, source.ishrs],
  "hair-transplant-deposit-and-refund-terms": [source.section75, source.citizensAdviceCard],
  "hair-transplant-second-opinion": [
    source.nhsHairLoss,
    source.nhsHairTransplant,
    source.gmcRegisters,
  ],
  "hair-transplant-gone-wrong": [
    source.nhsHairTransplant,
    source.nhs111,
    source.iscas,
    source.cqcComplain,
    source.gmcConcerns,
    source.his,
    source.hiw,
    source.citizensAdviceHealth,
  ],
  "hair-transplant-agency-vs-clinic": [
    source.nhsHairTransplant,
    source.cqcSearch,
    source.gmcRegisters,
  ],
  "how-to-read-hair-transplant-reviews": [
    source.cmaFakeReviews,
    source.dmcc,
    source.nhsHairTransplant,
  ],
  "hair-transplant-guarantees": [source.cra49, source.nhsSurgeryAbroad, source.nhsHairTransplant],
  "how-to-compare-hair-transplant-quotes": [
    source.nhsHairTransplant,
    source.gmcRegisters,
    source.cqcSearch,
  ],
  "how-to-vet-a-turkish-hair-transplant-clinic": [
    source.nhsSurgeryAbroad,
    source.travelAware,
    source.fcdoTurkeyHealth,
    source.healthTurkiye,
  ],
  "harley-street-hair-transplant-address": [
    source.cqcSearch,
    source.gmcRegisters,
    source.nhsHairTransplant,
  ],
};

const rawBlogPosts: BaseBlogPost[] = [
  {
    slug: "hair-transplant-consultation-london-what-to-expect",
    title: "What to Expect From a Hair Transplant Consultation in London",
    seoTitle: "Hair Transplant Consultation London: What to Expect",
    description:
      "Learn what a good hair transplant consultation in London should cover, from donor area and suitability to quote structure, planning, and aftercare.",
    excerpt:
      "A proper consultation should explain suitability, donor strength, likely graft range, treatment design, and what your quote really includes before you commit.",
    eyebrow: "Consultation guide",
    answerSummary:
      "A hair transplant consultation in London should do more than quote a price. It should check whether transplant is likely to suit you, assess your donor area, explain realistic design options, outline likely graft range, and make clear who is medically responsible for care. If those basics are vague, you do not have enough information yet.",
    readTime: "8 min read",
    updatedAt: "2026-05-07",
    keywords: [
      "hair transplant consultation london",
      "free hair transplant consultation london",
      "what happens at hair transplant consultation",
      "hair transplant suitability check",
    ],
    keyTakeaways: [
      "The consultation should assess whether transplant is suitable, not just whether it can be sold.",
      "You should leave with a clearer understanding of donor area, likely graft range, and design priorities.",
      "A useful quote explains what is included, who performs each part, and how aftercare works.",
    ],
    sections: [
      {
        heading: "What should a London consultation actually cover?",
        paragraphs: [
          "Most patients begin by asking how many grafts they need or what the treatment will cost. Those questions matter, but a useful consultation starts earlier than that. It should first check whether transplant is likely to be the right route for your pattern of hair loss, timing, and expectations.",
          "That means looking at your current hair loss pattern, donor area, hair characteristics, family history, medication history where relevant, and what kind of result you are hoping to achieve. A proper consultation should also clarify whether your goals are realistic within the donor supply available to you.",
        ],
        bullets: [
          "Hairline, crown, diffuse thinning, or facial-hair concern",
          "Donor area strength and likely limitations",
          "Short-term goals versus long-term planning",
          "Whether medical or non-surgical support should be part of the conversation",
        ],
      },
      {
        heading: "Why donor area and planning matter more than headline graft numbers",
        paragraphs: [
          "Many patients compare clinics using one number: graft count. In practice, graft numbers only make sense when they are linked to the donor area, hair calibre, density, curl, contrast, and the area being treated.",
          "A careful consultation should explain not only what may be possible now, but how donor supply should be protected for the future. That matters particularly if you are younger, still losing hair actively, or considering a conservative first procedure.",
        ],
      },
      {
        heading: "What you should ask before accepting a quote",
        paragraphs: [
          "A quote is most useful when it is tied to a treatment plan. Patients should understand what method is being proposed, what range of grafts is being discussed, whether shaving is expected, what aftercare is included, and how follow-up will work after the procedure.",
          "You should also understand who is involved clinically. In London, many patients want to know whether the treating doctors are GMC-registered and whether the provider setting is CQC-registered in England. Those questions help turn a marketing conversation into a real treatment decision.",
        ],
        bullets: [
          "Who is medically responsible for the plan",
          "What the quote includes and excludes",
          "Whether aftercare and follow-up are clearly structured",
          "How the clinic explains risks, limitations, and recovery",
        ],
      },
      {
        heading: "How to prepare for a free consultation",
        paragraphs: [
          "A free consultation is most useful when you arrive with clear priorities. Think about whether your main concern is hairline design, crown coverage, general density, scar concealment, or a female-specific thinning pattern.",
          "If you can, bring clear photos in natural light and be ready to explain what matters most to you: subtlety, density, faster recovery, staying in the UK, or understanding whether a London route is worth it in your case.",
        ],
      },
    ],
    faq: [
      {
        question: "Should a free consultation still be detailed?",
        answer:
          "Yes. Free does not have to mean superficial. It should still cover suitability, donor area, planning, expected limitations, and the structure around treatment and aftercare.",
      },
      {
        question: "Do I need photos before the consultation?",
        answer:
          "Photos often make the first assessment more useful, especially if they are clear and taken in daylight, but they are not a substitute for a proper consultation.",
      },
    ],
    relatedLinks: [
      {
        href: "/hair-transplant-london",
        label: "Hair Transplant London",
        description:
          "Explore the London route, suitability questions, and what patients should check before treatment.",
      },
      {
        href: "/assessment",
        label: "Book Free Consultation",
        description:
          "Share your concern and priorities so the first response can focus on your case.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-hair-transplant-clinic",
    title: "How to Choose a Hair Transplant Clinic in the UK",
    seoTitle: "How to Choose a Hair Transplant Clinic in the UK",
    description:
      "A practical guide to choosing a hair transplant clinic anywhere in the UK: who is responsible, how to check regulation, what a consultation should tell you, and when to travel.",
    excerpt:
      "Judge the whole treatment structure, not the sales message: who is responsible, how the clinic is regulated, how honest the plan is, and what happens after treatment day.",
    eyebrow: "Clinic selection guide",
    answerSummary:
      "The best way to choose a hair transplant clinic in the UK is to judge the whole treatment structure rather than the marketing. Find out who is medically responsible, check the doctor and the clinic on the right registers, judge whether the consultation was specific and honest about limits, and make sure aftercare is clear before you book. Price and location come after those.",
    readTime: "7 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "how to choose hair transplant clinic",
      "best hair transplant clinic uk",
      "hair transplant clinic uk",
      "choosing a hair transplant surgeon",
    ],
    keyTakeaways: [
      "Judge a clinic by responsibility, regulation, planning, and aftercare before price or location.",
      "Check both the doctor and the clinic, using the regulator for the nation the clinic is in.",
      "A calm, specific consultation that talks about limits is one of the best signals you will get.",
    ],
    sections: [
      {
        heading: "Who is responsible for your care?",
        paragraphs: [
          "One of the most important questions is also one of the simplest: who is medically responsible for your treatment plan? You should know who assesses your suitability, who approves the design, and who makes clinical decisions before, during, and after the procedure.",
          "That matters because a hair transplant is not only a cosmetic purchase. It is a treatment decision with long-term consequences for your donor area, your appearance, and your options later on.",
        ],
      },
      {
        heading: "How do you check a clinic's regulation?",
        paragraphs: [
          "Check the doctor and the clinic separately. Every doctor should be on the GMC register with a licence to practise. The clinic's regulator depends on where it is: the Care Quality Commission in England, Healthcare Improvement Scotland, or Healthcare Inspectorate Wales.",
          "Registration does not tell you a clinic is good, but a missing registration tells you it is not the right choice. Our guide to checking a surgeon's registration walks through each register step by step.",
        ],
        bullets: [
          "England: Care Quality Commission",
          "Scotland: Healthcare Improvement Scotland",
          "Wales: Healthcare Inspectorate Wales",
          "Every doctor, anywhere in the UK: the GMC register",
        ],
      },
      {
        heading: "What should the consultation tell you?",
        paragraphs: [
          "A strong consultation feels specific rather than scripted. It should cover your pattern of loss, your donor area, your priorities, the likely limits, and what a realistic result looks like for someone with your hair.",
          "If the conversation stays vague, rushes to a price, or never mentions limitations, you do not yet have enough information to judge the clinic. A clinic that sometimes tells people not to have a transplant yet is usually one worth trusting.",
        ],
        bullets: [
          "A graft range explained against your donor area, in grafts rather than hairs",
          "Who performs each stage of the procedure",
          "A written quote that lists what is included",
          "A clear aftercare plan, including who you contact and how",
        ],
      },
      {
        heading: "Should you choose a clinic near you or travel?",
        paragraphs: [
          "A local clinic makes consultations and follow-up easy, which is a real advantage. Travelling, whether to London or further, can widen your choice, but it adds cost and makes aftercare at a distance more important to get right.",
          "Our city guides set out the realistic options, journey times, and trade-offs for 25 UK cities, from Glasgow to Exeter. Whichever you choose, the checks above apply in the same way.",
        ],
      },
      {
        heading: "Why are before-and-after photos only part of the picture?",
        paragraphs: [
          "Photos can be useful, but they should not carry the whole decision. You should also know the area treated, how long after treatment the photo was taken, how many grafts were used, and whether the case resembles yours.",
          "Good proof supports the clinical discussion. It should not replace questions about planning, suitability, standards, and recovery, and it should come from the clinic's own patients.",
        ],
      },
    ],
    faq: [
      {
        question: "Is the most expensive clinic the best one?",
        answer:
          "Not necessarily. Price often reflects location, overheads, and what is included as much as clinical quality. Compare full written quotes, and judge the clinic on responsibility, regulation, and aftercare first.",
      },
      {
        question: "Should I choose a clinic close to home?",
        answer:
          "It helps, especially for follow-up. Travelling can make sense if it gives you a better option, but plan how aftercare will work once you are home before you book.",
      },
      {
        question: "Should I avoid clinics that will not answer detailed questions?",
        answer:
          "A clinic does not need to promise everything straight away, but it should explain planning, standards, likely limits, and aftercare clearly enough for you to judge it properly.",
      },
      {
        question: "Is it reasonable to ask about GMC and CQC registration?",
        answer:
          "Yes. They are basic trust checks for anyone considering treatment. In Scotland or Wales, ask about Healthcare Improvement Scotland or Healthcare Inspectorate Wales instead of the CQC.",
      },
    ],
    relatedLinks: [
      {
        href: "/blog/how-to-check-hair-transplant-surgeon-registration",
        label: "How to Check a Surgeon's Registration",
        description: "The ten-minute check on the GMC register and the clinic's regulator.",
      },
      {
        href: "/blog/hair-transplant-red-flags",
        label: "Hair Transplant Red Flags",
        description: "Ten signs that a clinic is not the right choice.",
      },
    ],
  },
  {
    slug: "how-to-check-hair-transplant-surgeon-registration",
    title: "How to Check a Hair Transplant Surgeon's Registration",
    seoTitle: "How to Check a Hair Transplant Surgeon's Registration",
    description:
      "A ten-minute check before you book: how to look up a hair transplant doctor on the GMC register, and how to check the clinic with the CQC, HIS, or HIW.",
    excerpt:
      "Search the doctor on the GMC register, check the clinic with the right regulator for where it is, and find out who does each part of the procedure.",
    eyebrow: "Checking a clinic",
    answerSummary:
      "To check a hair transplant surgeon, search their full name or seven-digit GMC number on the GMC's online medical register and confirm they hold a licence to practise with no conditions or warnings. Then check the clinic itself with the right regulator: the CQC in England, Healthcare Improvement Scotland, or Healthcare Inspectorate Wales. It takes about ten minutes, and it is the one check you should never skip.",
    readTime: "6 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "check hair transplant surgeon gmc",
      "gmc register hair transplant doctor",
      "cqc registered hair transplant clinic",
      "how to check a surgeon is registered uk",
    ],
    keyTakeaways: [
      "A doctor's registration and a clinic's registration are separate checks, and you need both.",
      "There is no UK specialty called hair transplant surgery, so check what the doctor is actually registered as.",
      "Hair transplant technicians are not a regulated profession in the UK, which makes knowing who does each step more important.",
    ],
    sections: [
      {
        heading: "Why check registration at all?",
        paragraphs: [
          "A hair transplant is a medical procedure, and UK law treats it as one. The doctor responsible for your treatment should be registered with the General Medical Council, and a clinic in England that performs surgery should be registered with the Care Quality Commission. Both registers are public and free to search.",
          "Checking them will not tell you whether a surgeon is good. It tells you whether the basic legal and professional framework is in place, and whether anything has gone wrong badly enough for a regulator to act. It is a floor rather than a recommendation, but it rules out more than you might expect.",
        ],
      },
      {
        heading: "How do I check a doctor on the GMC register?",
        paragraphs: [
          "Search the GMC's online medical register by the doctor's full name or their seven-digit GMC reference number. If a clinic will not tell you which doctor will perform or oversee your procedure, treat that as an answer in itself.",
          "Once you have the right entry, look at three things: that the doctor is registered with a licence to practise, not only registered; whether there are any conditions, undertakings, or warnings on their registration; and what they are registered as, whether that is a GP, a specialist, or neither.",
        ],
        bullets: [
          "Registration status and licence to practise",
          "Any conditions, undertakings, or warnings",
          "Whether they are on the Specialist Register, and in which specialty",
          "That the name matches the doctor you were told about",
        ],
      },
      {
        heading: "Does a hair transplant surgeon need to be a specialist?",
        paragraphs: [
          "There is no UK specialty called hair transplant surgery, so you will not find a hair restoration entry on the Specialist Register. Many experienced hair transplant doctors are registered without being on it, and some are on it for a related specialty such as plastic surgery or dermatology.",
          "That means the register cannot tell you how much hair transplant experience someone has. Ask directly how many procedures they have performed, how long hair restoration has been their focus, and whether you can see results from cases like yours. Membership of a professional society such as the ISHRS can show commitment to the field, but it is voluntary and is not regulation.",
        ],
      },
      {
        heading: "How do I check the clinic?",
        paragraphs: [
          "The clinic is a separate check from the doctor, and the register you use depends on where the clinic is.",
          "Check that the address you will actually attend is the one that is registered, since a registration for a head office or another site does not necessarily cover a different clinic. Not every service has a published rating, so a missing rating is not a warning sign on its own. A missing registration is.",
        ],
        bullets: [
          "England: search the Care Quality Commission (CQC) register and read any inspection report.",
          "Scotland: independent clinics are registered with Healthcare Improvement Scotland.",
          "Wales: independent healthcare is overseen by Healthcare Inspectorate Wales.",
        ],
      },
      {
        heading: "What about the rest of the team?",
        paragraphs: [
          "Much of the practical work in a hair transplant is usually done by a wider team. Nurses can be checked on the Nursing and Midwifery Council register. Hair transplant technicians, however, are not a regulated profession in the UK, and there is no register to check.",
          "That is not automatically a problem, but it makes one question essential: which parts of the procedure will the doctor carry out personally, and which will be delegated? Ask for the answer in writing. A clinic that is confident in how it works will explain it without hesitation.",
        ],
      },
      {
        heading: "What if the clinic is abroad?",
        paragraphs: [
          "Doctors practising in Turkey or elsewhere will not appear on the GMC register unless they are also registered in the UK, and verifying them from here is harder. Ask for the treating doctor's full name, their local registration details, and the name of the licensed facility, and be cautious if any of those are difficult to get. That extra difficulty is one of the real trade-offs of treatment abroad, alongside the lower price.",
        ],
      },
    ],
    faq: [
      {
        question: "Is it rude to ask a clinic for the doctor's GMC number?",
        answer:
          "No. Registered doctors expect it, and a GMC number is public information. A clinic that is reluctant to share it, or to tell you which doctor will treat you, is telling you something useful about how it operates.",
      },
      {
        question: "What does it mean if a doctor has conditions on their registration?",
        answer:
          "It means a regulator has placed restrictions or requirements on how they practise, and the register usually explains what they are. It does not always mean the doctor is unsafe for your procedure, but it is something to ask about directly before you go ahead.",
      },
      {
        question: "Does CQC registration mean a clinic is good?",
        answer:
          "It means the clinic is legally registered for the activities it offers and is subject to inspection. Read the latest inspection report if there is one. Registration is a minimum standard, not proof of good results.",
      },
      {
        question: "How do I check a clinic in Scotland or Wales?",
        answer:
          "In Scotland, check the register kept by Healthcare Improvement Scotland. In Wales, check with Healthcare Inspectorate Wales. The CQC only covers England.",
      },
      {
        question: "Can I check a hair transplant technician?",
        answer:
          "Not on a statutory register, because technicians are not a regulated profession in the UK. Ask the clinic about their training and experience, and which steps they carry out under the doctor's supervision.",
      },
    ],
    relatedLinks: [
      {
        href: "/our-clinical-standards",
        label: "Our Clinical Standards",
        description:
          "The standards we look for in a clinic, from doctor registration to aftercare.",
      },
      {
        href: "/blog/hair-transplant-red-flags",
        label: "Hair Transplant Red Flags",
        description: "Ten signs that a clinic is not the right choice, and what to do if you spot one.",
      },
    ],
  },
  {
    slug: "hair-transplant-red-flags",
    title: "Hair Transplant Red Flags: 10 Signs to Walk Away",
    seoTitle: "Hair Transplant Red Flags: 10 Signs to Walk Away",
    description:
      "Ten hair transplant red flags to watch for when choosing a clinic, from unnamed doctors and inflated graft counts to deposit pressure and guaranteed results.",
    excerpt:
      "Most red flags are about what a clinic avoids telling you: who is responsible, how the graft count was reached, and what happens if you change your mind.",
    eyebrow: "Clinic selection",
    answerSummary:
      "The clearest hair transplant red flags are a clinic that cannot tell you which doctor will treat you, a graft number given before anyone has properly assessed your donor area, pressure to pay a deposit quickly, and promises that sound certain. Any one of these is a reason to slow down. Two or more is usually a reason to walk away.",
    readTime: "6 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant red flags",
      "hair transplant warning signs clinic",
      "bad hair transplant clinic signs",
      "how to spot a bad hair transplant clinic",
    ],
    keyTakeaways: [
      "Most red flags are about what a clinic avoids telling you, not what it says.",
      "Pressure to decide quickly is never in your interest with a permanent procedure.",
      "A good clinic will sometimes tell you not to have a transplant yet.",
    ],
    sections: [
      {
        heading: "Why do red flags matter so much with hair transplants?",
        paragraphs: [
          "A hair transplant is permanent, and your donor area is finite. Grafts that are placed badly, or taken in greater numbers than your donor area can spare, cannot simply be put back. That makes the choice of clinic more consequential than with most cosmetic decisions.",
          "The signs below are not proof that a clinic is bad. They are points where you should stop, ask a direct question, and judge the answer.",
        ],
      },
      {
        heading: "Is anyone clearly responsible for your treatment?",
        paragraphs: [
          "Responsibility is the first thing to establish, and the easiest to obscure.",
        ],
        bullets: [
          "1. No named doctor, or a name only offered after you have paid.",
          "2. A doctor or clinic you cannot find on the relevant register.",
          "3. No clinician involved in assessing you before you are asked to commit.",
        ],
      },
      {
        heading: "Does the quote make sense for your case?",
        paragraphs: [
          "A published price band is not a red flag in itself. The problem is a specific graft number promised before anyone has looked properly at your donor area, because that is the figure your result depends on.",
        ],
        bullets: [
          "4. A firm graft count given from a single photo, with no donor assessment.",
          "5. A very high graft count for a first procedure, especially if you are young and still losing hair.",
          "6. A quote that is not in writing, or that does not say what is included.",
        ],
      },
      {
        heading: "Are you being hurried?",
        paragraphs: [
          "Urgency benefits the seller, not you. A clinic worth choosing will still be there next month.",
        ],
        bullets: [
          "7. Discounts that expire in hours or days, or a countdown timer.",
          "8. Pressure to pay a deposit before you have seen the plan and the terms in writing.",
        ],
      },
      {
        heading: "Does it sound too certain?",
        paragraphs: [
          "Hair transplants are reliable in the right hands, but outcomes vary with hair type, donor quality, and how you heal. Certainty is a marketing claim, not a clinical one.",
        ],
        bullets: [
          "9. Guaranteed density, guaranteed growth rates, or the suggestion that everyone is a candidate.",
          "10. Before-and-after photos with no timeframe, graft count, or area treated, or that you cannot tell come from the clinic's own patients.",
        ],
      },
      {
        heading: "What should you do if you spot one?",
        paragraphs: [
          "Ask about it directly and see how the clinic responds. A clear, unhurried answer can resolve a lot. A defensive or vague one tells you what you need to know.",
          "If you see two or more of these signs, get a second opinion from an unconnected clinic before paying anything, or walk away. There is always another consultation available.",
        ],
      },
    ],
    faq: [
      {
        question: "Is a cheap hair transplant always a red flag?",
        answer:
          "No. A low price is not a red flag by itself. It becomes one when you cannot see what is excluded, who is doing the work, or how the graft count was reached.",
      },
      {
        question: "Is it a red flag if a clinic says I'm not suitable?",
        answer:
          "Usually the opposite. Being told you are not a good candidate yet, or that you should stabilise your hair loss first, is one of the stronger signs that a clinic is being honest with you.",
      },
      {
        question: "Should I avoid clinics that ask for a deposit?",
        answer:
          "Not necessarily. Deposits are common for securing a treatment date. The red flag is pressure to pay before you have the plan and terms in writing, or terms that keep the deposit in almost every situation.",
      },
      {
        question: "Are online reviews reliable?",
        answer:
          "They help, but they can be curated or incentivised. Look for detailed reviews that mention recovery and aftercare, not only treatment day, and use them alongside registration checks rather than instead of them.",
      },
    ],
    relatedLinks: [
      {
        href: "/blog/how-to-check-hair-transplant-surgeon-registration",
        label: "How to Check a Surgeon's Registration",
        description: "The ten-minute check on the GMC register and the clinic's regulator.",
      },
      {
        href: "/how-we-select-clinics",
        label: "How We Select Clinics",
        description: "The criteria we use when judging standards, consultation quality, and aftercare.",
      },
    ],
  },
  {
    slug: "how-hair-transplant-graft-counts-get-inflated",
    title: "How Clinics Quote Graft Counts, and How They Get Inflated",
    seoTitle: "Hair Transplant Graft Counts: How Quotes Get Inflated",
    description:
      "Grafts versus hairs, how graft estimates are worked out, the ways counts get inflated, and the questions to ask before you accept a number.",
    excerpt:
      "A quote in hairs can look two or three times bigger than the same quote in grafts. Here is how graft numbers are reached, and how to tell when one is inflated.",
    eyebrow: "Quotes and grafts",
    answerSummary:
      "A graft is a follicular unit that usually contains one to four hairs, so a quote in hairs can look two or three times bigger than the same quote in grafts. Graft estimates get inflated when they are given without a proper donor assessment, quoted in hairs, or tied to per-graft pricing that rewards a higher number. Always ask how the figure was reached and how grafts will be counted on the day.",
    readTime: "6 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant graft estimate",
      "grafts vs hairs hair transplant",
      "hair transplant graft count",
      "how many hairs per graft",
    ],
    keyTakeaways: [
      "Grafts and hairs are different units, and some quotes blur the two.",
      "Your donor area is finite, so more grafts now is not automatically better.",
      "Per-graft pricing gives a clinic a reason to recommend more grafts, so ask why your number is right.",
    ],
    sections: [
      {
        heading: "What is the difference between a graft and a hair?",
        paragraphs: [
          "Hair grows in natural groups called follicular units, and a graft is one of those units moved during a transplant. Each graft usually holds between one and four hairs, and many patients average around two.",
          "That means a quote for 6,000 hairs might describe something in the region of 2,500 to 3,000 grafts. Neither figure is dishonest on its own, but comparing a quote in hairs with a quote in grafts makes one clinic look far more generous than it is.",
        ],
      },
      {
        heading: "How is a graft estimate normally worked out?",
        paragraphs: [
          "A proper estimate starts from the area to be treated and the density you want, then checks that against your donor area: how dense it is, how much it can safely give, and how much should be kept back for hair you may lose later.",
          "The result should be a range rather than a single promise, because the exact number that can be taken well is only known on the day. A good clinic explains the range and what it is meant to achieve.",
        ],
      },
      {
        heading: "How do graft counts get inflated?",
        paragraphs: [
          "Inflation is rarely a single lie. It is usually one of a few habits that make a number look bigger or more certain than it is.",
        ],
        bullets: [
          "Quoting hairs rather than grafts, or switching between the two.",
          "Giving a firm count from photos alone, with no donor assessment.",
          "Leading with the top of a wide range as if it were the plan.",
          "Dividing natural multi-hair units into more, smaller grafts to raise the count, sometimes called graft splitting.",
          "Per-graft pricing, where every extra graft adds to the bill.",
        ],
      },
      {
        heading: "Why is a bigger number not always better?",
        paragraphs: [
          "Your donor area is the only supply you will ever have. Taking more grafts than it can spare can leave it visibly thin, and grafts used now are not available for any loss you have in ten years' time.",
          "The right plan often uses fewer grafts than a patient hoped for, especially for a younger patient whose hair loss has not settled. A clinic that tells you this is protecting your future options, not underselling you.",
        ],
      },
      {
        heading: "What should you ask before accepting a number?",
        paragraphs: [
          "With fixed price bands, like ours, the exact count within a band does not change what you pay, which removes the incentive to add grafts. It is still worth asking why your case sits in the band it does, and the same questions apply to any clinic.",
        ],
        bullets: [
          "How did you reach this number, and did you assess my donor area?",
          "Is this figure in grafts or hairs?",
          "How are grafts counted on the day, and will I receive the final count in writing?",
          "What happens to the price if fewer grafts can be taken?",
          "How many grafts could my donor area give over my lifetime?",
        ],
      },
    ],
    faq: [
      {
        question: "How many hairs are in a graft?",
        answer:
          "Usually one to four. Many patients average around two hairs per graft, but it varies with hair type and from person to person.",
      },
      {
        question: "Is 5,000 grafts in one procedure realistic?",
        answer:
          "For some patients with a strong donor area, yes. For many it is not, and taking too many grafts can leave the donor area visibly thin. Whether it is realistic for you depends on an assessment, not on the size of the area you want covered.",
      },
      {
        question: "Will I be told the final graft count?",
        answer:
          "You should be. Ask before booking how grafts are counted on the day and whether you will receive the final count in writing.",
      },
      {
        question: "Why did two clinics give me very different graft numbers?",
        answer:
          "They may be planning different coverage, working from photos rather than an examination, or counting in different units. Ask each to explain its number and the area and density it is meant to achieve.",
      },
    ],
    relatedLinks: [
      {
        href: "/prices",
        label: "Our Prices",
        description: "Fixed prices by treatment, technique, and graft band.",
      },
      {
        href: "/hair-transplant-cost-london",
        label: "Hair Transplant Cost Guide",
        description: "Per-graft maths, what shapes a quote, and how to compare value.",
      },
    ],
  },
  {
    slug: "hair-transplant-deposit-and-refund-terms",
    title: "Hair Transplant Deposits and Refunds: What to Check Before Paying",
    seoTitle: "Hair Transplant Deposits and Refunds: What to Check",
    description:
      "What a hair transplant deposit should secure, the refund terms to check in writing, and how to protect the money you pay, including abroad.",
    excerpt:
      "A deposit should secure a date, not your decision. Check what it covers, when you can get it back, and how you pay it.",
    eyebrow: "Before you pay",
    answerSummary:
      "Before paying a hair transplant deposit, get the terms in writing and check four things: what the deposit secures, when and how it can be refunded, what happens if you are found unsuitable on the day, and what happens if the clinic cancels. Paying by credit card can add protection. If the terms are vague, or you are pushed to pay before you have seen them, wait.",
    readTime: "5 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant deposit refund",
      "hair transplant deposit",
      "hair transplant cancellation policy",
      "hair transplant refund",
    ],
    keyTakeaways: [
      "A deposit should secure a date, not your decision.",
      "Unsuitability on the day and clinic cancellations should both be covered in writing.",
      "Paying by credit card can give extra protection under Section 75.",
    ],
    sections: [
      {
        heading: "Why do clinics ask for a deposit?",
        paragraphs: [
          "A hair transplant takes most of a day and ties up a doctor, a team, and a treatment room. A deposit holds that date for you, which is reasonable in principle.",
          "Amounts vary widely between clinics. What matters more than the size of the deposit is what it secures and when you can get it back.",
        ],
      },
      {
        heading: "What should the written terms cover?",
        paragraphs: [
          "Ask for the terms in writing before you pay, and check that they answer each of these.",
        ],
        bullets: [
          "The amount, and whether it comes off the total price",
          "What it secures, and when the balance is due",
          "What you get back if you cancel, and how much notice you need to give",
          "What happens if you are found unsuitable on the day",
          "What happens if the clinic cancels or moves your date",
          "What happens if you are unwell and cannot attend",
        ],
      },
      {
        heading: "What happens if you change your mind?",
        paragraphs: [
          "That depends on the clinic. Some refund in full up to a set date before treatment, some keep part of the deposit, and some keep all of it.",
          "Depending on how and where you booked, consumer law may give you cancellation rights, but healthcare services can be treated differently, so do not assume a legal right applies. Rely on what the written terms say, and if they are unclear, ask for clarification in writing before you pay.",
        ],
      },
      {
        heading: "How can you protect the money you pay?",
        paragraphs: [
          "How you pay makes a real difference if something goes wrong.",
        ],
        bullets: [
          "Credit card: under Section 75 of the Consumer Credit Act, the card provider can be jointly responsible for purchases with a cash price of more than £100 and up to £30,000, even if you only paid the deposit on the card.",
          "Debit card: a chargeback may be possible through your bank, but it is a voluntary scheme rather than a legal right.",
          "Bank transfer: this gives you the least protection, so avoid it for deposits where you can.",
        ],
      },
      {
        heading: "What about deposits for treatment abroad?",
        paragraphs: [
          "UK consumer protections are harder to rely on when the clinic is abroad, and flights and hotels booked separately are not usually refundable if treatment is cancelled. Check whether the clinic's terms cover your travel costs if they cancel, and whether a package price includes anything you would lose.",
          "The same principles apply to us. Ask for our terms in writing before you pay anything, and compare them with any other quote you have.",
        ],
      },
    ],
    faq: [
      {
        question: "How much is a typical hair transplant deposit?",
        answer:
          "It varies widely between clinics. What matters more than the amount is what it secures and when you can get it back.",
      },
      {
        question: "Should a deposit be refundable?",
        answer:
          "At least in some circumstances, such as the clinic cancelling or you being found unsuitable. Terms that keep the deposit in every situation deserve a second look.",
      },
      {
        question: "Is paying a deposit by bank transfer safe?",
        answer:
          "It gives you the least protection if something goes wrong. A credit card is usually the safer way to pay a deposit.",
      },
      {
        question: "Can the price change after I pay a deposit?",
        answer:
          "It should not without a reason set out in advance, such as a change in the agreed graft range after assessment. Ask how the final price is confirmed and whether you lose the deposit if you decline a revised quote.",
      },
    ],
    relatedLinks: [
      {
        href: "/prices",
        label: "Our Prices",
        description: "Fixed prices by treatment, technique, and graft band, confirmed in writing.",
      },
      {
        href: "/blog/hair-transplant-red-flags",
        label: "Hair Transplant Red Flags",
        description: "Deposit pressure is one of ten signs to slow down.",
      },
    ],
  },
  {
    slug: "hair-transplant-second-opinion",
    title: "Getting a Second Opinion on a Hair Transplant Plan",
    seoTitle: "Hair Transplant Second Opinion: When and How",
    description:
      "When a second opinion on a hair transplant plan is worth getting, who to ask, what to bring, and how to compare two plans that disagree.",
    excerpt:
      "A second opinion is normal practice for a permanent procedure. The useful part is not who is right, but why the two plans differ.",
    eyebrow: "Decision support",
    answerSummary:
      "A second opinion on a hair transplant plan is worth getting whenever the stakes feel high: a large graft number, a young age, female or diffuse thinning, a repair case, or a plan you do not fully understand. Share the first clinic's written plan and photos with a different, unconnected clinic, and ask them to explain where they agree and where they would do it differently.",
    readTime: "5 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant second opinion",
      "second opinion hair transplant plan",
      "hair transplant consultation second opinion",
    ],
    keyTakeaways: [
      "A second opinion is normal for a permanent procedure, not a sign of distrust.",
      "The most useful second opinion comes from a provider with no connection to the first.",
      "Where the two plans differ is where the useful questions are.",
    ],
    sections: [
      {
        heading: "When is a second opinion worth getting?",
        paragraphs: [
          "You do not need one for every consultation, but some situations raise the stakes enough that a second look is sensible.",
        ],
        bullets: [
          "The graft number is large, or much larger than you expected",
          "You are younger and still actively losing hair",
          "Your thinning is diffuse, or female pattern",
          "You were told you are not suitable and want to understand why",
          "You are considering a repair of an earlier transplant",
          "You are comparing a UK plan with one from abroad",
          "You simply do not understand the plan you have been given",
        ],
      },
      {
        heading: "Who should give the second opinion?",
        paragraphs: [
          "Choose a clinic with no connection to the first: not another branch of the same group, and not a clinic introduced by the same agency. That includes us, if we introduced you to the first clinic.",
          "If your question is about the cause of your hair loss rather than the transplant itself, your GP can assess it and refer you to dermatology where appropriate. The NHS does not usually fund cosmetic hair transplants, but diagnosing hair loss is a separate matter.",
        ],
      },
      {
        heading: "What should you bring?",
        paragraphs: [
          "The more of the first plan you can share, the more specific the second opinion can be.",
        ],
        bullets: [
          "The written plan and quote",
          "The graft estimate, and any drawing of the area to be treated",
          "Clear daylight photos of your hairline, temples, crown, and donor area",
          "Your relevant medical history and any medication you take",
          "The specific questions you want answered",
        ],
      },
      {
        heading: "How do you compare two plans that disagree?",
        paragraphs: [
          "Put both plans against the same questions: how many grafts and why, where the hairline sits, which technique, how future hair loss is planned for, and how much of the donor area is kept in reserve.",
          "Where they differ, ask each clinic to respond to the other's reasoning. A clinic that can explain why it disagrees is usually more trustworthy than one that simply says the other is wrong.",
        ],
      },
      {
        heading: "Does a second opinion cost anything?",
        paragraphs: [
          "Many clinics offer a free first consultation, including us, so a second opinion from a clinic often costs nothing. A private appointment with a dermatologist to investigate the cause of hair loss will usually be charged.",
        ],
      },
    ],
    faq: [
      {
        question: "Will the first clinic mind?",
        answer:
          "A good clinic will not. Second opinions are common with permanent procedures, and a clinic that discourages you from getting one is showing you a red flag.",
      },
      {
        question: "What if the two opinions disagree completely?",
        answer:
          "Ask each clinic to explain its reasoning in terms of your donor area and future hair loss. If you still cannot choose, a third opinion or waiting is better than a rushed decision.",
      },
      {
        question: "Can I get a second opinion remotely?",
        answer:
          "Often, yes, from good photos and a written plan. It is useful for spotting obvious differences, although a final plan still needs a proper assessment.",
      },
      {
        question: "Can I send you another clinic's plan?",
        answer:
          "Yes, as part of a free consultation request. If we introduced you to that clinic, get your second opinion somewhere unconnected instead.",
      },
    ],
    relatedLinks: [
      {
        href: "/assessment",
        label: "Book a Free Consultation",
        description: "Share your plan and photos, and the team replies the same working day.",
      },
      {
        href: "/blog/hair-transplant-red-flags",
        label: "Hair Transplant Red Flags",
        description: "Signs that a plan or clinic deserves a closer look.",
      },
    ],
  },
  {
    slug: "hair-transplant-gone-wrong",
    title: "What to Do If a Hair Transplant Goes Wrong",
    seoTitle: "Hair Transplant Gone Wrong? Complaints and Next Steps",
    description:
      "How to tell a real problem from normal recovery, when to get urgent help, how to complain about a private clinic in the UK, and what to know before a repair.",
    excerpt:
      "Separate urgent problems from disappointing results, raise it with the clinic in writing, and know which complaint routes apply before you consider a repair.",
    eyebrow: "After treatment",
    answerSummary:
      "If a hair transplant seems to have gone wrong, first separate urgent problems from disappointing results. Signs of infection need prompt medical attention, while poor growth usually cannot be judged until at least 10 to 12 months after surgery. For a genuine problem, raise it with the clinic in writing, then use the complaints route that applies, and get an independent assessment before agreeing to any repair.",
    readTime: "6 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant gone wrong uk",
      "hair transplant complaint",
      "failed hair transplant what to do",
      "hair transplant repair",
    ],
    keyTakeaways: [
      "Signs of infection need prompt medical help; disappointing growth needs time before you judge it.",
      "Complain to the clinic in writing first, and keep records from the start.",
      "Get an independent assessment before any repair procedure.",
    ],
    sections: [
      {
        heading: "Is something wrong, or is it just early?",
        paragraphs: [
          "A lot of what worries patients in the first months is normal: redness, scabbing, some swelling, and the shedding of transplanted hairs a few weeks after surgery. New hair usually starts to appear at around four months, and the NHS puts the full result at 10 to 18 months after surgery.",
          "Some signs should not wait, though. Spreading redness, increasing pain, heat, pus, or a fever can point to infection. Contact the clinic urgently, call NHS 111 if you cannot reach them, and in an emergency call 999.",
        ],
      },
      {
        heading: "What are the most common real problems?",
        paragraphs: [
          "Once the early stages have passed, the problems patients raise usually fall into a few groups.",
        ],
        bullets: [
          "Poor growth that is still poor 10 to 12 months or more after surgery",
          "A hairline that looks unnatural in shape, height, or direction",
          "A donor area that looks visibly thin",
          "Scarring that is worse than you were told to expect",
          "A result that differs from the plan you agreed",
        ],
      },
      {
        heading: "How do you raise it with the clinic?",
        paragraphs: [
          "Start in writing. Describe the problem with dates, include clear photos taken in the same light over time, and ask for a review appointment. Many problems are resolved at this stage, and a good clinic will want to see you.",
          "Keep copies of everything from the beginning: your consent forms, the written plan and quote, graft counts, photos, and all messages. Records made at the time carry far more weight than recollections later.",
        ],
      },
      {
        heading: "Where can you take a complaint?",
        paragraphs: [
          "If the clinic does not resolve it, the route depends on where you were treated and what the complaint is about.",
        ],
        bullets: [
          "The clinic's own complaints procedure always comes first.",
          "In England, many independent providers belong to the Independent Sector Complaints Adjudication Service (ISCAS), which can review complaints a member clinic has not resolved. Ask whether yours does.",
          "The CQC does not resolve individual complaints, but it wants to hear about poor care and uses that information in its inspections.",
          "Concerns about a doctor's conduct or competence can be raised with the GMC.",
          "In Scotland and Wales, check the complaints guidance published by Healthcare Improvement Scotland or Healthcare Inspectorate Wales.",
          "If you are considering a negligence claim, speak to a clinical negligence solicitor early, as time limits apply, usually three years.",
        ],
      },
      {
        heading: "What should you know before a repair?",
        paragraphs: [
          "Many poor results can be improved, but what is possible depends on how much donor hair you have left and what went wrong. Wait until the first result has matured before deciding, unless the problem is clearly structural, such as a hairline placed far too low.",
          "Get an independent assessment before agreeing to a repair, even if the original clinic offers one at a reduced price. The question is not only whether they can fix it, but whether you trust them to after what happened.",
        ],
      },
      {
        heading: "What if you were treated abroad?",
        paragraphs: [
          "Complain to the clinic first, as you would in the UK. UK regulators and complaint schemes will not usually be able to act on a clinic abroad, which is one of the trade-offs of treatment overseas. UK doctors can still assess you, treat complications, and advise on repair options.",
        ],
      },
    ],
    faq: [
      {
        question: "How long should I wait before deciding a hair transplant has failed?",
        answer:
          "Usually not before 10 to 12 months, and the full result can take up to 18 months, because growth continues well after new hair first appears. Infection or unexpected scarring should be raised straight away, though.",
      },
      {
        question: "Can I get a refund if my hair transplant didn't work?",
        answer:
          "It depends on the clinic's terms and what went wrong. Poor growth is not always treated as a failure, which is why a clear written plan and any guarantee terms matter before treatment.",
      },
      {
        question: "Who do I complain to about a private hair transplant clinic?",
        answer:
          "Start with the clinic in writing. In England, if the clinic belongs to ISCAS you can escalate there, and you can tell the CQC about poor care. Concerns about a doctor go to the GMC.",
      },
      {
        question: "Can a bad hair transplant be fixed?",
        answer:
          "Often it can be improved, but it depends on how much donor hair is left and what the problem is. Get an independent assessment before agreeing to any repair.",
      },
    ],
    relatedLinks: [
      {
        href: "/hair-transplant-recovery-timeline",
        label: "Hair Transplant Recovery Timeline",
        description: "What is normal at each stage, from the first week to the first year.",
      },
      {
        href: "/hair-transplant-side-effects",
        label: "Hair Transplant Side Effects",
        description: "Common short-term effects, and when to ask the clinic.",
      },
    ],
  },
  {
    slug: "hair-transplant-agency-vs-clinic",
    title: "Hair Transplant Agency or Clinic: What the Difference Means",
    seoTitle: "Hair Transplant Agency vs Clinic: What's the Difference?",
    description:
      "What a hair transplant agency does, how agencies are paid, when using one makes sense, and the questions to ask any agency, including us.",
    excerpt:
      "A clinic performs your procedure. An agency helps you choose one. Here is what that means for price, responsibility, and the questions you should ask.",
    eyebrow: "How we work",
    answerSummary:
      "A hair transplant clinic performs the procedure. A hair transplant agency, like UK Hair Transplant, does not: it helps you understand your options, compares clinics, and refers you to one. An agency can save time and add a layer of selection, but it has a commercial interest in the routes it offers. Ask any agency how it is paid, how it chooses clinics, and whether you will know the treating doctor before you commit.",
    readTime: "5 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant agency",
      "hair transplant agency vs clinic",
      "hair transplant broker",
      "hair transplant referral service",
    ],
    keyTakeaways: [
      "Clinics treat patients; agencies select and refer.",
      "An agency is only as good as its selection criteria and its honesty about how it is paid.",
      "You should always be able to check the treating doctor and clinic yourself before committing.",
    ],
    sections: [
      {
        heading: "What is the difference between a clinic and an agency?",
        paragraphs: [
          "A clinic is the registered provider that carries out your procedure. Its doctors plan and perform the treatment, and it is clinically responsible for your care.",
          "An agency is not a clinic and does not perform procedures. It helps you research, compare routes, prepare your enquiry, and choose a clinic, then introduces you to it. Some agencies, including us, also offer their own packages at published prices.",
        ],
      },
      {
        heading: "How do hair transplant agencies make money?",
        paragraphs: [
          "Agencies are usually paid by the clinics they refer patients to, or earn a margin on the packages they sell. That is not a problem in itself, but it is a commercial interest, and you should know about it.",
          "To be plain about ours: we offer our own London and Turkiye routes at published prices, and we benefit when patients choose them. Our editorial policy explains how we handle that in what we publish.",
        ],
      },
      {
        heading: "When does using an agency make sense?",
        paragraphs: [
          "An agency is most useful early in the decision, when you are not yet sure what to look for or which route suits you.",
        ],
        bullets: [
          "You are comparing UK and overseas options and want them side by side",
          "You do not feel confident judging clinics on your own",
          "You want help preparing an enquiry so the first reply is specific to your case",
          "You want one point of contact while you compare",
        ],
      },
      {
        heading: "When might going direct be better?",
        paragraphs: [
          "If you already know which clinic and surgeon you want, going direct is simpler, and you build the relationship with the clinic from the start.",
          "Price is not predictable either way. Booking through an agency can cost more, less, or the same as going direct, depending on the arrangement and what the package includes. If you have a specific clinic in mind, ask them directly too, and compare full written quotes.",
        ],
      },
      {
        heading: "What should you ask any agency, including us?",
        paragraphs: [
          "These questions work for any agency, and a good one will answer them without hesitation.",
        ],
        bullets: [
          "How are you paid, and by whom?",
          "How do you choose clinics, and have you ever stopped working with one?",
          "Will I know which clinic and doctor will treat me, and be able to check their registration, before I pay?",
          "Who is clinically responsible for my treatment?",
          "Who do I contact if something goes wrong after treatment?",
          "Exactly what does the price include?",
        ],
      },
    ],
    faq: [
      {
        question: "Is UK Hair Transplant a clinic?",
        answer:
          "No. We are a guidance and referral service. Treatment is carried out by independent partner clinics, and the clinic is responsible for your clinical care.",
      },
      {
        question: "Is it more expensive to book through an agency?",
        answer:
          "Not necessarily. Some agencies charge more than the clinic would directly, some are priced the same, and packages can differ in what they include. Compare the full written quote, not the headline figure.",
      },
      {
        question: "Who is responsible if something goes wrong?",
        answer:
          "Clinically, the clinic and treating doctor are responsible for your care. A good agency should still help you raise and resolve problems, so ask any agency what support it provides after treatment.",
      },
      {
        question: "Are hair transplant agencies regulated?",
        answer:
          "Agencies that do not provide treatment are not regulated in the way clinics are. That is why the clinic's own registration and the treating doctor's registration are the checks that matter most.",
      },
    ],
    relatedLinks: [
      {
        href: "/how-we-work",
        label: "How We Work",
        description: "How we guide patients, select clinics, and prepare consultations.",
      },
      {
        href: "/editorial-policy",
        label: "Editorial Policy",
        description: "Who writes our content, and our commercial interest in the routes we describe.",
      },
    ],
  },
  {
    slug: "how-to-read-hair-transplant-reviews",
    title: "Hair Transplant Reviews: How to Tell Real Feedback From Marketing",
    seoTitle: "Hair Transplant Reviews: How to Spot Real Feedback",
    description:
      "How to read hair transplant reviews properly: what makes a review useful, the signs of curated or incentivised feedback, and what UK law now says about fake reviews.",
    excerpt:
      "The most useful reviews are specific, spread over time, and written after the result has had time to grow. Here is how to tell them apart from marketing.",
    eyebrow: "Clinic selection",
    answerSummary:
      "Useful hair transplant reviews are specific, spread over time, and written months after surgery, when the result can actually be judged. Be cautious with reviews posted on treatment day, clusters of similar five-star reviews, and anything offered in exchange for a discount. Since April 2025, fake reviews and hidden incentivised reviews have been illegal in the UK, but that does not mean every review you see is genuine.",
    readTime: "5 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant reviews",
      "hair transplant clinic reviews uk",
      "are hair transplant reviews real",
      "fake hair transplant reviews",
    ],
    keyTakeaways: [
      "A review written on treatment day can judge the service, not the result.",
      "Detail, timing, and a spread of dates matter more than the star rating.",
      "Fake and hidden incentivised reviews are now banned in the UK, but still worth watching for.",
    ],
    sections: [
      {
        heading: "Why are hair transplant reviews harder to judge than most?",
        paragraphs: [
          "A hair transplant result takes around a year to show, and the NHS puts the full result at 10 to 18 months. Most reviews are written far sooner, often on the day or within the first week, when the patient can describe how they were treated but not how their hair has grown.",
          "Both kinds of review are useful, but they answer different questions. A treatment-day review tells you about communication and care. A review written a year later tells you about the outcome.",
        ],
      },
      {
        heading: "What does a useful review look like?",
        paragraphs: [
          "Useful reviews read like a real person's experience rather than a slogan. They mention specifics and are not all positive in exactly the same way.",
        ],
        bullets: [
          "How long after surgery it was written",
          "The area treated and, ideally, roughly how many grafts",
          "What recovery and aftercare were actually like",
          "Something that was not perfect, and how the clinic handled it",
        ],
      },
      {
        heading: "What are the signs of curated or incentivised reviews?",
        paragraphs: [
          "No single sign proves a review is fake, but a pattern should make you look more carefully.",
        ],
        bullets: [
          "Many five-star reviews posted within a few days of each other",
          "Short, similar wording across several reviewers",
          "Reviews that praise the result within days of surgery",
          "A discount or free product offered in exchange for a review",
          "Reviews only on the clinic's own website, with none on independent platforms",
          "Negative reviews met with hostility, or not answered at all",
        ],
      },
      {
        heading: "What does UK law say about fake reviews?",
        paragraphs: [
          "Since April 2025, under the Digital Markets, Competition and Consumers Act 2024, it has been illegal for businesses to post or commission fake reviews, to publish incentivised reviews without making that clear, or to present reviews in a misleading way, for example by hiding negative ones. The Competition and Markets Authority can now enforce these rules directly.",
          "That raises the stakes for clinics that bend the rules, but it does not guarantee that every review you read is genuine. The practical checks above still matter.",
        ],
      },
      {
        heading: "How should reviews fit into your decision?",
        paragraphs: [
          "Use reviews to judge how a clinic treats people: whether it communicates clearly, keeps its promises, and looks after patients once they are home. Use registration checks, the consultation, and a written plan to judge whether it is the right clinic for your hair.",
          "If the reviews and the consultation tell different stories, trust the consultation and the registers, and ask the clinic about the difference.",
        ],
      },
    ],
    faq: [
      {
        question: "Are Trustpilot and Google reviews reliable for hair transplants?",
        answer:
          "They are useful for judging service and communication, especially when there are many reviews spread over time. Look for detailed reviews written months after surgery, and read the negative ones and how the clinic responded.",
      },
      {
        question: "Is it illegal for a clinic to post fake reviews?",
        answer:
          "Yes. Since April 2025, posting or commissioning fake reviews, and publishing incentivised reviews without disclosing it, are banned practices under UK consumer law.",
      },
      {
        question: "Should I trust reviews with before-and-after photos?",
        answer:
          "They can be more useful than text alone, but only if you know the timeframe, the area treated, and that the patient was treated by that clinic. A photo taken a few weeks after surgery cannot show the final result.",
      },
      {
        question: "How many reviews should a clinic have?",
        answer:
          "There is no magic number. A steady spread of detailed reviews over months or years is more reassuring than a large number posted in a short burst.",
      },
    ],
    relatedLinks: [
      {
        href: "/blog/hair-transplant-red-flags",
        label: "Hair Transplant Red Flags",
        description: "Photos without context are one of ten signs to slow down.",
      },
      {
        href: "/how-we-select-clinics",
        label: "How We Select Clinics",
        description: "The criteria we use when judging standards and aftercare.",
      },
    ],
  },
  {
    slug: "hair-transplant-guarantees",
    title: "Hair Transplant Guarantees: What They Actually Cover",
    seoTitle: "Hair Transplant Guarantees: What They Actually Cover",
    description:
      "What hair transplant growth and graft survival guarantees usually cover, the conditions attached, what they cannot cover, and the questions to ask before relying on one.",
    excerpt:
      "A guarantee is only as useful as its conditions. Here is what growth guarantees usually cover, what they exclude, and what to ask.",
    eyebrow: "Before you pay",
    answerSummary:
      "Hair transplant guarantees usually promise a repeat procedure, not a refund, if growth falls below a stated level, and only if you meet conditions such as following aftercare, attending reviews, and sometimes taking medication. They cannot cover hair you lose naturally later. Read the written terms, check who decides whether the guarantee applies, and treat any promise of complete success with caution.",
    readTime: "5 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant guarantee",
      "hair transplant growth guarantee",
      "graft survival guarantee",
      "hair transplant lifetime guarantee",
    ],
    keyTakeaways: [
      "Most guarantees offer a repeat procedure rather than your money back.",
      "The conditions matter more than the headline promise.",
      "No guarantee can cover hair loss that continues naturally after treatment.",
    ],
    sections: [
      {
        heading: "What do hair transplant guarantees usually promise?",
        paragraphs: [
          "Most guarantees fall into one of a few types: a growth guarantee, where the clinic repeats some or all of the procedure if growth falls below a set level; a graft survival guarantee; or a lifetime guarantee, which usually refers to the transplanted hairs rather than your hair in general.",
          "The remedy is usually further treatment at the same clinic, not a refund. That is worth knowing before you rely on it, because it assumes you would want to go back to the clinic whose first attempt did not work.",
        ],
      },
      {
        heading: "What conditions are usually attached?",
        paragraphs: [
          "Guarantees almost always come with conditions, and missing one can void the promise.",
        ],
        bullets: [
          "Following the aftercare instructions exactly",
          "Attending review appointments or sending photos at set intervals",
          "Sometimes taking prescribed medication to protect existing hair",
          "Raising a claim within a time limit, often at around twelve months",
          "Travel and accommodation for a repeat procedure often being at your own cost",
        ],
      },
      {
        heading: "What can a guarantee not cover?",
        paragraphs: [
          "A transplant moves hair; it does not stop your hair loss. If the hair around the transplanted area continues to thin, the result can look weaker over time even though the grafts themselves survived. No guarantee covers that, and a clinic that implies otherwise is overselling.",
          "Guarantees also cannot fix a poor plan. A hairline placed too low or a donor area over-harvested is a design problem, and repeating the procedure may not be the right remedy.",
        ],
      },
      {
        heading: "Who decides whether the guarantee applies?",
        paragraphs: [
          "Usually the clinic does, which is the weakness of most guarantees. Ask how growth is measured, whether photos taken at home count, and what happens if you disagree with the clinic's assessment.",
          "Separately from any guarantee, UK consumer law generally expects a service to be carried out with reasonable care and skill. A guarantee sits on top of your rights; it does not replace them.",
        ],
      },
      {
        heading: "Is a guarantee a good sign or a red flag?",
        paragraphs: [
          "Neither on its own. A clear, conditional guarantee can show that a clinic stands behind its work. A promise of guaranteed density or complete success is a different thing: the NHS advises being wary of adverts that guarantee complete success, because no surgeon can promise that.",
          "The best test is the same as for anything else: ask for the terms in writing, and judge the clinic on responsibility, regulation, and aftercare first.",
        ],
      },
    ],
    faq: [
      {
        question: "Do hair transplant guarantees include a refund?",
        answer:
          "Usually not. Most offer a repeat procedure, in whole or in part, if growth falls below a stated level. Check whether any refund is possible, and in what circumstances.",
      },
      {
        question: "What is a lifetime hair transplant guarantee?",
        answer:
          "It usually refers to the transplanted hairs being permanent, not to your hair as a whole. It does not cover hair loss that continues elsewhere on your scalp.",
      },
      {
        question: "Can a clinic refuse to honour a guarantee?",
        answer:
          "It can if you have not met the conditions, which is why they need to be clear and in writing before treatment. Keep records of your aftercare and review photos from the start.",
      },
      {
        question: "Should I choose a clinic because it offers a guarantee?",
        answer:
          "Not on that basis alone. A guarantee is worth having, but responsibility, regulation, a realistic plan, and good aftercare matter more to the result.",
      },
    ],
    relatedLinks: [
      {
        href: "/blog/hair-transplant-gone-wrong",
        label: "What to Do If a Hair Transplant Goes Wrong",
        description: "Complaint routes, time limits, and what to know before a repair.",
      },
      {
        href: "/blog/how-to-compare-hair-transplant-quotes",
        label: "How to Compare Two Quotes",
        description: "Where a guarantee fits in a line-by-line comparison.",
      },
    ],
  },
  {
    slug: "how-to-compare-hair-transplant-quotes",
    title: "How to Compare Two Hair Transplant Quotes Line by Line",
    seoTitle: "How to Compare Hair Transplant Quotes Line by Line",
    description:
      "A line-by-line checklist for comparing two hair transplant quotes, with an illustrative example showing why the cheaper quote is not always the lower cost.",
    excerpt:
      "Two quotes only compare fairly when they describe the same thing. Here is the checklist, and a worked example of where the differences hide.",
    eyebrow: "Quotes and grafts",
    answerSummary:
      "To compare two hair transplant quotes, put them side by side against the same list: graft range and the unit it is quoted in, technique, who performs the procedure, the clinic's registration, what is included, aftercare, deposit and refund terms, any guarantee, and travel costs. Two quotes that look far apart often move much closer, or swap places, once the exclusions are added back in.",
    readTime: "5 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "hair transplant quote comparison",
      "compare hair transplant quotes",
      "hair transplant quote what to check",
      "hair transplant price comparison",
    ],
    keyTakeaways: [
      "Compare the same things in the same units, or the comparison means nothing.",
      "Add the exclusions back in before judging which quote is cheaper.",
      "The deciding line is usually aftercare and responsibility, not price.",
    ],
    sections: [
      {
        heading: "Why do two quotes rarely compare like for like?",
        paragraphs: [
          "Clinics quote in different units, include different things, and describe their plans at different levels of detail. One quote may give a firm number of grafts, another a range, and a third a count of hairs. One may include medication and PRP; another may list them as extras.",
          "Until you line them up against the same questions, you are comparing presentation rather than treatment.",
        ],
      },
      {
        heading: "What should you compare?",
        paragraphs: [
          "Write each quote against this list. If a quote does not answer a line, ask the clinic in writing.",
        ],
        bullets: [
          "Graft range, and whether it is in grafts or hairs",
          "Technique, and whether shaving is needed",
          "The doctor responsible, and who performs each stage",
          "The clinic's registration with the right regulator",
          "Exactly what is included: medication, PRP, aftercare products",
          "Aftercare: review appointments, contact, and for how long",
          "Deposit amount and refund terms",
          "Any guarantee, and its conditions",
          "Travel, accommodation, and time off work",
        ],
      },
      {
        heading: "What does a worked comparison look like?",
        paragraphs: [
          "The two quotes below are illustrative, not real clinics. Quote A is £3,000 for up to 3,500 grafts, with PRP and medication charged as extras and a single follow-up call. Quote B is £3,400 for 2,800 to 3,200 grafts, with PRP and medication included and reviews at one week and at three, six, and twelve months.",
          "Quote A looks cheaper and bigger. Once the extras are added back, the gap narrows or disappears. And A's higher graft figure is only meaningful if your donor area can supply it and your plan needs it; if it was given without a proper donor assessment, it is a promise rather than a plan. B's structured follow-up is worth more than it appears on paper, because aftercare is where problems are caught early.",
        ],
      },
      {
        heading: "Which differences matter most?",
        paragraphs: [
          "Price differences are the easiest to see and often the least important. The lines that most affect your result are who is responsible for the procedure, whether the graft range was assessed properly, and how aftercare works once you are home.",
          "If two quotes are close on those, choose on price and convenience. If they are not, the cheaper quote is rarely the better value.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I tell a clinic about another clinic's quote?",
        answer:
          "You can. A good clinic will explain where its plan differs and why, rather than simply matching the price. That explanation is often the most useful thing you get from the comparison.",
      },
      {
        question: "Why is one quote so much cheaper than the other?",
        answer:
          "Usually because it includes less, uses a different team structure, or is based on a rougher graft estimate. Ask what is excluded and who performs each stage before assuming it is better value.",
      },
      {
        question: "Is a fixed price better than a per-graft price?",
        answer:
          "A fixed price within a graft band removes the incentive to add grafts and makes budgeting simpler. A per-graft price can be fair too, as long as the count is assessed properly and confirmed in writing.",
      },
      {
        question: "Should I include travel costs in the comparison?",
        answer:
          "Yes, including time off work and any overnight stay. For treatment abroad, also consider flights, accommodation, and the cost of any follow-up visit.",
      },
    ],
    relatedLinks: [
      {
        href: "/prices",
        label: "Our Prices",
        description: "Fixed prices by treatment, technique, and graft band, with inclusions listed.",
      },
      {
        href: "/blog/how-hair-transplant-graft-counts-get-inflated",
        label: "How Graft Counts Get Inflated",
        description: "Grafts versus hairs, and how to tell when a number is too high.",
      },
    ],
  },
  {
    slug: "how-to-vet-a-turkish-hair-transplant-clinic",
    title: "How to Vet a Turkish Hair Transplant Clinic From the UK",
    seoTitle: "How to Vet a Turkish Hair Transplant Clinic From the UK",
    description:
      "The checks to make before booking a hair transplant in Turkey: licences, who performs the procedure, how many patients the clinic treats a day, packages, aftercare, and insurance.",
    excerpt:
      "UK registers do not cover Turkish clinics, so the checks are different. Here is what to verify before you book, and what changes once you are home.",
    eyebrow: "Treatment abroad",
    answerSummary:
      "Before booking a hair transplant in Turkey, ask for the facility's Ministry of Health licence and its International Health Tourism Authorisation Certificate, get the full name of the doctor who will treat you, find out how many procedures the clinic runs each day, and check exactly what the package includes. Then plan aftercare and insurance for when you are home, because both are harder to arrange than for treatment in the UK.",
    readTime: "6 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "turkey hair transplant risks",
      "how to choose a hair transplant clinic in turkey",
      "turkey hair transplant clinic checks",
      "hair transplant turkey safe",
    ],
    keyTakeaways: [
      "UK registers do not cover Turkish clinics, so ask for Turkish licences and check them.",
      "Find out who performs each stage, and how many patients the clinic treats a day.",
      "Plan aftercare and insurance for when you are home before you book.",
    ],
    sections: [
      {
        heading: "Why do Turkish clinics need different checks?",
        paragraphs: [
          "The GMC and CQC registers only cover the UK, so they cannot tell you anything about a clinic in Istanbul. The NHS also notes that standards and regulation abroad may differ from the UK, and that it can be harder to find out whether a surgeon is fully trained in the procedure you want.",
          "Turkey has some excellent hair transplant clinics and some very poor ones. The difference is rarely visible in the advertising, which is why the checks below matter more than the price.",
        ],
      },
      {
        heading: "Which licences should a Turkish clinic have?",
        paragraphs: [
          "Ask for the facility's licence from the Turkish Ministry of Health, and its International Health Tourism Authorisation Certificate, which Turkey requires for providers treating international patients. You can also check whether the facility appears on HealthTürkiye, the Ministry of Health's official health tourism portal.",
          "Then ask for the full name of the doctor who will be responsible for your procedure, and their qualifications. A clinic that cannot or will not provide these before you pay is not one to book with.",
        ],
      },
      {
        heading: "Who performs the procedure, and how many a day?",
        paragraphs: [
          "Concerns have been widely reported about high-volume clinics where one doctor oversees many patients a day and much of the procedure is carried out by technicians. Ask how many procedures the clinic performs on the same day, and which steps the doctor carries out personally.",
          "A good answer is specific and consistent. A vague one, or one that changes when you ask a second time, tells you what you need to know.",
        ],
      },
      {
        heading: "What should the package include?",
        paragraphs: [
          "Turkish hair transplants are often sold as packages with hotel, transfers, and an interpreter. The NHS advises caution with packages that combine surgery with a holiday, so treat the trip as a medical visit: no sun, swimming, or drinking while you heal, and a plan for the first days rather than sightseeing.",
          "Check in writing exactly what the price covers, including medication, aftercare products, and any follow-up, and what happens to the flights and hotel you have paid for if the clinic cancels.",
        ],
      },
      {
        heading: "What happens once you are home?",
        paragraphs: [
          "Ask how the clinic will follow up with you after you fly home, who you contact, and how quickly they reply. Ask when you will be safe to fly after the procedure. If something goes wrong, NHS services will deal with emergencies, but planned corrective or cosmetic treatment is not usually available on the NHS.",
          "Standard travel insurance does not normally cover planned treatment abroad, so check whether you need specialist cover before you book.",
        ],
      },
      {
        heading: "Where do we fit in?",
        paragraphs: [
          "We offer our own curated Turkiye route, so we have a commercial interest here, and you should apply every check on this page to us as well. The trade-offs of treatment abroad are real, and our UK vs Turkey comparison sets them out alongside the lower price.",
        ],
      },
    ],
    faq: [
      {
        question: "Is it safe to have a hair transplant in Turkey?",
        answer:
          "It can be, at a properly licensed clinic with a named, qualified doctor and clear aftercare. The risk comes from choosing on price alone without making the checks. Verification is also harder from the UK than for a UK clinic.",
      },
      {
        question: "How do I check a Turkish hair transplant clinic is licensed?",
        answer:
          "Ask for its Ministry of Health facility licence and International Health Tourism Authorisation Certificate, and check whether the facility appears on HealthTürkiye, the Ministry of Health's official health tourism portal.",
      },
      {
        question: "Will my travel insurance cover a hair transplant in Turkey?",
        answer:
          "Standard travel insurance does not normally cover planned treatment abroad or its complications. Look for specialist cover and read what it excludes.",
      },
      {
        question: "What if I have a problem after I get home?",
        answer:
          "Contact the clinic first. NHS services will deal with emergencies such as infection, but corrective cosmetic treatment is not usually available on the NHS, and complaints against a Turkish clinic are harder to pursue from the UK.",
      },
    ],
    relatedLinks: [
      {
        href: "/uk-vs-turkey-hair-transplant",
        label: "UK vs Turkey Hair Transplant",
        description: "A balanced comparison of cost, travel, standards, and aftercare.",
      },
      {
        href: "/why-turkiye",
        label: "Why Turkiye",
        description: "Why some patients still travel, and what to check before booking.",
      },
    ],
  },
  {
    slug: "harley-street-hair-transplant-address",
    title: "Is a Harley Street Address a Sign of a Good Hair Transplant Clinic?",
    seoTitle: "Harley Street Hair Transplant: Does the Address Matter?",
    description:
      "What a Harley Street address does and does not tell you about a hair transplant clinic, and how to check a Harley Street clinic properly before you book.",
    excerpt:
      "Harley Street is home to some excellent clinicians. The address itself still tells you nothing about who will treat you or how the clinic is regulated.",
    eyebrow: "Clinic selection",
    answerSummary:
      "A Harley Street address tells you where a clinic is, not how good it is. Harley Street has been a centre of private medicine since the 19th century and many respected clinicians practise there, but consulting rooms are often rented by the session, and the address is not a form of regulation. Check the doctor on the GMC register and the exact address on the CQC register, as you would anywhere else.",
    readTime: "5 min read",
    updatedAt: "2026-09-28",
    keywords: [
      "harley street hair transplant",
      "harley street hair transplant clinic",
      "is harley street better for hair transplant",
      "harley street clinic check",
    ],
    keyTakeaways: [
      "Harley Street is an address, not a standard or a regulator.",
      "Check that the exact address you will attend is the one registered with the CQC.",
      "The address often adds cost; make sure you are paying for more than the postcode.",
    ],
    sections: [
      {
        heading: "Why is Harley Street associated with medicine?",
        paragraphs: [
          "Harley Street and the surrounding streets in Marylebone have been a centre of private medicine since the 19th century. Many highly respected specialists practise there, and the name has become shorthand for private healthcare in London.",
          "That reputation is real, and it is the reason the address is valuable in marketing. It is also the reason it is worth understanding what the address does and does not guarantee.",
        ],
      },
      {
        heading: "What does the address actually tell you?",
        paragraphs: [
          "It tells you the clinic, or at least some of its consultations, are in central London, and that its overheads are probably high, which is often reflected in the price. It does not tell you who will perform your procedure, how the clinic is regulated, or whether the procedure itself takes place at that address.",
          "Many buildings in the area let consulting rooms by the session or by the day, so the name on the door may be one of several practices using the same room, and a clinic may consult on Harley Street but operate somewhere else.",
        ],
      },
      {
        heading: "How do you check a Harley Street clinic properly?",
        paragraphs: [
          "Treat it exactly as you would a clinic anywhere else.",
        ],
        bullets: [
          "Ask where the procedure will be performed, not only where you will be consulted.",
          "Check that exact address on the CQC register.",
          "Check the responsible doctor on the GMC register.",
          "Ask who performs each stage of the procedure.",
          "Compare the full written quote with clinics elsewhere.",
        ],
      },
      {
        heading: "Is it worth paying more for Harley Street?",
        paragraphs: [
          "Sometimes. If a Harley Street clinic offers a surgeon you particularly trust, easier access for you, or better aftercare, the extra cost may be worth it. If the only difference is the postcode, it probably is not.",
          "Excellent hair transplant surgeons work across London and the rest of the UK. The questions that separate good clinics from weak ones are the same wherever the door is.",
        ],
      },
    ],
    faq: [
      {
        question: "Are Harley Street hair transplant clinics better?",
        answer:
          "Not automatically. Some of the UK's most respected clinicians practise there, but the address is not a standard in itself. Judge the doctor, the clinic's registration, and the plan, not the postcode.",
      },
      {
        question: "Why are Harley Street clinics more expensive?",
        answer:
          "Mostly because of the cost of premises in central London, although some also offer more senior clinicians or more comprehensive aftercare. Ask what the extra cost pays for.",
      },
      {
        question: "Is every clinic with a Harley Street address based there?",
        answer:
          "Not always. Some clinics consult there and perform procedures elsewhere, and consulting rooms are often shared. Ask where your procedure will happen and check that address with the CQC.",
      },
      {
        question: "What if the clinic's CQC registration shows a different address?",
        answer:
          "That can be legitimate, since a provider may consult in one place and treat in another. What matters is that the address where your procedure actually takes place is a registered location, so ask the clinic to confirm it and check it yourself.",
      },
    ],
    relatedLinks: [
      {
        href: "/blog/how-to-check-hair-transplant-surgeon-registration",
        label: "How to Check a Surgeon's Registration",
        description: "How to check a doctor and a clinic's exact address on the registers.",
      },
      {
        href: "/blog/how-to-choose-a-hair-transplant-clinic",
        label: "How to Choose a Hair Transplant Clinic in the UK",
        description: "What matters most when choosing, wherever the clinic is.",
      },
    ],
  },
];

type BlogPostImage = Pick<BlogPost, "imageSrc" | "imageAlt" | "imagePosition"> & {
  imageContext?: string;
};

const blogPostImages: Record<
  BaseBlogPost["slug"],
  BlogPostImage
> = {
  "hair-transplant-consultation-london-what-to-expect": {
    imageSrc: "/images/home-hero-consultation.png",
    imageAlt:
      "Doctor explaining a hairline treatment plan during a premium London hair transplant consultation",
    imagePosition: "72% center",
  },
  "how-to-choose-a-hair-transplant-clinic": {
    imageSrc: "/images/blog/how-to-choose-a-hair-transplant-clinic.webp",
    imageAlt: "Quiet consultation room with two chairs facing a desk beside a tall window",
    imagePosition: "center",
  },
  "how-to-check-hair-transplant-surgeon-registration": {
    imageSrc: "/images/blog/how-to-check-hair-transplant-surgeon-registration.webp",
    imageAlt:
      "Clinic desk with a closed leather folder, a pen, reading glasses, and a laptop against a deep teal wall",
    imagePosition: "center",
  },
  "hair-transplant-red-flags": {
    imageSrc: "/images/blog/hair-transplant-red-flags.webp",
    imageAlt:
      "Paper agreement with a red pen beside a brass hourglass on a consultation table",
    imagePosition: "center 70%",
  },
  "how-hair-transplant-graft-counts-get-inflated": {
    imageSrc: "/images/blog/how-hair-transplant-graft-counts-get-inflated.webp",
    imageAlt: "Fine precision tweezers and a small magnifying loupe on a stainless steel tray",
    imagePosition: "center",
  },
  "hair-transplant-deposit-and-refund-terms": {
    imageSrc: "/images/blog/hair-transplant-deposit-and-refund-terms.webp",
    imageAlt: "Card payment terminal beside a paper agreement on an oak desk",
    imagePosition: "center 65%",
  },
  "hair-transplant-second-opinion": {
    imageSrc: "/images/blog/hair-transplant-second-opinion.webp",
    imageAlt:
      "Two folders side by side on a round consultation table with two gold-framed chairs",
    imagePosition: "center",
  },
  "hair-transplant-gone-wrong": {
    imageSrc: "/images/blog/hair-transplant-gone-wrong.webp",
    imageAlt:
      "Quiet clinic corridor seen through an archway, leading to a closed consultation room door",
    imagePosition: "center",
  },
  "hair-transplant-agency-vs-clinic": {
    imageSrc: "/images/blog/hair-transplant-agency-vs-clinic.webp",
    imageAlt:
      "Clinic lounge with armchairs and a window looking out over London chimney pots",
    imagePosition: "center",
  },
  "how-to-read-hair-transplant-reviews": {
    imageSrc: "/images/blog/how-to-read-hair-transplant-reviews.webp",
    imageAlt: "Cup of tea and a smartphone on a side table in a quiet waiting area",
    imagePosition: "center 70%",
  },
  "hair-transplant-guarantees": {
    imageSrc: "/images/blog/hair-transplant-guarantees.webp",
    imageAlt: "Sealed cream envelope with a gold wax seal beside a fountain pen on a dark desk",
    imagePosition: "center",
  },
  "how-to-compare-hair-transplant-quotes": {
    imageSrc: "/images/blog/how-to-compare-hair-transplant-quotes.webp",
    imageAlt: "Two blank sheets of paper side by side on an oak desk with a pen and a brass ruler",
    imagePosition: "center",
  },
  "how-to-vet-a-turkish-hair-transplant-clinic": {
    imageSrc: "/images/blog/how-to-vet-a-turkish-hair-transplant-clinic.webp",
    imageAlt: "Hotel room desk with a travel folder, looking out over the Istanbul skyline and the Bosphorus",
    imagePosition: "center",
  },
  "harley-street-hair-transplant-address": {
    imageSrc: "/images/blog/harley-street-hair-transplant-address.webp",
    imageAlt:
      "Navy Georgian front door with a brass letterbox, a blank plaque, and black iron railings in morning light",
    imagePosition: "center",
  },
};

function createBlogPost(post: BaseBlogPost): BlogPost {
  const image = blogPostImages[post.slug];

  return applyProjectTokens({
    ...post,
    sources: blogPostSources[post.slug] ?? [],
    imageSrc: image.imageSrc,
    imageAlt: image.imageAlt ?? buildBlogImageAlt(post.title, image.imageContext),
    imagePosition: image.imagePosition,
  });
}

export const blogPosts: BlogPost[] = rawBlogPosts.map(createBlogPost);

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;

export const featuredBlogPosts = blogPosts.map((post) => ({
  href: `/blog/${post.slug}`,
  label: post.title,
  description: post.excerpt,
  imageSrc: post.imageSrc,
  imageAlt: post.imageAlt,
  imagePosition: post.imagePosition,
}));
