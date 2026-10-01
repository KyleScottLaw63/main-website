import { newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { allResults, caseStoryPath, resultOutcomeLabel, type CaseResult } from '@/lib/marketing/data/results';

export type CaseStoryChapter = { heading: string; paragraphs: string[] };

/**
 * The story behind a result, at /results/<slug> (docs/case-stories.md). Only stories the firm's
 * attorney approved, in their approved words, and never the drafts' internal amounts, sources, or
 * review notes. A story with a published amount belongs to that result card (the card's `story`
 * names it) and reads its amount, title, outcome, and year from the card. A confidential settlement
 * is told without its amount and without a card: `confidential` carries its title.
 */
export type CaseStory = {
  slug: string;
  /** One or two sentences: the page's standfirst, its meta description, and the teaser on story cards. */
  summary: string;
  court: string;
  practiceArea: { label: string; href: string };
  /** The approved story text, word for word, in the order it was written. */
  chapters: CaseStoryChapter[];
  /** Figures the story itself states, drawn to scale (what the defense argued, then the result). */
  comparison?: { caption: string; figures: Array<{ label: string; amount: string; value: number }> };
  /** The firm's own announcement of the result, when it published one (an archived post). */
  announcement?: { label: string; href: string };
  /** When the case was resolved (YYYY-MM), from the firm's records: orders the stories newest first; never shown. */
  resolved: string;
  /** The day the story went on the site (structured data and sitemap). */
  published: string;
  /** A confidential settlement: no amount and no card. The year shows only where the story's own text states it. */
  confidential?: { title: string; year?: number };
};

const approved = '2026-10-01';

export const caseStories: CaseStory[] = [
  {
    slug: 'student-skull-fracture-verdict',
    summary:
      'A kindergartner fractured his skull in a PE sprint drill. After a two-week trial in Los Angeles Superior Court, the jury returned a $5.75 million verdict.',
    court: 'Los Angeles Superior Court',
    practiceArea: { label: 'School Liability', href: '/orange-county-school-liability-attorney' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'A kindergarten student was running a timed sprint drill in physical education class. The teacher sent the children in waves on an asphalt field, and they ran at different speeds.',
          'Another child veered out of the lane and back again, striking our client, who fell and hit his head on the asphalt.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: [
          'Hospital imaging found a skull fracture, a subdural hematoma and a brain contusion. A later MRI showed lasting traces of bleeding on the surface of his brain, and neuropsychological testing found a significant drop in part of his measured IQ.',
        ],
      },
      {
        heading: 'The trial',
        paragraphs: [
          'The school district denied responsibility, and the case went to a two-week jury trial in Los Angeles Superior Court. The jury returned a $5.75 million verdict for the child against the Long Beach Unified School District.',
        ],
      },
    ],
    announcement: {
      label: 'The firm’s announcement, November 2019',
      href: '/news/kyle-scott-keith-bruno-obtain-5-75-m-verdict-against-long-beach-unified-school-district',
    },
    resolved: '2019-09',
    published: approved,
  },
  {
    slug: 'fontana-intersection-crash-settlement',
    summary:
      'A Fontana intersection crash injured our client and her two children. A joint demand resolved the claims of all five injured people for a combined $2.7 million.',
    court: 'San Bernardino Superior Court',
    practiceArea: { label: 'Car Accidents', href: '/orange-county-auto-accidents-lawyer' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'A driver caused a collision at a Fontana intersection in 2024 that injured our client, a mother, and her two children, along with members of another family.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: [
          'Our client suffered injuries to both hands that took three surgeries to repair, and she also needed treatment for her spine. The children were treated for their injuries as well.',
        ],
      },
      {
        heading: 'The case',
        paragraphs: [
          'The firm took over the case from prior counsel and filed suit in San Bernardino Superior Court. Working with the other family’s attorney, the firm then made a joint, time-limited settlement demand. The insurer accepted it, resolving the claims of all five injured people for a combined $2.7 million.',
        ],
      },
    ],
    resolved: '2026-09',
    published: approved,
  },
  {
    slug: 'school-counselor-abuse-settlement',
    summary:
      'An adult survivor of abuse by her high school counselor sued the district after California revived older claims. The district settled shortly before trial.',
    court: 'Riverside County Superior Court',
    practiceArea: { label: 'School Liability', href: '/orange-county-school-liability-attorney' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client, now an adult, alleged that she was sexually abused as a high school student by her school counselor. For decades, a claim like hers would have been too late.',
        ],
      },
      {
        heading: 'The case',
        paragraphs: [
          'After California revived older childhood sexual abuse claims, the firm filed suit in Riverside County Superior Court against the school district that employed the counselor, alleging that the district failed to protect her. The court allowed her to proceed under a pseudonym so that her identity would stay out of public filings.',
        ],
      },
      {
        heading: 'The result',
        paragraphs: [
          'The firm litigated the case for about a year and a half, and the district settled shortly before trial.',
        ],
      },
    ],
    resolved: '2024-02',
    published: approved,
  },
  {
    slug: 'crosswalk-pedestrian-settlement',
    summary:
      'A driver failed to yield and struck our client in a marked Hemet crosswalk. After more than two years of litigation, the case settled in 2024.',
    court: 'Riverside County Superior Court',
    practiceArea: { label: 'Car Accidents', href: '/orange-county-auto-accidents-lawyer' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client was walking across a Hemet street in a marked crosswalk when a driver failed to yield and struck her, and she suffered broken bones.',
        ],
      },
      {
        heading: 'The case',
        paragraphs: [
          'The complaint alleged that the driver violated the Vehicle Code rule requiring drivers to yield to pedestrians in a marked crosswalk. It also alleged that the vehicle belonged to a rental car company that had entrusted it to him.',
          'The firm filed suit in Riverside County Superior Court against the driver and the vehicle’s owner, later adding the rental company’s operating entity to the case. After more than two years of litigation, the case settled in 2024.',
        ],
      },
    ],
    resolved: '2024-09',
    published: approved,
  },
  {
    slug: 'ballpark-warm-up-throw-settlement',
    summary:
      'A pitcher’s warm-up throw struck a six-year-old in the head near the dugout, fracturing his skull. The case resolved through a settlement the court approved.',
    court: 'Orange County Superior Court',
    practiceArea: { label: 'Traumatic Brain Injury', href: '/orange-county-traumatic-brain-injury-attorney' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'A six-year-old boy was at a professional baseball stadium with his father well before a game. He was walking along the front row of field-level seats toward the home team’s dugout, where players were signing autographs; the complaint alleged that the team encouraged children to come down before games to meet players.',
          'A pitcher warming up nearby threw a ball toward a teammate, who missed it.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: ['The ball struck the boy on the left side of his head, fracturing his skull and causing bleeding on his brain.'],
      },
      {
        heading: 'The case',
        paragraphs: [
          'The complaint alleged that this section of seating had no protective netting and that fans got no warning about players throwing there. The firm sued in Orange County Superior Court for negligence and premises liability, and the case resolved through a settlement that the court approved for the child.',
        ],
      },
    ],
    resolved: '2023-04',
    published: approved,
  },
  {
    slug: 'octa-bus-crash-verdict',
    summary:
      'A transit bus rear-ended our client’s stopped minivan. The defense argued the case was worth $157,000; an Orange County jury returned a $928,493.12 verdict.',
    court: 'Orange County Superior Court',
    practiceArea: { label: 'Car Accidents', href: '/orange-county-auto-accidents-lawyer' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client, a driver in his seventies, was stopped in traffic on the 22 Freeway when an Orange County Transportation Authority bus struck the back of his minivan. Bus video showed the bus may have been going as fast as 35.7 mph just before impact.',
          'The crash shattered the minivan’s rear glass and pushed it into a large SUV. He was shaken but declined emergency care at the scene.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: [
          'In the months that followed he developed memory loss, trouble finding words and difficulty solving problems. The experts disagreed about whether he had a mild traumatic brain injury, but the psychologists and psychiatrist agreed that an adjustment disorder with anxiety and depression, caused by the crash, was behind his cognitive problems.',
        ],
      },
      {
        heading: 'The verdict',
        paragraphs: [
          'OCTA’s lawyer argued the case was worth $157,000. The Orange County jury rejected that and returned a verdict of $928,493.12.',
        ],
      },
    ],
    comparison: {
      caption: 'What OCTA’s lawyer argued, and what the jury decided',
      figures: [
        { label: 'OCTA’s lawyer argued the case was worth', amount: '$157,000', value: 157_000 },
        { label: 'The jury’s verdict', amount: '$928,493.12', value: 928_493.12 },
      ],
    },
    announcement: {
      label: 'The firm’s announcement, April 2017',
      href: '/news/oc-jury-provides-justice-man-suffering-cognitive-problems-928493-12-verdict',
    },
    resolved: '2017-04',
    published: approved,
  },
  {
    slug: 'batting-practice-head-injury-settlement',
    summary:
      'A 14-year-old at a youth baseball academy was hit in the head by a pitch without a helmet. The firm defeated summary judgment, and all defendants settled.',
    court: 'Orange County Superior Court',
    practiceArea: { label: 'Personal Injury', href: '/personal-injury-lawyer-orange-county' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client, then 14, was enrolled in a youth baseball training academy that held its sessions at an indoor training facility in Orange County. During batting practice, another young player pitched to him.',
          'According to the complaint, he had not been given a batting helmet or told to wear one. The pitch struck him on the left side of his head, near his ear.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: ['The complaint alleged a ruptured left eardrum, hearing loss, and emotional harm including anxiety, nightmares and trouble sleeping.'],
      },
      {
        heading: 'The case',
        paragraphs: [
          'The firm sued the academy’s operator and the facility’s owners in Orange County Superior Court for negligence and premises liability. It defeated a defense motion for summary judgment and pursued the case for more than three years, until all defendants settled.',
        ],
      },
    ],
    resolved: '2026-01',
    published: approved,
  },
  {
    slug: 'nursing-facility-pressure-wound-settlement',
    summary:
      'A dependent adult’s pressure wound worsened into an infected ulcer in a nursing facility. The firm sued under California’s Elder Abuse Act, and the facility settled.',
    court: 'Riverside Superior Court',
    practiceArea: { label: 'Medical Malpractice', href: '/orange-county-medical-malpractice-attorney' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client depended entirely on staff for her care: she breathed through a tracheostomy and could not reposition herself. She was admitted to a post-acute nursing facility in 2023 with a pressure wound on her lower back. Her care plan required staff to turn her at least every two hours to take pressure off the wound.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: [
          'The complaint alleges that the wound instead worsened into a large, infected ulcer, and she later needed hospital care for a bone infection and sepsis.',
        ],
      },
      {
        heading: 'The case',
        paragraphs: [
          'The firm sued in Riverside Superior Court under California’s Elder Abuse and Dependent Adult Civil Protection Act and for negligence. The nursing facility settled; the terms are confidential.',
        ],
      },
    ],
    resolved: '2026-03',
    published: approved,
    confidential: { title: 'Dependent adult develops a severe pressure wound in nursing care' },
  },
  {
    slug: 'store-floor-fall-settlement',
    summary:
      'A shopper stepped on an object left on a store floor and twisted her ankle. The firm sued the store’s operators, and the case settled shortly before trial.',
    court: 'Orange County Superior Court',
    practiceArea: { label: 'Slip & Fall', href: '/orange-county-slip-and-fall-attorney' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client was shopping at a retail store in Orange County. As she pushed a store-provided cart toward the dressing rooms, she stepped on an object on the floor; her left leg slid outward and her ankle twisted.',
          'According to the complaint, a store employee stocking shelves nearby saw the fall and picked up the object, which looked like a black plastic bottle cap, and the store prepared an incident report.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: [
          'The complaint alleged injuries to her legs, including internal derangement of the knees, and to her back, neck, hips, head, arms and shoulders.',
        ],
      },
      {
        heading: 'The case',
        paragraphs: [
          'Her husband brought a claim for loss of consortium. The firm sued the store’s operators in Orange County Superior Court, and the case settled shortly before trial.',
        ],
      },
    ],
    resolved: '2023-02',
    published: approved,
  },
  {
    slug: 'freeway-rear-end-settlement',
    summary:
      'An SUV rear-ended our client on the 55 Freeway, and he later needed a lower-back disc replacement. The defendants settled for $700,000 in 2015.',
    court: 'Orange County Superior Court',
    practiceArea: { label: 'Car Accidents', href: '/orange-county-auto-accidents-lawyer' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client had slowed for traffic on the 55 Freeway in Santa Ana when an SUV struck the rear of his vehicle. The impact damaged his heavy-duty bumper, trailer hitch, rear lift gate and window.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: [
          'He went to the hospital that day, reporting that he had lost consciousness, along with neck pain, severe low back pain, headaches and vision problems. The complaint alleged injuries to his head, spine, shoulders, arms, legs, hips and ribs.',
          'The following year he had surgery to replace a disc in his lower back.',
        ],
      },
      {
        heading: 'The case',
        paragraphs: [
          'His wife brought a claim for loss of consortium. The firm sued in Orange County Superior Court, and the defendants settled for $700,000 in 2015.',
        ],
      },
    ],
    resolved: '2015-08',
    published: approved,
  },
  {
    slug: 'waterpark-pool-deck-fall-settlement',
    summary:
      'A woman slipped on a pool deck made slick by sunscreen carried in from outside. The firm sued the resort and the deck’s builders, and the defendants settled.',
    court: 'Orange County Superior Court',
    practiceArea: { label: 'Slip & Fall', href: '/orange-county-slip-and-fall-attorney' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'A woman visiting an indoor waterpark resort with her family was walking on the pool deck near a water slide, holding the hands of her two young nieces, when her feet slipped out from under her. She fell, hit her head and lost consciousness, and she had a bleeding head wound.',
          'According to the complaint, while she was still on the floor, the resort’s safety manager acknowledged that sunscreen and suntan lotion from the outdoor pool were being carried inside, making the deck unreasonably slippery, and that other guests had slipped the same way.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: ['She went on to suffer neck, back and head injuries, headaches, memory problems and vertigo.'],
      },
      {
        heading: 'The case',
        paragraphs: [
          'The firm sued the resort and the companies that built and surfaced the pool deck in Orange County Superior Court; her husband also brought a claim. The defendants settled in stages.',
        ],
      },
    ],
    resolved: '2020-02',
    published: approved,
  },
  {
    slug: 'chain-reaction-freeway-crash-settlement',
    summary:
      'A distracted truck driver set off a chain-reaction crash on Interstate 5 that injured our client. The case settled in 2022.',
    court: 'Orange County Superior Court',
    practiceArea: { label: 'Car Accidents', href: '/orange-county-auto-accidents-lawyer' },
    chapters: [
      {
        heading: 'What happened',
        paragraphs: [
          'Our client was driving south on Interstate 5 in Orange County when a pest control company’s truck, traveling at least 65 miles per hour, struck the car ahead of it. According to the complaint, the truck’s driver had looked down and away from the road, and when he looked up he was going too fast to stop.',
          'The impact sent the other car spinning into our client’s lane, where it hit his vehicle.',
        ],
      },
      {
        heading: 'The injuries',
        paragraphs: [
          'The complaint alleged injuries to his head, spine, shoulders, arms, legs, hips and ribs, including a traumatic brain injury and cognitive deficits, and treatment that included pain injections.',
        ],
      },
      {
        heading: 'The case',
        paragraphs: ['The firm sued the company and its driver in Orange County Superior Court, and the case settled in 2022.'],
      },
    ],
    resolved: '2022-05',
    published: approved,
  },
];

