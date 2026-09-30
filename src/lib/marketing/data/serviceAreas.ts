/**
 * City pages kept at their original kjslaw.com URLs so the rankings and
 * links those URLs earned carry over. Copy is refreshed and local: where
 * cases are filed, where people are treated, which corridors and venues
 * generate claims. No statistics are quoted that the firm cannot source.
 */
export type ServiceAreaData = {
  key: string;
  path: string;
  city: string;
  title: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  introTitle: string;
  intro: string[];
  keyPoints: { title: string; body: string }[];
  matters: string[];
  local: { label: string; items: string[] }[];
  faqs: { question: string; answer: string }[];
  guideSlugs: string[];
  relatedPracticePaths: string[];
};

export const serviceAreas: ServiceAreaData[] = [
  {
    key: 'anaheim',
    path: '/anaheim-personal-injury-attorney',
    city: 'Anaheim',
    title: 'Anaheim Personal Injury Attorney',
    eyebrow: 'Serving Anaheim from the Tustin office',
    description:
      'Representation for people injured in Anaheim car and truck collisions, falls and unsafe-property incidents at resorts, stadiums, hotels, and stores, dog bites, and other preventable injuries.',
    metaDescription:
      'Anaheim personal injury attorney Kyle Scott represents people hurt in car accidents, falls at resorts and venues, dog bites, and other negligence claims. Free consultation, no fee unless there is a recovery.',
    introTitle: 'Anaheim injuries happen where the county gathers: its freeways, its resort district, and its venues.',
    intro: [
      'Anaheim is Orange County’s largest city by population and its busiest visitor destination. The Disneyland Resort, Angel Stadium, the Honda Center, and the Anaheim Convention Center draw millions of people a year onto Harbor Boulevard, Katella Avenue, and the I-5, SR-57, and SR-91 corridors that feed them. That volume produces the claims Kyle Scott Law handles: collisions with commuters, rideshare drivers, tour buses, and commercial trucks; falls in hotels, parking structures, restaurants, and retail; and injuries on premises that are open to the public and responsible for keeping it safe.',
      'The firm represents Anaheim clients from its office in Tustin, a short drive down the 55 or the 5. Every claim starts with a free, confidential review of what happened, who may be responsible, which insurance policies apply, and which deadlines are already running.',
    ],
    keyPoints: [
      { title: 'Resort and venue premises claims', body: 'Hotels, theme parks, stadiums, and their contractors owe visitors a duty to inspect and fix hazards. Incident reports, surveillance footage, and maintenance logs are requested early, before they are overwritten.' },
      { title: 'Corridor collisions', body: 'Crashes on the 5, 57, and 91 and on Harbor, Katella, State College, and Ball Road often involve out-of-town drivers, rental cars, rideshares, and commercial vehicles — each with its own insurer and its own adjuster.' },
      { title: 'Public agencies', body: 'An OCTA bus, an Anaheim Resort Transportation shuttle, a city vehicle, or a dangerous public road condition changes the rules: a government claim generally must be presented within six months, well before the ordinary lawsuit deadline.' },
      { title: 'Injured visitors', body: 'People hurt in Anaheim who live elsewhere in California, out of state, or abroad can still bring a claim here. The firm coordinates treatment records and communication so distance does not weaken the case.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on the 5, 57, and 91 and Anaheim surface streets',
      'Falls and injuries at hotels, theme parks, restaurants, stores, and parking structures',
      'Pedestrian and bicycle injuries in the resort district and near the Platinum Triangle',
      'Injuries involving OCTA buses, shuttles, and city property',
      'Dog bites and animal attacks in Anaheim neighborhoods and parks',
      'Traumatic brain injuries and serious orthopedic injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Where people are treated', items: ['UCI Health — Anaheim (formerly Anaheim Global Medical Center)', 'Anaheim Regional Medical Center (AHMC)', 'Kaiser Permanente Orange County — Anaheim Medical Center'] },
      { label: 'Reports and agencies', items: ['Anaheim Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 5, 57, and 91', 'Orange County Animal Care for bite reports'] },
    ],
    faqs: [
      { question: 'Where would an Anaheim injury case be filed?', answer: 'Most Anaheim personal injury lawsuits are filed in the Orange County Superior Court in Santa Ana. Many claims resolve with the insurer before a lawsuit is filed; if one is needed, Kyle Scott Law has tried cases in that court for more than 30 years.' },
      { question: 'Do I need to come to the office?', answer: 'No. The first consultation is by phone or video, and the firm can arrange to meet in person when a case needs it. The Tustin office is a short drive from Anaheim for anything that requires a visit.' },
      { question: 'I was hurt at a resort or stadium. Who is responsible?', answer: 'It depends on who controlled the area and what caused the injury: the venue, a contractor, a security company, or another guest. The firm identifies every potentially responsible party and the insurance behind each one, and asks for incident reports and video before they disappear.' },
      { question: 'What if a city bus or public agency was involved?', answer: 'Claims against public entities follow a separate, shorter process — a written government claim is generally required within six months of the incident. That deadline is one reason to have the facts reviewed promptly.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'government-injury-claim-orange-county', 'prove-slip-and-fall-california', 'personal-injury-evidence-checklist-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/dog-bite-attorney-in-orange-county', '/orange-county-traumatic-brain-injury-attorney'],
  },
  {
    key: 'irvine',
    path: '/irvine-personal-injury-attorneys',
    city: 'Irvine',
    title: 'Irvine Personal Injury Attorneys',
    eyebrow: 'Serving Irvine from the Tustin office',
    description:
      'Representation for people injured in Irvine collisions on the 405, the 5, and the toll roads, bicycle and pedestrian injuries, falls at offices and shopping centers, and other negligence claims.',
    metaDescription:
      'Irvine personal injury attorneys at Kyle Scott Law represent people hurt in car, rideshare, bicycle, and pedestrian accidents and unsafe-property incidents. Free consultation, no fee unless there is a recovery.',
    introTitle: 'Irvine is planned around its roads and its workplaces, and that is where its injuries happen.',
    intro: [
      'Irvine’s master-planned layout moves an enormous daily population — residents, UC Irvine students, and commuters to the business parks and the Spectrum — along the 405, the 5, Jamboree, Culver, Irvine Center Drive, and the 133, 241, and 261 toll roads. The same design that makes the city orderly produces high-speed arterial collisions, rideshare and delivery-vehicle crashes, and, on one of the county’s largest bicycle networks, serious injuries to riders and pedestrians.',
      'Kyle Scott Law represents Irvine clients from its office minutes away in Tustin. The firm’s work begins with the facts: how the collision or incident happened, which drivers, employers, property owners, and insurers may be responsible, and what the injuries mean for work, school, and daily life.',
    ],
    keyPoints: [
      { title: 'Arterial and freeway collisions', body: 'High-speed crashes on the 405 and 5 and on wide arterials like Jamboree and Culver often involve serious injuries and disputed fault. Physical evidence, camera footage, and vehicle data are preserved early.' },
      { title: 'Cyclists and pedestrians', body: 'Irvine’s trails and bike lanes bring riders into contact with turning traffic at intersections. A collision claim for a cyclist or pedestrian is built from the same evidence as any crash — and may involve the driver’s auto policy and the rider’s own coverage.' },
      { title: 'Rideshare, delivery, and company vehicles', body: 'Uber, Lyft, delivery fleets, and employees driving for work each bring different insurance layers. Identifying every policy that applies is often the difference in what a claim is worth.' },
      { title: 'Offices, retail, and multifamily property', body: 'Falls and injuries in business parks, shopping centers, apartment communities, and garages turn on who controlled the area and what they knew about the hazard.' },
    ],
    matters: [
      'Car, truck, and rideshare collisions on the 405, the 5, the toll roads, and Irvine arterials',
      'Bicycle and pedestrian injuries at intersections and on shared paths',
      'Falls and unsafe-property injuries at shopping centers, office campuses, and apartment communities',
      'Injuries to students and visitors near UC Irvine and the Spectrum',
      'Dog bites in Irvine neighborhoods and parks',
      'Traumatic brain and spinal injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Where people are treated', items: ['Hoag Hospital Irvine', 'Kaiser Permanente Irvine Medical Center', 'UCI Medical Center in Orange — the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Irvine Police Department for collisions on city streets', 'California Highway Patrol for the 405, the 5, and the toll roads', 'Orange County Animal Care for bite reports'] },
    ],
    faqs: [
      { question: 'Where would an Irvine injury case be filed?', answer: 'In the Orange County Superior Court in Santa Ana. Most claims are resolved with the insurer before a lawsuit becomes necessary; when one is filed, the firm handles it in that court.' },
      { question: 'I was hit while cycling. Do I have a claim?', answer: 'Often, yes. A driver who fails to yield, turns across a bike lane, or opens a door into a rider can be responsible for the injuries. The police report, witness information, and any camera footage matter, and so does getting evaluated for injuries promptly.' },
      { question: 'The other driver was working — for a rideshare or a company. Does that change anything?', answer: 'It can change which insurance applies and how much coverage exists. Rideshare companies carry commercial coverage that applies in certain phases of a trip, and employers can be responsible for employees driving for work. The firm sorts out every layer.' },
      { question: 'Do you meet Irvine clients in person?', answer: 'The Tustin office is minutes from Irvine, and the first consultation is by phone or video. In-person meetings are arranged whenever a case calls for it.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'uninsured-driver-accident-california', 'partly-at-fault-california-personal-injury', 'how-much-is-personal-injury-case-worth-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/orange-county-traumatic-brain-injury-attorney', '/personal-injury-lawyer-orange-county'],
  },
  {
    key: 'santa-ana',
    path: '/santa-ana-personal-injury-attorney',
    city: 'Santa Ana',
    title: 'Santa Ana Personal Injury Attorney',
    eyebrow: 'Serving Santa Ana from the Tustin office',
    description:
      'Representation for people injured in Santa Ana car and pedestrian collisions, falls at stores and apartment properties, dog bites, and other negligence claims — in English and Spanish.',
    metaDescription:
      'Santa Ana personal injury attorney Kyle Scott represents people hurt in car and pedestrian accidents, falls, and dog bites. Bilingual intake, free consultation, no fee unless there is a recovery.',
    introTitle: 'Santa Ana is the county seat, and the courthouse where most Orange County injury cases are decided.',
    intro: [
      'Santa Ana is the county seat and one of the densest cities in California. The Orange County Superior Court’s civil courthouses sit downtown, a few miles from the firm’s office in Tustin. Its streets — Bristol, Main, First, 17th, and the 5, 55, and 22 that cross it — carry heavy commuter and pedestrian traffic, and its apartment communities, shopping centers, and MainPlace Mall generate the falls and unsafe-property claims that come with a large, busy population.',
      'Kyle Scott Law has represented Santa Ana clients for more than 30 years. Because so much of the city speaks Spanish at home, the firm’s website, intake, and client portal are available in Spanish, and consultations can be held in either language.',
    ],
    keyPoints: [
      { title: 'Pedestrian and intersection collisions', body: 'Santa Ana’s dense street grid and high foot traffic produce serious pedestrian and crosswalk injuries. The claim turns on the police report, signal timing, witnesses, and nearby camera footage — all of which the firm requests early.' },
      { title: 'Apartment and retail premises', body: 'Landlords, property managers, and stores are responsible for hazards they knew about or should have found. Maintenance records and prior complaints are often the key evidence.' },
      { title: 'Bilingual representation', body: 'Intake, case updates, and the secure client portal work in Spanish. Family members who help communicate are welcome, but nothing about the claim depends on a client’s English.' },
      { title: 'Public agencies and OCTA', body: 'Santa Ana is OCTA’s hub. Injuries involving a county bus, a city vehicle, or a dangerous public road condition require a government claim, generally within six months.' },
    ],
    matters: [
      'Car, truck, and rideshare collisions on the 5, 55, and 22 and Santa Ana surface streets',
      'Pedestrian injuries at intersections, crosswalks, and bus stops',
      'Falls and unsafe-property injuries at apartment communities, stores, and MainPlace Mall',
      'Injuries involving OCTA buses and city property',
      'Dog bites and animal attacks in Santa Ana neighborhoods',
      'Work-related vehicle crashes and injuries caused by third parties',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Where people are treated', items: ['Orange County Global Medical Center — Santa Ana trauma center', 'St. Joseph Hospital, Orange', 'UCI Medical Center in Orange — the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Santa Ana Police Department for collisions on city streets', 'California Highway Patrol for the 5, 55, and 22', 'Orange County Animal Care for bite reports'] },
    ],
    faqs: [
      { question: '¿Hablan español?', answer: 'Sí. La consulta inicial, el proceso de admisión y el portal del cliente están disponibles en español. Visite la versión en español del sitio en kjslaw.com/es o llame al 714-544-1460.' },
      { question: 'Where would a Santa Ana injury case be filed?', answer: 'In the Orange County Superior Court’s civil courthouses in downtown Santa Ana — the Central Justice Center and the Civil Complex Center. Many claims resolve with the insurer first; when a lawsuit is needed, the firm files and tries it there.' },
      { question: 'I was hit in a crosswalk. What should I do now?', answer: 'Get medical care first, then preserve what you can: the police report number, the driver’s information, photos of the scene, and the names of anyone who saw it. Do not give a recorded statement to the driver’s insurer before the facts are reviewed.' },
      { question: 'My landlord ignored a hazard and I was hurt. Is that a case?', answer: 'It can be. A property owner or manager who knew about a dangerous condition, or should have found it with reasonable inspection, can be responsible for the injuries it causes. Prior complaints, repair requests, and photos of the condition matter.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'california-personal-injury-statute-of-limitations', 'who-pays-medical-bills-after-car-accident-california', 'what-to-do-after-dog-bite-orange-county'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/dog-bite-attorney-in-orange-county', '/personal-injury-lawyer-orange-county'],
  },
  {
    key: 'tustin',
    path: '/tustin-personal-injury-attorney',
    city: 'Tustin',
    title: 'Tustin Personal Injury Attorney',
    eyebrow: 'The firm’s home city — Irvine Boulevard, Tustin',
    description:
      'Representation for people injured in Tustin collisions on the 5 and the 55 and on Jamboree, Red Hill, Newport, and Irvine Boulevard, in falls at shopping centers and apartment communities, in dog attacks, and in incidents involving schools and public property.',
    metaDescription:
      'Tustin personal injury attorney Kyle Scott represents neighbors hurt in car accidents, falls, dog bites, and school incidents from his Irvine Boulevard office. Free consultation, no fee unless you win.',
    introTitle: 'Kyle Scott Law is a Tustin firm: the office is on Irvine Boulevard, and the courthouse is one exit down the 5.',
    intro: [
      'Tustin sits at the interchange of the 5 and the 55, with Jamboree Road, Red Hill Avenue, Newport Avenue, Irvine Boulevard, and First Street carrying commuter and retail traffic through Old Town, Tustin Ranch, the Market Place, and The District at Tustin Legacy. That mix of freeway speed, shopping-center parking, apartment communities, and school traffic is where most of the city’s injury claims begin.',
      'Kyle Scott has run his own firm since 2003 and practices from Tustin. A Tustin client meets the attorney minutes from home, the investigation happens on streets the firm drives every day, and a case that has to be filed goes to the Orange County Superior Court in Santa Ana, a short drive down the 5.',
    ],
    keyPoints: [
      { title: 'The 5 and the 55', body: 'The interchange and the ramps at Red Hill, Newport, and Tustin Ranch Road produce rear-end, lane-change, and merge collisions at freeway speed. The California Highway Patrol handles those reports; the firm obtains them, the dispatch records, and any camera footage before it is overwritten.' },
      { title: 'Retail centers and apartment communities', body: 'The Market Place, The District, and Old Town bring falls in parking lots, garages, and store aisles; apartment communities bring stairway, walkway, and pool injuries. Each turns on who controlled the area and what they knew, so incident reports and maintenance records are requested early.' },
      { title: 'Schools and public property', body: 'Tustin Unified campuses, city parks, and public roads bring claims against public entities, which run on a shorter clock: a written government claim is generally required within six months. The firm calendars that deadline on day one.' },
      { title: 'The attorney takes the call', body: 'The first conversation is with Kyle Scott, at the Irvine Boulevard office, by phone, or by video. The plan, the fee, and the timeline are explained before anything is signed, in English or Spanish.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on the 5, the 55, and Tustin surface streets',
      'Pedestrian and bicycle injuries near Old Town, the schools, and the retail centers',
      'Falls and unsafe-property injuries at shopping centers, restaurants, garages, and apartment communities',
      'Injuries on school campuses, at school events, and on school transportation',
      'Dog bites and animal attacks in Tustin neighborhoods and parks',
      'Traumatic brain, spinal, and orthopedic injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Where people are treated', items: ['Hoag Hospital Irvine', 'Providence St. Joseph Hospital, Orange', 'UCI Medical Center in Orange — the county’s Level I trauma center', 'Orange County Global Medical Center, Santa Ana'] },
      { label: 'Reports and agencies', items: ['Tustin Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 5 and the 55', 'Orange County Animal Care for bite reports'] },
    ],
    faqs: [
      { question: 'Where is the office?', answer: '17671 Irvine Boulevard, Suite 210, in Tustin. The first consultation is free and can be in person, by phone, or by video.' },
      { question: 'Where would a Tustin injury case be filed?', answer: 'In the Orange County Superior Court in Santa Ana, a short drive down the 5. Most claims are resolved with the insurer before a lawsuit is needed; when one is filed, the firm handles every appearance.' },
      { question: 'I was hurt on a school campus or by a city vehicle. Is the process different?', answer: 'Yes. Claims against a school district, the city, or another public entity generally require a written government claim within six months of the injury, before any lawsuit. Missing it can end the case, so it is the first date the firm calendars.' },
      { question: 'Does the firm handle Tustin cases in Spanish?', answer: 'Yes. Consultations, documents, and updates are available in Spanish, and the Spanish site covers the same practice areas.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'government-injury-claim-orange-county', 'prove-slip-and-fall-california', 'personal-injury-evidence-checklist-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/orange-county-school-liability-attorney', '/dog-bite-attorney-in-orange-county'],
  },
];

export const serviceAreaByKey = Object.fromEntries(serviceAreas.map((area) => [area.key, area])) as Record<string, ServiceAreaData>;
