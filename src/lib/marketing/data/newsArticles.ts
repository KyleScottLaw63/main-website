import type { SiteLocale } from '@/lib/marketing/i18n';

export type NewsArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type LocalizedNewsArticle = {
  slug: string;
  path: string;
  label: string;
  date: string;
  result?: string;
  title: string;
  excerpt: string;
  lead: string;
  sections: NewsArticleSection[];
};

type NewsArticleRecord = {
  id: string;
  kind: 'case' | 'article';
  schemaType: 'NewsArticle' | 'Article';
  dateTime: string;
  sourceUrl: string;
  en: LocalizedNewsArticle;
  es: LocalizedNewsArticle;
};

export type SiteNewsArticle = LocalizedNewsArticle & Omit<NewsArticleRecord, 'en' | 'es'> & {
  locale: SiteLocale;
  alternatePath: string;
};

const newsArticleRecords: NewsArticleRecord[] = [
  {
    id: 'sexual-molestation-battery-settlement-2-2-million',
    kind: 'case',
    schemaType: 'NewsArticle',
    dateTime: '2024-12-26',
    sourceUrl: 'https://kjslaw.com/2024/12/26/kyle-scott-settles-a-sexual-molestation-sexual-battery-lawsuit-for-2-2-million-details-confidential/',
    en: {
      slug: 'sexual-molestation-battery-settlement-2-2-million',
      path: '/news/sexual-molestation-battery-settlement-2-2-million',
      label: 'Confidential settlement',
      date: 'December 26, 2024',
      result: '$2.2M',
      title: 'Sexual molestation and sexual battery lawsuit resolved for $2.2 million',
      excerpt: 'Kyle Scott Law reports a confidential resolution for a survivor of sexual molestation and sexual battery.',
      lead: 'Kyle Scott Law reported a $2.2 million confidential resolution in a sexual molestation and sexual battery matter. Because the matter is confidential, the firm does not publish facts that could identify the client or other protected details.',
      sections: [
        {
          heading: 'Representation for survivors',
          paragraphs: [
            'Kyle J. Scott has represented survivors in claims involving schools, churches, medical facilities, workplaces, institutions, and personal relationships. These matters often require a careful review of the people and organizations that may have failed to protect someone from harm.',
            'The firm approaches survivor matters with discretion and explains the legal process, confidentiality concerns, and available options before a client decides how to proceed.',
          ],
        },
        {
          heading: 'What this result means',
          paragraphs: [
            'A confidential settlement resolves the specific claim without publishing every term or factual detail. It does not predict the value or outcome of another matter. Every claim depends on its own evidence, parties, insurance, damages, and applicable law.',
          ],
        },
      ],
    },
    es: {
      slug: 'acuerdo-abuso-sexual-2-2-millones',
      path: '/es/noticias/acuerdo-abuso-sexual-2-2-millones',
      label: 'Acuerdo confidencial',
      date: '26 de diciembre de 2024',
      result: '$2.2M',
      title: 'Demanda por abuso sexual y agresión sexual resuelta por $2.2 millones',
      excerpt: 'Kyle Scott Law informa una resolución confidencial para una persona sobreviviente de abuso y agresión sexual.',
      lead: 'Kyle Scott Law informó una resolución confidencial de $2.2 millones en un asunto de abuso sexual y agresión sexual. Debido a la confidencialidad, el despacho no publica hechos que pudieran identificar al cliente ni otros detalles protegidos.',
      sections: [
        {
          heading: 'Representación para sobrevivientes',
          paragraphs: [
            'Kyle J. Scott ha representado a sobrevivientes en reclamos relacionados con escuelas, iglesias, centros médicos, lugares de trabajo, instituciones y relaciones personales. Estos asuntos suelen requerir una revisión cuidadosa de las personas y organizaciones que pudieron haber incumplido su deber de protección.',
            'El despacho maneja estos asuntos con discreción y explica el proceso legal, las cuestiones de confidencialidad y las opciones disponibles antes de que el cliente decida cómo proceder.',
          ],
        },
        {
          heading: 'Qué significa este resultado',
          paragraphs: [
            'Un acuerdo confidencial resuelve el reclamo específico sin publicar todos sus términos ni detalles. No predice el valor ni el resultado de otro asunto. Cada reclamo depende de sus propias pruebas, partes, seguros, daños y leyes aplicables.',
          ],
        },
      ],
    },
  },
  {
    id: 'court-of-appeal-new-trial',
    kind: 'case',
    schemaType: 'NewsArticle',
    dateTime: '2019-06-09',
    sourceUrl: 'https://kjslaw.com/2019/06/09/kyle-scott-law-jeffrey-ehrlich-win-court-of-appeal-victory-for-our-client-and-a-new-trial/',
    en: {
      slug: 'court-of-appeal-new-trial',
      path: '/news/court-of-appeal-new-trial',
      label: 'Appellate decision',
      date: 'June 9, 2019',
      result: 'New trial',
      title: 'Court of Appeal victory protects a client’s right to present damages evidence',
      excerpt: 'Kyle Scott Law and appellate counsel secured a reversal after important medical-damages evidence was excluded at trial.',
      lead: 'The California Court of Appeal reversed the judgment and a related postjudgment order in a matter handled by Kyle Scott Law and appellate counsel Jeffrey I. Ehrlich, then sent the case back for a new trial.',
      sections: [
        {
          heading: 'Why the appeal mattered',
          paragraphs: [
            'The appeal concerned the exclusion of evidence offered to prove medical damages. The appellate court concluded that the exclusion was prejudicial and that the client was entitled to present the claim again in a new trial.',
            'Appellate decisions turn on the record, procedural history, and legal issues presented in that case.',
          ],
        },
        {
          heading: 'Protecting the evidentiary record',
          paragraphs: [
            'Personal injury cases can depend on whether the jury is allowed to consider evidence concerning treatment, medical expenses, future needs, and other claimed losses. Preserving and presenting that evidence can be as important as proving how the incident happened.',
          ],
        },
      ],
    },
    es: {
      slug: 'victoria-apelacion-nuevo-juicio',
      path: '/es/noticias/victoria-apelacion-nuevo-juicio',
      label: 'Decisión de apelación',
      date: '9 de junio de 2019',
      result: 'Nuevo juicio',
      title: 'Una victoria en apelación protege el derecho del cliente a presentar pruebas de daños',
      excerpt: 'Kyle Scott Law y el abogado de apelaciones obtuvieron una revocación después de que se excluyeran pruebas médicas importantes.',
      lead: 'El Tribunal de Apelaciones de California revocó la sentencia y una orden posterior en un asunto manejado por Kyle Scott Law y el abogado de apelaciones Jeffrey I. Ehrlich, y devolvió el caso para un nuevo juicio.',
      sections: [
        {
          heading: 'Por qué importó la apelación',
          paragraphs: [
            'La apelación se relacionó con la exclusión de pruebas ofrecidas para demostrar daños médicos. El tribunal concluyó que la exclusión fue perjudicial y que el cliente tenía derecho a presentar nuevamente el reclamo en un nuevo juicio.',
            'Las decisiones de apelación dependen del expediente, el historial procesal y los asuntos legales de cada caso.',
          ],
        },
        {
          heading: 'Protección del expediente probatorio',
          paragraphs: [
            'Los casos de lesiones personales pueden depender de si el jurado puede considerar pruebas sobre el tratamiento, los gastos médicos, las necesidades futuras y otras pérdidas reclamadas. Preservar y presentar esas pruebas puede ser tan importante como demostrar cómo ocurrió el incidente.',
          ],
        },
      ],
    },
  },
  {
    id: 'personal-injury-attorney-tv-vs-reality',
    kind: 'article',
    schemaType: 'Article',
    dateTime: '2021-02-02',
    sourceUrl: 'https://kjslaw.com/2021/02/02/the-personal-injury-attorney-tv-vs-reality/',
    en: {
      slug: 'personal-injury-attorney-tv-vs-reality',
      path: '/news/personal-injury-attorney-tv-vs-reality',
      label: 'Personal injury',
      date: 'February 2, 2021',
      title: 'The Personal Injury Attorney: TV vs. Reality',
      excerpt: 'Why trust, direct communication, and the attorney-client relationship matter more than television stereotypes.',
      lead: 'Television advertising often reduces personal injury representation to slogans and dramatic promises. In practice, the relationship is built on trust, communication, preparation, and a lawyer’s ability to explain difficult choices clearly.',
      sections: [
        {
          heading: 'Clients should know who represents them',
          paragraphs: [
            'An injured person should understand who will handle the matter, how questions will be answered, and what information the lawyer needs. Direct communication helps the client make informed decisions instead of feeling like a file number.',
          ],
        },
        {
          heading: 'What to look for',
          paragraphs: ['Before retaining a personal injury lawyer, consider the working relationship as well as the résumé. Useful questions include:'],
          bullets: [
            'Who will be responsible for the case and communicate with you?',
            'How does the firm evaluate evidence, damages, insurance, and litigation risk?',
            'Will the lawyer explain both the strengths and limitations of the claim?',
            'Does the firm have relevant trial and settlement experience?',
          ],
        },
      ],
    },
    es: {
      slug: 'abogado-lesiones-personales-television-realidad',
      path: '/es/noticias/abogado-lesiones-personales-television-realidad',
      label: 'Lesiones personales',
      date: '2 de febrero de 2021',
      title: 'El abogado de lesiones personales: televisión frente a realidad',
      excerpt: 'Por qué la confianza, la comunicación directa y la relación abogado-cliente importan más que los estereotipos de la televisión.',
      lead: 'La publicidad televisiva suele reducir la representación por lesiones personales a eslóganes y promesas dramáticas. En la práctica, la relación se basa en la confianza, la comunicación, la preparación y la capacidad del abogado para explicar decisiones difíciles con claridad.',
      sections: [
        {
          heading: 'Los clientes deben saber quién los representa',
          paragraphs: [
            'Una persona lesionada debe saber quién manejará el asunto, cómo se responderán sus preguntas y qué información necesita el abogado. La comunicación directa ayuda al cliente a tomar decisiones informadas en lugar de sentirse como un número de expediente.',
          ],
        },
        {
          heading: 'Qué debe buscar',
          paragraphs: ['Antes de contratar a un abogado de lesiones personales, considere la relación de trabajo además de su experiencia. Algunas preguntas útiles son:'],
          bullets: [
            '¿Quién será responsable del caso y se comunicará con usted?',
            '¿Cómo evalúa el despacho las pruebas, los daños, el seguro y el riesgo de litigio?',
            '¿Explicará el abogado tanto las fortalezas como las limitaciones del reclamo?',
            '¿Tiene el despacho experiencia pertinente en juicios y acuerdos?',
          ],
        },
      ],
    },
  },
  {
    id: 'injury-great-wolf-lodge-disneyland',
    kind: 'article',
    schemaType: 'Article',
    dateTime: '2018-01-09',
    sourceUrl: 'https://kjslaw.com/2018/01/09/injured-great-wolf-lodge-disneyland-can-help/',
    en: {
      slug: 'injury-great-wolf-lodge-disneyland',
      path: '/news/injury-great-wolf-lodge-disneyland',
      label: 'Premises liability',
      date: 'January 9, 2018',
      title: 'Injured at Great Wolf Lodge or Disneyland?',
      excerpt: 'Evidence and potential legal issues after an injury at a water park or amusement park in California.',
      lead: 'An injury at a water park, amusement park, hotel, or resort may raise premises-liability and negligence questions. Whether a claim exists depends on what happened, what the property owner or operator knew, and whether reasonable safety measures were used.',
      sections: [
        {
          heading: 'Preserve information early',
          paragraphs: ['Evidence at a busy attraction can change quickly. If it is safe and possible, useful steps may include:'],
          bullets: [
            'Report the incident and request a copy of the incident report.',
            'Photograph the area, condition, warning signs, and visible injuries.',
            'Identify witnesses and preserve tickets, receipts, and communications.',
            'Obtain appropriate medical care and keep related records.',
          ],
        },
        {
          heading: 'Potential compensation',
          paragraphs: [
            'Depending on the facts and California law, recoverable damages may include medical expenses, lost income, pain, disability, and other documented losses. Comparative fault, waivers, notice, and the identity of the responsible parties can affect the analysis.',
          ],
        },
      ],
    },
    es: {
      slug: 'lesion-great-wolf-lodge-disneyland',
      path: '/es/noticias/lesion-great-wolf-lodge-disneyland',
      label: 'Responsabilidad de propiedad',
      date: '9 de enero de 2018',
      title: '¿Sufrió una lesión en Great Wolf Lodge o Disneyland?',
      excerpt: 'Pruebas y posibles asuntos legales después de una lesión en un parque acuático o de diversiones en California.',
      lead: 'Una lesión en un parque acuático, parque de diversiones, hotel o complejo turístico puede plantear cuestiones de responsabilidad de propiedad y negligencia. La existencia de un reclamo depende de lo ocurrido, de lo que sabía el propietario u operador y de si se utilizaron medidas de seguridad razonables.',
      sections: [
        {
          heading: 'Conserve la información desde el principio',
          paragraphs: ['Las pruebas en una atracción concurrida pueden cambiar rápidamente. Si es seguro y posible, algunas medidas útiles pueden incluir:'],
          bullets: [
            'Informe el incidente y solicite una copia del reporte.',
            'Fotografíe el área, la condición, las advertencias y las lesiones visibles.',
            'Identifique testigos y conserve boletos, recibos y comunicaciones.',
            'Obtenga atención médica adecuada y conserve los registros relacionados.',
          ],
        },
        {
          heading: 'Posible compensación',
          paragraphs: [
            'Según los hechos y la ley de California, los daños recuperables pueden incluir gastos médicos, pérdida de ingresos, dolor, discapacidad y otras pérdidas documentadas. La culpa comparativa, las renuncias, los avisos y la identidad de las partes responsables pueden afectar el análisis.',
          ],
        },
      ],
    },
  },
  {
    id: 'punitive-damages-drunk-driver',
    kind: 'article',
    schemaType: 'Article',
    dateTime: '2018-01-09',
    sourceUrl: 'https://kjslaw.com/2018/01/09/hit-drunk-driver-can-recover-punitive-damages-per-ca-law-caci-3945/',
    en: {
      slug: 'punitive-damages-drunk-driver',
      path: '/news/punitive-damages-drunk-driver',
      label: 'Auto accidents',
      date: 'January 9, 2018',
      title: 'Punitive damages after an injury caused by a drunk driver',
      excerpt: 'California punitive damages and the additional issues that may arise when an impaired driver causes an injury.',
      lead: 'A person injured by an impaired driver may pursue compensation for ordinary damages and, in some cases, may also allege punitive damages. Punitive damages are not automatic and require proof under California law beyond the showing needed for compensatory damages.',
      sections: [
        {
          heading: 'Compensatory and punitive damages serve different purposes',
          paragraphs: [
            'Compensatory damages address losses such as medical expenses, lost income, pain, and disability. Punitive damages are intended to punish and deter sufficiently wrongful conduct. California allows punitive damages against a driver whose drunk driving shows a conscious disregard for others’ safety (Civil Code section 3294; Taylor v. Superior Court (1979) 24 Cal.3d 890); the jury instruction for an individual defendant is CACI No. 3940.',
          ],
        },
        {
          heading: 'Evidence still controls the claim',
          paragraphs: [
            'Police reports, testing, witness accounts, criminal proceedings, driving history, insurance, and the circumstances of the collision may all affect the case. The availability and amount of any recovery depend on the specific evidence and applicable law.',
          ],
        },
      ],
    },
    es: {
      slug: 'danos-punitivos-conductor-ebrio',
      path: '/es/noticias/danos-punitivos-conductor-ebrio',
      label: 'Accidentes de auto',
      date: '9 de enero de 2018',
      title: 'Daños punitivos después de una lesión causada por un conductor ebrio',
      excerpt: 'Los daños punitivos en California y los asuntos adicionales que pueden surgir cuando un conductor intoxicado causa una lesión.',
      lead: 'Una persona lesionada por un conductor intoxicado puede solicitar compensación por daños ordinarios y, en algunos casos, también alegar daños punitivos. Los daños punitivos no son automáticos y requieren pruebas adicionales conforme a la ley de California.',
      sections: [
        {
          heading: 'Los daños compensatorios y punitivos tienen propósitos distintos',
          paragraphs: [
            'Los daños compensatorios se relacionan con pérdidas como gastos médicos, ingresos perdidos, dolor y discapacidad. Los daños punitivos buscan castigar y disuadir conductas suficientemente indebidas. California permite daños punitivos contra un conductor cuya manera de conducir en estado de ebriedad demuestra un desprecio consciente por la seguridad de los demás (Código Civil, sección 3294; Taylor v. Superior Court (1979) 24 Cal.3d 890); la instrucción al jurado para un demandado individual es la CACI No. 3940.',
          ],
        },
        {
          heading: 'Las pruebas siguen determinando el reclamo',
          paragraphs: [
            'Los informes policiales, las pruebas químicas, los testigos, los procesos penales, el historial de conducción, el seguro y las circunstancias del choque pueden afectar el caso. La disponibilidad y el monto de cualquier recuperación dependen de las pruebas específicas y la ley aplicable.',
          ],
        },
      ],
    },
  },
];

export function newsArticlesForLocale(locale: SiteLocale): SiteNewsArticle[] {
  const alternateLocale: SiteLocale = locale === 'en' ? 'es' : 'en';
  return newsArticleRecords.map((record) => ({
    id: record.id,
    kind: record.kind,
    schemaType: record.schemaType,
    dateTime: record.dateTime,
    sourceUrl: record.sourceUrl,
    locale,
    alternatePath: record[alternateLocale].path,
    ...record[locale],
  }));
}

export function newsArticleBySlug(locale: SiteLocale, slug: string) {
  return newsArticlesForLocale(locale).find((article) => article.slug === slug);
}

export const newsArticleLocalizedRoutes = newsArticleRecords.map((article) => ({
  en: article.en.path,
  es: article.es.path,
}));
