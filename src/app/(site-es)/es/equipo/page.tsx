import Image from 'next/image';
import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, BriefcaseBusiness, MapPin, Scale, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { StructuredData } from '@/components/marketing/StructuredData';
import { localizedAlternates } from '@/lib/marketing/i18n';
import { attorneyProfileStructuredData } from '@/lib/marketing/structured-data';

export const metadata: Metadata = { title: 'El equipo de Kyle Scott Law | Tustin', description: 'Conozca al abogado Kyle J. Scott y al equipo de Kyle Scott Law en Tustin, que representa a personas lesionadas desde 1991. Consulta gratuita.', alternates: localizedAlternates('/es/equipo') };

const teamMembers = [
  { name: 'Naomi Moore', role: 'Gerente de oficina', image: '/naomi-moore.webp' },
  { name: 'Evan Scott', role: 'Asistente legal', image: '/evan-scott.webp' },
  { name: 'Jacqualine Scott', role: 'Administradora', image: '/jacqualine-scott.webp' },
];

export default function SpanishTeamPage() {
  return (
    <main className="team-page">
      <StructuredData data={attorneyProfileStructuredData('es')} />
      <SiteHeader locale="es" />
      <section className="team-hero" aria-labelledby="team-title"><div className="team-hero-copy"><h1 className="team-hero-title" id="team-title">Conozca al equipo</h1><p>El abogado litigante Kyle J. Scott y el personal profesional que atiende a clientes desde la oficina de Tustin.</p></div><figure className="team-hero-photo"><Image src="/kjs-team.jpg" alt="El equipo de Kyle Scott Law frente a la oficina de Tustin" width={900} height={600} loading="eager" fetchPriority="high" quality={90} sizes="(max-width: 1430px) 94vw, 1280px" /><figcaption><span>Kyle Scott Law</span><strong>Tustin, California</strong></figcaption></figure></section>
      <section className="team-facts" aria-label="Datos de Kyle Scott Law"><article><Scale aria-hidden="true" /><span><strong>Abogado litigante</strong><small>Kyle J. Scott</small></span></article><article><ShieldCheck aria-hidden="true" /><span><strong>Colegio de Abogados de California</strong><small>Admitido en 1991</small></span></article><article><MapPin aria-hidden="true" /><span><strong>Oficina de Tustin</strong><small>Servicio al Condado de Orange y California</small></span></article><article><UserRoundCheck aria-hidden="true" /><span><strong>Equipo dedicado</strong><small>Abogado y personal profesional</small></span></article></section>
      <section className="lead-attorney" aria-labelledby="kyle-title"><div className="lead-attorney-photo"><Image src="/kyle-scott-headshot.jpg" alt="Abogado litigante Kyle J. Scott" width={573} height={803} loading="lazy" /></div><div className="lead-attorney-copy"><p className="eyebrow light-eyebrow">Fundador y abogado litigante</p><h2 id="kyle-title">Kyle J. Scott</h2><p className="lead-attorney-intro">Durante más de 30 años, Kyle Scott ha estado al lado de las personas en algunos de los días más difíciles de su vida: después de un choque, una caída, el ataque de un perro, un error médico o un abuso. Desde 1991 ha dedicado su carrera a representar a personas lesionadas y a sus familias, y ha obtenido para sus clientes múltiples acuerdos y veredictos de jurado multimillonarios.</p><p>Cuando usted se comunica con el bufete, su primera conversación es con el propio Kyle. Él escucha lo que pasó, le dice con honestidad en qué situación se encuentra y le explica sus opciones en un lenguaje sencillo. Se mantiene involucrado personalmente desde esa primera llamada hasta el resultado final, y se asegura de que usted siempre sepa cómo va su caso, para que pueda concentrarse en su salud y en su familia mientras él se enfrenta a las compañías de seguros.</p><p>Kyle fundó Kyle Scott Law en 2003 y maneja todo tipo de casos de lesiones personales: choques de auto, camión y motocicleta, propiedades peligrosas, mordeduras de perro, lesiones cerebrales y de la médula espinal, negligencia médica, abuso y acoso sexual, responsabilidad escolar e institucional, y muerte injusta. Obtuvo su licenciatura en Ciencias Políticas de UCLA en 1986 y su título de J.D. de Loyola Law School en 1991, está autorizado para ejercer en California y en los tribunales federales de los Distritos Central y Sur de California, y es miembro de Consumer Attorneys of Los Angeles.</p><div className="attorney-credentials" aria-label="Educación y credenciales de Kyle Scott"><article><BookOpen aria-hidden="true" /><span><strong>UCLA</strong><small>B.A., Ciencias Políticas · 1986</small></span></article><article><BookOpen aria-hidden="true" /><span><strong>Loyola Law School</strong><small>J.D. · 1991</small></span></article><article><Scale aria-hidden="true" /><span><strong>State Bar of California</strong><small>Activo · Admitido en 1991</small></span></article><article><BriefcaseBusiness aria-hidden="true" /><span><strong>Kyle Scott Law</strong><small>Propietario del bufete desde 2003</small></span></article></div><div className="lead-attorney-links"><a className="light-link" href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/155434" hrefLang="en">Ver perfil del State Bar <ArrowRight aria-hidden="true" /></a><Link className="light-link" href="/es/resultados">Revisar resultados <ArrowRight aria-hidden="true" /></Link></div><p className="lead-attorney-note">Cada caso es diferente, y los resultados anteriores no garantizan un resultado similar.</p></div></section>
      <section className="team-roster" aria-labelledby="roster-title"><div className="team-roster-heading"><h2 id="roster-title">Nuestro equipo.</h2></div><div className="team-roster-grid">{teamMembers.map((member) => <article className="team-member-card" key={member.name}><div className="team-member-photo"><Image src={member.image} alt={`${member.name}, ${member.role} de Kyle Scott Law`} width={600} height={900} loading="lazy" /></div><div className="team-member-copy"><span>{member.role}</span><h3>{member.name}</h3></div></article>)}</div></section>
      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
