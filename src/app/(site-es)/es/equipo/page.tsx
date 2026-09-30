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

export const metadata: Metadata = { title: 'El equipo de Kyle Scott Law | Tustin', description: 'Conozca al abogado litigante Kyle J. Scott y al equipo profesional de Kyle Scott Law en Tustin, California.', alternates: localizedAlternates('/es/equipo') };

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
      <section className="team-hero" aria-labelledby="team-title"><div className="team-hero-copy"><h1 className="team-hero-title" id="team-title">Conozca al equipo</h1><p>El abogado litigante Kyle J. Scott y el personal profesional que atiende a clientes desde la oficina de Tustin.</p></div><figure className="team-hero-photo"><Image src="/team-group-original.webp" alt="El equipo de Kyle Scott Law frente a la oficina de Tustin" width={900} height={600} loading="eager" fetchPriority="high" /><figcaption><span>Kyle Scott Law</span><strong>Tustin, California</strong></figcaption></figure></section>
      <section className="team-facts" aria-label="Datos de Kyle Scott Law"><article><Scale aria-hidden="true" /><span><strong>Abogado litigante</strong><small>Kyle J. Scott</small></span></article><article><ShieldCheck aria-hidden="true" /><span><strong>Colegio de Abogados de California</strong><small>Admitido en 1991</small></span></article><article><MapPin aria-hidden="true" /><span><strong>Oficina de Tustin</strong><small>Servicio al Condado de Orange y California</small></span></article><article><UserRoundCheck aria-hidden="true" /><span><strong>Equipo dedicado</strong><small>Abogado y personal profesional</small></span></article></section>
      <section className="lead-attorney" aria-labelledby="kyle-title"><div className="lead-attorney-photo"><Image src="/kyle-scott-original.webp" alt="Abogado litigante Kyle J. Scott" width={600} height={900} loading="lazy" /><span>Abogado de California núm. 155434</span></div><div className="lead-attorney-copy"><p className="eyebrow light-eyebrow">Fundador y abogado litigante</p><h2 id="kyle-title">Kyle J. Scott</h2><p className="lead-attorney-intro">Kyle Scott ejerce la abogacía en California desde 1991 y ha enfocado su carrera en representar a clientes lesionados.</p><p>Obtuvo una licenciatura en Ciencias Políticas de UCLA en 1986 y el título de J.D. de Loyola Law School en 1991. Está autorizado para ejercer en California y en los tribunales federales de los Distritos Central y Sur de California.</p><p>Kyle dirige su propio bufete desde 2003. Su trabajo incluye accidentes vehiculares, propiedades peligrosas, mordeduras de perro, lesiones cerebrales, negligencia médica, abuso y acoso sexual, responsabilidad institucional y otras lesiones graves.</p><div className="attorney-credentials" aria-label="Educación y credenciales de Kyle Scott"><article><BookOpen aria-hidden="true" /><span><strong>UCLA</strong><small>B.A., Ciencias Políticas · 1986</small></span></article><article><BookOpen aria-hidden="true" /><span><strong>Loyola Law School</strong><small>J.D. · 1991</small></span></article><article><Scale aria-hidden="true" /><span><strong>State Bar of California</strong><small>Activo · Admitido en 1991</small></span></article><article><BriefcaseBusiness aria-hidden="true" /><span><strong>Kyle Scott Law</strong><small>Propietario del bufete desde 2003</small></span></article></div><div className="lead-attorney-links"><a className="light-link" href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/155434" hrefLang="en">Ver perfil del State Bar <ArrowRight aria-hidden="true" /></a><Link className="light-link" href="/es/resultados">Revisar resultados <ArrowRight aria-hidden="true" /></Link></div></div></section>
      <section className="team-roster" aria-labelledby="roster-title"><div className="team-roster-heading"><h2 id="roster-title">Nuestro equipo.</h2></div><div className="team-roster-grid">{teamMembers.map((member) => <article className="team-member-card" key={member.name}><div className="team-member-photo"><Image src={member.image} alt={`${member.name}, ${member.role} de Kyle Scott Law`} width={600} height={900} loading="lazy" /></div><div className="team-member-copy"><span>{member.role}</span><h3>{member.name}</h3></div></article>)}</div></section>
      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
