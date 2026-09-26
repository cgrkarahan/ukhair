import type { TopicCard, TopicSection } from "@/app/lib/siteContent";

export type Nation = "england" | "scotland" | "wales";

export type LocationTravelInfo = {
  trainTime: string;
  trainRoute: string;
  drivingTime: string;
  drivingRoute: string;
  flightTime?: string;
  flightRoute?: string;
  sameDayReturnNote: string;
  nearbyTowns: string[];
};

/**
 * City-specific inputs only. Sections and FAQs that apply to every city are
 * generated in `locations.ts`, so each entry here should carry genuinely local
 * detail. Never list a town in `nearbyTowns` that has its own page.
 */
export type LocationInput = {
  city: string;
  nation: Nation;
  /** Completes "advertising is heavy on social media …", e.g. "across the North West". */
  regionPhrase: string;
  /** ISO date (YYYY-MM-DD) the page was genuinely first published. */
  publishedAt: string;
  lead: string;
  heroChips: string[];
  cards: [TopicCard, TopicCard];
  travel: LocationTravelInfo;
  localMarket: TopicSection;
  londonRoute: TopicSection;
  turkey: { airport: string; airportBullet: string };
  answers: {
    clinic: string;
    howLong: string;
    overnight: string;
    worthIt: string;
    travelCost: string;
    /** Opening of the Turkey answer; a shared sentence on the trade-off is appended. */
    turkey: string;
  };
};

