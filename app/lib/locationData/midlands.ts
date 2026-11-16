import { formatGrafts, formatPrice, getPackage } from "@/app/lib/pricing";
import type { LocationInput } from "./types";

const updatedAt = "2026-11-16";

/** Published London prices, read from pricing.ts so a price change lands here too. */
const [hairBase, hairLarge] = getPackage("hair").tiers;

export const midlandsLocations: LocationInput[] = [
  {
    city: "Birmingham",
    nation: "england",
    publishedAt: "2026-09-24",
    updatedAt,
    title: "Hair Transplant Birmingham: West Midlands Options Compared",
    seoTitle: "Hair Transplant Birmingham: West Midlands Guide",
    description:
      "Birmingham is under 90 minutes from Euston, which makes a London consultation easy to compare with West Midlands clinics. Routes from New Street, Moor Street and Wolverhampton.",
    lead: "Birmingham has a big local market and one of the shortest rail journeys to London of any major UK city. That combination means many patients here can realistically compare a West Midlands clinic with a London partner without the travel becoming a deciding factor. This guide covers how to make that comparison and which of the city's several London routes suits you.",
    heroChips: ["Under 90 minutes to Euston", "Three rail routes to London", "Black Country and Solihull"],
    cards: [
      {
        title: "London is a half-day trip",
        text: "Fast trains reach Euston in around 1 hour 25 minutes, so a consultation can fit around a working day.",
      },
      {
        title: "More than one way to London",
        text: "Avanti and London Northwestern run from New Street to Euston, and Chiltern runs from Moor Street and Snow Hill to Marylebone.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 25 minutes",
      trainRoute: "Birmingham New Street to London Euston, fastest direct Avanti services",
      drivingTime: "around 2 hours",
      drivingRoute: "M40, outside peak traffic",
      sameDayReturnNote:
        "A consultation is easy to do as a morning or afternoon trip. Some patients even return home on the evening of their procedure, but after several hours in the clinic, an overnight stay is often more comfortable, so weigh it rather than dismissing it on cost.",
      nearbyTowns: ["Solihull", "West Bromwich", "Dudley", "Walsall", "Wolverhampton", "Sutton Coldfield"],
    },
    sections: [
      {
        title: "A big local market, and how to cut through it",
        body: [
          "Birmingham and the wider West Midlands support a large number of hair restoration providers, including branches of national chains and independent practices. Advertising is heavy, and the same procedure can be described and priced in very different ways.",
          "Because London is so close, you do not need to choose between local and London on travel grounds alone. Instead, put two or three options side by side and compare the named doctor, the provider's registration, how your graft range was assessed and what aftercare is included. The best option is whichever answers those most clearly.",
        ],
        bullets: [
          "Shortlist a small number of clinics and ask each the same questions.",
          "Find out whether a chain's Birmingham branch uses its own doctors or visiting ones.",
          "Do not let a countdown offer rush the decision.",
        ],
      },
      {
        title: "Choosing your route to London",
        body: [
          "Avanti's fast trains from New Street reach Euston in around an hour and a half, and Birmingham International, next to the airport, is on the same line. London Northwestern also runs from New Street to Euston more slowly, often at lower fares. Chiltern Railways runs from Moor Street and Snow Hill to Marylebone, calling at Solihull, which can suit patients on that side of the city.",
          "Wolverhampton has direct trains to Euston too, which helps patients in the Black Country, and the Cross City line brings Sutton Coldfield into New Street. Confirm with the clinic which terminus is most convenient for their address.",
        ],
        bullets: [
          "London Northwestern is slower but can be cheaper than Avanti.",
          "Chiltern from Solihull or Moor Street arrives at Marylebone.",
          "Wolverhampton patients can travel direct without changing at New Street.",
        ],
      },
    ],
    faq: [
      {
        question: "How quick is the train from Birmingham to London?",
        answer:
          "The fastest Avanti services from New Street to Euston take around 1 hour 25 minutes. Slower London Northwestern and Chiltern services take longer but can be cheaper.",
      },
      {
        question: "Can I go home the same day after a procedure in London?",
        answer:
          "Some Birmingham patients do, because the journey is short. Many still prefer one night in London, since the procedure takes most of the day. Ask the clinic what they recommend for your plan.",
      },
      {
        question: "Is there a direct train from Solihull to London?",
        answer:
          "Yes. Chiltern Railways services from Solihull run to London Marylebone. Check timings, as journey times are longer than the fast trains from New Street to Euston.",
      },
      {
        question: "Are Birmingham clinics regulated the same way as London ones?",
        answer:
          "Yes, both are in England, so independent clinics should be registered with the Care Quality Commission. You can check this on the CQC's public register.",
      },
      {
        question: "Can I fly to Turkey from Birmingham Airport?",
        answer:
          "Birmingham Airport has had direct flights to Istanbul, typically around four hours. Our UK versus Turkey guide covers what changes when the procedure is abroad.",
      },
    ],
  },
  {
    city: "Coventry",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt: "2026-11-16",
    title: "Hair Transplant Coventry and Warwickshire: Comparing Your Options",
    seoTitle: "Hair Transplant Coventry: Warwickshire Patient Guide",
    description:
      "Coventry sits between Birmingham and London with fast links to both. How Coventry, Leamington and Rugby patients can compare local, Birmingham and London options.",
    lead: "Coventry is unusual in having two very different alternatives within easy reach: Birmingham, about twenty minutes by train, and London, about an hour. For patients in Coventry and Warwickshire, that makes a three-way comparison realistic. This guide explains how to keep it fair and which station suits you best.",
    heroChips: ["Birmingham 20 minutes away", "London in about an hour", "Leamington and Rugby routes"],
    cards: [
      {
        title: "A genuine three-way choice",
        text: "Local clinics, Birmingham and London are all within an hour, so the comparison can be about standards rather than travel.",
      },
      {
        title: "Warwickshire has its own stations",
        text: "Rugby has fast trains to Euston and Leamington Spa has Chiltern services to Marylebone, so you may not need to start in Coventry.",
      },
    ],
    travel: {
      trainTime: "around 1 hour",
      trainRoute: "Coventry to London Euston, fastest direct services",
      drivingTime: "around 2 hours",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "An hour each way makes a London consultation simple to fit into a single day. For the procedure itself, some patients go home that evening, but staying one night is worth considering after a long day in the clinic.",
      nearbyTowns: ["Nuneaton", "Kenilworth", "Leamington Spa", "Rugby", "Bedworth", "Warwick"],
    },
    sections: [
      {
        title: "Comparing Coventry, Birmingham and London",
        body: [
          "With Birmingham so close, many Coventry patients include clinics there alongside local options. London, at around an hour by train, is not much further in practice. That gives you a wide field, so the key is to ask every option the same questions and get the answers in writing.",
          "Think about follow-up as well as the procedure. A review at a few months and another at around a year are common, so how easy each clinic is to reach on a weekday matters more than how quickly you can get there once.",
        ],
        bullets: [
          "Treat Birmingham and London as real alternatives, not just fallbacks.",
          "Compare follow-up arrangements, not only the procedure day.",
          "Ask each clinic to explain how they assessed your donor area.",
        ],
      },
      {
        title: "Which Warwickshire station to use",
        body: [
          "From Coventry, fast trains run to Euston in about an hour. Rugby is on the same West Coast route with quick services to Euston, which can suit patients in the east of the county. In Leamington Spa and Warwick, Chiltern Railways runs direct to Marylebone. Nuneaton also has direct services to Euston.",
          "Euston has the Northern and Victoria lines, and Marylebone is on the Bakerloo line, so both give quick access to central London. Check which is closer to the clinic's address before you book.",
        ],
        bullets: [
          "Rugby can be quicker for patients east of Coventry.",
          "Leamington and Warwick have Chiltern trains to Marylebone.",
          "Nuneaton and Bedworth patients can travel direct from Nuneaton.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I look at Birmingham clinics if I live in Coventry?",
        answer:
          "It is reasonable to include them, since the journey is short. Compare them on the same terms as local and London options: the doctor, the registration, the quote and the aftercare.",
      },
      {
        question: "How long is the train from Coventry to London?",
        answer:
          "The fastest direct services to Euston take around an hour. Slower trains take longer, so check your specific service.",
      },
      {
        question: "Is there a train from Leamington Spa to London?",
        answer:
          "Yes. Chiltern Railways runs direct services from Leamington Spa to London Marylebone. Some patients also drive or take a short train to Coventry for the faster Euston route.",
      },
      {
        question: "Can I travel home the same day after treatment?",
        answer:
          "From Coventry the journey is short enough that some patients do. Others prefer one night in London. Ask the clinic what they suggest for your case.",
      },
      {
        question: "Which airport is closest for Turkey?",
        answer:
          "Birmingham Airport is around twenty minutes away and has had direct flights to Istanbul. Check current schedules before booking.",
      },
    ],
  },
  {
    city: "Leicester",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt: "2026-11-16",
    title: "Hair Transplant Leicester: Leicestershire Patient Guide",
    seoTitle: "Hair Transplant Leicester: Local and London Guide",
    description:
      "Leicester is about an hour from St Pancras. How Leicester, Loughborough and Market Harborough patients can compare East Midlands clinics with a London consultation.",
    lead: "Leicester has the shortest rail journey to London of the East Midlands cities, which gives patients here an easy way to compare a London option with clinics in Leicester, Nottingham or Birmingham. This guide explains how to keep that comparison fair, and how to get to St Pancras from different parts of Leicestershire.",
    heroChips: ["About an hour to St Pancras", "Loughborough and Market Harborough", "East Midlands comparison"],
    cards: [
      {
        title: "London is a short trip",
        text: "Fast trains reach St Pancras in around an hour, so a consultation can fit around a working day.",
      },
      {
        title: "Several cities within reach",
        text: "Nottingham and Birmingham are both close, so many Leicester patients compare providers across the region.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 5 minutes",
      trainRoute: "Leicester to London St Pancras International, fastest direct services",
      drivingTime: "around 2 hours",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "An hour each way makes a London consultation a simple day trip, and some patients return home on the evening of treatment too. Staying one night after the procedure is still worth considering after a long clinic day.",
      nearbyTowns: ["Loughborough", "Hinckley", "Market Harborough", "Melton Mowbray", "Oadby", "Coalville"],
    },
    sections: [
      {
        title: "Using Leicester's position to compare",
        body: [
          "Leicester has its own providers, and patients here often look at Nottingham and Birmingham too. Because London is only an hour away, it fits easily into that comparison. The challenge is making sure each option is assessed on the same terms.",
          "Ask every clinic for the doctor's name, how they are registered, how they reached your graft estimate and what follow-up is included. With those answers side by side, travel time becomes a minor factor rather than the deciding one.",
        ],
        bullets: [
          "Compare clinics in Leicester, Nottingham, Birmingham and London on the same questions.",
          "Ask whether the graft estimate came from a proper donor assessment.",
          "Check the CQC register for every provider in England.",
        ],
      },
      {
        title: "Getting to St Pancras from Leicestershire",
        body: [
          "East Midlands Railway runs fast direct trains from Leicester to St Pancras in around an hour. Loughborough and Market Harborough are on the same line, so patients in the north and south of the county may be able to travel without going into Leicester. Hinckley has local trains into Leicester.",
          "St Pancras shares an Underground station with King's Cross, with six lines, so onward travel into central London is usually quick.",
        ],
        bullets: [
          "Loughborough and Market Harborough are on the direct line to London.",
          "Book ahead for cheaper fares, especially at busy times.",
          "Allow time for the onward journey from St Pancras.",
        ],
      },
    ],
    faq: [
      {
        question: "How long does it take to get from Leicester to London?",
        answer:
          "The fastest direct trains to St Pancras take around 1 hour 5 minutes. Driving usually takes around two hours outside peak times.",
      },
      {
        question: "Can I catch a London train from Loughborough or Market Harborough?",
        answer:
          "Yes. Both are on the Midland Main Line with direct services to St Pancras, which can be more convenient than travelling into Leicester first.",
      },
      {
        question: "Should I compare clinics in Nottingham and Birmingham as well?",
        answer:
          "It is worth considering, since both are close. Just compare them on the same terms and count the follow-up trips.",
      },
      {
        question: "Can I travel back to Leicester on the day of treatment?",
        answer:
          "Some patients do, as the journey is short. Others prefer to stay one night. Ask the clinic what suits your plan.",
      },
      {
        question: "Where would I fly from for Turkey?",
        answer:
          "East Midlands Airport has mostly offered seasonal holiday flights to Turkey, so many Leicester patients fly from Birmingham or a London airport instead. Check current schedules.",
      },
    ],
  },
  {
    city: "Nottingham",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Nottingham: Nottinghamshire Patient Guide",
    seoTitle: "Hair Transplant Nottingham: Local and London Guide",
    description:
      "How Nottingham, Beeston, Mansfield and Newark patients can compare Nottinghamshire clinics with London, including the St Pancras and King's Cross routes.",
    lead: "Nottingham is a regional centre for much of the East Midlands, and patients from across the county often start their research here. London is under two hours by train, and patients near Newark have a fast alternative route on the East Coast line. This guide covers how to compare options and which route south makes sense for you.",
    heroChips: ["Under two hours to London", "Newark on the East Coast line", "Mansfield and Beeston routes"],
    cards: [
      {
        title: "A regional hub",
        text: "Patients from across Nottinghamshire often research clinics in Nottingham first, so it is a busy local market.",
      },
      {
        title: "Newark has a faster option",
        text: "Newark Northgate is on the East Coast line, with LNER services to King's Cross that can be quicker than going via Nottingham.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 45 minutes",
      trainRoute: "Nottingham to London St Pancras International, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "A consultation is a comfortable day trip from Nottingham. For treatment, most patients stay one night in London so the journey home is not straight after a long procedure.",
      nearbyTowns: ["West Bridgford", "Beeston", "Arnold", "Mansfield", "Newark", "Long Eaton"],
    },
    sections: [
      {
        title: "What to look for in the Nottingham market",
        body: [
          "As the main city in the county, Nottingham has a range of providers, and some patients also look at Derby, Leicester or Sheffield. Prices and how quotes are put together vary widely, so it is worth taking time to understand what each one includes.",
          "Focus on the essentials: who performs the procedure, the provider's CQC registration, how the graft range was assessed and what follow-up is included. A clinic that answers clearly and in writing is usually a better sign than a polished advert.",
        ],
        bullets: [
          "Ask how many reviews are included after the procedure.",
          "Check whether medication or PRP is inside the quoted price.",
          "Compare a few providers rather than relying on a single quote.",
        ],
      },
      {
        title: "Getting to London from around Nottinghamshire",
        body: [
          "East Midlands Railway runs direct from Nottingham to St Pancras in under two hours. Beeston has local trains into Nottingham, and the Robin Hood line brings Mansfield into the city. For patients near Newark, LNER trains from Newark Northgate run to King's Cross, often in around an hour and a quarter.",
          "St Pancras and King's Cross are next to each other, so the onward journey is the same from either. Ask the clinic for directions from the station when you book.",
        ],
        bullets: [
          "Newark Northgate patients can use the fast LNER route to King's Cross.",
          "Mansfield is linked to Nottingham by the Robin Hood line.",
          "Book advance tickets for the best fares.",
        ],
      },
    ],
    faq: [
      {
        question: "How much more does DHI cost than FUE for a Nottingham patient?",
        answer:
          `DHI is usually priced above FUE because the grafts are implanted with a different technique. In our London packages the difference is ${formatPrice(hairBase.dhi - hairBase.fue)}: ${formatPrice(hairBase.fue)} for Sapphire FUE or ${formatPrice(hairBase.dhi)} for DHI up to ${formatGrafts(hairBase.maxGrafts)} grafts. Whether DHI is worth the extra for you depends on your hair and the area being treated, which is a question for the consultation rather than the price list.`,
      },
      {
        question: "Is Newark quicker than Nottingham for getting to London?",
        answer:
          "Often, yes. LNER services from Newark Northgate to King's Cross can take around an hour and a quarter, faster than Nottingham to St Pancras. If you live near Newark, compare both.",
      },
      {
        question: "Can I do a London consultation in a day from Nottingham?",
        answer:
          "Yes. With under two hours each way, most patients travel down, attend the consultation and return the same day.",
      },
      {
        question: "Should I compare Derby or Leicester clinics too?",
        answer:
          "Both are close, so it is reasonable to include them. Use the same questions for each, and think about how easy follow-up visits would be.",
      },
      {
        question: "Do I need to stay in London after treatment?",
        answer:
          "Most Nottingham patients stay one night. The procedure takes most of the day, and a calm journey home the next morning is usually more comfortable.",
      },
      {
        question: "Can I fly to Turkey from East Midlands Airport?",
        answer:
          "Its Turkey flights have mostly been seasonal holiday routes, so many Nottingham patients fly from Birmingham or Manchester, which have had direct Istanbul flights. Check current schedules.",
      },
    ],
  },
  {
    city: "Derby",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Derby: Derbyshire Patient Guide",
    seoTitle: "Hair Transplant Derby: Local and London Options",
    description:
      "For Derby, Belper, Matlock and Burton patients: comparing Derbyshire clinics with Nottingham, Birmingham and London, and the direct route to St Pancras.",
    lead: "Derby sits between several larger markets, with Nottingham, Birmingham and Sheffield all within an hour, and a direct line to London. For patients in Derby and Derbyshire, that means a wide choice but also a risk of comparing very different quotes. This guide helps you narrow it down.",
    heroChips: ["Direct to St Pancras", "Derwent Valley line", "Between three regional markets"],
    cards: [
      {
        title: "Surrounded by bigger markets",
        text: "Nottingham, Birmingham and Sheffield are all close, so many Derby patients look beyond the city.",
      },
      {
        title: "A direct line to London",
        text: "East Midlands Railway runs direct to St Pancras in around an hour and a half.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 30 minutes",
      trainRoute: "Derby to London St Pancras International, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "A London consultation is a straightforward day trip from Derby. For the procedure, staying a night in London is usually the more comfortable choice.",
      nearbyTowns: ["Burton upon Trent", "Belper", "Ilkeston", "Ashbourne", "Matlock", "Swadlincote"],
    },
    sections: [
      {
        title: "Narrowing a wide regional choice",
        body: [
          "Derby has local providers, but with Nottingham, Birmingham and Sheffield close by, many patients here end up looking at clinics in several cities. That can mean very different prices and very different explanations of the procedure.",
          "Pick a small number of options and ask each for the same details: the named doctor, their registration, how they assessed your donor area and what is included afterwards. A shorter, better-informed list is more useful than a long list of headline prices.",
        ],
        bullets: [
          "Keep your shortlist to a few options you can compare properly.",
          "Ask each clinic the same questions, in writing.",
          "Count follow-up visits when comparing clinics further away.",
        ],
      },
      {
        title: "Travelling from Derby and the Peak District edge",
        body: [
          "East Midlands Railway runs direct from Derby to St Pancras. The Derwent Valley line brings Belper and Matlock into Derby, and Burton upon Trent has regular trains to Derby too. For patients in Ashbourne, driving to Derby station is often the simplest start.",
          "From St Pancras, six Underground lines at King's Cross St Pancras make onward travel straightforward.",
        ],
        bullets: [
          "Belper and Matlock are linked to Derby by the Derwent Valley line.",
          "Burton upon Trent has trains into Derby for onward connections.",
          "Allow time for connections if you are not starting in Derby.",
        ],
      },
      {
        title: "Planning time off around Derby work patterns",
        body: [
          "Plenty of people in and around Derby work shifts, whether in manufacturing, logistics or healthcare. A hair transplant fits best into a block of several days off, because the first week brings visible redness and scabbing and you will need to follow a careful washing routine. If you work under helmets, hard hats or tight-fitting headwear, ask the clinic when it is safe to wear them again before you book.",
          "Booking the procedure at the start of a run of rest days, rather than the end, gives you the most recovery time before you are back on site.",
        ],
        bullets: [
          "Aim for a block of several days off after the procedure.",
          "Ask when you can safely wear work headwear again.",
          "Start your time off with the procedure rather than ending with it.",
        ],
      },
    ],
    faq: [
      {
        question: "How far is London from Derby by train?",
        answer:
          "Direct trains from Derby to St Pancras take around an hour and a half on the fastest services.",
      },
      {
        question: "Can I get to London from Matlock or Belper?",
        answer:
          "Yes. Take the Derwent Valley line into Derby and change for a direct train to St Pancras.",
      },
      {
        question: "Should I consider Nottingham or Birmingham clinics?",
        answer:
          "They are close enough to include. Compare them on the same terms, and think about the extra trips for follow-up visits.",
      },
      {
        question: "Is one night in London enough for treatment?",
        answer:
          "For most Derby patients, yes. Travel down the day before or early on the day, and stay one night after the procedure.",
      },
      {
        question: "Which airport would I use for Turkey from Derby?",
        answer:
          "East Midlands Airport is closest but has mostly offered holiday routes rather than Istanbul flights, so many Derby patients fly from Birmingham or Manchester. Check current schedules.",
      },
    ],
  },
];
