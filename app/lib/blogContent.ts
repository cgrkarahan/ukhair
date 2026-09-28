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
    slug: "how-to-choose-a-hair-transplant-clinic-in-london",
    title: "How to Choose a Hair Transplant Clinic in London",
    seoTitle: "How to Choose a Hair Transplant Clinic in London",
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
  "how-to-choose-a-hair-transplant-clinic-in-london": {
    imageSrc: "/services/male-hair-transplant.png",
    imageAlt:
      "Doctor reviewing a hairline plan on a tablet during a clinic selection consultation",
    imagePosition: "58% center",
  },
};

function createBlogPost(post: BaseBlogPost): BlogPost {
  const image = blogPostImages[post.slug];

  return applyProjectTokens({
    ...post,
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
