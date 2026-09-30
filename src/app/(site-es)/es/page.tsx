import Link from "next/link";
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  Brain,
  BriefcaseMedical,
  CarFront,
  Dog,
  FileSearch,
  HeartHandshake,
  MapPin,
  MessageSquareText,
  Phone,
  Scale,
  ShieldCheck,
  Star,
  UserRoundCheck,
} from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { ConsultationForm } from '@/components/marketing/ConsultationForm';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';

const terms = noRecoveryTerms.es;

export const metadata: Metadata = {
  title: 'Abogado de lesiones personales en el Condado de Orange | Kyle Scott Law',
  description: 'Kyle Scott Law representa a clientes de habla hispana en accidentes, caídas, mordeduras de perro, negligencia médica, lesiones cerebrales, abuso y muerte injusta.',
  alternates: localizedAlternates('/es'),
};

const practiceAreas = [
  { title: 'Lesiones personales', copy: 'Reclamos por lesiones graves y negligencia', icon: ShieldCheck, href: '/es/abogado-de-lesiones-personales-condado-de-orange' },
  { title: 'Accidentes de auto', copy: 'Choques de auto, camión y transporte compartido', icon: CarFront, href: '/es/abogado-de-accidentes-de-auto-condado-de-orange' },
  { title: 'Resbalones y caídas', copy: 'Propiedades inseguras y responsabilidad de predios', icon: UserRoundCheck, href: '/es/abogado-de-resbalones-y-caidas-condado-de-orange' },
  { title: 'Negligencia médica', copy: 'Lesiones causadas por atención negligente', icon: BriefcaseMedical, href: '/es/abogado-de-negligencia-medica-condado-de-orange' },
  { title: 'Mordeduras de perro', copy: 'Ataques y lesiones prevenibles causadas por animales', icon: Dog, href: '/es/abogado-de-mordeduras-de-perro-condado-de-orange' },
  { title: 'Lesión cerebral traumática', copy: 'Conmociones y traumatismos que cambian la vida', icon: Brain, href: '/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange' },
  { title: 'Acoso y abuso sexual', copy: 'Abuso, agresión y reclamos laborales', icon: HeartHandshake, href: '/es/abogado-de-acoso-y-abuso-sexual-condado-de-orange' },
  { title: 'Muerte injusta', copy: 'Negligencia fatal y reclamos de familiares', icon: Scale, href: '/es/abogado-de-muerte-injusta-condado-de-orange' },
];

const recoveries = [
  { amount: '$6.8M', type: 'Negligencia del distrito escolar', title: 'Alumnos de primaria abusados sexualmente por un maestro', meta: 'Confidencial • Mayor acuerdo por abuso sexual en ese momento', date: '2004', href: '/es/resultados', cta: 'Ver en resultados' },
  { amount: '$2.3M', type: 'Veredicto del jurado', title: 'Veredicto del Tribunal Superior de Riverside', meta: 'Resultado de caso publicado', date: '26 de diciembre de 2024', href: '/es/noticias/veredicto-jurado-riverside-2-3-millones', cta: 'Leer el caso' },
  { amount: '$2.2M', type: 'Acuerdo confidencial', title: 'Demanda por abuso sexual y agresión sexual', meta: 'Detalles confidenciales', date: '26 de diciembre de 2024', href: '/es/noticias/acuerdo-abuso-sexual-2-2-millones', cta: 'Leer el caso' },
];

