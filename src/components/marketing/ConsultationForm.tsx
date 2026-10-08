'use client';

import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/marketing/ui/button';
import { Checkbox } from '@/components/marketing/ui/checkbox';
import { Input } from '@/components/marketing/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/marketing/ui/native-select';
import { Textarea } from '@/components/marketing/ui/textarea';
import { ServerRefusal, submissionErrorMessage } from '@/components/marketing/submission-error';
import { submitsThroughOnSubmit } from '@/components/shared/form-submit';
import { contactConsentText, PUBLIC_CONSENT_VERSION, smsDisclosureText, WEBSITE_FIRM_NAME } from '@/lib/leads/public-lead-rules';
import { trackLead } from '@/lib/marketing/analytics';
import type { SiteLocale } from '@/lib/marketing/i18n';

type FormStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string };

const caseTypes = [
  { value: 'car_truck', label: { en: 'Car / Truck Accident', es: 'Accidente de auto o camión' }, normalized: 'auto' },
  { value: 'rideshare', label: { en: 'Uber / Lyft Accident', es: 'Accidente de Uber o Lyft' }, normalized: 'auto' },
  { value: 'wrongful_death', label: { en: 'Wrongful Death', es: 'Muerte injusta' }, normalized: 'wrongful_death' },
  { value: 'school_liability', label: { en: 'School Liability', es: 'Responsabilidad escolar' }, normalized: 'other_pi' },
  { value: 'product_liability', label: { en: 'Product Liability', es: 'Responsabilidad por productos' }, normalized: 'other_pi' },
  { value: 'slip_fall', label: { en: 'Slip & Fall', es: 'Resbalón y caída' }, normalized: 'premises' },
  { value: 'dog_bite', label: { en: 'Dog Bite', es: 'Mordedura de perro' }, normalized: 'other_pi' },
  { value: 'assault_battery', label: { en: 'Assault & Battery', es: 'Agresión y lesiones' }, normalized: 'other_pi' },
  { value: 'sexual_harassment_assault', label: { en: 'Sexual Harassment / Assault', es: 'Acoso o agresión sexual' }, normalized: 'other_pi' },
  { value: 'other', label: { en: 'Other', es: 'Otro' }, normalized: 'other_pi' },
] as const;

