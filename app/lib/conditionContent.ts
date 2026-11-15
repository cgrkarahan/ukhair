import type { TopicPageContent, TopicSource } from "@/app/lib/siteContent";

/**
 * Hair loss condition pages: what each type of hair loss is, how it is
 * recognised, and whether a transplant is a realistic option for it.
 *
 * These pages sit at the top of the funnel. Each one answers the condition
 * question honestly first (including "a transplant is usually not the answer"
 * where that is true) and only then links to cost, method and assessment pages.
 *
 * Writing rules for this file: British English, no long dashes, no guaranteed
 * outcomes, no named prescription-only medicines in promotional context, and
 * every external source checked to resolve before it is added.
 */

const source = {
  nhsHairLoss: { label: "NHS: Hair loss", href: "https://www.nhs.uk/symptoms/hair-loss/" },
  nhsHairTransplant: {
    label: "NHS: Hair transplant",
    href: "https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/cosmetic-surgery/hair-transplant/",
  },
  nhsCleft: {
    label: "NHS: Cleft lip and palate",
    href: "https://www.nhs.uk/conditions/cleft-lip-and-palate/",
  },
  badMale: {
    label: "British Association of Dermatologists: male pattern hair loss",
    href: "https://www.bad.org.uk/pils/hair-loss-male-pattern-androgenetic-alopecia/",
  },
  badFemale: {
    label: "British Association of Dermatologists: female pattern hair loss",
    href: "https://www.bad.org.uk/pils/hair-loss-female-pattern-androgenetic-alopecia/",
  },
  badAlopeciaAreata: {
    label: "British Association of Dermatologists: alopecia areata",
    href: "https://www.bad.org.uk/pils/alopecia-areata/",
  },
  badTraction: {
    label: "British Association of Dermatologists: traction alopecia",
    href: "https://www.bad.org.uk/pils/traction-alopecia/",
  },
  badTelogen: {
    label: "British Association of Dermatologists: telogen effluvium",
    href: "https://www.bad.org.uk/pils/telogen-effluvium/",
  },
  badFfa: {
    label: "British Association of Dermatologists: frontal fibrosing alopecia",
    href: "https://www.bad.org.uk/pils/frontal-fibrosing-alopecia/",
  },
  badLpp: {
    label: "British Association of Dermatologists: lichen planopilaris",
    href: "https://www.bad.org.uk/pils/lichen-planopilaris/",
  },
  alopeciaUk: { label: "Alopecia UK", href: "https://www.alopecia.org.uk/" },
  clapa: { label: "CLAPA: Cleft Lip and Palate Action", href: "https://clapa.com/" },
} satisfies Record<string, TopicSource>;

const hub = { name: "Types of hair loss", path: "/types-of-hair-loss" };

