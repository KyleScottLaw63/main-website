import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ExternalLink, Quote, Star } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: 'Client Testimonials | Kyle Scott Law',
  description: 'Read client feedback published by Kyle Scott Law and verified reviews connected to the firm’s Google Business Profile.',
  alternates: localizedAlternates('/testimonials'),
};

const googleProfile = 'https://www.google.com/maps/place/Kyle+Scott+Law/@33.7487925,-117.8262336,17z/data=!3m1!4b1!4m5!3m4!1s0x80dcde535fc87d6b:0x6370f74d3890160a!8m2!3d33.7487925!4d-117.8240449?place_id=ChIJa33IX1Pe3IARChaQOE33cGM';

// Clients only. The old site also showed an endorsement by Hayley Lawson, who was a
// firm paralegal (the firm's own 2015 and 2016 posts say so); a staff member's quote
// presented as a client testimonial is misleading (Cal. Rules of Prof. Conduct 7.1),
// so it is not carried over. Do not add staff, family, or referral sources here.
const publishedTestimonials = [
  {
    author: 'Dennis Mahaney',
    excerpt: 'Kyle and his staff were excellent.',
    summary: 'Dennis praised the firm’s work in a successfully negotiated matter and strongly recommended the team.',
  },
  {
    author: 'Mayra Gonzalez',
    excerpt: 'Very grateful to have you as my lawyer.',
    summary: 'Mayra thanked Kyle and the staff for their kindness, support, and representation.',
  },
  {
    author: 'John Howard',
    excerpt: 'Professional and timely.',
    summary: 'John described a complicated matter, consistent advice, and an outcome that left him very satisfied.',
  },
];

const googleReviews = [
  {
    author: 'Yvee Herpin',
    excerpt: 'Kyle and his team took really good care of me.',
    summary: 'Yvee highlighted regular case updates, clear communication, and satisfaction with the settlement reached.',
  },
  {
    author: 'S Miller',
    excerpt: 'I knew I had found the right lawyer.',
    summary: 'The review describes patience, protection during a difficult matter, and a successful negotiated settlement.',
  },
  {
    author: 'Mary F.',
    excerpt: 'I recommend Kyle without any hesitation.',
    summary: 'Mary emphasized legal knowledge, professionalism, thorough communication, and commitment to the best available outcome.',
  },
];

function Stars() {
  // role="img" gives the label something to name (aria-label on a bare span is not announced).
  return <span className="testimonial-stars" role="img" aria-label="Five stars"><Star aria-hidden="true" /><Star aria-hidden="true" /><Star aria-hidden="true" /><Star aria-hidden="true" /><Star aria-hidden="true" /></span>;
}

function GoogleMark() {
  return <span className="google-review-mark" aria-hidden="true"><Image src="/google-g.png" alt="" width={96} height={96} loading="lazy" /></span>;
}

export default function TestimonialsPage() {
  return (
    <main className="testimonials-page">
      <SiteHeader />

      <section className="testimonials-hero" aria-labelledby="testimonials-title">
        <div>
          <p className="eyebrow">Client feedback</p>
          <h1 id="testimonials-title">Client testimonials.</h1>
          <p>Feedback published by Kyle Scott Law and reviews posted to the firm’s Google Business Profile.</p>
        </div>
        <a className="testimonials-google-summary" href={googleProfile} target="_blank" rel="noreferrer">
          <GoogleMark />
          <span><strong>5.0 on Google</strong><Stars /><small>View the current Google profile</small></span>
          <ExternalLink aria-hidden="true" />
        </a>
      </section>

      <section className="published-testimonials" id="published-testimonials" aria-labelledby="published-testimonials-title">
        <div className="testimonials-heading">
          <div><p className="eyebrow">Published by the firm</p><h2 id="published-testimonials-title">Client feedback.</h2></div>
        </div>
        <div className="published-testimonials-grid">
          {publishedTestimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.author}>
              <div className="testimonial-card-top"><Quote aria-hidden="true" /><Stars /></div>
              <blockquote>“{testimonial.excerpt}”</blockquote>
              <p>{testimonial.summary}</p>
              <footer><strong>{testimonial.author}</strong><span>Published client testimonial</span></footer>
            </article>
          ))}
        </div>
        <p className="testimonial-note">Testimonials reflect individual client experiences. Every matter is different, and prior outcomes do not guarantee a similar result.</p>
      </section>

      <section className="google-testimonials" aria-labelledby="google-testimonials-title">
        <div className="google-testimonials-heading">
          <div className="google-reviews-brand">
            <GoogleMark />
            <div><h2 id="google-testimonials-title">Google Reviews</h2><div className="google-reviews-rating"><Stars /><span>Reviews from the firm’s Google Business Profile</span></div></div>
          </div>
          <a href={googleProfile} target="_blank" rel="noreferrer">View all Google reviews <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="google-testimonials-grid">
          {googleReviews.map((review) => (
            <a className="google-testimonial-card" href={googleProfile} target="_blank" rel="noreferrer" key={review.author}>
              <div><GoogleMark /><Stars /></div>
              <blockquote>“{review.excerpt}”</blockquote>
              <p>{review.summary}</p>
              <footer><strong>{review.author}</strong><span>Google review</span><ExternalLink aria-hidden="true" /></footer>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
      <ChatWidget />
    </main>
  );
}