export function ConsultationForm({ locale = 'en' }: { locale?: SiteLocale }) {
  // When the form appeared, on the browser's monotonic clock: the form sends how long it was open (the server
  // refuses a submission made faster than a person could type). Set after mount, not during render.
  const loadedAt = useRef(0);
  useEffect(() => {
    loadedAt.current = performance.now();
  }, []);
  const [consent, setConsent] = useState(false);
  const [preferredContact, setPreferredContact] = useState('phone');
  const smsNoteId = useId();
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });
  const spanish = locale === 'es';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus({ state: 'error', message: spanish ? 'Autorice al bufete para responderle.' : 'Please give the firm permission to respond.' });
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const caseTypeChoice = String(data.get('caseTypeChoice') ?? '');
    const selectedCaseType = caseTypes.find((item) => item.value === caseTypeChoice);
    if (!selectedCaseType) {
      setStatus({ state: 'error', message: spanish ? 'Seleccione el tipo de caso que desea que el bufete revise.' : 'Select the type of case you want the firm to review.' });
      return;
    }
    const briefSummary = String(data.get('briefSummary') ?? '');
    setStatus({ state: 'submitting' });

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'),
          email: data.get('email'),
          phone: data.get('phone'),
          preferredContact: data.get('preferredContact'),
          language: locale,
          caseType: selectedCaseType.normalized,
          incidentDate: '',
          incidentCounty: '',
          adverseParty: '',
          briefSummary: `${spanish ? 'Tipo de caso' : 'Case type'}: ${selectedCaseType.label[locale]}\n\n${briefSummary}`,
          consentToContact: true,
          consentVersion: PUBLIC_CONSENT_VERSION,
          companyWebsite: data.get('companyWebsite'),
          elapsedMs: Math.round(performance.now() - loadedAt.current),
          entry: 'form',
          sourcePage: window.location.pathname,
          utmSource: new URLSearchParams(window.location.search).get('utm_source') ?? '',
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium') ?? '',
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') ?? '',
        }),
      });
      const result = await response.json().catch(() => ({})) as { message?: string };
      if (!response.ok) throw new ServerRefusal(result.message ?? '');
      form.reset();
      setConsent(false);
      setPreferredContact('phone');
      setStatus({ state: 'success' });
      trackLead('form');
    } catch (error) {
      setStatus({ state: 'error', message: submissionErrorMessage(error, locale) });
    }
  }

  if (status.state === 'success') {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <p className="eyebrow">{spanish ? 'Solicitud recibida' : 'Inquiry received'}</p>
        <h3>{spanish ? 'Gracias. El bufete revisará su información.' : 'Thank you. The firm will review your information.'}</h3>
        <p>{spanish ? 'Un integrante de Kyle Scott Law se comunicará con usted por el medio que seleccionó.' : 'A member of Kyle Scott Law will contact you using the method you selected.'}</p>
        <Button className="form-reset" type="button" onClick={() => { loadedAt.current = performance.now(); setStatus({ state: 'idle' }); }}>
          {spanish ? 'Enviar otra solicitud' : 'Send another inquiry'}
        </Button>
      </div>
    );
  }

  return (
    // action: a press before hydration is held in the browser, never a GET with the visitor's details in the URL.
    <form className="consultation-form" action={submitsThroughOnSubmit} onSubmit={handleSubmit}>
      <div className="form-heading">
        <div><p className="eyebrow">{spanish ? 'Revisión segura del caso' : 'Secure case review'}</p><h3>{spanish ? 'Cuéntenos qué ocurrió.' : 'Tell us what happened.'}</h3></div>
        <LockKeyhole aria-label={spanish ? 'Solicitud segura' : 'Secure inquiry'} />
      </div>

      <div className="field-grid">
        <label className="field"><span>{spanish ? 'Nombre completo' : 'Full name'}</span><Input name="fullName" required minLength={2} autoComplete="name" placeholder={spanish ? 'Su nombre completo' : 'Your full name'} /></label>
        <label className="field"><span>{spanish ? 'Teléfono' : 'Phone'}</span><Input name="phone" type="tel" autoComplete="tel" placeholder="(714) 555-0123" /></label>
        <label className="field"><span>{spanish ? 'Correo electrónico' : 'Email'}</span><Input name="email" type="email" autoComplete="email" placeholder={spanish ? 'usted@ejemplo.com' : 'you@example.com'} /></label>
        <label className="field"><span>{spanish ? '¿Cómo debemos comunicarnos con usted?' : 'How should we contact you?'}</span><NativeSelect name="preferredContact" className="w-full" value={preferredContact} onChange={(event) => setPreferredContact(event.target.value)} aria-describedby={preferredContact === 'sms' ? smsNoteId : undefined}><NativeSelectOption value="phone">{spanish ? 'Llamada telefónica' : 'Phone call'}</NativeSelectOption><NativeSelectOption value="sms">{spanish ? 'Mensaje de texto' : 'Text message'}</NativeSelectOption><NativeSelectOption value="email">{spanish ? 'Correo electrónico' : 'Email'}</NativeSelectOption></NativeSelect></label>
        {/* The SMS disclosure, beside the text-message choice (a full-width row so the two columns stay aligned). */}
        {preferredContact === 'sms' ? <p className="field-wide" role="note" id={smsNoteId} style={{ margin: 0, fontSize: 13, lineHeight: 1.45, color: 'var(--ink-soft)' }}>{smsDisclosureText(locale, WEBSITE_FIRM_NAME)}</p> : null}
        <label className="field field-wide">
          <span>{spanish ? 'Tipo de caso' : 'Case type'}</span>
          <NativeSelect name="caseTypeChoice" className="w-full" defaultValue="" required>
            <NativeSelectOption value="" disabled>{spanish ? 'Seleccione un tipo de caso' : 'Select a case type'}</NativeSelectOption>
            {caseTypes.map((caseType) => (
              <NativeSelectOption value={caseType.value} key={caseType.value}>{caseType.label[locale]}</NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
        <label className="field field-wide"><span>{spanish ? 'Describa brevemente lo ocurrido' : 'Briefly describe what happened'}</span><Textarea name="briefSummary" required minLength={10} maxLength={500} rows={5} placeholder={spanish ? 'Comparta los hechos básicos y las lesiones. No incluya números de Seguro Social, expedientes médicos ni información de cuentas financieras.' : 'Please share the basic facts and injuries. Do not include Social Security numbers, medical records, or financial account information.'} /></label>
      </div>

      <label className="consent-row">
        <Checkbox checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} aria-label={spanish ? 'Permiso para comunicarse' : 'Permission to contact'} />
        <span>{contactConsentText('form', locale, WEBSITE_FIRM_NAME)}</span>
      </label>
      <input className="honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status.state === 'error' ? <p className="form-error" role="alert">{status.message}</p> : null}
      <Button className="submit-button" type="submit" disabled={status.state === 'submitting'}>
        {status.state === 'submitting' ? (spanish ? 'Enviando de forma segura…' : 'Submitting securely…') : <>{spanish ? 'Solicitar revisión del caso' : 'Request a case review'} <ArrowRight aria-hidden="true" /></>}
      </Button>
      <p className="form-footnote">{spanish ? 'No use este formulario para emergencias. Llame al 911 si necesita ayuda inmediata.' : 'Do not use this form for emergencies. Call 911 when immediate help is needed.'}</p>
    </form>
  );
}
