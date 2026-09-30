import { allResults, type CaseResult } from '@/lib/marketing/data/results';

export type CaseStoryChapter = { heading: string; paragraphs: string[] };

/**
 * The story behind a published result, at /results/<slug> (docs/case-stories.md). A story belongs
 * to one result card, whose `story` names it; the card supplies the amount, title, outcome, and
 * year, so a card and its story can never disagree. Only stories the firm's attorney approved for
 * the website: never a confidential or held matter, and never an internal amount, source, or
 * review note from the drafts.
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
  /** The day the story went on the site (structured data and sitemap). */
  published: string;
};

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
    published: '2026-10-01',
  },
  {
    slug: 'octa-bus-crash-verdict',
    summary:
      'An OCTA bus rear-ended our client’s stopped minivan. OCTA’s lawyer argued the case was worth $157,000; an Orange County jury returned a $928,493.12 verdict.',
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
    published: '2026-10-01',
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
    published: '2026-10-01',
  },
];

export function caseStoryBySlug(slug: string) {
  return caseStories.find((story) => story.slug === slug);
}

/** The result card a story belongs to (the card whose `story` names it). */
export function caseStoryResult(story: CaseStory): CaseResult {
  const result = allResults.find((item) => item.story === story.slug);
  if (!result) throw new Error(`No case result links to the case story "${story.slug}".`);
  return result;
}

/** The page title: "$5.75M jury verdict: Student suffers skull fracture and brain bleed | Kyle Scott Law". */
export function caseStoryTitle(story: CaseStory) {
  const result = caseStoryResult(story);
  const outcome = (result.outcome ?? 'Result').toLowerCase();
  return `${result.amount} ${outcome}: ${result.title} | Kyle Scott Law`;
}
