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
import { areaRegions, practiceGroups } from '@/lib/marketing/data/areasWeServe';
import { practiceAreaByKey } from '@/lib/marketing/data/practiceAreas';
import { serviceAreaByKey } from '@/lib/marketing/data/serviceAreas';
import { spanishPracticeAreaByKey } from '@/lib/marketing/data/spanishPracticeAreas';
import { spanishServiceAreaByKey } from '@/lib/marketing/data/spanishServiceAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';

const terms = noRecoveryTerms.es;

export const metadata: Metadata = {
  title: 'Abogado de lesiones personales en el Condado de Orange | Kyle Scott Law',
  description: 'Kyle Scott, abogado de lesiones personales en el Condado de Orange, maneja todo tipo de casos de lesiones, desde choques de auto hasta negligencia médica. Consulta gratuita, en español o inglés.',
  alternates: localizedAlternates('/es'),
};

// "Todos los tipos de casos de lesiones personales": every practice page, in the order of /areas-we-serve, from the same data,
// so a new practice page appears here once its record exists. Each links its Spanish page; a practice with no Spanish record
// links the English page. The county-wide hub is linked in the sentence above the list.
const everyPractice = practiceGroups
  .flatMap((group) => group.keys)
  .filter((key) => key !== 'personal-injury')
  .flatMap((key) => {
    const page = spanishPracticeAreaByKey[key] ?? practiceAreaByKey[key];
    return page ? [{ key, path: page.path, shortTitle: page.shortTitle, inEnglish: !spanishPracticeAreaByKey[key] }] : [];
  });

// "Áreas que atendemos": the Orange County regions of /areas-we-serve (which has no Spanish version), each city linked to its
// Spanish page where there is one and to its English page otherwise (a key with no record is left out).
const regionNames: Record<string, string> = {
  'Central Orange County': 'Centro del Condado de Orange',
  'North Orange County': 'Norte del Condado de Orange',
  'West Orange County': 'Oeste del Condado de Orange',
  'Coastal Orange County': 'Costa del Condado de Orange',
  'South Orange County': 'Sur del Condado de Orange',
};
const countyRegions = areaRegions.filter((region) => region.name !== 'Beyond Orange County');

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
  { amount: '$6.8M', type: 'Negligencia del distrito escolar', title: 'Alumnos de primaria abusados sexualmente por un maestro', meta: 'Confidencial • Acuerdo', date: '2004', href: '/es/resultados', cta: 'Ver en resultados' },
  { amount: '$5.75M', type: 'Veredicto del jurado', title: 'Estudiante sufre fractura de cráneo y hemorragia cerebral', meta: 'Juicio con jurado de dos semanas • Tribunal Superior de Los Ángeles', date: '2019', href: '/es/resultados#flagship-title', cta: 'Ver en resultados' },
  { amount: '$2.7M', type: 'Acuerdo', title: 'Madre e hijos lesionados en un choque en una intersección de Fontana', meta: 'Tribunal Superior de San Bernardino • Acuerdo combinado para cinco personas lesionadas', date: '2026', href: '/es/resultados#results-explorer-title', cta: 'Ver en resultados' },
];