export const conditionTopicPages: Record<string, TopicPageContent> = {
  "types-of-hair-loss": {
    slug: "types-of-hair-loss",
    title: "Types of Hair Loss",
    seoTitle: "Types of Hair Loss: Causes and When a Transplant Helps",
    description:
      "The main types of hair loss in men and women, how each one is recognised, and which ones a hair transplant can realistically help with.",
    eyebrow: "Hair loss explained",
    lead:
      "Not every kind of hair loss can be treated with a transplant. Knowing which type you have is the first step, because it decides whether surgery, medical treatment, or simply waiting is the right next move.",
    keywords: [
      "types of hair loss",
      "hair loss causes",
      "why am i losing my hair",
      "can a hair transplant help my hair loss",
    ],
    heroChips: [
      "Men and women",
      "Which types a transplant can help",
      "When to see your GP first",
    ],
    cards: [
      {
        title: "Patterned loss is the usual candidate",
        text: "Male and female pattern hair loss are the types most often treated with a transplant, because the donor hair at the back of the scalp is usually unaffected.",
      },
      {
        title: "Some types recover on their own",
        text: "Shedding after illness, stress or childbirth often settles within months. Surgery in that window would be the wrong decision.",
      },
      {
        title: "Some types are a reason not to operate",
        text: "Active alopecia areata and active scarring alopecias can attack transplanted hair too, so they need a specialist diagnosis first.",
      },
    ],
    sections: [
      {
        title: "Patterned hair loss",
        body: [
          "Androgenetic alopecia is the most common cause of hair loss in both men and women. In men it usually shows as a receding hairline, thinning at the crown, or both. In women it more often shows as a widening parting with the front hairline kept.",
          "It tends to progress slowly over years. Because the hair at the back and sides of the scalp is usually resistant to the process, it can be moved to thinning areas and keep growing there.",
        ],
      },
      {
        title: "Shedding and diffuse thinning",
        body: [
          "Telogen effluvium is a period of heavy shedding that usually starts two to three months after a trigger such as illness, surgery, childbirth, a crash diet or major stress. It typically settles once the trigger has passed.",
          "Diffuse thinning across the whole scalp, including the back and sides, needs a careful look before any surgery is considered, because it can mean the donor area is affected too.",
        ],
      },
      {
        title: "Patches, tension and scarring",
        body: [
          "Alopecia areata causes round patches of loss and is driven by the immune system. Traction alopecia comes from long-term pulling on the hair. Scarring alopecias, such as frontal fibrosing alopecia and lichen planopilaris, destroy follicles and replace them with scar tissue.",
          "Each of these is handled very differently, and only some of them can ever be suitable for a transplant.",
        ],
      },
      {
        title: "When to see your GP first",
        body: [
          "See your GP if your hair loss is sudden, patchy, comes with an itchy, sore or burning scalp, or follows a new medicine or illness. Blood tests for iron, thyroid function and other causes are often the right first step, especially for women.",
        ],
        bullets: [
          "Sudden or patchy loss",
          "A sore, itchy or burning scalp",
          "Hair coming out in handfuls",
          "Loss of eyebrows or body hair as well",
        ],
      },
    ],
    comparison: {
      title: "Which types a transplant can help",
      intro:
        "A quick guide to how each type of hair loss is usually approached. A consultation still has to confirm the diagnosis and the donor supply.",
      columns: ["Type", "Can a transplant help?", "Usual first step"],
      rows: [
        {
          label: "Male pattern baldness",
          left: "Often, once the pattern is stable enough to plan around",
          right: "Assessment of pattern, age and donor supply",
        },
        {
          label: "Female pattern hair loss",
          left: "Sometimes, when loss is localised and the donor area is strong",
          right: "GP blood tests, then a female-specific assessment",
        },
        {
          label: "Telogen effluvium",
          left: "No, it usually recovers on its own",
          right: "Find and address the trigger, then wait",
        },
        {
          label: "Alopecia areata",
          left: "Usually not",
          right: "GP or dermatologist",
        },
        {
          label: "Traction alopecia",
          left: "Yes, once loss is permanent and the hairstyle has changed",
          right: "Remove the tension and give it time",
        },
        {
          label: "Scarring alopecia",
          left: "Rarely, only after a long period with no disease activity",
          right: "Dermatologist diagnosis and treatment",
        },
        {
          label: "Scars from surgery, injury or cleft lip",
          left: "Often, with realistic expectations about graft survival",
          right: "Assessment of the scar and donor supply",
        },
      ],
    },
    faq: [
      {
        question: "What is the most common type of hair loss?",
        answer:
          "Androgenetic alopecia, also called male or female pattern hair loss. It is inherited, comes on gradually, and is the type most often treated with a hair transplant.",
      },
      {
        question: "Can stress make your hair fall out?",
        answer:
          "Yes. A stressful event, illness or major life change can cause telogen effluvium, a period of heavy shedding that usually begins two to three months later and settles on its own once the trigger has passed.",
      },
      {
        question: "How do I know which type of hair loss I have?",
        answer:
          "The pattern, the speed and the scalp itself all give clues, but a diagnosis should come from a doctor. A good hair transplant consultation will tell you if your loss looks like something that needs a GP or dermatologist first.",
      },
      {
        question: "Is hair loss ever a sign of something serious?",
        answer:
          "Occasionally it can be linked to iron deficiency, thyroid problems or other conditions. Sudden, patchy or painful hair loss is a reason to see your GP before considering any cosmetic treatment.",
      },
    ],
    sources: [source.nhsHairLoss, source.badMale, source.badFemale, source.badTelogen, source.badAlopeciaAreata],
    condition: {
      name: "Hair loss",
      alternateName: ["Alopecia"],
    },
    relatedSlugs: [
      "norwood-scale",
      "male-pattern-baldness",
      "receding-hairline",
      "crown-thinning",
      "female-hair-loss",
      "ludwig-scale",
      "diffuse-thinning",
      "alopecia-areata",
      "traction-alopecia",
      "hair-transplant-for-scars",
      "cleft-lip-scar-hair-transplant",
    ],
  },

  "norwood-scale": {
    slug: "norwood-scale",
    title: "The Norwood Scale Explained",
    seoTitle: "Norwood Scale: The 7 Stages of Male Hair Loss",
    description:
      "The seven stages of the Norwood scale for male pattern baldness, what each one looks like, and what a hair transplant can realistically achieve at each stage.",
    eyebrow: "Norwood scale",
    lead:
      "The Norwood scale is the standard way doctors describe male pattern baldness, from a slight dip at the temples to a band of hair at the back and sides. Knowing your stage makes a consultation and a quote much easier to understand.",
    keywords: [
      "norwood scale",
      "norwood stages",
      "hamilton norwood scale",
      "norwood 3",
      "norwood 4 hair transplant",
      "grafts by norwood stage",
    ],
    heroChips: ["Seven stages explained", "Indicative graft ranges", "What changes the plan"],
    cards: [
      {
        title: "A description, not a diagnosis",
        text: "The scale describes the pattern you can see. It does not tell you how fast your loss is moving or how much donor hair you have.",
      },
      {
        title: "The A variant",
        text: "Some men lose hair from front to back evenly, without a separate thinning crown. This is described as a type A pattern, for example Norwood 3A.",
      },
      {
        title: "Donor supply sets the limit",
        text: "The higher the stage, the more the plan depends on how many grafts your donor area can safely give over a lifetime.",
      },
    ],
    sections: [
      {
        title: "Stages 1 and 2",
        body: [
          "Stage 1 is a full, juvenile hairline. Stage 2 shows a small, even recession at the temples. Many men at stage 2 have a normal mature hairline rather than progressing baldness.",
          "A transplant is rarely the right answer at these stages. If you are young and worried, the useful step is to monitor the pattern with photos taken in the same light every few months.",
        ],
      },
      {
        title: "Stage 3 and 3 vertex",
        body: [
          "Stage 3 is the first stage usually counted as balding, with a deeper recession at the temples. Stage 3 vertex adds thinning at the crown while the front stays at stage 2 or 3.",
          "This is where many men first consider a transplant. The planning question is how low and how dense to make the hairline while keeping grafts in reserve for the future.",
        ],
      },
      {
        title: "Stages 4 and 5",
        body: [
          "At stage 4 the front recedes further and the crown opens up, with a band of hair still separating the two. At stage 5 that band becomes thinner and narrower.",
          "Most plans at these stages prioritise the front and top, because that is what frames the face. The crown may be treated in the same session or in a later one, depending on donor supply.",
        ],
      },
      {
        title: "Stages 6 and 7",
        body: [
          "At stage 6 the band is gone and the front and crown join into one area. Stage 7 leaves only a horseshoe of hair around the sides and back.",
          "A transplant can still make a visible difference, but full coverage is usually not possible from the donor supply available. A good surgeon will be clear about where the grafts will go and what will remain thin.",
        ],
      },
    ],
    comparison: {
      title: "Norwood stages at a glance",
      intro:
        "Graft ranges are broad figures often used as a starting point. Your own number depends on your donor density, hair characteristics, goals and the size of the area, and is only confirmed at consultation.",
      columns: ["Stage", "What it looks like", "Typical transplant discussion"],
      rows: [
        {
          label: "Norwood 1 to 2",
          left: "Full or slightly mature hairline",
          right: "Usually no surgery. Monitor and review",
        },
        {
          label: "Norwood 3",
          left: "Deep temple recession",
          right: "Often around 1,500 to 2,500 grafts for the hairline and temples",
        },
        {
          label: "Norwood 3 vertex",
          left: "Temple recession plus crown thinning",
          right: "Hairline first, crown depending on donor supply",
        },
        {
          label: "Norwood 4",
          left: "Further frontal loss, open crown, band still present",
          right: "Often around 2,500 to 3,500 grafts",
        },
        {
          label: "Norwood 5",
          left: "Narrowing band between front and crown",
          right: "Often around 3,000 to 4,500 grafts, sometimes over two sessions",
        },
        {
          label: "Norwood 6 to 7",
          left: "Front and crown joined, horseshoe remains",
          right: "Partial coverage, usually 4,000 grafts or more, planned around donor limits",
        },
      ],
    },
    faq: [
      {
        question: "What Norwood stage is best for a hair transplant?",
        answer:
          "There is no single best stage. Men at stage 3 to 5 with a stable pattern and good donor hair are often the most straightforward cases, because the area is defined and the donor supply can cover it.",
      },
      {
        question: "How many grafts do I need for Norwood 3?",
        answer:
          "Many Norwood 3 cases fall somewhere around 1,500 to 2,500 grafts, but the real number depends on how far the temples have receded, your donor density and the density you want. It is confirmed at consultation.",
      },
      {
        question: "Can I have a transplant at Norwood 2?",
        answer:
          "It is possible, but often not wise. Many stage 2 hairlines are simply mature, and operating early can leave an unnatural result if loss continues behind it.",
      },
      {
        question: "Does the Norwood scale apply to women?",
        answer:
          "No. Women usually lose hair in a different pattern, which is described with the Ludwig or Sinclair scales instead.",
      },
      {
        question: "Will I keep losing hair after a transplant?",
        answer:
          "Transplanted hair usually keeps growing, but the hair around it can continue to thin. That is why planning for future loss, and discussing medical treatment to slow it, matters so much for younger men.",
      },
    ],
    sources: [source.badMale, source.nhsHairTransplant],
    condition: {
      name: "Male pattern hair loss",
      alternateName: ["Androgenetic alopecia", "Male pattern baldness"],
      signOrSymptom: ["Receding hairline", "Thinning at the crown"],
      possibleTreatment: ["Hair transplant", "Medical treatment to slow hair loss"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "male-pattern-baldness",
      "receding-hairline",
      "crown-thinning",
      "hair-transplant-cost-london",
    ],
  },

  "ludwig-scale": {
    slug: "ludwig-scale",
    title: "The Ludwig Scale Explained",
    seoTitle: "Ludwig Scale: The Stages of Female Hair Loss",
    description:
      "How the Ludwig scale describes female pattern hair loss, what each stage looks like, and when a hair transplant may be worth discussing.",
    eyebrow: "Ludwig scale",
    lead:
      "Women usually lose hair differently from men. Instead of a receding hairline, the parting widens and the top of the scalp thins while the front hairline stays in place. The Ludwig scale describes that pattern in three stages.",
    keywords: [
      "ludwig scale",
      "ludwig scale female hair loss",
      "female hair loss stages",
      "sinclair scale",
      "widening parting",
    ],
    heroChips: ["Three stages explained", "Women-specific guidance", "When a transplant can help"],
    cards: [
      {
        title: "The front usually stays",
        text: "In female pattern hair loss the front hairline is often kept, while density behind it reduces.",
      },
      {
        title: "Other scales exist",
        text: "Many dermatologists also use the five-point Sinclair scale or the Savin scale, which grade the parting in finer steps.",
      },
      {
        title: "The donor area matters more",
        text: "Women are more likely to have some thinning at the back and sides too, which limits what a transplant can do.",
      },
    ],
    sections: [
      {
        title: "Ludwig I",
        body: [
          "Mild thinning on the top of the scalp, often only noticed when the hair is parted or wet. The front hairline is unaffected.",
          "At this stage the focus is usually on finding a cause and protecting the hair you have, not on surgery.",
        ],
      },
      {
        title: "Ludwig II",
        body: [
          "The parting is clearly wider and more scalp shows through on top. Many women at this stage start styling their hair to hide it.",
          "This is the stage where a transplant is most often discussed, as long as the pattern is stable and the donor area is dense enough.",
        ],
      },
      {
        title: "Ludwig III",
        body: [
          "Extensive thinning across the top of the scalp, with the front hairline usually still present. This stage is less common.",
          "A transplant may improve the look of the area, but the available donor hair rarely covers it fully, so expectations need to be set carefully.",
        ],
      },
      {
        title: "Before you think about surgery",
        body: [
          "Female hair loss has more possible causes than male hair loss, including iron deficiency, thyroid problems, hormonal changes and shedding after pregnancy. A GP can arrange the right blood tests.",
        ],
      },
    ],
    comparison: {
      title: "Ludwig stages at a glance",
      intro:
        "A simple summary. Your own suitability depends on the cause, how stable the loss is, and the donor area, all of which need a proper assessment.",
      columns: ["Stage", "What it looks like", "Typical discussion"],
      rows: [
        {
          label: "Ludwig I",
          left: "Mild thinning on top, front hairline kept",
          right: "Investigate the cause and monitor",
        },
        {
          label: "Ludwig II",
          left: "Clearly wider parting, more scalp showing",
          right: "Transplant may be considered if loss is stable and donor hair is strong",
        },
        {
          label: "Ludwig III",
          left: "Extensive thinning across the top",
          right: "Partial improvement at best, careful planning needed",
        },
      ],
    },
    faq: [
      {
        question: "What is the Ludwig scale?",
        answer:
          "A three-stage scale used to describe female pattern hair loss, from mild thinning on top (stage I) to extensive thinning across the crown and top of the scalp (stage III), usually with the front hairline kept.",
      },
      {
        question: "Can women have a hair transplant?",
        answer:
          "Some women can, usually those with a stable, localised pattern and a strong donor area. Women with diffuse thinning across the whole scalp are often not suitable.",
      },
      {
        question: "Does female hair loss get worse over time?",
        answer:
          "Female pattern hair loss usually progresses slowly, and the speed varies a lot between women. Shedding caused by a temporary trigger usually recovers.",
      },
      {
        question: "Do women have to shave their head for a transplant?",
        answer:
          "Usually not. Female hair transplants are commonly performed without shaving the recipient area, so the treated area can be hidden by existing hair during recovery.",
      },
    ],
    sources: [source.badFemale, source.badTelogen, source.nhsHairLoss],
    condition: {
      name: "Female pattern hair loss",
      alternateName: ["Androgenetic alopecia in women"],
      signOrSymptom: ["Widening parting", "Thinning on the top of the scalp"],
      possibleTreatment: ["Hair transplant", "Medical treatment to slow hair loss"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "female-hair-loss",
      "female-hair-transplant-london",
      "diffuse-thinning",
      "hair-transplant-without-shaving",
    ],
  },

  "male-pattern-baldness": {
    slug: "male-pattern-baldness",
    title: "Male Pattern Baldness",
    seoTitle: "Male Pattern Baldness: Causes, Stages and Treatment",
    description:
      "What causes male pattern baldness, how DHT affects hair follicles, how fast it progresses, and when a hair transplant makes sense.",
    eyebrow: "Male pattern baldness",
    lead:
      "Male pattern baldness is inherited and very common. It usually starts at the temples or the crown and moves slowly over years. Understanding how it works explains both why a transplant can last and why it needs careful planning.",
    keywords: [
      "male pattern baldness",
      "androgenetic alopecia men",
      "dht hair loss",
      "what causes male pattern baldness",
      "male pattern baldness treatment",
    ],
    heroChips: ["Causes and DHT explained", "How fast it progresses", "When surgery fits"],
    cards: [
      {
        title: "Very common",
        text: "Around half of men show some male pattern hair loss by their fifties, and it can start as early as the late teens.",
      },
      {
        title: "Genes and hormones",
        text: "Follicles on the top of the scalp are sensitive to DHT, a hormone made from testosterone. Over time they shrink and produce finer hair.",
      },
      {
        title: "Why transplants last",
        text: "Hair at the back and sides is usually not sensitive in the same way, so it tends to keep growing when moved to the top.",
      },
    ],
    sections: [
      {
        title: "What DHT does to hair",
        body: [
          "In men with the inherited tendency, follicles on the top of the scalp react to dihydrotestosterone (DHT). Each growth cycle gets shorter and the hair gets finer, until some follicles stop producing visible hair.",
          "Levels of DHT are usually normal. The difference is how sensitive the follicles are, which is why it runs in families on both sides.",
        ],
      },
      {
        title: "How it progresses",
        body: [
          "Loss usually starts at the temples, the crown, or both, and is described with the Norwood scale. The speed varies widely. Some men stay at an early stage for decades, others progress quickly in their twenties.",
          "The age it starts and the pattern in close relatives give a rough idea of where it may go, but nobody can predict it precisely.",
        ],
      },
      {
        title: "Medical treatment and surgery",
        body: [
          "Medical treatments can slow or partly reverse thinning in some men, and a doctor or pharmacist can explain the options and their side effects. They only work while you keep using them.",
          "A transplant moves hair to where it has been lost but does not stop the process in the surrounding hair. Many surgeons recommend medical treatment alongside surgery for younger men.",
        ],
      },
      {
        title: "When a transplant makes sense",
        body: [
          "A transplant tends to suit men whose pattern is reasonably established, who have good donor hair, and who accept that the plan has to allow for future loss.",
        ],
        bullets: [
          "A clear pattern rather than diffuse thinning everywhere",
          "Enough donor density at the back and sides",
          "Realistic goals for density and hairline position",
          "A plan that still looks natural if loss continues",
        ],
      },
    ],
    faq: [
      {
        question: "What age does male pattern baldness start?",
        answer:
          "It can start any time after puberty, sometimes in the late teens, and becomes more common with age. Around half of men have some degree of it by their fifties.",
      },
      {
        question: "Is male pattern baldness inherited from your mother's side?",
        answer:
          "It can be inherited from either side of the family. Several genes are involved, so looking only at your maternal grandfather is not a reliable guide.",
      },
      {
        question: "Can male pattern baldness be cured?",
        answer:
          "There is no cure. Medical treatments can slow it while they are used, and a transplant can restore hair to thinning areas, but the underlying tendency remains.",
      },
      {
        question: "Am I too young for a hair transplant?",
        answer:
          "Men in their early twenties can be treated, but the plan needs to be conservative because their final pattern is harder to predict. Many surgeons prefer to wait until loss has settled into a clearer pattern.",
      },
      {
        question: "Will my transplanted hair fall out?",
        answer:
          "Transplanted hair sheds in the first weeks, then regrows from around three to four months. Once established it usually behaves like the donor hair it came from and keeps growing.",
      },
    ],
    sources: [source.badMale, source.nhsHairLoss, source.nhsHairTransplant],
    condition: {
      name: "Male pattern hair loss",
      alternateName: ["Androgenetic alopecia", "Male pattern baldness", "DHT hair loss"],
      signOrSymptom: ["Receding hairline", "Thinning at the crown", "Finer hair on top of the scalp"],
      possibleTreatment: ["Hair transplant", "Medical treatment to slow hair loss"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "norwood-scale",
      "receding-hairline",
      "crown-thinning",
      "how-hair-transplant-works",
    ],
  },

  "receding-hairline": {
    slug: "receding-hairline",
    title: "Receding Hairline",
    seoTitle: "Receding Hairline: Mature or Balding, and Your Options",
    description:
      "How to tell a mature hairline from a receding one, what causes temple recession, and when a hairline transplant is a sensible option.",
    eyebrow: "Receding hairline",
    lead:
      "A hairline that moves back a little in your twenties is normal. A hairline that keeps moving, deepening at the temples, is usually the start of male pattern baldness. Telling the two apart is the most important decision before any treatment.",
    keywords: [
      "receding hairline",
      "receding hairline treatment",
      "mature hairline vs receding",
      "temple recession",
      "hairline transplant",
    ],
    heroChips: ["Mature vs receding", "Temple recession", "Hairline design"],
    cards: [
      {
        title: "Mature hairlines are normal",
        text: "Most men's hairlines rise slightly and even out at the temples as they leave their teens. That alone is not balding.",
      },
      {
        title: "Recession keeps moving",
        text: "A receding hairline deepens at the temples over time, often with thinning behind the front edge.",
      },
      {
        title: "Design matters most",
        text: "The success of a hairline transplant depends on a hairline that suits your age and face, not on how low it can be placed.",
      },
    ],
    sections: [
      {
        title: "Mature or receding?",
        body: [
          "A mature hairline usually sits about a finger's width above the highest crease on your forehead and stays fairly even across. It tends to settle in the late teens or twenties and then stop.",
          "A receding hairline keeps moving back, especially at the temples, creating a deeper M shape. Comparing photos taken a year or two apart is the simplest test.",
        ],
      },
      {
        title: "What causes it",
        body: [
          "In men it is almost always male pattern hair loss. In women, a receding front hairline is less common and can be a sign of traction alopecia or frontal fibrosing alopecia, a scarring condition that needs a dermatologist rather than surgery.",
        ],
      },
      {
        title: "What a hairline transplant involves",
        body: [
          "Grafts are taken from the back and sides of the scalp and placed along a newly designed hairline and into the temples. Single-hair grafts are used at the front edge, with thicker grafts behind for density.",
          "Many hairline and temple cases need somewhere around 1,000 to 2,500 grafts, depending on how far the hairline has moved and the density you want.",
        ],
      },
      {
        title: "Getting the hairline right",
        body: [
          "A hairline that looks good at 25 must still look natural at 50, when the hair around it may have thinned further. Good surgeons keep the line slightly irregular, set the temples conservatively and avoid a straight, low edge.",
        ],
      },
    ],
    faq: [
      {
        question: "Can a receding hairline grow back?",
        answer:
          "Hair lost to male pattern baldness does not usually grow back on its own. Medical treatment can help some men keep or partly thicken hair, and a transplant can rebuild the hairline with your own hair.",
      },
      {
        question: "How many grafts do I need for my hairline?",
        answer:
          "Many hairline and temple cases need somewhere around 1,000 to 2,500 grafts. The number depends on the size of the area, your donor density, your hair type and the density you want, and is confirmed at consultation.",
      },
      {
        question: "Is a receding hairline at 20 normal?",
        answer:
          "Some movement as your hairline matures is normal. If it keeps receding, particularly at the temples, it is likely to be male pattern hair loss and worth monitoring with photos.",
      },
      {
        question: "Can women have a receding hairline?",
        answer:
          "It is less common. In women it can be caused by tight hairstyles or by frontal fibrosing alopecia, so a dermatologist should check it before any cosmetic treatment.",
      },
    ],
    sources: [source.badMale, source.badFfa, source.badTraction],
    condition: {
      name: "Receding hairline",
      alternateName: ["Frontal hair loss", "Temple recession"],
      signOrSymptom: ["Temples receding into an M shape", "Thinning behind the front hairline"],
      possibleTreatment: ["Hairline transplant", "Medical treatment to slow hair loss"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "norwood-scale",
      "male-pattern-baldness",
      "services/male-hair-transplant",
      "hair-transplant-cost-london",
    ],
  },

  "crown-thinning": {
    slug: "crown-thinning",
    title: "Crown Thinning",
    seoTitle: "Crown Thinning: Causes and Hair Transplant Options",
    description:
      "Why the crown thins, why it needs more grafts than you might expect, and how to decide whether to treat the crown, the front, or both.",
    eyebrow: "Crown thinning",
    lead:
      "Thinning at the crown is often noticed late, in a photo from above or a mirror in a lift. It is one of the most common patterns in men, and one of the harder areas to plan a transplant for.",
    keywords: [
      "crown thinning",
      "thinning crown",
      "bald spot on crown",
      "crown hair transplant",
      "vertex hair loss",
    ],
    heroChips: ["Why the crown is different", "Front or crown first?", "Graft planning"],
    cards: [
      {
        title: "Hard to see yourself",
        text: "Most people notice crown thinning in photos or when someone points it out, so it is often more advanced than it feels.",
      },
      {
        title: "It needs a lot of grafts",
        text: "Hair at the crown grows out from a whorl in different directions, so it takes more grafts to look full than an area of the same size at the front.",
      },
      {
        title: "It can keep expanding",
        text: "In a young man the crown area may keep growing, which affects how much of the donor supply should go there.",
      },
    ],
    sections: [
      {
        title: "Why the crown thins",
        body: [
          "Crown thinning in men is usually male pattern hair loss, shown on the Norwood scale as a vertex pattern. In women, thinning on the top and crown is part of female pattern hair loss and is assessed differently.",
        ],
      },
      {
        title: "Front or crown first?",
        body: [
          "The front frames the face and is what people notice in conversation, so many plans treat the hairline and top first. The crown may then be treated in the same session or later, once the donor supply for the front is protected.",
          "For men whose front is strong and whose only concern is the crown, treating the crown on its own can be reasonable, as long as the plan allows for the front to thin later.",
        ],
      },
      {
        title: "Planning a crown transplant",
        body: [
          "The surgeon has to recreate the swirl of the whorl and place grafts at the right angles. Results at the crown also take longer to show, often 12 to 18 months for the final look.",
        ],
        bullets: [
          "Map the whorl direction before placing grafts",
          "Keep donor reserve for future loss at the front",
          "Expect slower growth than at the hairline",
        ],
      },
      {
        title: "Non-surgical options",
        body: [
          "Medical treatment often works well at the crown, and some men find it improves enough to avoid or delay surgery. Scalp micropigmentation can also reduce the contrast between the scalp and hair.",
        ],
      },
    ],
    faq: [
      {
        question: "How many grafts does the crown need?",
        answer:
          "It varies widely with the size of the area. A small crown might need 1,000 to 1,500 grafts, while a large open crown can take 2,000 or more for a visible improvement.",
      },
      {
        question: "Why does a crown transplant take longer to grow?",
        answer:
          "Growth at the crown is commonly slower than at the front, and the final density can take 12 to 18 months to show, compared with around 12 months at the hairline.",
      },
      {
        question: "Can I have the front and crown done together?",
        answer:
          "Sometimes, if your donor area can supply enough grafts safely. Large combined cases are often split into two sessions about a year apart.",
      },
      {
        question: "Is crown thinning a sign I will go bald?",
        answer:
          "Not necessarily. Many men have some crown thinning that progresses slowly or stabilises, especially with medical treatment. Photos over time give the best picture.",
      },
    ],
    sources: [source.badMale, source.nhsHairLoss],
    condition: {
      name: "Crown thinning",
      alternateName: ["Vertex hair loss", "Bald spot on the crown"],
      signOrSymptom: ["Visible scalp at the crown", "Thinning around the whorl"],
      possibleTreatment: ["Crown hair transplant", "Medical treatment to slow hair loss"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "norwood-scale",
      "male-pattern-baldness",
      "hair-transplant-recovery-timeline",
      "hair-transplant-cost-london",
    ],
  },

  "female-hair-loss": {
    slug: "female-hair-loss",
    title: "Female Hair Loss",
    seoTitle: "Female Hair Loss: Causes, Types and When to Get Help",
    description:
      "The common causes of hair loss in women, from female pattern hair loss to shedding after pregnancy, and which women may be suitable for a hair transplant.",
    eyebrow: "Female hair loss",
    lead:
      "Hair loss in women is common and often has more than one cause. Finding the cause matters more than for men, because some types recover on their own and some need medical treatment rather than surgery.",
    keywords: [
      "female hair loss",
      "hair loss in women",
      "female pattern hair loss",
      "hair thinning women",
      "female hair loss causes",
    ],
    heroChips: ["Causes explained", "When to see your GP", "Who may suit a transplant"],
    cards: [
      {
        title: "Start with the cause",
        text: "Iron deficiency, thyroid problems, hormonal changes and recent illness can all cause or worsen thinning in women.",
      },
      {
        title: "Shedding often recovers",
        text: "Heavy shedding a few months after childbirth, illness or stress usually settles without treatment.",
      },
      {
        title: "Surgery suits fewer women",
        text: "A transplant can help women with stable, localised thinning and a strong donor area. It is not the answer for diffuse thinning everywhere.",
      },
    ],
    sections: [
      {
        title: "Female pattern hair loss",
        body: [
          "The most common long-term cause. The parting widens and the top of the scalp thins, usually with the front hairline kept. It is described with the Ludwig or Sinclair scales and often becomes more noticeable around the menopause.",
        ],
      },
      {
        title: "Shedding after a trigger",
        body: [
          "Telogen effluvium causes heavy, even shedding that usually starts two to three months after a trigger. Childbirth, a high fever, surgery, crash dieting and severe stress are common triggers. It usually recovers within months once the trigger has passed.",
        ],
      },
      {
        title: "Other causes to rule out",
        body: [
          "A GP can check for iron deficiency, thyroid problems and hormonal conditions such as polycystic ovary syndrome. Tight hairstyles can cause traction alopecia at the hairline, and frontal fibrosing alopecia can cause a slowly receding front hairline, often after the menopause.",
        ],
        bullets: [
          "Blood tests for iron and thyroid function",
          "A review of recent illness, pregnancy or medicines",
          "A dermatologist for patchy, painful or scarring loss",
        ],
      },
      {
        title: "When a transplant may help",
        body: [
          "Women with a stable, defined area of thinning, such as a wider parting, a high or reshaped hairline, or traction loss at the temples, can be good candidates if the donor area at the back is dense. The procedure is usually carried out without shaving the recipient area.",
        ],
      },
    ],
    faq: [
      {
        question: "Why is my hair thinning as a woman?",
        answer:
          "The most common reasons are female pattern hair loss, shedding after a trigger such as illness or childbirth, iron deficiency and thyroid problems. A GP can arrange tests to look for treatable causes.",
      },
      {
        question: "Does hair grow back after postpartum hair loss?",
        answer:
          "Usually, yes. Shedding after childbirth is a form of telogen effluvium and normally recovers within months without treatment.",
      },
      {
        question: "Can women get a hair transplant?",
        answer:
          "Some women can. The best candidates have a stable, defined area of thinning and a strong donor area. Women with diffuse thinning across the whole scalp are usually not suitable.",
      },
      {
        question: "Does menopause cause hair loss?",
        answer:
          "Hormonal changes around the menopause can make female pattern hair loss more noticeable. Frontal fibrosing alopecia is also more common after the menopause and should be checked by a dermatologist.",
      },
    ],
    sources: [source.badFemale, source.badTelogen, source.badFfa, source.nhsHairLoss],
    condition: {
      name: "Female hair loss",
      alternateName: ["Female pattern hair loss", "Hair thinning in women"],
      signOrSymptom: ["Widening parting", "Heavy shedding", "Thinning on top of the scalp"],
      possibleTreatment: ["Female hair transplant", "Treatment of the underlying cause"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "ludwig-scale",
      "female-hair-transplant-london",
      "diffuse-thinning",
      "traction-alopecia",
    ],
  },

  "diffuse-thinning": {
    slug: "diffuse-thinning",
    title: "Diffuse Hair Thinning",
    seoTitle: "Diffuse Hair Thinning: Causes and Transplant Suitability",
    description:
      "What diffuse hair thinning is, the common causes in men and women, and why it needs a careful assessment before a hair transplant is considered.",
    eyebrow: "Diffuse thinning",
    lead:
      "Diffuse thinning means hair is getting less dense across a wide area rather than in a clear pattern. It is one of the situations where a transplant is most often the wrong choice, so it is worth understanding before you book anything.",
    keywords: [
      "diffuse hair thinning",
      "diffuse thinning hair transplant",
      "overall hair thinning",
      "diffuse unpatterned alopecia",
      "thin hair all over",
    ],
    heroChips: ["Patterned or unpatterned", "Common causes", "Why the donor area matters"],
    cards: [
      {
        title: "Patterned or not",
        text: "Thinning across the top with strong sides and back is very different from thinning everywhere, including the donor area.",
      },
      {
        title: "Often a medical cause",
        text: "Shedding after illness, iron deficiency and thyroid problems can all cause diffuse thinning that improves once treated.",
      },
      {
        title: "The donor area decides",
        text: "If the back and sides are thinning too, there may not be enough stable hair to move.",
      },
    ],
    sections: [
      {
        title: "Two very different pictures",
        body: [
          "Diffuse patterned thinning affects the top of the scalp while the back and sides stay dense. It behaves like pattern hair loss and some people are suitable for a transplant.",
          "Diffuse unpatterned thinning affects the whole scalp, including the donor area. Hair taken from a thinning donor area may keep thinning after it is moved, which makes surgery a poor investment.",
        ],
      },
      {
        title: "Common causes",
        body: [
          "Telogen effluvium, iron deficiency, thyroid problems, some medicines, rapid weight loss and pattern hair loss can all show up as diffuse thinning. More than one cause can be present at once.",
        ],
      },
      {
        title: "How it is assessed",
        body: [
          "A clinician will usually look at the scalp under magnification (trichoscopy) to compare hair thickness on top and in the donor area. Blood tests through your GP help rule out treatable causes.",
        ],
      },
      {
        title: "Options other than surgery",
        body: [
          "Treating any underlying cause comes first. Medical treatments can improve density for some people, and scalp micropigmentation or styling can reduce the visible contrast between scalp and hair.",
        ],
      },
    ],
    faq: [
      {
        question: "Can a hair transplant fix diffuse thinning?",
        answer:
          "Only in some cases. If the thinning is on top and the back and sides are dense, a transplant may help. If the whole scalp is thinning, including the donor area, surgery is usually not recommended.",
      },
      {
        question: "Why is my hair thinning all over?",
        answer:
          "Common reasons include shedding after illness or stress, iron deficiency, thyroid problems, some medicines and pattern hair loss. A GP is the right first step for blood tests.",
      },
      {
        question: "Is diffuse thinning permanent?",
        answer:
          "It depends on the cause. Shedding after a trigger usually recovers. Thinning caused by pattern hair loss tends to progress slowly without treatment.",
      },
    ],
    sources: [source.badTelogen, source.badMale, source.badFemale, source.nhsHairLoss],
    condition: {
      name: "Diffuse hair thinning",
      alternateName: ["Diffuse unpatterned alopecia", "Diffuse patterned alopecia"],
      signOrSymptom: ["Reduced density across a wide area of the scalp"],
      possibleTreatment: ["Treatment of the underlying cause", "Hair transplant in selected patterned cases"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "female-hair-loss",
      "male-pattern-baldness",
      "services/hair-loss-treatments",
      "types-of-hair-loss",
    ],
  },

  "alopecia-areata": {
    slug: "alopecia-areata",
    title: "Alopecia Areata",
    seoTitle: "Alopecia Areata: Why a Hair Transplant Is Usually Not Advised",
    description:
      "What alopecia areata is, how it is treated, and why a hair transplant is usually not recommended for this type of patchy hair loss.",
    eyebrow: "Alopecia areata",
    lead:
      "Alopecia areata causes round, smooth patches of hair loss and is caused by the immune system attacking hair follicles. It is managed by GPs and dermatologists, and a hair transplant is usually not the right treatment for it.",
    keywords: [
      "alopecia areata",
      "alopecia areata hair transplant",
      "patchy hair loss",
      "bald patches",
      "alopecia treatment uk",
    ],
    heroChips: ["What it is", "Why we usually say no to surgery", "Where to get help"],
    cards: [
      {
        title: "An immune condition",
        text: "The immune system targets hair follicles, causing patches of loss on the scalp, beard, eyebrows or body.",
      },
      {
        title: "Hair often regrows",
        text: "Many small patches regrow without treatment, although new patches can appear and the course is hard to predict.",
      },
      {
        title: "Transplants are usually not advised",
        text: "Transplanted follicles can be attacked in the same way, and the condition can move to new areas.",
      },
    ],
    sections: [
      {
        title: "What alopecia areata looks like",
        body: [
          "It usually starts as one or more round, smooth bald patches. Short broken hairs can be seen at the edges. It can affect the beard and eyebrows as well as the scalp, and in rarer forms affects the whole scalp or body.",
        ],
      },
      {
        title: "How it is treated",
        body: [
          "Treatment is managed by a GP or dermatologist and depends on how much hair is affected. Options range from treatments applied to the skin and steroid injections into patches, to newer tablet treatments for severe cases. There is no cure, but many people regrow hair.",
        ],
      },
      {
        title: "Why a transplant is usually not advised",
        body: [
          "Alopecia areata can target transplanted hair just as it targets the original hair. It can also appear in new places, including the donor area, so surgery risks using up donor hair without a lasting result.",
          "A reputable provider will tell you this at the first assessment and point you to medical care instead.",
        ],
      },
      {
        title: "Support",
        body: [
          "Hair loss from alopecia areata can affect confidence and mood, and that deserves support too. Alopecia UK offers information and peer support, and your GP can refer you to a dermatologist.",
        ],
      },
    ],
    faq: [
      {
        question: "Can you have a hair transplant with alopecia areata?",
        answer:
          "Usually not. The condition can attack transplanted follicles and can appear in new areas, including the donor area. Medical treatment through a GP or dermatologist is the right route.",
      },
      {
        question: "Does alopecia areata grow back?",
        answer:
          "Often, yes, particularly small patches. Regrowth is less likely when a large part of the scalp is affected or the condition has lasted a long time.",
      },
      {
        question: "What causes alopecia areata?",
        answer:
          "It is an autoimmune condition, meaning the immune system targets hair follicles. It can run in families and is more common in people with other autoimmune conditions.",
      },
      {
        question: "Is alopecia areata the same as male pattern baldness?",
        answer:
          "No. Male pattern baldness is gradual and follows a typical pattern. Alopecia areata causes sudden, smooth patches and has a completely different cause and treatment.",
      },
    ],
    sources: [source.badAlopeciaAreata, source.alopeciaUk, source.nhsHairLoss],
    condition: {
      name: "Alopecia areata",
      alternateName: ["Patchy hair loss"],
      signOrSymptom: ["Round, smooth bald patches", "Short broken hairs at the edge of patches"],
      possibleTreatment: ["Treatment by a GP or dermatologist"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "types-of-hair-loss",
      "diffuse-thinning",
      "services/hair-loss-treatments",
      "our-clinical-standards",
    ],
  },

  "traction-alopecia": {
    slug: "traction-alopecia",
    title: "Traction Alopecia",
    seoTitle: "Traction Alopecia: Causes, Recovery and Hair Transplant",
    description:
      "How tight hairstyles cause traction alopecia, when hair can recover, and when a hair transplant can restore a hairline that will not grow back.",
    eyebrow: "Traction alopecia",
    lead:
      "Traction alopecia is hair loss caused by long-term pulling on the hair, most often at the hairline and temples. Caught early it can recover. Once it has gone on for years, the follicles can be lost for good, and that is where a transplant can help.",
    keywords: [
      "traction alopecia",
      "traction alopecia hair transplant",
      "hair loss from braids",
      "hairline loss from tight hairstyles",
      "traction alopecia treatment",
    ],
    heroChips: ["Causes and early signs", "Can it recover?", "When surgery helps"],
    cards: [
      {
        title: "Caused by tension",
        text: "Tight braids, cornrows, weaves, extensions, tight ponytails and buns can all pull on the hair over time.",
      },
      {
        title: "Early loss can recover",
        text: "If the tension is removed early, hair often grows back over the following months.",
      },
      {
        title: "Long-standing loss may not",
        text: "After years of tension the follicles can scar and stop producing hair. A transplant can then rebuild the area.",
      },
    ],
    sections: [
      {
        title: "Early signs",
        body: [
          "Loss usually starts at the hairline, temples or around the edges of a parting. Small bumps, soreness, or broken hairs where the hair is pulled are early warning signs.",
        ],
      },
      {
        title: "First, take the tension off",
        body: [
          "The most important treatment is to stop the pulling: looser styles, shorter wear times for braids and extensions, and avoiding the same tight style every day. A dermatologist can help if the scalp is inflamed.",
        ],
      },
      {
        title: "When a transplant can help",
        body: [
          "If hair has not returned after the tension has been removed for a good period, often a year or more, the loss is likely to be permanent. Because the cause is known and the donor area is often unaffected, traction alopecia can respond well to a transplant.",
          "The transplanted hair will be just as vulnerable to tension, so the hairstyle change has to be permanent.",
        ],
      },
      {
        title: "Afro-textured hair",
        body: [
          "Traction alopecia is common in people with afro-textured hair. Curved follicles under the skin make extraction more technically demanding, so ask how much experience the surgeon has with your hair type and whether a small test session is recommended.",
        ],
      },
    ],
    faq: [
      {
        question: "Can traction alopecia grow back?",
        answer:
          "Often, if it is caught early and the tension is removed. After many years, the follicles can be permanently damaged and the hair may not return.",
      },
      {
        question: "How long should I wait before a hair transplant for traction alopecia?",
        answer:
          "Most surgeons want to see that hair has not regrown after the tension has been removed for a good period, often a year or more, so they know which areas are truly permanent.",
      },
      {
        question: "Can I wear braids after a hair transplant?",
        answer:
          "Not in the treated area for a long recovery period, and tight styles should be avoided long term, because transplanted hair can be lost to traction in the same way.",
      },
      {
        question: "Is a hair transplant harder with afro hair?",
        answer:
          "It can be more technically demanding because the follicles are curved under the skin. It can still work well with an experienced surgeon and careful planning.",
      },
    ],
    sources: [source.badTraction, source.nhsHairLoss],
    condition: {
      name: "Traction alopecia",
      signOrSymptom: ["Hair loss at the hairline and temples", "Broken hairs where hair is pulled"],
      possibleTreatment: ["Removing hair tension", "Hair transplant for permanent loss"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "female-hair-loss",
      "receding-hairline",
      "female-hair-transplant-london",
      "hair-transplant-without-shaving",
    ],
  },

  "hair-transplant-for-scars": {
    slug: "hair-transplant-for-scars",
    title: "Hair Transplant for Scars",
    seoTitle: "Hair Transplant Into Scars: Scalp, Brow and Beard",
    description:
      "How hair can be transplanted into scars on the scalp, eyebrows and beard, why scar tissue changes the result, and what to expect from treatment.",
    eyebrow: "Scar hair transplant",
    lead:
      "Scars from surgery, injury, burns or an earlier strip hair transplant can leave areas where hair no longer grows. Hair can often be transplanted into scar tissue, but the scar itself changes how the grafts take, so the plan has to be realistic.",
    keywords: [
      "hair transplant for scars",
      "hair transplant into scar tissue",
      "fut scar repair",
      "eyebrow scar hair transplant",
      "beard scar hair transplant",
    ],
    heroChips: ["Scalp, brow and beard scars", "How scar tissue changes results", "Test sessions"],
    cards: [
      {
        title: "Many scars can be treated",
        text: "Flat, settled scars on the scalp, eyebrows or beard can often accept grafts and grow hair through them.",
      },
      {
        title: "Lower blood supply",
        text: "Scar tissue has fewer blood vessels than normal skin, so a smaller share of the grafts may survive.",
      },
      {
        title: "Sometimes two sessions",
        text: "A small first session to test the scar, followed by a second to build density, is a common approach.",
      },
    ],
    sections: [
      {
        title: "Which scars can be treated",
        body: [
          "Common examples are the linear scar left by a strip (FUT) hair transplant, scars from surgery or injury on the scalp, and scars through the eyebrows or beard. A cleft lip scar is a specific case with its own page.",
          "The scar should be mature, usually at least a year old, flat and pale rather than red or raised.",
        ],
      },
      {
        title: "How scar tissue changes the result",
        body: [
          "Scar tissue is firmer and has a weaker blood supply, so grafts can be harder to place and fewer may survive than in normal skin. Grafts are usually placed less densely in the first session to give them the best chance.",
        ],
      },
      {
        title: "Scarring alopecia is different",
        body: [
          "Conditions such as lichen planopilaris and frontal fibrosing alopecia create scarring from within the scalp. A transplant is only considered after a dermatologist confirms the condition has been inactive for a long period, and even then results are less predictable.",
        ],
      },
      {
        title: "What to expect",
        body: [
          "Recovery is similar to a standard transplant: small scabs for one to two weeks, shedding in the first weeks, and new growth from around three to four months. Hair in scar tissue can take longer to mature.",
        ],
      },
    ],
    faq: [
      {
        question: "Can hair grow in scar tissue?",
        answer:
          "Often, yes. Transplanted hair can grow in a mature, settled scar, although fewer grafts usually survive than in normal skin, so more than one session may be needed.",
      },
      {
        question: "Can a FUT strip scar be covered with FUE?",
        answer:
          "Yes. Grafts taken by FUE can be placed into a linear strip scar to break up its line and let surrounding hair blend over it.",
      },
      {
        question: "How old should a scar be before a transplant?",
        answer:
          "Most surgeons prefer a scar to be at least a year old, flat and pale, so it has finished healing and its blood supply has settled.",
      },
      {
        question: "Can a hair transplant help scarring alopecia?",
        answer:
          "Only in selected cases, after a dermatologist confirms the condition has been inactive for a long time. Active scarring alopecia can destroy transplanted hair.",
      },
    ],
    sources: [source.badLpp, source.badFfa, source.nhsHairTransplant],
    condition: {
      name: "Hair loss in scar tissue",
      alternateName: ["Cicatricial hair loss", "Scar alopecia"],
      possibleTreatment: ["Hair transplant into scar tissue"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "cleft-lip-scar-hair-transplant",
      "services/eyebrow-transplant",
      "services/beard-transplant",
      "how-hair-transplant-works",
    ],
  },

  "cleft-lip-scar-hair-transplant": {
    slug: "cleft-lip-scar-hair-transplant",
    title: "Hair Transplant for a Cleft Lip Scar",
    seoTitle: "Cleft Lip Scar Hair Transplant: Moustache and Beard",
    description:
      "How a moustache or beard hair transplant can grow hair through a cleft lip repair scar, who it suits, when to have it, and what results to expect.",
    eyebrow: "Cleft lip scar",
    lead:
      "Many men who had a cleft lip repaired as a child find that facial hair does not grow through the scar on the upper lip, leaving a visible gap in the moustache or beard. A hair transplant can place hair into the scar so facial hair grows more evenly.",
    keywords: [
      "cleft lip hair transplant",
      "cleft lip scar hair transplant",
      "moustache transplant cleft lip",
      "beard transplant cleft lip scar",
      "facial hair cleft lip scar",
    ],
    heroChips: [
      "Moustache and beard scars",
      "When to have it",
      "Realistic results in scar tissue",
    ],
    cards: [
      {
        title: "A common concern",
        text: "A repair scar often lacks hair follicles, so the moustache grows around it and the gap can draw attention to the scar.",
      },
      {
        title: "Your own hair",
        text: "Single hairs are usually taken from the back of the scalp and placed one by one into the scar at the angle of the surrounding moustache.",
      },
      {
        title: "Small but precise",
        text: "These procedures usually involve a few hundred grafts, but each one has to follow the natural direction of facial hair.",
      },
    ],
    sections: [
      {
        title: "Who it may suit",
        body: [
          "Adults who had a cleft lip repaired and now have a moustache or beard that grows unevenly around the scar. It works best when the scar is mature, flat and has good skin quality, and when you have enough facial hair elsewhere for the result to blend.",
        ],
      },
      {
        title: "When to have it",
        body: [
          "Most people with a cleft have care from an NHS cleft team into their late teens or beyond, sometimes including lip revision, nose surgery or jaw surgery. A transplant is best planned after that surgery is finished, so new procedures do not disturb the grafts.",
          "If you are still under the care of your cleft team, it is worth asking them whether any further surgery is planned before you book.",
        ],
      },
      {
        title: "How scar tissue changes the result",
        body: [
          "Scar tissue on the lip is firmer and has a weaker blood supply than normal skin, so a smaller share of grafts may survive. Some patients need a second session to reach the density they want. A careful surgeon will place grafts conservatively the first time.",
        ],
      },
      {
        title: "Recovery",
        body: [
          "Small scabs form on the lip and usually clear within 7 to 10 days. You will be asked to take care when eating and drinking and to avoid shaving the treated area for around two weeks. The transplanted hairs shed in the first weeks and new growth usually starts from three to four months, with the final result at around 12 months.",
        ],
        bullets: [
          "Soft foods and care with hot drinks in the first days",
          "No shaving or trimming the treated area for around two weeks",
          "Growth from about three to four months",
        ],
      },
    ],
    faq: [
      {
        question: "Can hair grow on a cleft lip scar?",
        answer:
          "Often, yes. Hair transplanted into a mature cleft lip scar can grow and be shaved or styled like the rest of the moustache, although fewer grafts usually survive in scar tissue than in normal skin.",
      },
      {
        question: "How many grafts are needed for a cleft lip scar?",
        answer:
          "It depends on the length and width of the scar and how dense your moustache is, but it is often a few hundred grafts. The exact number is confirmed at consultation.",
      },
      {
        question: "Is a cleft lip hair transplant available on the NHS?",
        answer:
          "It is not usually offered as part of NHS cleft care, as it is generally treated as cosmetic. Your cleft team is still the right first contact for questions about scar revision or further surgery.",
      },
      {
        question: "Does a cleft lip hair transplant hurt?",
        answer:
          "The area is numbed with local anaesthetic, so the procedure itself should not be painful. The lip may feel tender and swollen for a few days afterwards.",
      },
      {
        question: "Will the transplanted hair match my moustache?",
        answer:
          "Scalp hair is usually a close match for facial hair, and it is placed at the same angle as the surrounding moustache. It can be slightly finer or softer, which often helps it blend.",
      },
    ],
    sources: [source.nhsCleft, source.clapa, source.nhsHairTransplant],
    condition: {
      name: "Cleft lip repair scar",
      alternateName: ["Cleft lip scar"],
      signOrSymptom: ["No facial hair growth through the upper lip scar"],
      possibleTreatment: ["Moustache hair transplant into the scar"],
    },
    breadcrumbParent: hub,
    relatedSlugs: [
      "services/moustache-transplant",
      "services/beard-transplant",
      "hair-transplant-for-scars",
      "hair-transplant-recovery-timeline",
    ],
  },
};
