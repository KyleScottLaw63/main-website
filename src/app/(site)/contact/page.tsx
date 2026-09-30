import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ConsultationForm } from '@/components/marketing/ConsultationForm';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: 'Contact Kyle Scott Law | Tustin Personal Injury Lawyer',
  description: 'Contact Kyle Scott Law in Tustin for an Orange County personal injury case review. Call 714-544-1460 or send a confidential consultation request.',
  alternates: localizedAlternates('/contact'),
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader />
      <section className="contact-hero" aria-labelledby="contact-title">
        <div>
          <h1 id="contact-title">Contact Kyle Scott Law</h1>
          <p>Call the Tustin office at <a href="tel:+17145441460">714-544-1460</a> or send a confidential case-review request.</p>
        </div>
      </section>

      <section className="contact-workspace" id="case-review" aria-label="Visit the office or request a case review">
        <div className="contact-map-panel">
          <div className="contact-map-heading">
            <p className="eyebrow">Tustin office</p>
            <h2>Kyle Scott Law</h2>
            <p>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</p>
            <p className="contact-map-phone"><a href="tel:+17145441460">714-544-1460</a><span aria-hidden="true">·</span><a href="tel:+18667570959">866-757-0959 toll free</a></p>
          </div>
          <div className="contact-map-frame">
            <iframe
              title="Map showing Kyle Scott Law in Tustin, California"
              src="https://www.google.com/maps?q=Kyle+Scott+Law,+17671+Irvine+Blvd,+Suite+210,+Tustin,+CA+92780&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a className="contact-directions" href="https://maps.google.com/?q=Kyle+Scott+Law+17671+Irvine+Blvd+Suite+210+Tustin+CA+92780">Open directions in Google Maps <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="contact-form-panel">
          <ConsultationForm />
        </div>
      </section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
