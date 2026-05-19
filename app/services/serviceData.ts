export type ServiceDetail = {
  slug: string;
  title: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  imageSrc: string;
  imageAlt: string;
  badge: string;
  bestFor: string;
  outcome: string;
  intro: string;
  consultation: string[];
  highlights: { title: string; text: string }[];
  guideHeading: string;
  guideSections: { title: string; body: string[] }[];
  londonContext: string[];
  selectionCriteria: string[];
  recoveryNotes: string[];
  relatedGuideSlugs: string[];
};

export const serviceCatalog: ServiceDetail[] = [
  {
    slug: "male-hair-transplant",
    title: "Male Hair Transplant",
    shortDescription:
      "Hairline, crown, and density restoration in London with careful planning and realistic long-term design.",
    seoTitle: "Male Hair Transplant London",
    seoDescription:
      "Explore male hair transplant treatment in London, including hairline design, crown planning, donor management, candidacy, recovery expectations, and what to ask before booking.",
    keywords: [
      "male hair transplant london",
      "hair transplant for men london",
      "fue hair transplant london",
      "hairline restoration london",
    ],
    imageSrc: "/services/male-hair-transplant.png",
    imageAlt: "Male hair transplant consultation and hairline planning in a premium London clinic",
    badge: "Core London treatment",
    bestFor: "Receding hairlines, crown thinning, frontal density loss",
    outcome: "Natural restoration that balances visible improvement with long-term donor planning",
    intro:
      "Explore male hair transplant treatment in London with careful planning, clear standards, and more realistic long-term design.",
    consultation: [
      "Hairline design discussion linked to age, facial balance, and future loss.",
      "Donor-area review and realistic graft-range planning.",
      "A conversation about whether surgery is right now or whether treatment timing matters.",
    ],
    highlights: [
      {
        title: "Hairline strategy",
        text: "Good planning looks at design, maturity, and donor discipline rather than only chasing density.",
      },
      {
        title: "Crown planning",
        text: "Crown work often needs honest expectations and more careful resource planning than patients expect.",
      },
      {
        title: "Aftercare clarity",
        text: "Recovery and timeline questions deserve direct answers up front instead of being hidden away in small print.",
      },
    ],
    guideHeading:
      "Male hair transplant in London for patients who want careful planning before choosing a clinic.",
    guideSections: [
      {
        title: "What usually matters most",
        body: [
          "Many patients want London convenience, clear standards, and a more serious approach to planning than they usually find in louder clinic advertising.",
          "Good results usually come from design judgement, donor management, realistic graft placement, and aftercare rather than from one aggressive density promise.",
        ],
      },
      {
        title: "What to understand before booking",
        body: [
          "Patients should understand how their current hair-loss pattern, donor capacity, age, and long-term progression affect the plan.",
          "It helps to ask who is planning the case, how hairline decisions are made, how the crown is being prioritised, and what recovery will realistically look like.",
        ],
      },
      {
        title: "Why London matters here",
        body: [
          "Treatment quality in London is easier to judge when it is linked to consultation access, local aftercare, and a more consistent care experience.",
        ],
      },
    ],
    londonContext: [
      "Premium central London care can appeal to patients who want stronger standards and easier aftercare access.",
      "London should not be reduced to price alone. Convenience, trust, and clarity are part of the offer too.",
      "It also helps to consider cost, UK vs Turkey, recovery, and method differences rather than judging the decision on one factor alone.",
    ],
    selectionCriteria: [
      "Ask how the clinic plans for future hair loss instead of only the immediate hairline.",
      "Ask how graft numbers are estimated and whether the crown is being prioritised realistically.",
      "Ask who is responsible for the procedure and what aftercare reviews are included.",
    ],
    recoveryNotes: [
      "Questions about recovery timeline, swelling, and shedding usually come up early.",
      "Hairline and crown patients may experience different emotional expectations around the growth phase, especially in the first three months.",
      "Clear timeline language helps reduce unrealistic instant-result expectations.",
    ],
    relatedGuideSlugs: [
      "hair-transplant-london",
      "hair-transplant-cost-london",
      "hair-transplant-recovery-timeline",
      "fue-vs-dhi",
    ],
  },
  {
    slug: "female-hair-transplant",
    title: "Female Hair Transplant",
    shortDescription:
      "Female hair restoration in London with careful suitability explanation, softer framing, and realistic density planning.",
    seoTitle: "Female Hair Transplant London",
    seoDescription:
      "Explore female hair transplant treatment in London, including suitability, density blending, part-line restoration, hairline softness, candidacy, and recovery expectations.",
    keywords: [
      "female hair transplant london",
      "women hair transplant london",
      "hair transplant for women london",
      "female hair restoration london",
    ],
    imageSrc: "/services/female-hair-transplant.png",
    imageAlt: "Female hair restoration consultation and suitability assessment in a premium London clinic",
    badge: "Female treatment",
    bestFor: "Diffuse thinning, part widening, soft frontal restoration, selective density support",
    outcome: "Subtle framing and density improvement that respects existing hair and styling habits",
    intro:
      "Explore female hair transplant treatment in London with clear suitability explanation, softer framing, and proper respect for the complexity of female thinning.",
    consultation: [
      "Review the thinning pattern and whether surgery is appropriate in the first place.",
      "Discuss framing, density blending, and how the restored area needs to sit beside existing hair.",
      "Clarify recovery, styling disruption, and whether a less visible method question matters.",
    ],
    highlights: [
      {
        title: "Suitability first",
        text: "Not all patterns of female thinning are automatically suitable for surgery, and that nuance matters.",
      },
      {
        title: "Softer design language",
        text: "Framing, blending, and density harmony usually matter more than aggressive lowering or heavy density rhetoric.",
      },
      {
        title: "Discretion matters",
        text: "Recovery visibility, without-shaving interest, and styling impact are more likely to shape female enquiry behaviour.",
      },
    ],
    guideHeading:
      "Female hair transplant in London with careful suitability checks, subtle design, and more considered expectation setting.",
    guideSections: [
      {
        title: "What women usually want to understand",
        body: [
          "Female patients often need the explanation to reflect how different the decision can feel. Suitability, discreet recovery, and believable density blending matter more than loud before-and-after promises.",
          "Some women may need non-surgical support, timing adjustments, or a more cautious approach before surgery is considered.",
        ],
      },
      {
        title: "What a stronger consultation looks like",
        body: [
          "A strong female consultation discusses pattern of loss, donor suitability, part-line or frontal goals, styling habits, and how subtle or visible the desired change should be.",
        ],
      },
      {
        title: "Why this matters in practice",
        body: [
          "Clear female explanation shows that the discussion goes beyond the standard male hairline conversation.",
        ],
      },
    ],
    londonContext: [
      "Female treatment in London often matters most when it emphasises convenience, privacy, and a calmer overall experience.",
      "Women may care more about visible downtime and styling disruption than broader transplant explanation usually suggests.",
      "Separate cost and recovery explanation helps avoid forcing women through more generic wording.",
    ],
    selectionCriteria: [
      "Ask how the clinic decides whether surgery is suitable for female thinning patterns.",
      "Ask how density blending is being planned around existing hair.",
      "Ask what recovery visibility and styling restrictions usually look like.",
    ],
    recoveryNotes: [
      "Female patients may be especially sensitive to visibility during early healing, so recovery explanation should be calm and practical.",
      "Questions around discretion, without shaving, and the timing of visible return to work are especially relevant here.",
      "Recovery, side effects, and without-shaving information all help make the option easier to evaluate.",
    ],
    relatedGuideSlugs: [
      "female-hair-transplant-london",
      "hair-transplant-without-shaving",
      "hair-transplant-recovery-timeline",
      "our-clinical-standards",
    ],
  },
  {
    slug: "eyebrow-transplant",
    title: "Eyebrow Transplant",
    shortDescription:
      "Eyebrow transplant treatment in London focused on shape, angle control, and believable facial framing rather than blocky density.",
    seoTitle: "Eyebrow Transplant London",
    seoDescription:
      "Learn how eyebrow transplant treatment works in London, who it may suit, what matters in design and angle control, and what to ask before booking.",
    keywords: [
      "eyebrow transplant london",
      "eyebrow hair transplant london",
      "brow transplant london",
      "eyebrow restoration london",
    ],
    imageSrc: "/services/eyebrow-transplant.png",
    imageAlt: "Eyebrow transplant planning and shape assessment in a premium London clinic",
    badge: "Facial framing",
    bestFor: "Sparse brows, over-plucked areas, asymmetry, or eyebrow restoration after loss",
    outcome: "Natural brow definition that reads correctly up close as well as at distance",
    intro:
      "Eyebrow treatment needs refined, detail-aware planning. Shape, directional flow, and facial harmony matter more than volume alone.",
    consultation: [
      "Review shape goals, current growth, and whether a transplant is the right long-term answer.",
      "Discuss arch, direction, density, and the grooming implications of transplanted brow hair.",
      "Clarify healing, maintenance, and what realistic softness looks like.",
    ],
    highlights: [
      {
        title: "Shape over bulk",
        text: "Natural angle, symmetry, and realism matter more than heavy fill language.",
      },
      {
        title: "High-visibility treatment",
        text: "Small inconsistencies matter more in brows because the face is read so closely.",
      },
      {
        title: "Relevant beyond scalp treatment",
        text: "Eyebrow treatment also broadens the offer without feeling out of place beside the rest of the service.",
      },
    ],
    guideHeading:
      "Eyebrow transplant in London with careful attention to shape, softness, and micro-angle placement.",
    guideSections: [
      {
        title: "What patients should understand first",
        body: [
          "Eyebrow transplantation is not a simple fill exercise. It depends on facial proportions, directional placement, and a believable density profile.",
          "It is best treated as a precision service for the right patient rather than a cosmetic add-on discussed in generic terms.",
        ],
      },
      {
        title: "Why consultation quality matters",
        body: [
          "Patients should know how the clinic plans symmetry, shape, directional flow, and ongoing grooming expectations. These details strongly affect whether the outcome feels natural.",
        ],
      },
      {
        title: "Why this treatment needs careful explanation",
        body: [
          "Eyebrow treatment can be especially relevant for patients who want subtle facial framing and careful design rather than a broad transplant discussion.",
        ],
      },
    ],
    londonContext: [
      "Eyebrow treatment suits a premium London setting because patients usually expect subtle detail rather than a commoditised service.",
      "Standards and recovery information still matter because trust is important even in smaller facial-hair treatments.",
      "This service sits naturally alongside other subtle-restoration and visible-area treatments.",
    ],
    selectionCriteria: [
      "Ask how brow direction and angle are planned.",
      "Ask what level of grooming is expected after recovery.",
      "Ask for realistic examples of softness rather than overly dense shapes.",
    ],
    recoveryNotes: [
      "Because the area is highly visible, patients need clear information on early healing and grooming expectations.",
      "It helps to set expectations around maintenance rather than presenting the result as totally hands-off.",
    ],
    relatedGuideSlugs: [
      "how-we-select-clinics",
      "hair-transplant-recovery-timeline",
      "our-clinical-standards",
      "patient-guidance-process",
    ],
  },
  {
    slug: "beard-transplant",
    title: "Beard Transplant",
    shortDescription:
      "Beard transplant treatment in London for patchy cheeks, outline definition, and stronger facial-hair structure with natural blending.",
    seoTitle: "Beard Transplant London",
    seoDescription:
      "Explore beard transplant treatment in London, including patch mapping, outline planning, density strategy, recovery, and what to check before booking.",
    keywords: [
      "beard transplant london",
      "facial hair transplant london",
      "patchy beard transplant london",
      "beard restoration london",
    ],
    imageSrc: "/services/beard-transplant.png",
    imageAlt: "Beard transplant consultation and beard-line planning in a premium London clinic",
    badge: "Facial hair",
    bestFor: "Patchy growth, weak cheek line, outline definition, or scar coverage",
    outcome: "Stronger beard structure that still blends naturally with existing hair",
    intro:
      "Beard treatment needs to talk about outline control, facial balance, and natural texture transitions. The goal is not maximum density everywhere. It is believable structure.",
    consultation: [
      "Assess patch distribution, outline goals, and how sharp or soft the beard should read.",
      "Discuss cheek line, jawline, density transitions, and how the beard should blend into existing hair.",
      "Clarify healing, shaving timing, and realistic growth staging.",
    ],
    highlights: [
      {
        title: "Outline discipline",
        text: "The beard result should be designed around facial structure and natural line control, not just filling gaps.",
      },
      {
        title: "Single-graft detail",
        text: "Sharper facial-hair work depends on delicate placement and believable density changes.",
      },
      {
        title: "Recovery visibility",
        text: "Patients often want practical advice around social visibility, shaving, and how quickly the area looks settled.",
      },
    ],
    guideHeading:
      "Beard transplant in London with careful outline design, density balance, and natural facial-hair blending.",
    guideSections: [
      {
        title: "What beard patients usually care about",
        body: [
          "Most beard patients care about patchiness, outline weakness, or how the beard frames the jaw and face rather than just adding hair everywhere.",
          "That usually means a shape-led, realistic plan rather than a promise of dramatic thickness across every area.",
        ],
      },
      {
        title: "Why detail matters here",
        body: [
          "High-detail facial-hair work needs more precision than a general scalp-focused explanation usually provides.",
        ],
      },
      {
        title: "What to review alongside this treatment",
        body: [
          "Recovery, standards, and practical explanation all matter here as well because visible-area treatment often raises extra trust and healing questions.",
        ],
      },
    ],
    londonContext: [
      "London beard treatment still benefits from the same premium and clinical standards framing, even though the focus is facial hair rather than scalp work.",
      "The treatment can support men who want facial-hair restoration without slipping into gimmicky masculinity language.",
      "Patients usually respond better to a precise, modern, and visually aware approach than a flashy one.",
    ],
    selectionCriteria: [
      "Ask how the outline and cheek line are planned.",
      "Ask how density transitions are managed so the beard still looks natural.",
      "Ask what healing and shaving advice usually looks like after treatment.",
    ],
    recoveryNotes: [
      "Beard patients care about visible healing, shaving schedule, and how the area settles socially.",
      "It helps to set expectations around the growth arc and avoid pretending the result looks final immediately.",
    ],
    relatedGuideSlugs: [
      "hair-transplant-recovery-timeline",
      "how-we-select-clinics",
      "patient-guidance-process",
      "our-clinical-standards",
    ],
  },
  {
    slug: "moustache-transplant",
    title: "Moustache Transplant",
    shortDescription:
      "Moustache transplant treatment in London for upper-lip definition, symmetry, and believable visible-area density.",
    seoTitle: "Moustache Transplant London",
    seoDescription:
      "Explore moustache transplant treatment in London, including design, density planning, growth direction, healing expectations, and how to compare providers.",
    keywords: [
      "moustache transplant london",
      "mustache transplant london",
      "upper lip hair transplant london",
      "moustache restoration london",
    ],
    imageSrc: "/services/moustache-transplant.png",
    imageAlt: "Moustache transplant consultation and upper-lip planning in a premium London clinic",
    badge: "Visible-area detail",
    bestFor: "Thin or uneven upper-lip hair, symmetry changes, or added definition",
    outcome: "A fuller, more structured moustache with natural direction and proportion",
    intro:
      "Moustache work is small-area, high-visibility treatment that benefits from precise planning and close attention to detail.",
    consultation: [
      "Assess the width, density, and shape goals for the upper-lip area.",
      "Discuss directional growth, symmetry, and how the moustache should relate to surrounding facial hair.",
      "Clarify healing, maintenance, and how visible the early phase may be.",
    ],
    highlights: [
      {
        title: "Visible precision",
        text: "Moustache treatment needs proportion and direction control because the area sits at the centre of the face.",
      },
      {
        title: "Shape-led planning",
        text: "Balance and definition usually matter more than raw density.",
      },
      {
        title: "Natural expression",
        text: "Subtle changes in the upper lip can change facial expression, so realism matters.",
      },
    ],
    guideHeading:
      "Moustache transplant in London with close attention to symmetry, fullness, and visible-area realism.",
    guideSections: [
      {
        title: "Why this area needs special care",
        body: [
          "This treatment needs a detail-led explanation because the area is small but highly visible. Minor inconsistencies can be easier to notice than on larger areas.",
        ],
      },
      {
        title: "What patients should ask",
        body: [
          "Patients should ask about direction, shape, edge definition, and how the plan fits their face rather than assuming more grafts automatically equals a better result.",
        ],
      },
      {
        title: "Why this treatment deserves its own space",
        body: [
          "Moustache treatment deserves dedicated explanation because subtle visible-area work is easier to judge when the details are explained directly.",
        ],
      },
    ],
    londonContext: [
      "The same London trust signals still matter here, but the language should fit visible-area precision.",
      "This service benefits from a more refined tone than the core scalp treatments.",
      "Standards, recovery, and clear early explanation all add important context here.",
    ],
    selectionCriteria: [
      "Ask how the clinic plans moustache symmetry and edge definition.",
      "Ask how direction is controlled in such a visible area.",
      "Ask what early healing usually looks like in the upper-lip zone.",
    ],
    recoveryNotes: [
      "Visible-area healing expectations matter a lot here, so recovery and styling explanation should be direct.",
      "Patients need realistic expectations around settling time and the gradual nature of the result.",
    ],
    relatedGuideSlugs: [
      "hair-transplant-recovery-timeline",
      "our-clinical-standards",
      "how-we-select-clinics",
      "patient-guidance-process",
    ],
  },
  {
    slug: "hair-loss-treatments",
    title: "Hair Loss Treatments",
    shortDescription:
      "Non-surgical hair loss treatments in London for early thinning, maintenance, and supportive planning before or after transplant surgery.",
    seoTitle: "Hair Loss Treatments London",
    seoDescription:
      "Compare non-surgical hair loss treatments in London, including maintenance-focused options before or after transplant surgery and what realistic improvement may look like.",
    keywords: [
      "hair loss treatments london",
      "non surgical hair loss treatment london",
      "hair thinning treatment london",
      "prp hair treatment london",
    ],
    imageSrc: "/services/hair-loss-treatments.png",
    imageAlt: "Non-surgical hair loss treatment consultation and supportive scalp planning in a premium London clinic",
    badge: "Non-surgical support",
    bestFor: "Early thinning, active shedding, scalp support, or long-term maintenance",
    outcome: "Improved hair-quality support and a clearer maintenance plan around restoration decisions",
    intro:
      "Not every patient needs to move straight to surgery. Maintenance and non-surgical support still belong in a responsible restoration plan.",
    consultation: [
      "Assess whether surgery is the right step now or whether support and maintenance should come first.",
      "Discuss scalp health, thinning pattern, ongoing shedding, and treatment goals.",
      "Discuss how non-surgical options can fit into a wider hair-restoration plan.",
    ],
    highlights: [
      {
        title: "Not every case is surgical",
        text: "A more careful approach acknowledges when surgery may not be the first answer.",
      },
      {
        title: "Supports long-term planning",
        text: "Maintenance language helps frame restoration as long-term planning rather than a one-off transaction.",
      },
      {
        title: "Shows restraint",
        text: "Patients often respond well when the explanation does not force every enquiry into a transplant-only conclusion.",
      },
    ],
    guideHeading:
      "Non-surgical hair loss treatment in London for patients who need support, stabilisation, or scalp-focused planning.",
    guideSections: [
      {
        title: "Why non-surgical planning still matters",
        body: [
          "Non-surgical treatment helps make clear that active thinning support and transplant surgery are not the same decision.",
          "It also helps patients who are still early in the decision, who are not yet ready for surgery, or who need a maintenance mindset before and after a procedure.",
        ],
      },
      {
        title: "How to think about treatment",
        body: [
          "The best approach stays realistic and practical, with emphasis on support, stabilisation, scalp health, and longer-term planning rather than miracle-regrowth rhetoric.",
        ],
      },
      {
        title: "How it fits the wider plan",
        body: [
          "This also sits alongside London treatment information and early assessment explanation because good restoration planning is not always surgery-first.",
        ],
      },
    ],
    londonContext: [
      "London can frame support and maintenance as part of a serious restoration plan, not just an upsell.",
      "Patients often respond better to a more selective, informative approach than a transplant-only sales push.",
      "Early assessment information and clinical standards help show how treatment choices are weighed.",
    ],
    selectionCriteria: [
      "Ask whether non-surgical treatment is being discussed honestly rather than as filler.",
      "Ask how maintenance, scalp health, or added support fits into the wider plan.",
      "Ask when surgery should wait and why.",
    ],
    recoveryNotes: [
      "Non-surgical options often make the most sense when they connect to longer-term planning before and after surgery rather than sitting in isolation.",
      "It also gives patients a softer entry point when they are not ready for a transplant yet.",
    ],
    relatedGuideSlugs: [
      "patient-guidance-process",
      "our-clinical-standards",
      "hair-transplant-london",
      "hair-transplant-cost-london",
    ],
  },
];

export const serviceCatalogByTitle = Object.fromEntries(
  serviceCatalog.map((service) => [service.title, service]),
) as Record<string, ServiceDetail>;

export const serviceCatalogBySlug = Object.fromEntries(
  serviceCatalog.map((service) => [service.slug, service]),
) as Record<string, ServiceDetail>;
