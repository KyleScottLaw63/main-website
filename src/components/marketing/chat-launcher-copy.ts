import type { SiteLocale } from '@/lib/marketing/i18n';

/**
 * The floating chat button's words. Its spoken name starts with the words it shows ("Ask KJS"),
 * so a voice-control user can say what they see (WCAG 2.5.3, Label in Name); the rest of the name
 * says what the button does. Shared by the placeholder button (ChatWidget) and the dialog trigger
 * (ChatWidgetPanel), which replace each other on the page.
 */
export const chatLauncherCopy: Record<SiteLocale, { visible: string; name: string; loadingName: string }> = {
  en: {
    visible: 'Ask KJS',
    name: 'Ask KJS: open the KJS Law case assistant',
    loadingName: 'Ask KJS: loading the KJS Law case assistant',
  },
  es: {
    visible: 'Pregunte a KJS',
    name: 'Pregunte a KJS: abrir el asistente de casos de KJS Law',
    loadingName: 'Pregunte a KJS: cargando el asistente de casos de KJS Law',
  },
};
