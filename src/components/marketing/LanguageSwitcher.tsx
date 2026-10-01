'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { localeFromPath, routeForLocale } from '@/lib/marketing/i18n';

/**
 * The language switcher: the current language, opening a menu of both. Desktop header: "English".
 * Mobile menu (`mobile`): the same, in the menu. Mobile header (`compact`, beside the call button):
 * the current language's code, "EN" or "ES"; its spoken name starts with that code (WCAG 2.5.3).
 */
export function LanguageSwitcher({ mobile = false, compact = false }: { mobile?: boolean; compact?: boolean }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentLabel = locale === 'es' ? 'Español' : 'English';
  const menuLabel = locale === 'es' ? 'Seleccionar idioma' : 'Select language';
  const optionsId = compact ? 'header-language-options' : mobile ? 'mobile-language-options' : 'desktop-language-options';

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && buttonRef.current?.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        buttonRef.current.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className={`language-switcher-root${mobile ? ' mobile-language-switcher' : ''}${compact ? ' header-language-switcher' : ''}`}>
      <button
        ref={buttonRef}
        className="language-switcher"
        type="button"
        aria-expanded={open}
        aria-controls={optionsId}
        onClick={() => setOpen((current) => !current)}
      >
        <Languages aria-hidden="true" />
        {compact ? (
          <span>{locale === 'es' ? 'ES' : 'EN'}<span className="sr-only">, {currentLabel}: {locale === 'es' ? 'cambiar idioma' : 'change language'}</span></span>
        ) : (
          <span>{currentLabel}</span>
        )}
        <ChevronDown className="language-switcher-chevron" aria-hidden="true" />
      </button>
      <div
        className="language-switcher-dropdown"
        id={optionsId}
        aria-label={menuLabel}
        hidden={!open}
      >
        <a
          href={routeForLocale(pathname, 'en')}
          hrefLang="en-US"
          lang="en"
          aria-current={locale === 'en' ? 'page' : undefined}
          onClick={() => setOpen(false)}
        >
          <span><small>EN</small> English</span>
          {locale === 'en' && <Check aria-hidden="true" />}
        </a>
        <a
          href={routeForLocale(pathname, 'es')}
          hrefLang="es-US"
          lang="es"
          aria-current={locale === 'es' ? 'page' : undefined}
          onClick={() => setOpen(false)}
        >
          <span><small>ES</small> Español</span>
          {locale === 'es' && <Check aria-hidden="true" />}
        </a>
      </div>
    </div>
  );
}
