'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { localeFromPath, routeForLocale } from '@/lib/marketing/i18n';

/**
 * The mobile header's one-tap switch to the other language, beside the call button: "ES" on the
 * English site, "EN" on the Spanish one, straight to this page's counterpart. The menu keeps the
 * full switcher. The spoken name starts with the letters it shows (WCAG 2.5.3) and is in the
 * language it switches to.
 */
export function LanguageToggle() {
  const pathname = usePathname();
  const spanish = localeFromPath(pathname) === 'es';
  return spanish ? (
    <a className="mobile-header-language" href={routeForLocale(pathname, 'en')} hrefLang="en-US" lang="en">
      EN<span className="sr-only">: view this page in English</span>
    </a>
  ) : (
    <a className="mobile-header-language" href={routeForLocale(pathname, 'es')} hrefLang="es-US" lang="es">
      ES<span className="sr-only">: ver esta página en español</span>
    </a>
  );
}

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentLabel = locale === 'es' ? 'Español' : 'English';
  const menuLabel = locale === 'es' ? 'Seleccionar idioma' : 'Select language';

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
    <div ref={rootRef} className={`language-switcher-root${mobile ? ' mobile-language-switcher' : ''}`}>
      <button
        ref={buttonRef}
        className="language-switcher"
        type="button"
        aria-expanded={open}
        aria-controls={mobile ? 'mobile-language-options' : 'desktop-language-options'}
        onClick={() => setOpen((current) => !current)}
      >
        <Languages aria-hidden="true" />
        <span>{currentLabel}</span>
        <ChevronDown className="language-switcher-chevron" aria-hidden="true" />
      </button>
      <div
        className="language-switcher-dropdown"
        id={mobile ? 'mobile-language-options' : 'desktop-language-options'}
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
