import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { firmIdentity } from '@/lib/marketing/site';

// Profiles the firm publishes. Instagram confirmed by the firm (2026-09);
// the others carried over from the previous kjslaw.com footer.
const socialLinks = [
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/KJS_Law/' },
  { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCfF9jCbtt6aqBOkXnAGJpnw' },
  { key: 'x', label: 'X (Twitter)', href: 'https://x.com/KyleScottLaw2' },
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/kylescottlaw/' },
] as const;

type SocialKey = (typeof socialLinks)[number]['key'];

function SocialIcon({ kind }: { kind: SocialKey }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (kind) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}

function SocialLinks({ spanish }: { spanish: boolean }) {
  return (
    <nav
      className="footer-social"
      aria-label={spanish ? 'Redes sociales de Kyle Scott Law' : 'Kyle Scott Law on social media'}
    >
      <span>{spanish ? 'Síganos' : 'Follow the firm'}</span>
      <ul>
        {socialLinks.map((link) => (
          <li key={link.key}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (${spanish ? 'se abre en una pestaña nueva' : 'opens in a new tab'})`}
              title={link.label}
            >
              <SocialIcon kind={link.key} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const firmLinks = {
  en: [
    ['Practice Areas', '/practice-areas'],
    ['Meet The Team', '/meet-the-team'],
    ['Why Hire Us', '/why-hire-us'],
    ['Testimonials', '/testimonials'],
    ['Results', '/results'],
    ['Legal Guides', '/guides'],
    ['Latest News', '/news'],
    ['Contact', '/contact'],
  ],
  es: [
    ['Áreas de práctica', '/es/areas-de-practica'],
    ['El equipo', '/es/equipo'],
    ['Por qué elegirnos', '/es/por-que-elegirnos'],
    ['Testimonios', '/es/testimonios'],
    ['Resultados', '/es/resultados'],
    ['Noticias', '/es/noticias'],
    ['Contacto', '/es/contacto'],
  ],
};

export const practiceLinks = {
  en: [
    ['Personal Injury', '/personal-injury-lawyer-orange-county'],
    ['Car Accidents', '/orange-county-auto-accidents-lawyer'],
    ['Slip & Fall', '/orange-county-slip-and-fall-attorney'],
    ['Medical Malpractice', '/orange-county-medical-malpractice-attorney'],
    ['Dog Bites', '/dog-bite-attorney-in-orange-county'],
    [
      'Traumatic Brain Injury',
      '/orange-county-traumatic-brain-injury-attorney',
    ],
    ['Sexual Harassment & Abuse', '/sexual-harassment-lawyer-in-orange-county'],
    ['Wrongful Death', '/orange-county-wrongful-death-attorney'],
    ['School Liability', '/orange-county-school-liability-attorney'],
  ],
  es: [
    [
      'Lesiones personales',
      '/es/abogado-de-lesiones-personales-condado-de-orange',
    ],
    [
      'Accidentes de auto',
      '/es/abogado-de-accidentes-de-auto-condado-de-orange',
    ],
    [
      'Resbalones y caídas',
      '/es/abogado-de-resbalones-y-caidas-condado-de-orange',
    ],
    [
      'Negligencia médica',
      '/es/abogado-de-negligencia-medica-condado-de-orange',
    ],
    [
      'Mordeduras de perro',
      '/es/abogado-de-mordeduras-de-perro-condado-de-orange',
    ],
    [
      'Lesión cerebral traumática',
      '/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange',
    ],
    [
      'Acoso y abuso sexual',
      '/es/abogado-de-acoso-y-abuso-sexual-condado-de-orange',
    ],
    ['Muerte injusta', '/es/abogado-de-muerte-injusta-condado-de-orange'],
    ['Responsabilidad escolar', '/es/abogado-de-responsabilidad-escolar-condado-de-orange'],
  ],
};

const legalLinks = {
  en: [
    ['Privacy Policy', '/privacy'],
    ['Legal Disclaimer', '/disclaimer'],
    ['Accessibility Statement', '/accessibility'],
  ],
  es: [
    ['Política de privacidad', '/es/privacidad'],
    ['Aviso legal', '/es/aviso-legal'],
    ['Declaración de accesibilidad', '/es/accesibilidad'],
  ],
};

function FooterLinks({ links }: { links: string[][] }) {
  return (
    <ul>
      {links.map(([label, href]) => (
        <li key={label}>
          <a href={href}>
            {label}
            <ArrowRight aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter({ locale = 'en' }: { locale?: SiteLocale }) {
  const spanish = locale === 'es';
  const contactHref = spanish
    ? '/es/contacto#revision-del-caso'
    : '/contact#case-review';
  return (
    <footer
      className="site-footer"
      id="site-footer"
      aria-label={
        spanish ? 'Pie de página de Kyle Scott Law' : 'Kyle Scott Law footer'
      }
    >
      <div className="footer-shell">
        <div className="footer-desktop-grid">
          <section
            className="footer-contact"
            aria-labelledby="footer-contact-title"
          >
            <h3 id="footer-contact-title">Kyle Scott Law</h3>
            <a href="https://maps.google.com/?q=Kyle+Scott+Law+17671+Irvine+Blvd+Suite+210+Tustin+CA+92780">
              <MapPin aria-hidden="true" />
              <span>
                17671 Irvine Blvd., Suite 210
                <br />
                Tustin, CA 92780
              </span>
            </a>
            <a href="tel:+17145441460">
              <Phone aria-hidden="true" />
              <span>
                <small>{spanish ? 'Llame' : 'Call'}</small>714-544-1460
              </span>
            </a>
            <a href={`mailto:${firmIdentity.email}`}>
              <Mail aria-hidden="true" />
              <span>
                <small>{spanish ? 'Correo electrónico' : 'Email'}</small>
                {firmIdentity.email}
              </span>
            </a>
            <p>{spanish ? 'Fax' : 'Fax'}: 714-544-1463</p>
            <SocialLinks spanish={spanish} />
          </section>
          <nav
            className="footer-column"
            aria-label={spanish ? 'Enlaces del bufete' : 'Firm links'}
          >
            <h3>{spanish ? 'Información' : 'Explore'}</h3>
            <FooterLinks links={firmLinks[locale]} />
          </nav>
          <nav
            className="footer-column footer-practices"
            aria-label={
              spanish ? 'Enlaces de áreas de práctica' : 'Practice area links'
            }
          >
            <h3>{spanish ? 'Áreas de práctica' : 'Practice Areas'}</h3>
            <FooterLinks links={practiceLinks[locale]} />
          </nav>
          <aside
            className="footer-consultation"
            aria-label={
              spanish
                ? 'Solicite una consulta gratuita'
                : 'Request a free consultation'
            }
          >
            <p className="footer-consultation-kicker">
              {spanish ? 'Consulta gratuita' : 'Free consultation'}
            </p>
            <h3>
              {spanish
                ? 'Solicite una revisión de su caso.'
                : 'Request a case review.'}
            </h3>
            <p>
              {spanish
                ? 'Envíe los datos básicos de forma segura o llame directamente a la oficina de Tustin.'
                : 'Send the basic facts securely or call the Tustin office directly.'}
            </p>
            <a className="footer-cta" href={contactHref}>
              {spanish
                ? 'Solicite una consulta gratuita'
                : 'Request a free consultation'}{' '}
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="footer-consultation-call" href="tel:+17145441460">
              <Phone aria-hidden="true" />
              714-544-1460
            </a>
            <div className="footer-verification">
              <Image
                src="/legal-reach-verified.png"
                alt={
                  spanish
                    ? 'Miembro verificado por Legal Reach'
                    : 'Legal Reach verified member'
                }
                width="200"
                height="164"
                loading="lazy"
              />
              <span>
                {spanish
                  ? 'Verificado por Legal Reach'
                  : 'Legal Reach verified'}
              </span>
            </div>
          </aside>
        </div>

        <div className="footer-mobile-layout">
          <div className="mobile-contact-card">
            <h3>Kyle Scott Law</h3>
            <a href="tel:+17145441460">
              <Phone aria-hidden="true" />
              714-544-1460
            </a>
            <a href="https://maps.google.com/?q=Kyle+Scott+Law+17671+Irvine+Blvd+Suite+210+Tustin+CA+92780">
              <MapPin aria-hidden="true" />
              <span>
                17671 Irvine Blvd., Suite 210
                <br />
                Tustin, CA 92780
              </span>
            </a>
            <p>Fax: 714-544-1463</p>
            <SocialLinks spanish={spanish} />
          </div>
          <details>
            <summary>
              {spanish ? 'Información' : 'Explore'}{' '}
              <ChevronDown aria-hidden="true" />
            </summary>
            <FooterLinks links={firmLinks[locale]} />
          </details>
          <details>
            <summary>
              {spanish ? 'Áreas de práctica' : 'Practice Areas'}{' '}
              <ChevronDown aria-hidden="true" />
            </summary>
            <FooterLinks links={practiceLinks[locale]} />
          </details>
          <div className="mobile-footer-actions">
            <a className="primary-button" href={contactHref}>
              {spanish ? 'Consulta gratuita' : 'Free consultation'}
            </a>
            <a href="tel:+17145441460">
              {spanish ? 'Llame al' : 'Call'} 714-544-1460
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 Kyle Scott Law.{' '}
            {spanish
              ? 'Todos los derechos reservados.'
              : 'All rights reserved.'}
          </p>
          <nav
            className="footer-legal-links"
            aria-label={
              spanish
                ? 'Información legal y de accesibilidad'
                : 'Legal and accessibility information'
            }
          >
            <strong>
              {spanish ? 'Legal y accesibilidad' : 'Legal & Accessibility'}
            </strong>
            <div className="footer-legal-link-list">
              {legalLinks[locale].map(([label, href]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </div>
          </nav>
          <p>
            {spanish
              ? 'Publicidad de abogados. Solo información general; visitar este sitio no crea una relación abogado-cliente. Los resultados anteriores no garantizan un resultado similar.'
              : 'Attorney advertising. General information only; visiting this site does not create an attorney-client relationship. Prior results do not guarantee a similar outcome.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
