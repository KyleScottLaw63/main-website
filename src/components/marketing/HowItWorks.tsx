import { ArrowRight, Star } from 'lucide-react';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';

const reviewsUrl = 'https://www.google.com/maps/search/?api=1&query=Kyle+Scott+Law+17671+Irvine+Blvd+Tustin+CA';

const ratingCopy = {
  en: { rating: '5.0 Google rating', stars: 'Five stars', reviews: 'View client reviews' },
  es: { rating: 'Calificación de 5.0 en Google', stars: 'Cinco estrellas', reviews: 'Ver reseñas de clientes' },
} satisfies Record<SiteLocale, unknown>;

/** The firm's Google rating, linking to its reviews on Google Maps (home page hero and the "How it works" strip). */
export function GoogleRatingBadge({ locale = 'en' }: { locale?: SiteLocale }) {
  const text = ratingCopy[locale];
  return (
    <a className="hero-review-badge" href={reviewsUrl}>
      <span className="google-mark" aria-hidden="true">G</span>
      <span><strong>{text.rating}</strong><small><span className="stars" role="img" aria-label={text.stars}><Star /><Star /><Star /><Star /><Star /></span>{text.reviews}</small></span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

const copy = {
  en: {
    eyebrow: 'How it works',
    title: 'Three steps, and the first one is free.',
    steps: [
      { title: 'Talk with Kyle', body: (phone: React.ReactNode) => <>Call {phone} or send the form. Your first conversation is with Kyle Scott himself, and it is free and confidential.</> },
      { title: 'Find out where you stand', body: () => <>Kyle reviews what happened, tells you honestly whether you have a case, and explains your options in plain language.</> },
      { title: 'Let the firm handle it', body: () => <>If you hire Kyle Scott Law, the firm deals with the insurance companies and builds your case while you focus on getting better. {noRecoveryTerms.en.statement}.</> },
    ],
  },
  es: {
    eyebrow: 'Cómo funciona',
    title: 'Tres pasos, y el primero es gratuito.',
    steps: [
      { title: 'Hable con Kyle', body: (phone: React.ReactNode) => <>Llame al {phone} o envíe el formulario. Su primera conversación es con el propio Kyle Scott, y es gratuita y confidencial.</> },
      { title: 'Sepa en qué situación está', body: () => <>Kyle revisa lo que pasó, le dice con honestidad si tiene un caso y le explica sus opciones en un lenguaje sencillo.</> },
      { title: 'Deje que el bufete se encargue', body: () => <>Si contrata a Kyle Scott Law, el bufete trata con las compañías de seguros y prepara su caso mientras usted se concentra en recuperarse. {noRecoveryTerms.es.statement}.</> },
    ],
  },
} satisfies Record<SiteLocale, unknown>;

/**
 * What happens when someone calls, right under the heading of every practice, city, and city + case page
 * (docs/public-site-rendering.md, "Calls to action"). The fee sentence is the firm's one statement, read
 * from no-recovery-terms.ts.
 */
export function HowItWorks({ locale = 'en' }: { locale?: SiteLocale }) {
  const text = copy[locale];
  const phone = <a href="tel:+17145441460">714-544-1460</a>;
  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <div className="how-it-works-heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id="how-it-works-title">{text.title}</h2>
        <GoogleRatingBadge locale={locale} />
      </div>
      <ol className="how-it-works-steps">
        {text.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.body(phone)}</p></li>)}
      </ol>
    </section>
  );
}
