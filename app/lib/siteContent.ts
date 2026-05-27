export type LinkCard = {
  href: string;
  label: string;
  description: string;
};

export type HeaderNavItem = LinkCard & {
  items?: LinkCard[];
};

export type TopicCard = {
  title: string;
  text: string;
};

export type TopicSection = {
  title: string;
  intro?: string;
  body: string[];
  bullets?: string[];
};

export type TopicFaq = {
  question: string;
  answer: string;
};

export type TopicTimeline = {
  title: string;
  text: string;
};

export type TopicComparison = {
  title: string;
  intro: string;
  columns: [string, string, string];
  rows: {
    label: string;
    left: string;
    right: string;
  }[];
};

export type TopicPriceStoryRow = {
  title: string;
  context: string;
  price: string;
  badge?: string;
  featured?: boolean;
};

export type TopicPriceStory = {
  eyebrow: string;
  title: string;
  intro: string;
  note: string;
  rows: TopicPriceStoryRow[];
};

export type TopicHeroPanel = {
  eyebrow: string;
  body: string;
  note: string;
  value?: string;
  compareValue?: string;
  headline?: string;
};

export type TopicPageContent = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  lead: string;
  keywords: string[];
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroPanel?: TopicHeroPanel;
  heroChips: string[];
  cards: TopicCard[];
  sections: TopicSection[];
  timeline?: TopicTimeline[];
  priceStory?: TopicPriceStory;
  comparison?: TopicComparison;
  faq: TopicFaq[];
  relatedSlugs: string[];
};

export const siteContact = {
  email: "hello@ukhairtransplant.co",
};

export const primaryNavigation: HeaderNavItem[] = [
  {
    href: "/hair-transplant-london",
    label: "Why London",
    description: "Why patients choose a London route for access, standards, and aftercare.",
  },
  {
    href: "/hair-transplant-cost-london",
    label: "Cost",
    description: "What shapes the quote, what is included, and how to compare value.",
  },
  {
    href: "/how-we-work",
    label: "How we work",
    description: "How we guide, prepare, and connect patients with selected pathways.",
  },
  {
    href: "/services",
    label: "Treatments",
    description: "Scalp and facial-hair treatment options.",
    items: [
      {
        href: "/services/male-hair-transplant",
        label: "Male Hair Transplant",
        description: "Hairline, crown, and density restoration in London.",
      },
      {
        href: "/services/female-hair-transplant",
        label: "Female Hair Transplant",
        description: "Female-specific restoration planning and density support.",
      },
      {
        href: "/services/eyebrow-transplant",
        label: "Eyebrow Transplant",
        description: "Shape, arch, and soft facial framing treatment.",
      },
      {
        href: "/services/beard-transplant",
        label: "Beard Transplant",
        description: "Outline definition and patch coverage for beard growth.",
      },
      {
        href: "/services/moustache-transplant",
        label: "Moustache Transplant",
        description: "Upper-lip detail, symmetry, and visible-area density.",
      },
      {
        href: "/services/hair-loss-treatments",
        label: "Hair Loss Treatments",
        description: "Non-surgical support before or after transplant surgery.",
      },
    ],
  },
  {
    href: "/our-clinical-standards",
    label: "Guides",
    description: "Standards, recovery, comparison, and deeper research before treatment.",
    items: [
      {
        href: "/our-clinical-standards",
        label: "Clinical Standards",
        description: "GMC, CQC, planning, governance, and aftercare.",
      },
      {
        href: "/hair-transplant-recovery-timeline",
        label: "Recovery",
        description: "Healing, shedding, aftercare, and regrowth stages.",
      },
      {
        href: "/uk-vs-turkey-hair-transplant",
        label: "UK vs Turkey",
        description: "Compare convenience, follow-up, standards, and cost.",
      },
      {
        href: "/why-turkiye",
        label: "Why Turkiye?",
        description: "Why some patients still travel, and what to check before booking.",
      },
      {
        href: "/blog",
        label: "Articles",
        description: "Search-focused guides on consultation, cost, and suitability.",
      },
    ],
  },
];

export const footerLinkGroups = [
  {
    title: "Core information",
    links: [
      "/hair-transplant-london",
      "/hair-transplant-cost-london",
      "/how-we-work",
      "/our-clinical-standards",
      "/patient-guidance-process",
    ],
  },
  {
    title: "What to know",
    links: [
      "/blog",
      "/why-turkiye",
      "/uk-vs-turkey-hair-transplant",
      "/how-hair-transplant-works",
      "/fue-vs-dhi",
      "/hair-transplant-without-shaving",
    ],
  },
  {
    title: "Recovery",
    links: [
      "/hair-transplant-recovery-timeline",
      "/hair-transplant-side-effects",
      "/services/male-hair-transplant",
      "/services/female-hair-transplant",
    ],
  },
];

export const homeTrustPillars: TopicCard[] = [
  {
    title: "Central London access",
    text: "For many patients, a London route makes consultation, treatment day, and follow-up easier to organise around normal life.",
  },
  {
    title: "GMC-registered doctors",
    text: "Patients should understand who is involved in treatment, how responsibilities are structured, and what questions to ask before deciding.",
  },
  {
    title: "CQC-registered provider in England",
    text: "A regulated provider setting helps patients judge the care environment alongside planning, suitability, and aftercare.",
  },
  {
    title: "Turkish hair restoration experience",
    text: "Turkish and international hair restoration experience can matter when it sits alongside UK registration, realistic planning, and clear follow-up.",
  },
];

export const homeSignals = [
  {
    value: "London",
    label:
      "Choose a central London route if you want consultations, treatment day, and follow-up to feel easier to organise around work, travel, and normal life.",
  },
  {
    value: "GMC",
    label:
      "If you want treatment in London with stronger medical reassurance, GMC-registered doctors give you a clearer basis for trust before you commit.",
  },
  {
    value: "CQC",
    label:
      "A CQC-registered provider setting in England can give you more confidence in the clinic environment, standards, and aftercare structure around your treatment.",
  },
  {
    value: "UK + Turkey",
    label:
      "If you are deciding between London and Turkey, you can compare both routes more clearly here before choosing the option that fits your priorities best.",
  },
];

export const homeJourney = [
  {
    title: "Check whether treatment may suit you",
    text: "Start with your pattern of hair loss, donor area, goals, priorities, and whether transplant is likely to be the right route at all.",
  },
  {
    title: "Understand the London route",
    text: "Review how a London decision changes consultation access, travel, aftercare, recovery planning, and the way a quote should be judged.",
  },
  {
    title: "Compare standards and cost properly",
    text: "Look beyond the first price you see and compare doctor registration, provider setting, consultation quality, what is included, and follow-up.",
  },
  {
    title: "Request an assessment",
    text: "When you are ready, share your concern, priorities, timing, and photos if available so the first response can be specific to your case.",
  },
];

export const homeAssessmentChecklist = [
  "Include your age, location, and whether your main concern is hairline, crown, general thinning, or facial hair.",
  "Say whether you want to stay in the UK or may also consider Turkey.",
  "Clear scalp photos in daylight usually make the first assessment more useful.",
  "Tell the team whether your priorities are density, subtlety, recovery time, or a female-specific concern.",
];

export const homeGuideHighlights: LinkCard[] = [
  {
    href: "/blog/hair-transplant-consultation-london-what-to-expect",
    label: "What to Expect From a Hair Transplant Consultation in London",
    description:
      "A clearer look at suitability, donor assessment, graft range, quote structure, and what a free consultation should actually cover.",
  },
  {
    href: "/blog/hair-transplant-cost-london-what-changes-the-price",
    label: "Why Hair Transplant Costs Differ in London",
    description:
      "Understand what changes the quote, what should be included, and how to compare value rather than only chasing the lowest price.",
  },
  {
    href: "/blog/how-to-choose-a-hair-transplant-clinic-in-london",
    label: "How to Choose a Hair Transplant Clinic in London",
    description:
      "What patients should check around planning, doctor responsibility, provider standards, and aftercare before choosing a clinic.",
  },
  {
    href: "/blog/uk-vs-turkey-hair-transplant-how-to-compare",
    label: "UK vs Turkey Hair Transplant: How to Compare the Two Routes",
    description:
      "A balanced guide to comparing cost, travel, convenience, standards, and follow-up before choosing London or Turkey.",
  },
  {
    href: "/blog/hair-transplant-recovery-timeline-week-by-week",
    label: "Hair Transplant Recovery Timeline: What Happens Week by Week",
    description:
      "Separate early healing from later regrowth so the recovery process is easier to understand and less stressful to judge.",
  },
  {
    href: "/blog/female-hair-transplant-london-who-may-be-suitable",
    label: "Female Hair Transplant in London: Who May Be Suitable?",
    description:
      "Female-specific guidance around pattern, donor area, discreet planning, density goals, and whether transplant may suit the case.",
  },
];

export const homeReviews = [
  {
    name: "Daniel P.",
    rating: 5,
    quote:
      "The biggest difference was the tone. It felt clinical, calm, and honest rather than pushy.",
  },
  {
    name: "Amira S.",
    rating: 5,
    quote:
      "I wanted London convenience without vague pricing and hype. The information here answered most of what I needed before speaking to anyone.",
  },
  {
    name: "Michael R.",
    rating: 5,
    quote:
      "The clinical standards information was more useful than most clinic sites because it explained what to check, not just what to believe.",
  },
];

export const homeFaq: TopicFaq[] = [
  {
        question: "Is UK Hair Transplant the clinic performing the procedure?",
        answer:
      "No. UK Hair Transplant helps patients understand treatment options, clinic standards, pricing factors, recovery, and what to check before moving toward a provider.",
  },
  {
    question: "Why does the site focus on London first?",
    answer:
      "Because many patients want local consultation access, easier follow-up, and a familiar healthcare setting before they consider travelling abroad. Turkey can still be part of the wider comparison, but it should not be the only route patients understand.",
  },
  {
    question: "What should I check before trusting a hair transplant provider?",
    answer:
      "Ask who performs the procedure, whether doctors are GMC-registered, whether treatment is delivered through a regulated provider setting, how suitability is assessed, what the quote includes, and how aftercare is handled.",
  },
  {
    question: "Why is recovery discussed so early?",
    answer:
      "Because recovery often shapes whether a patient feels ready to enquire. Understanding swelling, scabbing, shedding, side effects, and the longer growth timeline helps patients judge the decision more realistically.",
  },
  {
    question: "Can women use this site too?",
    answer:
      "Yes. The site is written for both men and women. Female hair loss often needs a more careful suitability discussion, so there is dedicated guidance for women as well as the broader London, cost, standards, and recovery pages.",
  },
  {
    question: "What happens after I request an assessment?",
    answer:
      "Your concern, timing, any useful location context, and any helpful photos are reviewed first. If more detail is needed, you will be told what to provide before the next step is discussed.",
  },
];

