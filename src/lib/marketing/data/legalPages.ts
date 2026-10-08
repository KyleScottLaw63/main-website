import type { SiteLocale } from '@/lib/marketing/i18n';

export type LegalPageKind = 'privacy' | 'disclaimer' | 'accessibility';

export type LegalPageSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalPageContent = {
  kind: LegalPageKind;
  locale: SiteLocale;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  introduction: string;
  updatedLabel: string;
  contentsLabel: string;
  contactLabel: string;
  sections: LegalPageSection[];
};

const updatedEnglish = 'Last updated September 1, 2026';
const updatedSpanish = 'Última actualización: 1 de septiembre de 2026';

export const legalPages: Record<
  SiteLocale,
  Record<LegalPageKind, LegalPageContent>
> = {
  en: {
    privacy: {
      kind: 'privacy',
      locale: 'en',
      path: '/privacy',
      eyebrow: 'Website information',
      title: 'Privacy Policy',
      description:
        'How Kyle Scott Law collects, uses, safeguards, and handles personal information submitted through this website.',
      introduction:
        'This policy explains how Kyle Scott Law handles personal information when you visit this website, submit a consultation request, use the KJS case assistant, or otherwise contact the firm online. Information handled during an attorney-client relationship is also subject to the firm’s professional and legal obligations.',
      updatedLabel: updatedEnglish,
      contentsLabel: 'On this page',
      contactLabel: 'Privacy questions or requests',
      sections: [
        {
          id: 'information-you-provide',
          title: 'Information you provide',
          paragraphs: [
            'We collect the information you choose to provide through a consultation form, the KJS case assistant, an email, a telephone call, or another direct communication.',
          ],
          bullets: [
            'Your name, email address, telephone number, and preferred method of contact.',
            'The type of matter and the basic facts you provide for an initial case review.',
            'The page from which you submitted an inquiry and any campaign information included in the page address.',
            'Information contained in later communications with the firm.',
          ],
        },
        {
          id: 'sensitive-information',
          title: 'Do not send sensitive records through a public form',
          paragraphs: [
            'Please do not submit Social Security numbers, financial-account information, passwords, medical records, or other highly sensitive documents through the website’s public forms. Sending an inquiry does not create an attorney-client relationship and does not guarantee that the information will be privileged. If the firm needs records, it will provide an appropriate way to send them.',
          ],
        },
        {
          id: 'automatic-information',
          title: 'Information received automatically',
          paragraphs: [
            'The website’s hosting, security, and delivery systems may receive standard technical information when a page is requested. This can include an IP address, browser and device type, referring page, pages requested, timestamps, and error or security logs. The embedded Google Map on the contact page may also transmit technical information to Google when it loads, and Google Analytics receives the usage information described under “Sale, sharing, cookies, and advertising.”',
          ],
        },
        {
          id: 'how-we-use-information',
          title: 'How we use information',
          bullets: [
            'To review an inquiry, check for potential conflicts, respond, and communicate about possible representation.',
            'To operate, secure, troubleshoot, and improve the website and the firm’s intake process.',
            'To maintain appropriate business, legal, security, and professional records.',
            'To comply with law, court orders, professional duties, or valid government requests.',
          ],
        },
        {
          id: 'how-we-disclose-information',
          title: 'How information may be disclosed',
          paragraphs: [
            'Information may be available to firm personnel and to service providers that support website hosting, security, intake, communications, data storage, or other business operations. Those providers are expected to process information for the services they provide to the firm. Information may also be disclosed when reasonably necessary to comply with law, protect rights or safety, investigate misuse, or complete a business reorganization.',
          ],
        },
        {
          id: 'sale-and-advertising',
          title: 'Sale, sharing, cookies, and advertising',
          paragraphs: [
            'Kyle Scott Law does not sell personal information for money and does not use information submitted through its public intake forms for cross-context behavioral advertising. The site does not use advertising cookies.',
            'The site does use Google Analytics, a service of Google LLC, to understand how it is used: which pages are read, how visitors arrive, and whether a visit ends in a call or an inquiry. Google Analytics sets cookies in your browser and sends Google technical information such as the pages viewed, the type of device and browser, the referring page, and an approximate (city-level) location derived from your IP address, which Google does not store. The firm sends it no names, contact details, or anything you type into a form. Google handles this information under its own privacy policy. You can prevent it by blocking cookies in your browser or by installing Google’s Analytics opt-out browser add-on (tools.google.com/dlpage/gaoptout); the site works the same either way. Essential website, security, or hosting technologies may still use limited storage or technical identifiers.',
          ],
        },
        {
          id: 'security-and-retention',
          title: 'Security and retention',
          paragraphs: [
            'The firm uses reasonable administrative and technical measures intended to protect information. No internet transmission or storage system can be guaranteed completely secure. Information is retained only as long as reasonably necessary for intake review, communications, legal and professional obligations, recordkeeping, dispute prevention, and security, after which it may be deleted or de-identified.',
          ],
        },
        {
          id: 'california-rights',
          title: 'California privacy rights',
          paragraphs: [
            'Depending on the law that applies and subject to its exceptions, California residents may have rights to request access to or correction or deletion of personal information, to learn how it is collected and disclosed, to opt out of certain sales or sharing, to limit certain uses of sensitive personal information, and to receive equal service when exercising a privacy right. Kyle Scott Law does not discriminate against a person for making a valid privacy request.',
          ],
          bullets: [
            'Submit a request by email at Team@kjslaw.com or by telephone at 714-544-1460.',
            'Describe the right you wish to exercise and provide enough information for the firm to identify the relevant records.',
            'The firm may take reasonable steps to verify identity or an authorized agent before responding.',
            'A request may be denied or limited where an exception applies, including legal, professional, security, or record-retention obligations.',
          ],
        },
        {
          id: 'children-and-links',
          title: 'Children and third-party services',
          paragraphs: [
            'This website is not directed to children under 13, and the firm does not knowingly collect personal information from them through the site. The website may link to or embed third-party services, including maps and external legal sources. Their privacy practices are governed by their own policies.',
          ],
        },
        {
          id: 'policy-changes',
          title: 'Changes to this policy',
          paragraphs: [
            'The firm may update this policy as the website, intake systems, or legal requirements change. The date at the top of this page identifies the latest revision.',
          ],
        },
      ],
    },
    disclaimer: {
      kind: 'disclaimer',
      locale: 'en',
      path: '/disclaimer',
      eyebrow: 'Website information',
      title: 'Legal Disclaimer',
      description:
        'Important information about legal advice, attorney-client relationships, case results, deadlines, and use of the Kyle Scott Law website.',
      introduction:
        'This website provides general information about Kyle Scott Law and California legal matters. Please read these terms before relying on or sending information through the site.',
      updatedLabel: updatedEnglish,
      contentsLabel: 'On this page',
      contactLabel: 'Questions about this notice',
      sections: [
        {
          id: 'not-legal-advice',
          title: 'General information—not legal advice',
          paragraphs: [
            'Website content is provided for general informational and advertising purposes. It is not legal advice and should not be used as a substitute for advice from a qualified attorney who has reviewed the specific facts, documents, deadlines, parties, and law that apply to a matter. Laws and legal procedures can change, and information may not be complete or current for every situation.',
          ],
        },
        {
          id: 'no-attorney-client-relationship',
          title: 'No attorney-client relationship',
          paragraphs: [
            'Visiting this website, using the KJS case assistant, submitting a consultation form, calling, or emailing the firm does not create an attorney-client relationship. Kyle Scott Law becomes your attorney only after the firm has agreed to accept the matter and both sides have completed a written engagement agreement. The firm may decline an inquiry for any lawful reason.',
          ],
        },
        {
          id: 'confidential-information',
          title: 'Do not send confidential or sensitive information',
          paragraphs: [
            'Until an attorney-client relationship is confirmed in writing, do not send confidential information, original documents, Social Security numbers, financial information, passwords, medical records, or other sensitive material through a public form or unsolicited email. Information sent before engagement may not be protected by the attorney-client privilege.',
          ],
        },
        {
          id: 'deadlines-and-emergencies',
          title: 'Deadlines and emergencies',
          paragraphs: [
            'Legal claims are subject to deadlines that vary by claim, defendant, jurisdiction, and circumstances. Do not delay seeking legal advice because of information on this site or because you submitted a form. The website is not monitored as an emergency service. Call 911 when immediate assistance is needed.',
          ],
        },
        {
          id: 'results-and-testimonials',
          title: 'Results and testimonials',
          paragraphs: [
            'Prior verdicts, settlements, case descriptions, and client testimonials do not guarantee or predict a similar result. Every matter depends on its own facts, evidence, damages, parties, insurance, law, venue, and other circumstances. Amounts described as confidential may omit identifying details or other information.',
          ],
        },
        {
          id: 'attorney-advertising',
          title: 'Attorney advertising and jurisdictions',
          paragraphs: [
            'This website may constitute attorney advertising. Kyle J. Scott is admitted to practice in California and in the federal courts identified on his professional profile. Website access from another jurisdiction does not mean the firm seeks or is authorized to provide legal services there. No statement on this site should be understood as a claim of specialization or certification unless expressly identified and permitted by the applicable authority.',
          ],
        },
        {
          id: 'accuracy-and-availability',
          title: 'Accuracy and availability',
          paragraphs: [
            'Kyle Scott Law works to keep this website useful and accurate but makes no promise that every page will be uninterrupted, error-free, complete, or current. Site content is provided as available, subject to applicable law. The firm may revise or remove content without notice.',
          ],
        },
        {
          id: 'external-links',
          title: 'External links and third-party services',
          paragraphs: [
            'Links and embedded services are provided for convenience. Kyle Scott Law does not control and does not endorse every statement, product, security practice, or privacy practice on an external site. Use of a third-party service is governed by that provider’s terms.',
          ],
        },
        {
          id: 'site-content',
          title: 'Use of site content',
          paragraphs: [
            'Unless otherwise indicated, the text, design, graphics, and original materials on this website belong to Kyle Scott Law or are used with permission. You may view and print reasonable portions for personal, noncommercial use. Republishing, scraping, modifying, selling, or using site content to misrepresent an affiliation with the firm is prohibited without written permission.',
          ],
        },
      ],
    },
    accessibility: {
      kind: 'accessibility',
      locale: 'en',
      path: '/accessibility',
      eyebrow: 'Website information',
      title: 'Accessibility Statement',
      description:
        'Kyle Scott Law’s commitment to an accessible website, ongoing accessibility work, feedback process, and alternative ways to obtain information.',
      introduction:
        'Kyle Scott Law is committed to making its website and legal information usable by people with disabilities. Accessibility is an ongoing part of the site’s design, testing, and maintenance.',
      updatedLabel: updatedEnglish,
      contentsLabel: 'On this page',
      contactLabel: 'Accessibility help and feedback',
      sections: [
        {
          id: 'accessibility-goal',
          title: 'Our accessibility goal',
          paragraphs: [
            'The firm works toward conformance with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA, which provide widely used recommendations for making web content more perceivable, operable, understandable, and robust. Because technology, content, and assistive tools change, accessibility is reviewed as an ongoing process rather than a one-time claim.',
          ],
        },
        {
          id: 'measures',
          title: 'Measures used on this website',
          bullets: [
            'Semantic headings, landmarks, labels, and link text intended to support screen readers.',
            'Keyboard-accessible navigation, forms, dialogs, and visible focus indicators.',
            'Responsive layouts, readable type, and color contrast designed for common screen sizes and zoom levels.',
            'Alternative text for meaningful images and labels for interactive controls.',
            'Reduced-motion behavior when a visitor has enabled that preference.',
            'Form instructions, validation messages, and tap-to-call contact options.',
          ],
        },
        {
          id: 'compatibility',
          title: 'Browsers and assistive technology',
          paragraphs: [
            'The site is designed for current versions of major browsers and common assistive technologies. Results may vary with older browsers, unusual device settings, browser extensions, or combinations of technology that the firm cannot test directly. Updating a browser or assistive technology may improve compatibility.',
          ],
        },
        {
          id: 'third-party-content',
          title: 'Third-party content and known limits',
          paragraphs: [
            'Some content, such as the embedded map on the contact page or a linked external document, is provided by a third party and may not be fully controlled by Kyle Scott Law. If any content is difficult to use, the firm will make a reasonable effort to provide the information another way.',
          ],
        },
        {
          id: 'feedback',
          title: 'Request assistance or report a barrier',
          paragraphs: [
            'If you have difficulty using the site, need information in an alternative format, or encounter an accessibility barrier, call 714-544-1460 or email Team@kjslaw.com. Please identify the page or feature, describe the issue, and tell us the best way to respond. Information about the device, browser, or assistive technology you used is helpful but not required.',
          ],
        },
        {
          id: 'office-accommodations',
          title: 'Office accommodations',
          paragraphs: [
            'To request a reasonable accommodation for a visit or communication with the Tustin office, call in advance when possible. The firm will work with you to identify an effective way to communicate or provide requested information.',
          ],
        },
        {
          id: 'ongoing-work',
          title: 'Ongoing review',
          paragraphs: [
            'The firm periodically reviews content, navigation, forms, and new features and addresses accessibility issues as they are identified. This statement will be updated when material practices change.',
          ],
        },
      ],
    },
  },
  es: {
    privacy: {
      kind: 'privacy',
      locale: 'es',
      path: '/es/privacidad',
      eyebrow: 'Información del sitio web',
      title: 'Política de privacidad',
      description:
        'Cómo Kyle Scott Law recopila, usa, protege y administra la información personal enviada a través de este sitio web.',
      introduction:
        'Esta política explica cómo Kyle Scott Law maneja la información personal cuando usted visita este sitio, envía una solicitud de consulta, usa el asistente de casos KJS o se comunica con el bufete en línea. La información administrada durante una relación abogado-cliente también está sujeta a las obligaciones profesionales y legales del bufete.',
      updatedLabel: updatedSpanish,
      contentsLabel: 'En esta página',
      contactLabel: 'Preguntas o solicitudes de privacidad',
      sections: [
        {
          id: 'informacion-que-proporciona',
          title: 'Información que usted proporciona',
          paragraphs: [
            'Recopilamos la información que usted decide proporcionar mediante un formulario de consulta, el asistente de casos KJS, un correo electrónico, una llamada telefónica u otra comunicación directa.',
          ],
          bullets: [
            'Su nombre, correo electrónico, número de teléfono y método de contacto preferido.',
            'El tipo de asunto y los hechos básicos que proporciona para una revisión inicial.',
            'La página desde la cual envió una solicitud y cualquier información de campaña incluida en la dirección de la página.',
            'Información contenida en comunicaciones posteriores con el bufete.',
          ],
        },
        {
          id: 'informacion-sensible',
          title: 'No envíe documentos sensibles mediante un formulario público',
          paragraphs: [
            'No envíe números de Seguro Social, información de cuentas financieras, contraseñas, expedientes médicos ni otros documentos altamente sensibles mediante los formularios públicos del sitio. Enviar una solicitud no crea una relación abogado-cliente ni garantiza que la información esté protegida por el privilegio abogado-cliente. Si el bufete necesita documentos, le indicará una forma adecuada de enviarlos.',
          ],
        },
        {
          id: 'informacion-automatica',
          title: 'Información recibida automáticamente',
          paragraphs: [
            'Los sistemas de alojamiento, seguridad y entrega del sitio pueden recibir información técnica estándar cuando se solicita una página. Esto puede incluir una dirección IP, tipo de navegador y dispositivo, página de referencia, páginas solicitadas, marcas de tiempo y registros de errores o seguridad. El mapa de Google incorporado en la página de contacto también puede transmitir información técnica a Google cuando se carga, y Google Analytics recibe la información de uso descrita en “Venta, divulgación, cookies y publicidad”.',
          ],
        },
        {
          id: 'uso-de-la-informacion',
          title: 'Cómo usamos la información',
          bullets: [
            'Para revisar una solicitud, detectar posibles conflictos, responder y comunicarnos sobre una posible representación.',
            'Para operar, proteger, solucionar problemas y mejorar el sitio y el proceso de admisión del bufete.',
            'Para conservar registros empresariales, legales, de seguridad y profesionales apropiados.',
            'Para cumplir con la ley, órdenes judiciales, deberes profesionales o solicitudes gubernamentales válidas.',
          ],
        },
        {
          id: 'divulgacion-de-informacion',
          title: 'Cómo puede divulgarse la información',
          paragraphs: [
            'La información puede estar disponible para el personal del bufete y para proveedores que respaldan el alojamiento, la seguridad, la admisión, las comunicaciones, el almacenamiento de datos u otras operaciones. Se espera que dichos proveedores procesen la información para prestar servicios al bufete. También puede divulgarse información cuando sea razonablemente necesario para cumplir con la ley, proteger derechos o seguridad, investigar un uso indebido o completar una reorganización empresarial.',
          ],
        },
        {
          id: 'venta-y-publicidad',
          title: 'Venta, divulgación, cookies y publicidad',
          paragraphs: [
            'Kyle Scott Law no vende información personal por dinero ni usa la información enviada mediante sus formularios públicos de admisión para publicidad conductual entre distintos contextos. El sitio no usa cookies publicitarias.',
            'El sitio sí usa Google Analytics, un servicio de Google LLC, para entender cómo se usa: qué páginas se leen, cómo llegan los visitantes y si una visita termina en una llamada o en una consulta. Google Analytics instala cookies en su navegador y envía a Google información técnica, como las páginas vistas, el tipo de dispositivo y de navegador, la página de referencia y una ubicación aproximada (a nivel de ciudad) derivada de su dirección IP, que Google no almacena. El bufete no le envía nombres, datos de contacto ni nada de lo que usted escribe en un formulario. Google trata esta información conforme a su propia política de privacidad. Puede impedirlo bloqueando las cookies en su navegador o instalando el complemento de Google para desactivar Analytics (tools.google.com/dlpage/gaoptout); el sitio funciona igual en ambos casos. Las tecnologías esenciales del sitio, de seguridad o de alojamiento pueden seguir usando almacenamiento limitado o identificadores técnicos.',
          ],
        },
        {
          id: 'seguridad-y-retencion',
          title: 'Seguridad y conservación',
          paragraphs: [
            'El bufete utiliza medidas administrativas y técnicas razonables destinadas a proteger la información. Ningún sistema de transmisión o almacenamiento por internet puede garantizarse como completamente seguro. La información se conserva solo durante el tiempo razonablemente necesario para revisar solicitudes, comunicarse, cumplir obligaciones legales y profesionales, mantener registros, prevenir disputas y proteger la seguridad; después puede eliminarse o desidentificarse.',
          ],
        },
        {
          id: 'derechos-de-california',
          title: 'Derechos de privacidad en California',
          paragraphs: [
            'Según la ley aplicable y sus excepciones, los residentes de California pueden tener derecho a solicitar acceso, corrección o eliminación de información personal; conocer cómo se recopila y divulga; optar por no participar en determinadas ventas o divulgaciones; limitar ciertos usos de información personal sensible; y recibir el mismo servicio al ejercer un derecho de privacidad. Kyle Scott Law no discrimina a una persona por presentar una solicitud de privacidad válida.',
          ],
          bullets: [
            'Envíe una solicitud a Team@kjslaw.com o llame al 714-544-1460.',
            'Describa el derecho que desea ejercer y proporcione suficiente información para identificar los registros pertinentes.',
            'El bufete puede tomar medidas razonables para verificar la identidad o a un agente autorizado antes de responder.',
            'Una solicitud puede denegarse o limitarse cuando exista una excepción, incluidas obligaciones legales, profesionales, de seguridad o conservación de registros.',
          ],
        },
        {
          id: 'menores-y-enlaces',
          title: 'Menores y servicios de terceros',
          paragraphs: [
            'Este sitio no está dirigido a menores de 13 años y el bufete no recopila intencionalmente su información personal mediante el sitio. El sitio puede enlazar o incorporar servicios de terceros, incluidos mapas y fuentes jurídicas externas. Sus prácticas de privacidad se rigen por sus propias políticas.',
          ],
        },
        {
          id: 'cambios-a-la-politica',
          title: 'Cambios a esta política',
          paragraphs: [
            'El bufete puede actualizar esta política cuando cambien el sitio, los sistemas de admisión o los requisitos legales. La fecha al principio de esta página identifica la revisión más reciente.',
          ],
        },
      ],
    },
    disclaimer: {
      kind: 'disclaimer',
      locale: 'es',
      path: '/es/aviso-legal',
      eyebrow: 'Información del sitio web',
      title: 'Aviso legal',
      description:
        'Información importante sobre asesoría legal, relaciones abogado-cliente, resultados, plazos y uso del sitio de Kyle Scott Law.',
      introduction:
        'Este sitio ofrece información general sobre Kyle Scott Law y asuntos jurídicos de California. Lea este aviso antes de basarse en el contenido o enviar información mediante el sitio.',
      updatedLabel: updatedSpanish,
      contentsLabel: 'En esta página',
      contactLabel: 'Preguntas sobre este aviso',
      sections: [
        {
          id: 'no-es-asesoria-legal',
          title: 'Información general—no es asesoría legal',
          paragraphs: [
            'El contenido del sitio se ofrece con fines informativos y publicitarios generales. No es asesoría legal ni sustituye la orientación de un abogado calificado que haya revisado los hechos, documentos, plazos, partes y leyes aplicables. Las leyes y procedimientos pueden cambiar, y la información puede no estar completa o vigente para todas las situaciones.',
          ],
        },
        {
          id: 'sin-relacion-abogado-cliente',
          title: 'No se crea una relación abogado-cliente',
          paragraphs: [
            'Visitar este sitio, usar el asistente de casos KJS, enviar un formulario, llamar o escribir al bufete no crea una relación abogado-cliente. Kyle Scott Law se convierte en su abogado únicamente cuando el bufete acepta el asunto y ambas partes completan un contrato escrito de representación. El bufete puede rechazar una solicitud por cualquier motivo permitido por la ley.',
          ],
        },
        {
          id: 'informacion-confidencial',
          title: 'No envíe información confidencial o sensible',
          paragraphs: [
            'Hasta que se confirme por escrito una relación abogado-cliente, no envíe información confidencial, documentos originales, números de Seguro Social, datos financieros, contraseñas, expedientes médicos ni material sensible mediante un formulario público o correo no solicitado. La información enviada antes de la contratación puede no estar protegida por el privilegio abogado-cliente.',
          ],
        },
        {
          id: 'plazos-y-emergencias',
          title: 'Plazos y emergencias',
          paragraphs: [
            'Las reclamaciones legales están sujetas a plazos que varían según el reclamo, el demandado, la jurisdicción y las circunstancias. No demore en buscar asesoría por el contenido de este sitio ni porque haya enviado un formulario. El sitio no se supervisa como servicio de emergencia. Llame al 911 si necesita ayuda inmediata.',
          ],
        },
        {
          id: 'resultados-y-testimonios',
          title: 'Resultados y testimonios',
          paragraphs: [
            'Los veredictos, acuerdos, descripciones de casos y testimonios anteriores no garantizan ni predicen un resultado similar. Cada asunto depende de sus propios hechos, pruebas, daños, partes, seguros, leyes, foro y otras circunstancias. Los montos descritos como confidenciales pueden omitir datos identificativos u otra información.',
          ],
        },
        {
          id: 'publicidad-y-jurisdiccion',
          title: 'Publicidad de abogados y jurisdicciones',
          paragraphs: [
            'Este sitio puede constituir publicidad de abogados. Kyle J. Scott está autorizado para ejercer en California y en los tribunales federales indicados en su perfil profesional. Acceder al sitio desde otra jurisdicción no significa que el bufete procure o esté autorizado para prestar servicios allí. Ninguna declaración debe entenderse como una afirmación de especialización o certificación salvo que se identifique expresamente y esté permitida por la autoridad aplicable.',
          ],
        },
        {
          id: 'exactitud-y-disponibilidad',
          title: 'Exactitud y disponibilidad',
          paragraphs: [
            'Kyle Scott Law procura mantener este sitio útil y exacto, pero no promete que todas las páginas estén siempre disponibles, libres de errores, completas o actualizadas. El contenido se proporciona según disponibilidad y sujeto a la ley aplicable. El bufete puede revisar o retirar contenido sin previo aviso.',
          ],
        },
        {
          id: 'enlaces-externos',
          title: 'Enlaces externos y servicios de terceros',
          paragraphs: [
            'Los enlaces y servicios incorporados se ofrecen por conveniencia. Kyle Scott Law no controla ni avala todas las declaraciones, productos o prácticas de seguridad y privacidad de un sitio externo. El uso de un servicio de terceros se rige por los términos de ese proveedor.',
          ],
        },
        {
          id: 'contenido-del-sitio',
          title: 'Uso del contenido del sitio',
          paragraphs: [
            'Salvo indicación contraria, el texto, diseño, gráficos y materiales originales pertenecen a Kyle Scott Law o se usan con permiso. Puede ver e imprimir partes razonables para uso personal y no comercial. No se permite volver a publicar, extraer, modificar, vender ni usar el contenido para aparentar una afiliación con el bufete sin autorización escrita.',
          ],
        },
      ],
    },
    accessibility: {
      kind: 'accessibility',
      locale: 'es',
      path: '/es/accesibilidad',
      eyebrow: 'Información del sitio web',
      title: 'Declaración de accesibilidad',
      description:
        'El compromiso de Kyle Scott Law con un sitio accesible, el trabajo continuo, el proceso de comentarios y las formas alternativas de obtener información.',
      introduction:
        'Kyle Scott Law se compromete a que su sitio e información jurídica puedan ser utilizados por personas con discapacidades. La accesibilidad forma parte continua del diseño, las pruebas y el mantenimiento del sitio.',
      updatedLabel: updatedSpanish,
      contentsLabel: 'En esta página',
      contactLabel: 'Ayuda y comentarios sobre accesibilidad',
      sections: [
        {
          id: 'objetivo-de-accesibilidad',
          title: 'Nuestro objetivo de accesibilidad',
          paragraphs: [
            'El bufete trabaja hacia la conformidad con las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2, nivel AA, que ofrecen recomendaciones ampliamente utilizadas para que el contenido sea más perceptible, operable, comprensible y robusto. Como la tecnología, el contenido y las herramientas de asistencia cambian, la accesibilidad se revisa como un proceso continuo y no como una afirmación única.',
          ],
        },
        {
          id: 'medidas',
          title: 'Medidas utilizadas en este sitio',
          bullets: [
            'Encabezados, regiones, etiquetas y textos de enlaces semánticos para apoyar a los lectores de pantalla.',
            'Navegación, formularios y diálogos accesibles por teclado, con indicadores visibles de enfoque.',
            'Diseños adaptables, tipografía legible y contraste de color para tamaños de pantalla y niveles de zoom comunes.',
            'Texto alternativo para imágenes significativas y etiquetas para controles interactivos.',
            'Movimiento reducido cuando el visitante activa esa preferencia.',
            'Instrucciones de formularios, mensajes de validación y opciones de contacto mediante toque para llamar.',
          ],
        },
        {
          id: 'compatibilidad',
          title: 'Navegadores y tecnología de asistencia',
          paragraphs: [
            'El sitio está diseñado para versiones actuales de los principales navegadores y tecnologías de asistencia comunes. Los resultados pueden variar con navegadores antiguos, configuraciones inusuales, extensiones o combinaciones que el bufete no pueda probar directamente. Actualizar el navegador o la tecnología de asistencia puede mejorar la compatibilidad.',
          ],
        },
        {
          id: 'contenido-de-terceros',
          title: 'Contenido de terceros y limitaciones conocidas',
          paragraphs: [
            'Algunos contenidos, como el mapa incorporado en la página de contacto o un documento externo enlazado, son proporcionados por terceros y pueden no estar totalmente bajo el control de Kyle Scott Law. Si algún contenido presenta dificultades, el bufete hará un esfuerzo razonable para proporcionar la información de otra forma.',
          ],
        },
        {
          id: 'comentarios',
          title: 'Solicite ayuda o informe una barrera',
          paragraphs: [
            'Si tiene dificultad para usar el sitio, necesita información en otro formato o encuentra una barrera de accesibilidad, llame al 714-544-1460 o escriba a Team@kjslaw.com. Identifique la página o función, describa el problema y díganos la mejor forma de responder. La información sobre el dispositivo, navegador o tecnología de asistencia utilizada es útil, pero no obligatoria.',
          ],
        },
        {
          id: 'adaptaciones-en-la-oficina',
          title: 'Adaptaciones en la oficina',
          paragraphs: [
            'Para solicitar una adaptación razonable para una visita o comunicación con la oficina de Tustin, llame con anticipación cuando sea posible. El bufete colaborará con usted para identificar una forma eficaz de comunicarse o proporcionar la información solicitada.',
          ],
        },
        {
          id: 'revision-continua',
          title: 'Revisión continua',
          paragraphs: [
            'El bufete revisa periódicamente el contenido, la navegación, los formularios y las funciones nuevas, y atiende los problemas de accesibilidad a medida que se identifican. Esta declaración se actualizará cuando cambien de forma importante las prácticas.',
          ],
        },
      ],
    },
  },
};

export function legalPage(locale: SiteLocale, kind: LegalPageKind) {
  return legalPages[locale][kind];
}
