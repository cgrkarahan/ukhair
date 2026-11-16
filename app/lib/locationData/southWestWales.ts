import { formatGrafts, formatPrice, getPackage } from "@/app/lib/pricing";
import type { LocationInput } from "./types";

const updatedAt = "2026-11-16";

/** Published London prices, read from pricing.ts so a price change lands here too. */
const [hairBase, hairLarge] = getPackage("hair").tiers;

export const southWestWalesLocations: LocationInput[] = [
  {
    city: "Bristol",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Bristol: A South West Patient Guide",
    seoTitle: "Hair Transplant Bristol: Cost, Aftercare and Travel",
    description:
      `Hair transplant costs and aftercare for Bristol patients: comparing South West clinics with London, and using Temple Meads or Parkway for Paddington.`,
    lead: "Bristol is the main city in the South West, so patients from Bath, Weston-super-Mare and beyond often look here first. London is under two hours by train, with a choice of two Bristol stations. This guide covers how to compare local and London options, and which station suits which part of the city.",
    heroChips: ["Temple Meads or Parkway", "Under two hours to Paddington", "South West's main market"],
    cards: [
      {
        title: "Two stations for London",
        text: "Temple Meads serves the centre and south, while Bristol Parkway is often quicker for north Bristol and South Gloucestershire.",
      },
      {
        title: "The regional centre",
        text: "Patients from across the South West research Bristol clinics, so the local market is busier than the city alone would suggest.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 40 minutes",
      trainRoute: "Bristol Temple Meads to London Paddington, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A consultation is a comfortable day trip from Bristol. For the procedure, a night in London lets you travel home rested the next morning, though some patients do return the same evening.",
      nearbyTowns: ["Weston-super-Mare", "Clevedon", "Portishead", "Keynsham", "Thornbury"],
    },
    sections: [
      {
        title: "Bristol's role in the South West market",
        body: [
          "Bristol draws patients from much of the South West, so there is a range of providers here, from independent practices to branches of national groups. That variety means quotes can look very different, even for similar plans.",
          "Ask each clinic the same core questions: the named doctor, the provider's CQC registration, how your graft range was assessed and what follow-up is included. Doing this for a London partner as well puts every option on the same footing.",
        ],
        bullets: [
          "Ask whether the doctor performing the procedure is based locally or visits.",
          "Get a written list of what is included in each quote.",
          "Check the CQC register for every provider.",
        ],
      },
      {
        title: "Temple Meads, Parkway and the M4",
        body: [
          "Great Western Railway runs direct from Temple Meads to Paddington in around an hour and forty minutes. Bristol Parkway, in the north of the city, has fast services too and is often easier for Thornbury and South Gloucestershire. Weston-super-Mare and Keynsham have trains via Temple Meads.",
          "At Paddington you can take the Elizabeth line, Bakerloo, Circle or District lines, so onward travel is quick. Ask the clinic for directions from Paddington when you book.",
        ],
        bullets: [
          "Bristol Parkway is often quicker for north Bristol.",
          "The Elizabeth line from Paddington runs straight across central London.",
          "Book ahead for better fares on this route.",
        ],
      },
    ],
    faq: [
      {
        question: "How much should a Bristol patient budget for a hair transplant?",
        answer:
          `Bristol clinics price in different ways, so compare written quotes on the graft range and the follow-up included rather than the headline figure. Our London package starts at ${formatPrice(hairBase.fue)} for Sapphire FUE up to ${formatGrafts(hairBase.maxGrafts)} grafts, or ${formatPrice(hairBase.dhi)} with DHI, and includes post-operative medication and an aftercare pack. Add your Temple Meads or Parkway fare to see the full London cost.`,
      },
      {
        question: "What aftercare will I get once I am back in Bristol?",
        answer:
          `That depends on the clinic, so ask before you book. Most of the first fortnight happens at home: following the washing and sleeping instructions, protecting the treated area and not picking at scabs. A good provider gives you a named contact, a way to send photos and dates for later reviews. If you are treated in London, check which of those reviews can be done remotely from Bristol.`,
      },
      {
        question: "Should I travel from Temple Meads or Bristol Parkway?",
        answer:
          "It depends where you live. Parkway is often more convenient for north Bristol and South Gloucestershire, while Temple Meads suits the centre and south. Both have direct trains to Paddington.",
      },
      {
        question: "How long is the train from Bristol to London?",
        answer:
          "The fastest direct trains from Temple Meads to Paddington take around an hour and forty minutes.",
      },
      {
        question: "Can I go home to Bristol on the day of treatment?",
        answer:
          "Some patients do. Many prefer a night in London after the procedure so the journey home is less tiring.",
      },
      {
        question: "Are Bath clinics worth comparing too?",
        answer:
          "If they are convenient for you, yes. Bath is around fifteen minutes away by train. Compare them on the same terms as Bristol and London options.",
      },
      {
        question: "Where would I fly from for Turkey?",
        answer:
          "Bristol Airport's Turkey flights have mostly been seasonal holiday routes rather than Istanbul, so many Bristol patients fly from Heathrow, which has direct Istanbul flights.",
      },
    ],
  },
  {
    city: "Bath",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt: "2026-11-16",
    title: "Hair Transplant Bath: Comparing Bath, Bristol and London",
    seoTitle: "Hair Transplant Bath: Bath, Bristol and London",
    description:
      "Bath patients can look locally, in Bristol or in London. How to compare the three, and how Bath Spa and Chippenham link to Paddington.",
    lead: "Bath is a smaller city, so many patients here look at Bristol clinics, about fifteen minutes away, as well as local ones. London is under an hour and a half from Bath Spa. That gives you three realistic options, and this guide explains how to compare them fairly.",
    heroChips: ["Bristol 15 minutes away", "Bath Spa to Paddington", "Wiltshire connections"],
    cards: [
      {
        title: "Bristol is part of the picture",
        text: "Most Bath patients include Bristol clinics in their research, since the journey is so short.",
      },
      {
        title: "A direct line to London",
        text: "Fast trains from Bath Spa reach Paddington in around an hour and twenty-five minutes.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 25 minutes",
      trainRoute: "Bath Spa to London Paddington, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A consultation is easy to do in a day from Bath. For the procedure, some patients go home the same evening, while others stay one night in London.",
      nearbyTowns: ["Frome", "Trowbridge", "Bradford-on-Avon", "Chippenham", "Radstock", "Midsomer Norton"],
    },
    sections: [
      {
        title: "Weighing Bath, Bristol and London",
        body: [
          "With Bristol so close, many Bath patients compare clinics in both cities. London, under an hour and a half away, fits into that comparison too. The aim is to make sure each option is judged on the same terms.",
          "Ask each provider for the doctor's name, their CQC registration, how they reached your graft estimate and what follow-up is included. With those answers side by side, the choice becomes clearer.",
        ],
        bullets: [
          "Treat Bath, Bristol and London as one shortlist.",
          "Ask each the same questions, in writing.",
          "Think about how easy follow-up visits would be for each.",
        ],
      },
      {
        title: "Getting to London from Bath and west Wiltshire",
        body: [
          "Great Western Railway runs direct from Bath Spa to Paddington, calling at Chippenham. Patients in Trowbridge, Frome and Bradford-on-Avon can take local trains, and Westbury has its own services towards London via Reading.",
          "Radstock and Midsomer Norton do not have stations, so patients there usually drive or take a bus into Bath.",
        ],
        bullets: [
          "Chippenham is on the direct line to Paddington.",
          "Westbury offers another route for patients in west Wiltshire.",
          "Allow time for the journey into Bath if you are coming from the south.",
        ],
      },
      {
        title: "Getting to Bath Spa without the parking hunt",
        body: [
          "Parking near Bath Spa station is limited and the city centre is busy, so patients driving in from Frome, Radstock or the Wiltshire villages often find Bath's park and ride sites, followed by a bus into the centre, less stressful than looking for a space. On the day of a procedure, it is worth arranging for someone to collect you from the station on the way back instead.",
          "If you are comparing a Bristol clinic, the train between Bath Spa and Temple Meads is quick and frequent, which can make follow-up visits there simpler than driving.",
        ],
        bullets: [
          "Consider park and ride rather than parking near the station.",
          "Arrange a lift home from Bath Spa after a procedure.",
          "Use the train for Bristol follow-ups to avoid city traffic.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I look at Bristol clinics if I live in Bath?",
        answer:
          "It is worth including them, as Bristol is only around fifteen minutes away. Compare them on the same terms as Bath and London options.",
      },
      {
        question: "How long is the train from Bath to London?",
        answer:
          "The fastest direct trains from Bath Spa to Paddington take around an hour and twenty-five minutes.",
      },
      {
        question: "Can I get to London from Trowbridge or Frome?",
        answer:
          "Yes. Local trains connect to Bath Spa or Westbury, where you can pick up services to London.",
      },
      {
        question: "Do I need to stay in London after treatment?",
        answer:
          "Some Bath patients travel home the same evening, while others prefer one night in London. Ask the clinic what suits your plan.",
      },
      {
        question: "Which airport is best for Turkey from Bath?",
        answer:
          "Bristol Airport is nearest but has mostly offered holiday routes rather than Istanbul flights, so many Bath patients fly from Heathrow, which has direct Istanbul flights.",
      },
    ],
  },
  {
    city: "Exeter",
    nation: "england",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Exeter: A Devon Patient Guide",
    seoTitle: "Hair Transplant Exeter: Cost and Devon Travel Guide",
    description:
      `Hair transplant costs from Exeter, with London packages from ${formatPrice(hairBase.fue)}. How Devon patients compare local, Bristol and London options and plan follow-up.`,
    lead: "Devon is a long way from most of the UK's larger hair transplant markets, so patients in Exeter and the surrounding area often weigh up whether to look locally, travel to Bristol or go to London. The direct train from Exeter St Davids makes London possible in around two hours. This guide covers how to plan it.",
    heroChips: ["About two hours to Paddington", "Bristol as a middle option", "Remote follow-up planning"],
    cards: [
      {
        title: "Two lines to London",
        text: "GWR runs fast to Paddington, and South Western Railway runs a slower route to Waterloo via Salisbury.",
      },
      {
        title: "Follow-up needs planning",
        text: "From Devon, ask any distant clinic exactly how reviews work without you travelling back each time.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 5 minutes",
      trainRoute: "Exeter St Davids to London Paddington, fastest direct services",
      drivingTime: "around 3 hours 15 minutes",
      drivingRoute: "M5 and M4, or the A303, outside peak traffic",
      sameDayReturnNote:
        "A consultation is possible as a day trip from Exeter, though it is a long day, so a video consultation first is sensible. For the procedure, plan at least one night in London.",
      nearbyTowns: ["Exmouth", "Newton Abbot", "Tiverton", "Crediton", "Honiton", "Torquay"],
    },
    sections: [
      {
        title: "Local, Bristol or London from Devon",
        body: [
          "Exeter has a smaller local market than the larger cities, so many Devon patients also look at Bristol, around an hour away by train, or London. Each step further means more travel for the procedure and for follow-up, which is worth weighing carefully.",
          "Start with a remote consultation where possible. Ask each option for the doctor's name, their CQC registration, how they assessed your graft range and exactly how follow-up works for patients in Devon.",
        ],
        bullets: [
          "Use video consultations to narrow your choice before travelling.",
          "Ask distant clinics how they handle reviews remotely.",
          "Include travel and accommodation in any comparison.",
        ],
      },
      {
        title: "Rail routes from Exeter and the rest of Devon",
        body: [
          "Great Western Railway runs direct from Exeter St Davids to Paddington in around two hours. Tiverton Parkway and Newton Abbot are on the same main line, and some trains from Torquay run direct to London. Honiton is on the South Western Railway route to Waterloo, which is slower but can suit patients in east Devon.",
          "Exmouth and Crediton have local trains into Exeter for connections.",
        ],
        bullets: [
          "Tiverton Parkway and Newton Abbot are on the fast line to London.",
          "Honiton has a direct, slower route to Waterloo.",
          "Book ahead for the best fares on long-distance trains.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does a hair transplant cost from Exeter?",
        answer:
          `Devon is a long way from the bigger hair transplant markets, so local quotes can be hard to benchmark. Our London price for up to ${formatGrafts(hairBase.maxGrafts)} grafts is ${formatPrice(hairBase.fue)} with Sapphire FUE or ${formatPrice(hairBase.dhi)} with DHI, and up to ${formatGrafts(hairLarge.maxGrafts)} grafts it is ${formatPrice(hairLarge.fue)} or ${formatPrice(hairLarge.dhi)}. From Exeter most patients also need a night in London and a return fare from St Davids, so include both before comparing.`,
      },
      {
        question: "How long does it take to get from Exeter to London?",
        answer:
          "The fastest direct trains from Exeter St Davids to Paddington take around two hours. South Western Railway's route to Waterloo takes longer.",
      },
      {
        question: "Should I consider Bristol clinics?",
        answer:
          "Bristol is a reasonable middle option, around an hour away by train. Compare it on the same terms as local and London options.",
      },
      {
        question: "Can I do a consultation without travelling?",
        answer:
          "Yes. A video consultation can cover suitability and a provisional plan, so you only travel once you are confident.",
      },
      {
        question: "How many nights should I plan in London?",
        answer:
          "At least one after the procedure. Some Devon patients also travel the day before to avoid an early start.",
      },
      {
        question: "Where would I fly from for Turkey?",
        answer:
          "Exeter Airport's Turkey flights have mostly been holiday routes, so many Devon patients fly from Bristol or Heathrow. Heathrow has direct Istanbul flights.",
      },
    ],
  },
  {
    city: "Cardiff",
    nation: "wales",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Cardiff: A South Wales Patient Guide",
    seoTitle: "Hair Transplant Cardiff: South Wales Patient Guide",
    description:
      "How Cardiff and South Wales patients can check clinics with Healthcare Inspectorate Wales, compare them with Bristol and London, and plan the trip to Paddington.",
    lead: "Cardiff is the main centre for hair transplant research in South Wales. Regulation works differently in Wales, which affects how you check a local clinic. London is around two hours by train, and Bristol is closer still. This guide covers how to compare all three.",
    heroChips: ["Healthcare Inspectorate Wales", "About two hours to Paddington", "Bristol across the Severn"],
    cards: [
      {
        title: "Welsh regulation is different",
        text: "Independent healthcare in Wales is overseen by Healthcare Inspectorate Wales, not the CQC, so check the right register.",
      },
      {
        title: "Bristol is close by",
        text: "Many Cardiff patients also look at Bristol clinics, which are under an hour away by train.",
      },
    ],
    travel: {
      trainTime: "around 2 hours",
      trainRoute: "Cardiff Central to London Paddington, fastest direct services",
      drivingTime: "around 3 hours",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A consultation is a manageable day trip from Cardiff. For the procedure, most patients stay a night in London before travelling home.",
      nearbyTowns: ["Newport", "Barry", "Penarth", "Caerphilly", "Pontypridd", "Bridgend"],
    },
    sections: [
      {
        title: "Checking a clinic in Wales",
        body: [
          "Cardiff has local providers, and patients from the Valleys, the Vale of Glamorgan and Newport often look here first. Healthcare Inspectorate Wales is the body that oversees independent healthcare in Wales, so a Cardiff clinic's registration will look different from an English one. Ask the clinic for its registration details and look them up yourself.",
          "If you also look at Bristol or London, those clinics will be registered with the CQC instead. Ask every option the same questions about the doctor, the graft estimate and follow-up, so you can compare them fairly.",
        ],
        bullets: [
          "Check Welsh clinics with Healthcare Inspectorate Wales.",
          "Check English clinics, including in Bristol and London, on the CQC register.",
          "Ask every provider for the doctor's name.",
        ],
      },
      {
        title: "Getting to London from South Wales",
        body: [
          "Great Western Railway runs direct from Cardiff Central to Paddington, calling at Newport and Bristol Parkway. The Valleys lines bring Pontypridd, Caerphilly, Barry and Penarth into Cardiff. Bridgend has direct trains towards London too.",
          "At Paddington, the Elizabeth line and several Underground lines give quick onward links.",
        ],
        bullets: [
          "Newport is on the direct line, which can save time for patients in the east.",
          "Valleys line trains connect with London services at Cardiff Central.",
          "Book ahead for the best fares.",
        ],
      },
      {
        title: "Crossing the Severn for a Bristol or London option",
        body: [
          "Since the Severn crossing tolls were removed, driving from Cardiff or Newport to Bristol has become a simpler day trip, and many South Wales patients now treat Bristol clinics as part of their local field. The trade-off is that each review appointment means another crossing, so ask how many in-person checks are included and whether early ones can be done by photo.",
          "When a Cardiff quote and an English quote sit side by side, the registration details will look different because the regulators differ. That is expected. What should not differ is the clarity of the answers: who operates, what is included and who you contact if something worries you in the first fortnight.",
        ],
        bullets: [
          "Count the Severn crossings for follow-up, not just for the procedure.",
          "Expect different regulator details on Welsh and English quotes.",
          "Insist on a named contact for the first two weeks after treatment.",
        ],
      },
    ],
    faq: [
      {
        question: "Who regulates hair transplant clinics in Cardiff?",
        answer:
          "Independent healthcare in Wales is overseen by Healthcare Inspectorate Wales, not the CQC. Ask the clinic how it is registered and check the doctor on the GMC register.",
      },
      {
        question: "Should I look at Bristol clinics as well?",
        answer:
          "Many Cardiff patients do, as Bristol is under an hour away. Remember those clinics are regulated by the CQC.",
      },
      {
        question: "How long is the train from Cardiff to London?",
        answer:
          "The fastest direct trains from Cardiff Central to Paddington take around two hours.",
      },
      {
        question: "Can I board the London train at Newport?",
        answer:
          "Yes. Newport is on the direct line to Paddington, which can be more convenient for patients east of Cardiff.",
      },
      {
        question: "Where would I fly from for Turkey?",
        answer:
          "Cardiff Airport's international schedule is limited, so most South Wales patients fly from Heathrow, Bristol or Birmingham. Heathrow has direct Istanbul flights.",
      },
    ],
  },
  {
    city: "Swansea",
    nation: "wales",
    publishedAt: "2026-09-26",
    updatedAt,
    title: "Hair Transplant Swansea: West Wales Patient Guide",
    seoTitle: "Hair Transplant Swansea: Cost and West Wales Guide",
    description:
      `For Swansea, Neath and Llanelli patients: hair transplant costs, checking Welsh clinics, comparing Cardiff with London, and the direct train to Paddington.`,
    lead: "Swansea patients often look at clinics in Cardiff as well as locally, and London is a direct train away, though a longer one than from Cardiff. Regulation in Wales works differently from England, which matters when checking a clinic. This guide covers how to approach it from West Wales.",
    heroChips: ["Direct trains to Paddington", "Cardiff as an alternative", "Welsh registration checks"],
    cards: [
      {
        title: "Cardiff widens the choice",
        text: "With Cardiff under an hour away, many Swansea patients compare clinics in both cities.",
      },
      {
        title: "A long but direct trip",
        text: "Direct trains to Paddington take close to three hours, so London needs a clear reason.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 50 minutes",
      trainRoute: "Swansea to London Paddington, fastest direct services",
      drivingTime: "around 3 hours 45 minutes",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A consultation is possible in a day from Swansea, but it is a long one, so start with a video consultation. For the procedure, plan at least one night in London.",
      nearbyTowns: ["Neath", "Port Talbot", "Llanelli", "Gorseinon", "Carmarthen"],
    },
    sections: [
      {
        title: "Swansea and Cardiff options",
        body: [
          "Swansea has its own providers, and plenty of patients from Llanelli to Bridgend also weigh up Cardiff. Because Welsh clinics answer to a different inspectorate from English ones, confirm with each provider which body it is registered with, and look that up yourself before paying a deposit.",
          "If London is on your list, remember it is a longer journey from Swansea than from Cardiff. Use a video consultation to decide whether the trip is worthwhile.",
        ],
        bullets: [
          "Confirm which inspectorate each clinic is registered with.",
          "Compare Swansea and Cardiff clinics on the same terms.",
          "Use a remote consultation before committing to London.",
        ],
      },
      {
        title: "The rail route east",
        body: [
          "Great Western Railway runs direct from Swansea to Paddington, calling at Neath, Port Talbot Parkway and Bridgend. Llanelli has trains into Swansea, and some services from Carmarthen run direct to London.",
          "Allow a buffer when planning appointments, as it is a long journey.",
        ],
        bullets: [
          "Neath and Port Talbot Parkway are on the direct line.",
          "Some trains from Carmarthen run through to Paddington.",
          "Book advance tickets for long journeys.",
        ],
      },
      {
        title: "A realistic timeline from West Wales",
        body: [
          "From Swansea, the London route works best as a planned sequence rather than a single trip. Start with a video consultation and clear photos of your donor and thinning areas. If the plan and written quote make sense, book the procedure with two nights in London, one either side, so neither journey is rushed.",
          "Once you are home, the first fortnight is mostly about washing and sleeping as instructed, with photo check-ins if the clinic offers them. Later reviews, often at a few months and around a year, are where you need to decide in advance whether you will travel back or rely on remote assessment.",
        ],
        bullets: [
          "Use a video consultation to decide whether the journey is worth it.",
          "Book two nights in London around the procedure.",
          "Agree how later reviews will work before you pay a deposit.",
        ],
      },
    ],
    faq: [
      {
        question: "What does a hair transplant cost for someone in Swansea?",
        answer:
          `Welsh clinics, including those in Cardiff, set their own prices, so ask for the graft range and the follow-up plan in writing. Our London packages start at ${formatPrice(hairBase.fue)} for Sapphire FUE up to ${formatGrafts(hairBase.maxGrafts)} grafts and include post-operative medication and one PRP session. The train from Swansea to Paddington is a long one, so build an overnight stay into the London figure.`,
      },
      {
        question: "Is a Swansea clinic checked by the same body as a London one?",
        answer:
          "No. Welsh independent healthcare falls under Healthcare Inspectorate Wales, while London providers sit on the Care Quality Commission's register. Use the right one for each clinic on your list.",
      },
      {
        question: "Is Cardiff a better option than London from Swansea?",
        answer:
          "It is closer, so it is worth including. Compare the providers on standards and aftercare rather than distance alone.",
      },
      {
        question: "What is the journey time from Swansea to Paddington?",
        answer:
          "Direct trains to Paddington take around two hours and fifty minutes on the fastest services.",
      },
      {
        question: "Can I get to London from Llanelli or Carmarthen?",
        answer:
          "Yes. Llanelli has trains into Swansea for connections, and some Carmarthen services run direct to Paddington.",
      },
      {
        question: "Where would I fly from for Turkey?",
        answer:
          "Most Swansea patients fly from Heathrow, which has direct Istanbul flights, or from Bristol or Cardiff if a suitable route is running.",
      },
    ],
  },
];
