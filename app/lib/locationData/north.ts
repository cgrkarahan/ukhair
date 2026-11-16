import { formatGrafts, formatPrice, getPackage } from "@/app/lib/pricing";
import type { LocationInput } from "./types";

const updatedAt = "2026-11-16";

/** Published London prices, read from pricing.ts so a price change lands here too. */
const [hairBase, hairLarge] = getPackage("hair").tiers;

export const northLocations: LocationInput[] = [
  {
    city: "Manchester",
    nation: "england",
    publishedAt: "2026-09-24",
    updatedAt,
    title: "Hair Transplant Manchester: Local Clinics, Turkey or London?",
    seoTitle: "Hair Transplant Manchester: Cost, Turkey or London",
    description:
      `Comparing hair transplant costs from Manchester: a local clinic, a flight to Istanbul or two hours on the train to Euston, and what each route involves.`,
    lead: "Greater Manchester has one of the busiest hair transplant markets outside London, and its airport puts Istanbul a single flight away. That makes Manchester unusual: London is often the third option people think of, not the first. Here is how the three routes compare from Piccadilly, Stockport or Salford, and what the London trip involves if you add it to your shortlist.",
    heroChips: ["Three routes from one city", "Avanti to Euston in about 2h 10m", "Metrolink-friendly planning"],
    cards: [
      {
        title: "Turkey is the local competitor",
        text: "With direct Istanbul flights from Manchester Airport, many quotes you see locally are for Turkey. Compare all three routes on the same terms.",
      },
      {
        title: "Stockport and Wigan skip Piccadilly",
        text: "Both have direct Avanti services to London Euston, so southern and western parts of the conurbation can avoid the city centre altogether.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 10 minutes",
      trainRoute: "Manchester Piccadilly to London Euston, fastest direct Avanti services",
      drivingTime: "around 3 hours 40 minutes",
      drivingRoute: "M6 and M1, outside peak traffic",
      sameDayReturnNote:
        "A consultation fits comfortably into a day return from Piccadilly. For treatment day, most Manchester patients book a hotel near Euston for the night afterwards and take a mid-morning train home, which avoids the evening peak and gives the scalp a calm first night.",
      nearbyTowns: ["Salford", "Stockport", "Bolton", "Oldham", "Wigan", "Bury"],
    },
    sections: [
      {
        title: "Why Manchester patients end up comparing three routes",
        body: [
          "Greater Manchester is large enough to support a wide range of hair restoration providers, from single-surgeon practices to branches of national chains. Add Manchester Airport's direct flights to Istanbul and the result is a crowded, advertising-heavy market where the headline price, not the standard of care, tends to lead the conversation.",
          "The practical effect is that a Manchester patient is rarely choosing between one local clinic and London. They are choosing between several local options, a package abroad, and a London partner, each priced and marketed differently. Putting all three on one sheet of paper, with the same questions answered for each, is the most useful thing you can do before paying a deposit.",
        ],
        bullets: [
          "Ask a local chain branch who performs the procedure on the day, not who features in the brand's marketing.",
          "For an Istanbul package, ask what is included after you fly home, since follow-up from Manchester will be remote.",
          "For London, ask how reviews work once you are back in the North West.",
        ],
      },
      {
        title: "Planning the Euston trip from Greater Manchester",
        body: [
          "Avanti trains from Piccadilly reach Euston in a little over two hours, and Stockport and Wigan North Western have direct services too. If you live along a Metrolink line, such as Bury, Altrincham or the Eccles line through Salford, the tram into Piccadilly is usually simpler than parking near the station.",
          "From Euston, the Northern and Victoria lines and the Euston Square stop give quick onward links across central London. Confirm the partner clinic's address and the best route when you book, and allow a buffer for the onward journey so a delayed train does not cut into your appointment.",
        ],
        bullets: [
          "Advance fares on this route are often much cheaper than walk-up tickets, so book once your date is fixed.",
          "Pick a return train after the evening peak if you are travelling home from a consultation.",
          "On treatment day, travel down the day before or on an early train rather than cutting it fine.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does a hair transplant cost from Manchester?",
        answer:
          `Manchester quotes vary widely and are often priced per graft, so ask every clinic for one written figure that covers the whole plan. Our London package for up to ${formatGrafts(hairBase.maxGrafts)} grafts is ${formatPrice(hairBase.fue)} with Sapphire FUE or ${formatPrice(hairBase.dhi)} with DHI, including post-operative medication, an aftercare pack and one PRP session, with the band confirmed at consultation. Add the return train from Piccadilly, and a hotel night if you want one, before setting it against a local or Istanbul quote.`,
      },
      {
        question: "Is a Manchester clinic cheaper than going to London?",
        answer:
          "Often the headline price is lower, but quotes are built differently, so compare what is included rather than the top-line figure. Check whether aftercare reviews, medication and any PRP are inside the price, and add your rail fare and a hotel night to the London figure so the comparison is fair.",
      },
      {
        question: "Which London station do trains from Manchester arrive at?",
        answer:
          "Direct trains from Manchester Piccadilly, Stockport and Wigan North Western run to London Euston. From there, the Underground or a short taxi ride covers most of central London.",
      },
      {
        question: "Is Turkey a better option because I can fly direct from Manchester Airport?",
        answer:
          "A direct flight makes the journey easy, but it does not change the harder questions: who operates, what you can verify before you travel, and how aftercare works once you are home. Our UK versus Turkey guide covers those trade-offs in detail.",
      },
      {
        question: "Can I get back to Manchester the day after treatment?",
        answer:
          "Most patients can travel home the following day. Wear a loose button-up top, bring the protective headwear the clinic suggests, and choose an off-peak train so you are not crowded into a busy carriage with a fresh scalp.",
      },
      {
        question: "Do I have to visit London for the first consultation?",
        answer:
          "No. A video consultation from home can cover your goals, photos of your donor and thinning areas, and a provisional plan. You only need to travel once you have a written quote you are happy with.",
      },
    ],
  },
  {
    city: "Liverpool",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Liverpool and Merseyside: Weighing Your Options",
    seoTitle: "Hair Transplant Liverpool: Merseyside Patient Guide",
    description:
      "For Liverpool and Wirral patients, the shortlist usually spans Merseyside, Manchester and London. Journey planning from Lime Street, what to ask and when the trip is worth it.",
    lead: "Patients on Merseyside often find their shortlist stretches beyond the city: clinics in Liverpool itself, the larger Manchester market about forty-five minutes away, and London, which is a direct train from Lime Street. This guide looks at how to narrow that down, and what to plan for if a London consultation makes the cut.",
    heroChips: ["Merseyside, Manchester or London", "Direct from Lime Street", "Wirral and Warrington routes"],
    cards: [
      {
        title: "Manchester is part of the local market",
        text: "Many Liverpool patients look east as well as locally, so your realistic shortlist is regional, not just city-wide.",
      },
      {
        title: "Lime Street runs straight to Euston",
        text: "Direct trains reach London in around two and a quarter hours, so a London consultation is a day trip rather than an expedition.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 15 minutes",
      trainRoute: "Liverpool Lime Street to London Euston, fastest direct services",
      drivingTime: "around 4 hours",
      drivingRoute: "M6 and M1, outside peak traffic",
      sameDayReturnNote:
        "Going down for a consultation and back the same evening is very doable from Lime Street. Treatment day is better split: travel the evening before or early that morning, and stay one night after so the journey home is relaxed rather than rushed.",
      nearbyTowns: ["Birkenhead", "Bootle", "St Helens", "Southport", "Warrington", "Widnes"],
    },
    sections: [
      {
        title: "Building a Merseyside shortlist",
        body: [
          "Liverpool has its own clinics, but because Manchester is so close, many patients end up comparing providers across the whole of the North West. That widens your choice, and it also means you will see very different pricing and very different ways of presenting a quote.",
          "Rather than starting with price, start with three facts for every option: the named doctor responsible for your care, how the provider is registered, and exactly what follow-up you get after the procedure. A clinic in Liverpool, one in Manchester and a partner in London can then be compared on the same footing.",
        ],
        bullets: [
          "Ask every provider for the doctor's name so you can check them on the GMC register.",
          "For a Manchester clinic, factor in the trip there and back for follow-up visits too.",
          "Keep each quote in writing so the comparison is not based on memory of a phone call.",
        ],
      },
      {
        title: "Getting to London from Liverpool, Wirral and Warrington",
        body: [
          "Avanti services from Lime Street run direct to Euston, typically about once an hour. If you live on the Wirral, Merseyrail's underground loop brings you into Lime Street without needing to drive into the city. Warrington Bank Quay and Runcorn are also on the West Coast route, which can be quicker for patients living in Warrington or Widnes.",
          "At Euston you have the Northern and Victoria lines, plus Euston Square for the Circle and Metropolitan lines, so the onward trip to central London is usually short. Ask the clinic for directions from Euston when you confirm the appointment.",
        ],
        bullets: [
          "Runcorn and Warrington Bank Quay can save time if you live south or east of the city.",
          "Fares drop noticeably if you avoid the morning peak and book in advance.",
          "Allow at least an hour between your train arriving and your appointment time.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I look at Manchester clinics as well as Liverpool ones?",
        answer:
          "It is worth including them, since the journey is short and it widens your choice. Just make sure you count the extra trips for follow-up when you compare, and ask the same questions of every clinic.",
      },
      {
        question: "How often do trains run from Liverpool to London?",
        answer:
          "Direct Avanti services from Lime Street to Euston typically run around once an hour through the day, taking roughly two and a quarter hours. Check the timetable for your date, since engineering works can change the pattern, particularly at weekends.",
      },
      {
        question: "Is flying to Turkey from Liverpool straightforward?",
        answer:
          "Liverpool John Lennon's Turkey flights have mostly been holiday routes rather than Istanbul, so many Merseyside patients fly from Manchester Airport instead. Check current schedules from both before planning around either.",
      },
      {
        question: "Can someone from the Wirral do a London consultation in a day?",
        answer:
          "Yes. Merseyrail into Lime Street, then a direct train to Euston, makes a same-day trip realistic. Leave early enough to reach the clinic without rushing, and aim for a return train after the evening rush if your appointment allows.",
      },
      {
        question: "What aftercare do I get once I am back on Merseyside?",
        answer:
          "That depends on the provider, so ask before you book. A good answer covers written washing and sleeping instructions, a way to send photos if something worries you, and named contact details rather than a general inbox.",
      },
    ],
  },
  {
    city: "Leeds",
    nation: "england",
    publishedAt: "2026-09-24",
    updatedAt,
    title: "Hair Transplant Leeds: A West Yorkshire Guide to Your Options",
    seoTitle: "Hair Transplant Leeds: West Yorkshire Options Guide",
    description:
      "A guide for Leeds and West Yorkshire patients comparing local hair transplant clinics with London, including LNER journeys to King's Cross and routes from Wakefield and Harrogate.",
    lead: "Leeds is the hub for most hair transplant research in West Yorkshire, drawing patients from Wakefield, Harrogate and Huddersfield as well as the city itself. The East Coast Main Line also makes it one of the easier northern cities to reach London from. This page covers what to look for locally and how a London consultation fits around an LNER timetable.",
    heroChips: ["West Yorkshire's main market", "LNER to King's Cross", "Wakefield Westgate option"],
    cards: [
      {
        title: "Leeds serves the wider county",
        text: "Patients from across West Yorkshire and the Harrogate district often research Leeds clinics first, so expect a busy, competitive local market.",
      },
      {
        title: "King's Cross is very well connected",
        text: "Six Underground lines meet at King's Cross St Pancras, so onward travel to central London is usually quick.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 15 minutes",
      trainRoute: "Leeds to London King's Cross, fastest direct LNER services",
      drivingTime: "around 3 hours 45 minutes",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "With frequent LNER departures, a consultation is easy to fit into a single day from Leeds. For the procedure itself, staying in London that night is the safer choice, and the hotels around King's Cross keep the next morning's journey home short.",
      nearbyTowns: ["Wakefield", "Harrogate", "Huddersfield", "Dewsbury", "Castleford"],
    },
    sections: [
      {
        title: "What the Leeds market looks like",
        body: [
          "As the largest city in West Yorkshire, Leeds is where many people in the county first look for a hair transplant. That draws in a mix of independent practices and regional or national chains, and it means plenty of social media advertising aimed at Leeds postcodes.",
          "The variety is useful, but it also makes it harder to compare like with like. One clinic may quote a graft range after a proper donor assessment, another after a single photo. One may include a year of reviews, another only the first check. Ask each for the same details in writing before you narrow it down.",
        ],
        bullets: [
          "Check whether a quoted graft number came from an in-person or photo assessment.",
          "Ask how many follow-up reviews are included and over what period.",
          "Confirm the provider's CQC registration on the public register yourself.",
        ],
      },
      {
        title: "Fitting London around the East Coast line",
        body: [
          "LNER runs frequent direct services from Leeds to King's Cross, and Wakefield Westgate is on the same route, which can be quicker for patients living south of the city. Harrogate has a small number of direct LNER trains each day; otherwise it is a short connection through Leeds. Huddersfield and Dewsbury patients will usually change at Leeds.",
          "Once you arrive at King's Cross, the Northern, Piccadilly, Victoria, Circle, Hammersmith and City and Metropolitan lines all meet there, so getting to a central London appointment rarely takes long. The clinic can tell you the best route when you book.",
        ],
        bullets: [
          "Wakefield Westgate is worth checking if you live in Wakefield, Castleford or Pontefract.",
          "If you are travelling from Harrogate, look for one of the daily through trains.",
          "Book a return that leaves room for the appointment to run over.",
        ],
      },
    ],
    faq: [
      {
        question: "Are there hair transplant clinics in Leeds city centre?",
        answer:
          "Yes, Leeds has several providers, along with clinics in surrounding towns. The thing to check is not whether one exists nearby, but who carries out the procedure, how the clinic is registered and what the quote really includes.",
      },
      {
        question: "Is Wakefield Westgate quicker than Leeds for getting to London?",
        answer:
          "For patients south and east of Leeds it often is, because direct LNER trains to King's Cross call there and you avoid travelling into Leeds first. Compare the two for your date, since timings vary.",
      },
      {
        question: "Can I travel from Harrogate for a London consultation?",
        answer:
          "Yes. A few direct LNER trains run from Harrogate to King's Cross each day, or you can change at Leeds. Either way, a consultation can usually be done as a day trip.",
      },
      {
        question: "How soon could I be back at work in Leeds after a procedure?",
        answer:
          "Many people working from home feel ready within a few days, while those in visible or client-facing roles often take around a week. Our recovery timeline explains what the scalp looks like at each stage so you can plan time off.",
      },
      {
        question: "Can I fly to Turkey from Leeds Bradford Airport?",
        answer:
          "Leeds Bradford's direct Turkey routes have varied over time, so check current schedules first. When there is no suitable direct flight, many patients fly from Manchester instead.",
      },
    ],
  },
  {
    city: "Sheffield",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Sheffield: South Yorkshire Patient Guide",
    seoTitle: "Hair Transplant Sheffield: South Yorkshire Guide",
    description:
      "Researching a hair transplant from Sheffield, Rotherham or Doncaster? How to compare South Yorkshire clinics with London, and the two rail routes south to St Pancras and King's Cross.",
    lead: "South Yorkshire patients have an unusual choice of rail routes to London depending on where they live: Sheffield and Chesterfield are on the Midland Main Line to St Pancras, while Doncaster sits on the East Coast line to King's Cross. That flexibility matters if London is on your list. This guide also covers how to approach the local market in and around Sheffield.",
    heroChips: ["Two rail routes to London", "Sheffield to St Pancras in about 2h", "Doncaster to King's Cross"],
    cards: [
      {
        title: "Choose the line that suits your postcode",
        text: "Sheffield and Chesterfield trains run to St Pancras, while Doncaster has frequent LNER services to King's Cross, next door.",
      },
      {
        title: "Leeds and Manchester widen the field",
        text: "Many South Yorkshire patients also look at clinics in Leeds or Manchester, which are both reachable within about an hour.",
      },
    ],
    travel: {
      trainTime: "around 2 hours",
      trainRoute: "Sheffield to London St Pancras International, fastest direct East Midlands Railway services",
      drivingTime: "around 3 hours",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "Two hours each way makes a day trip for a consultation easy from Sheffield. For treatment, plan a night in London so you are not starting a two-hour journey straight after several hours in the clinic chair.",
      nearbyTowns: ["Rotherham", "Barnsley", "Doncaster", "Chesterfield", "Worksop"],
    },
    sections: [
      {
        title: "Comparing options from South Yorkshire",
        body: [
          "Sheffield has local providers, and because Leeds and Manchester are each about an hour away, many patients in South Yorkshire end up comparing clinics in three cities before London even comes up. That is a wide field, so it helps to decide early what matters most to you: proximity for follow-up visits, a particular kind of procedure, or a provider you can verify thoroughly.",
          "If you are drawn to a clinic outside Sheffield, think about the follow-up visits as well as the procedure day. A clinic an hour away is easy to reach once, but a review at three months and another at a year means more trips, and that is worth factoring in alongside price.",
        ],
        bullets: [
          "Decide whether in-person follow-up matters to you before choosing a clinic further away.",
          "Ask the same questions of every clinic so the answers are comparable.",
          "Be wary of any quote that cannot tell you who will perform each stage.",
        ],
      },
      {
        title: "Which London route works from where you live",
        body: [
          "From Sheffield station, East Midlands Railway runs direct to St Pancras in around two hours, calling at Chesterfield, which suits patients in north Derbyshire. Patients in Doncaster, and many in Barnsley or Worksop, may find LNER from Doncaster to King's Cross more convenient. St Pancras and King's Cross sit side by side, so the onward journey into central London is the same from either.",
          "Rotherham and Barnsley have regular local trains into Sheffield if that works better than driving and parking. Whichever route you use, build in a margin before your appointment, as connections can slip.",
        ],
        bullets: [
          "Chesterfield is on the St Pancras line, which helps patients in north Derbyshire.",
          "Doncaster's LNER services to King's Cross are frequent and fast.",
          "St Pancras and King's Cross share an Underground station, so onward travel is identical.",
        ],
      },
    ],
    faq: [
      {
        question: "Is it quicker to get to London from Sheffield or Doncaster?",
        answer:
          "Fast LNER trains from Doncaster often reach King's Cross in under two hours, a little quicker than Sheffield to St Pancras. If you live closer to Doncaster, it is worth checking both.",
      },
      {
        question: "Should I consider clinics in Leeds or Manchester?",
        answer:
          "They are within reach and widen your choice, so it is reasonable to include them. Just count the follow-up visits in your planning, not only the procedure day.",
      },
      {
        question: "Can I do a London consultation in a day from Sheffield?",
        answer:
          "Yes. With a journey of around two hours each way, most people can travel down in the morning, attend the consultation and be home in the evening.",
      },
      {
        question: "Where would I fly from to get to Turkey?",
        answer:
          "Most Sheffield patients use Manchester Airport, which has direct Istanbul flights and is around an hour and a quarter away by road. East Midlands and Leeds Bradford are worth checking too, as their routes change.",
      },
      {
        question: "Is there anything I need to do locally after a London procedure?",
        answer:
          "Mostly it is following the clinic's washing and sleeping instructions carefully at home. Ask how check-ins work: many clinics use photo updates and video calls in the early weeks, with in-person reviews later on.",
      },
    ],
  },
  {
    city: "Bradford",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Bradford: Airedale, Calderdale and London Options",
    seoTitle: "Hair Transplant Bradford: Local and London Options",
    description:
      "Bradford, Keighley and Halifax patients can look locally, in Leeds or in London. Direct Grand Central trains, the Leeds alternative and what to check before you book.",
    lead: "Living in Bradford often means your shortlist overlaps heavily with Leeds, which is only about twenty minutes away by train. What makes Bradford different is how you get to London: there are direct trains from Bradford Interchange, so you do not always have to go via Leeds. This guide covers both the local picture and the London journey from Bradford, Airedale and Calderdale.",
    heroChips: ["Bradford and Leeds combined", "Direct trains from Interchange", "Airedale and Calderdale"],
    cards: [
      {
        title: "Leeds is effectively next door",
        text: "With Leeds around twenty minutes away, most Bradford patients treat the two cities as one market when they compare clinics.",
      },
      {
        title: "Grand Central runs direct to London",
        text: "Direct services from Bradford Interchange, calling at Halifax, mean Calderdale patients can also reach King's Cross without changing.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 45 minutes to 3 hours",
      trainRoute: "Bradford Interchange to London King's Cross, direct or changing at Leeds",
      drivingTime: "around 3 hours 50 minutes",
      drivingRoute: "M62 and M1, outside peak traffic",
      sameDayReturnNote:
        "At close to three hours each way, a consultation is still a workable day trip, though an early start helps. For the procedure, plan on staying in London overnight, since the combined clinic time and journey make a same-day return tiring.",
      nearbyTowns: ["Keighley", "Shipley", "Bingley", "Halifax", "Ilkley"],
    },
    sections: [
      {
        title: "Looking at Bradford and Leeds together",
        body: [
          "Because Leeds is so close, many Bradford patients end up comparing clinics in both cities. That makes sense, since the journey is short, but it is worth thinking about follow-up visits as well as the procedure day, and about how easy it is for you to get to each clinic from where you actually live.",
          "For patients in Keighley, Bingley or Ilkley, the Airedale and Wharfedale lines into Leeds or Bradford Forster Square can make either city straightforward. For Halifax, Bradford is usually the closer option. Wherever you look, the same checks apply: the named doctor, the provider's registration and a written breakdown of what is included.",
        ],
        bullets: [
          "Compare Bradford and Leeds clinics side by side, using the same questions for each.",
          "Consider how you will get to follow-up visits, not just the first appointment.",
          "Ask for a written quote that lists what is included and what is extra.",
        ],
      },
      {
        title: "Getting to London from Bradford and Halifax",
        body: [
          "Grand Central operates direct trains from Bradford Interchange to King's Cross, calling at Halifax and other towns along the way, a handful of times a day. When those times do not suit, the alternative is a short hop into Leeds and an LNER service from there, which runs much more often.",
          "Both routes end at King's Cross, which has six Underground lines, so the last part of the trip into central London is usually quick. Check the timetable for your date and leave plenty of slack, particularly if you are relying on a connection at Leeds.",
        ],
        bullets: [
          "Direct trains from Bradford Interchange are less frequent, so plan around their times.",
          "Changing at Leeds gives more options throughout the day.",
          "Halifax patients can join the direct service without going into Bradford first.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need to go to Leeds to catch a train to London?",
        answer:
          "Not always. Grand Central runs direct services from Bradford Interchange to King's Cross a few times a day. If those do not fit your appointment, going via Leeds gives you far more departures.",
      },
      {
        question: "Is it worth choosing a Leeds clinic over one in Bradford?",
        answer:
          "Only if it is the stronger option for you. Location within West Yorkshire matters less than the doctor, the regulation and the aftercare, so compare those first and treat the extra twenty minutes as a minor factor.",
      },
      {
        question: "Can patients in Keighley or Ilkley reach London easily?",
        answer:
          "Yes, though it takes longer. Local trains run into Leeds, where you can pick up an LNER service to King's Cross. A consultation is still possible as a day trip if you start early.",
      },
      {
        question: "Which airport would I use for Turkey from Bradford?",
        answer:
          "Leeds Bradford is the nearest, but its direct Turkey routes have changed over time, so check current schedules. Manchester Airport, which has direct Istanbul flights, is the usual alternative.",
      },
      {
        question: "How long should I plan to stay in London for the procedure?",
        answer:
          "Most patients from Bradford stay one night after treatment, and some also travel down the evening before so they are not on an early train on the day itself.",
      },
    ],
  },
  {
    city: "York",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant York: Comparing Local, Leeds and London Options",
    seoTitle: "Hair Transplant York: Cost, Leeds or London",
    description:
      `What a hair transplant costs from York, and how North Yorkshire patients can compare Leeds, local and London options using the fast East Coast line.`,
    lead: "York does not have the size of Leeds, so many patients here look at clinics a short train ride away. What York does have is a fast, frequent line to London, which often makes King's Cross quicker to reach than people assume. This guide covers how to build a realistic shortlist from York and the surrounding area.",
    heroChips: ["On the East Coast Main Line", "London in under two hours", "Leeds around 25 minutes"],
    cards: [
      {
        title: "London is closer than it looks",
        text: "Fast trains from York reach King's Cross in under two hours, quicker than from many cities nearer to London on the map.",
      },
      {
        title: "Leeds is the nearby comparison",
        text: "Most York patients who look beyond the city start with Leeds, which is around 25 minutes away by train.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 50 minutes",
      trainRoute: "York to London King's Cross, fastest direct LNER services",
      drivingTime: "around 4 hours",
      drivingRoute: "A1(M), outside peak traffic",
      sameDayReturnNote:
        "Frequent fast trains make a London consultation an easy day out from York. For treatment, many patients still stay a night, since the procedure takes most of the day, though the journey home the next morning is short.",
      nearbyTowns: ["Selby", "Malton", "Tadcaster", "Pocklington", "Easingwold", "Thirsk"],
    },
    sections: [
      {
        title: "Where York patients tend to look",
        body: [
          "York has a smaller local market than Leeds, so it is common for patients here to include Leeds clinics in their research. The trip is short, but it is worth thinking about how often you would need to return for reviews, and whether that is easier in Leeds or London given York's rail links.",
          "Patients in more rural parts of North Yorkshire, such as around Malton or Thirsk, may find that the journey to London via York is not much harder than reaching Leeds. That changes the calculation, because a London consultation becomes a realistic option rather than a long trek.",
        ],
        bullets: [
          "Include Leeds clinics in your research, but count the follow-up trips.",
          "For rural North Yorkshire, compare the full journey to Leeds and to London.",
          "Ask every option how they handle reviews for patients who do not live nearby.",
        ],
      },
      {
        title: "Making the most of the East Coast line",
        body: [
          "LNER runs fast, frequent trains from York to King's Cross, and Grand Central services also call at York. Selby has direct Hull Trains services to King's Cross, which can suit patients on that side. Malton and Thirsk have trains into York for onward connections.",
          "Arriving at King's Cross puts you on six Underground lines, so the trip into central London tends to be quick. Choose a return that does not leave you rushing out of the appointment.",
        ],
        bullets: [
          "Selby's Hull Trains service offers another route to King's Cross.",
          "Grand Central and LNER both run between York and London.",
          "Advance tickets on this line can be considerably cheaper than buying on the day.",
        ],
      },
    ],
    faq: [
      {
        question: "What does a hair transplant cost for a York patient?",
        answer:
          `Clinics in York and Leeds often quote per graft, which makes their figures hard to line up. Our fixed London price starts at ${formatPrice(hairBase.fue)} for Sapphire FUE up to ${formatGrafts(hairBase.maxGrafts)} grafts and is ${formatPrice(hairLarge.fue)} up to ${formatGrafts(hairLarge.maxGrafts)}, and which band applies is only settled once your donor area has been assessed. LNER fares to King's Cross change a lot with the time of day, so price the journey before deciding which option works out cheaper.`,
      },
      {
        question: "Is London really under two hours from York?",
        answer:
          "Fast direct LNER services take around an hour and fifty minutes to King's Cross, though some stopping trains take longer. Check the specific train when you book.",
      },
      {
        question: "Should I choose Leeds over London because it is closer?",
        answer:
          "Not necessarily. From York, the difference in travel time is smaller than you might expect. Compare the providers on their standards and aftercare first, then factor in the journeys.",
      },
      {
        question: "Can I get to London from Malton or Thirsk?",
        answer:
          "Yes. Trains run from both into York, where you can connect to a direct service to King's Cross. Thirsk also has some through services to London, so check the timetable for your date.",
      },
      {
        question: "Which airport is best for Turkey from York?",
        answer:
          "Leeds Bradford is the nearest, though its Turkey routes have varied. Manchester Airport, which has direct Istanbul flights, is the usual alternative if nothing suitable is running from Leeds Bradford.",
      },
      {
        question: "Do I need to stay in London after treatment?",
        answer:
          "Most patients choose to stay one night, but because York is under two hours away, the next morning's journey is short. Ask the clinic what they recommend for your case.",
      },
    ],
  },
];
