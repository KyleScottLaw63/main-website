import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, MapPin, SearchCheck, ShieldCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { spanishLegalGuides } from '@/lib/marketing/data/spanishLegalGuides';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { SITE_URL } from '@/lib/marketing/site';

// The Spanish guide library, the counterpart of /guides: the same page, with the guides that have a translation.
export const metadata: Metadata = {
  title: 'Guías legales de lesiones personales en California | Kyle Scott Law',
  description: 'Guías prácticas que responden preguntas comunes sobre lesiones personales en California para residentes del Condado de Orange y Tustin, con fuentes legales y oficiales.',
  alternates: localizedAlternates('/es/guias'),
  openGraph: { title: 'Guías legales de lesiones personales en California | Kyle Scott Law', description: 'Respuestas claras a preguntas comunes sobre lesiones, seguros, pruebas y plazos en California.', locale: 'es_US', images: [`${SITE_URL}/legal-guides-hero.webp`] },
};

const hubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/es/guias#collection`,
      url: `${SITE_URL}/es/guias`,
      name: 'Guías legales de lesiones personales en California',
      description: 'Guías de lesiones personales en California, organizadas por preguntas, para residentes del Condado de Orange y Tustin.',
      inLanguage: 'es-US',
      about: { '@id': `${SITE_URL}/#legal-service` },
      mainEntity: { '@id': `${SITE_URL}/es/guias#list` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/es/guias#list`,
      numberOfItems: spanishLegalGuides.length,
      itemListElement: spanishLegalGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `${SITE_URL}${guide.path}` })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/es/guias#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/es` },
        { '@type': 'ListItem', position: 2, name: 'Guías legales', item: `${SITE_URL}/es/guias` },
      ],
    },
  ],
};

export default function SpanishGuidesPage() {
  return (
    <main className="legal-guides-page">
      <StructuredData data={hubSchema} />
      <SiteHeader locale="es" />

      <section className="legal-guides-hero" aria-labelledby="legal-guides-title">
        <div>
          <p className="eyebrow">Guías legales de California</p>
          <h1 id="legal-guides-title">Respuestas claras a las preguntas que hacen las personas lesionadas.</h1>
          <p>Orientación práctica y respaldada por fuentes sobre reclamos por lesiones, seguros, pruebas y plazos en California, con recursos específicos del Condado de Orange cuando importan.</p>
          <div className="legal-guides-hero-points">
            <span><SearchCheck aria-hidden="true" /> Basadas en preguntas reales</span>
            <span><ShieldCheck aria-hidden="true" /> Con enlaces a fuentes legales primarias</span>
            <span><MapPin aria-hidden="true" /> Contexto del Condado de Orange y Tustin</span>
          </div>
        </div>
        <figure><Image src="/legal-guides-hero.webp" alt="Carpeta legal azul marino, bolígrafo y silueta de California sobre un escritorio" width={1600} height={900} priority sizes="(max-width: 800px) 100vw, 44vw" /></figure>
      </section>

      <section className="legal-guides-library" aria-labelledby="guide-library-title">
        <header><div><p className="eyebrow">Biblioteca de recursos legales</p><h2 id="guide-library-title">{spanishLegalGuides.length} guías detalladas</h2></div><p>Comience con la pregunta más parecida a su situación. Cada guía da primero una respuesta directa y luego explica las pruebas, la ley, los detalles locales y las decisiones que siguen.</p></header>
        <div className="legal-guide-card-grid">
          {spanishLegalGuides.map((guide, index) => (
            <article className="legal-guide-card" key={guide.slug}>
              <div className="legal-guide-card-top"><span>{String(index + 1).padStart(2, '0')}</span><small>{guide.category}</small></div>
              <BookOpenCheck aria-hidden="true" />
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <div className="legal-guide-card-meta"><span>{guide.readingTime}</span><span>Actualizada el {guide.updatedLabel}</span></div>
              <Link href={guide.path}>Leer la guía <ArrowRight aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="legal-guides-method" aria-labelledby="guide-method-title">
        <div><p className="eyebrow light-eyebrow">Cómo se preparan estas guías</p><h2 id="guide-method-title">Útiles antes que promocionales.</h2></div>
        <div><article><strong>01</strong><h3>Primero, la respuesta</h3><p>Cada guía empieza con una respuesta directa, en lugar de obligar al lector a buscarla en una página de ventas.</p></article><article><strong>02</strong><h3>Fuentes primarias</h3><p>Se enlazan leyes de California, tribunales, agencias estatales y recursos del Condado de Orange para que pueda verificarlos; la mayoría de esas fuentes oficiales están en inglés.</p></article><article><strong>03</strong><h3>Límites claros</h3><p>Sin calculadoras de acuerdos, resultados garantizados ni promesas genéricas sobre plazos. Cada asunto necesita una revisión individual.</p></article></div>
      </section>

      <section className="legal-guides-cta" aria-labelledby="guides-cta-title"><div><p className="eyebrow">¿Necesita una respuesta para su caso?</p><h2 id="guides-cta-title">Hable con la oficina de Tustin.</h2><p>Envíe los datos básicos de forma segura o llame a Kyle Scott Law al <a href="tel:+17145441460">714-544-1460</a>.</p></div><Link className="primary-button" href="/es/contacto#revision-del-caso">Solicitar revisión del caso <ArrowRight aria-hidden="true" /></Link></section>

      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
