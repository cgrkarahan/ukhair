export type ApprovedProofCase = {
  slug: string;
  title: string;
  areaTreated: string;
  timeline: string;
  treatmentNote?: string;
  summary: string;
  variant?: "hairline" | "crown" | "temple" | "diffuse";
  beforeImageSrc?: string;
  afterImageSrc?: string;
  beforeImageAlt?: string;
  afterImageAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
  isPlaceholder?: boolean;
};

export type ApprovedReview = {
  name: string;
  quote: string;
  rating?: number;
  treatmentArea?: string;
  sourceLabel?: string;
  isPlaceholder?: boolean;
};

// Preview placeholders keep the proof layout visible in staging.
// Replace these entries with approved launch assets before the site goes live.
export const approvedProofCases: ApprovedProofCase[] = [
  {
    slug: "placeholder-hairline-case",
    title: "Frontal hairline restoration",
    areaTreated: "Front hairline",
    timeline: "6 months after treatment",
    variant: "hairline",
    treatmentNote: "Frontal hairline case",
    summary:
      "Hairline restoration case showing clearer frontal framing and stronger density through the front edge at the 6-month review stage.",
    beforeImageSrc: "/proof/frontal-hairline-before.png",
    afterImageSrc: "/proof/frontal-hairline-after.png",
    beforeImageAlt:
      "Before treatment view of a frontal hairline with marked recession and the planned hairline drawn for restoration",
    afterImageAlt:
      "Six months after frontal hairline treatment showing lower, fuller framing across the front hairline",
    isPlaceholder: false,
  },
  {
    slug: "placeholder-crown-case",
    title: "Crown and top coverage support",
    areaTreated: "Crown",
    timeline: "6 months after treatment",
    variant: "crown",
    treatmentNote: "Crown-density case",
    summary:
      "Crown-focused case showing improved top coverage and stronger density across the thinning central scalp at the 6-month stage.",
    beforeImageSrc: "/proof/crown-before.png",
    afterImageSrc: "/proof/crown-after.png",
    beforeImageAlt:
      "Before treatment top-down view showing marked thinning across the crown and central scalp",
    afterImageAlt:
      "Six months after treatment with visibly stronger density across the crown and top of the scalp",
    isPlaceholder: false,
  },
  {
    slug: "placeholder-female-case",
    title: "Female frontal density and framing",
    areaTreated: "Female thinning",
    timeline: "6 months after treatment",
    variant: "diffuse",
    treatmentNote: "Female hairline case",
    summary:
      "Female case showing softer frontal framing and improved density through the front hairline and part-line area at 6 months.",
    beforeImageSrc: "/proof/female-before.png",
    afterImageSrc: "/proof/female-after.png",
    beforeImageAlt:
      "Before treatment female frontal view with the planned hairline marked for restoration",
    afterImageAlt:
      "Six months after treatment showing improved female frontal framing and denser coverage at the front",
    isPlaceholder: false,
  },
];

export const approvedReviews: ApprovedReview[] = [
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Hair transplant consultation and treatment",
    sourceLabel: "Anonymised 5-star Trustpilot review · January 2026",
    quote:
      "The reviewer described the team as supportive, knowledgeable, and professional from start to finish, with clear explanations that made the whole hair transplant process feel easier and more reassuring.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "London consultation and planning",
    sourceLabel: "Anonymised 5-star Trustpilot review · February 2026",
    quote:
      "One reviewer said the London team were especially helpful before treatment, with clear pre-op guidance, realistic answers around graft planning, and enough time to feel comfortable asking detailed questions.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "London procedure and early aftercare",
    sourceLabel: "Anonymised 5-star Trustpilot review · February 2026",
    quote:
      "Another patient described the doctor and wider team as experienced, calm, and thorough on the day itself, then said the early post-op follow-up felt well organised and reassuring once they were back home.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Clinical care experience",
    sourceLabel: "Anonymised 5-star Trustpilot review · December 2025",
    quote:
      "One patient said a challenging day felt far more positive because the doctor and wider team made them feel safe, looked after, and properly reassured throughout the visit.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "London hair transplant result",
    sourceLabel: "Anonymised 5-star Trustpilot review · November 2025",
    quote:
      "A London patient said they appreciated how measured the consultation was at the start, then later felt pleased with the result because expectations had been set clearly rather than oversold.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Hair transplant aftercare",
    sourceLabel: "Anonymised 5-star Trustpilot review · October 2025",
    quote:
      "Another reviewer said the team kept the procedure calm and well explained step by step, then reported smooth healing around 10 days later without swelling or unexpected issues.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Turkey treatment travel support",
    sourceLabel: "Anonymised 5-star Trustpilot review · September 2025",
    quote:
      "One Turkey-route reviewer highlighted how well the trip logistics were handled, saying airport transfers, hotel arrangements, and pre-op communication all felt smooth and more premium than expected.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Turkey aftercare and return-home support",
    sourceLabel: "Anonymised 5-star Trustpilot review · September 2025",
    quote:
      "Another patient who travelled for treatment said they were not left alone once they returned home, with helpful post-op check-ins, washing guidance, and clear replies when recovery questions came up.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Hair-support treatment",
    sourceLabel: "Anonymised 5-star Trustpilot review · August 2025",
    quote:
      "A patient having a hair-support treatment said staff were friendly, unhurried, and clear in their explanations, with early improvement becoming noticeable after a few weeks.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Consultation and patient care",
    sourceLabel: "Anonymised 5-star Trustpilot review · August 2025",
    quote:
      "One 5-star review highlighted a welcoming, professional atmosphere, careful answers to questions, and a personalised approach that left the patient feeling confident in the care provided.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "London pre-op and post-op care",
    sourceLabel: "Anonymised 5-star Trustpilot review · July 2025",
    quote:
      "A further reviewer said the team were just as helpful after the procedure as before it, with clear recovery guidance, responsive communication, and a sense that patient care did not end when treatment day finished.",
    isPlaceholder: false,
  },
  {
    name: "Trustpilot reviewer",
    rating: 5,
    treatmentArea: "Experienced doctors and patient care",
    sourceLabel: "Anonymised 5-star Trustpilot review · June 2025",
    quote:
      "One patient said the strongest impression was how experienced and attentive the doctors felt, adding that the whole process came across as well run, reassuring, and focused on a good patient outcome rather than a rushed sale.",
    isPlaceholder: false,
  },
];
