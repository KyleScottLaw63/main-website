import { ArrowRight, Phone } from 'lucide-react';
import { practiceLinks } from '@/components/marketing/SiteFooter';
import type { SiteLocale } from '@/lib/marketing/i18n';

export function NotFoundContent({ locale }: { locale: SiteLocale }) {
  const spanish = locale === 'es';
  const home = spanish ? '/es' : '/';
  const contact = spanish ? '/es/contacto#revision-del-caso' : '/contact#case-review';
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">Error 404</p>
      <h1 id="not-found-title">{spanish ? 'Esta página no existe.' : 'That page doesn’t exist.'}</h1>
      <p className="not-found-lead">
        {spanish
          ? 'El enlace puede estar desactualizado o mal escrito. Lo que sí existe: una consulta gratuita con el bufete, en español y sin compromiso.'
          : 'The link may be old or mistyped. What does exist: a free consultation with the firm, with no obligation.'}
      </p>
      <div className="not-found-actions">
        <a className="primary-button" href={contact}>
          {spanish ? 'Solicitar una consulta gratuita' : 'Request a free consultation'} <ArrowRight aria-hidden="true" />
        </a>
        <a className="not-found-call" href="tel:+17145441460">
          <Phone aria-hidden="true" /> 714-544-1460
        </a>
        <a className="not-found-home" href={home}>{spanish ? 'Ir a la página de inicio' : 'Go to the homepage'}</a>
      </div>
      <p className="not-found-kicker">{spanish ? 'Áreas de práctica' : 'Practice areas'}</p>
      <ul className="not-found-links">
        {practiceLinks[locale].map(([label, href]) => (
          <li key={href}>
            <a href={href}>
              {label} <ArrowRight aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
