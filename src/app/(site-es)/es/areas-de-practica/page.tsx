import Link from "next/link";
import type { Metadata } from 'next';
import { ArrowRight, Brain, BriefcaseMedical, CarFront, Dog, HeartHandshake, Scale, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { ChatWidget } from '@/components/marketing/ChatWidget';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { type PracticeAreaIcon } from '@/lib/marketing/data/practiceAreas';
import { spanishPracticeAreas } from '@/lib/marketing/data/spanishPracticeAreas';
import { localizedAlternates } from '@/lib/marketing/i18n';

export const metadata: Metadata = {
  title: 'Áreas de práctica de lesiones personales | Kyle Scott Law',
  description: 'Conozca las áreas de práctica de Kyle Scott Law: accidentes, caídas, mordeduras de perro, negligencia médica, lesiones cerebrales, abuso y muerte injusta.',
  alternates: localizedAlternates('/es/areas-de-practica'),
};

const iconMap = { shield: ShieldCheck, car: CarFront, fall: UserRoundCheck, medical: BriefcaseMedical, dog: Dog, brain: Brain, support: HeartHandshake, scale: Scale } satisfies Record<PracticeAreaIcon, typeof ShieldCheck>;

export default function SpanishPracticeAreasPage() {
  return (
    <main className="practice-hub-page">
      <SiteHeader locale="es" />
      <section className="practice-hub-intro" aria-labelledby="practice-hub-title">
        <h1 id="practice-hub-title">Áreas de práctica</h1>
        <p>Representación por lesiones personales para clientes del Condado de Orange y California.</p>
      </section>
      <section className="practice-hub-grid-section" aria-label="Áreas de práctica de Kyle Scott Law">
        <p className="eyebrow practice-hub-grid-label">Casos que manejamos</p>
        <div className="practice-hub-grid">
          {spanishPracticeAreas.map((area) => { const Icon = iconMap[area.icon]; return <a href={area.path} key={area.key}><span><Icon aria-hidden="true" /></span><div><strong>{area.shortTitle}</strong><p>{area.description}</p><small>Ver esta área de práctica <ArrowRight aria-hidden="true" /></small></div></a>; })}
        </div>
      </section>
      <section className="practice-hub-note"><div><p className="eyebrow light-eyebrow">¿No sabe qué categoría corresponde?</p><h2>Cuéntenos qué ocurrió.</h2><p>Una solicitud breve es suficiente para comenzar. No envíe expedientes médicos, números de Seguro Social ni información de cuentas financieras mediante el formulario general.</p></div><Link className="primary-button" href="/es/contacto#revision-del-caso">Comenzar una consulta gratuita <ArrowRight aria-hidden="true" /></Link></section>
      <SiteFooter locale="es" />
      <ChatWidget locale="es" />
    </main>
  );
}
