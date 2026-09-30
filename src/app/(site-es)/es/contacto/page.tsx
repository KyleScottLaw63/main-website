import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ConsultationForm } from '@/components/marketing/ConsultationForm';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: 'Contacte a Kyle Scott Law | Abogado de lesiones en Tustin',
  description: 'Llame a Kyle Scott Law en Tustin al 714-544-1460 o envíe una solicitud confidencial para revisar un caso de lesiones personales en el Condado de Orange.',
  alternates: localizedAlternates('/es/contacto'),
};

export default function SpanishContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader locale="es" />
      <section className="contact-hero" aria-labelledby="contact-title">
        <div>
          <h1 id="contact-title">Contacte a Kyle Scott Law</h1>
          <p>Llame a la oficina de Tustin al <a href="tel:+17145441460">714-544-1460</a> o envíe una solicitud confidencial de revisión del caso.</p>
        </div>
      </section>

      <section className="contact-workspace" id="revision-del-caso" aria-label="Visite la oficina o solicite una revisión del caso">
        <div className="contact-map-panel">
          <div className="contact-map-heading">
            <p className="eyebrow">Oficina de Tustin</p>
            <h2>Kyle Scott Law</h2>
            <p>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</p>
            <p className="contact-map-phone"><a href="tel:+17145441460">714-544-1460</a><span aria-hidden="true">·</span><a href="tel:+18667570959">866-757-0959 sin costo</a></p>
          </div>
          <div className="contact-map-frame">
            <iframe title="Mapa de Kyle Scott Law en Tustin, California" src="https://www.google.com/maps?q=Kyle+Scott+Law,+17671+Irvine+Blvd,+Suite+210,+Tustin,+CA+92780&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <a className="contact-directions" href="https://maps.google.com/?q=Kyle+Scott+Law+17671+Irvine+Blvd+Suite+210+Tustin+CA+92780">Abrir indicaciones en Google Maps <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="contact-form-panel"><ConsultationForm locale="es" /></div>
      </section>

      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