export function caseStoryBySlug(slug: string) {
  return caseStories.find((story) => story.slug === slug);
}

/** The result card a story belongs to; none for a confidential story. */
export function caseStoryResult(story: CaseStory): CaseResult | undefined {
  return allResults.find((item) => item.story === story.slug);
}

export type CaseStoryHeadline = { figure: string; title: string; outcome: string; year?: number; confidential: boolean };

/** What a story shows as its figure, title, outcome, and year: its card's, or "Confidential" for a confidential settlement. */
export function caseStoryHeadline(story: CaseStory): CaseStoryHeadline {
  if (story.confidential) {
    return { figure: 'Confidential', title: story.confidential.title, outcome: 'Settlement', year: story.confidential.year, confidential: true };
  }
  const result = caseStoryResult(story);
  if (!result) throw new Error(`No case result links to the case story "${story.slug}".`);
  return { figure: result.amount, title: result.title, outcome: result.outcome ?? 'Result', year: result.year, confidential: false };
}

/** The page title: "$5.75M jury verdict: Student suffers skull fracture and brain bleed | Kyle Scott Law". */
export function caseStoryTitle(story: CaseStory) {
  const { figure, title, outcome, confidential } = caseStoryHeadline(story);
  return confidential ? `Confidential settlement: ${title} | Kyle Scott Law` : `${figure} ${outcome.toLowerCase()}: ${title} | Kyle Scott Law`;
}