const newsItems = [
  { category: 'Acuerdo', accent: '$2.2M', title: 'Demanda por abuso sexual resuelta por $2.2 millones', excerpt: 'Kyle Scott Law explica su trabajo de apoyo a sobrevivientes y el camino hacia la recuperación.', date: '26 de diciembre de 2024', href: '/es/noticias/acuerdo-abuso-sexual-2-2-millones' },
  { category: 'Veredicto del jurado', accent: '$5.75M', title: 'Estudiante sufre fractura de cráneo y hemorragia cerebral', excerpt: 'Un jurado del Tribunal Superior de Los Ángeles emitió este veredicto tras un juicio de dos semanas.', date: '2019', href: '/es/resultados#flagship-title', cta: 'Ver en resultados' },
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
            <p className="hero-thesis">Kyle Scott Law maneja todo tipo de casos de lesiones personales de personas en todo el Condado de Orange y el sur de California.</p>
            <p className="hero-description">Desde su oficina en Tustin, el abogado Kyle J. Scott, admitido en 1991, representa a personas lesionadas en choques de auto y de camión, caídas, mordeduras de perro, negligencia médica, lesiones cerebrales, abuso y muerte injusta.</p>
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
            <Image src="/kjs-team.jpg" alt="Kyle Scott con el equipo de Kyle Scott Law en Tustin" width={900} height={600} priority fetchPriority="high" quality={90} sizes="(max-width: 1023px) 94vw, 57vw" />
            <div className="photo-caption">Kyle Scott y el equipo de KJS Law</div>
          </div>
          <div className="trust-rail" aria-label="Datos del despacho">
            <div className="trust-item"><span className="trust-icon"><Award aria-hidden="true" /></span><span><strong>Desde 1991</strong><small>Ejerciendo la abogacía en California</small></span></div>
            <div className="trust-item"><span className="trust-icon"><BadgeDollarSign aria-hidden="true" /></span><span><strong>Más de $50 millones recuperados</strong><small>Veredictos y acuerdos publicados</small></span></div>
            <div className="trust-item"><span className="trust-icon"><Scale aria-hidden="true" /></span><span><strong>{terms.label}</strong><small>{terms.condition}</small></span></div>
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
          <p className="results-disclaimer">Cada caso es diferente. Los resultados anteriores no garantizan un resultado similar.</p>
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
        <h3 className="practice-every-case-title">Todos los tipos de casos de lesiones personales, en un solo lugar.</h3>
        <p>Kyle Scott Law maneja cada tipo de caso que aparece abajo. Vea cómo funciona cada uno en la <Link href="/es/abogado-de-lesiones-personales-condado-de-orange">página del abogado de lesiones personales del Condado de Orange</Link>.</p>
        <ul className="practice-every-case">{everyPractice.map((area) => <li key={area.key}><Link href={area.path} {...(area.inEnglish ? { hrefLang: 'en', lang: 'en' } : {})}>{area.shortTitle}</Link></li>)}<li><Link href="/es/areas-de-practica">Ver todas las áreas de práctica</Link></li></ul>
        <div className="practice-footer"><ShieldCheck aria-hidden="true" /><p><strong>Sin presión. Sin una línea genérica de recepción.</strong> Su solicitud de consulta entra directamente al sistema privado de revisión del despacho.</p></div>
      </section>

      <section className="firm-section" id="equipo" aria-labelledby="firm-title">
        <div className="firm-intro">
          <div className="firm-photo"><Image src="/kyle-scott-headshot.jpg" alt="Abogado litigante Kyle Scott" width={573} height={803} loading="lazy" sizes="(max-width: 1023px) 94vw, 520px" /></div>
          <div className="firm-copy">
            <h2 id="firm-title" className="firm-heading">Sobre Nosotros</h2>
            <p className="firm-lead">Soy Kyle Scott. Fui admitido en el Colegio de Abogados de California (State Bar of California) en 1991 y fundé este despacho en 2003. Represento a personas que sufrieron lesiones graves, y a las familias que las cuidan, en todo el Condado de Orange y el sur de California. Una lesión puede trastocarlo todo a la vez: su salud, su trabajo, los planes de su familia. Mi trabajo es encargarme de la batalla legal para que usted pueda concentrarse en recuperarse.</p>
            <p className="firm-experience">Atiendo todo tipo de casos de lesiones personales: <Link href="/es/abogado-de-accidentes-de-auto-condado-de-orange">choques de auto, camión, motocicleta, viaje compartido, peatones y bicicleta</Link>; <Link href="/es/abogado-de-resbalones-y-caidas-condado-de-orange">resbalones, caídas y otras lesiones por propiedades inseguras</Link>; <Link href="/es/abogado-de-mordeduras-de-perro-condado-de-orange">mordeduras de perro</Link>; asuntos de responsabilidad por productos; <Link href="/es/abogado-de-responsabilidad-escolar-condado-de-orange">reclamos contra escuelas, instituciones y el gobierno</Link>; <Link href="/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange">lesiones cerebrales, de la médula espinal, quemaduras y otras lesiones catastróficas</Link>; y <Link href="/es/abogado-de-muerte-injusta-condado-de-orange">muerte injusta</Link>. También represento a personas en casos de <Link href="/es/abogado-de-negligencia-medica-condado-de-orange">negligencia médica</Link>, negligencia legal (legal malpractice), <Link href="/es/abogado-de-abuso-de-personas-mayores-condado-de-orange">abuso y negligencia de personas mayores</Link>, <Link href="/es/abogado-de-acoso-y-abuso-sexual-condado-de-orange">abuso sexual (incluido el abuso por parte del clero), agresión (assault and battery) y acoso sexual en el trabajo</Link>, <Link href="/es/abogado-de-mala-fe-de-seguros-condado-de-orange">mala fe de seguros</Link>, despido injustificado y discriminación laboral.</p>
            <p className="firm-experience">Desde nuestra oficina en Tustin, mi equipo y yo investigamos lo que pasó, identificamos a todos los que podrían ser responsables, documentamos lo que la lesión le ha costado y le explicamos sus opciones con palabras claras, para que pueda tomar cada decisión con toda la información.</p>
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

      <section className="section areas-home-section" id="areas-que-atendemos" aria-labelledby="areas-home-title">
        <div className="news-heading">
          <div><p className="eyebrow">Áreas que atendemos</p><h2 id="areas-home-title">Casos de lesiones de todas las ciudades del Condado de Orange, y de todo el sur de California.</h2></div>
          <p>La oficina del despacho está en Tustin, y el despacho representa a personas lesionadas en todas las ciudades del Condado de Orange y en las comunidades no incorporadas del condado. También representa a personas lesionadas en otras partes del sur de California: sus resultados publicados incluyen casos en los tribunales superiores de San Bernardino, del Condado de Riverside y de Los Ángeles.</p>
        </div>
        <div className="areas-region-grid">
          {countyRegions.map((region) => {
            const name = regionNames[region.name] ?? region.name;
            return (
              <section key={region.name} aria-label={name}>
                <h3>{name}</h3>
                <ul>{region.keys.map((key) => { const spanish = spanishServiceAreaByKey[key]; const area = spanish ?? serviceAreaByKey[key]; return area ? <li key={key}><Link href={area.path} hrefLang={spanish ? undefined : 'en'}>{area.city}</Link></li> : null; })}</ul>
              </section>
            );
          })}
        </div>
        <Link className="news-archive-link" href="/areas-we-serve" hrefLang="en">Ver todas las áreas que atendemos (en inglés) <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="section news-section" id="noticias" aria-labelledby="news-title">
        <div className="news-heading"><div><p className="eyebrow">Noticias de KJS Law</p><h2 id="news-title">Resultados, historias y novedades del despacho.</h2></div><p>Lea resultados publicados y novedades legales de Kyle Scott Law. Cada artículo destacado abre su página completa en este sitio.</p></div>
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article className={index === 0 ? 'news-card news-card-featured' : 'news-card'} key={item.href}>
              <div className="news-card-meta"><span>{item.category}</span><time>{item.date}</time></div><strong className="news-accent">{item.accent}</strong><h3>{item.title}</h3><p>{item.excerpt}</p><a href={item.href}>{item.cta ?? 'Leer la historia'} <ArrowRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
        <Link className="news-archive-link" href="/es/noticias">Ver todas las noticias y artículos <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="consultation-section" id="consulta" aria-labelledby="consultation-title">
        <div className="consultation-copy">
          <p className="eyebrow">Consulta gratuita</p><h2 id="consultation-title">Comience con una consulta gratuita.</h2><p>Cuéntenos qué ocurrió y cómo comunicarnos con usted. {terms.statement}.</p>
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
