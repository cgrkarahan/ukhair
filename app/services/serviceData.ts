export type ServiceDetail = {
  slug: string;
  title: string;
  shortDescription: string;
  badge: string;
  bestFor: string;
  outcome: string;
  intro: string;
  consultation: string[];
  highlights: { title: string; text: string }[];
  guideHeading: string;
  guideSections: { title: string; body: string[] }[];
};

export const serviceCatalog: ServiceDetail[] = [
  {
    slug: "male-hair-transplant",
    title: "Male Hair Transplant",
    shortDescription:
      "Restore a receding hairline, thinning crown, or overall density loss with surgeon-led FUE planning.",
    badge: "Core treatment",
    bestFor: "Receding hairlines, crown thinning, Norwood progression",
    outcome: "Permanent density restoration with natural hairline design",
    intro:
      "Our male hair transplant pathway focuses on natural hairline design, donor preservation, and density planning that still looks right years later.",
    consultation: [
      "Hairline and donor assessment with graft-range planning",
      "A surgical recommendation matched to current loss and future progression",
      "Recovery, aftercare, and realistic timeline guidance",
    ],
    highlights: [
      {
        title: "Hairline design",
        text: "Created to suit facial proportions, age, and long-term progression.",
      },
      {
        title: "Crown and mid-scalp work",
        text: "Planned to build coverage where it matters most without wasting grafts.",
      },
      {
        title: "Recovery support",
        text: "Structured aftercare and check-ins throughout the growth cycle.",
      },
    ],
    guideHeading:
      "A clear treatment overview, who it suits, and what the planning process focuses on.",
    guideSections: [
      {
        title: "What this treatment is designed to do",
        body: [
          "Male hair transplantation is focused on rebuilding the hairline, improving frontal density, and supporting crown coverage where appropriate.",
          "The aim is not just to add grafts, but to create a result that still looks believable as hair loss continues to evolve over time.",
        ],
      },
      {
        title: "What happens during consultation",
        body: [
          "We assess donor capacity, current hair loss pattern, future progression, and the graft range needed for a realistic result.",
          "Hairline shape, density goals, and long-term donor preservation are all discussed before a treatment plan is recommended.",
        ],
      },
      {
        title: "What we focus on clinically",
        body: [
          "Natural hairline design, graft distribution, and avoiding overuse of donor hair in one procedure.",
          "A strong plan balances visible improvement now with flexibility for future loss if needed.",
        ],
      },
    ],
  },
  {
    slug: "female-hair-transplant",
    title: "Female Hair Transplant",
    shortDescription:
      "A refined approach for diffuse thinning, widened partings, and soft frontal hairline restoration.",
    badge: "Women's treatment",
    bestFor: "Diffuse thinning, part widening, frontal density loss",
    outcome: "Softer volume restoration that respects existing hair",
    intro:
      "Female hair restoration needs a softer design language and a more careful approach to density blending. We build plans around hair quality, styling habits, and the existing hairline.",
    consultation: [
      "Assessment of density loss pattern and donor suitability",
      "Frontal and part-line planning based on styling goals",
      "Surgical and non-surgical pathway discussion where appropriate",
    ],
    highlights: [
      {
        title: "Frontal softening",
        text: "Designed to restore frame and fullness without harsh edges.",
      },
      {
        title: "Diffuse loss planning",
        text: "Focused on blending density into surrounding native hair.",
      },
      {
        title: "Private experience",
        text: "Low-stress consultation and recovery guidance throughout treatment.",
      },
    ],
    guideHeading:
      "A softer restoration approach designed around density, framing, and long-term blending.",
    guideSections: [
      {
        title: "What this treatment is designed to do",
        body: [
          "Female hair transplantation is often focused on restoring frontal framing, softening the hairline, and improving visible density around the parting.",
          "The approach usually prioritizes subtle enhancement and blending rather than aggressive lowering or overbuilding.",
        ],
      },
      {
        title: "What happens during consultation",
        body: [
          "We assess the pattern of thinning, donor suitability, current styling habits, and whether surgery or non-surgical treatment is the best first step.",
          "Hairline softness, density blending, and ongoing maintenance expectations are discussed in detail.",
        ],
      },
      {
        title: "What we focus on clinically",
        body: [
          "Matching density carefully into existing hair and preserving a natural, feminine framing line.",
          "The goal is believable fullness that integrates with day-to-day styling and future hair changes.",
        ],
      },
    ],
  },
  {
    slug: "eyebrow-transplant",
    title: "Eyebrow Transplant",
    shortDescription:
      "Rebuild sparse or over-plucked brows with careful angle control and natural arch shaping.",
    badge: "Facial framing",
    bestFor: "Sparse, over-plucked, or uneven brows",
    outcome: "Natural brow definition with long-term density",
    intro:
      "Eyebrow transplantation is a precision treatment. The placement angle, direction, and softness of each graft matter more than volume alone.",
    consultation: [
      "Brow-shape planning based on facial balance and existing growth",
      "Discussion of density goals and expected grooming requirements",
      "Recovery expectations and healing timeline",
    ],
    highlights: [
      {
        title: "Shape first",
        text: "The design is built around natural framing, not overfilling.",
      },
      {
        title: "Micro-angle placement",
        text: "Each graft is placed to follow the correct brow direction.",
      },
      {
        title: "Long-term definition",
        text: "A fuller brow line that still reads as believable up close.",
      },
    ],
    guideHeading:
      "A precision-led facial framing treatment built around shape, softness, and angle control.",
    guideSections: [
      {
        title: "What this treatment is designed to do",
        body: [
          "Eyebrow transplantation rebuilds sparse, uneven, or over-plucked brows with transplanted hair placed in a natural growth pattern.",
          "This treatment is most effective when shape, arch, and directional flow are planned together rather than treated as simple density filling.",
        ],
      },
      {
        title: "What happens during consultation",
        body: [
          "We review your current brow shape, desired fullness, symmetry goals, and whether a transplant is the right long-term solution.",
          "The consultation also covers grooming expectations, since transplanted brow hairs may need maintenance.",
        ],
      },
      {
        title: "What we focus on clinically",
        body: [
          "Correct placement angle, natural spacing, and subtle shaping so the brow sits properly within the face.",
          "The priority is realism and facial harmony rather than a dense, artificial block of hair.",
        ],
      },
    ],
  },
  {
    slug: "beard-transplant",
    title: "Beard Transplant",
    shortDescription:
      "Fill patchy facial hair and create a stronger beard outline with natural graft placement.",
    badge: "Facial hair",
    bestFor: "Patchy beard growth and cheek-line definition",
    outcome: "Sharper beard structure with natural facial density",
    intro:
      "Beard transplantation works best when the outline, cheek line, and density transitions are designed together. We focus on realism rather than overbuilding.",
    consultation: [
      "Patch mapping and density strategy for the beard area",
      "Outline design matched to face shape and existing facial hair",
      "Aftercare guidance for shaving and regrowth",
    ],
    highlights: [
      {
        title: "Defined outline",
        text: "Useful for patchy cheeks, weaker jawlines, and sparse growth zones.",
      },
      {
        title: "Single-graft detail",
        text: "Placement keeps the result sharp without looking artificial.",
      },
      {
        title: "Natural blending",
        text: "Designed to sit cleanly beside your existing beard texture.",
      },
    ],
    guideHeading:
      "A beard restoration approach focused on outline definition, density balance, and natural facial blending.",
    guideSections: [
      {
        title: "What this treatment is designed to do",
        body: [
          "Beard transplantation fills patchy areas, strengthens the beard outline, and improves facial hair density in targeted zones.",
          "It is particularly useful where cheek growth, jawline definition, or central beard continuity feels weak.",
        ],
      },
      {
        title: "What happens during consultation",
        body: [
          "We assess beard pattern, desired shape, patch distribution, and how dense the restoration should be for a natural look.",
          "The treatment plan considers facial proportions, existing beard texture, and how sharply or softly the beard line should read.",
        ],
      },
      {
        title: "What we focus on clinically",
        body: [
          "Single-graft detail, outline design, and blending new grafts into existing beard growth without harsh transitions.",
          "The aim is a stronger beard structure that still feels consistent with your face and facial hair pattern.",
        ],
      },
    ],
  },
  {
    slug: "moustache-transplant",
    title: "Moustache Transplant",
    shortDescription:
      "Add density and reshape the upper lip area for a fuller, more defined moustache.",
    badge: "Precision grafting",
    bestFor: "Thin upper-lip hair or uneven moustache growth",
    outcome: "A fuller moustache shape with controlled direction",
    intro:
      "Moustache work is detail-led. Density, line shape, and growth direction all need careful control because the area is highly visible.",
    consultation: [
      "Assessment of existing upper-lip density and shape goals",
      "Planning for width, thickness, and edge definition",
      "Discussion of regrowth direction and maintenance expectations",
    ],
    highlights: [
      {
        title: "Upper-lip detail",
        text: "Focused on subtle improvement rather than heavy density blocks.",
      },
      {
        title: "Shape control",
        text: "Useful for rebuilding symmetry and sharpening the moustache line.",
      },
      {
        title: "Visible-area precision",
        text: "Placed to look balanced at conversation distance and close up.",
      },
    ],
    guideHeading:
      "A detail-heavy upper-lip treatment designed for symmetry, fullness, and believable density.",
    guideSections: [
      {
        title: "What this treatment is designed to do",
        body: [
          "Moustache transplantation adds density where the upper-lip area looks thin, uneven, or incomplete.",
          "It is a precision treatment because the area is highly visible and small inconsistencies are easy to notice.",
        ],
      },
      {
        title: "What happens during consultation",
        body: [
          "We review moustache width, density goals, center and edge balance, and how full the upper-lip area should appear.",
          "Design choices are discussed carefully because subtle changes can strongly affect expression and facial balance.",
        ],
      },
      {
        title: "What we focus on clinically",
        body: [
          "Growth direction, outline control, and avoiding heavy placement that can look harsh in a very visible facial area.",
          "The goal is a fuller moustache that still feels proportionate and natural.",
        ],
      },
    ],
  },
  {
    slug: "hair-loss-treatments",
    title: "Hair Loss Treatments",
    shortDescription:
      "Non-surgical support such as PRP, mesotherapy, and scalp-focused treatment plans for early thinning.",
    badge: "Non-surgical",
    bestFor: "Early thinning, shedding, scalp support",
    outcome: "Improved hair quality and support before or after transplant",
    intro:
      "Not every patient needs a transplant first. We also assess supportive treatments that can stabilize shedding, improve scalp health, or complement a surgical plan.",
    consultation: [
      "Assessment of shedding, thinning, and scalp condition",
      "Discussion of non-surgical options and expected response",
      "Advice on how treatments fit into a wider restoration plan",
    ],
    highlights: [
      {
        title: "Early intervention",
        text: "Useful when thinning is active and surgery is not the first step.",
      },
      {
        title: "Supportive planning",
        text: "Often combined with longer-term transplant strategy and aftercare.",
      },
      {
        title: "Maintenance focus",
        text: "Aims to protect hair quality and improve the scalp environment.",
      },
    ],
    guideHeading:
      "A non-surgical pathway for patients who need support, stabilization, or scalp-focused maintenance.",
    guideSections: [
      {
        title: "What this treatment is designed to do",
        body: [
          "Hair loss treatments support patients with early thinning, active shedding, or scalp issues where surgery may not be the first step.",
          "These treatments are often used to stabilize hair quality, improve scalp condition, or support a broader restoration plan.",
        ],
      },
      {
        title: "What happens during consultation",
        body: [
          "We review the thinning pattern, shedding activity, scalp health, and whether treatments such as PRP or mesotherapy are appropriate.",
          "The consultation focuses on realistic improvement, maintenance potential, and whether surgery should be delayed or combined later.",
        ],
      },
      {
        title: "What we focus on clinically",
        body: [
          "Protecting existing hair, improving scalp conditions, and supporting long-term planning rather than promising instant dramatic change.",
          "The best results usually come from consistency, monitoring, and fitting treatment into a wider hair restoration strategy.",
        ],
      },
    ],
  },
];

export const serviceCatalogByTitle = Object.fromEntries(
  serviceCatalog.map((service) => [service.title, service]),
) as Record<string, ServiceDetail>;

export const serviceCatalogBySlug = Object.fromEntries(
  serviceCatalog.map((service) => [service.slug, service]),
) as Record<string, ServiceDetail>;