export type CaseStoryLink = { href: string; kicker: string; figure: string; title: string; summary: string; date: string };

/**
 * Left out of the list on the firm's instruction (2026-10-01); both pages stay up. The $2.3M verdict is
 * not on /results, and the $2.2M school-counselor story repeats the firm's own $2.2M announcement.
 */
const unlisted = new Set(['/news/riverside-jury-verdict-2-3-million', caseStoryPath('school-counselor-abuse-settlement')]);

/**
 * Every story behind a result, newest first: the case stories and the firm's published case
 * announcements (news articles of kind "case"), less the unlisted ones. The case stories section of
 * /results shows the six most recent and the rest on request; a story page offers the next few.
 */
export function caseStoryLinks(): CaseStoryLink[] {
  const stories = caseStories.map((story) => {
    const headline = caseStoryHeadline(story);
    return { href: caseStoryPath(story.slug), kicker: resultOutcomeLabel(headline), figure: headline.figure, title: headline.title, summary: story.summary, date: story.resolved };
  });
  const announcements = newsArticlesForLocale('en')
    .filter((article) => article.kind === 'case')
    .map((article) => ({ href: article.path, kicker: `${article.label} · ${article.date}`, figure: article.result ?? article.label, title: article.title, summary: article.excerpt, date: article.dateTime }));
  return [...stories, ...announcements].filter((link) => !unlisted.has(link.href)).sort((a, b) => b.date.localeCompare(a.date));
}
