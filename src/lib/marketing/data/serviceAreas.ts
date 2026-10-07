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
      'Anaheim is Orange County’s largest city by population and its busiest visitor destination. Its theme parks and resort hotels, its stadium and arena, and its convention center draw millions of people a year onto Harbor Boulevard, Katella Avenue, and the I-5, SR-57, and SR-91 corridors that feed them. That volume produces the claims Kyle Scott Law handles: collisions with commuters, rideshare drivers, tour buses, and commercial trucks; falls in hotels, parking structures, restaurants, and retail; and injuries on premises that are open to the public and responsible for keeping it safe.',
      'The firm represents Anaheim clients from its office in Tustin, a short drive down the 55 or the 5. Every claim starts with a free, confidential review of what happened, who may be responsible, which insurance policies apply, and which deadlines are already running.',
    ],
    keyPoints: [
      { title: 'Resort and venue premises claims', body: 'Hotels, theme parks, stadiums, and their contractors owe visitors a duty to inspect and fix hazards. Incident reports, surveillance footage, and maintenance logs are requested early, before they are overwritten.' },
      { title: 'Corridor collisions', body: 'Crashes on the 5, 57, and 91 and on Harbor, Katella, State College, and Ball Road often involve out-of-town drivers, rental cars, rideshares, and commercial vehicles — each with its own insurer and its own adjuster.' },
      { title: 'Public agencies', body: 'A public transit bus, a city vehicle, or a dangerous public road condition changes the rules: a government claim generally must be presented within six months, well before the ordinary lawsuit deadline.' },
      { title: 'Injured visitors', body: 'People hurt in Anaheim who live elsewhere in California, out of state, or abroad can still bring a claim here. The firm coordinates treatment records and communication so distance does not weaken the case.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on the 5, 57, and 91 and Anaheim surface streets',
      'Falls and injuries at hotels, theme parks, restaurants, stores, and parking structures',
      'Pedestrian and bicycle injuries in the resort district and near the Platinum Triangle',
      'Injuries involving public transit buses, resort shuttles, and city property',
      'Dog bites and animal attacks in Anaheim neighborhoods and parks',
      'Traumatic brain injuries and serious orthopedic injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Where people are treated', items: ['Anaheim Regional Medical Center (AHMC)', 'Kaiser Permanente Orange County — Anaheim Medical Center', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Anaheim Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 5, 57, and 91', 'OC Animal Care for bite reports (the city contracts with it)'] },
    ],
    faqs: [
      { question: 'Where would an Anaheim injury case be filed?', answer: 'Most Anaheim personal injury lawsuits are filed in the Orange County Superior Court in Santa Ana. Many claims resolve with the insurer before a lawsuit is filed; if one is needed, Kyle Scott Law has tried cases in that court for more than 30 years.' },
      { question: 'Do I need to come to the office?', answer: 'No. The first consultation is by phone or video, and the firm can arrange to meet in person when a case needs it. The Tustin office is a short drive from Anaheim for anything that requires a visit.' },
      { question: 'I was hurt at a resort or stadium. Who is responsible?', answer: 'It depends on who controlled the area and what caused the injury: the venue, a contractor, a security company, or another guest. The firm identifies every potentially responsible party and the insurance behind each one, and asks for incident reports and video before they disappear.' },
      { question: 'What if a public bus or a government agency was involved?', answer: 'Claims against public entities follow a separate, shorter process — a written government claim is generally required within six months of the incident. That deadline is one reason to have the facts reviewed promptly.' },
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
      { label: 'Where people are treated', items: ['UCI Health — Irvine, with a 24-hour emergency department', 'Hoag Hospital Irvine', 'Kaiser Permanente Irvine Medical Center', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Irvine Police Department for collisions on city streets', 'California Highway Patrol for the 405, the 5, and the toll roads', 'Irvine Police Department Animal Services for bite reports'] },
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
      { title: 'Public agencies and transit', body: 'As the county seat, Santa Ana carries heavy public traffic: buses, government vehicles, and the roads themselves. An injury involving a public bus, a city or county vehicle, or a dangerous public road condition requires a government claim, generally within six months.' },
    ],
    matters: [
      'Car, truck, and rideshare collisions on the 5, 55, and 22 and Santa Ana surface streets',
      'Pedestrian injuries at intersections, crosswalks, and bus stops',
      'Falls and unsafe-property injuries at apartment communities, stores, and MainPlace Mall',
      'Injuries involving public buses, government vehicles, and city property',
      'Dog bites and animal attacks in Santa Ana neighborhoods',
      'Work-related vehicle crashes and injuries caused by third parties',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Where people are treated', items: ['Orange County Global Medical Center, Santa Ana — a Level II trauma center', 'Providence St. Joseph Hospital, Orange', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Santa Ana Police Department for collisions on city streets', 'California Highway Patrol for the 5, 55, and 22', 'Santa Ana Police Department Animal Services for bite reports'] },
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
      { label: 'Where people are treated', items: ['Hoag Hospital Irvine', 'Providence St. Joseph Hospital, Orange', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center', 'Orange County Global Medical Center, Santa Ana'] },
      { label: 'Reports and agencies', items: ['Tustin Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 5 and the 55', 'OC Animal Care for bite reports (the city contracts with it)'] },
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
  {
    key: 'orange',
    path: '/orange-personal-injury-attorney',
    city: 'Orange',
    title: 'Orange Personal Injury Attorney',
    eyebrow: 'Serving the City of Orange from the Tustin office',
    description:
      'Representation for people injured in the City of Orange — in collisions where the 5, the 22, and the 57 meet and on the 55, in pedestrian and bicycle crashes around Old Towne and Chapman University, in falls at stores, restaurants, and apartment communities, and in dog attacks.',
    metaDescription:
      'Orange personal injury attorney Kyle Scott represents people hurt in the City of Orange: crashes at the 5, 22, and 57 interchange and on the 55, pedestrian injuries around Old Towne, falls, and dog bites.',
    introTitle: 'Orange is where three freeways meet and where Old Towne’s streets fill with people on foot.',
    intro: [
      'The 5, the 22, and the 57 meet in Orange at the interchange known as the Orange Crush, and the 55 and the 241 and 261 toll roads also serve the city. Off the freeways, Chapman Avenue and Glassell Street meet at the Plaza in Old Towne, where restaurants, shops, older storefronts, and Chapman University’s campus bring heavy foot traffic into a historic street grid. That mix produces the claims that follow: interchange and freeway collisions, pedestrians and cyclists struck at intersections, and falls on sidewalks, stairs, and floors at businesses and apartment communities.',
      'Orange is also home to UCI Health — Orange, the county’s Level I trauma center, along with Rady Children’s Hospital – Orange County, a pediatric trauma center, and Providence St. Joseph Hospital. Kyle Scott Law represents Orange clients from its office in Tustin, a short drive south, starting with a confidential review of what happened, who may be responsible, which insurance applies, and which deadlines are already running.',
    ],
    keyPoints: [
      { title: 'The Orange Crush', body: 'Merges, lane changes, and rear-end crashes where the 5, the 22, and the 57 meet happen at freeway speed. The California Highway Patrol investigates crashes on the freeways; the firm obtains its report, the dispatch records, and any dash-camera or nearby video before it is overwritten.' },
      { title: 'Old Towne and Chapman University', body: 'The Plaza, the university’s campus, and the streets between them carry students, diners, and shoppers on foot and on bikes. Pedestrian and cyclist claims there turn on signal timing, sight lines, witnesses, and cameras; falls in older buildings turn on who owned or controlled the stair, step, or floor.' },
      { title: 'Hospital records, early', body: 'When a serious injury is treated at UCI Health — Orange or at Rady Children’s Hospital – Orange County, the firm requests the emergency, imaging, and surgical records early and builds the claim from what the doctors documented, not from an insurer’s summary.' },
      { title: 'City property and vehicles', body: 'A crash with a city vehicle, a dangerous condition on a public street or sidewalk, or an injury in a city park changes the rules: a written government claim is generally required within six months, well before the ordinary lawsuit deadline.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on the 5, 22, 55, and 57 and on Orange surface streets',
      'Pedestrian and bicycle injuries in Old Towne and near Chapman University',
      'Falls and unsafe-property injuries at stores, restaurants, parking structures, and apartment communities',
      'Injuries involving city vehicles, sidewalks, parks, and other public property',
      'Dog bites and animal attacks in Orange neighborhoods and parks',
      'Traumatic brain, spinal, and orthopedic injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana', 'Criminal and traffic cases from Orange, such as a charge against the other driver, also go to the Central Justice Center'] },
      { label: 'Where people are treated', items: ['UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center', 'Rady Children’s Hospital – Orange County (formerly CHOC), a pediatric trauma center', 'Providence St. Joseph Hospital, Orange'] },
      { label: 'Reports and agencies', items: ['Orange Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 5, 22, 55, and 57 and the toll roads', 'OC Animal Care for bite reports (the city contracts with it)'] },
    ],
    faqs: [
      { question: 'Where would an Orange injury case be filed?', answer: 'In the Orange County Superior Court in Santa Ana — at the Central Justice Center, or at the Civil Complex Center for cases the court treats as complex. Many claims resolve with the insurer before a lawsuit is needed; when one is, the firm files it there.' },
      { question: 'Who investigates a crash at the Orange Crush?', answer: 'The California Highway Patrol handles collisions on the 5, the 22, the 55, and the 57; the Orange Police Department handles city streets. Get the report number at the scene if you can. The firm requests the report, the 911 and dispatch records, and any dash-camera or business video while it still exists.' },
      { question: 'I was hurt in Old Towne or near Chapman University. Who is responsible?', answer: 'It depends on what caused the injury and who controlled the place: a driver, a business, a landlord, or a property manager. Chapman University is a private university, so a claim involving its property follows the ordinary rules; a claim against the city over a street or sidewalk follows the government-claim rules and their six-month deadline.' },
      { question: 'Do I need to come to the office?', answer: 'No. The first consultation is by phone or video, and in-person meetings are arranged when a case needs one. The Tustin office is a short drive south of Orange.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'government-injury-claim-orange-county', 'personal-injury-evidence-checklist-california', 'how-long-personal-injury-case-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/orange-county-traumatic-brain-injury-attorney', '/dog-bite-attorney-in-orange-county'],
  },
  {
    key: 'costa-mesa',
    path: '/costa-mesa-personal-injury-attorney',
    city: 'Costa Mesa',
    title: 'Costa Mesa Personal Injury Attorney',
    eyebrow: 'Serving Costa Mesa from the Tustin office',
    description:
      'Representation for people injured in Costa Mesa — in collisions on the 405, the 55, and the 73 and on Harbor Boulevard, Bristol Street, and Newport Boulevard, in falls at shopping centers, theaters, and apartment communities, at the OC Fair & Event Center, and in dog attacks.',
    metaDescription:
      'Costa Mesa personal injury attorney Kyle Scott represents people hurt in crashes on the 405, the 55, and the 73, in falls at shopping centers and venues, at the OC Fair & Event Center, and in dog bites.',
    introTitle: 'In Costa Mesa, injuries follow the crowds: freeway traffic, shoppers and audiences, and fair visitors.',
    intro: [
      'The 405, the 55, and the 73 all run through Costa Mesa, and Harbor Boulevard, Bristol Street, and Newport Boulevard carry their traffic into the city. South Coast Plaza and the Segerstrom Center for the Arts bring shoppers and audiences to Bristol Street and Town Center Drive; the OC Fair & Event Center on Fair Drive hosts the annual OC Fair and events through the year; and Orange Coast College sits on Fairview Road. The claims that follow are freeway and arterial collisions, pedestrians struck in parking lots and crosswalks, and falls in stores, restaurants, garages, and event grounds.',
      'Kyle Scott Law represents Costa Mesa clients from its office in Tustin, a short drive up the 55. The work starts with the facts: what happened, who controlled the place or the vehicle, which insurance applies, and whether a public entity is involved — which, in Costa Mesa, can include the state agency that runs the fairgrounds.',
    ],
    keyPoints: [
      { title: 'The 405, the 55, and the 73', body: 'Freeway-speed merges, lane changes, and rear-end crashes on the three freeways are investigated by the California Highway Patrol. The firm obtains the report, dispatch records, and any available video, and identifies every driver, employer, and insurer involved.' },
      { title: 'Shopping centers, theaters, and garages', body: 'Retail centers, performance venues, restaurants, and their parking structures must use reasonable care to find and fix hazards — spills, broken pavement, poor lighting, and unsafe stairs. Incident reports, maintenance logs, and surveillance video are requested early, before they are overwritten.' },
      { title: 'The fairgrounds are state property', body: 'The OC Fair & Event Center is owned and run by the 32nd District Agricultural Association, an institution of the State of California. A claim against the fairgrounds itself generally requires a written government claim within six months; vendors, exhibitors, and event operators may be private businesses with their own insurance. Who controlled what is sorted out first.' },
      { title: 'Campuses and city property', body: 'Orange Coast College belongs to a public community college district, and Costa Mesa’s streets, sidewalks, and parks belong to the city. An injury involving either runs on the same six-month government-claim clock, which the firm calendars on day one.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on the 405, the 55, and the 73 and on Costa Mesa streets',
      'Pedestrian injuries in shopping-center parking lots and crosswalks and along Harbor and Newport Boulevards',
      'Falls and unsafe-property injuries at shopping centers, restaurants, theaters, and parking structures',
      'Injuries at the OC Fair & Event Center, on campuses, and on other public property',
      'Dog bites and animal attacks in Costa Mesa neighborhoods and parks',
      'Traumatic brain and spinal injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana', 'West Justice Center — 8141 13th Street, Westminster, where criminal and traffic cases from Costa Mesa are filed (a charge against the other driver, for example)'] },
      { label: 'Where people are treated', items: ['Hoag Hospital Newport Beach', 'MemorialCare Orange Coast Medical Center, Fountain Valley', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Costa Mesa Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 405, the 55, and the 73', 'Costa Mesa Police Department Animal Services Unit for bite reports'] },
    ],
    faqs: [
      { question: 'Where would a Costa Mesa injury case be filed?', answer: 'In the Orange County Superior Court in Santa Ana. Costa Mesa’s criminal and traffic cases are filed at the West Justice Center in Westminster, so a citation or charge against the other driver would go there, but the injury claim is a separate civil case.' },
      { question: 'I was hurt at the OC Fair. Is the claim different?', answer: 'It can be. The fairgrounds are run by a state agency, so a claim against the fairgrounds itself generally must be presented in writing within six months. If a vendor, a ride or game operator, or another guest caused the injury, that claim may be an ordinary one against a private party. The firm identifies who controlled the area and calendars the government-claim deadline on day one.' },
      { question: 'I fell at a store or shopping center. Who is responsible?', answer: 'Usually whoever controlled the spot where you fell: the store, the center’s owner or manager, or a maintenance contractor. Report the fall before you leave, photograph what caused it, and keep your shoes and clothing. The firm asks for the incident report and video right away, because surveillance footage is often recorded over.' },
      { question: 'Do I need to come to the office?', answer: 'No. The first consultation is by phone or video, and the firm arranges in-person meetings when a case needs one. The Tustin office is a short drive up the 55.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'prove-slip-and-fall-california', 'government-injury-claim-orange-county', 'talk-to-insurance-adjuster-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/dog-bite-attorney-in-orange-county', '/personal-injury-lawyer-orange-county'],
  },
  {
    key: 'huntington-beach',
    path: '/huntington-beach-personal-injury-attorney',
    city: 'Huntington Beach',
    title: 'Huntington Beach Personal Injury Attorney',
    eyebrow: 'Serving Huntington Beach from the Tustin office',
    description:
      'Representation for people injured in Huntington Beach — in collisions on Pacific Coast Highway, Beach Boulevard, and the 405, in bicycle and pedestrian crashes along the coast, in falls downtown and on public property, and in dog attacks.',
    metaDescription:
      'Huntington Beach personal injury attorney Kyle Scott represents people hurt in crashes on Pacific Coast Highway, Beach Boulevard, and the 405, in bicycle and pedestrian collisions, in falls, and in dog bites.',
    introTitle: 'Huntington Beach’s claims start on the coast: Pacific Coast Highway, the pier, and the beaches.',
    intro: [
      'Pacific Coast Highway runs along Huntington Beach’s shoreline, Beach Boulevard runs north from the coast across the 405, and Main Street ends at the pier. Between them are the city beach, Bolsa Chica and Huntington state beaches, the beachfront bike path, and a downtown of restaurants and shops. Highway speed, beach crowds, and bicycles produce the claims that follow: drivers, riders, and pedestrians hit on PCH and its cross streets, falls downtown and on public property, and serious injuries treated at hospitals across west Orange County.',
      'Kyle Scott Law represents Huntington Beach clients — and visitors hurt there — from its office in Tustin. Each claim starts with a confidential review of what happened, who owned or controlled the road or property, which insurance applies, and which deadlines are already running. On the coast, that often means first sorting out whether the city, the State, or a private business is responsible.',
    ],
    keyPoints: [
      { title: 'Pacific Coast Highway and Beach Boulevard', body: 'Collisions on PCH and Beach Boulevard involve drivers turning across traffic, cyclists on the shoulder, and pedestrians crossing to the sand. The Huntington Beach Police Department investigates crashes on city streets, including PCH; the California Highway Patrol handles the 405.' },
      { title: 'City beach, state beaches, and the pier', body: 'The pier and the city beach belong to the City of Huntington Beach, whose Fire Department lifeguards patrol them; Bolsa Chica and Huntington state beaches are run by California State Parks. A claim against either public owner generally requires a written government claim within six months, and public-property claims have legal limits of their own, so ownership is settled first.' },
      { title: 'Riders and pedestrians on the coast', body: 'The beachfront path and the shoulders of PCH bring cyclists, e-bike riders, skaters, and people on foot together. A collision claim is built from the same evidence as any crash — the police report, witnesses, photographs, and video — and may draw on the at-fault party’s insurance and the injured rider’s own coverage.' },
      { title: 'Visitors hurt in Huntington Beach', body: 'People hurt here who live elsewhere in California, out of state, or abroad can still bring a claim here. The firm collects treatment records from wherever care continues and works with clients by phone and video.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on Pacific Coast Highway, Beach Boulevard, the 405, and Huntington Beach streets',
      'Bicycle, e-bike, and pedestrian injuries on PCH and the beachfront path',
      'Falls and unsafe-property injuries at restaurants, hotels, shops, and apartment communities',
      'Injuries on the pier, at the beaches, and on other public property',
      'Dog bites and animal attacks in Huntington Beach neighborhoods and parks',
      'Traumatic brain and spinal injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana', 'West Justice Center — 8141 13th Street, Westminster, where criminal and traffic cases from Huntington Beach are filed (a charge against the other driver, for example)'] },
      { label: 'Where people are treated', items: ['Huntington Beach Hospital, Beach Boulevard', 'UCI Health — Fountain Valley', 'MemorialCare Orange Coast Medical Center, Fountain Valley', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Huntington Beach Police Department for collisions on PCH, Beach Boulevard, and other city streets', 'California Highway Patrol for the 405', 'Huntington Beach Fire Department Marine Safety Division for incidents on the city beach and the pier', 'California State Parks for Bolsa Chica and Huntington state beaches', 'OC Animal Care for bite reports (the city contracts with it)'] },
    ],
    faqs: [
      { question: 'Where would a Huntington Beach injury case be filed?', answer: 'In the Orange County Superior Court in Santa Ana. Huntington Beach’s criminal and traffic cases are filed at the West Justice Center in Westminster — including a charge against a driver who caused a crash — but the injury claim is a separate civil case.' },
      { question: 'I was hit while riding on PCH or the beach path. Do I have a claim?', answer: 'You may. A driver who turns across a rider, opens a door, or drifts onto the shoulder can be responsible, and so can another rider. Get medical care, keep the police report number, photograph the scene and the bike, and do not give a recorded statement to the other side’s insurer before the facts are reviewed.' },
      { question: 'I was hurt on the pier or at the beach. Who is responsible?', answer: 'It depends on who owned and controlled the spot. The pier and the city beach are the City of Huntington Beach’s; Bolsa Chica and Huntington state beaches are the State’s; restaurants and concessions are usually private businesses. A claim against the city or the State requires a written government claim, generally within six months, and public-property claims have legal limits of their own, so the facts should be reviewed early.' },
      { question: 'I was visiting when I was hurt. Can I bring a claim here?', answer: 'Yes. A visitor injured in Huntington Beach can bring a claim here after returning home. The first consultation is by phone or video, and the firm gathers records from the doctors wherever treatment continues.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'government-injury-claim-orange-county', 'uninsured-driver-accident-california', 'partly-at-fault-california-personal-injury'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/orange-county-traumatic-brain-injury-attorney', '/dog-bite-attorney-in-orange-county'],
  },
  {
    key: 'garden-grove',
    path: '/garden-grove-personal-injury-attorney',
    city: 'Garden Grove',
    title: 'Garden Grove Personal Injury Attorney',
    eyebrow: 'Serving Garden Grove from the Tustin office',
    description:
      'Representation for people injured in Garden Grove — in collisions on the 22 and on Harbor Boulevard, Garden Grove Boulevard, Brookhurst Street, and Beach Boulevard, in pedestrian crashes, in falls at hotels, restaurants, stores, and apartment communities, and in dog attacks.',
    metaDescription:
      'Garden Grove personal injury attorney Kyle Scott represents people hurt in crashes on the 22 and the city’s boulevards, pedestrian collisions, falls at hotels, restaurants, and stores, and dog bites.',
    introTitle: 'Garden Grove’s injuries happen on the 22 and on the wide boulevards that cross the city.',
    intro: [
      'The 22 runs east–west through Garden Grove, mostly inside the city or along its border with Westminster, with exits from Beach Boulevard to Harbor Boulevard. Harbor Boulevard brings visitors to the hotels at the city’s Anaheim end, and Garden Grove Boulevard is home to OC Koreatown’s restaurants and shops between Beach Boulevard and Brookhurst Street. Collisions at the ramps and intersections, pedestrians struck crossing wide boulevards, and falls at hotels, restaurants, stores, and apartment communities are the claims that follow.',
      'Kyle Scott Law represents Garden Grove clients from its office in Tustin, a short drive east. Consultations are available in English and Spanish, and every claim starts with the facts: how it happened, who may be responsible, which insurance applies, and which deadlines are already running.',
    ],
    keyPoints: [
      { title: 'The 22 and its ramps', body: 'Merges and lane changes on the 22, and ramps that empty onto busy boulevards, produce rear-end and side-impact collisions. The California Highway Patrol investigates crashes on the freeway and the Garden Grove Police Department handles city streets; the firm obtains both kinds of reports, and any video, before it is lost.' },
      { title: 'Crossing the boulevards', body: 'Harbor Boulevard, Garden Grove Boulevard, and Beach Boulevard are wide, busy streets lined with shops and restaurants. A pedestrian claim turns on signal timing, lighting, sight lines, witnesses, and the business cameras that recorded the crossing.' },
      { title: 'Hotels, stores, and apartment communities', body: 'Hotels on Harbor Boulevard, shopping centers, restaurants, and apartment communities owe guests, customers, and tenants reasonable care. Each claim turns on who controlled the area and what they knew about the hazard, so incident reports, maintenance records, and video are requested early.' },
      { title: 'A dog bite in Garden Grove', body: 'Garden Grove has its own Animal Care Services rather than OC Animal Care, so a bite in the city is reported there. Under Civil Code § 3342, an owner is responsible for a bite in a public place or to someone lawfully on private property, even if the dog never bit anyone before.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on the 22 and on Garden Grove’s boulevards',
      'Pedestrian and bicycle injuries at intersections and crosswalks',
      'Falls and unsafe-property injuries at hotels, restaurants, stores, and shopping centers',
      'Stairway, walkway, and lighting hazards at apartment communities',
      'Dog bites and animal attacks in Garden Grove neighborhoods and parks',
      'Traumatic brain, spinal, and orthopedic injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana', 'West Justice Center — 8141 13th Street, Westminster, where criminal and traffic cases from Garden Grove are filed (a charge against the other driver, for example)'] },
      { label: 'Where people are treated', items: ['Garden Grove Hospital and Medical Center, Garden Grove Boulevard', 'UCI Health — Fountain Valley', 'Orange County Global Medical Center, Santa Ana — a Level II trauma center', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Garden Grove Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 22', 'Garden Grove Animal Care Services for bite reports'] },
    ],
    faqs: [
      { question: 'Where would a Garden Grove injury case be filed?', answer: 'In the Orange County Superior Court in Santa Ana. Garden Grove’s criminal and traffic cases are filed at the West Justice Center in Westminster, but an injury claim is a separate civil case, and many resolve with the insurer before any lawsuit is filed.' },
      { question: 'I was hit crossing one of the boulevards. What should I do now?', answer: 'Get medical care first, then keep what you can: the police report number, the driver’s information, photos of the crossing, and the names of anyone who saw it. Businesses along the boulevard may have cameras that recorded it, and that footage is often recorded over, so the firm asks for it right away.' },
      { question: 'A dog bit me in Garden Grove. Who takes the report?', answer: 'Garden Grove Animal Care Services — the city has its own animal-care agency rather than OC Animal Care. The report documents the dog and its owner, which also helps identify insurance that may cover the bite.' },
      { question: 'Does the firm handle Garden Grove cases in Spanish?', answer: 'Yes. Consultations, documents, and updates are available in Spanish, and family members who help a client communicate are welcome.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'what-to-do-after-dog-bite-orange-county', 'prove-slip-and-fall-california', 'who-pays-medical-bills-after-car-accident-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/dog-bite-attorney-in-orange-county', '/personal-injury-lawyer-orange-county'],
  },
  {
    key: 'fullerton',
    path: '/fullerton-personal-injury-attorney',
    city: 'Fullerton',
    title: 'Fullerton Personal Injury Attorney',
    eyebrow: 'Serving Fullerton from the Tustin office',
    description:
      'Representation for people injured in Fullerton — in collisions on the 57 and the 91 and on Harbor and State College Boulevards, in pedestrian and bicycle crashes near Cal State Fullerton and downtown, in falls, and in dog attacks.',
    metaDescription:
      'Fullerton personal injury attorney Kyle Scott represents people hurt in crashes on the 57 and the 91, pedestrian and bicycle collisions near Cal State Fullerton and downtown, falls, and dog bites.',
    introTitle: 'Fullerton’s injuries come from its freeways, its campuses, and its downtown.',
    intro: [
      'The 57 and the 91 carry Fullerton’s freeway traffic, and the 5 and Imperial Highway also serve the city. Cal State Fullerton and Fullerton College bring students, staff, and visitors onto State College Boulevard, Chapman Avenue, and the streets around them, and downtown — centered on Harbor Boulevard and Commonwealth Avenue, near the Metrolink and Amtrak station — fills with diners and nightlife. The claims that follow are freeway and arterial collisions, pedestrians and cyclists struck near campus and downtown, and falls at restaurants, apartment communities, and parking structures.',
      'Kyle Scott Law represents Fullerton clients from its office in Tustin, a short drive down the 57. The first conversation is with the attorney, by phone or video, and covers what happened, who may be responsible — a driver, a property owner, or a public campus — which insurance applies, and which deadlines are running.',
    ],
    keyPoints: [
      { title: 'The 57 and the 91', body: 'Crashes on the 57 and the 91 are investigated by the California Highway Patrol rather than the Fullerton Police Department, which handles city streets. The firm requests the CHP report, the dispatch records, and any video, and identifies every driver, employer, and insurer involved.' },
      { title: 'Campus injuries', body: 'Cal State Fullerton is part of the California State University and has its own University Police; Fullerton College belongs to a public community college district. An injury caused by either campus’s property or employees generally requires a written government claim within six months, while a collision with a private driver on campus follows the ordinary rules.' },
      { title: 'Downtown after dark', body: 'Downtown’s restaurants and nightlife bring crowded sidewalks, late-night pedestrian crashes, and falls. Those claims turn on lighting, sight lines, witness accounts, and video — and business video is often recorded over, so the firm asks for it quickly.' },
      { title: 'The courthouse in Fullerton', body: 'The North Justice Center on Berkeley Avenue is where Fullerton’s criminal and traffic cases are filed, such as a DUI charge or a citation against the driver who caused a crash. The firm follows that case because its outcome can matter to the injury claim, which is filed separately in Santa Ana.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on the 57 and the 91 and on Fullerton streets',
      'Pedestrian and bicycle injuries near Cal State Fullerton, Fullerton College, and downtown',
      'Falls and unsafe-property injuries at restaurants, apartment communities, student housing, and parking structures',
      'Injuries on campuses and other public property',
      'Dog bites and animal attacks in Fullerton neighborhoods and parks',
      'Traumatic brain and spinal injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana', 'North Justice Center — 1275 North Berkeley Avenue, Fullerton, where criminal and traffic cases from Fullerton are filed (a charge against the other driver, for example)'] },
      { label: 'Where people are treated', items: ['Providence St. Jude Medical Center, Fullerton', 'UCI Health — Placentia Linda, Placentia', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Fullerton Police Department for collisions and incidents on city streets', 'California Highway Patrol for the 57 and the 91', 'Cal State Fullerton University Police for incidents on campus', 'OC Animal Care for bite reports (the city contracts with it)'] },
    ],
    faqs: [
      { question: 'Is a Fullerton injury case filed at the courthouse in Fullerton?', answer: 'No. The North Justice Center on Berkeley Avenue handles Fullerton’s criminal and traffic cases. A civil injury lawsuit is filed in the Orange County Superior Court in Santa Ana, and many claims resolve with the insurer before a lawsuit is needed.' },
      { question: 'I was hurt on the Cal State Fullerton campus. Is that different?', answer: 'It can be. The university is a public entity, so a claim against it generally must be presented in writing within six months, through its designated claims process. If a private driver or business caused the injury, that claim follows the ordinary rules. University Police reports and campus video are requested early.' },
      { question: 'I was hit walking downtown at night. What matters most?', answer: 'Medical care first, then the evidence that disappears fastest: the police report number, the driver’s information, the names of witnesses, and photos of the lighting and the crossing. Restaurants and bars along the street may have cameras, and the firm asks for that footage right away.' },
      { question: 'Do I need to come to the office?', answer: 'No. The first consultation is by phone or video, and the firm arranges in-person meetings when a case needs one.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'government-injury-claim-orange-county', 'partly-at-fault-california-personal-injury', 'personal-injury-evidence-checklist-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/orange-county-traumatic-brain-injury-attorney', '/personal-injury-lawyer-orange-county'],
  },
  {
    key: 'newport-beach',
    path: '/newport-beach-personal-injury-attorney',
    city: 'Newport Beach',
    title: 'Newport Beach Personal Injury Attorney',
    eyebrow: 'Serving Newport Beach from the Tustin office',
    description:
      'Representation for people injured in Newport Beach — in collisions on Pacific Coast Highway, Jamboree Road, Newport Boulevard, and the 73, in bicycle and e-bike crashes on the Balboa Peninsula, in boating and harbor accidents, in falls, and in dog attacks.',
    metaDescription:
      'Newport Beach personal injury attorney Kyle Scott represents people hurt in crashes on Pacific Coast Highway and the 73, bicycle and e-bike collisions on the peninsula, boating accidents, falls, and dog bites.',
    introTitle: 'In Newport Beach, the claims come from Coast Highway, the Balboa Peninsula, and the harbor.',
    intro: [
      'Pacific Coast Highway runs through Newport Beach from Mariners’ Mile to Corona del Mar, the 73 crosses the city, and Newport Boulevard and Jamboree Road carry traffic down to the harbor. The Balboa Peninsula fits two piers, an oceanfront boardwalk, and its beaches into a narrow strip shared by cars, bicycles, e-bikes, and people on foot; Balboa Island and Lido Isle sit in a busy harbor; and Fashion Island draws shoppers to Newport Center. The claims that follow are highway and arterial collisions, riders and pedestrians hit on the peninsula, boating injuries, and falls at restaurants, hotels, and rental properties.',
      'Kyle Scott Law represents Newport Beach clients from its office in Tustin, a short drive up the 55 or Jamboree Road. Every claim starts with a confidential review of what happened, who owned or controlled the vehicle, vessel, or property, which insurance applies, and which deadlines are running — and, on the water, which law applies.',
    ],
    keyPoints: [
      { title: 'Coast Highway and the 73', body: 'The Newport Beach Police Department investigates collisions on Pacific Coast Highway and city streets; the California Highway Patrol handles the 73. The firm obtains the report, dispatch records, and any video, and identifies every driver and insurer involved.' },
      { title: 'Bicycles and e-bikes on the peninsula', body: 'The oceanfront boardwalk and the peninsula’s streets mix cyclists, e-bike riders, and people on foot, and the police department has run e-bike enforcement operations there. A collision claim turns on speed, right-of-way, witnesses, and video, and an e-bike rider who hits someone can be responsible like anyone else who causes a collision.' },
      { title: 'Boating and harbor injuries', body: 'The Orange County Sheriff’s Department Harbor Patrol handles emergencies and law enforcement in Newport Harbor. An operator must report a boating accident with an injury that needs medical attention beyond first aid to the California Division of Boating and Waterways within 48 hours, and injuries on the water can fall under federal maritime law, which has its own deadlines and rules.' },
      { title: 'Beaches, piers, and city property', body: 'The Newport and Balboa piers are city piers, and Fire Department lifeguards cover Newport’s ocean and bay beaches. A claim against the City of Newport Beach generally requires a written government claim within six months, and public-property claims have legal limits of their own, so ownership and the facts are sorted out first.' },
    ],
    matters: [
      'Car, truck, motorcycle, and rideshare collisions on Pacific Coast Highway, Jamboree Road, Newport Boulevard, and the 73',
      'Bicycle, e-bike, and pedestrian injuries on the Balboa Peninsula and city streets',
      'Boating, dock, and harbor injuries in Newport Harbor',
      'Falls and unsafe-property injuries at restaurants, hotels, shops, and rental properties',
      'Dog bites and animal attacks in Newport Beach neighborhoods and parks',
      'Traumatic brain and spinal injuries after any of the above',
    ],
    local: [
      { label: 'Where cases are filed', items: ['Orange County Superior Court, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana', 'Harbor Justice Center — 4601 Jamboree Road, Newport Beach, where criminal and traffic cases from Newport Beach are filed (a charge against the other driver, for example)'] },
      { label: 'Where people are treated', items: ['Hoag Hospital Newport Beach', 'Hoag Hospital Irvine', 'UCI Health — Orange (UCI Medical Center), the county’s Level I trauma center'] },
      { label: 'Reports and agencies', items: ['Newport Beach Police Department for collisions on Pacific Coast Highway and city streets', 'California Highway Patrol for the 73', 'Orange County Sheriff’s Department Harbor Patrol for incidents in Newport Harbor', 'Newport Beach Fire Department lifeguards for incidents on the ocean and bay beaches', 'Newport Beach Police Department Animal Control for bite reports'] },
    ],
    faqs: [
      { question: 'Is a Newport Beach case heard at the Harbor Justice Center?', answer: 'Not the injury case. The Harbor Justice Center on Jamboree Road is where Newport Beach’s criminal and traffic cases are filed, such as a charge against the driver who caused a crash. A civil injury lawsuit is filed in the Orange County Superior Court in Santa Ana, and many claims resolve with the insurer before one is needed.' },
      { question: 'I was hurt in a boating accident in the harbor. What should I do?', answer: 'Get medical care, then keep the names of the operators and owners, the boats’ registration numbers, photos, and the names of witnesses. The Sheriff’s Harbor Patrol may respond, and an operator must report an accident with an injury beyond first aid to the state within 48 hours. Boating claims can be governed by federal maritime law as well as California law, which can change the deadlines and the rules, so have the facts reviewed promptly.' },
      { question: 'An e-bike rider hit me on the peninsula. Who is responsible?', answer: 'The rider can be, like anyone whose carelessness causes a collision. The police report, witnesses, and video matter, and so does identifying any insurance that may cover the rider.' },
      { question: 'I was hurt on a pier or a city beach. Is the process different?', answer: 'Yes. The piers and city beaches are public property, so a claim against the city generally requires a written government claim within six months of the injury, and public-property claims have legal limits of their own. Restaurants, rentals, and other businesses near the water are usually private, and claims against them follow the ordinary rules.' },
    ],
    guideSlugs: ['what-to-do-after-car-accident-orange-county', 'government-injury-claim-orange-county', 'talk-to-insurance-adjuster-california', 'how-much-is-personal-injury-case-worth-california'],
    relatedPracticePaths: ['/orange-county-auto-accidents-lawyer', '/orange-county-slip-and-fall-attorney', '/orange-county-traumatic-brain-injury-attorney', '/personal-injury-lawyer-orange-county'],
  },
];

export const serviceAreaByKey = Object.fromEntries(serviceAreas.map((area) => [area.key, area])) as Record<string, ServiceAreaData>;
