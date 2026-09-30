import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ExternalLink, Quote, Star } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = { title: 'Testimonios de clientes | Kyle Scott Law', description: 'Lea comentarios de clientes publicados por Kyle Scott Law y reseñas vinculadas al Perfil de Empresa de Google del bufete.', alternates: localizedAlternates('/es/testimonios') };
const googleProfile = 'https://www.google.com/maps/place/Kyle+Scott+Law/@33.7487925,-117.8262336,17z/data=!3m1!4b1!4m5!3m4!1s0x80dcde535fc87d6b:0x6370f74d3890160a!8m2!3d33.7487925!4d-117.8240449?place_id=ChIJa33IX1Pe3IARChaQOE33cGM';
// Clients only — see the English page: a firm paralegal's endorsement is not a client
// testimonial (Cal. Rules of Prof. Conduct 7.1) and is not carried over.
const publishedTestimonials = [
  { author: 'Dennis Mahaney', excerpt: 'Kyle y su personal fueron excelentes.', summary: 'Dennis elogió el trabajo del bufete en un asunto negociado satisfactoriamente y recomendó ampliamente al equipo.' },
  { author: 'Mayra Gonzalez', excerpt: 'Muy agradecida de tenerlo como mi abogado.', summary: 'Mayra agradeció a Kyle y al personal por su amabilidad, apoyo y representación.' },
  { author: 'John Howard', excerpt: 'Profesional y puntual.', summary: 'John describió un asunto complicado, asesoría constante y un resultado que lo dejó muy satisfecho.' },
];
const googleReviews = [
  { author: 'Yvee Herpin', excerpt: 'Kyle y su equipo me atendieron muy bien.', summary: 'Yvee destacó las actualizaciones periódicas, la comunicación clara y su satisfacción con el acuerdo alcanzado.' },
  { author: 'S Miller', excerpt: 'Supe que había encontrado al abogado correcto.', summary: 'La reseña describe paciencia, protección durante una situación difícil y un acuerdo negociado satisfactoriamente.' },
  { author: 'Mary F.', excerpt: 'Recomiendo a Kyle sin ninguna duda.', summary: 'Mary destacó los conocimientos legales, el profesionalismo, la comunicación minuciosa y el compromiso con el mejor resultado disponible.' },
];
function Stars() { return <span className="testimonial-stars" role="img" aria-label="Cinco estrellas"><Star aria-hidden="true" /><Star aria-hidden="true" /><Star aria-hidden="true" /><Star aria-hidden="true" /><Star aria-hidden="true" /></span>; }
function GoogleMark() { return <span className="google-review-mark" aria-hidden="true"><Image src="/google-g.png" alt="" width={96} height={96} loading="lazy" /></span>; }

export default function SpanishTestimonialsPage() {
  return (
    <main className="testimonials-page">
      <SiteHeader locale="es" />
      <section className="testimonials-hero" aria-labelledby="testimonials-title"><div><p className="eyebrow">Comentarios de clientes</p><h1 id="testimonials-title">Testimonios de clientes.</h1><p>Comentarios publicados por Kyle Scott Law y reseñas del Perfil de Empresa de Google del bufete. Las citas se presentan en traducción al español.</p></div><a className="testimonials-google-summary" href={googleProfile} target="_blank" rel="noreferrer"><GoogleMark /><span><strong>5.0 en Google</strong><Stars /><small>Ver el perfil actual de Google</small></span><ExternalLink aria-hidden="true" /></a></section>
      <section className="published-testimonials" id="testimonios-publicados" aria-labelledby="published-testimonials-title"><div className="testimonials-heading"><div><p className="eyebrow">Publicados por el bufete</p><h2 id="published-testimonials-title">Comentarios de clientes.</h2></div></div><div className="published-testimonials-grid">{publishedTestimonials.map((testimonial) => <article className="testimonial-card" key={testimonial.author}><div className="testimonial-card-top"><Quote aria-hidden="true" /><Stars /></div><blockquote>“{testimonial.excerpt}”</blockquote><p>{testimonial.summary}</p><footer><strong>{testimonial.author}</strong><span>Testimonio de cliente publicado</span></footer></article>)}</div><p className="testimonial-note">Los testimonios reflejan experiencias individuales. Cada asunto es distinto y los resultados anteriores no garantizan un resultado similar.</p></section>
      <section className="google-testimonials" aria-labelledby="google-testimonials-title"><div className="google-testimonials-heading"><div className="google-reviews-brand"><GoogleMark /><div><h2 id="google-testimonials-title">Reseñas de Google</h2><div className="google-reviews-rating"><Stars /><span>Reseñas del Perfil de Empresa de Google del bufete</span></div></div></div><a href={googleProfile} target="_blank" rel="noreferrer">Ver todas las reseñas <ArrowRight aria-hidden="true" /></a></div><div className="google-testimonials-grid">{googleReviews.map((review) => <a className="google-testimonial-card" href={googleProfile} target="_blank" rel="noreferrer" key={review.author}><div><GoogleMark /><Stars /></div><blockquote>“{review.excerpt}”</blockquote><p>{review.summary}</p><footer><strong>{review.author}</strong><span>Reseña de Google traducida</span><ExternalLink aria-hidden="true" /></footer></a>)}</div></section>
      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