const newsItems = [
  { category: 'Acuerdo confidencial', accent: '$2.2M', title: 'Demanda por abuso sexual resuelta por $2.2 millones', excerpt: 'Kyle Scott Law explica su trabajo de apoyo a sobrevivientes en reclamos confidenciales y el camino hacia la recuperación.', date: '26 de diciembre de 2024', href: '/es/noticias/acuerdo-abuso-sexual-2-2-millones' },
  { category: 'Veredicto del jurado', accent: '$2.3M', title: 'Kyle Scott obtiene un veredicto en el Tribunal Superior de Riverside', excerpt: 'Un resultado publicado por el despacho sobre un veredicto de $2.3 millones obtenido ante un jurado.', date: '26 de diciembre de 2024', href: '/es/noticias/veredicto-jurado-riverside-2-3-millones' },
  { category: 'Victoria en apelación', accent: 'Nuevo juicio', title: 'Una victoria en apelación protege el derecho del cliente a presentar pruebas de daños', excerpt: 'Kyle Scott Law y el abogado de apelaciones obtuvieron una revocación y un nuevo juicio después de que se excluyeran pruebas importantes.', date: '9 de junio de 2019', href: '/es/noticias/victoria-apelacion-nuevo-juicio' },
];

export default function SpanishHomePage() {
  return (
    <main>
      <section className="opening" aria-labelledby="home-title">
        <SiteHeader locale="es" />
        <div className="hero" id="top">
          <div className="hero-copy">
            <h1 id="home-title">Abogado de lesiones personales en el Condado de Orange</h1>
            <span className="headline-rule" aria-hidden="true" />
            <p className="hero-thesis">Más de 30 años ayudando a clientes lesionados.</p>
            <p className="hero-description">Desde su oficina en Tustin, Kyle Scott Law representa a personas lesionadas en accidentes, caídas, mordeduras de perro, negligencia médica, lesiones cerebrales y casos de abuso.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#consulta">Comenzar una consulta gratuita <ArrowRight aria-hidden="true" size={17} /></a>
              <a className="text-link" href="#resultados">Ver resultados de casos <ArrowRight aria-hidden="true" size={17} /></a>
            </div>
            <p className="no-fee-note">{terms.statement}.</p>
            <a className="hero-review-badge" href="https://www.google.com/maps/search/?api=1&query=Kyle+Scott+Law+17671+Irvine+Blvd+Tustin+CA">
              <span className="google-mark" aria-hidden="true">G</span>
              <span><strong>Calificación de 5.0 en Google</strong><small><span className="stars" role="img" aria-label="Cinco estrellas"><Star /><Star /><Star /><Star /><Star /></span>Ver reseñas de clientes</small></span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-media" aria-label="Kyle Scott y el equipo de Kyle Scott Law">
            <Image src="/kjs-team.jpg" alt="Kyle Scott con el equipo de Kyle Scott Law en Tustin" width={900} height={600} priority fetchPriority="high" quality={90} sizes="(max-width: 1023px) 94vw, 720px" />
            <div className="photo-caption">Kyle Scott y el equipo de KJS Law</div>
          </div>
          <div className="trust-rail" aria-label="Datos del despacho">
            <div className="trust-item"><span className="trust-icon"><Award aria-hidden="true" /></span><span><strong>Más de 30 años</strong><small>Experiencia en lesiones personales</small></span></div>
            <div className="trust-item"><span className="trust-icon"><BadgeDollarSign aria-hidden="true" /></span><span><strong>Millones recuperados</strong><small>Veredictos y acuerdos publicados</small></span></div>
            <div className="trust-item"><span className="trust-icon"><Scale aria-hidden="true" /></span><span><strong>Sin honorarios</strong><small>A menos que haya recuperación</small></span></div>
          </div>
        </div>
        <section className="recovery-rail" id="resultados" aria-labelledby="recovery-title">
          <div className="recovery-heading"><p className="eyebrow" id="recovery-title">Recuperaciones publicadas seleccionadas</p><Link href="/es/resultados">Ver todos los resultados <ArrowRight aria-hidden="true" size={15} /></Link></div>
          <div className="recovery-grid">
            {recoveries.map((recovery) => (
              <article className="recovery-card" key={recovery.href}>
                <div className="recovery-card-top"><span>{recovery.type}</span><span>{recovery.date}</span></div>
                <div className="recovery-card-body"><strong>{recovery.amount}</strong><h2>{recovery.title}</h2><p>{recovery.meta}</p></div>
                <a className="recovery-read-link" href={recovery.href}>{recovery.cta} <ArrowRight aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <p className="results-disclaimer">Los resultados anteriores no garantizan un resultado similar.</p>
        </section>
      </section>

      <section className="section practice-section" id="areas-de-practica" aria-labelledby="practice-title">
        <div className="section-heading practice-heading"><div><p className="eyebrow">Áreas de práctica</p><h2 id="practice-title">Casos de lesiones personales que manejamos.</h2></div></div>
        <div className="practice-grid">
          {practiceAreas.map((area) => {
            const Icon = area.icon;
            return <a className="practice-card" href={area.href} key={area.title}><span className="practice-icon"><Icon aria-hidden="true" /></span><span><strong>{area.title}</strong><small>{area.copy}</small></span><ArrowRight className="card-arrow" aria-hidden="true" /></a>;
          })}
        </div>
        <div className="practice-footer"><ShieldCheck aria-hidden="true" /><p><strong>Sin presión. Sin una línea genérica de recepción.</strong> Su solicitud de consulta entra directamente al sistema privado de revisión del despacho.</p></div>
      </section>

      <section className="firm-section" id="equipo" aria-labelledby="firm-title">
        <div className="firm-intro">
          <div className="firm-photo"><Image src="/kyle-scott.jpg" alt="Abogado litigante Kyle Scott" width={600} height={900} loading="lazy" sizes="(max-width: 1023px) 94vw, 520px" /><span>Abogado litigante Kyle J. Scott</span></div>
          <div className="firm-copy">
            <h2 id="firm-title" className="firm-heading">Sobre Nosotros</h2>
            <p className="firm-lead">Kyle Scott Law ayuda a clientes lesionados a buscar la compensación total disponible por sus lesiones y pérdidas. El despacho representa a personas involucradas en <Link href="/es/abogado-de-accidentes-de-auto-condado-de-orange">accidentes de auto y camión</Link>, choques de Uber y Lyft, <Link href="/es/abogado-de-resbalones-y-caidas-condado-de-orange">resbalones, tropiezos y caídas</Link>, <Link href="/es/abogado-de-mordeduras-de-perro-condado-de-orange">mordeduras de perro</Link>, responsabilidad por productos, <Link href="/es/abogado-de-muerte-injusta-condado-de-orange">reclamos por muerte injusta</Link> y <Link href="/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange">lesiones cerebrales traumáticas</Link>.</p>
            <p className="firm-experience">La práctica también incluye <Link href="/es/abogado-de-negligencia-medica-condado-de-orange">negligencia médica</Link>, negligencia clerical y legal, responsabilidad escolar e institucional, <Link href="/es/abogado-de-acoso-y-abuso-sexual-condado-de-orange">abuso sexual, agresión y acoso sexual en el trabajo</Link>, despido injustificado y otras formas de discriminación laboral.</p>
            <p className="firm-experience">Desde la oficina de Tustin, el despacho revisa los hechos, identifica a las personas, empresas, profesionales o instituciones que podrían ser responsables, documenta las lesiones y pérdidas, y explica las opciones legales disponibles. Durante más de 30 años, Kyle J. Scott ha representado a personas lesionadas y familias en el Condado de Orange y California.</p>
            <div className="firm-actions"><Link className="primary-button firm-team-button" href="/es/equipo">Conozca al equipo <ArrowRight aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>

      <section className="section process-section" id="proceso" aria-labelledby="process-title">
        <div className="case-path-shell">
          <div className="case-path-intro">
            <p className="eyebrow">Qué puede esperar</p><h2 id="process-title">Cómo avanza su caso.</h2><p>Empezar toma una llamada o un formulario breve. A partir de ahí, el despacho carga con el caso—los trámites, los plazos, las llamadas con la aseguradora—y lo mantiene informado en cada etapa, explicado en español claro.</p>
            <Link className="primary-button" href="/es/contacto#revision-del-caso">Solicitar una revisión gratuita <ArrowRight aria-hidden="true" /></Link>
            <p className="case-path-call">¿Prefiere hablarlo por teléfono? Llame al <a href="tel:+17145441460">714-544-1460</a>.</p>
            <div className="case-path-assurance"><ShieldCheck aria-hidden="true" /><span><strong>{terms.statement}.</strong><small>La consulta gratuita no crea obligación ni una relación abogado-cliente.</small></span></div>
            <div className="case-path-assurance"><BadgeDollarSign aria-hidden="true" /><span><strong>El despacho adelanta todos los gastos del caso.</strong><small>Investigación, expedientes, peritos, presentaciones—los paga el despacho mientras el caso avanza y se recuperan del resultado. Nada sale de su bolsillo por adelantado.</small></span></div>
          </div>
          <ol className="case-path-steps">
            <li><span className="case-path-number">01</span><span className="case-path-icon"><MessageSquareText aria-hidden="true" /></span><div><h3>Revisión gratuita</h3><p>Llame al <a href="tel:+17145441460">714-544-1460</a> o envíe el formulario seguro—lo que le resulte más fácil. Comparta los hechos básicos de lo que ocurrió; todavía no se necesitan documentos, y no hay costo ni compromiso.</p></div></li>
            <li><span className="case-path-number">02</span><span className="case-path-icon"><FileSearch aria-hidden="true" /></span><div><h3>Respuestas de un abogado litigante</h3><p>Su caso lo revisa un abogado litigante con más de 30 años de experiencia en California—no un centro de llamadas. Recibe respuestas claras sobre la responsabilidad, los plazos y las opciones que vale la pena seguir.</p></div></li>
            <li><span className="case-path-number">03</span><span className="case-path-icon"><ShieldCheck aria-hidden="true" /></span><div><h3>El despacho se encarga de todo</h3><p>Si el despacho acepta su caso, el equipo reúne las pruebas y los expedientes médicos, asume cada llamada y carta de la aseguradora y construye su reclamo—mientras usted dedica su energía a recuperarse, no al papeleo.</p></div></li>
            <li><span className="case-path-number">04</span><span className="case-path-icon"><Scale aria-hidden="true" /></span><div><h3>Negociación o juicio</h3><p>Cada reclamo se prepara como si fuera a juicio—las aseguradoras tratan distinto un caso cuando el despacho está listo para la corte. Si no se ofrece un acuerdo justo, el despacho está preparado para llevar su caso a juicio.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section news-section" id="noticias" aria-labelledby="news-title">
        <div className="news-heading"><div><p className="eyebrow">Noticias de KJS Law</p><h2 id="news-title">Resultados, historias y novedades del despacho.</h2></div><p>Lea resultados publicados y novedades legales de Kyle Scott Law. Cada artículo destacado abre su página completa en este sitio.</p></div>
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article className={index === 0 ? 'news-card news-card-featured' : 'news-card'} key={item.href}>
              <div className="news-card-meta"><span>{item.category}</span><time>{item.date}</time></div><strong className="news-accent">{item.accent}</strong><h3>{item.title}</h3><p>{item.excerpt}</p><a href={item.href}>Leer la historia <ArrowRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
        <Link className="news-archive-link" href="/es/noticias">Ver todas las noticias y artículos <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="consultation-section" id="consulta" aria-labelledby="consultation-title">
        <div className="consultation-copy">
          <p className="eyebrow">Consulta gratuita</p><h2 id="consultation-title">Comience con una consulta gratuita.</h2><p>Cuéntenos qué ocurrió y cómo comunicarnos con usted. No se cobra ningún honorario a menos que haya una recuperación.</p>
          <div className="contact-card"><Phone aria-hidden="true" /><span><small>Llame directamente al despacho</small><a href="tel:+17145441460">714-544-1460</a></span></div>
          <div className="contact-card"><MapPin aria-hidden="true" /><span><small>Oficina de Tustin</small><strong>17671 Irvine Blvd., Suite 210<br />Tustin, CA 92780</strong></span></div>
        </div>
        <ConsultationForm locale="es" />
      </section>

      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
