'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/marketing/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/marketing/ui/dialog';
import { LanguageSwitcher } from '@/components/marketing/LanguageSwitcher';
import type { SiteLocale } from '@/lib/marketing/i18n';

const links = {
  en: [['Home', '/'], ['Results', '/results'], ['Meet The Team', '/meet-the-team'], ['Testimonials', '/testimonials'], ['Legal Guides', '/guides'], ['Latest News', '/news'], ['Contact', '/contact']],
  es: [['Inicio', '/es'], ['Resultados', '/es/resultados'], ['El equipo', '/es/equipo'], ['Testimonios', '/es/testimonios'], ['Guías legales', '/es/guias'], ['Noticias', '/es/noticias'], ['Contacto', '/es/contacto']],
};

const mobilePracticeLinks = {
  en: [['Personal Injury', '/personal-injury-lawyer-orange-county'], ['Car Accidents', '/orange-county-auto-accidents-lawyer'], ['Slip & Fall', '/orange-county-slip-and-fall-attorney'], ['Medical Malpractice', '/orange-county-medical-malpractice-attorney'], ['Elder Abuse & Neglect', '/orange-county-elder-abuse-attorney'],['Dog Bites', '/dog-bite-attorney-in-orange-county'], ['Brain Injury', '/orange-county-traumatic-brain-injury-attorney'], ['Sexual Harassment & Abuse', '/sexual-harassment-lawyer-in-orange-county'], ['Wrongful Death', '/orange-county-wrongful-death-attorney']],
  es: [['Lesiones personales', '/es/abogado-de-lesiones-personales-condado-de-orange'], ['Accidentes de auto', '/es/abogado-de-accidentes-de-auto-condado-de-orange'], ['Resbalones y caídas', '/es/abogado-de-resbalones-y-caidas-condado-de-orange'], ['Negligencia médica', '/es/abogado-de-negligencia-medica-condado-de-orange'], ['Abuso de personas mayores', '/es/abogado-de-abuso-de-personas-mayores-condado-de-orange'],['Mordeduras de perro', '/es/abogado-de-mordeduras-de-perro-condado-de-orange'], ['Lesión cerebral', '/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange'], ['Acoso y abuso sexual', '/es/abogado-de-acoso-y-abuso-sexual-condado-de-orange'], ['Muerte injusta', '/es/abogado-de-muerte-injusta-condado-de-orange']],
};

export function MobileNav({ locale = 'en' }: { locale?: SiteLocale }) {
  const [open, setOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const spanish = locale === 'es';

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setPracticeOpen(false);
  };

  const closeMenu = () => {
    setOpen(false);
    setPracticeOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button className="mobile-menu-button" variant="ghost" size="icon" aria-label={spanish ? 'Abrir navegación' : 'Open navigation'} />}>
        <Menu aria-hidden="true" />
      </DialogTrigger>
      <DialogContent
        className="mobile-menu-panel"
        closeLabel={spanish ? 'Cerrar' : 'Close'}
        aria-modal="true"
        style={{
          inset: 0,
          top: 0,
          left: 0,
          width: '100vw',
          maxWidth: 'none',
          height: '100dvh',
          transform: 'none',
          translate: 'none',
        }}
      >
        <div className="mobile-menu-brand">
          <a className="mobile-menu-wordmark" href={spanish ? '/es' : '/'} onClick={closeMenu} aria-label={spanish ? 'Inicio de Kyle Scott Law' : 'Kyle Scott Law home'}>
            <Image src="/kjs-logo.jpeg" alt="Kyle Scott Law" width={170} height={120} />
          </a>
          <DialogTitle className="sr-only">{spanish ? 'Menú' : 'Menu'}</DialogTitle>
        </div>
        <DialogDescription className="sr-only">{spanish ? 'Navegue el sitio web de Kyle Scott Law.' : 'Navigate the Kyle Scott Law website.'}</DialogDescription>
        <LanguageSwitcher mobile />
        <div className={`mobile-menu-scroll${practiceOpen ? ' has-open-practice' : ''}`}>
          <nav className="mobile-primary-links" aria-label={spanish ? 'Navegación móvil' : 'Mobile navigation'}>
            <a href={links[locale][0][1]} onClick={closeMenu}>{links[locale][0][0]}</a>
            <div className={`mobile-practice-entry${practiceOpen ? ' is-open' : ''}`}>
              <button
                className="mobile-practice-toggle"
                type="button"
                aria-expanded={practiceOpen}
                aria-controls="mobile-practice-menu"
                onClick={() => setPracticeOpen((current) => !current)}
              >
                <span>{spanish ? 'Áreas de práctica' : 'Practice Areas'}</span>
                <ChevronDown aria-hidden="true" />
              </button>
              <div className="mobile-practice-dropdown" id="mobile-practice-menu" hidden={!practiceOpen}>
                <a href={spanish ? '/es/areas-de-practica' : '/practice-areas'} onClick={closeMenu}>{spanish ? 'Todas las áreas de práctica' : 'All Practice Areas'}</a>
                {mobilePracticeLinks[locale].map(([label, href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
              </div>
            </div>
            {links[locale].slice(1).map(([label, href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
          </nav>
        </div>
        <div className="mobile-menu-actions">
          <a className="primary-button" href={spanish ? '/es/contacto#revision-del-caso' : '/contact#case-review'} onClick={closeMenu}>{spanish ? 'Consulta gratuita' : 'Free consultation'}</a>
          <a className="mobile-menu-phone" href="tel:+17145441460"><Phone aria-hidden="true" />714-544-1460</a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