export const locationInputs: LocationInput[] = [
  {
    city: "Manchester",
    nation: "england",
    regionPhrase: "across the North West",
    publishedAt: "2026-09-24",
    lead: "If you are based in or around Manchester and researching a hair transplant, you generally have two routes: book with a local or regional clinic, or travel for a consultation and treatment. This page sets out what changes between the two, what to check regardless of where you book, and realistic journey times if London is on your shortlist.",
    heroChips: ["Local vs London compared", "Same-day travel times", "What to check before booking"],
    cards: [
      {
        title: "Manchester has local options",
        text: "Independent clinics and franchise outposts operate in and around Manchester. Availability is not the issue: consistency of standards is.",
      },
      {
        title: "Travel is a real trade-off",
        text: "London adds a journey, but for some patients it also means broader clinical oversight and a curated route rather than a single local option.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 10 minutes",
      trainRoute: "Manchester Piccadilly to London Euston, fastest direct services",
      drivingTime: "around 3 hours 40 minutes",
      drivingRoute: "M6 and M1, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for a consultation, since a morning train gets you into London in time for an afternoon appointment and back the same evening. Treatment day is different: most patients travelling from Manchester for the procedure itself choose to stay overnight, because the appointment runs several hours and a rushed journey straight afterwards is not a sensible way to start recovery.",
      nearbyTowns: ["Salford", "Stockport", "Bolton", "Oldham", "Wigan", "Bury"],
    },
    localMarket: {
      title: "The hair transplant market for Manchester patients",
      body: [
        "Greater Manchester has a reasonable spread of clinics offering hair transplant procedures, from independent single-surgeon practices to outposts of larger regional and national providers. That means availability is rarely the problem for patients starting their research here.",
        "What varies far more than availability is standard: who actually performs the procedure, how the clinic is regulated, what the quote includes, and what happens if something about your case is more complicated than expected. Two Manchester clinics offering the same headline price can differ substantially on all of those points.",
      ],
      bullets: [
        "A local option removes most of the travel question, but does not remove the need to check standards.",
        "Franchise clinics with a Manchester address are not always operated the same way as a single-site independent practice.",
        "Price alone tells you very little about which is the stronger option.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Manchester",
      body: [
        "Choosing London is not really a location decision on its own. For some Manchester-based patients it means access to a wider curated network and a consultation process built around comparison rather than a single clinic's own sales pitch. For others, a strong local option already covers what matters to them and the extra journey is not worth it.",
        "If you do travel, plan around the two different appointment types. A consultation is a short, comfortable same-day trip. Treatment day is longer and more physically demanding, so factor in an overnight stay, and check what the clinic's aftercare model looks like once you are back in Manchester: video follow-up, phone contact, or written guidance you can act on locally.",
      ],
      bullets: [
        "Consultations are realistic as a same-day trip from Manchester Piccadilly.",
        "Treatment day usually benefits from an overnight stay rather than a same-day return.",
        "Ask specifically how aftercare works once you are back home, not just on the day itself.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Manchester Airport has direct flights to Istanbul, typically taking around four hours, which is why Turkey features heavily in what Manchester patients see advertised.",
      airportBullet: "Manchester Airport has direct flights to Istanbul, typically around four hours.",
    },
    answers: {
      clinic:
        "Yes. Manchester and the surrounding boroughs have a number of independent and franchise clinics offering hair transplant procedures. The presence of a local clinic does not tell you whether it meets a strong standard, which is why the same checks apply regardless of location.",
      howLong:
        "By train from Manchester Piccadilly to London Euston, the fastest direct services take around 2 hours 10 minutes. Driving typically takes around 3 hours 40 minutes on the M6 and M1 outside peak traffic. Both make a same-day consultation trip realistic.",
      overnight:
        "Most patients travelling from Manchester for the treatment day itself choose to stay overnight, since the appointment runs several hours and starting a long journey straight afterwards is not ideal for recovery. A same-day round trip is more realistic for a consultation than for treatment day.",
      worthIt:
        "It depends what you are optimising for. If a Manchester clinic meets the same standards you would check for anywhere, a local booking removes the travel question entirely. Patients who travel usually do so for access to a curated, compared set of options rather than a single local clinic's own recommendation.",
      travelCost:
        "Train fares between Manchester and London vary by how far ahead you book and whether you travel at peak times, and an overnight stay for treatment day adds a hotel cost on top. Factor this into your comparison against a local quote, since it is a genuine part of the decision, not a minor detail.",
      turkey:
        "Yes, and Manchester Airport's direct Istanbul route makes this a genuine third option alongside a local clinic or London.",
    },
  },
  {
    city: "Birmingham",
    nation: "england",
    regionPhrase: "across the West Midlands",
    publishedAt: "2026-09-24",
    lead: "If you are based in or around Birmingham and researching a hair transplant, the practical decision usually comes down to booking with a local or regional clinic versus travelling for a consultation and treatment. This page covers what changes between the two, what to check regardless of where you book, and how quick the journey to London actually is.",
    heroChips: ["Local vs London compared", "Fast direct rail link", "What to check before booking"],
    cards: [
      {
        title: "Birmingham has local options",
        text: "The West Midlands has a reasonable spread of independent and franchise clinics. Availability is rarely the issue: consistency of standards is.",
      },
      {
        title: "The London journey is short",
        text: "Birmingham has one of the fastest rail links to London of any major UK city, which changes the travel calculation compared with further-north cities.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 25 minutes",
      trainRoute: "Birmingham New Street to London Euston, fastest direct services",
      drivingTime: "around 2 hours",
      drivingRoute: "M40, outside peak traffic",
      sameDayReturnNote:
        "Birmingham's short journey time makes a same-day return realistic even for treatment day, and some patients do travel down and back the same day. Even so, the procedure itself runs several hours, and a same-day return means travelling home while still recovering from the appointment, so an overnight stay is worth weighing against the extra hotel cost rather than ruling out on price alone.",
      nearbyTowns: ["Solihull", "West Bromwich", "Dudley", "Walsall", "Wolverhampton", "Sutton Coldfield"],
    },
    localMarket: {
      title: "The hair transplant market for Birmingham patients",
      body: [
        "Birmingham and the wider West Midlands have a reasonable number of clinics offering hair transplant procedures, ranging from independent single-surgeon practices to outposts of larger regional providers. Patients starting their research here are rarely short of a local option to consider.",
        "The harder question is not whether a Birmingham clinic exists, but which one meets a standard you would be comfortable with. Registration, who actually performs the procedure, and what the quote includes vary considerably between clinics offering broadly similar headline prices.",
      ],
      bullets: [
        "A local option removes most of the travel question, but does not remove the need to check standards.",
        "Some Birmingham clinics are franchise outposts of national brands rather than independently operated practices.",
        "Price alone tells you very little about which is the stronger option.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Birmingham",
      body: [
        "Birmingham's rail link to London is short enough that travel adds relatively little friction compared with cities further north. For some patients that makes a curated London route an easy comparison to make alongside a local quote, rather than a major commitment on its own.",
        "Even with a short journey, plan around the two different appointment types. A consultation is a straightforward same-day trip. Treatment day runs longer and is more physically demanding, so weigh an overnight stay against travelling home the same day, and ask what the aftercare model looks like once you are back in Birmingham.",
      ],
      bullets: [
        "Consultations are a comfortable same-day trip from Birmingham New Street.",
        "Treatment day is possible as a same-day return, but an overnight stay is worth considering against the fatigue of travelling home afterwards.",
        "Ask specifically how aftercare works once you are back home, not just on the day itself.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Birmingham Airport has direct flights to Istanbul, typically around four to four and a half hours, which is why Turkey features heavily in what Birmingham patients see advertised.",
      airportBullet:
        "Birmingham Airport has direct flights to Istanbul, typically around four to four and a half hours.",
    },
    answers: {
      clinic:
        "Yes. Birmingham and the wider West Midlands have a number of independent and franchise clinics offering hair transplant procedures. A local clinic's existence does not by itself tell you whether it meets a strong standard, which is why the same checks apply regardless of location.",
      howLong:
        "By train from Birmingham New Street to London Euston, the fastest direct services take around 1 hour 25 minutes, one of the quickest links of any major UK city. Driving typically takes around 2 hours on the M40 outside peak traffic.",
      overnight:
        "Birmingham's short journey makes a same-day return realistic even for treatment day, and some patients do it. Because the appointment itself runs several hours, an overnight stay is still worth weighing against the tiredness of travelling home the same day, rather than ruling it out purely on cost.",
      worthIt:
        "It depends what you are optimising for. If a Birmingham clinic meets the same standards you would check for anywhere, a local booking removes most of the travel question. Patients who travel usually do so for access to a curated, compared set of options rather than a single local clinic's own recommendation, and Birmingham's short journey time makes that comparison relatively low-cost to make.",
      travelCost:
        "Train fares between Birmingham and London vary by how far ahead you book and whether you travel at peak times. Given the short journey, many patients add relatively little to their overall cost even with an occasional overnight stay, but it is still worth including in any comparison against a local quote.",
      turkey:
        "Yes, and Birmingham Airport's direct Istanbul route makes this a genuine third option alongside a local clinic or London.",
    },
  },
  {
    city: "Leeds",
    nation: "england",
    regionPhrase: "across West Yorkshire",
    publishedAt: "2026-09-24",
    lead: "If you are based in or around Leeds and researching a hair transplant, you are usually weighing a local or regional clinic against travelling for a consultation and treatment. This page sets out what changes between the two, what to check regardless of where you book, and realistic journey times if London is on your shortlist.",
    heroChips: ["Local vs London compared", "Direct rail journey times", "What to check before booking"],
    cards: [
      {
        title: "Leeds has local options",
        text: "West Yorkshire has a reasonable spread of independent and franchise clinics. Availability is rarely the issue: consistency of standards is.",
      },
      {
        title: "Travel is a real trade-off",
        text: "London adds a longer journey than for some other cities, so the case for travelling needs to be worth the extra time.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 15 minutes",
      trainRoute: "Leeds to London King's Cross, fastest direct LNER services",
      drivingTime: "around 3 hours 45 minutes",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for a consultation, since a morning train gets you into London with time for an afternoon appointment and a return home the same evening. Treatment day is different: most patients travelling from Leeds for the procedure itself choose to stay overnight, since the appointment runs several hours and a long journey straight afterwards is not a sensible way to start recovery.",
      nearbyTowns: ["Wakefield", "Harrogate", "Huddersfield", "Dewsbury", "Castleford"],
    },
    localMarket: {
      title: "The hair transplant market for Leeds patients",
      body: [
        "Leeds and the wider West Yorkshire area have a number of clinics offering hair transplant procedures, from independent single-surgeon practices to outposts of larger regional and national providers. Availability is rarely the problem for patients starting their research here.",
        "What varies far more than availability is standard: who actually performs the procedure, how the clinic is regulated, what the quote includes, and what happens if your case turns out to be more complex than expected. Two Leeds clinics offering similar headline prices can differ substantially on all of those points.",
      ],
      bullets: [
        "A local option removes most of the travel question, but does not remove the need to check standards.",
        "Franchise clinics with a Leeds address are not always operated the same way as a single-site independent practice.",
        "Price alone tells you very little about which is the stronger option.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Leeds",
      body: [
        "Leeds sits further from London than some other cities on this list, so the journey is a real factor in the decision rather than an afterthought. For some patients, access to a wider curated network and a comparison-led consultation process is worth the extra travel time. For others, a strong local option already covers what matters most and the journey is not worth it.",
        "If you do travel, plan around the two different appointment types. A consultation is a manageable same-day trip. Treatment day is longer and more physically demanding, so factor in an overnight stay, and check what the clinic's aftercare model looks like once you are back in Leeds: video follow-up, phone contact, or written guidance you can act on locally.",
      ],
      bullets: [
        "Consultations are realistic as a same-day trip from Leeds station.",
        "Treatment day usually benefits from an overnight stay rather than a same-day return.",
        "Ask specifically how aftercare works once you are back home, not just on the day itself.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Leeds Bradford Airport's direct routes to Turkey have varied over time, so it is worth checking current schedules before assuming one is running. Where a direct flight is not available, a connection via Manchester, London, or another hub is the fallback, typically adding an hour or two to the overall journey. Turkey still features heavily in what Leeds patients see advertised regardless of the exact flight path.",
      airportBullet:
        "Check current Leeds Bradford Airport schedules rather than assuming a direct Istanbul route is running.",
    },
    answers: {
      clinic:
        "Yes. Leeds and the wider West Yorkshire area have a number of independent and franchise clinics offering hair transplant procedures. The presence of a local clinic does not tell you whether it meets a strong standard, which is why the same checks apply regardless of location.",
      howLong:
        "By train from Leeds to London King's Cross, the fastest direct LNER services take around 2 hours 15 minutes. Driving typically takes around 3 hours 45 minutes on the M1 outside peak traffic. Both make a same-day consultation trip realistic, if a little longer than from some other cities.",
      overnight:
        "Most patients travelling from Leeds for the treatment day itself choose to stay overnight, since the appointment runs several hours and starting a long journey straight afterwards is not ideal for recovery. A same-day round trip is more realistic for a consultation than for treatment day.",
      worthIt:
        "It depends what you are optimising for. If a Leeds clinic meets the same standards you would check for anywhere, a local booking removes the travel question entirely. Patients who travel usually do so for access to a curated, compared set of options rather than a single local clinic's own recommendation, and the longer journey from Leeds means that trade-off is worth thinking through properly rather than assuming.",
      travelCost:
        "Train fares between Leeds and London vary by how far ahead you book and whether you travel at peak times, and an overnight stay for treatment day adds a hotel cost on top. Given the longer journey than some other UK cities, it is worth including this in any comparison against a local quote rather than treating it as a minor detail.",
      turkey:
        "It depends on current schedules, since Leeds Bradford Airport's direct routes to Turkey have varied over time. Where a direct flight is not running, a connection adds an hour or two.",
    },
  },
  {
    city: "Liverpool",
    nation: "england",
    regionPhrase: "across the North West",
    publishedAt: "2026-09-26",
    lead: "If you live in Liverpool, on the Wirral, or elsewhere in Merseyside and are researching a hair transplant, the realistic choices are a clinic in the city region, a clinic in Manchester, or travelling to London for consultation and treatment. This page covers what actually differs between those routes, the checks that apply wherever you book, and how long the London journey takes from Lime Street.",
    heroChips: ["Liverpool, Manchester or London", "Lime Street journey times", "What to check before booking"],
    cards: [
      {
        title: "Manchester is part of the local market",
        text: "With Manchester under an hour away, many Liverpool patients end up comparing clinics in both cities, which widens the choice but also the number of quotes to judge.",
      },
      {
        title: "London is a longer day out",
        text: "At over two hours each way, London works well for a consultation but needs more planning for treatment day.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 15 minutes",
      trainRoute: "Liverpool Lime Street to London Euston, fastest direct services",
      drivingTime: "around 4 hours",
      drivingRoute: "M6 and M1, outside peak traffic",
      sameDayReturnNote:
        "A same-day return works for a consultation: direct trains from Lime Street reach Euston in a little over two hours, leaving a comfortable window for an appointment. For treatment day most Liverpool patients stay in London overnight, because the procedure itself runs for several hours and four or more hours of travel straight afterwards is a poor start to recovery.",
      nearbyTowns: ["Birkenhead", "Bootle", "St Helens", "Southport", "Warrington", "Widnes"],
    },
    localMarket: {
      title: "The hair transplant market for Liverpool patients",
      body: [
        "Liverpool and the wider city region have local clinics offering hair transplant surgery, but the more useful thing to understand is that the realistic local market also includes Manchester. The two cities are close enough that plenty of Merseyside patients take a train or drive east for a consultation, and clinics in both cities advertise to the same audience.",
        "That wider choice is helpful, but it also means more quotes that are hard to compare like for like. Two clinics a short drive apart can differ substantially on who actually performs the procedure, how the clinic is regulated, and what the headline price includes once aftercare and medication are accounted for.",
      ],
      bullets: [
        "Treat Liverpool and Manchester clinics as one local market when comparing.",
        "A shorter journey is useful, but it does not tell you anything about standards.",
        "Compare what each quote includes rather than the headline figures alone.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Liverpool",
      body: [
        "London makes most sense for Liverpool patients who want a comparison-led route rather than a single clinic's own recommendation, or who have not found a local option they are confident in. It is not automatically the better choice, and a strong clinic in the North West covers most of what matters for many people.",
        "If you do travel, the consultation and treatment day are very different trips. A consultation is a manageable same-day return from Lime Street. Treatment day means several hours in the clinic, so plan for a night in London and a train home the following day, and ask exactly how follow-up works once you are back on Merseyside.",
      ],
      bullets: [
        "Consultations work as a same-day return from Lime Street.",
        "Plan an overnight stay for treatment day rather than travelling straight home.",
        "Ask how remote follow-up works before you commit to a clinic outside the North West.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Liverpool John Lennon Airport's Turkey flights have mostly been seasonal holiday routes rather than Istanbul, where most Turkish hair transplant clinics are based, so many Liverpool patients fly from Manchester Airport instead, typically around an hour away by road. Check current schedules from both before planning around either.",
      airportBullet:
        "Manchester Airport, around an hour away, is usually the practical choice for Istanbul flights.",
    },
    answers: {
      clinic:
        "Yes. Liverpool and the surrounding city region have clinics offering hair transplant procedures, and Manchester's clinics are close enough to be a realistic part of the same local market. Neither location tells you whether a clinic meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Liverpool Lime Street to London Euston, the fastest direct services take around 2 hours 15 minutes. Driving usually takes around 4 hours on the M6 and M1 outside peak traffic, so the train is the more practical option for most patients.",
      overnight:
        "For treatment day, most Liverpool patients do stay overnight. The procedure runs for several hours and a journey of two hours or more straight afterwards is not ideal for recovery. A consultation, by contrast, works well as a same-day return.",
      worthIt:
        "It depends what you want from the process. If a Liverpool or Manchester clinic meets the standards you would check for anywhere, booking locally removes the travel entirely. Patients who choose London usually do so for a curated, compared set of options rather than one clinic's own recommendation.",
      travelCost:
        "Train fares from Lime Street vary considerably with how far ahead you book and whether you travel at peak times, and treatment day usually adds a night in a London hotel. Include both when comparing against a local quote, since they are a real part of the total.",
      turkey:
        "Yes, although most Liverpool patients fly from Manchester Airport, which has direct Istanbul flights, rather than from Liverpool John Lennon.",
    },
  },
  {
    city: "Sheffield",
    nation: "england",
    regionPhrase: "across South Yorkshire",
    publishedAt: "2026-09-26",
    lead: "If you are in Sheffield or elsewhere in South Yorkshire and researching a hair transplant, you will usually be weighing a local clinic against options in Leeds or Manchester, or travelling to London. This page sets out what changes between those routes, what to check regardless of where you book, and how long the journey to St Pancras really takes.",
    heroChips: ["Sheffield, Leeds, Manchester or London", "Two hours to St Pancras", "What to check before booking"],
    cards: [
      {
        title: "A smaller local market",
        text: "Sheffield has fewer local options than Leeds or Manchester, so many patients widen their search across the region before deciding.",
      },
      {
        title: "London is closer than it looks",
        text: "Direct trains reach St Pancras in around two hours, which makes a London consultation a realistic day trip.",
      },
    ],
    travel: {
      trainTime: "around 2 hours",
      trainRoute: "Sheffield to London St Pancras International, fastest direct services",
      drivingTime: "around 3 hours",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is straightforward for a consultation, with direct East Midlands Railway services reaching St Pancras in around two hours. Treatment day is different: the procedure takes several hours, so most Sheffield patients stay overnight in London and travel home the next morning rather than face the journey straight after surgery.",
      nearbyTowns: ["Rotherham", "Barnsley", "Doncaster", "Chesterfield", "Worksop"],
    },
    localMarket: {
      title: "The hair transplant market for Sheffield patients",
      body: [
        "Sheffield has local clinics offering hair transplant surgery, but the city's market is smaller than those of Leeds or Manchester, both of which are within an hour or so by train. In practice, many South Yorkshire patients end up comparing clinics across all three cities, alongside the option of travelling further.",
        "A wider search gives you more choice, but it also makes comparison harder. Clinics in different cities describe their pricing, graft estimates, and aftercare in different ways, and the differences that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are rarely the ones in the advertising.",
      ],
      bullets: [
        "Leeds and Manchester are realistic parts of the Sheffield patient's local market.",
        "More options mean more quotes to compare carefully, not an easier decision.",
        "Ask every clinic the same questions so the answers are comparable.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Sheffield",
      body: [
        "With direct trains reaching St Pancras in around two hours, London is a more practical option from Sheffield than many patients assume. For some, it offers access to a curated, compared set of options rather than one clinic's own recommendation. For others, a good clinic in Yorkshire or Manchester already meets their standards and the extra travel adds little.",
        "If you do travel, treat the consultation and treatment day as separate trips. The consultation fits comfortably into a day. Treatment day is long and tiring, so plan to stay the night, and check how the clinic will support you once you are back in Sheffield: video reviews, a named contact, and written guidance you can follow at home.",
      ],
      bullets: [
        "A London consultation is a realistic day trip from Sheffield station.",
        "Stay overnight after treatment rather than travelling straight home.",
        "Ask who you will actually contact during recovery, and how.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Most Sheffield patients looking at Turkey fly from Manchester Airport, typically around an hour and a quarter away by road, which has direct flights to Istanbul, where most Turkish hair transplant clinics are based. It is worth checking whether East Midlands or Leeds Bradford has a suitable route at the time you plan to travel, since schedules change.",
      airportBullet:
        "Manchester Airport, around an hour and a quarter away, is the usual starting point for Istanbul.",
    },
    answers: {
      clinic:
        "Yes. Sheffield has clinics offering hair transplant procedures, and many South Yorkshire patients also consider clinics in Leeds and Manchester. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Sheffield to London St Pancras International, the fastest direct services take around 2 hours. Driving usually takes around 3 hours on the M1 outside peak traffic. Either makes a same-day consultation trip realistic.",
      overnight:
        "Most Sheffield patients stay overnight after treatment day. The procedure itself runs for several hours, and a two-hour train journey straight afterwards is not a comfortable way to start recovery. A consultation works easily as a day trip.",
      worthIt:
        "It depends what you are looking for. If a clinic in Sheffield, Leeds, or Manchester meets the standards you would check for anywhere, booking locally is simpler. Patients who choose London usually want a curated comparison of options, and the two-hour rail link makes that easier to justify from Sheffield than from further north.",
      travelCost:
        "Rail fares to St Pancras vary with how far ahead you book and whether you travel at peak times, and treatment day usually adds a London hotel night. Include both in your comparison with a local quote, since they are part of the real cost.",
      turkey:
        "Yes. Most Sheffield patients fly from Manchester Airport, which has direct Istanbul flights and is around an hour and a quarter away by road.",
    },
  },
  {
    city: "Newcastle",
    nation: "england",
    regionPhrase: "across the North East",
    publishedAt: "2026-09-26",
    lead: "If you are in Newcastle, Gateshead, or elsewhere in the North East and researching a hair transplant, the choice is usually between a local clinic, a clinic further south in Yorkshire, or travelling to London. This page covers what changes between those routes, the checks that apply wherever you book, and the honest travel picture, since London is a long way from Tyneside.",
    heroChips: ["North East, Yorkshire or London", "Rail and air to London", "What to check before booking"],
    cards: [
      {
        title: "Fewer local options",
        text: "The North East has a smaller hair transplant market than the big cities further south, so many patients widen their search before deciding.",
      },
      {
        title: "Distance changes the maths",
        text: "At nearly three hours by train, London needs more planning from Newcastle, and a video consultation first usually makes sense.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 50 minutes",
      trainRoute: "Newcastle to London King's Cross, fastest direct LNER services",
      drivingTime: "around 5 hours",
      drivingRoute: "A1(M), outside peak traffic",
      flightTime: "around 1 hour 10 minutes",
      flightRoute: "Newcastle Airport to Heathrow, flying time only",
      sameDayReturnNote:
        "A same-day return is possible for a consultation, but it makes for a long day, which is why many Newcastle patients start with a video consultation and only travel once they are confident in the plan. For treatment day, plan to stay in London at least one night: the procedure runs for several hours and a near three-hour journey straight afterwards is not a sensible start to recovery.",
      nearbyTowns: ["Gateshead", "Sunderland", "North Shields", "South Shields", "Durham", "Cramlington"],
    },
    localMarket: {
      title: "The hair transplant market for Newcastle patients",
      body: [
        "Newcastle has local clinics offering hair transplant surgery, but the North East market is smaller than those of Leeds, Manchester, or London. Many patients therefore look further afield, often to Yorkshire, which is around an hour and a half away by train, before settling on a clinic.",
        "A smaller market is not a problem in itself. What matters is whether the clinic you choose meets the same standard you would expect anywhere: who performs the procedure, how the clinic is regulated, how graft estimates are reached, and what the quote includes once aftercare and medication are counted.",
      ],
      bullets: [
        "A smaller local market means comparing carefully, not settling for the nearest option.",
        "Leeds is a realistic middle ground for some North East patients.",
        "Standards matter more than distance, in either direction.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Newcastle",
      body: [
        "From Newcastle, London is a genuine commitment rather than a quick trip, so it needs to offer something a closer clinic does not. For some patients that is access to a curated, compared set of options and a consultation process built around comparison. For others, the extra time and cost are not justified by what they would gain.",
        "If London is on your shortlist, start with a video consultation to cover suitability, likely graft range, and pricing before you travel. For treatment day, plan at least one night in London, and ask in detail how aftercare works at a distance: photo reviews, a named contact, and clear written guidance matter more when the clinic is nearly three hours away.",
      ],
      bullets: [
        "Start with a video consultation before committing to the journey.",
        "Plan at least one night in London for treatment day.",
        "Remote aftercare arrangements matter more the further you live from the clinic.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Newcastle Airport's Turkey flights have largely been seasonal holiday routes, so Istanbul, where most Turkish hair transplant clinics are based, often means a connection via London or a European hub, or a direct flight from Manchester. Check current schedules before planning around any of them.",
      airportBullet:
        "Istanbul from Newcastle usually means a connection or a direct flight from Manchester.",
    },
    answers: {
      clinic:
        "Yes. Newcastle and the wider North East have clinics offering hair transplant procedures, although the market is smaller than in Leeds, Manchester, or London. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Newcastle to London King's Cross, the fastest direct LNER services take around 2 hours 50 minutes. Flights from Newcastle Airport to Heathrow take around 1 hour 10 minutes in the air, though airport time adds considerably to that. Driving usually takes around 5 hours on the A1(M).",
      overnight:
        "Yes, for treatment day most Newcastle patients stay at least one night. The procedure runs for several hours, and a near three-hour journey straight afterwards is not a comfortable start to recovery. Some patients also travel down the evening before to avoid an early start.",
      worthIt:
        "It depends what you are optimising for. If a clinic in the North East or Yorkshire meets the standards you would check for anywhere, the shorter journey is a genuine advantage. Patients who choose London from Newcastle usually do so for a curated comparison of options, and the distance means that trade-off deserves proper thought rather than an assumption.",
      travelCost:
        "Rail fares and flights vary widely with how far ahead you book, and treatment day usually adds at least one London hotel night. From Newcastle these costs are large enough to change the comparison with a local quote, so include them from the start.",
      turkey:
        "Yes, though Istanbul usually means a connection from Newcastle, or a direct flight from Manchester, since Newcastle Airport's Turkey routes have mainly been seasonal holiday flights.",
    },
  },
  {
    city: "Glasgow",
    nation: "scotland",
    regionPhrase: "across the west of Scotland",
    publishedAt: "2026-09-26",
    lead: "If you are in Glasgow or the west of Scotland and researching a hair transplant, the realistic options are a clinic in Glasgow or Edinburgh, or travelling to London. This page explains what changes between those routes, how clinic regulation differs in Scotland, and what the journey to London actually involves.",
    heroChips: ["Glasgow, Edinburgh or London", "Scottish clinic regulation explained", "Rail and air to London"],
    cards: [
      {
        title: "Regulation works differently in Scotland",
        text: "Independent clinics in Scotland are regulated by Healthcare Improvement Scotland, not the CQC, so the registration check you make is different.",
      },
      {
        title: "London is a serious journey",
        text: "At four and a half hours by train, London from Glasgow needs a clear reason, and a video consultation first is sensible.",
      },
    ],
    travel: {
      trainTime: "around 4 hours 30 minutes",
      trainRoute: "Glasgow Central to London Euston, fastest direct services",
      drivingTime: "around 7 hours",
      drivingRoute: "M74, M6 and M1, outside peak traffic",
      flightTime: "around 1 hour 20 minutes",
      flightRoute: "Glasgow Airport to London, flying time only",
      sameDayReturnNote:
        "A same-day return to London for a consultation is technically possible by air, but it is a long and expensive day, so most Glasgow patients begin with a video consultation and only travel once they are confident in the plan. For treatment day, plan to arrive the day before and stay at least one night afterwards, and ask the clinic when they are comfortable with you flying, since advice varies.",
      nearbyTowns: ["Paisley", "East Kilbride", "Hamilton", "Motherwell", "Clydebank", "Cumbernauld"],
    },
    localMarket: {
      title: "The hair transplant market for Glasgow patients",
      body: [
        "Glasgow has local clinics offering hair transplant surgery, and Edinburgh's clinics are under an hour away by train, so most west of Scotland patients effectively have a Scotland-wide market to choose from before London comes into it.",
        "One practical difference is regulation. Independent clinics in Scotland are registered with Healthcare Improvement Scotland rather than the Care Quality Commission, which covers England only. Neither body is a guarantee of a good result on its own, but registration is a basic check, and it is worth knowing which register to look at before you trust a badge on a website.",
      ],
      bullets: [
        "Glasgow and Edinburgh together make up the realistic Scottish market.",
        "Scottish clinics are checked against Healthcare Improvement Scotland's register, not the CQC's.",
        "Registration is a starting point, not proof of quality.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Glasgow",
      body: [
        "From Glasgow, London is a significant undertaking, with around four and a half hours by train or a short flight plus airport time. That means it only makes sense if it offers something a Scottish clinic does not, such as a curated, compared set of options rather than one clinic's own recommendation.",
        "If you do look south, do as much as possible remotely first: a video consultation covering suitability, likely graft range, and pricing, plus a clear written quote. For treatment day, plan to travel the day before and stay at least one night afterwards, and ask in detail how aftercare works across that distance, since you are unlikely to pop back in for a check.",
      ],
      bullets: [
        "Complete the consultation remotely before committing to travel.",
        "Plan to arrive the day before treatment and stay at least one night after.",
        "Ask exactly how follow-up works when the clinic is around 400 miles away.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Direct flights from Scottish airports to Istanbul, where most Turkish hair transplant clinics are based, have varied over time, so check current schedules from both Glasgow and Edinburgh. Where no direct route is running, Istanbul usually means a connection via London or a European hub.",
      airportBullet:
        "Check both Glasgow and Edinburgh airports for current Istanbul routes, or plan for a connection.",
    },
    answers: {
      clinic:
        "Yes. Glasgow has clinics offering hair transplant procedures, and Edinburgh's clinics are close enough to be part of the same realistic market. In Scotland, check that a clinic is registered with Healthcare Improvement Scotland, then apply the same questions about who performs the procedure and what the quote includes that you would ask anywhere.",
      howLong:
        "By train from Glasgow Central to London Euston, the fastest direct services take around 4 hours 30 minutes. Flights from Glasgow Airport to London take around 1 hour 20 minutes in the air, though airport time adds considerably to the total. Driving takes around 7 hours, so it is rarely the practical choice.",
      overnight:
        "Yes. From Glasgow, most patients arrive the day before treatment and stay at least one night afterwards. The procedure runs for several hours, and a long train journey or a flight straight afterwards is not a sensible start to recovery. Ask the clinic when they are comfortable with you flying.",
      worthIt:
        "For many Glasgow patients, a well-regulated clinic in Glasgow or Edinburgh will make more sense than the journey south. London is worth considering if you want a curated comparison of options that you cannot get locally, but the distance means the benefit needs to be clear before you commit.",
      travelCost:
        "Flights and rail fares vary widely with how far ahead you book, and treatment day usually means two nights in London rather than one. From Glasgow these costs are significant enough to change the comparison with a Scottish quote, so include them from the start.",
      turkey:
        "Yes, though direct Istanbul flights from Scottish airports have varied over time, so it may mean a connection via London or a European hub.",
    },
  },
  {
    city: "Edinburgh",
    nation: "scotland",
    regionPhrase: "across the east of Scotland",
    publishedAt: "2026-09-26",
    lead: "If you are in Edinburgh, the Lothians, or Fife and researching a hair transplant, the realistic options are a clinic in Edinburgh or Glasgow, or travelling to London. This page covers what changes between those routes, how clinic regulation works in Scotland, and what the journey south actually involves.",
    heroChips: ["Edinburgh, Glasgow or London", "Scottish clinic regulation explained", "Rail and air to London"],
    cards: [
      {
        title: "Scotland has its own regulator",
        text: "Scottish independent clinics answer to Healthcare Improvement Scotland rather than the CQC, which changes where you check registration.",
      },
      {
        title: "The East Coast line helps",
        text: "Direct LNER trains reach King's Cross in a little over four hours, which makes London possible but still a long day.",
      },
    ],
    travel: {
      trainTime: "around 4 hours 20 minutes",
      trainRoute: "Edinburgh Waverley to London King's Cross, fastest direct services",
      drivingTime: "around 7 hours",
      drivingRoute: "A1(M) and A1, outside peak traffic",
      flightTime: "around 1 hour 20 minutes",
      flightRoute: "Edinburgh Airport to London, flying time only",
      sameDayReturnNote:
        "A same-day return for a consultation is possible by air or on an early train, but it makes for a very long day, so most Edinburgh patients start with a video consultation and travel only once the plan is clear. For treatment day, plan to arrive the day before and stay at least one night afterwards, and check with the clinic when they are happy for you to fly or take a long train journey.",
      nearbyTowns: ["Livingston", "Musselburgh", "Dalkeith", "Dunfermline", "Kirkcaldy", "Linlithgow"],
    },
    localMarket: {
      title: "The hair transplant market for Edinburgh patients",
      body: [
        "Edinburgh has local clinics offering hair transplant surgery, and with Glasgow under an hour away by train, patients in the east of Scotland can realistically compare clinics in both cities before looking any further.",
        "Clinic regulation is the main practical difference from England. In Scotland, independent clinics register with Healthcare Improvement Scotland, while the Care Quality Commission covers England only. Knowing which register to check matters, because a badge on a website is not the same thing as a registration you have confirmed yourself.",
      ],
      bullets: [
        "Edinburgh and Glasgow together form the realistic local market.",
        "Check Scottish clinics against Healthcare Improvement Scotland's register.",
        "Registration is a baseline, not a guarantee of a good result.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Edinburgh",
      body: [
        "The East Coast Main Line makes London more reachable from Edinburgh than the distance suggests, but it is still over four hours each way. London earns its place on the shortlist only if it offers something a Scottish clinic cannot, such as a curated, compared set of options rather than a single clinic's own recommendation.",
        "If you are considering it, do as much as you can remotely first: a video consultation, a written quote that states what is included, and a clear explanation of how the graft estimate was reached. For treatment day, plan to stay at least one night and ask how aftercare works from a distance, since popping back for a quick check will not be practical.",
      ],
      bullets: [
        "Use a video consultation to decide whether the journey is worth it.",
        "Plan at least one night in London around treatment day.",
        "Ask how follow-up works once you are back in Scotland.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Direct flights from Edinburgh Airport to Istanbul, where most Turkish hair transplant clinics are based, have operated at times, but schedules change, so check what is currently running. Where there is no direct option, a connection via London or a European hub is the usual fallback.",
      airportBullet:
        "Check current Edinburgh Airport schedules for direct Istanbul flights before planning around one.",
    },
    answers: {
      clinic:
        "Yes. Edinburgh has clinics offering hair transplant procedures, and Glasgow's clinics are close enough to be part of the same market. In Scotland, check that a clinic is registered with Healthcare Improvement Scotland, then ask the same questions about who performs the procedure and what the quote includes that you would ask anywhere.",
      howLong:
        "By train from Edinburgh Waverley to London King's Cross, the fastest direct LNER services take around 4 hours 20 minutes. Flights from Edinburgh Airport to London take around 1 hour 20 minutes in the air, plus airport time. Driving takes around 7 hours and is rarely the practical choice.",
      overnight:
        "Yes. Most Edinburgh patients travel down the day before treatment and stay at least one night afterwards. The procedure runs for several hours, and a four-hour train journey or a flight immediately afterwards is not a sensible start to recovery.",
      worthIt:
        "For many Edinburgh patients, a properly regulated clinic in Edinburgh or Glasgow will be the more practical choice. London is worth considering if you want a curated comparison of options you cannot get locally, but the distance means the benefit should be clear before you commit.",
      travelCost:
        "Rail fares and flights vary widely with how far ahead you book, and treatment day usually means two nights in London. From Edinburgh those costs are large enough to change the comparison with a Scottish quote, so include them from the outset.",
      turkey:
        "Yes, depending on current schedules. Edinburgh Airport has had direct Istanbul flights at times; otherwise it means a connection via London or a European hub.",
    },
  },
  {
    city: "Bristol",
    nation: "england",
    regionPhrase: "across the South West",
    publishedAt: "2026-09-26",
    lead: "If you are in Bristol or the surrounding area and researching a hair transplant, you will usually be comparing a local clinic, one elsewhere in the South West or South Wales, or travelling to London. This page covers what changes between those routes, what to check wherever you book, and how quick the London journey is from Temple Meads.",
    heroChips: ["Bristol or London compared", "Under two hours to Paddington", "What to check before booking"],
    cards: [
      {
        title: "The South West's largest market",
        text: "Bristol has the widest choice of clinics in the South West, which helps, but also means more quotes to compare carefully.",
      },
      {
        title: "London is within easy reach",
        text: "Fast trains reach Paddington in well under two hours, so a London consultation is a comfortable day trip.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 40 minutes",
      trainRoute: "Bristol Temple Meads to London Paddington, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is easy for a consultation. For treatment day it is possible too, and some Bristol patients do travel home the same evening, but the procedure runs for several hours, so many prefer a night in London and a fresh start the next morning. If you drive, most clinics will advise you not to drive yourself home straight after surgery.",
      nearbyTowns: ["Weston-super-Mare", "Clevedon", "Portishead", "Keynsham", "Thornbury"],
    },
    localMarket: {
      title: "The hair transplant market for Bristol patients",
      body: [
        "Bristol is the largest hair transplant market in the South West, and patients from North Somerset and South Gloucestershire often start their search here. Cardiff is also under an hour away, so some Bristol patients end up comparing clinics on both sides of the Severn.",
        "More choice is useful, but only if the comparison is fair. Clinics describe graft estimates, methods, and pricing differently, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are not always the ones given most space in the advertising.",
      ],
      bullets: [
        "Bristol offers the widest local choice in the region.",
        "Some patients also compare clinics in Cardiff, which are regulated differently.",
        "Ask every clinic the same questions so the answers can be compared.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Bristol",
      body: [
        "With fast trains to Paddington, London is a practical option from Bristol rather than a major expedition. For some patients that makes a curated, compared set of London options an easy thing to weigh against a local quote. For others, a strong Bristol clinic already covers what they need.",
        "The consultation is a straightforward day trip. For treatment day, decide in advance whether you will travel home the same evening or stay overnight, bearing in mind the length of the appointment, and ask how follow-up works once you are back in Bristol, whether that is video review, a named contact, or occasional return visits.",
      ],
      bullets: [
        "A London consultation is a comfortable day trip from Temple Meads.",
        "Treatment day can be done as a return, but an overnight stay is often more comfortable.",
        "Do not plan to drive yourself home straight after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Bristol Airport's Turkey flights have mostly been seasonal holiday routes rather than Istanbul, where most Turkish hair transplant clinics are based, so many Bristol patients fly from Heathrow, which has direct Istanbul flights, or connect elsewhere. Check current schedules before planning around any route.",
      airportBullet:
        "Heathrow has direct Istanbul flights; Bristol Airport's Turkey routes have mostly been seasonal.",
    },
    answers: {
      clinic:
        "Yes. Bristol has the widest choice of hair transplant clinics in the South West, and some patients also look at clinics in Cardiff. Choice alone does not tell you whether a clinic meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Bristol Temple Meads to London Paddington, the fastest direct services take around 1 hour 40 minutes. Driving usually takes around 2 hours 30 minutes on the M4 outside peak traffic, so the train is often the simpler option.",
      overnight:
        "Not necessarily. The journey is short enough that some Bristol patients travel home the same evening, but the procedure runs for several hours, and many prefer to stay overnight. If you are driving, arrange for someone else to drive you home, as most clinics advise against driving straight after surgery.",
      worthIt:
        "It depends what you are looking for. If a Bristol clinic meets the standards you would check for anywhere, booking locally is simpler. Because the London journey is short, comparing a curated set of London options alongside a local quote costs relatively little, which is why some Bristol patients do both before deciding.",
      travelCost:
        "Rail fares to Paddington vary with how far ahead you book and whether you travel at peak times, and an optional overnight stay adds a hotel cost. From Bristol these are modest compared with the procedure itself, but still worth including in any comparison.",
      turkey:
        "Yes. Most Bristol patients fly from Heathrow, which has direct Istanbul flights, since Bristol Airport's Turkey routes have mainly been seasonal holiday flights.",
    },
  },
  {
    city: "Cardiff",
    nation: "wales",
    regionPhrase: "across South Wales",
    publishedAt: "2026-09-26",
    lead: "If you are in Cardiff or elsewhere in South Wales and researching a hair transplant, you will usually be weighing a clinic in Wales, one across the Severn in Bristol, or travelling to London. This page explains what changes between those routes, how clinic regulation works in Wales, and how long the London journey takes.",
    heroChips: ["Cardiff, Bristol or London", "Welsh clinic regulation explained", "Two hours to Paddington"],
    cards: [
      {
        title: "Wales has its own regulator",
        text: "Independent healthcare in Wales is overseen by Healthcare Inspectorate Wales rather than the CQC, which changes where you check registration.",
      },
      {
        title: "Bristol is part of the picture",
        text: "With Bristol under an hour away, many Cardiff patients compare clinics in both cities before looking further.",
      },
    ],
    travel: {
      trainTime: "around 2 hours",
      trainRoute: "Cardiff Central to London Paddington, fastest direct services",
      drivingTime: "around 3 hours",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for a consultation, with direct trains reaching Paddington in around two hours. For treatment day most Cardiff patients stay in London overnight, since the procedure runs for several hours and a two-hour journey straight afterwards is not a comfortable start to recovery.",
      nearbyTowns: ["Newport", "Barry", "Penarth", "Caerphilly", "Pontypridd", "Bridgend"],
    },
    localMarket: {
      title: "The hair transplant market for Cardiff patients",
      body: [
        "Cardiff has local clinics offering hair transplant surgery, and Bristol's larger market is less than an hour away, so many South Wales patients end up comparing clinics in both cities before deciding whether to look further.",
        "Regulation is one practical difference to be aware of. In Wales, independent healthcare falls under Healthcare Inspectorate Wales, while the Care Quality Commission covers England, including Bristol and London. Registration is not a guarantee of a good result, but knowing which register applies helps you check a clinic's claims for yourself.",
      ],
      bullets: [
        "Cardiff and Bristol together make up the realistic local market.",
        "Welsh clinics are checked with Healthcare Inspectorate Wales, English ones with the CQC.",
        "Registration is a starting point, not proof of quality.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Cardiff",
      body: [
        "Direct trains make London a realistic option from Cardiff, at around two hours each way. For some patients it offers access to a curated, compared set of options rather than one clinic's own recommendation. For others, a good clinic in Cardiff or Bristol already meets their standards, and the extra travel adds little.",
        "If you do travel, the consultation fits comfortably into a day. Treatment day is longer and more tiring, so plan to stay overnight, and ask how the clinic supports patients once they are home: video reviews, a named contact, and written guidance you can follow without going back.",
      ],
      bullets: [
        "A London consultation is a realistic day trip from Cardiff Central.",
        "Stay overnight after treatment rather than travelling straight home.",
        "Ask who you will contact during recovery, and how quickly they respond.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Cardiff Airport's international schedule is limited, so most South Wales patients heading to Istanbul, where most Turkish hair transplant clinics are based, fly from Heathrow, Bristol, or Birmingham depending on which routes are running. Heathrow has direct Istanbul flights; check the others before planning around them.",
      airportBullet:
        "Most Cardiff patients fly to Istanbul from Heathrow, Bristol, or Birmingham rather than Cardiff.",
    },
    answers: {
      clinic:
        "Yes. Cardiff has clinics offering hair transplant procedures, and Bristol's clinics are close enough to be a realistic alternative. In Wales, check how a clinic is registered with Healthcare Inspectorate Wales, then ask the same questions about who performs the procedure and what the quote includes that you would ask anywhere.",
      howLong:
        "By train from Cardiff Central to London Paddington, the fastest direct services take around 2 hours. Driving usually takes around 3 hours on the M4 outside peak traffic.",
      overnight:
        "Most Cardiff patients stay overnight after treatment day. The procedure runs for several hours, and a two-hour journey immediately afterwards is not ideal. A consultation, on the other hand, works well as a day trip.",
      worthIt:
        "It depends what you are optimising for. If a clinic in Cardiff or Bristol meets the standards you would check for anywhere, booking locally is simpler. Patients who travel to London usually do so for a curated comparison of options, and the direct rail link keeps that comparison practical.",
      travelCost:
        "Rail fares to Paddington vary with how far ahead you book and whether you travel at peak times, and treatment day usually adds a London hotel night. Include both when comparing against a local quote.",
      turkey:
        "Yes, usually by flying from Heathrow, which has direct Istanbul flights, or from Bristol or Birmingham if a suitable route is running.",
    },
  },
  {
    city: "Nottingham",
    nation: "england",
    regionPhrase: "across the East Midlands",
    publishedAt: "2026-09-26",
    lead: "If you are in Nottingham or the surrounding area and researching a hair transplant, you will usually be comparing clinics across the East Midlands, possibly Birmingham, or travelling to London. This page covers what changes between those routes, what to check wherever you book, and how long the journey to St Pancras takes.",
    heroChips: ["East Midlands or London", "Under two hours to St Pancras", "What to check before booking"],
    cards: [
      {
        title: "A three-city local market",
        text: "Nottingham, Derby, and Leicester are all within about half an hour of each other, so many patients compare clinics across all three.",
      },
      {
        title: "London is a practical day trip",
        text: "Direct trains reach St Pancras in under two hours, which makes a London consultation easy to fit into a day.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 45 minutes",
      trainRoute: "Nottingham to London St Pancras International, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is easy for a consultation. For treatment day, some Nottingham patients travel home the same evening, while others prefer a night in London given the length of the procedure. Either way, do not plan to drive yourself home straight after surgery, as most clinics advise against it.",
      nearbyTowns: ["West Bridgford", "Beeston", "Arnold", "Mansfield", "Newark", "Long Eaton"],
    },
    localMarket: {
      title: "The hair transplant market for Nottingham patients",
      body: [
        "Nottingham has local clinics offering hair transplant surgery, and with Derby and Leicester each around half an hour away, the realistic local market for most patients spans all three cities. Birmingham is also within reach for those willing to travel a little further.",
        "That spread of options is useful, but clinics across the region vary considerably in who performs the procedure, how graft estimates are reached, and what the headline price includes. A careful comparison asks every clinic the same questions, rather than comparing advertised prices alone.",
      ],
      bullets: [
        "Nottingham, Derby, and Leicester form one realistic local market.",
        "More choice means more quotes to compare carefully.",
        "Headline prices rarely show what is and is not included.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Nottingham",
      body: [
        "With direct trains reaching St Pancras in under two hours, London is a practical option from Nottingham. It tends to appeal to patients who want a curated, compared set of options rather than a single clinic's recommendation. For others, a strong East Midlands clinic already covers what matters most.",
        "A consultation fits easily into a day. For treatment day, decide in advance whether you will stay overnight or travel home the same evening, taking into account how you are likely to feel after several hours in the clinic, and ask how follow-up will work once you are back in Nottingham.",
      ],
      bullets: [
        "A London consultation is an easy day trip from Nottingham.",
        "Treatment day can be a return trip, but an overnight stay is often more comfortable.",
        "Arrange a lift or take the train rather than driving yourself after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. East Midlands Airport's Turkey flights have mostly been seasonal holiday routes rather than Istanbul, where most Turkish hair transplant clinics are based, so many Nottingham patients fly from Birmingham or Manchester instead, both of which have had direct Istanbul flights. Check current schedules before planning around any route.",
      airportBullet: "Istanbul from Nottingham usually means flying from Birmingham or Manchester.",
    },
    answers: {
      clinic:
        "Yes. Nottingham has clinics offering hair transplant procedures, and Derby and Leicester are close enough to be part of the same local market. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Nottingham to London St Pancras International, the fastest direct services take around 1 hour 45 minutes. Driving usually takes around 2 hours 30 minutes on the M1 outside peak traffic.",
      overnight:
        "Not necessarily. Some Nottingham patients travel home the same evening, but the procedure runs for several hours, so many prefer an overnight stay. If you would otherwise drive, take the train or arrange a lift, since most clinics advise against driving straight after surgery.",
      worthIt:
        "It depends what you are looking for. If an East Midlands clinic meets the standards you would check for anywhere, booking locally is simpler. The short rail link means comparing a curated set of London options costs relatively little, so some patients look at both before deciding.",
      travelCost:
        "Rail fares to St Pancras vary with how far ahead you book and whether you travel at peak times, and an overnight stay adds a hotel cost. These are modest compared with the procedure itself, but worth including in the comparison.",
      turkey:
        "Yes, usually by flying from Birmingham or Manchester, since East Midlands Airport's Turkey routes have mainly been seasonal holiday flights.",
    },
  },
  {
    city: "Leicester",
    nation: "england",
    regionPhrase: "across the East Midlands",
    publishedAt: "2026-09-26",
    lead: "If you are in Leicester or elsewhere in Leicestershire and researching a hair transplant, London is closer than many people expect, at around an hour by train. This page covers how a London route compares with clinics in Leicester and the wider East Midlands, what to check wherever you book, and what treatment day looks like logistically.",
    heroChips: ["About an hour to St Pancras", "East Midlands or London", "What to check before booking"],
    cards: [
      {
        title: "London is effectively nearby",
        text: "At around an hour to St Pancras, a London clinic can be as quick to reach as one elsewhere in the region.",
      },
      {
        title: "The wider East Midlands counts too",
        text: "Nottingham and Derby are each around half an hour away, so the local market is broader than Leicester alone.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 5 minutes",
      trainRoute: "Leicester to London St Pancras International, fastest direct services",
      drivingTime: "around 2 hours",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "Leicester is close enough that a same-day return is realistic even for treatment day, and many patients do it. The procedure still runs for several hours, so allow for tiredness on the way home, and take the train or arrange a lift rather than driving yourself, which most clinics advise against after surgery.",
      nearbyTowns: ["Loughborough", "Hinckley", "Market Harborough", "Melton Mowbray", "Oadby", "Coalville"],
    },
    localMarket: {
      title: "The hair transplant market for Leicester patients",
      body: [
        "Leicester has local clinics offering hair transplant surgery, and Nottingham and Derby widen the choice further, each around half an hour away. Unusually among the cities we cover, London is also close enough to count as part of the same practical market, at around an hour by train.",
        "That much choice makes a disciplined comparison more important. Clinics describe their graft estimates, methods, and inclusions differently, and the things that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are easy to lose among headline prices.",
      ],
      bullets: [
        "Leicester patients can realistically consider East Midlands and London clinics alike.",
        "Ask every clinic the same questions so the answers are comparable.",
        "Headline prices rarely show the full inclusions.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Leicester",
      body: [
        "Very little, in logistical terms. At around an hour each way, a London consultation takes less time than many people spend commuting, and treatment day can realistically be done as a return trip. The decision is less about distance and more about whether a curated, compared set of London options offers something a local clinic does not.",
        "If you choose London, plan treatment day with your recovery in mind rather than the timetable: the procedure runs for several hours, so leave slack for the journey home and avoid planning anything for that evening. Ask how follow-up works too, although returning for a check is far more practical from Leicester than from most places.",
      ],
      bullets: [
        "London is roughly an hour away, which makes it a practical local option.",
        "Treatment day can be a return trip if you allow for tiredness.",
        "Take the train or arrange a lift rather than driving yourself home.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. East Midlands Airport's Turkey flights have mostly been seasonal holiday routes rather than Istanbul, where most Turkish hair transplant clinics are based, so Leicester patients typically fly from Birmingham or a London airport instead. Heathrow has direct Istanbul flights; check current schedules for the others.",
      airportBullet: "Istanbul from Leicester usually means flying from Birmingham or a London airport.",
    },
    answers: {
      clinic:
        "Yes. Leicester has clinics offering hair transplant procedures, and Nottingham and Derby are close enough to be part of the same market. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Leicester to London St Pancras International, the fastest direct services take around 1 hour 5 minutes. Driving usually takes around 2 hours on the M1 outside peak traffic, so the train is typically quicker.",
      overnight:
        "Usually not. Leicester is close enough that most patients travel home the same day, even after treatment. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself.",
      worthIt:
        "From Leicester the travel barely counts against London, so the decision is really about the options themselves. If a local clinic meets the standards you would check for anywhere, it may be the simpler choice. If you want a curated comparison of options, the short journey makes London easy to include.",
      travelCost:
        "Rail fares to St Pancras vary with how far ahead you book and whether you travel at peak times. Because an overnight stay is rarely needed from Leicester, the added travel cost is usually small compared with the procedure itself.",
      turkey:
        "Yes, usually by flying from Birmingham or a London airport, since East Midlands Airport's Turkey routes have mainly been seasonal holiday flights.",
    },
  },
  {
    city: "Derby",
    nation: "england",
    regionPhrase: "across the East Midlands",
    publishedAt: "2026-09-26",
    lead: "If you are in Derby or elsewhere in Derbyshire and researching a hair transplant, you will usually be comparing clinics across the East Midlands, possibly Birmingham, or travelling to London. This page covers what changes between those routes, what to check wherever you book, and how long the journey to St Pancras takes.",
    heroChips: ["Derby, Nottingham or London", "Around 90 minutes to St Pancras", "What to check before booking"],
    cards: [
      {
        title: "A smaller city, a wider market",
        text: "Derby's own market is modest, but Nottingham, Leicester, and Birmingham are all within easy reach.",
      },
      {
        title: "London is a manageable trip",
        text: "Direct trains reach St Pancras in around an hour and a half, so a London consultation fits into a day.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 30 minutes",
      trainRoute: "Derby to London St Pancras International, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is straightforward for a consultation. For treatment day, some Derby patients travel home the same evening and others stay overnight, depending on how they expect to feel after several hours in the clinic. Most clinics advise against driving yourself home after surgery, so plan on the train or a lift.",
      nearbyTowns: ["Burton upon Trent", "Belper", "Ilkeston", "Ashbourne", "Matlock", "Swadlincote"],
    },
    localMarket: {
      title: "The hair transplant market for Derby patients",
      body: [
        "Derby has a smaller local market than Nottingham or Birmingham, and many Derbyshire patients end up looking across the region, with Nottingham around twenty minutes away by train and Birmingham under an hour.",
        "Looking wider is sensible, provided the comparison stays fair. Clinics present graft estimates, methods, and inclusions in different ways, and the points that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are not always the ones given the most prominence.",
      ],
      bullets: [
        "Nottingham, Leicester, and Birmingham are all realistic options from Derby.",
        "Compare what each quote includes, not only the headline figure.",
        "Ask every clinic the same questions so the answers line up.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Derby",
      body: [
        "At around an hour and a half by direct train, London is a realistic option from Derby rather than a major journey. It tends to suit patients who want a curated, compared set of options rather than one clinic's recommendation, while others find a strong East Midlands clinic meets their needs without the travel.",
        "The consultation fits comfortably into a day. For treatment day, choose between travelling home the same evening and staying overnight based on how you expect to feel after several hours in the clinic, and ask how follow-up will work once you are back in Derbyshire.",
      ],
      bullets: [
        "A London consultation is a comfortable day trip from Derby.",
        "Treatment day can be a return trip, but an overnight stay is often easier.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. East Midlands Airport, close to Derby, has mostly offered seasonal holiday flights to Turkey rather than routes to Istanbul, where most Turkish hair transplant clinics are based, so many Derby patients fly from Birmingham or Manchester instead. Check current schedules before planning around any route.",
      airportBullet: "Istanbul from Derby usually means flying from Birmingham or Manchester.",
    },
    answers: {
      clinic:
        "Yes. Derby has clinics offering hair transplant procedures, and many patients also consider Nottingham, Leicester, and Birmingham. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Derby to London St Pancras International, the fastest direct services take around 1 hour 30 minutes. Driving usually takes around 2 hours 30 minutes on the M1 outside peak traffic.",
      overnight:
        "Not necessarily. Some Derby patients travel home the same evening after treatment, while others prefer to stay overnight given the length of the procedure. Either way, avoid driving yourself home straight afterwards.",
      worthIt:
        "It depends what you are looking for. If a clinic in the East Midlands meets the standards you would check for anywhere, booking locally is simpler. The direct rail link means comparing a curated set of London options costs relatively little, so some patients consider both.",
      travelCost:
        "Rail fares to St Pancras vary with how far ahead you book and whether you travel at peak times, and an overnight stay adds a hotel cost. Both are modest against the cost of the procedure but worth including.",
      turkey:
        "Yes, usually by flying from Birmingham or Manchester, since East Midlands Airport's Turkey routes have mainly been seasonal holiday flights.",
    },
  },
  {
    city: "Bradford",
    nation: "england",
    regionPhrase: "across West Yorkshire",
    publishedAt: "2026-09-26",
    lead: "If you are in Bradford or the surrounding towns and researching a hair transplant, your realistic local market includes Leeds as well as Bradford itself, alongside the option of travelling to London. This page covers what changes between those routes, what to check wherever you book, and how the journey to King's Cross actually works from Bradford.",
    heroChips: ["Bradford, Leeds or London", "Direct and via-Leeds rail options", "What to check before booking"],
    cards: [
      {
        title: "Leeds is effectively local",
        text: "With Leeds around twenty minutes away by train, most Bradford patients compare clinics in both cities.",
      },
      {
        title: "Two ways to reach London",
        text: "Direct trains run from Bradford Interchange, or you can change at Leeds for more frequent LNER services.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 45 minutes to 3 hours",
      trainRoute: "Bradford Interchange to London King's Cross, direct or changing at Leeds",
      drivingTime: "around 3 hours 50 minutes",
      drivingRoute: "M62 and M1, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for a consultation, whether on the direct service from Bradford Interchange or by changing at Leeds. For treatment day most Bradford patients stay in London overnight, since the procedure runs for several hours and close to three hours of travel straight afterwards is not a comfortable way to start recovery.",
      nearbyTowns: ["Keighley", "Shipley", "Bingley", "Halifax", "Ilkley"],
    },
    localMarket: {
      title: "The hair transplant market for Bradford patients",
      body: [
        "Bradford has local clinics offering hair transplant surgery, but for most patients the realistic local market also includes Leeds, which is around twenty minutes away by train and has a larger choice of clinics. Many Bradford patients compare options in both cities before looking further.",
        "That wider choice only helps if the comparison is fair. Clinics present graft estimates, methods, and pricing differently, and the points that matter most (who performs the procedure, how the clinic is regulated, and what the quote includes) are not always the ones given the most space in the advertising.",
      ],
      bullets: [
        "Treat Bradford and Leeds as one local market when comparing clinics.",
        "A nearby clinic is convenient, but convenience says nothing about standards.",
        "Ask every clinic the same questions so the answers are comparable.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Bradford",
      body: [
        "From Bradford, London is a slightly longer trip than from Leeds, so it needs to offer something a West Yorkshire clinic does not. For some patients that is a curated, compared set of options rather than one clinic's own recommendation. For others, a strong clinic in Bradford or Leeds covers everything they need.",
        "If you do travel, a consultation is a manageable day trip. Treatment day is long, so plan to stay overnight, and ask how the clinic supports patients once they are home: video reviews, a named contact, and written aftercare guidance you can follow without going back.",
      ],
      bullets: [
        "Choose between the direct Bradford service and changing at Leeds based on timings.",
        "Plan an overnight stay for treatment day.",
        "Ask how remote aftercare works before committing to a clinic far from home.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Leeds Bradford Airport is close by, but its direct routes to Turkey have varied over time, so check current schedules before assuming one is running. Otherwise, Manchester Airport, which has direct flights to Istanbul, where most Turkish hair transplant clinics are based, is the usual alternative.",
      airportBullet:
        "Check Leeds Bradford Airport's current Turkey routes, with Manchester as the fallback for Istanbul.",
    },
    answers: {
      clinic:
        "Yes. Bradford has clinics offering hair transplant procedures, and Leeds is close enough that most patients consider both. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train, the journey to London King's Cross takes around 2 hours 45 minutes to 3 hours, either on the direct service from Bradford Interchange or by changing at Leeds for LNER services. Driving usually takes around 3 hours 50 minutes on the M62 and M1.",
      overnight:
        "Most Bradford patients stay overnight after treatment day. The procedure runs for several hours, and close to three hours of travel immediately afterwards is not ideal. A consultation works well as a day trip.",
      worthIt:
        "It depends what you are optimising for. If a clinic in Bradford or Leeds meets the standards you would check for anywhere, booking locally is simpler. Patients who choose London usually want a curated comparison of options, and the longer journey from Bradford means that choice deserves some thought.",
      travelCost:
        "Rail fares vary with how far ahead you book and whether you travel at peak times, and treatment day usually adds a London hotel night. Include both when comparing against a West Yorkshire quote.",
      turkey:
        "Yes, depending on current schedules from Leeds Bradford Airport. Where no direct Istanbul route is running, Manchester Airport, which has direct Istanbul flights, is the usual alternative.",
    },
  },
  {
    city: "Swansea",
    nation: "wales",
    regionPhrase: "across South Wales",
    publishedAt: "2026-09-26",
    lead: "If you are in Swansea or elsewhere in South West Wales and researching a hair transplant, the realistic choices are a clinic in Swansea or Cardiff, one in Bristol, or travelling to London. This page covers what changes between those routes, how clinic regulation works in Wales, and what the journey to London involves.",
    heroChips: ["Swansea, Cardiff or London", "Welsh clinic regulation explained", "Direct trains to Paddington"],
    cards: [
      {
        title: "Cardiff widens the choice",
        text: "With Cardiff around an hour away, many Swansea patients compare clinics in both cities before looking further afield.",
      },
      {
        title: "London needs a plan",
        text: "At close to three hours by train, a London route works best with a video consultation first and an overnight stay for treatment.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 50 minutes",
      trainRoute: "Swansea to London Paddington, fastest direct services",
      drivingTime: "around 3 hours 45 minutes",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A same-day return for a consultation is possible on direct trains to Paddington, but it makes for a long day, so many Swansea patients start with a video consultation. For treatment day, plan to stay in London at least one night, since the procedure runs for several hours and close to three hours of travel straight afterwards is not a sensible start to recovery.",
      nearbyTowns: ["Neath", "Port Talbot", "Llanelli", "Gorseinon", "Carmarthen"],
    },
    localMarket: {
      title: "The hair transplant market for Swansea patients",
      body: [
        "Swansea has a smaller hair transplant market than Cardiff or Bristol, so many patients in South West Wales widen their search, with Cardiff around an hour away by train and Bristol a little further.",
        "Regulation is one practical difference worth knowing. In Wales, independent healthcare falls under Healthcare Inspectorate Wales, while the Care Quality Commission covers England, including Bristol and London. Neither is a guarantee of a good result, but checking the right register is a sensible first step before trusting any claims on a clinic's website.",
      ],
      bullets: [
        "Cardiff and Bristol are realistic options for Swansea patients.",
        "Welsh clinics are checked with Healthcare Inspectorate Wales, English ones with the CQC.",
        "A smaller local market means comparing carefully, not settling for the nearest option.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Swansea",
      body: [
        "From Swansea, London is a substantial trip, so it needs to offer something a Welsh or Bristol clinic does not, such as a curated, compared set of options rather than one clinic's own recommendation. For many patients a strong clinic closer to home will be the more practical choice.",
        "If London is on your shortlist, start with a video consultation to cover suitability, likely graft range, and pricing. For treatment day, plan at least one night in London, and ask in detail how aftercare works at a distance, since returning for a quick check is not realistic from South West Wales.",
      ],
      bullets: [
        "Begin with a video consultation before committing to the journey.",
        "Plan at least one night in London around treatment day.",
        "Remote aftercare arrangements matter more the further you live from the clinic.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Istanbul, where most Turkish hair transplant clinics are based, is usually reached from Swansea by flying from Heathrow, which has direct Istanbul flights, or from Bristol or Cardiff if a suitable route is running. Check current schedules before planning around a regional airport.",
      airportBullet: "Heathrow is the most reliable direct route to Istanbul from South West Wales.",
    },
    answers: {
      clinic:
        "Yes. Swansea has clinics offering hair transplant procedures, and Cardiff and Bristol widen the choice. In Wales, check how a clinic is registered with Healthcare Inspectorate Wales, then ask the same questions about who performs the procedure and what the quote includes that you would ask anywhere.",
      howLong:
        "By train from Swansea to London Paddington, the fastest direct services take around 2 hours 50 minutes. Driving usually takes around 3 hours 45 minutes on the M4 outside peak traffic.",
      overnight:
        "Yes, for treatment day most Swansea patients stay at least one night. The procedure runs for several hours, and close to three hours of travel straight afterwards is not a comfortable start to recovery.",
      worthIt:
        "It depends what you are optimising for. If a clinic in Swansea, Cardiff, or Bristol meets the standards you would check for anywhere, the shorter journey is a real advantage. Patients who choose London usually want a curated comparison of options, and from Swansea that trade-off deserves careful thought.",
      travelCost:
        "Rail fares to Paddington vary widely with how far ahead you book, and treatment day usually adds at least one London hotel night. From Swansea these costs are large enough to affect the comparison with a local quote, so include them from the start.",
      turkey:
        "Yes, usually by flying from Heathrow, which has direct Istanbul flights, or from Bristol or Cardiff if a suitable route is running.",
    },
  },
  {
    city: "Southampton",
    nation: "england",
    regionPhrase: "along the South Coast",
    publishedAt: "2026-09-26",
    lead: "If you are in Southampton or elsewhere in Hampshire and researching a hair transplant, London is a realistic alternative to a local clinic, at under an hour and a half by train. This page covers how the two compare, what to check wherever you book, and what treatment day looks like logistically from the South Coast.",
    heroChips: ["Southampton or London", "Under 90 minutes to Waterloo", "What to check before booking"],
    cards: [
      {
        title: "A regional market along the coast",
        text: "Southampton patients often compare clinics in Southampton, Portsmouth, and Bournemouth before looking to London.",
      },
      {
        title: "London is within easy reach",
        text: "Fast trains reach Waterloo in around an hour and twenty minutes, so a London consultation is a simple day trip.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 20 minutes",
      trainRoute: "Southampton Central to London Waterloo, fastest direct services",
      drivingTime: "around 1 hour 45 minutes",
      drivingRoute: "M3, outside peak traffic",
      sameDayReturnNote:
        "Southampton is close enough that a same-day return is realistic even for treatment day, and many patients do it. The procedure still runs for several hours, so allow for tiredness, and take the train or arrange a lift rather than driving yourself home, which most clinics advise against after surgery.",
      nearbyTowns: ["Eastleigh", "Winchester", "Romsey", "Totton", "Chandler's Ford"],
    },
    localMarket: {
      title: "The hair transplant market for Southampton patients",
      body: [
        "Southampton has local clinics offering hair transplant surgery, and the wider South Coast market, including Portsmouth and Bournemouth, gives patients more options within an hour's travel. With London also within easy reach, few patients here are short of choice.",
        "The challenge is comparing that choice fairly. Clinics describe graft estimates, methods, and inclusions in different ways, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are often less prominent than the headline price.",
      ],
      bullets: [
        "South Coast clinics and London are both realistic options from Southampton.",
        "Ask every clinic the same questions so the answers are comparable.",
        "Headline prices rarely show the full inclusions.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Southampton",
      body: [
        "Not a great deal, logistically. At around an hour and twenty minutes to Waterloo, a London consultation fits easily into a day, and treatment day can realistically be done as a return trip. The decision is less about distance and more about whether a curated, compared set of London options offers something a local clinic does not.",
        "If you choose London, plan treatment day around recovery rather than the timetable: leave slack for the journey home after several hours in the clinic, and avoid commitments that evening. Follow-up visits are also practical from Southampton, which is worth factoring in when you ask how aftercare works.",
      ],
      bullets: [
        "A London consultation is a straightforward day trip.",
        "Treatment day can be a return trip if you allow for tiredness.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Southampton Airport has a limited international schedule, so most Hampshire patients heading to Istanbul, where most Turkish hair transplant clinics are based, fly from Heathrow, which has direct Istanbul flights, or from Gatwick. Check current schedules before planning around either.",
      airportBullet: "Heathrow, which has direct Istanbul flights, is the usual starting point from Southampton.",
    },
    answers: {
      clinic:
        "Yes. Southampton has clinics offering hair transplant procedures, and Portsmouth and Bournemouth widen the local choice. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Southampton Central to London Waterloo, the fastest direct services take around 1 hour 20 minutes. Driving usually takes around 1 hour 45 minutes on the M3 outside peak traffic.",
      overnight:
        "Usually not. Most Southampton patients can travel home the same day, even after treatment. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself.",
      worthIt:
        "From Southampton the travel is a small factor, so the decision is really about the options themselves. If a local clinic meets the standards you would check for anywhere, it may be the simpler choice. If you want a curated comparison of options, the short journey makes London easy to include.",
      travelCost:
        "Rail fares to Waterloo vary with how far ahead you book and whether you travel at peak times. Because an overnight stay is rarely needed, the extra travel cost from Southampton is usually small compared with the procedure itself.",
      turkey:
        "Yes. Most Southampton patients fly from Heathrow, which has direct Istanbul flights, or from Gatwick, rather than from Southampton Airport.",
    },
  },
  {
    city: "Brighton",
    nation: "england",
    regionPhrase: "across Sussex",
    publishedAt: "2026-09-26",
    lead: "If you are in Brighton, Hove, or elsewhere in Sussex and researching a hair transplant, London is close enough to count as a local option, at around an hour by train. This page covers how London clinics compare with those closer to home, what to check wherever you book, and how treatment day works from the coast.",
    heroChips: ["About an hour to London", "Brighton or London compared", "What to check before booking"],
    cards: [
      {
        title: "London is effectively local",
        text: "Plenty of Brighton residents commute to London daily, and a London clinic can be as easy to reach as one elsewhere in Sussex.",
      },
      {
        title: "The local market is smaller",
        text: "Brighton has fewer clinics than London, so many patients look at both before deciding.",
      },
    ],
    travel: {
      trainTime: "around 1 hour",
      trainRoute: "Brighton to London Victoria or London Bridge, fastest direct services",
      drivingTime: "around 1 hour 45 minutes",
      drivingRoute: "A23 and M23, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for both consultation and treatment day, and most Brighton patients travel home the same evening. The procedure still runs for several hours, so allow for tiredness on the way home, and take the train or arrange a lift rather than driving yourself, as most clinics advise.",
      nearbyTowns: ["Hove", "Worthing", "Lewes", "Shoreham-by-Sea", "Haywards Heath", "Eastbourne"],
    },
    localMarket: {
      title: "The hair transplant market for Brighton patients",
      body: [
        "Brighton has local clinics offering hair transplant surgery, but the choice is narrower than in London, which is around an hour away by train. For many Sussex patients, London is part of the realistic local market rather than a distant alternative.",
        "That makes a fair comparison especially important. Clinics in both places describe graft estimates, methods, and inclusions differently, and the things that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are not always given the most prominence.",
      ],
      bullets: [
        "London and Brighton clinics are both realistic options for Sussex patients.",
        "Compare what each quote includes, not just the headline figure.",
        "Ask every clinic the same questions so the answers line up.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Brighton",
      body: [
        "Logistically, very little. With direct trains reaching London in around an hour, a consultation takes less time than many people's daily commute, and treatment day can comfortably be done as a return trip. The real question is whether a curated, compared set of London options offers something a local clinic does not.",
        "If you do choose London, plan treatment day around how you will feel rather than the timetable, leaving some slack for the journey home. Returning for a follow-up check is also practical from Brighton, which is worth taking into account when you ask how a clinic handles aftercare.",
      ],
      bullets: [
        "London is roughly an hour away, which makes it a practical local option.",
        "Treatment day works as a return trip for most patients.",
        "Take the train or arrange a lift rather than driving yourself home.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Gatwick is around half an hour from Brighton, which makes it the natural starting point for Turkey, although it is worth checking which airlines are currently flying to Istanbul, where most Turkish hair transplant clinics are based. Heathrow, which has direct Istanbul flights, is the fallback.",
      airportBullet: "Gatwick is around half an hour away; check current Istanbul routes, with Heathrow as the fallback.",
    },
    answers: {
      clinic:
        "Yes. Brighton has clinics offering hair transplant procedures, and London is close enough to be part of the same practical market. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Brighton to London Victoria or London Bridge, the fastest direct services take around an hour. Driving usually takes around 1 hour 45 minutes on the A23 and M23 outside peak traffic, so the train is typically quicker.",
      overnight:
        "Usually not. Most Brighton patients travel home the same day, even after treatment. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself.",
      worthIt:
        "From Brighton the travel barely counts against London, so the decision is about the options themselves. If a local clinic meets the standards you would check for anywhere, it may be the simpler choice. If you want a curated comparison of options, London is easy to include.",
      travelCost:
        "Rail fares vary with how far ahead you book and whether you travel at peak times. Because an overnight stay is rarely needed, the added travel cost from Brighton is small compared with the procedure itself.",
      turkey:
        "Yes. Gatwick, around half an hour away, is the natural starting point, with Heathrow, which has direct Istanbul flights, as the fallback if no suitable Gatwick route is running.",
    },
  },
  {
    city: "Oxford",
    nation: "england",
    regionPhrase: "across Oxfordshire",
    publishedAt: "2026-09-26",
    lead: "If you are in Oxford or elsewhere in Oxfordshire and researching a hair transplant, London is around an hour away by train, which makes it a practical alternative to a local clinic. This page covers how the two compare, what to check wherever you book, and how treatment day works from Oxford.",
    heroChips: ["About an hour to Paddington", "Oxford or London compared", "What to check before booking"],
    cards: [
      {
        title: "London is within commuting distance",
        text: "With two direct rail routes into London, a London clinic is often as practical to reach as one elsewhere in the region.",
      },
      {
        title: "A smaller local market",
        text: "Oxford has a narrower choice of hair transplant clinics than London, so many patients consider both.",
      },
    ],
    travel: {
      trainTime: "around 1 hour",
      trainRoute: "Oxford to London Paddington, fastest direct services (Chiltern also runs to Marylebone)",
      drivingTime: "around 1 hour 30 minutes",
      drivingRoute: "M40, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for both consultation and treatment day, and most Oxford patients travel home the same evening. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself home, which most clinics advise against after surgery.",
      nearbyTowns: ["Abingdon", "Witney", "Kidlington", "Didcot", "Bicester", "Banbury"],
    },
    localMarket: {
      title: "The hair transplant market for Oxford patients",
      body: [
        "Oxford has local clinics offering hair transplant surgery, but the choice is narrower than in London, which is around an hour away on either of two direct rail routes. For many Oxfordshire patients, London is effectively part of the local market.",
        "That makes a like-for-like comparison especially valuable. Clinics describe graft estimates, methods, and inclusions differently, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are not always the ones given the most prominence.",
      ],
      bullets: [
        "London is a realistic local option for most Oxfordshire patients.",
        "Compare what each quote includes rather than the headline figures.",
        "Ask every clinic the same questions so the answers can be compared.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Oxford",
      body: [
        "Logistically, not much. At around an hour to Paddington, a consultation fits easily into a day and treatment day can comfortably be done as a return trip. The decision is less about distance and more about whether a curated, compared set of London options offers something a local clinic does not.",
        "If you choose London, plan treatment day around recovery: leave room for the journey home after several hours in the clinic, and avoid commitments that evening. Follow-up visits are also practical from Oxford, which is worth factoring in when you ask how a clinic handles aftercare.",
      ],
      bullets: [
        "A London consultation is a straightforward day trip.",
        "Treatment day works as a return trip for most patients.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Heathrow, around an hour from Oxford by road or coach, has direct flights to Istanbul, where most Turkish hair transplant clinics are based, which makes Turkey more accessible from Oxfordshire than from many parts of the UK.",
      airportBullet: "Heathrow, around an hour away, has direct Istanbul flights.",
    },
    answers: {
      clinic:
        "Yes. Oxford has clinics offering hair transplant procedures, and London is close enough to be part of the same practical market. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Oxford to London Paddington, the fastest direct services take around an hour, and Chiltern Railways also runs direct to Marylebone. Driving usually takes around 1 hour 30 minutes on the M40 outside peak traffic.",
      overnight:
        "Usually not. Most Oxford patients travel home the same day, even after treatment. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself.",
      worthIt:
        "From Oxford the travel is a minor factor, so the decision is really about the options. If a local clinic meets the standards you would check for anywhere, it may be the simpler choice. If you want a curated comparison of options, London is easy to include.",
      travelCost:
        "Rail fares vary with how far ahead you book and whether you travel at peak times. Because an overnight stay is rarely needed from Oxford, the added travel cost is usually small compared with the procedure itself.",
      turkey:
        "Yes. Heathrow, around an hour from Oxford, has direct Istanbul flights, which makes Turkey a relatively accessible option from Oxfordshire.",
    },
  },
  {
    city: "Cambridge",
    nation: "england",
    regionPhrase: "across Cambridgeshire",
    publishedAt: "2026-09-26",
    lead: "If you are in Cambridge or elsewhere in Cambridgeshire and researching a hair transplant, London is under an hour away by fast train, which makes it a practical alternative to a local clinic. This page covers how the two compare, what to check wherever you book, and how treatment day works from Cambridge.",
    heroChips: ["Under an hour to King's Cross", "Cambridge or London compared", "What to check before booking"],
    cards: [
      {
        title: "London is closer than most alternatives",
        text: "Fast trains reach King's Cross in around fifty minutes, quicker than reaching many clinics elsewhere in the region.",
      },
      {
        title: "A smaller local market",
        text: "Cambridge has a narrower choice of hair transplant clinics than London, so many patients consider both.",
      },
    ],
    travel: {
      trainTime: "around 50 minutes",
      trainRoute: "Cambridge to London King's Cross, fastest direct services (Liverpool Street also served)",
      drivingTime: "around 1 hour 45 minutes",
      drivingRoute: "M11, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for both consultation and treatment day, and most Cambridge patients travel home the same evening. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself, which most clinics advise against after surgery.",
      nearbyTowns: ["Ely", "Huntingdon", "St Neots", "Newmarket", "Royston", "Saffron Walden"],
    },
    localMarket: {
      title: "The hair transplant market for Cambridge patients",
      body: [
        "Cambridge has local clinics offering hair transplant surgery, but the choice is narrower than in London, which fast trains reach in around fifty minutes. For many Cambridgeshire patients, London is simply part of the local market.",
        "That makes a fair comparison all the more important. Clinics describe graft estimates, methods, and inclusions in different ways, and the points that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are not always given the most space.",
      ],
      bullets: [
        "London is a realistic local option for most Cambridge patients.",
        "Compare what each quote includes, not just the headline price.",
        "Ask every clinic the same questions so the answers line up.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Cambridge",
      body: [
        "Very little, logistically. At around fifty minutes to King's Cross, a London consultation fits easily into a morning, and treatment day can comfortably be a return trip. The decision is really about whether a curated, compared set of London options offers something a local clinic does not.",
        "If you choose London, plan treatment day around recovery rather than the timetable, leaving room for the journey home after several hours in the clinic. Follow-up visits are also easy from Cambridge, which is worth factoring in when you ask how a clinic handles aftercare.",
      ],
      bullets: [
        "A London consultation can fit into a morning.",
        "Treatment day works as a return trip for most patients.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Stansted is around forty minutes from Cambridge and has had direct flights to Istanbul, where most Turkish hair transplant clinics are based, but schedules change, so check what is currently running. Heathrow, which has direct Istanbul flights, is the fallback.",
      airportBullet: "Stansted is close by; check its current Istanbul routes, with Heathrow as the fallback.",
    },
    answers: {
      clinic:
        "Yes. Cambridge has clinics offering hair transplant procedures, and London is close enough to be part of the same practical market. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Cambridge to London King's Cross, the fastest direct services take around 50 minutes, and trains also run to Liverpool Street. Driving usually takes around 1 hour 45 minutes on the M11 outside peak traffic.",
      overnight:
        "Usually not. Most Cambridge patients travel home the same day, even after treatment. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself.",
      worthIt:
        "From Cambridge the travel is barely a factor, so the decision is about the options themselves. If a local clinic meets the standards you would check for anywhere, it may be the simpler choice. If you want a curated comparison of options, London is easy to include.",
      travelCost:
        "Rail fares vary with how far ahead you book and whether you travel at peak times. Because an overnight stay is rarely needed from Cambridge, the added travel cost is usually small compared with the procedure itself.",
      turkey:
        "Yes. Stansted, around forty minutes away, has had direct Istanbul flights, and Heathrow, which has direct Istanbul flights, is the fallback.",
    },
  },
  {
    city: "Reading",
    nation: "england",
    regionPhrase: "across Berkshire",
    publishedAt: "2026-09-26",
    lead: "If you are in Reading or elsewhere in Berkshire and researching a hair transplant, London is around twenty-five minutes away by fast train, which makes it as practical as any local clinic. This page covers how to compare the options, what to check wherever you book, and why distance is barely a factor from Reading.",
    heroChips: ["25 minutes to Paddington", "Reading or London compared", "What to check before booking"],
    cards: [
      {
        title: "London is effectively local",
        text: "Fast trains reach Paddington in around twenty-five minutes, so a central London clinic can be quicker to reach than one across the county.",
      },
      {
        title: "Choice is not the problem",
        text: "Between Reading, the Thames Valley, and London, the challenge is comparing options fairly rather than finding them.",
      },
    ],
    travel: {
      trainTime: "around 25 minutes",
      trainRoute: "Reading to London Paddington, fastest direct services (the Elizabeth line also runs direct)",
      drivingTime: "around 1 hour",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "Reading is close enough that a same-day return is the norm for both consultation and treatment day. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself home, which most clinics advise against after surgery.",
      nearbyTowns: ["Wokingham", "Bracknell", "Newbury", "Henley-on-Thames", "Maidenhead"],
    },
    localMarket: {
      title: "The hair transplant market for Reading patients",
      body: [
        "Reading has local clinics offering hair transplant surgery, and the wider Thames Valley adds more. But with fast trains reaching Paddington in around twenty-five minutes, London sits firmly inside the realistic local market, and for many Reading patients it is the most accessible option of all.",
        "With that much choice, the hard part is comparing fairly. Clinics describe graft estimates, methods, and inclusions differently, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are rarely the ones given the most prominence.",
      ],
      bullets: [
        "London is part of the local market for most Reading patients.",
        "More choice makes a structured comparison more important, not less.",
        "Ask every clinic the same questions so the answers are comparable.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Reading",
      body: [
        "Almost nothing, logistically. A London appointment from Reading takes less travel time than many people spend commuting, so the decision rests entirely on the options themselves: whether a curated, compared set of London clinics offers something a local one does not.",
        "Treatment day is simply a return trip for most Reading patients. Leave some slack for the journey home after several hours in the clinic, and ask how follow-up works, although returning for a check is easy from here.",
      ],
      bullets: [
        "Distance is not a meaningful factor between Reading and London.",
        "Treatment day is a return trip for almost everyone.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Heathrow is under an hour from Reading and has direct flights to Istanbul, where most Turkish hair transplant clinics are based, which makes Turkey unusually accessible from Berkshire.",
      airportBullet: "Heathrow, under an hour away, has direct Istanbul flights.",
    },
    answers: {
      clinic:
        "Yes. Reading has clinics offering hair transplant procedures, and London is close enough that most patients treat it as part of the same market. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Reading to London Paddington, the fastest direct services take around 25 minutes, and the Elizabeth line also runs direct into central London. Driving usually takes around an hour on the M4 outside peak traffic.",
      overnight:
        "No. Reading patients almost always travel home the same day, even after treatment. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself.",
      worthIt:
        "From Reading, travel is not really a factor, so the question is simply which option meets your standards best. If a local clinic does, it may be the simpler choice. If you want a curated comparison of options, London is as easy to include as anywhere closer.",
      travelCost:
        "Rail fares to Paddington vary with how far ahead you book and whether you travel at peak times, but from Reading the added cost is small and an overnight stay is almost never needed.",
      turkey:
        "Yes. Heathrow is under an hour from Reading and has direct Istanbul flights, which makes Turkey unusually accessible from Berkshire.",
    },
  },
  {
    city: "Coventry",
    nation: "england",
    regionPhrase: "across the West Midlands",
    publishedAt: "2026-09-26",
    lead: "If you are in Coventry or elsewhere in Warwickshire and researching a hair transplant, you sit between two major markets: Birmingham, around twenty minutes away, and London, around an hour by direct train. This page covers how those options compare, what to check wherever you book, and what treatment day involves from Coventry.",
    heroChips: ["Birmingham or London", "About an hour to Euston", "What to check before booking"],
    cards: [
      {
        title: "Two big markets within reach",
        text: "Birmingham is around twenty minutes away and London about an hour, so Coventry patients have more choice than the city's size suggests.",
      },
      {
        title: "London is a realistic day trip",
        text: "Direct trains reach Euston in around an hour, making a London consultation easy to fit in.",
      },
    ],
    travel: {
      trainTime: "around 1 hour",
      trainRoute: "Coventry to London Euston, fastest direct services",
      drivingTime: "around 2 hours",
      drivingRoute: "M1, outside peak traffic",
      sameDayReturnNote:
        "Coventry is close enough that a same-day return is realistic even for treatment day, and most patients do it. The procedure still runs for several hours, so allow for tiredness, and take the train or arrange a lift rather than driving yourself home, which most clinics advise against after surgery.",
      nearbyTowns: ["Nuneaton", "Kenilworth", "Leamington Spa", "Rugby", "Bedworth", "Warwick"],
    },
    localMarket: {
      title: "The hair transplant market for Coventry patients",
      body: [
        "Coventry has local clinics offering hair transplant surgery, but most patients here also look at Birmingham, which has one of the larger markets outside London and is around twenty minutes away by train. With London itself about an hour away, Coventry patients have a genuinely wide choice.",
        "Wide choice only helps if the comparison is fair. Clinics describe graft estimates, methods, and inclusions differently, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are often less prominent than the headline price.",
      ],
      bullets: [
        "Birmingham is effectively part of the Coventry patient's local market.",
        "London is close enough to include in the same comparison.",
        "Ask every clinic the same questions so the answers line up.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Coventry",
      body: [
        "Logistically, not much. At around an hour to Euston, a London consultation fits easily into a day, and treatment day can realistically be a return trip. The decision is really about whether a curated, compared set of London options offers something a Coventry or Birmingham clinic does not.",
        "If you choose London, plan treatment day with recovery in mind, leaving slack for the journey home after several hours in the clinic. Follow-up visits are also practical from Coventry, which is worth considering when you ask how a clinic handles aftercare.",
      ],
      bullets: [
        "A London consultation is an easy day trip from Coventry.",
        "Treatment day works as a return trip for most patients.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Birmingham Airport, around twenty minutes from Coventry, has direct flights to Istanbul, where most Turkish hair transplant clinics are based, which makes Turkey unusually easy to reach from Warwickshire.",
      airportBullet: "Birmingham Airport, around twenty minutes away, has direct Istanbul flights.",
    },
    answers: {
      clinic:
        "Yes. Coventry has clinics offering hair transplant procedures, and Birmingham's larger market is around twenty minutes away. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Coventry to London Euston, the fastest direct services take around an hour. Driving usually takes around 2 hours on the M1 outside peak traffic, so the train is typically quicker.",
      overnight:
        "Usually not. Most Coventry patients travel home the same day, even after treatment. Allow for tiredness after several hours in the clinic, and take the train or arrange a lift rather than driving yourself.",
      worthIt:
        "From Coventry the travel is a small factor, so the decision is about the options themselves. If a clinic in Coventry or Birmingham meets the standards you would check for anywhere, it may be the simpler choice. If you want a curated comparison of options, London is easy to include.",
      travelCost:
        "Rail fares to Euston vary with how far ahead you book and whether you travel at peak times. Because an overnight stay is rarely needed, the added travel cost from Coventry is usually small.",
      turkey: "Yes. Birmingham Airport, around twenty minutes from Coventry, has direct Istanbul flights.",
    },
  },
  {
    city: "Portsmouth",
    nation: "england",
    regionPhrase: "along the South Coast",
    publishedAt: "2026-09-26",
    lead: "If you are in Portsmouth or elsewhere in south east Hampshire and researching a hair transplant, the realistic options are a clinic on the South Coast or travelling to London, which is around an hour and forty minutes by direct train. This page covers how those compare, what to check wherever you book, and what treatment day involves.",
    heroChips: ["Portsmouth, Southampton or London", "Direct trains to Waterloo", "What to check before booking"],
    cards: [
      {
        title: "The South Coast is one market",
        text: "With Southampton under an hour away, many Portsmouth patients compare clinics in both cities.",
      },
      {
        title: "London is a manageable trip",
        text: "Direct trains reach Waterloo in around an hour and forty minutes, so a London consultation fits into a day.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 40 minutes",
      trainRoute: "Portsmouth & Southsea to London Waterloo, fastest direct services",
      drivingTime: "around 2 hours",
      drivingRoute: "A3, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is straightforward for a consultation. For treatment day, some Portsmouth patients travel home the same evening and others prefer a night in London, depending on how they expect to feel after several hours in the clinic. Most clinics advise against driving yourself home after surgery.",
      nearbyTowns: ["Gosport", "Fareham", "Havant", "Waterlooville", "Chichester", "Petersfield"],
    },
    localMarket: {
      title: "The hair transplant market for Portsmouth patients",
      body: [
        "Portsmouth has local clinics offering hair transplant surgery, and Southampton, less than an hour away, adds considerably to the choice. Many patients in south east Hampshire and West Sussex compare options along the coast before deciding whether London is worth including.",
        "The difficult part is comparing fairly. Clinics describe graft estimates, methods, and inclusions differently, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are often less prominent than the headline price.",
      ],
      bullets: [
        "Portsmouth and Southampton together form the realistic local market.",
        "Compare what each quote includes rather than the headline figures.",
        "Ask every clinic the same questions so the answers can be compared.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Portsmouth",
      body: [
        "At around an hour and forty minutes by direct train, London is a practical option from Portsmouth rather than a major journey. It tends to suit patients who want a curated, compared set of options rather than one clinic's own recommendation, while others find a strong South Coast clinic covers what they need.",
        "The consultation fits comfortably into a day. For treatment day, decide in advance whether to travel home the same evening or stay overnight, bearing in mind the length of the procedure, and ask how follow-up will work once you are back on the coast.",
      ],
      bullets: [
        "A London consultation is a comfortable day trip from Portsmouth.",
        "Treatment day can be a return trip, but an overnight stay is often easier.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Most Portsmouth patients heading to Istanbul, where most Turkish hair transplant clinics are based, fly from Heathrow, which has direct Istanbul flights, or from Gatwick, since Southampton Airport's international schedule is limited. Check current schedules before planning around any route.",
      airportBullet: "Heathrow, which has direct Istanbul flights, is the usual starting point from Portsmouth.",
    },
    answers: {
      clinic:
        "Yes. Portsmouth has clinics offering hair transplant procedures, and Southampton widens the local choice. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Portsmouth & Southsea to London Waterloo, the fastest direct services take around 1 hour 40 minutes. Driving usually takes around 2 hours on the A3 outside peak traffic.",
      overnight:
        "Not necessarily. Some Portsmouth patients travel home the same evening after treatment, while others prefer to stay overnight given the length of the procedure. Either way, avoid driving yourself home straight afterwards.",
      worthIt:
        "It depends what you are looking for. If a clinic on the South Coast meets the standards you would check for anywhere, booking locally is simpler. The direct rail link makes a curated comparison of London options practical, so some patients consider both.",
      travelCost:
        "Rail fares to Waterloo vary with how far ahead you book and whether you travel at peak times, and an overnight stay adds a hotel cost. Both are modest against the procedure itself, but worth including.",
      turkey: "Yes. Most Portsmouth patients fly from Heathrow, which has direct Istanbul flights, or from Gatwick.",
    },
  },
  {
    city: "York",
    nation: "england",
    regionPhrase: "across North Yorkshire",
    publishedAt: "2026-09-26",
    lead: "If you are in York or elsewhere in North Yorkshire and researching a hair transplant, London is closer than many people assume, at under two hours on the fastest trains. This page covers how London compares with clinics in York and Leeds, what to check wherever you book, and what treatment day involves.",
    heroChips: ["York, Leeds or London", "Under two hours to King's Cross", "What to check before booking"],
    cards: [
      {
        title: "Leeds is part of the local market",
        text: "With Leeds around twenty-five minutes away by train, many York patients compare clinics in both cities.",
      },
      {
        title: "London is surprisingly close",
        text: "Fast LNER trains reach King's Cross in under two hours, which makes a London consultation a realistic day trip.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 50 minutes",
      trainRoute: "York to London King's Cross, fastest direct LNER services",
      drivingTime: "around 4 hours",
      drivingRoute: "A1(M), outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for a consultation. For treatment day, some York patients travel home the same evening, but many prefer a night in London given the length of the procedure and the journey afterwards. Most clinics advise against driving yourself home after surgery.",
      nearbyTowns: ["Selby", "Malton", "Tadcaster", "Pocklington", "Easingwold", "Thirsk"],
    },
    localMarket: {
      title: "The hair transplant market for York patients",
      body: [
        "York has a smaller hair transplant market than Leeds, which is around twenty-five minutes away by train, so many North Yorkshire patients compare clinics in both cities. Because York sits on the East Coast Main Line, London is also more accessible than the distance suggests.",
        "More options only help if the comparison is fair. Clinics present graft estimates, methods, and inclusions differently, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are often less visible than the headline price.",
      ],
      bullets: [
        "York and Leeds together make up the realistic local market.",
        "Fast trains put London within realistic reach.",
        "Ask every clinic the same questions so the answers can be compared.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from York",
      body: [
        "With fast trains reaching King's Cross in under two hours, London is a practical option from York rather than a major expedition. It tends to suit patients who want a curated, compared set of options rather than one clinic's recommendation. For others, a strong clinic in York or Leeds covers what they need.",
        "The consultation fits into a day. For treatment day, many York patients stay overnight rather than face the journey straight after several hours in the clinic, and it is worth asking how follow-up works once you are back in North Yorkshire.",
      ],
      bullets: [
        "A London consultation is a realistic day trip from York.",
        "Consider an overnight stay for treatment day.",
        "Ask how remote aftercare works before committing to a clinic further away.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Leeds Bradford Airport, the closest to York, has had varying direct routes to Turkey, so check current schedules. Otherwise Manchester Airport, which has direct flights to Istanbul, where most Turkish hair transplant clinics are based, is the usual alternative.",
      airportBullet: "Check Leeds Bradford Airport first, with Manchester as the usual fallback for Istanbul.",
    },
    answers: {
      clinic:
        "Yes. York has clinics offering hair transplant procedures, and Leeds is close enough that many patients consider both. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from York to London King's Cross, the fastest direct LNER services take around 1 hour 50 minutes. Driving usually takes around 4 hours on the A1(M), so the train is far quicker.",
      overnight:
        "Not necessarily, but many York patients do. The procedure runs for several hours, and while a same-day return is possible on fast trains, an overnight stay makes for a more comfortable start to recovery.",
      worthIt:
        "It depends what you are optimising for. If a clinic in York or Leeds meets the standards you would check for anywhere, booking locally is simpler. The fast rail link makes a curated comparison of London options practical, so some York patients consider both.",
      travelCost:
        "Rail fares to King's Cross vary with how far ahead you book and whether you travel at peak times, and an overnight stay adds a hotel cost. Include both when comparing against a local quote.",
      turkey:
        "Yes, depending on current schedules from Leeds Bradford Airport. Where no suitable route is running, Manchester Airport, which has direct Istanbul flights, is the usual alternative.",
    },
  },
  {
    city: "Bath",
    nation: "england",
    regionPhrase: "across the South West",
    publishedAt: "2026-09-26",
    lead: "If you are in Bath or elsewhere in Bath and North East Somerset and researching a hair transplant, your realistic options include clinics in Bath and Bristol as well as London, which is under an hour and a half by direct train. This page covers how those compare, what to check wherever you book, and what treatment day involves.",
    heroChips: ["Bath, Bristol or London", "Direct trains to Paddington", "What to check before booking"],
    cards: [
      {
        title: "Bristol is on the doorstep",
        text: "Bristol is around fifteen minutes away by train, so most Bath patients compare clinics in both cities.",
      },
      {
        title: "London is a comfortable day trip",
        text: "Direct trains reach Paddington in around an hour and twenty-five minutes.",
      },
    ],
    travel: {
      trainTime: "around 1 hour 25 minutes",
      trainRoute: "Bath Spa to London Paddington, fastest direct services",
      drivingTime: "around 2 hours 30 minutes",
      drivingRoute: "M4, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is easy for a consultation. For treatment day it is realistic too, and many Bath patients travel home the same evening, though some prefer a night in London given the length of the procedure. Most clinics advise against driving yourself home after surgery.",
      nearbyTowns: ["Frome", "Trowbridge", "Bradford-on-Avon", "Chippenham", "Radstock", "Midsomer Norton"],
    },
    localMarket: {
      title: "The hair transplant market for Bath patients",
      body: [
        "Bath has a smaller hair transplant market than Bristol, which is around fifteen minutes away by train and has the widest choice in the South West. In practice, most Bath patients treat the two cities as one local market, with London as the main alternative.",
        "That choice is useful, but only with a fair comparison. Clinics describe graft estimates, methods, and inclusions differently, and the details that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are not always the ones advertised most prominently.",
      ],
      bullets: [
        "Bath and Bristol together form the realistic local market.",
        "London is close enough to include in the same comparison.",
        "Compare what each quote includes rather than the headline figures.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Bath",
      body: [
        "At around an hour and twenty-five minutes to Paddington, London is a practical option from Bath rather than a major journey. It tends to appeal to patients who want a curated, compared set of options rather than a single clinic's recommendation, while others find a strong Bath or Bristol clinic covers everything they need.",
        "The consultation is a straightforward day trip. For treatment day, decide in advance whether you will travel home the same evening or stay overnight, and ask how follow-up works once you are back in Somerset.",
      ],
      bullets: [
        "A London consultation is an easy day trip from Bath Spa.",
        "Treatment day works as a return trip for many patients.",
        "Take the train or arrange a lift rather than driving after surgery.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Bristol Airport, the nearest to Bath, has mostly offered seasonal holiday flights to Turkey rather than Istanbul, where most Turkish hair transplant clinics are based, so many Bath patients fly from Heathrow, which has direct Istanbul flights. Check current schedules before planning around either.",
      airportBullet: "Heathrow, which has direct Istanbul flights, is the usual choice from Bath.",
    },
    answers: {
      clinic:
        "Yes. Bath has clinics offering hair transplant procedures, and Bristol's larger market is around fifteen minutes away. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Bath Spa to London Paddington, the fastest direct services take around 1 hour 25 minutes. Driving usually takes around 2 hours 30 minutes on the M4 outside peak traffic.",
      overnight:
        "Not necessarily. Many Bath patients travel home the same evening after treatment, although some prefer to stay overnight given the length of the procedure. Either way, avoid driving yourself home straight afterwards.",
      worthIt:
        "It depends what you are looking for. If a clinic in Bath or Bristol meets the standards you would check for anywhere, booking locally is simpler. The direct rail link means a curated comparison of London options costs relatively little to include.",
      travelCost:
        "Rail fares to Paddington vary with how far ahead you book and whether you travel at peak times, and an optional overnight stay adds a hotel cost. Both are modest compared with the procedure itself.",
      turkey:
        "Yes. Most Bath patients fly from Heathrow, which has direct Istanbul flights, since Bristol Airport's Turkey routes have mainly been seasonal holiday flights.",
    },
  },
  {
    city: "Exeter",
    nation: "england",
    regionPhrase: "across Devon",
    publishedAt: "2026-09-26",
    lead: "If you are in Exeter or elsewhere in Devon and researching a hair transplant, you will usually be weighing a local clinic, one in Bristol, or travelling to London, which is around two hours by direct train. This page covers how those options compare, what to check wherever you book, and what treatment day involves from the South West.",
    heroChips: ["Exeter, Bristol or London", "Around two hours to Paddington", "What to check before booking"],
    cards: [
      {
        title: "A smaller regional market",
        text: "Devon has fewer hair transplant clinics than the big cities, so many patients widen their search to Bristol or London.",
      },
      {
        title: "London is a long day but doable",
        text: "Direct trains reach Paddington in around two hours, which makes a London consultation realistic as a day trip.",
      },
    ],
    travel: {
      trainTime: "around 2 hours 5 minutes",
      trainRoute: "Exeter St Davids to London Paddington, fastest direct services",
      drivingTime: "around 3 hours 15 minutes",
      drivingRoute: "M5 and M4, or the A303, outside peak traffic",
      sameDayReturnNote:
        "A same-day return is realistic for a consultation, with direct trains reaching Paddington in around two hours. For treatment day most Exeter patients stay in London overnight, since the procedure runs for several hours and a two-hour journey straight afterwards is not a comfortable start to recovery.",
      nearbyTowns: ["Exmouth", "Newton Abbot", "Tiverton", "Crediton", "Honiton", "Torquay"],
    },
    localMarket: {
      title: "The hair transplant market for Exeter patients",
      body: [
        "Exeter and the rest of Devon have a smaller hair transplant market than the major cities, so many patients widen their search to Bristol, around an hour away by train, or to London. A smaller local market is not a problem in itself, but it does mean fewer options to compare close to home.",
        "Whichever direction you look, the same comparison applies. Clinics describe graft estimates, methods, and inclusions differently, and the points that matter most (who performs the procedure, how the clinic is regulated, and what the quote covers) are rarely the ones given most prominence.",
      ],
      bullets: [
        "Bristol and London are both realistic options for Exeter patients.",
        "A smaller local market means comparing carefully, not settling for the nearest option.",
        "Ask every clinic the same questions so the answers line up.",
      ],
    },
    londonRoute: {
      title: "What changes if you travel to London from Exeter",
      body: [
        "At around two hours by direct train, London is a realistic option from Exeter, though it is still a full day out. It tends to suit patients who want a curated, compared set of options rather than one clinic's recommendation. For others, a strong clinic in the South West is the more practical choice.",
        "The consultation works as a day trip, or it can be done by video first. For treatment day, plan to stay overnight, and ask in detail how aftercare works at a distance, since popping back for a quick check will not be practical from Devon.",
      ],
      bullets: [
        "A London consultation is realistic as a day trip, or by video first.",
        "Plan an overnight stay for treatment day.",
        "Remote aftercare arrangements matter more the further you live from the clinic.",
      ],
    },
    turkey: {
      airport:
        "London is not the only alternative to a local clinic. Exeter Airport's Turkey flights have mostly been seasonal holiday routes rather than Istanbul, where most Turkish hair transplant clinics are based, so many Devon patients fly from Bristol or Heathrow instead, depending on which routes are running. Heathrow has direct Istanbul flights.",
      airportBullet: "Istanbul from Exeter usually means flying from Heathrow or Bristol.",
    },
    answers: {
      clinic:
        "Yes. Exeter has clinics offering hair transplant procedures, and many Devon patients also consider Bristol and London. The location of a clinic does not tell you whether it meets a strong standard, so the same checks apply wherever you book.",
      howLong:
        "By train from Exeter St Davids to London Paddington, the fastest direct services take around 2 hours 5 minutes. Driving usually takes around 3 hours 15 minutes via the M5 and M4 or the A303.",
      overnight:
        "Most Exeter patients stay overnight after treatment day. The procedure runs for several hours, and a two-hour journey straight afterwards is not ideal. A consultation works well as a day trip.",
      worthIt:
        "It depends what you are optimising for. If a clinic in Devon or Bristol meets the standards you would check for anywhere, the shorter journey is a real advantage. Patients who choose London usually want a curated comparison of options, and from Exeter that trade-off is worth thinking through.",
      travelCost:
        "Rail fares to Paddington vary widely with how far ahead you book, and treatment day usually adds a London hotel night. Include both when comparing against a local quote.",
      turkey:
        "Yes. Most Exeter patients fly from Heathrow, which has direct Istanbul flights, or from Bristol, since Exeter Airport's Turkey routes have mainly been seasonal holiday flights.",
    },
  },
];
