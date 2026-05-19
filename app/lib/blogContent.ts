import type { LinkCard, TopicFaq } from "@/app/lib/siteContent";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
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
  "imageSrc" | "imageAlt" | "imagePosition"
>;

const rawBlogPosts: BaseBlogPost[] = [
  {
    slug: "hair-transplant-consultation-london-what-to-expect",
    title: "What to Expect From a Hair Transplant Consultation in London",
    seoTitle:
      "Hair Transplant Consultation London: What to Expect Before You Book",
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
    slug: "hair-transplant-cost-london-what-changes-the-price",
    title: "Why Hair Transplant Costs Differ in London",
    seoTitle:
      "Hair Transplant Cost London: What Changes the Price and What to Compare",
    description:
      "Understand why hair transplant costs vary in London, what should be included in a quote, and how to compare value beyond the first price.",
    excerpt:
      "Two London quotes can differ because of graft range, method, doctor involvement, provider setting, aftercare, and how carefully the case has been planned.",
    eyebrow: "Cost guide",
    answerSummary:
      "Hair transplant cost in London can vary because the quote reflects more than graft count. The area treated, donor characteristics, treatment method, level of doctor involvement, provider setting, and aftercare structure all influence price. The most useful comparison is not the cheapest quote, but the clearest one.",
    readTime: "9 min read",
    updatedAt: "2026-05-07",
    keywords: [
      "hair transplant cost london",
      "how much is hair transplant in london",
      "hair transplant quote london",
      "why hair transplant prices vary",
    ],
    keyTakeaways: [
      "The lowest quote is not always the strongest value if planning and aftercare are weak.",
      "Price should be understood alongside graft range, method, provider standards, and follow-up.",
      "Patients should compare what is included, not just the headline number.",
    ],
    sections: [
      {
        heading: "What usually changes the cost?",
        paragraphs: [
          "Hair transplant prices in London vary because cases vary. Hairline work, crown work, diffuse thinning, female restoration, facial-hair work, and scar refinement all place different demands on planning and graft use.",
          "Cost can also shift depending on whether the discussion is around FUE, DHI-style implantation, no-shave approaches, or a more standard shave-and-implant route. Even where the broad technique sounds similar, the treatment design and staffing model can differ.",
        ],
        bullets: [
          "Area treated and expected graft range",
          "Donor area quality and hair characteristics",
          "Method and implantation approach",
          "Complexity of the case and long-term planning needs",
        ],
      },
      {
        heading: "What should a London quote include?",
        paragraphs: [
          "A proper quote should be attached to a treatment plan rather than sent as a vague number. Patients should understand whether pre-op assessment, treatment day medication, aftercare, washing guidance, follow-up, and any review appointments are included.",
          "It also helps to know whether the quote assumes one session, a likely graft range rather than an exact fixed count, and whether additional support such as non-surgical hair-loss treatment has been discussed separately.",
        ],
      },
      {
        heading: "Why standards and follow-up affect value",
        paragraphs: [
          "In London, part of the value proposition is not only treatment day but access before and after treatment. Local consultation, easier follow-up, a familiar care environment, and a regulated provider setting can all matter to patients who want more structure around the decision.",
          "That does not mean one route is automatically right for everyone. It means that quote comparisons should include the practical experience around treatment, not only the initial invoice.",
        ],
      },
      {
        heading: "How to compare two quotes properly",
        paragraphs: [
          "When you compare quotes, ask whether both are describing the same treatment goal. A lower price is not a like-for-like comparison if the design is more conservative, aftercare is lighter, or the clinical structure is less clear.",
          "Patients often benefit from writing down the same comparison points for each option so they can judge both cost and confidence side by side.",
        ],
        bullets: [
          "What is the likely graft range and treatment goal?",
          "Who is responsible for planning and medical oversight?",
          "What aftercare and follow-up are included?",
          "How clearly are limitations and risks explained?",
        ],
      },
    ],
    faq: [
      {
        question: "Does a higher price always mean a better clinic?",
        answer:
          "No. Price alone is not proof of quality. The important question is whether the quote is linked to clear planning, suitable expectations, strong standards, and a well-explained treatment structure.",
      },
      {
        question: "Can I compare London and Turkey on price alone?",
        answer:
          "You can compare starting prices, but a proper comparison should also include travel, consultation access, local follow-up, provider standards, and how aftercare is handled.",
      },
    ],
    relatedLinks: [
      {
        href: "/hair-transplant-cost-london",
        label: "Hair Transplant Cost in London",
        description:
          "See the commercial cost page for a clearer overview of quotes, value, and consultation planning.",
      },
      {
        href: "/uk-vs-turkey-hair-transplant",
        label: "UK vs Turkey Hair Transplant",
        description:
          "Compare price with travel, standards, convenience, and aftercare before choosing a route.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-hair-transplant-clinic-in-london",
    title: "How to Choose a Hair Transplant Clinic in London",
    seoTitle:
      "How to Choose a Hair Transplant Clinic in London: What Patients Should Check",
    description:
      "A practical guide to choosing a hair transplant clinic in London, including doctor registration, provider standards, consultation quality, and aftercare.",
    excerpt:
      "Patients should check who plans the treatment, who performs key stages, whether standards are clearly explained, and how aftercare will work after the procedure.",
    eyebrow: "Clinic selection guide",
    answerSummary:
      "The best way to choose a hair transplant clinic in London is to judge the full treatment structure, not just the sales message. Patients should understand who is medically responsible, how suitability is assessed, what provider standards are in place, how realistic the planning feels, and how aftercare will be handled once treatment is over.",
    readTime: "8 min read",
    updatedAt: "2026-05-07",
    keywords: [
      "best hair transplant clinic london",
      "how to choose hair transplant clinic",
      "gmc registered hair transplant doctor london",
      "cqc hair transplant clinic",
    ],
    keyTakeaways: [
      "A clinic should be judged by planning, standards, and aftercare, not only before-and-after marketing.",
      "Patients should know who is clinically responsible and how suitability is assessed.",
      "A calm, specific consultation is usually more useful than a fast sales-driven one.",
    ],
    sections: [
      {
        heading: "Start with who is responsible for your care",
        paragraphs: [
          "One of the most important questions is also one of the simplest: who is medically responsible for your treatment plan? Patients should understand who assesses suitability, who approves the design, and who is responsible for clinical decisions before, during, and after the procedure.",
          "That matters because hair transplant is not only a cosmetic purchase. It is a treatment decision with long-term consequences for donor use, appearance, and future planning.",
        ],
      },
      {
        heading: "Why consultation quality is one of the best signals",
        paragraphs: [
          "A strong consultation usually feels specific rather than scripted. It should discuss your pattern of loss, donor area, priorities, likely limitations, and what a realistic result may look like for your case.",
          "If the conversation stays vague, rushes to a price, or avoids discussing limitations, you may not yet have enough information to judge the provider properly.",
        ],
      },
      {
        heading: "What standards should patients look for in London?",
        paragraphs: [
          "For many patients in England, doctor registration and provider regulation are part of the trust decision. Patients often want to know whether the treating doctors are GMC-registered and whether the provider setting is CQC-registered.",
          "Those signals do not replace common sense, but they help patients assess the clinical setting, governance structure, and level of accountability around treatment and aftercare.",
        ],
        bullets: [
          "Clear explanation of who performs each stage",
          "Transparent consultation and suitability process",
          "Credible discussion of aftercare and follow-up",
          "Realistic language around outcomes and density",
        ],
      },
      {
        heading: "Why before-and-after photos are only one part of the picture",
        paragraphs: [
          "Photos can be useful, but they should not carry the entire decision. Patients should also know the area treated, how long after treatment the photo was taken, and whether the result reflects the kind of case they actually have.",
          "Good proof supports the clinical discussion. It should not replace questions about planning, suitability, standards, and recovery.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I avoid clinics that will not answer detailed questions?",
        answer:
          "A provider does not need to promise everything immediately, but they should be willing to explain planning, standards, likely limits, and aftercare clearly enough for you to judge the route properly.",
      },
      {
        question: "Is it reasonable to ask about GMC and CQC?",
        answer:
          "Yes. Those are sensible trust questions for patients comparing treatment in England, especially if they want a clearer understanding of the doctor and provider setting involved.",
      },
    ],
    relatedLinks: [
      {
        href: "/how-we-select-clinics",
        label: "How We Select Clinics",
        description:
          "See the criteria used when judging standards, consultation quality, and aftercare.",
      },
      {
        href: "/our-clinical-standards",
        label: "Our Clinical Standards",
        description:
          "Review the standards and trust signals patients should understand before treatment.",
      },
    ],
  },
  {
    slug: "uk-vs-turkey-hair-transplant-how-to-compare",
    title: "UK vs Turkey Hair Transplant: How to Compare the Two Routes",
    seoTitle:
      "UK vs Turkey Hair Transplant: How to Compare Cost, Standards, and Follow-Up",
    description:
      "A balanced guide to comparing UK and Turkey hair transplant routes, including cost, travel, follow-up, standards, and suitability considerations.",
    excerpt:
      "Compare the UK and Turkey routes by looking at more than starting price: consultation access, follow-up, standards, travel, recovery logistics, and what type of support you want around treatment.",
    eyebrow: "Comparison guide",
    answerSummary:
      "UK versus Turkey hair transplant is not only a price comparison. The main differences usually involve consultation access, travel, follow-up convenience, recovery logistics, provider structure, and how closely you want the treatment process to sit within your normal life. The better route depends on your priorities, not on one headline claim.",
    readTime: "9 min read",
    updatedAt: "2026-05-07",
    keywords: [
      "uk vs turkey hair transplant",
      "hair transplant london or turkey",
      "turkey vs uk hair transplant cost",
      "is london or turkey better for hair transplant",
    ],
    keyTakeaways: [
      "Turkey may offer lower starting prices, but total value depends on follow-up, travel, standards, and planning.",
      "London can suit patients who want easier consultation access and local aftercare.",
      "A balanced comparison should be based on your priorities rather than a one-sided sales story.",
    ],
    sections: [
      {
        heading: "What usually makes patients look at both routes?",
        paragraphs: [
          "Most patients compare London and Turkey because they are weighing cost against convenience. Turkey is widely known for lower entry pricing, while London can appeal to patients who want treatment, consultation, and follow-up to be easier to manage locally.",
          "That basic comparison is valid, but it becomes more useful when you break it down properly rather than treating both routes as identical procedures with different price tags.",
        ],
      },
      {
        heading: "Where London can have an advantage",
        paragraphs: [
          "For some patients, the strongest part of a London route is not only the treatment itself but the wider experience around it. Local consultation, easier review appointments, shorter travel, and a more familiar care environment can all matter if you want a calmer process.",
          "That can be especially relevant if you are anxious about recovery, want easier access to the treating team, or simply prefer decisions to be made closer to home.",
        ],
      },
      {
        heading: "Where Turkey can appeal",
        paragraphs: [
          "Turkey may appeal to patients who prioritise a lower starting price and are open to travelling for treatment. Some patients are comfortable handling travel and early recovery away from home if they believe the financial difference makes the route worthwhile.",
          "Even then, it still helps to compare how consultation quality, aftercare planning, and the practicalities of returning home shortly after treatment will affect your overall experience.",
        ],
      },
      {
        heading: "The comparison points that matter most",
        paragraphs: [
          "A balanced comparison should consider cost, consultation access, doctor and provider clarity, recovery planning, aftercare, and how easy it is to get support if you need reassurance after treatment.",
          "Patients often make stronger decisions when they compare both routes against the same list of priorities rather than relying on one dramatic selling point.",
        ],
        bullets: [
          "How much support do you want before treatment?",
          "How important is local follow-up to you?",
          "How are standards, responsibilities, and aftercare explained?",
          "Does the route fit your budget without pushing you into a rushed decision?",
        ],
      },
    ],
    faq: [
      {
        question: "Is Turkey always cheaper?",
        answer:
          "Turkey is often marketed at a lower starting price, but the total decision should also include travel, recovery logistics, local support, and what is included in the treatment structure.",
      },
      {
        question: "Is London always the safer option?",
        answer:
          "Not automatically. Patients still need to judge planning, standards, and aftercare carefully. The advantage of London is often convenience and access rather than an automatic guarantee.",
      },
    ],
    relatedLinks: [
      {
        href: "/uk-vs-turkey-hair-transplant",
        label: "UK vs Turkey Hair Transplant",
        description:
          "See the main comparison page for a treatment-focused overview of both routes.",
      },
      {
        href: "/hair-transplant-london",
        label: "Hair Transplant London",
        description:
          "Explore what the London route can look like when consultation and follow-up matter.",
      },
    ],
  },
  {
    slug: "hair-transplant-recovery-timeline-week-by-week",
    title: "Hair Transplant Recovery Timeline: What Happens Week by Week",
    seoTitle:
      "Hair Transplant Recovery Timeline: Week-by-Week Healing and Regrowth Guide",
    description:
      "A week-by-week guide to hair transplant recovery, including early healing, shedding, regrowth stages, and when patients usually see visible change.",
    excerpt:
      "Recovery has two phases: early healing in the first days and weeks, then slower regrowth over the following months. Understanding both helps set realistic expectations.",
    eyebrow: "Recovery guide",
    answerSummary:
      "Hair transplant recovery usually starts with early healing in the first one to two weeks, followed by a longer regrowth phase over several months. Most patients need to understand both stages separately: when redness, scabbing, washing, and shedding happen early on, and when visible growth usually starts later.",
    readTime: "8 min read",
    updatedAt: "2026-05-07",
    keywords: [
      "hair transplant recovery timeline",
      "hair transplant recovery week by week",
      "when does transplanted hair grow",
      "hair transplant shedding phase",
    ],
    keyTakeaways: [
      "Early healing and later regrowth are different phases and should not be confused.",
      "Scabbing, washing guidance, and the shedding phase are common parts of the early process.",
      "Visible cosmetic improvement usually takes months, not days or weeks.",
    ],
    sections: [
      {
        heading: "The first few days after treatment",
        paragraphs: [
          "The earliest stage of recovery usually focuses on protecting the grafts, managing swelling if it occurs, and following washing instructions carefully. Patients may also notice tenderness, redness, or a tight feeling around the treated area.",
          "This stage is mainly about healing rather than appearance. A good provider should explain how to sleep, wash, and return gradually to normal activity.",
        ],
      },
      {
        heading: "What often happens in the first two weeks",
        paragraphs: [
          "In the first one to two weeks, scabbing and crusting usually become a bigger concern for patients than long-term growth. This is also the period when washing guidance matters most.",
          "By the end of this phase, many patients are mainly looking for confirmation that healing is progressing normally and that the grafted area is settling as expected.",
        ],
      },
      {
        heading: "Why shedding can worry patients unnecessarily",
        paragraphs: [
          "The shedding phase often surprises patients who expected immediate visible improvement. In reality, temporary shedding after transplant is a commonly discussed part of the process and does not by itself mean the treatment has failed.",
          "This is one of the reasons recovery should be explained in advance. Patients are usually calmer when they know which changes are expected and when the longer regrowth phase begins.",
        ],
      },
      {
        heading: "When patients usually start looking for regrowth",
        paragraphs: [
          "Later recovery is slower and less dramatic day to day. Visible regrowth tends to be judged over months rather than weeks, and density maturation continues gradually rather than all at once.",
          "That is why realistic timing matters. The most useful recovery guidance explains not only when hair may return, but when patients usually have enough change to start judging shape, coverage, and density more meaningfully.",
        ],
      },
    ],
    faq: [
      {
        question: "Is shedding after a hair transplant normal?",
        answer:
          "Temporary shedding is commonly discussed during recovery and is one reason patients should separate early healing from later regrowth when judging progress.",
      },
      {
        question: "When do results usually start looking more obvious?",
        answer:
          "Visible change usually takes months rather than days or weeks. The exact timeline varies by case, area treated, and hair characteristics.",
      },
    ],
    relatedLinks: [
      {
        href: "/hair-transplant-recovery-timeline",
        label: "Hair Transplant Recovery Timeline",
        description:
          "See the main recovery page for a clearer treatment-focused overview of healing and regrowth.",
      },
      {
        href: "/hair-transplant-side-effects",
        label: "Hair Transplant Side Effects",
        description:
          "Understand common concerns such as swelling, redness, discomfort, and when patients usually seek reassurance.",
      },
    ],
  },
  {
    slug: "female-hair-transplant-london-who-may-be-suitable",
    title: "Female Hair Transplant in London: Who May Be Suitable?",
    seoTitle:
      "Female Hair Transplant London: Suitability, Planning, and What to Expect",
    description:
      "Learn who may be suitable for female hair transplant in London, what a consultation should assess, and how planning differs from more standard male-pattern cases.",
    excerpt:
      "Female hair transplant planning usually needs a more tailored discussion around pattern, donor area, diagnosis, discreetness, and realistic density goals.",
    eyebrow: "Female treatment guide",
    answerSummary:
      "Female hair transplant in London may suit some patients, but the decision usually requires more tailored assessment than a standard male-pattern case. The consultation should look carefully at the pattern of thinning, diagnosis, donor area, goals, and whether transplant is likely to improve the concern in a realistic way.",
    readTime: "8 min read",
    updatedAt: "2026-05-07",
    keywords: [
      "female hair transplant london",
      "women hair transplant london",
      "female hairline transplant",
      "is female hair transplant suitable",
    ],
    keyTakeaways: [
      "Female cases often need more detailed suitability checks and planning.",
      "Pattern, diagnosis, donor area, and aesthetic goals all matter heavily.",
      "Discreet planning and realistic density goals are usually central to the decision.",
    ],
    sections: [
      {
        heading: "Why female cases are usually assessed differently",
        paragraphs: [
          "Female hair restoration often needs a more specific suitability discussion because the pattern of thinning can be more diffuse and the diagnosis behind it may matter more to the treatment decision.",
          "That means a consultation should not only ask what bothers you visually, but whether transplant is the right tool for that concern in the first place.",
        ],
      },
      {
        heading: "What a consultation should check",
        paragraphs: [
          "For female patients, the consultation should look closely at the pattern of loss, donor area quality, whether the concern is frontal, part-line, temporal, scar-related, or diffuse, and what kind of improvement is realistically achievable.",
          "Patients may also want to discuss discreetness, shaving preferences, recovery planning, and whether the treatment goal is subtle softening, stronger framing, or selective density support.",
        ],
        bullets: [
          "Pattern and cause of thinning",
          "Donor availability and long-term planning",
          "Framing, density, and subtlety goals",
          "Whether a non-surgical element should be discussed alongside transplant",
        ],
      },
      {
        heading: "Why realistic density planning matters",
        paragraphs: [
          "Female patients are often comparing refined visual goals rather than broad area coverage. That makes density planning, hairline softness, and blending especially important.",
          "A useful consultation should explain not only what can be added, but how the design is intended to look natural in everyday life rather than only in clinic photos.",
        ],
      },
      {
        heading: "Why London can appeal for female patients",
        paragraphs: [
          "Some female patients prefer a London route because consultation, review, and follow-up can feel easier to manage locally and more discreetly. The decision still depends on the individual case, but local access can matter when you want the process to feel more controlled from the start.",
        ],
      },
    ],
    faq: [
      {
        question: "Are female hair transplant cases always more complex?",
        answer:
          "Not always, but they often need a more tailored assessment because diffuse thinning, diagnosis, donor area planning, and discreetness can all play a bigger role.",
      },
      {
        question: "Can female patients still start with a free consultation?",
        answer:
          "Yes. A free consultation can still be useful as long as it properly addresses suitability, planning, realistic goals, and whether transplant is likely to help.",
      },
    ],
    relatedLinks: [
      {
        href: "/female-hair-transplant-london",
        label: "Female Hair Transplant London",
        description:
          "See the main page for a treatment-focused overview of suitability, planning, and recovery.",
      },
      {
        href: "/services/female-hair-transplant",
        label: "Female Hair Transplant Treatment",
        description:
          "Explore the service page for treatment approach, best-for guidance, and next steps.",
      },
    ],
  },
];

const blogPostImages: Record<
  BaseBlogPost["slug"],
  Pick<BlogPost, "imageSrc" | "imageAlt" | "imagePosition">
> = {
  "hair-transplant-consultation-london-what-to-expect": {
    imageSrc: "/images/home-hero-consultation.png",
    imageAlt:
      "Doctor explaining a hairline treatment plan during a premium London hair transplant consultation",
    imagePosition: "72% center",
  },
  "hair-transplant-cost-london-what-changes-the-price": {
    imageSrc: "/images/london-location-section.png",
    imageAlt:
      "Doctor discussing treatment options in a London clinic with central London visible through the window",
    imagePosition: "42% center",
  },
  "how-to-choose-a-hair-transplant-clinic-in-london": {
    imageSrc: "/services/male-hair-transplant.png",
    imageAlt:
      "Doctor reviewing a hairline plan on a tablet during a clinic selection consultation",
    imagePosition: "58% center",
  },
  "uk-vs-turkey-hair-transplant-how-to-compare": {
    imageSrc: "/images/london-location-section.png",
    imageAlt:
      "Premium London clinic consultation setting used to compare treatment routes and follow-up options",
    imagePosition: "28% center",
  },
  "hair-transplant-recovery-timeline-week-by-week": {
    imageSrc: "/images/male_hair_transplant.jpg",
    imageAlt:
      "Close-up clinical image showing a scalp during an early hair transplant stage",
    imagePosition: "center top",
  },
  "female-hair-transplant-london-who-may-be-suitable": {
    imageSrc: "/services/female-hair-transplant.png",
    imageAlt:
      "Female hair consultation in a premium clinical setting with careful scalp assessment",
    imagePosition: "center 36%",
  },
};

export const blogPosts: BlogPost[] = rawBlogPosts.map((post) => ({
  ...post,
  ...blogPostImages[post.slug],
}));

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