export const topicPages: Record<string, TopicPageContent> = {
  "hair-transplant-london": {
    slug: "hair-transplant-london",
    title: "Hair Transplant in London",
    seoTitle: "Hair Transplant London: Standards and Aftercare",
    description:
      "Research hair transplant treatment in London with clear information on suitability, methods, pricing, aftercare, and the standards patients should check before moving forward.",
    eyebrow: "Hair transplant London",
    lead:
      "If you are considering a hair transplant in London, the main questions are usually suitability, methods, pricing, recovery, and the standards behind the clinic environment. This page brings those points together before you request an assessment.",
    heroImageSrc: "/images/why-london-hero.png",
    heroImageAlt:
      "Hair transplant consultation in a premium London clinic with Central London city views beyond the window",
    keywords: [
      "hair transplant london",
      "london hair transplant",
      "hair transplant clinic london",
      "central london hair transplant",
      "hair transplant consultation london",
    ],
    heroChips: [
      "Central London access",
      "GMC-registered doctors",
      "CQC-registered provider in England",
    ],
    cards: [
      {
        title: "Why London appeals to many patients",
        text: "For many patients, local consultation access, easier follow-up, and a familiar clinical setting matter as much as the treatment itself.",
      },
      {
        title: "Standards matter as much as price",
        text: "Doctor registration, clinic environment, governance, and aftercare often separate a reassuring option from one that feels harder to judge.",
      },
      {
        title: "Clear expectations build confidence",
        text: "A stronger first conversation covers suitability, method, quote structure, recovery, and what may limit the result.",
      },
    ],
    sections: [
      {
        title: "Why choose a hair transplant in London",
        body: [
          "London is often preferred by patients who want easier consultation access, a familiar healthcare setting, and local aftercare once the procedure is over.",
          "For many people, the appeal is not only location. It is the combination of convenience, regulated standards, realistic planning, and the ability to ask questions face to face before moving ahead.",
        ],
        bullets: [
          "Central London appointments can make consultation, procedure day, and follow-up simpler to organise.",
          "Local aftercare can feel reassuring when you want reviews or advice without overseas travel.",
          "A London-first decision is often about convenience, standards, and confidence rather than headline price alone.",
        ],
      },
      {
        title: "Who may be suitable",
        body: [
          "Suitability depends on your pattern of hair loss, donor area, hair characteristics, long-term plan, and expectations around density and hairline design.",
          "Not every patient is ready for treatment straight away. Some people may need more time, non-surgical support, medical advice, or a different plan than they first expected.",
        ],
        bullets: [
          "Men considering hairline, crown, or general density restoration.",
          "Women looking for a careful discussion around thinning, framing, and whether transplant is appropriate at all.",
          "Patients exploring beard or eyebrow restoration within the same London treatment framework.",
        ],
      },
      {
        title: "What to expect from consultation, treatment, and aftercare",
        body: [
          "A strong consultation should cover your hair-loss history, donor availability, likely graft requirements, method options such as FUE or DHI where relevant, and what a realistic result may look like for your case.",
          "Aftercare should be part of the conversation from the start. Swelling, scabbing, washing, time away from work, and the longer growth timeline all shape whether treatment feels right for you.",
        ],
        bullets: [
          "Ask who performs the procedure and how clinical responsibilities are divided.",
          "Ask what the quote includes, including aftercare, medication, and review structure.",
          "Ask what the first few weeks of recovery usually involve, not only when growth may appear.",
        ],
      },
    ],
    comparison: {
      title: "What patients usually compare when choosing a London clinic",
      intro:
        "Patients usually compare more than price. A useful London assessment also covers who performs the procedure, how the clinic environment is governed, how the method is chosen, and what happens after treatment day.",
      columns: ["What to compare", "What to check", "Why it matters"],
      rows: [
        {
          label: "Who performs the procedure",
          left: "Ask whether the procedure is carried out by GMC-registered doctors and how the wider clinical team is involved.",
          right:
            "This helps you understand accountability, oversight, and who is making key treatment decisions.",
        },
        {
          label: "Clinic environment",
          left: "Check whether treatment is delivered through a CQC-registered provider in England and what that means for governance and follow-up.",
          right:
            "A regulated setting can feel easier to verify and judge properly.",
        },
        {
          label: "Method and graft plan",
          left: "Ask why FUE, DHI, or another approach is being discussed and whether the graft estimate matches your pattern of loss.",
          right:
            "It shows whether the plan is tailored to your case or being treated too generically.",
        },
        {
          label: "Aftercare and access",
          left: "Ask how reviews, post-op advice, and recovery support are handled once you leave the clinic.",
          right:
            "Local follow-up is one of the main practical reasons many patients choose London.",
        },
        {
          label: "Quote structure",
          left: "Ask what the quote includes, what may change it, and whether aftercare, medication, or extra reviews are separate.",
          right:
            "This makes it easier to compare value rather than just the first number you see.",
        },
      ],
    },
    faq: [
      {
        question: "Why choose a hair transplant in London instead of going straight to Turkey?",
        answer:
          "London is attractive when patients value easier consultation access, local aftercare, less travel friction, and the reassurance of staying in a familiar healthcare environment. It is not automatically the better choice for every case, but it is often the stronger fit for patients who prioritise convenience and clarity.",
      },
      {
        question: "How much does a hair transplant in London usually cost?",
        answer:
          "The quote usually depends on graft range, method, doctor involvement, planning complexity, and aftercare. A useful London page should explain what shapes the quote rather than relying on one fixed headline number.",
      },
      {
        question: "What should a London consultation cover?",
        answer:
          "It should cover your pattern of hair loss, donor area, likely graft requirements, method options, expected limitations, recovery timing, and what the quote includes. If those points are unclear, the consultation is not strong enough yet.",
      },
      {
        question: "Who performs the procedure?",
        answer:
          "That is a question every patient should ask directly. The safer public standard is to look for procedures carried out by GMC-registered doctors and to understand how the wider clinical team supports the treatment and aftercare.",
      },
      {
        question: "How long is recovery after a hair transplant?",
        answer:
          "Recovery happens in stages. Early healing often includes redness, scabbing, swelling, and a careful washing routine, while visible growth takes much longer. Most patients want the first few weeks explained clearly before they commit, not only the later growth timeline.",
      },
      {
        question: "Is hair transplant in London only relevant for men?",
        answer:
          "No. Women may also consider treatment in London, especially when they want a careful discussion around the cause of thinning, donor suitability, framing goals, and whether transplant is the right route at all.",
      },
    ],
    relatedSlugs: [
      "hair-transplant-cost-london",
      "our-clinical-standards",
      "hair-transplant-recovery-timeline",
      "uk-vs-turkey-hair-transplant",
      "why-turkiye",
    ],
  },
  "hair-transplant-cost-london": {
    slug: "hair-transplant-cost-london",
    title: "Hair Transplant Cost in London",
    seoTitle: "Hair Transplant Cost London",
    description:
      "Understand hair transplant cost in London, what usually shapes the quote, what may be included, and what to compare before choosing treatment.",
    eyebrow: "Hair transplant cost London",
    lead:
      "If you are researching hair transplant cost in London, the quote will usually depend on graft range, method, doctor involvement, clinic setting, and aftercare. This page explains what commonly affects price, what should be included, and what to compare before moving ahead.",
    heroImageSrc: "/images/cost-london-hero.png",
    heroImageAlt:
      "Hair transplant consultation in a premium London clinic focused on quote and treatment-plan discussion",
    keywords: [
      "hair transplant cost london",
      "london hair transplant cost",
      "hair transplant price london",
      "hair transplant london price",
      "hair transplant quote london",
    ],
    heroChips: [
      "Quote drivers explained",
      "What should be included",
      "Central London treatment context",
    ],
    cards: [
      {
        title: "Quotes vary from case to case",
        text: "The price usually changes with graft range, treatment scope, donor availability, and how complex the planning needs to be.",
      },
      {
        title: "What is included matters",
        text: "A lower figure may not include the same level of aftercare, review structure, medication, or clinical time as another quote.",
      },
      {
        title: "Value is broader than the first figure",
        text: "Patients usually feel more confident when they can judge the full treatment plan rather than only the opening number.",
      },
    ],
    sections: [
      {
        title: "What usually affects hair transplant cost in London",
        body: [
          "Hair transplant cost in London usually depends on the number of grafts being discussed, the method proposed, the pattern of hair loss, the donor area, and how involved the treatment plan needs to be.",
          "Quotes can also differ because clinics structure treatment differently. One quote may reflect a lighter case with simpler planning, while another may include more grafts, more clinical time, or a broader aftercare package.",
        ],
        bullets: [
          "The graft range usually has a major effect on the quote.",
          "Method choice, such as FUE, DHI, or an unshaven approach, may change complexity and time.",
          "Donor characteristics, coverage goals, and long-term planning also shape price.",
        ],
      },
      {
        title: "What should be included in the quote",
        body: [
          "A useful quote should explain more than the procedure itself. Patients usually want to know whether consultation, treatment-day planning, aftercare reviews, medication, washing guidance, and post-op support are included.",
          "Patients may also want the quote to make clear whether items such as a PRP session, post-operative medication, and an aftercare pack are included or treated as extras.",
          "Clarity matters because two quotes can look similar at first and still cover different levels of support once treatment day has passed.",
        ],
        bullets: [
          "Ask whether aftercare reviews and follow-up contact are included.",
          "Ask whether PRP, medication, post-op products, or an aftercare pack are included or charged separately.",
          "Ask whether a Sapphire FUE approach or another method is being proposed and why it suits your case.",
          "Ask whether the quote reflects the full planned treatment or only the starting procedure day.",
        ],
      },
      {
        title: "Why London quotes can vary so much",
        body: [
          "Two London quotes can differ because the treatment plan, graft estimate, clinical team structure, setting, and aftercare model are not always the same. A lower quote is not automatically better value, and a higher quote is not automatically better care.",
          "For many patients, London is not only about price. It is also about easier consultation access, local follow-up, and being able to judge the clinic environment and planning process more comfortably before committing.",
        ],
        bullets: [
          "Compare what is included, not only the first figure you are shown.",
          "Compare who performs the procedure and how responsibilities are structured.",
          "Compare recovery support and local follow-up, especially if reassurance matters to you.",
        ],
      },
    ],
    priceStory: {
      eyebrow: "The price story",
      title: "What many patients expect to pay is often not the full picture.",
      intro:
        "One of the biggest pricing shifts in this category is the gap between what patients assume a premium UK clinic will cost and what they may actually be quoted once the route, graft range, and inclusions are explained properly.",
      note:
        "Market ranges below are indicative context only. Individual quotes still vary by case, graft range, method, clinic structure, and what is included.",
      rows: [
        {
          title: "Legacy Central London Premium Clinics",
          context:
            "Established Harley Street and Wimpole Street providers often shape the older market perception many patients still start with.",
          price: "£9k–£15k",
        },
        {
          title: "Mid-range UK Clinics",
          context:
            "Regional and independent UK providers are often compared in a lower bracket, but planning, doctor involvement, and aftercare can still vary widely.",
          price: "£5k–£8k",
        },
        {
          title: "UK Hair Transplant — London",
          context:
            "Premium central London route. Fixed price for eligible cases up to 3,000 grafts, including one complimentary PRP treatment, post-operative medication, and an aftercare pack.",
          price: "£2,750",
          badge: "Hero price",
          featured: true,
        },
        {
          title: "UK Hair Transplant — Turkiye",
          context:
            "Curated Turkiye option for patients who are open to travel and want package-led treatment planning.",
          price: "From £1,800",
        },
      ],
    },
    comparison: {
      title: "What to compare when reviewing a London quote",
      intro:
        "A useful London quote should help you judge more than the price itself. These are some of the points patients usually compare before deciding.",
      columns: ["What to compare", "What to ask", "Why it matters"],
      rows: [
        {
          label: "Graft range and coverage",
          left: "Ask how many grafts are being discussed, which areas are being treated, and whether the plan is conservative or aggressive.",
          right:
            "This helps you judge whether the quote matches your pattern of loss and long-term donor planning.",
        },
        {
          label: "Method",
          left: "Ask why FUE, DHI, or another approach is being suggested for your case.",
          right: "Different methods can affect complexity, treatment time, and price.",
        },
        {
          label: "Who performs the procedure",
          left: "Ask how the procedure is carried out, whether by GMC-registered doctors, and how the wider clinical team is involved.",
          right: "This helps you understand accountability, oversight, and how treatment decisions are made.",
        },
        {
          label: "Aftercare and follow-up",
          left: "Ask what reviews, washing guidance, medication, and post-op support are included after treatment day.",
          right: "Good follow-up can make a major difference to confidence and recovery.",
        },
        {
          label: "Quote structure",
          left: "Ask what is included in the total figure and what might still be separate.",
          right: "This makes it easier to compare real value rather than a headline number alone.",
        },
      ],
    },
    faq: [
      {
        question: "How much does a hair transplant in London cost?",
        answer:
          "There is rarely one meaningful figure that applies to every patient. The quote usually depends on graft range, method, planning complexity, doctor involvement, and aftercare. A good consultation should explain the likely cost for your case rather than rely on a generic number.",
      },
      {
        question: "What usually changes the quote most?",
        answer:
          "The main factors are usually graft range, method, donor characteristics, treatment complexity, and what is included around aftercare and follow-up. The more tailored the plan, the more specific the quote should become.",
      },
      {
        question: "Should consultation and aftercare be included in the quote?",
        answer:
          "That depends on the clinic, which is why it should be asked directly. Many patients want to know whether reviews, medication, post-op guidance, follow-up contact, PRP, and an aftercare pack are included before they compare one London option with another.",
      },
      {
        question: "Why can two London quotes be very different?",
        answer:
          "Two quotes may reflect different graft estimates, different methods, different levels of clinical involvement, or different aftercare structures. The safest comparison is not only the number itself, but what sits behind it.",
      },
      {
        question: "Is London always more expensive than Turkey?",
        answer:
          "London and Turkey often serve different priorities. Turkey may appeal on overall cost, while London may appeal on convenience, local consultation, and easier aftercare. The right choice depends on what matters most to you, not only on the first figure you see.",
      },
      {
        question: "Can women use the same cost logic?",
        answer:
          "Yes, in the sense that suitability, graft planning, method, and treatment scope still shape the quote. The underlying cause of thinning and whether transplant is appropriate at all should also be part of the discussion before price is judged.",
      },
    ],
    relatedSlugs: [
      "hair-transplant-london",
      "our-clinical-standards",
      "uk-vs-turkey-hair-transplant",
      "hair-transplant-recovery-timeline",
    ],
  },
  "how-we-select-clinics": {
    slug: "how-we-select-clinics",
    title: "How We Select Hair Transplant Clinics",
    seoTitle: "How We Select Hair Transplant Clinics",
    description:
      "See what to check when comparing hair transplant clinics, including doctor registration, regulated clinic environments, aftercare, suitability, and clear patient information.",
    eyebrow: "Clinic selection",
    lead:
      "Choosing a hair transplant clinic is not only about marketing language or price. This page explains the standards used to assess whether a clinic feels properly governed, clear in its communication, and suitable for patient recommendations.",
    keywords: [
      "how to choose a hair transplant clinic",
      "reputable hair transplant clinic uk",
      "hair transplant clinic standards",
      "how we select clinics",
    ],
    heroChips: [
      "GMC-registered doctors",
      "CQC-registered provider in England",
      "Suitability and aftercare matter",
    ],
    cards: [
      {
        title: "Registration and governance come first",
        text: "Doctor registration and a properly regulated clinic environment are among the first things patients should look at.",
      },
      {
        title: "Not every clinic fits the same standard",
        text: "A reassuring clinic should feel clear on planning, aftercare, and limitations rather than relying on broad prestige claims alone.",
      },
      {
        title: "Clear information builds trust",
        text: "Patients usually judge a clinic more confidently when the key standards are explained in practical language.",
      },
    ],
    sections: [
      {
        title: "What we look for before recommending a clinic",
        body: [
          "The first checks usually relate to who is involved in treatment, how the clinic environment is governed, how suitability is discussed, and what support is provided once treatment day is over.",
          "A clinic should not feel reassuring only because of branding or location. It should feel clear in its standards, realistic in its planning, and specific about what patients can expect before and after treatment.",
        ],
        bullets: [
          "Procedures should be explained clearly, including the role of GMC-registered doctors.",
          "The clinic environment should be easy to understand and verify, including whether treatment is delivered through a CQC-registered provider in England.",
          "Suitability, aftercare, and limitations should be discussed openly rather than left vague.",
        ],
      },
      {
        title: "Why regulation and governance matter",
        body: [
          "Patients often hear terms like GMC and CQC without being told what they actually mean. In practice, these are useful because they make it easier to understand who is responsible for care and how the treatment setting is regulated.",
          "That does not mean patients should rely on badges alone. Registration and regulation are part of the picture, but they should sit alongside careful consultation, realistic planning, and a credible aftercare process.",
        ],
        bullets: [
          "GMC registration tells you a doctor is registered to practise in the UK.",
          "CQC registration in England helps patients understand the regulated care environment.",
          "Good governance should still be visible in consultation quality, planning, and follow-up.",
        ],
      },
      {
        title: "Why suitability and aftercare matter so much",
        body: [
          "A strong clinic should not make every patient feel automatically ready for treatment. It should explain whether transplant is suitable, what may limit the result, and how recovery will be supported in the early weeks.",
          "This matters because patients usually feel more confident when they understand the decision properly before treatment rather than being persuaded by a quick quote or broad reassurance.",
        ],
        bullets: [
          "A realistic conversation should cover donor area, likely graft range, and what may not be achievable.",
          "Aftercare should feel planned, not like an afterthought once the procedure is over.",
          "Clear guidance on recovery, reviews, and support often says more about quality than sales language does.",
        ],
      },
    ],
    comparison: {
      title: "What to check when comparing clinics yourself",
      intro:
        "If you are comparing clinics directly, these are some of the most useful points to check before relying on a recommendation or a quote.",
      columns: ["What to check", "What it can tell you", "Why it matters"],
      rows: [
        {
          label: "Doctor registration",
          left: "Ask who performs the procedure and whether treatment is carried out by GMC-registered doctors.",
          right:
            "This helps you understand accountability and who is making key treatment decisions.",
        },
        {
          label: "Clinic environment",
          left: "Check whether treatment is delivered through a CQC-registered provider in England and how the setting is explained.",
          right:
            "Patients usually find it easier to judge a clinic when the care environment is clear and verifiable.",
        },
        {
          label: "Consultation quality",
          left: "Look for a consultation that explains suitability, limitations, likely graft range, and method options clearly.",
          right:
            "This often reveals whether the clinic is planning carefully or treating every case too generically.",
        },
        {
          label: "Aftercare",
          left: "Ask what support is included after treatment day, including reviews, washing guidance, and follow-up contact.",
          right:
            "Good aftercare often shapes confidence and recovery just as much as the procedure itself.",
        },
        {
          label: "Quote clarity",
          left: "Ask what the quote includes and whether medication, follow-up, or extras sit outside the main figure.",
          right:
            "It is easier to compare value when the quote is clear rather than heavily packaged or vague.",
        },
      ],
    },
    faq: [
      {
        question: "What should I check before trusting a hair transplant clinic?",
        answer:
          "Patients usually want to check who performs the procedure, whether doctors are GMC-registered, whether treatment is delivered through a regulated clinic environment, how suitability is assessed, and what aftercare is included.",
      },
      {
        question: "Does GMC registration mean a doctor is automatically the right choice?",
        answer:
          "No. GMC registration means a doctor is registered to practise in the UK, which is important, but patients should still ask about the treatment plan, their role in the procedure, and how clearly the clinic explains suitability and aftercare.",
      },
      {
        question: "What does CQC registration tell me?",
        answer:
          "In England, CQC registration helps patients understand that care is being delivered through a regulated provider. It is a useful trust signal, but it should be considered alongside consultation quality, planning, and aftercare rather than as a standalone answer.",
      },
      {
        question: "Why is aftercare so important when comparing clinics?",
        answer:
          "Because treatment does not end on procedure day. Recovery guidance, early reviews, washing instructions, and access to support often make a major difference to how confident and well-supported patients feel afterwards.",
      },
      {
        question: "Can a lower quote still be reasonable?",
        answer:
          "Yes, but it should be compared carefully. Patients usually need to understand what the quote includes, how the graft plan has been set, who performs the procedure, and what aftercare is included before deciding whether lower cost also means better value.",
      },
      {
        question: "Why explain clinic selection at all?",
        answer:
          "Because many patients want help understanding what makes a clinic feel trustworthy before they are ready to enquire. Clear public criteria make it easier to compare providers and ask better questions from the start.",
      },
    ],
    relatedSlugs: [
      "our-clinical-standards",
      "patient-guidance-process",
      "hair-transplant-london",
      "uk-vs-turkey-hair-transplant",
    ],
  },
  "our-clinical-standards": {
    slug: "our-clinical-standards",
    title: "Our Clinical Standards",
    seoTitle: "Hair Transplant Standards: GMC and CQC",
    description:
      "Understand the standards behind treatment recommendations, including GMC-registered doctors, CQC-registered providers in England, realistic planning, suitability, and aftercare.",
    eyebrow: "Clinical standards",
    lead:
      "When patients ask what sits behind a recommendation, the answer should be clear. These are the standards used to judge whether treatment feels properly governed, realistic in its planning, and supportive before and after the procedure.",
    heroImageSrc: "/images/home-hero-consultation.png",
    heroImageAlt:
      "Doctor-led hair transplant consultation in a premium London clinic discussing planning, standards, and patient care",
    keywords: [
      "hair transplant standards",
      "gmc cqc hair transplant",
      "hair transplant clinical standards uk",
      "gmc registered doctors hair transplant",
    ],
    heroChips: [
      "GMC-registered doctors",
      "CQC-registered provider in England",
      "Planning and aftercare matter",
    ],
    cards: [
      {
        title: "Trust should be specific",
        text: "Patients usually feel more confident when standards are explained clearly rather than wrapped in vague prestige language.",
      },
      {
        title: "Suitability matters as much as treatment day",
        text: "A strong standard includes careful case selection, realistic planning, and open discussion of what may limit the result.",
      },
      {
        title: "Aftercare should be visible from the start",
        text: "Recovery support, washing guidance, follow-up, and early reviews should feel built into the process rather than added on later.",
      },
    ],
    sections: [
      {
        title: "What clinical standards should actually cover",
        body: [
          "Clinical standards should help patients understand what to verify, not simply leave them with a vague sense of reassurance. In practice, that means looking at who is involved in care, how the clinic setting is governed, how suitability is assessed, and how recovery is supported.",
          "A standards page should make those checks easier to understand before a patient requests an assessment or compares one clinic with another.",
        ],
        bullets: [
          "Who performs the procedure and how responsibilities are structured.",
          "Whether treatment is delivered through a regulated clinic environment.",
          "How suitability, donor planning, recovery, and aftercare are explained.",
        ],
      },
      {
        title: "How GMC and CQC should be understood",
        body: [
          "Terms like GMC and CQC are useful, but they should be described accurately. GMC registration tells patients that a doctor is registered to practise in the UK. CQC registration in England helps patients understand the regulated provider setting in which care is delivered.",
          "These are important trust standards, but they are not marketing trophies. They matter most when they sit alongside a strong consultation, realistic planning, and clear aftercare.",
        ],
        bullets: [
          "GMC registration should be described accurately, without implying endorsement.",
          "CQC registration should refer to the provider setting in England, not to an individual clinician.",
          "Registration and regulation are part of the picture, not the entire answer.",
        ],
      },
      {
        title: "Why realistic planning is part of clinical quality",
        body: [
          "A good standard does not suggest that every patient is automatically suitable for treatment. It should include careful discussion of donor availability, pattern of hair loss, likely graft range, expected density, and what may not be achievable in one procedure.",
          "That same standard should continue after treatment day. Early recovery, washing routines, swelling, reviews, and access to follow-up advice are all part of whether care feels well governed.",
        ],
        bullets: [
          "Suitability should be discussed openly, not assumed.",
          "Donor planning and result limitations should be explained realistically.",
          "Aftercare is part of the clinical standard, not a side note.",
        ],
      },
    ],
    comparison: {
      title: "What each standard helps you check",
      intro:
        "These standards are most useful when they help patients ask clearer questions and compare providers more confidently.",
      columns: ["Standard", "What to ask", "Why it matters"],
      rows: [
        {
          label: "Doctor registration",
          left: "Ask who performs the procedure and whether treatment is carried out by GMC-registered doctors.",
          right:
            "This helps patients understand accountability and who is making key treatment decisions.",
        },
        {
          label: "Regulated environment",
          left: "Ask whether treatment is delivered through a CQC-registered provider in England and how the clinic setting is explained.",
          right:
            "Patients can judge the care environment more confidently when the setting is clear and verifiable.",
        },
        {
          label: "Consultation and planning",
          left: "Ask whether suitability, donor area, likely graft range, limitations, and method options are explained clearly.",
          right:
            "This often reveals whether a clinic is planning carefully or relying on generic reassurance.",
        },
        {
          label: "Aftercare",
          left: "Ask what recovery support is included after treatment day, including reviews, washing guidance, and follow-up contact.",
          right:
            "Good aftercare can make a major difference to confidence and recovery in the early weeks.",
        },
        {
          label: "Quote clarity",
          left: "Ask what the quote includes and whether medication, products, or review visits sit outside the main figure.",
          right:
            "Clear pricing is easier to trust when it reflects the full treatment pathway rather than only the procedure day.",
        },
      ],
    },
    faq: [
      {
        question: "Why do clinical standards matter when comparing providers?",
        answer:
          "Because patients want to know what sits behind the promises. Clear standards around registration, regulated environments, planning, suitability, and aftercare make it easier to judge whether a provider feels trustworthy.",
      },
      {
        question: "What does GMC-registered doctor mean?",
        answer:
          "It means a doctor is registered to practise in the UK. That matters, but patients should still ask about the treatment plan, the clinician's role in the procedure, and how the wider team is involved.",
      },
      {
        question: "What does CQC-registered provider in England mean?",
        answer:
          "It means treatment is delivered through a provider setting registered with the Care Quality Commission in England. It is a useful signal for understanding the regulated care environment, but it should be considered alongside consultation quality, planning, and aftercare.",
      },
      {
        question: "Do standards guarantee the result?",
        answer:
          "No. Standards do not guarantee an outcome. They help patients judge whether care is being delivered through a clearer, better-governed process with realistic planning and support.",
      },
      {
        question: "Why is suitability part of the standard?",
        answer:
          "Because not every patient is ready for treatment straight away, and not every case can achieve the same level of coverage or density. A strong clinic should explain those realities clearly before treatment is booked.",
      },
      {
        question: "Is aftercare really part of clinical quality?",
        answer:
          "Yes. Recovery advice, washing instructions, early reviews, and access to support are all part of whether treatment feels well managed. Patients usually notice the quality of aftercare very quickly once the procedure is over.",
      },
      {
        question: "Can international or Turkish hair restoration experience still matter?",
        answer:
          "Yes, experience can matter, including experience gained in high-volume hair restoration settings. It should sit alongside UK registration, regulated clinic standards, realistic planning, and aftercare rather than replace them.",
      },
    ],
    relatedSlugs: [
      "how-we-select-clinics",
      "patient-guidance-process",
      "hair-transplant-london",
      "hair-transplant-side-effects",
    ],
  },
  "patient-guidance-process": {
    slug: "patient-guidance-process",
    title: "Before You Enquire",
    seoTitle: "Hair Transplant Assessment: What to Prepare",
    description:
      "See what to prepare before you enquire about treatment, including what information helps an initial assessment, what questions to ask, and what to review before deciding.",
    eyebrow: "Before you enquire",
    lead:
      "A better first enquiry usually starts with clearer information. Before you request an assessment, it helps to understand what to prepare, what questions matter most, and what a useful early review should cover.",
    keywords: [
      "hair transplant consultation process",
      "hair transplant patient guidance",
      "hair transplant consultation questions",
      "hair transplant assessment",
    ],
    heroChips: [
      "What to prepare first",
      "Questions worth asking",
      "Clearer early assessment",
    ],
    cards: [
      {
        title: "Good information leads to better answers",
        text: "A clearer enquiry helps the first review focus on suitability, planning, and the right next step rather than basic guesswork.",
      },
      {
        title: "Not every patient needs the same route",
        text: "Some patients are ready for a consultation, while others first need clearer advice on suitability, recovery, or whether treatment is right at all.",
      },
      {
        title: "A calmer start usually feels more trustworthy",
        text: "When the first step is practical and well explained, the whole process feels more serious and easier to judge.",
      },
    ],
    sections: [
      {
        title: "What to think about before you enquire",
        body: [
          "Before you enquire, it helps to be clear about your main concern, whether that is the hairline, crown, general thinning, beard, eyebrow, or a broader question about suitability.",
          "It also helps to think about what matters most to you. Some patients prioritise subtlety, some want stronger density, some care most about recovery time, and others are still deciding between staying in the UK and considering Turkey.",
        ],
        bullets: [
          "Be clear about the area you want to improve.",
          "Know whether your priority is density, subtlety, convenience, recovery, or price.",
          "If you are unsure whether transplant is right for you, say that early rather than assuming treatment is the answer.",
        ],
      },
      {
        title: "What information helps an initial assessment",
        body: [
          "An early review is usually more useful when it includes a short description of your concern, how long the issue has been progressing, and clear recent photos where possible.",
          "The point is not to create a perfect submission. It is to give enough context for the first response to be more specific about suitability, likely next steps, and what still needs to be clarified.",
        ],
        bullets: [
          "Recent photos in good light can help the first review feel more relevant.",
          "A short note on your goals gives the assessment clearer direction.",
          "Sharing whether you want a UK-only route or are open to Turkey can also help shape the response.",
        ],
      },
      {
        title: "What you should ask before you move forward",
        body: [
          "A strong first conversation should make you clearer, not more confused. Before you move toward consultation or treatment, it helps to ask who performs the procedure, how suitability is judged, what recovery involves, and what the quote includes.",
          "That early clarity matters because patients usually feel more confident when standards, limitations, and next steps are explained before any commitment is made.",
        ],
        bullets: [
          "Ask how suitability is assessed and what may limit the result.",
          "Ask what early recovery usually involves, not only when growth may appear.",
          "Ask what happens next after the initial assessment and what the consultation is expected to cover.",
        ],
      },
    ],
    comparison: {
      title: "What to prepare before requesting an assessment",
      intro:
        "You do not need a perfect submission, but these details usually make the first response more useful.",
      columns: ["What to prepare", "What to include", "Why it helps"],
      rows: [
        {
          label: "Main concern",
          left: "Say whether the issue is the hairline, crown, general thinning, beard, eyebrow, or overall suitability.",
          right:
            "This helps the first review focus on the right treatment context straight away.",
        },
        {
          label: "Photos",
          left: "Share recent photos in good light if possible, showing the main area of concern and the wider pattern of loss.",
          right:
            "Photos usually make the early assessment more specific and less generic.",
        },
        {
          label: "Goals and priorities",
          left: "Explain whether your priority is subtlety, density, convenience, recovery time, or price.",
          right:
            "Different priorities can lead to different advice, even for similar cases.",
        },
        {
          label: "Location preference",
          left: "Say whether you want a UK-only route or are also open to Turkey.",
          right:
            "This helps shape whether the response focuses on London convenience, travel considerations, or both.",
        },
        {
          label: "Questions",
          left: "Mention any questions you already have about suitability, recovery, cost, or who performs the procedure.",
          right:
            "A better first enquiry often starts with the questions that matter most to you.",
        },
      ],
    },
    faq: [
      {
        question: "What should be sent for a useful first review?",
        answer:
          "A concise summary usually helps most: your main area of concern, how long it has been affecting you, recent photos where possible, whether you want the UK only or may consider Turkey, and what matters most to you such as density, subtlety, recovery, or cost.",
      },
      {
        question: "Do I need photos before I enquire?",
        answer:
          "Photos are not always essential to make first contact, but they usually make the initial assessment more useful. Clear recent images in good light can help the first response be more specific about suitability and next steps.",
      },
      {
        question: "What questions should I ask before booking a consultation?",
        answer:
          "Patients usually want to ask who performs the procedure, how suitability is assessed, what method may be relevant, what recovery involves, and what the quote includes. Those questions often tell you a lot about the quality of the process.",
      },
      {
        question: "What if I am not sure I am suitable for treatment?",
        answer:
          "That is exactly the kind of uncertainty a good first review should help with. You do not need to arrive already convinced that transplant is the right route. A careful early discussion should make suitability clearer, not assume it.",
      },
      {
        question: "Should I think about UK vs Turkey before I enquire?",
        answer:
          "It helps to know whether you want to stay in the UK or are open to Turkey, but you do not need a final answer at the start. Many patients first want a clear assessment so they can compare convenience, recovery, and cost with better context.",
      },
      {
        question: "Why read the standards and recovery pages before enquiring?",
        answer:
          "Because they help you ask better questions. Patients usually make more confident decisions when they understand clinic standards, likely recovery, and what a realistic treatment conversation should sound like before they commit to the next step.",
      },
    ],
    relatedSlugs: [
      "how-we-select-clinics",
      "our-clinical-standards",
      "hair-transplant-london",
      "how-hair-transplant-works",
    ],
  },
  "uk-vs-turkey-hair-transplant": {
    slug: "uk-vs-turkey-hair-transplant",
    title: "UK vs Turkey Hair Transplant",
    seoTitle: "UK vs Turkey Hair Transplant: What to Compare",
    description:
      "Compare UK and Turkey hair transplant options with a balanced look at consultation access, travel, aftercare, clinic standards, and overall value.",
    eyebrow: "UK vs Turkey hair transplant",
    lead:
      "If you are deciding between a hair transplant in the UK and a hair transplant in Turkey, the decision is usually about more than price. Patients often compare consultation access, travel, aftercare, clinic standards, and how comfortable they feel with the overall route.",
    heroImageSrc: "/images/london-location-section.png",
    heroImageAlt:
      "Premium London hair transplant consultation with central London city views, used to frame UK versus Turkey treatment comparison",
    keywords: [
      "uk vs turkey hair transplant",
      "hair transplant uk or turkey",
      "hair transplant turkey or london",
      "hair transplant turkey comparison",
      "hair transplant london or turkey",
    ],
    heroChips: [
      "London convenience vs travel",
      "Aftercare and recovery compared",
      "Cost in practical context",
    ],
    cards: [
      {
        title: "Why some patients stay in the UK",
        text: "For many patients, local consultation access, easier follow-up, and a familiar healthcare setting matter as much as the treatment itself.",
      },
      {
        title: "Why Turkey still attracts patients",
        text: "Turkey remains popular because pricing can be appealing and some patients are comfortable travelling for treatment when the package feels right.",
      },
      {
        title: "The better option depends on priorities",
        text: "The strongest decision usually comes from comparing travel, aftercare, clinic standards, and quote structure together rather than looking at one factor alone.",
      },
    ],
    sections: [
      {
        title: "Why patients compare the UK and Turkey",
        body: [
          "Most patients start this comparison because they want to understand whether staying in the UK is worth the extra cost, or whether travelling to Turkey offers better overall value for their case.",
          "The most useful comparison does not try to create a false winner. It explains the trade-offs clearly so you can judge which route fits your priorities, comfort level, and recovery planning.",
        ],
        bullets: [
          "The UK often appeals on convenience, local access, and easier follow-up.",
          "Turkey often appeals on overall package cost and willingness to travel for treatment.",
          "The right option depends on your priorities, not on one generic market narrative.",
        ],
      },
      {
        title: "When the UK may suit you better",
        body: [
          "The UK often suits patients who want face-to-face consultation access, easier travel on treatment day, and the reassurance of local aftercare once the procedure is over.",
          "For some people, being able to assess the clinic environment more directly, ask questions locally, and recover without overseas travel feels worth the higher quote.",
        ],
        bullets: [
          "You want local consultation and follow-up without flights or accommodation planning.",
          "You value a familiar healthcare setting and easier practical access to the clinic.",
          "You would feel more comfortable recovering close to home with simpler aftercare logistics.",
        ],
      },
      {
        title: "When Turkey may still be a reasonable option",
        body: [
          "Turkey may still be a reasonable route for patients who are comfortable travelling, who understand the logistics involved, and who are prepared to assess clinic quality carefully rather than relying on price alone.",
          "The strongest Turkey decisions usually come from comparing standards, communication, aftercare expectations, and travel realities before committing to a package.",
        ],
        bullets: [
          "You are comfortable with travel, accommodation, and remote follow-up where needed.",
          "You are comparing what is included in the package, not just the first figure shown.",
          "You are prepared to judge standards, planning, and recovery support carefully before booking.",
        ],
      },
    ],
    comparison: {
      title: "What to compare when choosing the UK or Turkey",
      intro:
        "A good decision usually depends on how these practical factors line up with your priorities.",
      columns: ["What to compare", "UK / London", "Turkey"],
      rows: [
        {
          label: "Consultation and aftercare",
          left: "Usually easier to manage locally, with simpler access to reviews and follow-up.",
          right: "May involve remote follow-up, travel planning, and more self-managed logistics after you return home.",
        },
        {
          label: "Travel and recovery logistics",
          left: "Lower travel burden and easier scheduling around work, home life, and follow-up visits.",
          right: "Usually involves flights, accommodation, airport transfers, and deciding how recovery fits around travel.",
        },
        {
          label: "Cost structure",
          left: "Often higher, but easier to compare when consultation access and local aftercare matter to you.",
          right: "Often appealing on package cost, though inclusions, support, and quality can vary widely.",
        },
        {
          label: "Clinic standards and reassurance",
          left: "Appeals to patients who want a familiar healthcare setting and easier local checks before treatment.",
          right: "Can still be a good option, but standards, planning, and communication need careful comparison before booking.",
        },
        {
          label: "Who it often suits",
          left: "Patients who prioritise convenience, local follow-up, and easier practical access.",
          right: "Patients who are comfortable travelling and are prepared to manage more of the process around an overseas trip.",
        },
      ],
    },
    faq: [
      {
        question: "Is the UK always better than Turkey?",
        answer:
          "No. The better option depends on your priorities. Some patients prefer the UK for convenience, local aftercare, and a familiar healthcare setting, while others are comfortable travelling to Turkey if the overall package and logistics feel right for them.",
      },
      {
        question: "Why do some patients choose London even if Turkey may cost less?",
        answer:
          "Many patients choose London because consultation access, local follow-up, easier travel, and the ability to recover close to home feel more comfortable and practical. For some, that convenience is worth paying more for.",
      },
      {
        question: "Is Turkey only about lower prices?",
        answer:
          "No. Turkey became popular for several reasons, including pricing, clinic volume, and the willingness of many patients to travel for treatment. The key is to compare standards, planning, communication, and aftercare rather than reducing the decision to cost alone.",
      },
      {
        question: "What should I compare apart from price?",
        answer:
          "Patients usually compare consultation access, who performs the procedure, how aftercare is handled, what the quote includes, how recovery fits around travel, and how comfortable they feel with the overall route.",
      },
      {
        question: "How important is aftercare in the UK versus Turkey decision?",
        answer:
          "Aftercare is one of the most important differences for many patients. Local follow-up can feel simpler and more reassuring in the UK, while overseas treatment may require more remote contact and more self-managed recovery once you are back home.",
      },
      {
        question: "Can I start with a London assessment even if I am still open to Turkey?",
        answer:
          "Yes. Many patients want a clear London assessment first so they can understand suitability, likely graft range, and recovery expectations before deciding whether staying in the UK or travelling to Turkey feels like the better fit.",
      },
    ],
    relatedSlugs: [
      "hair-transplant-london",
      "hair-transplant-cost-london",
      "how-we-select-clinics",
      "hair-transplant-recovery-timeline",
      "why-turkiye",
    ],
  },
  "why-turkiye": {
    slug: "why-turkiye",
    title: "Why Turkiye for Hair Transplant",
    seoTitle: "Why Turkiye for Hair Transplants",
    description:
      "Understand why some patients still choose Turkiye for hair transplant treatment, and what to compare around travel, package structure, aftercare, communication, and clinic standards before booking.",
    eyebrow: "Why Turkiye",
    lead:
      "Turkiye still appeals to many hair transplant patients, but the right decision is rarely only about the starting price. This page explains why some people still choose Turkiye, what may make the route sensible, and what should be checked before committing to treatment abroad.",
    heroImageSrc: "/images/home-hero-consultation.png",
    heroImageAlt:
      "Hair transplant consultation discussing travel-aware planning, package structure, and overseas treatment options",
    heroPanel: {
      eyebrow: "Travel-aware treatment planning",
      headline: "Free consultation before deciding on Turkiye",
      body:
        "Use the first conversation to compare travel, package structure, aftercare once you return, and whether an overseas route fits your priorities rather than defaulting to price alone.",
      note:
        "Turkiye pricing, inclusions, and follow-up support can vary by clinic and case. Compare the route before committing.",
    },
    keywords: [
      "why turkiye hair transplant",
      "why turkey hair transplant",
      "hair transplant turkey",
      "hair transplant turkiye",
      "should i go to turkey for hair transplant",
    ],
    heroChips: [
      "Travel and package planning",
      "Aftercare once you return",
      "Balanced Turkey-route guidance",
    ],
    cards: [
      {
        title: "Why some patients still choose Turkiye",
        text: "For some patients, package value, clinic volume, and comfort with travelling abroad still make Turkiye a route worth considering.",
      },
      {
        title: "Price is only one part of the decision",
        text: "A lower starting figure means less if communication, inclusions, doctor responsibility, or aftercare feel unclear once the package is examined properly.",
      },
      {
        title: "Travel changes the recovery experience",
        text: "Flights, accommodation, time away, and how support works after you return home all need to be part of the decision before booking treatment abroad.",
      },
    ],
    sections: [
      {
        title: "Why Turkiye still attracts patients",
        body: [
          "Turkiye continues to attract hair transplant patients because many people see it as a route to broader package value, higher clinic volume, and a treatment trip they feel comfortable organising around travel.",
          "That does not make it the right route for every patient. It does explain why the decision remains relevant, especially for people who are open to flying and want to compare more than one treatment pathway before they commit.",
        ],
        bullets: [
          "Some patients are comfortable travelling if the overall package feels worthwhile.",
          "The route can appeal when patients want to compare inclusions, clinic experience, and travel-based value together.",
          "The strongest decisions come from understanding the full process rather than reacting only to the first advertised figure.",
        ],
      },
      {
        title: "When Turkiye may suit you",
        body: [
          "Turkiye may suit you if you are comfortable with flights, accommodation planning, and the idea that part of the aftercare relationship may continue once you are back home rather than entirely face to face.",
          "It may also suit patients who want to compare broader package value and are prepared to spend time checking what is included, who is carrying out the treatment, and what support looks like after the trip itself.",
        ],
        bullets: [
          "You are comfortable travelling for treatment and recovery planning around flights.",
          "You want to compare package structure, doctor responsibility, and support rather than only a headline price.",
          "You are willing to ask detailed questions before booking rather than assuming every overseas route works the same way.",
        ],
      },
      {
        title: "What to verify before booking treatment in Turkiye",
        body: [
          "The key checks are not dramatically different from the checks patients should make anywhere else, but the overseas context makes some of them more important. Patients usually need to understand exactly who performs the procedure, how the quote is structured, and what happens if they have concerns after returning home.",
          "Communication matters too. A package can look attractive at first, but if expectations around donor capacity, likely graft range, shaving, recovery, or follow-up are not clear before you travel, the route becomes harder to judge properly.",
        ],
        bullets: [
          "Ask who performs the procedure and what the wider team is responsible for.",
          "Ask what the package includes, what may be separate, and how aftercare works once you return.",
          "Ask how realistic planning, communication, and recovery guidance are handled before you commit to flights or dates.",
        ],
      },
    ],
    comparison: {
      title: "What to compare before choosing Turkiye",
      intro:
        "A Turkiye route can still be a reasonable choice, but it is easier to judge when travel, package structure, communication, and aftercare are compared together rather than treated as separate issues.",
      columns: ["What to compare", "What to ask", "Why it matters"],
      rows: [
        {
          label: "Package structure",
          left: "Ask what is included in the quoted package, what may be charged separately, and whether medication, washing products, reviews, or transfers are part of the total.",
          right:
            "This makes it easier to compare true value instead of reacting to one headline number.",
        },
        {
          label: "Who performs the procedure",
          left: "Ask who carries out the key parts of treatment, how responsibilities are divided, and who is clinically accountable for the plan.",
          right:
            "Patients usually feel more confident when the treatment structure is explicit rather than implied.",
        },
        {
          label: "Travel and return-home recovery",
          left: "Ask how flights, timing, washing, swelling, and the first recovery days fit around the travel plan itself.",
          right:
            "Recovery is not separate from the journey. Travel can shape how manageable the first stage feels.",
        },
        {
          label: "Aftercare after you return",
          left: "Ask how review questions are handled once you are back in the UK, what kind of support is remote, and when in-person review would or would not be possible.",
          right:
            "This helps you judge how much of the aftercare experience you will be managing from home.",
        },
        {
          label: "Communication and expectations",
          left: "Ask how graft range, donor limits, shaving requirements, expected density, and likely recovery are explained before booking.",
          right:
            "Clear expectations often matter as much as the treatment itself when deciding whether to travel abroad.",
        },
      ],
    },
    faq: [
      {
        question: "Why do some patients still choose Turkiye for hair transplant?",
        answer:
          "Many patients still consider Turkiye because they are open to travelling, want to compare broader package value, and feel comfortable assessing an overseas route if the planning and communication are clear enough.",
      },
      {
        question: "Is Turkiye only attractive because of lower prices?",
        answer:
          "No. Price is one reason, but not the only one. Some patients also look at package structure, clinic volume, travel convenience for them personally, and whether they feel comfortable with the overall route.",
      },
      {
        question: "What should I check before booking treatment in Turkiye?",
        answer:
          "Patients usually want to check who performs the procedure, what the package includes, how aftercare works after returning home, how recovery fits around travel, and whether expectations around grafts, donor area, and density are being explained realistically.",
      },
      {
        question: "Can Turkiye still be a good option if I care about standards?",
        answer:
          "Yes, but standards still need to be judged actively rather than assumed. Patients should compare clinical responsibility, planning clarity, communication, and aftercare support rather than treating the route as safe or unsafe by default.",
      },
      {
        question: "How important is aftercare if I travel abroad for treatment?",
        answer:
          "It is very important. One of the main practical differences with overseas treatment is how much of the recovery and follow-up relationship happens once you are back home, which is why aftercare should be explained before you book.",
      },
      {
        question: "Should I get a London consultation first even if I may choose Turkiye later?",
        answer:
          "Many patients find that useful. A London-first consultation can help clarify suitability, likely graft range, recovery expectations, and priorities before deciding whether staying in the UK or travelling to Turkiye feels like the stronger fit.",
      },
    ],
    relatedSlugs: [
      "uk-vs-turkey-hair-transplant",
      "hair-transplant-london",
      "hair-transplant-cost-london",
      "our-clinical-standards",
    ],
  },
  "how-hair-transplant-works": {
    slug: "how-hair-transplant-works",
    title: "How Hair Transplant Works",
    seoTitle: "How Hair Transplant Works",
    description:
      "Understand how hair transplant works, including what happens before treatment, on procedure day, and during the recovery and growth stages afterwards.",
    eyebrow: "How the procedure works",
    lead:
      "Hair transplant treatment usually involves moving healthy follicles from a donor area to areas where hair has thinned or receded. This page explains what usually happens before treatment, on procedure day, and through the recovery and growth stages that follow.",
    keywords: [
      "how hair transplant works",
      "how hair transplant is done",
      "hair transplant procedure",
      "what is hair transplant surgery",
      "how does a hair transplant work",
    ],
    heroChips: [
      "Donor area to recipient area",
      "Treatment day explained clearly",
      "Recovery and growth in context",
    ],
    cards: [
      {
        title: "Planning comes before the procedure",
        text: "A hair transplant is not only about moving follicles. Suitability, donor area, design, and long-term planning all shape whether treatment makes sense.",
      },
      {
        title: "Treatment happens in stages",
        text: "Assessment, preparation, extraction, site creation, placement, and aftercare all form part of the wider process.",
      },
      {
        title: "Growth takes longer than many expect",
        text: "Early healing and shedding happen well before visible regrowth, so a useful explanation should cover the whole timeline rather than procedure day alone.",
      },
    ],
    sections: [
      {
        title: "How the procedure works in simple terms",
        body: [
          "A hair transplant usually works by taking healthy hair follicles from a donor area, often at the back or sides of the scalp, and placing them into areas where hair has thinned or receded.",
          "The transplanted follicles are your own hair. The procedure is not about creating new hair, but about redistributing available donor hair in a way that suits the pattern of loss, hair characteristics, and long-term plan.",
        ],
        bullets: [
          "Donor hair is moved from one part of the scalp to another.",
          "The pattern of loss, donor quality, and design plan all matter.",
          "The aim is usually natural-looking improvement, not instant or unlimited density.",
        ],
      },
      {
        title: "What happens before treatment day",
        body: [
          "Before treatment, a proper assessment should review your pattern of hair loss, donor area, likely graft range, medical and treatment history where relevant, and whether transplant is the right next step at all.",
          "This part matters because not every patient is suitable immediately, and not every case can achieve the same level of coverage or density in one procedure.",
        ],
        bullets: [
          "Suitability should be assessed before a procedure is planned.",
          "The donor area needs to be reviewed realistically.",
          "Method options such as FUE or DHI should be explained in the context of your case.",
        ],
      },
      {
        title: "What happens on treatment day and afterwards",
        body: [
          "On treatment day, the scalp is prepared, donor follicles are extracted, recipient sites are created, and grafts are placed according to the treatment plan. Exactly how this is done can vary by case and method.",
          "Afterwards, the focus shifts to healing and aftercare. Washing guidance, swelling, redness, scabbing, and the longer growth cycle all form part of how the procedure works in practice, not just what happens in the clinic chair.",
        ],
        bullets: [
          "Procedure day is only one part of the overall treatment process.",
          "Early healing and aftercare instructions matter immediately afterwards.",
          "Visible regrowth usually develops much later than the first healing stage.",
        ],
      },
    ],
    comparison: {
      title: "How the process usually breaks down",
      intro:
        "Patients usually find the procedure easier to understand when it is broken into practical stages rather than treated as one single event.",
      columns: ["Stage", "What usually happens", "Why it matters"],
      rows: [
        {
          label: "Assessment",
          left: "Hair loss, donor area, goals, suitability, and likely graft requirements are reviewed.",
          right:
            "This helps decide whether transplant is appropriate and what kind of plan may be realistic.",
        },
        {
          label: "Planning",
          left: "The treatment approach, hairline or coverage plan, and method are discussed before the procedure.",
          right:
            "A stronger plan usually leads to a more natural and better-judged result.",
        },
        {
          label: "Procedure day",
          left: "Follicles are extracted from the donor area and placed into the recipient area according to the plan.",
          right:
            "This is the main treatment stage, but it only makes sense within the wider planning and aftercare process.",
        },
        {
          label: "Early recovery",
          left: "Patients usually deal with washing guidance, swelling, redness, scabbing, and early healing.",
          right:
            "Recovery expectations affect confidence and are part of understanding the treatment properly.",
        },
        {
          label: "Growth and maturation",
          left: "Shedding, regrowth, and maturation happen gradually over time rather than all at once.",
          right:
            "Results need time, which is why a useful explanation should cover the longer timeline as well.",
        },
      ],
    },
    timeline: [
      {
        title: "Before treatment",
        text: "Assessment, suitability discussion, donor review, planning, and deciding whether transplant is the right next step.",
      },
      {
        title: "Treatment day",
        text: "Preparation, donor extraction, recipient-site work, and graft placement according to the agreed treatment plan.",
      },
      {
        title: "Early recovery",
        text: "Washing guidance, swelling management, redness, healing, scabbing, and the first visible recovery stage.",
      },
      {
        title: "Growth phase",
        text: "A longer cycle where shedding, regrowth, maturation, and visible density develop gradually rather than all at once.",
      },
    ],
    faq: [
      {
        question: "How does a hair transplant work in simple terms?",
        answer:
          "It usually works by moving healthy follicles from a donor area to areas where hair has thinned or receded. The result depends on donor quality, planning, hair characteristics, design, and aftercare rather than the transfer alone.",
      },
      {
        question: "Is it my own hair being moved?",
        answer:
          "Yes. In a standard hair transplant, your own follicles are moved from one part of the scalp to another. The procedure does not create new follicles; it redistributes existing donor hair.",
      },
      {
        question: "Does the process follow the same steps for everyone?",
        answer:
          "No. The broad stages are similar, but planning varies by hair-loss pattern, donor capacity, treatment goals, method choice, and whether transplant is appropriate for the case at that point.",
      },
      {
        question: "How long does a hair transplant take?",
        answer:
          "Procedure time varies by case, graft count, and method, so there is no one fixed answer. A consultation should explain the likely scale of treatment and what that means for the day itself.",
      },
      {
        question: "When do patients usually see results?",
        answer:
          "Visible growth usually takes time. Early healing happens first, and patients often go through a shedding stage before new growth becomes more noticeable later in the process.",
      },
      {
        question: "Why should recovery be explained as part of how it works?",
        answer:
          "Because the procedure only makes full sense when patients also understand healing, shedding, washing guidance, and the longer growth timeline that follows treatment day.",
      },
    ],
    relatedSlugs: [
      "fue-vs-dhi",
      "hair-transplant-recovery-timeline",
      "hair-transplant-side-effects",
      "hair-transplant-london",
    ],
  },
  "hair-transplant-recovery-timeline": {
    slug: "hair-transplant-recovery-timeline",
    title: "Hair Transplant Recovery Timeline",
    seoTitle: "Hair Transplant Recovery Timeline",
    description:
      "See a practical hair transplant recovery timeline covering the first days, weeks, and months after treatment, including healing, shedding, swelling, and when growth usually becomes more visible.",
    eyebrow: "Recovery timeline",
    lead:
      "Recovery after a hair transplant usually happens in stages. The first days are more about healing, the first few weeks can feel uneven, and visible regrowth usually takes much longer than many patients expect.",
    heroImageSrc: "/images/cost-london-hero.png",
    heroImageAlt:
      "Hair transplant consultation in a premium London clinic with treatment-day planning and recovery guidance being discussed",
    keywords: [
      "hair transplant recovery timeline",
      "hair transplant recovery time",
      "hair transplant healing timeline",
      "hair transplant aftercare",
      "hair transplant recovery stages",
    ],
    heroChips: [
      "First days to first year",
      "Healing and regrowth explained separately",
      "Side effects in practical context",
    ],
    cards: [
      {
        title: "Healing and growth are not the same thing",
        text: "Early recovery is usually about swelling, redness, scabbing, and washing guidance, while visible regrowth tends to come much later.",
      },
      {
        title: "The first month can feel uneven",
        text: "Patchiness, shedding, and temporary anxiety are common reasons patients search for recovery guidance in the weeks after treatment.",
      },
      {
        title: "Good aftercare matters early",
        text: "Following washing and recovery instructions in the early stage is part of the treatment process, not an optional extra.",
      },
    ],
    sections: [
      {
        title: "What recovery usually feels like at the start",
        body: [
          "In the first few days, patients are usually dealing with aftercare instructions, washing guidance, tenderness, tightness, redness, scabbing, and sometimes swelling. This is the early healing stage, not the final cosmetic result.",
          "What matters most at this point is usually following your treating clinic's instructions closely and understanding that the area may look more obvious before it starts to settle.",
        ],
        bullets: [
          "Early healing can include redness, scabbing, swelling, and tenderness.",
          "The donor and recipient areas often look more active before they look more settled.",
          "Your own clinic's aftercare instructions should guide the first days.",
        ],
      },
      {
        title: "Why the first few weeks can feel confusing",
        body: [
          "Once the very early healing stage starts to settle, patients often expect the area to look better quickly. In reality, the next phase can still feel uneven. The scalp may look patchy, the hair may not look established yet, and transplanted hairs can shed before later regrowth.",
          "That is why recovery is best understood as a staged process. A change that feels worrying at first is not always a sign that something has gone wrong, but it should still be checked if symptoms are worsening or feel clearly outside the normal pattern explained by your clinic.",
        ],
        bullets: [
          "Shedding in the early months can happen before later regrowth becomes more visible.",
          "Looking patchy for a time does not necessarily mean the result has failed.",
          "If pain, redness, discharge, or swelling are getting worse rather than better, your treating clinic should review it.",
        ],
      },
      {
        title: "Why results take longer than healing",
        body: [
          "Healing and growth happen on different timelines. The scalp may start to look calmer well before meaningful regrowth appears. That gap is one of the most important parts of setting realistic expectations.",
          "Most patients want two timelines explained clearly: when the scalp usually settles, and when the transplanted hair may start to show more obvious change. Those are not the same stage of recovery.",
        ],
        bullets: [
          "Healing often happens earlier than visible regrowth.",
          "Growth, thickness, and maturation usually develop gradually over a longer period.",
          "A useful recovery explanation covers both the short-term healing stage and the longer growth phase.",
        ],
      },
    ],
    comparison: {
      title: "What patients often notice at each recovery stage",
      intro:
        "Recovery is easier to judge when you separate early healing from later regrowth.",
      columns: ["Recovery stage", "What patients often notice", "What to keep in mind"],
      rows: [
        {
          label: "First days",
          left: "Tenderness, redness, scabbing, washing instructions, and sometimes swelling.",
          right:
            "This is usually the main healing stage and should be guided by your clinic's aftercare instructions.",
        },
        {
          label: "First few weeks",
          left: "The scalp may look calmer, but the appearance can still feel uneven or patchy.",
          right:
            "Looking unsettled for a while is not unusual, even when recovery is progressing.",
        },
        {
          label: "Month 1 to Month 3",
          left: "Shedding and limited visible improvement can make patients anxious.",
          right:
            "Early shedding can be part of the process before later regrowth becomes clearer.",
        },
        {
          label: "Month 4 onward",
          left: "Gradual regrowth and more visible change may begin to appear.",
          right:
            "Results usually build gradually rather than appearing all at once.",
        },
        {
          label: "Longer maturation",
          left: "Thickness, texture, and overall appearance continue to evolve over time.",
          right:
            "A longer timeline is normal, which is why early patience is part of realistic expectation setting.",
        },
      ],
    },
    timeline: [
      {
        title: "Day 1 to Day 7",
        text: "Early aftercare, washing guidance, tenderness, redness, scabbing, and the main swelling window if swelling is going to happen.",
      },
      {
        title: "Week 2 to Week 4",
        text: "Visible healing often improves, but the scalp can still look patchy or unsettled while the early recovery phase continues.",
      },
      {
        title: "Month 1 to Month 3",
        text: "Shedding and limited visible progress can make patients anxious even when the recovery is still following a normal pattern.",
      },
      {
        title: "Month 4 to Month 12",
        text: "Growth, thickness, and texture usually develop gradually, with more meaningful visible change taking much longer than many first-time patients expect.",
      },
    ],
    faq: [
      {
        question: "How long does hair transplant recovery usually take?",
        answer:
          "Recovery usually has two timelines: early healing and later regrowth. The first days and weeks are more about swelling, scabbing, washing, and settling, while visible growth usually takes much longer to develop.",
      },
      {
        question: "Is shedding normal after a hair transplant?",
        answer:
          "Shedding can happen as part of the recovery process and often worries patients because it feels like progress is going backwards. That is one reason a staged timeline is so important before treatment.",
      },
      {
        question: "When do patients usually see regrowth?",
        answer:
          "Visible regrowth usually happens later than the first healing stage. Patients often need to separate scalp recovery from the later growth phase so expectations stay realistic.",
      },
      {
        question: "What symptoms should be checked by the clinic?",
        answer:
          "If pain, redness, swelling, discharge, or bleeding are worsening rather than settling, or if something feels clearly outside the recovery pattern explained to you, your treating clinic should review it promptly.",
      },
      {
        question: "Why does the area sometimes look worse before it looks better?",
        answer:
          "Because early recovery is not the same as the final result. The scalp may go through redness, scabbing, shedding, and an uneven phase before later regrowth starts to become more visible.",
      },
      {
        question: "Does the exact timeline vary from patient to patient?",
        answer:
          "Yes. Recovery can vary with the case, the treatment approach, the size of the procedure, and individual healing patterns. That is why broad stages are more useful than a promise of one exact timetable for everyone.",
      },
    ],
    relatedSlugs: [
      "hair-transplant-side-effects",
      "how-hair-transplant-works",
      "hair-transplant-without-shaving",
      "hair-transplant-london",
    ],
  },
  "hair-transplant-side-effects": {
    slug: "hair-transplant-side-effects",
    title: "Hair Transplant Side Effects",
    seoTitle: "Hair Transplant Side Effects",
    description:
      "Understand common hair transplant side effects such as swelling, itching, shedding, tenderness, scabbing, and tightness, plus when symptoms should be reviewed by the treating clinic.",
    eyebrow: "What side effects to expect",
    lead:
      "Hair transplant side effects are one of the biggest concerns patients have before treatment. This page explains which symptoms are commonly discussed after a procedure, what may settle with time, and when a symptom should be reviewed rather than simply watched.",
    keywords: [
      "hair transplant side effects",
      "hair transplant swelling",
      "hair transplant itching",
      "hair transplant scars",
      "hair transplant numbness",
    ],
    heroChips: [
      "Common symptoms explained",
      "Balanced reassurance",
      "When to ask for review",
    ],
    cards: [
      {
        title: "Common does not mean irrelevant",
        text: "Symptoms such as swelling, itching, tenderness, and scabbing are often discussed after treatment, but they still need proper aftercare and sensible review if they worsen.",
      },
      {
        title: "Context matters more than reassurance alone",
        text: "A useful explanation helps patients understand which symptoms often settle, which can feel alarming, and which should not simply be ignored.",
      },
      {
        title: "Honest explanation builds trust",
        text: "Patients usually feel more confident when side effects are explained calmly and clearly rather than hidden behind sales language.",
      },
    ],
    sections: [
      {
        title: "Which side effects are commonly discussed",
        body: [
          "Commonly discussed side effects after a hair transplant can include swelling, redness, scabbing, itching, tenderness, tightness, temporary numbness, and shedding. Some degree of scarring is also part of surgery, although how visible it is can vary by method, healing, and hair length.",
          "Knowing that these symptoms may happen is useful, but it does not replace aftercare. Patients still need clear instructions from their treating clinic and a sensible threshold for asking for review if something does not feel right.",
        ],
        bullets: [
          "Swelling, scabbing, itching, and tenderness are commonly discussed in early recovery.",
          "Temporary tightness or altered feeling can also happen after surgery.",
          "Some scarring is part of surgery, even if its visibility varies between cases.",
        ],
      },
      {
        title: "Why symptoms need timing and context",
        body: [
          "A symptom means more when you know when it usually appears and how it is expected to settle. Swelling in the early days is very different from worsening pain or discharge later in recovery.",
          "That is why a side-effects page works best alongside the recovery timeline. The goal is not to alarm patients, but to help them understand the difference between expected recovery signs and symptoms that need checking.",
        ],
        bullets: [
          "Early swelling or scabbing may be part of normal healing.",
          "Shedding later in the timeline can still worry patients even when it is part of the process.",
          "A symptom that is worsening rather than settling should be reviewed.",
        ],
      },
      {
        title: "When a symptom should be reviewed",
        body: [
          "Patients do not need to panic at every change, but they should not feel they have to guess either. If a symptom is getting worse, feels unusually intense, or does not fit the recovery pattern explained by the clinic, it is reasonable to ask for review.",
          "That is especially true if there is increasing redness, discharge, bleeding, or pain rather than gradual settling. The safest next step is usually to contact the treating clinic so they can guide the response.",
        ],
        bullets: [
          "Worsening pain, redness, swelling, or discharge should be checked.",
          "Bleeding or symptoms that feel clearly outside the expected pattern should be reviewed promptly.",
          "A treating clinic should guide the decision when something feels off rather than leaving patients to interpret it alone.",
        ],
      },
    ],
    comparison: {
      title: "How patients often think about common symptoms",
      intro:
        "This table is not a substitute for your clinic's advice, but it shows how patients often separate expected recovery signs from symptoms that may need review.",
      columns: ["Symptom", "What patients often notice", "When to contact the clinic"],
      rows: [
        {
          label: "Swelling",
          left: "Often discussed in the early recovery stage, sometimes affecting the forehead or nearby areas.",
          right:
            "If it is worsening, unusually severe, or not matching the expected pattern explained to you.",
        },
        {
          label: "Itching and scabbing",
          left: "Commonly mentioned as part of healing while the scalp settles.",
          right:
            "If the area looks increasingly inflamed, infected, or far more uncomfortable than expected.",
        },
        {
          label: "Tenderness or tightness",
          left: "Some discomfort, throbbing, or tightness can happen in the donor or recipient area early on.",
          right:
            "If pain is intensifying rather than easing, or if it feels disproportionate to the stage of recovery.",
        },
        {
          label: "Shedding",
          left: "Temporary shedding can worry patients because it may feel like progress is reversing.",
          right:
            "If you are unsure whether what you are seeing fits the expected timeline, it is reasonable to ask for clarification.",
        },
        {
          label: "Redness, discharge, or bleeding",
          left: "These need more caution because they may not be routine recovery signs depending on the stage and severity.",
          right:
            "These should be discussed with the treating clinic promptly, especially if they are increasing rather than settling.",
        },
      ],
    },
    faq: [
      {
        question: "Are swelling and itching normal after a hair transplant?",
        answer:
          "They are commonly discussed as part of early recovery, but context matters. A symptom that fits the expected stage and is settling is very different from one that is worsening or feels unusually severe.",
      },
      {
        question: "Is shedding a side effect or part of the process?",
        answer:
          "Patients often experience shedding as part of the wider recovery and growth process. It can still feel alarming, which is why it should be explained clearly before treatment rather than discovered by surprise afterwards.",
      },
      {
        question: "Can numbness or tightness happen after surgery?",
        answer:
          "Yes. Temporary tightness or altered feeling can be part of recovery after surgery. If it feels unusual, prolonged, or clearly outside what your clinic explained, it should be checked.",
      },
      {
        question: "Do side effects mean the transplant has failed?",
        answer:
          "Not necessarily. Many recovery signs look worrying before patients understand the timeline. What matters is whether the symptom fits the stage of recovery and whether it is settling or worsening over time.",
      },
      {
        question: "When should I contact the clinic about a symptom?",
        answer:
          "If pain, redness, swelling, bleeding, or discharge are getting worse, or if something feels clearly outside the recovery pattern you were given, the treating clinic should review it promptly.",
      },
      {
        question: "Why is it worth understanding side effects before treatment?",
        answer:
          "Because patients usually feel more prepared when they know what may happen in recovery, what is commonly discussed after surgery, and what should be reviewed rather than assumed to be normal.",
      },
    ],
    relatedSlugs: [
      "hair-transplant-recovery-timeline",
      "how-hair-transplant-works",
      "our-clinical-standards",
      "fue-vs-dhi",
    ],
  },
  "female-hair-transplant-london": {
    slug: "female-hair-transplant-london",
    title: "Female Hair Transplant London",
    seoTitle: "Female Hair Transplant London",
    description:
      "Explore female hair transplant treatment in London with explanation around suitability, planning, hairline softness, density blending, and what women should ask before booking.",
    eyebrow: "For women considering treatment",
    lead:
      "Explore a female-specific London approach with clearer explanation around suitability, density blending, subtle framing, and the details that matter before booking.",
    keywords: [
      "female hair transplant london",
      "women hair transplant london",
      "hair transplant for women london",
      "female hair restoration london",
    ],
    heroChips: [
      "Female-specific explanation",
      "Held to the same high standard",
      "Clearer support for women",
    ],
    cards: [
      {
        title: "Made for women considering treatment",
        text: "Women should not feel like an afterthought in a service that often speaks mainly to men.",
      },
      {
        title: "Careful on suitability",
        text: "Women usually need clarity on suitability, density blending, and subtle design rather than generic transplant claims.",
      },
      {
        title: "More complete support",
        text: "Clear female explanation makes the overall experience feel more considered and less one-dimensional.",
      },
    ],
    sections: [
      {
        title: "Why the discussion is often different for women",
        body: [
          "For many women, density blending, part-line restoration, subtle framing, and realistic suitability matter more than aggressive hairline rhetoric.",
          "Not every woman with thinning is automatically a transplant candidate. Making space for that nuance strengthens credibility rather than weakening conversion.",
        ],
      },
      {
        title: "Why women benefit from dedicated explanation",
        body: [
          "Women often arrive with different concerns around suitability, discretion, density blending, and visible downtime. Speaking to those concerns directly makes the whole experience feel more considered.",
        ],
        bullets: [
          "Female-specific suitability and consultation language should feel natural and direct.",
          "Cost, standards, and recovery should stay easy to reach from here.",
          "The tone should stay premium and calm rather than beauty-trend driven.",
        ],
      },
    ],
    faq: [
      {
        question: "Do women need different trust standards?",
        answer:
          "The core trust standards stay the same, but the consultation and suitability language should speak more clearly to diffuse thinning, density blending, and subtle framing goals.",
      },
      {
        question: "Can this still work for a service that sees more men than women?",
        answer:
          "Yes. A service can see more men overall while still treating women seriously and giving them clear, relevant information.",
      },
      {
        question: "Why is there separate London information for women?",
        answer:
          "Because women considering this treatment usually want explanation that speaks to them directly rather than being filtered through more general wording.",
      },
    ],
    relatedSlugs: [
      "hair-transplant-london",
      "hair-transplant-cost-london",
      "our-clinical-standards",
      "hair-transplant-recovery-timeline",
    ],
  },
  "hair-transplant-without-shaving": {
    slug: "hair-transplant-without-shaving",
    title: "Hair Transplant Without Shaving",
    seoTitle: "Hair Transplant Without Shaving",
    description:
      "Learn when a hair transplant without shaving may be considered, what it changes in planning and recovery, and why not every patient is suited to this approach.",
    eyebrow: "Treatment without shaving",
    lead:
      "Explore when an unshaven or long-hair approach may be considered, what it changes in planning and recovery, and why it is not the right fit for every case.",
    keywords: [
      "hair transplant without shaving",
      "unshaven hair transplant",
      "hair transplant with long hair",
      "hair transplant without shaving head",
    ],
    heroChips: [
      "When unshaven treatment may suit",
      "High relevance to image-conscious patients",
      "Useful support for female and professional audiences",
    ],
    cards: [
      {
        title: "Discretion matters",
        text: "Many patients ask about unshaven treatment because they want to keep treatment less visible.",
      },
      {
        title: "Work and social visibility",
        text: "This question often matters most to patients worried about work disruption, social visibility, or privacy.",
      },
      {
        title: "Not right for everyone",
        text: "An unshaven approach can be useful in the right case, but it needs clear discussion around suitability and practical limits.",
      },
    ],
    sections: [
      {
        title: "Why patients ask about unshaven treatment",
        body: [
          "Patients usually ask about unshaven treatment because they want to reduce visual disruption, maintain privacy, or avoid a dramatic change in appearance around work and social life.",
          "An unshaven approach is not automatically available to everyone and may affect planning, speed, and suitability.",
        ],
      },
      {
        title: "Why this question matters",
        body: [
          "Questions about shaving, visibility, and discretion are often practical deal-breakers for patients. Giving them a direct answer helps the decision feel less abstract.",
        ],
      },
    ],
    faq: [
      {
        question: "Can everyone have treatment without shaving?",
        answer:
          "No. Suitability depends on the case, the treatment plan, and the practical realities of the chosen method.",
      },
      {
        question: "Who is most likely to care about this topic?",
        answer:
          "Professionals, public-facing workers, image-conscious patients, and some women often care most about discretion and visible downtime.",
      },
      {
        question: "Why do patients ask about this before treatment?",
        answer:
          "Because it speaks directly to one of the most practical objections patients have before treatment: how disruptive it will look.",
      },
    ],
    relatedSlugs: [
      "fue-vs-dhi",
      "how-hair-transplant-works",
      "female-hair-transplant-london",
      "hair-transplant-recovery-timeline",
    ],
  },
  "fue-vs-dhi": {
    slug: "fue-vs-dhi",
    title: "FUE Vs DHI",
    seoTitle: "FUE Vs DHI | Hair Transplant Method Comparison",
    description:
      "Compare FUE vs DHI hair transplant methods, what each approach changes in planning and execution, and how patients should think about technique without treating acronyms like a shortcut to quality.",
    eyebrow: "FUE and DHI compared",
    lead:
      "Compare FUE and DHI with a clearer understanding of what changes in planning and execution, and why no acronym replaces good judgement or case suitability.",
    keywords: [
      "fue vs dhi",
      "which hair transplant method is best",
      "dhi hair transplant london",
      "fue hair transplant london",
    ],
    heroChips: [
      "FUE and DHI explained",
      "Method differences explained",
      "Useful before treatment decisions",
      "Explains trade-offs honestly",
    ],
    cards: [
      {
        title: "Explains technique without hype",
        text: "Patients need to understand that method matters, but not more than planning, judgement, and case suitability.",
      },
      {
        title: "Useful at decision stage",
        text: "A clear comparison helps patients make sense of the acronyms and technique claims they keep seeing.",
      },
      {
        title: "Best read with the wider picture",
        text: "Method explanations make more sense when they are read alongside standards, procedure details, and recovery.",
      },
    ],
    sections: [
      {
        title: "Method matters, but planning matters more",
        body: [
          "There is no universally superior method for every patient. A better comparison explains how FUE and DHI are discussed, what changes in workflow, and why results still depend on planning, hair characteristics, and clinical judgement.",
        ],
      },
      {
        title: "Why patients compare methods",
        body: [
          "Patients comparing FUE and DHI are usually past the first basics. They want clear reasoning rather than buzzwords.",
        ],
      },
    ],
    faq: [
      {
        question: "Can one method be called the best?",
        answer:
          "The strongest answer explains that the best method depends on the case. Context and honesty matter more than an absolute claim.",
      },
      {
        question: "Is this comparison too technical to be useful?",
        answer:
          "No. It helps patients make sense of the acronyms they keep seeing and turns technique talk into something easier to judge.",
      },
      {
        question: "What should I read next?",
        answer:
          "Most patients then want to read about London options, the procedure itself, the recovery timeline, and the relevant treatments for their case.",
      },
    ],
    relatedSlugs: [
      "how-hair-transplant-works",
      "hair-transplant-without-shaving",
      "hair-transplant-london",
      "hair-transplant-recovery-timeline",
    ],
  },
};

export const topicPageList = Object.values(topicPages);

export function getTopicPage(slug: string) {
  return topicPages[slug];
}
