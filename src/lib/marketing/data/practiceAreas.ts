import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';

export type PracticeAreaIcon =
  | 'shield'
  | 'car'
  | 'fall'
  | 'medical'
  | 'dog'
  | 'brain'
  | 'support'
  | 'scale'
  | 'care';

export type PracticeAreaData = {
  key: string;
  path: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  icon: PracticeAreaIcon;
  introTitle: string;
  intro: string[];
  keyPoints: { title: string; body: string }[];
  matters: string[];
  evidence: string[];
  faqs: { question: string; answer: string }[];
  featuredResults: string[];
  sourceUrl?: string;
};

export const practiceAreas: PracticeAreaData[] = [
  {
    key: 'personal-injury',
    path: '/personal-injury-lawyer-orange-county',
    shortTitle: 'Personal Injury',
    title: 'Orange County Personal Injury Lawyer',
    eyebrow: 'Personal injury representation',
    description: 'Representation for people and families facing serious injuries caused by negligence, unsafe property, defective conduct, malpractice, abuse, and other wrongful acts.',
    metaDescription: 'Orange County personal injury lawyer Kyle Scott represents clients in vehicle crashes, premises liability, dog bites, malpractice, brain injury, abuse, and wrongful-death matters.',
    icon: 'shield',
    introTitle: 'Personal injury claims require careful investigation and a clear damages record.',
    intro: [
      'A personal injury claim begins with a preventable injury and a person, business, institution, or insurer whose conduct may be legally responsible. The work is broader than negotiating a medical bill: it can require preserving evidence, understanding insurance coverage, documenting future care, and presenting how the injury has changed a client’s life.',
      'Kyle Scott Law represents injured clients from its Tustin office throughout Orange County and California. The firm handles claims from the initial insurance stage through litigation, mediation, and trial when a fair resolution cannot be reached.',
    ],
    keyPoints: [
      { title: 'Liability', body: 'Identify who may be responsible and what evidence supports negligence or another legal basis for the claim.' },
      { title: 'Damages', body: 'Document medical expenses, lost earnings, future needs, pain, disability, and other legally recoverable losses.' },
      { title: 'Insurance', body: 'Review available policies, exclusions, limits, and the positions taken by insurers or responsible parties.' },
    ],
    matters: ['Car, truck, motorcycle, and rideshare collisions', 'Slip-and-fall, trip-and-fall, and unsafe-property claims', 'Dog bites and other animal-related injuries', 'Medical and professional malpractice', 'Traumatic brain injuries and catastrophic harm', 'Sexual abuse, assault, institutional liability, and wrongful death'],
    evidence: ['Incident reports, photographs, video, and witness information', 'Medical evaluations, treatment history, bills, and future-care evidence', 'Employment and earnings records where income has been affected', 'Insurance communications, policy information, and records showing responsibility'],
    faqs: [
      { question: 'Why work with a personal injury lawyer in Orange County?', answer: 'A local lawyer can bring familiarity with Orange County roads, businesses, medical providers, courts, and claim procedures. That local knowledge does not determine an outcome, but it can help the investigation and case preparation stay grounded in where the injury occurred.' },
      { question: 'Do I still need legal advice if the insurance company offered a settlement?', answer: 'An offer should be reviewed before any release is signed. The evaluation should consider property damage, the complete medical picture, changes in daily life, lost income, future earning ability, future care, and whether the offer accounts for every legally recoverable loss.' },
      { question: 'What if my injury happened a while ago?', answer: 'Legal deadlines vary according to the claim, the defendant, the injured person’s age, and other facts. Some deadlines can be much shorter than people expect. The firm should review the dates promptly rather than assuming the claim is either timely or too late.' },
      { question: 'When should I contact a personal injury lawyer?', answer: 'As soon as immediate health and safety needs are addressed. Evidence can disappear and legal deadlines vary by claim, defendant, and location, so prompt review is important.' },
      { question: 'What can compensation include?', answer: 'Depending on the facts, a claim may involve medical expenses, lost income, future care, pain, disability, emotional distress, and other losses recognized by law.' },
      { question: 'Will every case go to trial?', answer: 'No. Many matters resolve through negotiation or mediation. Trial preparation remains important because it gives the firm a clear way to present the claim if a fair settlement is not offered.' },
      { question: 'What does the first consultation cost?', answer: `Kyle Scott Law offers a free initial case review. ${noRecoveryTerms.en.statement}.` },
    ],
    featuredResults: ['Transit bus crashes into minivan; man suffers cognitive problems', 'Slip-and-fall claim involving complex regional pain syndrome', 'Child suffers dog bites to abdomen'],
    sourceUrl: 'https://kjslaw.com/personal-injury-lawyer-orange-county/',
  },
  {
    key: 'car-accidents',
    path: '/orange-county-auto-accidents-lawyer',
    shortTitle: 'Car Accidents',
    title: 'Orange County Car Accident Lawyer',
    eyebrow: 'Auto, truck, motorcycle, and rideshare crashes',
    description: 'Legal representation after serious vehicle collisions involving drivers, passengers, pedestrians, commercial vehicles, uninsured motorists, and disputed insurance claims.',
    metaDescription: 'Orange County car accident lawyer Kyle Scott represents people injured in auto, truck, motorcycle, pedestrian, rideshare, and uninsured-motorist claims.',
    icon: 'car',
    introTitle: 'A collision claim is about more than the visible vehicle damage.',
    intro: [
      'Crash injuries may be diagnosed immediately, or their full effect may become clearer after imaging, specialist evaluation, and continued treatment. Resolving a claim before the medical picture is understood can leave future care, lost earnings, and lasting symptoms out of the valuation.',
      'Kyle Scott Law reviews how a collision occurred, which parties and policies may be involved, and how the injuries affect daily life and work. The firm handles pre-lawsuit negotiations, uninsured and underinsured motorist issues, litigation, mediation, and trial preparation.',
    ],
    keyPoints: [
      { title: 'Crash reconstruction', body: 'Use physical evidence, reports, video, vehicle damage, and witness accounts to establish how the collision occurred.' },
      { title: 'Medical development', body: 'Connect diagnoses, treatment, future care, and functional limitations to the crash rather than rushing an early settlement.' },
      { title: 'Coverage review', body: 'Identify liability, commercial, rideshare, uninsured-motorist, or other policies that may apply.' },
    ],
    matters: ['Rear-end and intersection collisions', 'Truck and commercial-vehicle crashes', 'Motorcycle and bicycle collisions', 'Pedestrian injuries', 'Uber, Lyft, and other rideshare incidents', 'Uninsured or underinsured motorist claims'],
    evidence: ['Police or traffic-collision reports and witness contacts', 'Scene photographs, dashcam footage, surveillance video, and vehicle data', 'Medical records documenting diagnoses, treatment, and restrictions', 'Insurance policies, claim correspondence, repair estimates, and wage-loss records'],
    faqs: [
      { question: 'Why use an Orange County car accident lawyer?', answer: 'A lawyer who regularly works in Orange County can investigate the roads, agencies, courts, medical providers, and insurers connected to the collision. Local experience does not guarantee a result, but it can make the factual and procedural review more efficient.' },
      { question: 'Should I settle before the full extent of my injuries is known?', answer: 'An early settlement and signed release can prevent a later claim for additional losses. Before resolving the matter, the medical diagnosis, expected recovery, future treatment, work restrictions, and available coverage should be understood as fully as reasonably possible.' },
      { question: 'Should I speak with the other driver’s insurer?', answer: 'You may need to report the claim, but a recorded statement or broad authorization can affect the case. It is sensible to obtain legal advice before giving detailed statements or signing releases.' },
      { question: 'What if the other driver has little or no insurance?', answer: 'Uninsured or underinsured motorist coverage, employer or commercial policies, rideshare coverage, and other responsible parties may need to be reviewed.' },
      { question: 'What if symptoms appeared after the crash?', answer: 'Delayed symptoms can occur. Seek appropriate medical evaluation and accurately report when symptoms began and how they have changed.' },
      { question: 'What losses can a vehicle-collision claim include?', answer: 'Depending on the facts, a claim may include medical expenses, vehicle or property damage, lost earnings, reduced earning ability, future treatment, pain, disability, and other legally recognized harm.' },
      { question: 'What if the insurer accepts fault but disputes the value of the claim?', answer: 'Liability and damages are separate issues. Even when fault is accepted, the parties may disagree about the diagnosis, whether treatment was related, future care, wage loss, policy limits, or the effect of the injury on daily life.' },
      { question: 'How long will a car accident claim take?', answer: 'Timing depends on medical recovery, disputed liability, available coverage, and whether a lawsuit is needed. A fast resolution is not always the same as a complete one.' },
    ],
    featuredResults: ['Transit bus crashes into minivan; man suffers cognitive problems', 'Driver needs a lower-back disc replacement after a freeway rear-end crash', 'Car crash causes neck injuries and headaches'],
    sourceUrl: 'https://kjslaw.com/orange-county-auto-accidents-lawyer/',
  },
  {
    key: 'slip-and-fall',
    path: '/orange-county-slip-and-fall-attorney',
    shortTitle: 'Slip & Fall',
    title: 'Orange County Slip and Fall Attorney',
    eyebrow: 'Premises liability and unsafe property',
    description: 'Claims involving dangerous floors, walkways, stairs, railings, lighting, maintenance failures, and other property conditions that cause preventable injuries.',
    metaDescription: 'Orange County slip and fall attorney Kyle Scott handles premises-liability claims involving unsafe floors, stairs, walkways, maintenance, and dangerous property conditions.',
    icon: 'fall',
    introTitle: 'Premises-liability cases often turn on what the property owner knew and when.',
    intro: [
      'A fall can cause fractures, head injuries, damaged joints, spinal injuries, and substantial time away from work. The legal question is not simply whether someone fell; it is whether a dangerous condition existed and whether the person or business responsible for the property failed to correct it or provide an adequate warning.',
      'These cases can depend on evidence that changes quickly. A spill may be cleaned, a broken surface repaired, or surveillance footage overwritten. Early investigation helps preserve the condition, notice evidence, and the identity of witnesses.',
    ],
    keyPoints: [
      { title: 'Dangerous condition', body: 'Define the specific defect or hazard that caused the incident and why it was unsafe.' },
      { title: 'Notice', body: 'Investigate whether the owner created the condition or knew, or should have known, that it existed.' },
      { title: 'Causation', body: 'Connect the property condition to the fall, the medical diagnosis, and the resulting losses.' },
    ],
    matters: ['Wet, polished, or contaminated floors', 'Broken stairs, handrails, curbs, and walkways', 'Uneven flooring, holes, and trip hazards', 'Poor lighting or inadequate warnings', 'Unsafe retail, restaurant, school, or public property', 'Defective seating, decking, balconies, or common areas'],
    evidence: ['Photographs or video of the condition before it changes', 'Surveillance footage, incident reports, and witness statements', 'Inspection, maintenance, repair, and complaint records', 'Footwear, medical documentation, and evidence of resulting losses'],
    faqs: [
      { question: 'What is a premises-liability claim?', answer: 'It is a claim arising from a dangerous condition on property controlled or occupied by another person or business. The analysis usually considers control of the property, the hazard, notice, the duty to inspect or warn, and whether the condition caused the injury.' },
      { question: 'What must be proven in a slip-and-fall case?', answer: 'A claim generally requires evidence of a dangerous condition, responsibility for the property, notice or another basis for fault, and a connection between the condition and the injury. A fall by itself does not automatically establish negligence.' },
      { question: 'Where can premises-liability incidents occur?', answer: 'Claims can arise at stores, restaurants, apartment buildings, schools, offices, parks, hotels, tourist attractions, parking areas, sidewalks, and other public or private property.' },
      { question: 'What should I do if the hazard is still present?', answer: 'If it can be done safely, photograph the condition and surrounding area, identify witnesses, report the incident, and preserve the clothing and footwear involved.' },
      { question: 'What if the business repaired the condition afterward?', answer: 'A repair can make the original condition difficult to document. Existing photographs, video, reports, witnesses, and maintenance records can become particularly important.' },
      { question: 'What if the property owner says I should have seen the hazard?', answer: 'The visibility of the condition and the actions of everyone involved may be considered. That does not necessarily end the claim; lighting, warnings, distractions created by the property, maintenance practices, and comparative fault may all matter.' },
      { question: 'Can a slip-and-fall case involve future losses?', answer: 'Yes. Serious injuries can require surgery, rehabilitation, future care, work restrictions, or accommodations that should be considered before resolution.' },
    ],
    featuredResults: ['Slip-and-fall claim involving complex regional pain syndrome', 'Woman slips on a sunscreen-slicked pool deck at a waterpark resort', 'Trip-and-fall claim involving a knee injury'],
    sourceUrl: 'https://kjslaw.com/orange-county-slip-and-fall-attorney/',
  },
  {
    key: 'medical-malpractice',
    path: '/orange-county-medical-malpractice-attorney',
    shortTitle: 'Medical Malpractice',
    title: 'Orange County Medical Malpractice Attorney',
    eyebrow: 'Injury caused by negligent medical care',
    description: 'Evaluation of serious injuries involving diagnosis, treatment, surgery, medication, monitoring, aftercare, and other departures from accepted professional standards.',
    metaDescription: 'Orange County medical malpractice attorney Kyle Scott reviews serious claims involving diagnostic, surgical, treatment, medication, and aftercare errors.',
    icon: 'medical',
    introTitle: 'A poor medical outcome is not automatically malpractice.',
    intro: [
      'A medical-negligence claim requires more than an unexpected result. The evidence must support that a health-care provider departed from the applicable professional standard and that the departure caused additional injury or death. Expert review is often central to both questions.',
      'These matters can involve extensive medical records, competing explanations, specialized experts, and deadlines that differ from ordinary injury cases. Prompt, careful screening helps determine whether the medical and legal evidence supports further investigation.',
    ],
    keyPoints: [
      { title: 'Standard of care', body: 'Determine what reasonably careful providers would have done under comparable circumstances.' },
      { title: 'Causation', body: 'Separate harm caused by negligence from the condition that required treatment or an unavoidable complication.' },
      { title: 'Damages', body: 'Evaluate added treatment, disability, lost income, future care, and other losses caused by the medical error.' },
    ],
    matters: ['Failure or delay in diagnosis', 'Surgical and procedural errors', 'Medication or dosage errors', 'Failure to monitor or respond to deterioration', 'Birth-related and hospital negligence', 'Negligent follow-up, discharge, or aftercare'],
    evidence: ['Complete medical charts, imaging, test results, and medication records', 'Prior and subsequent treatment showing the change in condition', 'Qualified expert review of the standard of care and causation', 'Bills, employment records, and future-care evidence tied to the additional injury'],
    faqs: [
      { question: 'What must a medical-malpractice claim establish?', answer: 'The evidence generally must support an applicable professional standard of care, a departure from that standard, injury caused by the departure, and legally compensable damages. Both negligence and causation need to be shown.' },
      { question: 'Does every complication support a malpractice claim?', answer: 'No. Complications can occur without negligence. A viable claim needs evidence of a departure from the professional standard and injury caused by that departure.' },
      { question: 'What is the medical standard of care?', answer: 'It is the level of care reasonably careful health-care professionals would provide under comparable circumstances. Qualified medical experts commonly help identify the standard and evaluate whether the treatment departed from it.' },
      { question: 'What are common examples of possible medical negligence?', answer: 'Claims may involve delayed or missed diagnosis, surgical or anesthesia errors, medication mistakes, failure to monitor, emergency-room errors, improper testing, faulty equipment, or negligent follow-up. Each requires individual medical and legal review.' },
      { question: 'Why is expert review important?', answer: 'Medical experts often help explain the applicable standard of care, whether it was breached, and whether that breach caused the claimed harm.' },
      { question: 'Are medical-malpractice deadlines different?', answer: 'They can be shorter and more complex than ordinary injury deadlines, with different rules depending on the provider and circumstances. Prompt legal review is important.' },
      { question: 'What information helps with an initial review?', answer: 'A concise chronology, provider names, facilities, dates, diagnoses, and an explanation of how the condition changed can help the firm identify what records and expert review may be needed.' },
      { question: 'Who may be responsible in a malpractice case?', answer: 'Depending on the evidence, a claim may involve an individual provider, medical group, hospital, facility, corporation, or another entity. Product or device issues may require a separate liability analysis.' },
    ],
    featuredResults: ['Medical malpractice involving failure to diagnose'],
    sourceUrl: 'https://kjslaw.com/orange-county-medical-malpractice-attorney/',
  },
  {
    key: 'elder-abuse',
    path: '/orange-county-elder-abuse-attorney',
    shortTitle: 'Elder Abuse & Neglect',
    title: 'Orange County Elder Abuse and Neglect Attorney',
    eyebrow: 'Abuse and neglect of elders and dependent adults',
    description: 'Representation for older adults, dependent adults, and their families when a nursing home, assisted-living facility, hospital, or caregiver neglected their care or abused them, including pressure injuries, falls, dehydration, and malnutrition.',
    metaDescription: 'Orange County elder abuse and neglect attorney Kyle Scott represents older and dependent adults hurt by neglect or abuse in nursing homes, care facilities, and home care. Free consultation.',
    icon: 'care',
    introTitle: 'California gives elders and dependent adults extra protection when the people caring for them fail them.',
    intro: [
      'California’s Elder Abuse and Dependent Adult Civil Protection Act (Welfare and Institutions Code § 15600 and following) protects people 65 and older, and adults 18 to 64 whose physical or mental limitations restrict their ability to carry out normal activities or protect their rights, against physical abuse, neglect, abandonment, isolation, and financial abuse. Neglect includes a caregiver’s failure to help with personal hygiene, provide food, water, and medical care, prevent malnutrition and dehydration, or protect the person from health and safety hazards.',
      'When neglect or abuse is proven, generally by clear and convincing evidence, and the responsible party acted with recklessness, oppression, fraud, or malice, the Act allows remedies beyond those of an ordinary injury case, including attorney’s fees and costs (§ 15657). Since January 1, 2026, a court may apply the lower preponderance-of-the-evidence standard if a skilled nursing facility, or certain licensed residential care facilities, intentionally destroyed, concealed, or altered records it was required to keep (§ 15657.02). Holding a facility’s operator to those remedies also requires proof of what its managers knew, authorized, or ratified (Civil Code § 3294(b)). Kyle Scott Law reviews the records, the care plan, and the facility’s history to determine whether the evidence supports a claim.',
    ],
    keyPoints: [
      { title: 'Neglect is a failure of care', body: 'A bad outcome is not neglect by itself. Neglect is a caregiver’s failure to provide the care a reasonable person in that position would provide, such as repositioning a resident who cannot move, preventing dehydration, supervising someone at risk of falling, or getting medical help when a condition worsens.' },
      { title: 'Elder abuse or medical malpractice', body: 'Claims about a facility’s basic custodial care, such as turning, feeding, hydration, hygiene, and supervision, can fall under the Elder Abuse Act. Claims about a health-care provider’s professional judgment, such as a diagnosis or a surgery, are usually medical malpractice, with different rules and deadlines. Many cases involve both.' },
      { title: 'The facility’s own records', body: 'Care plans, turning and repositioning logs, medication records, staffing levels, incident reports, and state inspection findings often show what was supposed to happen and what did not. The firm requests them early, before they are lost.' },
      { title: 'Deadlines', body: 'Most injury claims must be filed within two years, but claims involving a health-care provider’s professional negligence can have shorter deadlines, and a claim against a public facility generally requires a government claim within six months. Which rules apply depends on the facts, so prompt review matters.' },
    ],
    matters: [
      'Pressure injuries (bedsores) that develop or worsen in a facility',
      'Falls from unsafe transfers, missing supervision, or ignored fall-risk plans',
      'Dehydration, malnutrition, and unexplained weight loss',
      'Infections and sepsis from untreated wounds or poor hygiene',
      'Medication errors and failures to get timely medical care',
      'Physical abuse, rough handling, or unexplained injuries by caregivers',
      'Wrongful death caused by abuse or neglect',
    ],
    evidence: [
      'The resident’s care plan, assessments, and turning and repositioning records',
      'Medication administration records, nursing notes, and physician orders',
      'Dated photographs of wounds and injuries',
      'Hospital records showing the person’s condition on arrival from the facility',
      'Incident reports, staffing records, and complaints made to the facility',
      'State inspection reports and any Adult Protective Services or ombudsman report',
    ],
    faqs: [
      { question: 'What counts as elder abuse or neglect in California?', answer: 'Under the Elder Abuse and Dependent Adult Civil Protection Act, abuse includes physical abuse, neglect, abandonment, isolation, and financial abuse of a person 65 or older or of a dependent adult. Neglect is the failure of someone responsible for the person’s care to provide the care a reasonable person in that position would, such as help with hygiene, food and water, medical care, and protection from health and safety hazards.' },
      { question: 'Who can be responsible?', answer: 'Depending on the facts, a nursing home, skilled nursing facility, assisted-living or residential care facility, home-care agency, individual caregiver, or the company that operates the facility. Large facilities are often owned by one company and managed by another, and the firm identifies each one.' },
      { question: 'What should we do if we suspect abuse or neglect?', answer: 'First make sure your loved one is safe and getting medical care; in an emergency, call 911. Report suspected abuse in a long-term care facility to the Long-Term Care Ombudsman or local law enforcement, and abuse elsewhere to Adult Protective Services. Photograph injuries, keep a written timeline, and save your messages with the facility.' },
      { question: 'Can we bring a claim if our loved one has passed away?', answer: 'Often, yes. Depending on the facts, the family may have a wrongful-death claim, and the estate or successor in interest may bring the person’s own claim. When the Act’s heightened standard is met, that claim can include damages for the pain and suffering the person endured before death, up to a limit set by statute.' },
      { question: 'Is a bedsore always neglect?', answer: 'No. Some pressure injuries develop despite good care. A claim depends on whether the facility assessed the risk, followed a care plan to prevent the injury, and treated it properly once it appeared. The care records usually answer those questions.' },
      { question: 'Should we move our loved one before contacting a lawyer?', answer: 'Safety comes first, and moving a resident to better care does not end a claim. Before or soon after a move, request a copy of the facility’s chart and keep photographs and notes of the conditions you saw.' },
      { question: 'What does it cost?', answer: `Nothing up front. The firm works on a contingency fee and advances the case costs. ${noRecoveryTerms.en.statement}.` },
    ],
    featuredResults: ['Nursing-home neglect settlement'],
  },
  {
    key: 'dog-bites',
    path: '/dog-bite-attorney-in-orange-county',
    shortTitle: 'Dog Bites',
    title: 'Dog Bite Attorney in Orange County',
    eyebrow: 'Dog attacks and preventable animal injuries',
    description: 'Representation after dog bites causing puncture wounds, scarring, nerve or tendon damage, infection, psychological trauma, and other serious harm.',
    metaDescription: 'Orange County dog bite attorney Kyle Scott represents adults and children injured by dog attacks, including claims involving scarring, nerve damage, infection, and trauma.',
    icon: 'dog',
    introTitle: 'Dog bites can cause lasting physical and psychological injuries.',
    intro: [
      'A bite can damage skin, muscles, tendons, nerves, and joints. Facial wounds may require scar evaluation or reconstructive care, while hand injuries can affect movement and work. Children and adults may also experience anxiety, nightmares, or fear after an attack.',
      'California law can hold a dog owner responsible for a bite occurring in a public place or while the injured person was lawfully on private property. Even when liability appears clear, insurance coverage, exclusions, ownership, and the full extent of the injury may still be disputed.',
    ],
    keyPoints: [
      { title: 'Ownership and location', body: 'Identify the dog, owner, custodian, property, and circumstances surrounding the attack.' },
      { title: 'Medical impact', body: 'Document wound care, infection risk, scarring, nerve or tendon injury, and psychological effects.' },
      { title: 'Coverage', body: 'Investigate homeowners, renters, property, or other insurance that may respond to the claim.' },
    ],
    matters: ['Facial bites and permanent scarring', 'Hand, wrist, tendon, and nerve injuries', 'Infections and puncture wounds', 'Attacks involving children', 'Psychological trauma and fear of animals', 'Disputes involving owners, landlords, or insurance exclusions'],
    evidence: ['Photographs of the wounds, healing, and scarring over time', 'Animal-control, police, or incident reports', 'Owner, witness, vaccination, and prior-incident information', 'Medical records, scar evaluations, bills, and psychological treatment where applicable'],
    faqs: [
      { question: 'Is a dog owner responsible even if the dog never bit anyone before?', answer: 'California law generally imposes liability on a dog owner for a bite in a public place or while the injured person was lawfully on private property. The exact facts, statutory exceptions, ownership, location, and defenses still require review.' },
      { question: 'What compensation may be available after a dog bite?', answer: 'Depending on the injury and available coverage, a claim may include medical bills, scar treatment or cosmetic care, lost income, pain, impaired function, psychological harm, and other legally recognized losses.' },
      { question: 'Why is prompt medical attention important?', answer: 'Bites can damage tissue, tendons, nerves, and joints and may introduce bacteria that causes infection. Immediate health needs come first, and the medical record also documents the wound and recommended care.' },
      { question: 'Should I report a dog bite?', answer: 'Serious bites should receive prompt medical attention. Reporting the incident can also help identify the dog, owner, vaccination history, and circumstances of the attack.' },
      { question: 'What if the bite occurred at someone’s home?', answer: 'A claim may still exist if you were lawfully on the property. Insurance coverage and the relationship between the owner, occupant, and property may need review.' },
      { question: 'What if the insurer says the policy excludes the dog?', answer: 'Coverage can be disputed because of breed, animal, residency, or other policy language. The actual policy, ownership, household, property, and any other potential coverage should be reviewed before accepting that position.' },
      { question: 'How is scarring evaluated?', answer: 'Location, visibility, healing, age, medical recommendations, and potential reconstructive treatment can all affect the evaluation.' },
      { question: 'Can psychological harm be part of the claim?', answer: 'When supported by the evidence, anxiety, nightmares, post-traumatic symptoms, and other emotional effects may be considered with the physical injuries.' },
    ],
    featuredResults: ['Child suffers dog bites to abdomen', 'Woman suffers wrist nerve damage from dog bite', 'Woman suffers dog bite injuries'],
    sourceUrl: 'https://kjslaw.com/dog-bite-attorney-in-orange-county/',
  },
  {
    key: 'traumatic-brain-injury',
    path: '/orange-county-traumatic-brain-injury-attorney',
    shortTitle: 'Traumatic Brain Injury',
    title: 'Orange County Traumatic Brain Injury Attorney',
    eyebrow: 'Concussions and life-changing brain trauma',
    description: 'Representation for people and families dealing with concussion, cognitive changes, memory problems, headaches, balance issues, seizures, and other effects of brain injury.',
    metaDescription: 'Orange County traumatic brain injury attorney Kyle Scott represents clients with concussion, cognitive impairment, memory loss, headaches, balance problems, and serious brain trauma.',
    icon: 'brain',
    introTitle: 'Brain injuries can change cognition, work, relationships, and independence.',
    intro: [
      'A traumatic brain injury may follow a direct blow, rapid acceleration and deceleration, a fall, or penetration. Some injuries are immediately visible, while others become clearer through persistent symptoms, neuropsychological testing, imaging, specialist care, and observations from family or coworkers.',
      'The legal evaluation should account for more than the emergency-room visit. It may include changes in memory, concentration, mood, sleep, balance, speech, vision, employment, supervision needs, and the ability to perform ordinary activities.',
    ],
    keyPoints: [
      { title: 'Diagnosis and symptoms', body: 'Build a consistent medical record of symptoms, evaluations, testing, treatment, and functional changes.' },
      { title: 'Life impact', body: 'Document effects on work, education, relationships, independence, and the need for future support.' },
      { title: 'Cause', body: 'Connect the neurological injury to the collision, fall, assault, or other event through medical and factual evidence.' },
    ],
    matters: ['Concussion and post-concussive symptoms', 'Memory, concentration, and executive-function problems', 'Headaches, dizziness, vision, and balance changes', 'Seizures, sleep disturbance, and mood changes', 'Brain bleeding, swelling, or skull fractures', 'Future care, supervision, and loss of earning capacity'],
    evidence: ['Emergency, neurology, imaging, therapy, and neuropsychological records', 'Statements from family, friends, teachers, or coworkers describing changes', 'Employment, education, and activity records from before and after the injury', 'Life-care, vocational, and other expert evidence for lasting impairment'],
    faqs: [
      { question: 'What symptoms can follow a traumatic brain injury?', answer: 'Symptoms may include confusion, memory loss, headaches, fatigue, sleep problems, dizziness, balance or vision changes, concentration difficulty, irritability, depression, vomiting, or seizures. Urgent or worsening symptoms require immediate medical attention.' },
      { question: 'What can cause a traumatic brain injury?', answer: 'Common causes include vehicle and motorcycle collisions, pedestrian incidents, falls, sports injuries, assaults, and other events that produce a blow or rapid movement of the head and brain.' },
      { question: 'Can a person have a brain injury without losing consciousness?', answer: 'Yes. Loss of consciousness is not required for every concussion or brain injury. Medical evaluation should be based on the full event and symptoms.' },
      { question: 'How are brain injuries classified?', answer: 'Clinicians may describe injuries as mild, moderate, or severe and may also identify the type of injury, such as concussion, contusion, diffuse axonal injury, hemorrhage, or hematoma. The label is only part of the evaluation; lasting function and care needs also matter.' },
      { question: 'Why do family observations matter?', answer: 'A person with cognitive or behavioral changes may not recognize every difference. People who knew them before the injury can help document changes in memory, mood, function, and independence.' },
      { question: 'What if imaging was normal?', answer: 'Some brain injuries are not shown on routine imaging. Diagnosis and legal proof can involve clinical findings, symptom history, specialist evaluation, testing, and functional evidence.' },
      { question: 'Can a brain-injury claim include future support?', answer: 'When supported by the evidence, the evaluation may include future treatment, therapy, supervision, transportation, vocational loss, home assistance, and other long-term needs.' },
      { question: 'What should happen first after a possible brain injury?', answer: 'Medical safety comes first. Urgent or worsening neurological symptoms require immediate medical attention; legal review comes after immediate care is addressed.' },
    ],
    featuredResults: ['Student suffers skull fracture and brain bleed', 'Transit bus crashes into minivan; man suffers cognitive problems', 'Woman slips on a sunscreen-slicked pool deck at a waterpark resort'],
    sourceUrl: 'https://kjslaw.com/orange-county-traumatic-brain-injury-attorney/',
  },
  {
    key: 'sexual-harassment-abuse',
    path: '/sexual-harassment-lawyer-in-orange-county',
    shortTitle: 'Sexual Harassment & Abuse',
    title: 'Sexual Harassment and Abuse Lawyer in Orange County',
    eyebrow: 'Harassment, assault, abuse, and institutional liability',
    description: 'Confidential representation in matters involving workplace harassment, sexual assault, child sexual abuse, abuse by people in positions of trust, and institutional failures.',
    metaDescription: 'Orange County sexual harassment and abuse lawyer Kyle Scott represents survivors in workplace, assault, molestation, school, clergy, and institutional-liability matters.',
    icon: 'support',
    introTitle: 'Survivors deserve privacy, respect, and a careful legal review.',
    intro: [
      'Sexual harassment, assault, and abuse can involve a workplace, school, church, medical setting, youth organization, or another institution. A civil claim may examine not only the individual conduct but also whether an employer or institution failed to screen, supervise, respond, protect, or act on prior warning signs.',
      'These matters require sensitivity and disciplined preparation. Kyle Scott Law has handled significant sexual-abuse and institutional-liability claims, including published school and clergy matters. The firm limits public details where confidentiality protects the client.',
    ],
    keyPoints: [
      { title: 'Confidential review', body: 'Begin with a private discussion focused on what happened, potential defendants, and the client’s immediate concerns.' },
      { title: 'Institutional responsibility', body: 'Investigate hiring, supervision, reporting, prior complaints, policies, and failures to protect.' },
      { title: 'Documented harm', body: 'Present psychological, medical, educational, employment, and other effects with appropriate privacy protections.' },
    ],
    matters: ['Workplace sexual harassment and hostile-environment claims', 'Sexual assault and battery', 'Child sexual abuse and molestation', 'Teacher, coach, clergy, or employee abuse', 'School, church, employer, and institutional liability', 'Retaliation, wrongful termination, and related employment claims'],
    evidence: ['Messages, emails, reports, complaints, and contemporaneous notes', 'Witnesses and prior complaints involving the same person or institution', 'Employment, school, supervision, and policy records', 'Therapy, medical, educational, and other records documenting harm when appropriate'],
    faqs: [
      { question: 'What conduct may qualify as sexual harassment?', answer: 'Potential harassment can include unwelcome sexual advances, requests for sexual favors, or verbal or physical conduct of a sexual nature. A workplace claim depends on the full facts, including severity, frequency, context, employer size, notice, and response.' },
      { question: 'How is child sexual abuse different from workplace harassment?', answer: 'Child sexual abuse concerns sexual conduct involving a minor and may include physical contact, exploitation, exposure, or grooming. Workplace harassment arises under employment and civil-rights laws. The defendants, deadlines, evidence, and available claims can be very different.' },
      { question: 'Will my information remain confidential?', answer: 'The firm treats the initial consultation as private. Some claims or filings may later require disclosure, but strategy can include appropriate confidentiality protections and careful handling of sensitive information.' },
      { question: 'Can an institution be responsible for abuse by an employee?', answer: 'Potential responsibility depends on the facts, including hiring, supervision, prior notice, reporting, response, and the relationship between the person and institution.' },
      { question: 'Is a civil case separate from a criminal case?', answer: 'Yes. A criminal case is brought by the government and addresses punishment. A civil claim is brought by the survivor or other authorized claimant and may seek compensation and accountability from individuals or institutions. The two processes can overlap but serve different purposes.' },
      { question: 'What resources are available before speaking with a lawyer?', answer: 'Immediate danger should be reported to emergency services. Survivors may also contact law enforcement, local support organizations, 211 Orange County, RAINN, counselors, or other trusted resources. A civil consultation can occur alongside those support options.' },
      { question: 'What if the abuse happened years ago?', answer: 'Time limits in abuse and employment matters can be highly specific and may change. The date, age of the survivor, defendant, and type of claim all matter, so prompt legal review is important.' },
      { question: 'Do I need every document before calling?', answer: 'No. A concise account of what happened, who was involved, approximate dates, reports made, and the institution involved is enough to begin a confidential review.' },
    ],
    featuredResults: ['Elementary school boys molested by a teacher', 'Huntington Beach student molested by her teacher and coach', 'Teenage boy molested by church employee'],
    sourceUrl: 'https://kjslaw.com/sexual-harassment-lawyer-in-orange-county/',
  },
  {
    key: 'wrongful-death',
    path: '/orange-county-wrongful-death-attorney',
    shortTitle: 'Wrongful Death',
    title: 'Orange County Wrongful Death Attorney',
    eyebrow: 'Fatal negligence and family claims',
    description: 'Representation for families after a preventable death involving vehicle crashes, unsafe property, professional negligence, defective conduct, or institutional failures.',
    metaDescription: 'Orange County wrongful death attorney Kyle Scott represents families after fatal vehicle crashes, unsafe property, negligence, malpractice, and institutional failures.',
    icon: 'scale',
    introTitle: 'A wrongful-death claim requires respectful, exacting preparation.',
    intro: [
      'When negligence or wrongful conduct causes a death, the legal claim must establish responsibility while documenting the financial and personal losses experienced by the surviving family. The process takes place alongside grief, estate questions, insurance issues, and practical changes that cannot be reduced to paperwork.',
      'Kyle Scott Law reviews fatal incidents involving transportation, unsafe property, professional negligence, institutions, and other responsible parties. The firm’s published results include a wrongful-death recovery arising from a military aircraft crash.',
    ],
    keyPoints: [
      { title: 'Responsibility', body: 'Preserve physical, documentary, and witness evidence needed to explain how the death occurred and who may be liable.' },
      { title: 'Eligible claims', body: 'Identify the proper claimants, estate-related issues, insurance, and all responsible defendants.' },
      { title: 'Family losses', body: 'Document financial support, services, companionship, and other losses recognized under the applicable law.' },
    ],
    matters: ['Fatal car, truck, motorcycle, and pedestrian collisions', 'Aviation and transportation incidents', 'Unsafe property and premises liability', 'Medical or professional negligence', 'Defective products or negligent operations', 'School, employer, and institutional responsibility'],
    evidence: ['Investigative reports, photographs, video, physical evidence, and witnesses', 'Medical, coroner, transportation, or agency records', 'Employment, income, tax, benefits, and household-support records', 'Family, relationship, estate, insurance, and expert evidence'],
    faqs: [
      { question: 'Who can bring a wrongful-death claim?', answer: 'The answer depends on California law, family relationships, estate issues, and the facts of the death. The firm can review who may have standing before a claim is filed.' },
      { question: 'Can there be both a wrongful-death and an estate claim?', answer: 'Potential claims may belong to surviving family members, the estate, or both. The available claims and damages depend on the circumstances and should be evaluated together.' },
      { question: 'What if an agency is investigating?', answer: 'Agency findings can be important, but a civil investigation may still need separate evidence, experts, preservation requests, and analysis of responsible parties and insurance.' },
      { question: 'What losses can a wrongful-death claim address?', answer: 'The available damages depend on the claim and family relationships. They may include financial support, household services, and the loss of companionship, guidance, and other legally recognized contributions.' },
      { question: 'Who may be responsible for a preventable death?', answer: 'Potential defendants can include drivers, employers, property owners, professionals, manufacturers, institutions, public entities, or others whose conduct contributed to the death. Each theory requires supporting evidence.' },
      { question: 'How soon should the family obtain legal advice?', answer: 'There is no need to make every decision immediately, but evidence and deadlines can be time-sensitive. An early consultation can protect the claim while the family considers next steps.' },
    ],
    featuredResults: ['Wrongful death of a Marine in a military aircraft crash near Tucson'],
  },
  {
    key: 'school-liability',
    path: '/orange-county-school-liability-attorney',
    shortTitle: 'School Liability',
    title: 'Orange County School Liability Attorney',
    eyebrow: 'Injuries and abuse on campus, at school events, and on school transportation',
    description: 'Representation for students and families when a school district, private school, or its employees failed to supervise, protect, or maintain — including sexual abuse by staff, playground and sports injuries, bullying and assaults, and unsafe campus conditions.',
    metaDescription: 'Orange County school liability attorney Kyle Scott represents students injured or abused at school. Results include a $6.8M school negligence settlement and a $5.75M verdict. Free consultation.',
    icon: 'scale',
    introTitle: 'Schools owe students a duty of supervision, and public school districts answer for it on a six-month clock.',
    intro: [
      'California courts have long held that a school district owes its students a duty to supervise them and to protect them from foreseeable harm, whether the harm comes from an unsafe playground, an unsupervised fight, a coach who ignores a head injury, or an employee who should never have been hired. When that duty is broken, the district, not the individual teacher, is usually the responsible party.',
      'Most Orange County schools are public entities, which changes the rules: a written government claim generally must be presented within six months of the injury before any lawsuit can be filed, and a missed deadline can end an otherwise strong case. Kyle Scott Law has tried and settled school cases, including the $6.8M school negligence settlement and the $5.75M verdict against Long Beach Unified, and calendars that deadline on the first day.',
    ],
    keyPoints: [
      { title: 'The six-month government claim', body: 'A claim against a school district, a county office of education, or a charter school generally must be presented within six months under the Government Claims Act. The firm prepares and serves it, then handles the district’s response and the lawsuit that follows if the claim is rejected.' },
      { title: 'Supervision and hiring', body: 'Districts answer for negligent supervision of students and for negligent hiring, retention, and supervision of employees who harm them. Personnel files, prior complaints, and training records are requested early, before they are lost.' },
      { title: 'Abuse cases have their own rules', body: 'For childhood sexual abuse that happened on or after January 1, 2024, California sets no deadline to sue (Code of Civil Procedure § 340.1). For earlier abuse, a claim can be brought until the survivor turns 40 or within five years of discovering the harm, whichever is later (§ 340.11). The six-month government claim requirement does not apply to either. Every case is evaluated on its own facts and dates.' },
      { title: 'Private schools and contractors', body: 'A private school, a bus company, an after-school program, or a security contractor is sued under ordinary negligence rules, without the government claim step but with the same duty to supervise and protect.' },
    ],
    matters: [
      'Sexual abuse or misconduct by teachers, coaches, aides, and volunteers',
      'Injuries from fights, bullying, and assaults the school knew about or should have prevented',
      'Playground, physical-education, and athletic injuries, including mishandled concussions',
      'Falls and injuries from unsafe campus conditions, equipment, and construction',
      'School bus, field-trip, and campus-traffic collisions',
      'Injuries to students with disabilities whose plans were not followed',
    ],
    evidence: [
      'The incident report, nurse’s log, and any witness statements the school collected',
      'Supervision schedules, staffing ratios, and the policies in force that day',
      'Personnel files, prior complaints, and mandated-reporter records',
      'Surveillance video, photographs of the location, and maintenance records',
      'Medical records, IEP or 504 plans, and school communications with the family',
      'Dates: when the injury happened and when it was discovered, which control the deadlines',
    ],
    faqs: [
      { question: 'How long do I have to bring a claim against a school district?', answer: 'For most injuries, a written government claim generally must be presented to the district within six months of the incident; a lawsuit can follow only after the claim is rejected or deemed rejected. Childhood sexual abuse claims follow different, longer rules. Because the dates control everything, contact a lawyer as soon as possible.' },
      { question: 'Is the teacher or the district responsible?', answer: 'Usually the district, which employs and supervises the staff and controls the campus. The district can be responsible for its own negligence, such as poor supervision or unsafe conditions, and for the acts of employees within the scope of their work.' },
      { question: 'My child was hurt in a fight the school did nothing about. Is that a case?', answer: 'It can be. Schools must supervise students and respond to known threats. Prior complaints, the school’s bullying policy, and what staff saw or were told before the incident decide whether the school failed its duty.' },
      { question: 'Does a sports injury count?', answer: 'Ordinary risks of a sport are usually not the school’s fault, but a coach who ignores a concussion, sends an injured athlete back in, or provides unsafe equipment can be. The $5.75M Long Beach Unified verdict involved a student who suffered a skull fracture and brain bleed.' },
      { question: 'What about a private school?', answer: 'Private schools are sued under ordinary negligence rules. There is no government claim step, but the two-year personal injury deadline and the longer childhood sexual abuse rules still apply.' },
      { question: 'Will my child have to testify?', answer: 'Most school cases resolve before trial. When testimony is needed, the firm prepares the family carefully and uses the protections courts offer minors, including confidentiality where available.' },
      { question: 'What does it cost?', answer: `Nothing up front. The firm works on a contingency fee and advances the case costs. ${noRecoveryTerms.en.statement}.` },
    ],
    featuredResults: ['Elementary school boys molested by a teacher', 'Student suffers skull fracture and brain bleed', 'Huntington Beach student molested by her teacher and coach'],
  },
];

export const practiceAreaByKey = Object.fromEntries(practiceAreas.map((area) => [area.key, area])) as Record<string, PracticeAreaData>;
