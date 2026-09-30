'use client';

import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/marketing/ui/button';
import { Checkbox } from '@/components/marketing/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/marketing/ui/dialog';
import { Input } from '@/components/marketing/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/marketing/ui/native-select';
import { Textarea } from '@/components/marketing/ui/textarea';
import { chatLauncherCopy } from '@/components/marketing/chat-launcher-copy';
import { ServerRefusal, submissionErrorMessage } from '@/components/marketing/submission-error';
import { submitsThroughOnSubmit } from '@/components/shared/form-submit';
import { contactConsentText, PUBLIC_CONSENT_VERSION, WEBSITE_FIRM_NAME } from '@/lib/leads/public-lead-rules';
import type { SiteLocale } from '@/lib/marketing/i18n';

const matters = [
  ['auto', 'Car or truck crash', 'Accidente de auto o camión'],
  ['premises', 'Slip, fall, or unsafe property', 'Resbalón, caída o propiedad peligrosa'],
  ['med_mal', 'Medical malpractice', 'Negligencia médica'],
  ['wrongful_death', 'Wrongful death', 'Muerte injusta'],
  ['other_pi', 'Another injury matter', 'Otro asunto de lesiones'],
] as const;

export function ChatWidgetPanel({ locale = 'en' }: { locale?: SiteLocale }) {
  // When the form appeared, on the browser's monotonic clock: the form sends how long it was open (the server
  // refuses a submission made faster than a person could type). Set after mount, not during render.
  const loadedAt = useRef(0);
  useEffect(() => {
    loadedAt.current = performance.now();
  }, []);
  const [open, setOpen] = useState(true);
  const [matter, setMatter] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const dragStartY = useRef(0);
  const dragDelta = useRef(0);
  const dragging = useRef(false);
  const spanish = locale === 'es';

  function onGripPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragging.current = true;
    dragStartY.current = event.clientY;
    dragDelta.current = 0;
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* untrusted or unsupported pointer */ }
    const sheet = event.currentTarget.parentElement;
    if (sheet) sheet.style.transition = 'none';
  }

  function onGripPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const delta = Math.max(0, event.clientY - dragStartY.current);
    dragDelta.current = delta;
    const sheet = event.currentTarget.parentElement;
    if (sheet) sheet.style.transform = `translateY(${delta}px)`;
  }

  function onGripPointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    const sheet = event.currentTarget.parentElement;
    if (dragDelta.current > 110) {
      if (sheet) {
        sheet.style.transition = 'transform 220ms ease-in';
        sheet.style.transform = 'translateY(112%)';
      }
      setOpen(false);
    } else if (sheet) {
      sheet.style.transition = 'transform 180ms ease';
      sheet.style.transform = '';
      window.setTimeout(() => {
        if (!dragging.current && sheet.isConnected) { sheet.style.transition = ''; sheet.style.transform = ''; }
      }, 220);
    }
    dragDelta.current = 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!matter) { setStatus('error'); setMessage(spanish ? 'Seleccione un tipo de caso.' : 'Select a case type.'); return; }
    if (!consent) { setStatus('error'); setMessage(spanish ? 'Autorice al bufete para responderle.' : 'Please give the firm permission to respond.'); return; }
    const data = new FormData(event.currentTarget);
    setStatus('submitting');
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'), phone: data.get('phone'), email: data.get('email'),
          preferredContact: data.get('phone') ? 'phone' : 'email', language: locale, caseType: matter,
          incidentDate: '', incidentCounty: '', adverseParty: '', briefSummary: data.get('briefSummary'),
          consentToContact: true, consentVersion: PUBLIC_CONSENT_VERSION, companyWebsite: '',
          elapsedMs: Math.round(performance.now() - loadedAt.current), entry: 'chat',
          sourcePage: `${window.location.pathname}#chat`,
          utmSource: new URLSearchParams(window.location.search).get('utm_source') ?? '',
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium') ?? '',
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') ?? '',
        }),
      });
      const result = await response.json().catch(() => ({})) as { message?: string };
      if (!response.ok) throw new ServerRefusal(result.message ?? '');
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setMessage(submissionErrorMessage(error, locale));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button className="chat-launcher" aria-label={chatLauncherCopy[locale].name} />}>
        <span className="chat-presence" aria-hidden="true" /><MessageCircle aria-hidden="true" /><span>{chatLauncherCopy[locale].visible}</span>
      </DialogTrigger>
      <DialogContent className="chat-panel" closeLabel={spanish ? 'Cerrar' : 'Close'}>
        <div className="chat-sheet-grip" aria-hidden="true" onPointerDown={onGripPointerDown} onPointerMove={onGripPointerMove} onPointerUp={onGripPointerEnd} onPointerCancel={onGripPointerEnd}><span /></div>
        <div className="chat-brand"><span>KJS</span><div><strong>{spanish ? 'Asistente de casos KJS' : 'KJS Case Assistant'}</strong><small>{spanish ? 'Recepción privada del bufete' : 'Private, first-party intake'}</small></div></div>
        {status === 'success' ? (
          <div className="chat-success" role="status">
            <CheckCircle2 aria-hidden="true" /><DialogTitle>{spanish ? 'Recibimos su solicitud.' : 'Your inquiry was received.'}</DialogTitle>
            <DialogDescription>{spanish ? 'Un integrante de Kyle Scott Law la revisará y se comunicará directamente con usted.' : 'A member of Kyle Scott Law will review it and contact you directly.'}</DialogDescription>
            <a href="tel:+17145441460"><Phone aria-hidden="true" />{spanish ? 'Llame al' : 'Call'} 714-544-1460</a>
          </div>
        ) : (
          <form className="chat-form" action={submitsThroughOnSubmit} onSubmit={submit}>
            <DialogTitle>{spanish ? '¿Cómo podemos ayudarle?' : 'How can we help?'}</DialogTitle>
            <DialogDescription>{spanish ? 'Comience con algunos datos básicos. Este asistente no brinda asesoría legal ni crea una relación abogado-cliente.' : 'Start with a few basic details. This assistant does not give legal advice or create an attorney-client relationship.'}</DialogDescription>
            <label className="field chat-matter-field">
              <span>{spanish ? 'Tipo de caso' : 'Case type'}</span>
              <NativeSelect className="w-full" value={matter} onChange={(event) => setMatter(event.target.value)} required>
                <NativeSelectOption value="" disabled>{spanish ? 'Seleccione un tipo de caso' : 'Select a case type'}</NativeSelectOption>
                {matters.map(([value, englishLabel, spanishLabel]) => <NativeSelectOption value={value} key={value}>{spanish ? spanishLabel : englishLabel}</NativeSelectOption>)}
              </NativeSelect>
            </label>
            <label className="field"><span>{spanish ? 'Nombre' : 'Name'}</span><Input name="fullName" required minLength={2} autoComplete="name" /></label>
            <div className="chat-contact-grid">
              <label className="field"><span>{spanish ? 'Teléfono' : 'Phone'}</span><Input name="phone" type="tel" autoComplete="tel" /></label>
              <label className="field"><span>{spanish ? 'Correo electrónico' : 'Email'}</span><Input name="email" type="email" autoComplete="email" /></label>
            </div>
            <label className="field"><span>{spanish ? '¿Qué ocurrió?' : 'What happened?'}</span><Textarea name="briefSummary" required minLength={10} maxLength={600} rows={3} /></label>
            <label className="consent-row compact"><Checkbox checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} /><span>{contactConsentText('chat', locale, WEBSITE_FIRM_NAME)}</span></label>
            {status === 'error' ? <p className="form-error" role="alert">{message}</p> : null}
            <Button className="submit-button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? (spanish ? 'Enviando de forma segura…' : 'Sending securely…') : (spanish ? 'Enviar al bufete' : 'Send to the firm')}</Button>
            <p className="chat-emergency"><ShieldCheck aria-hidden="true" />{spanish ? 'Su información permanece dentro del sistema de recepción del bufete. Para emergencias, llame al 911.' : 'Your information stays within the firm’s intake system. For emergencies, call 911.'}</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
