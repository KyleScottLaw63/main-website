import { caseStoryBySlug, caseStoryResult, type CaseStory, type CaseStoryHeadline, type CaseStoryLink } from '@/lib/marketing/data/caseStories';
import { newsArticleLocalizedRoutes, newsArticlesForLocale } from '@/lib/marketing/data/newsArticles';
import { caseStoryPath, resultOutcomeLabel } from '@/lib/marketing/data/results';
import { spanishLegacyPostLocalizedRoutes } from '@/lib/marketing/data/spanishLegacyPosts';
import { spanishCaseStoryPath, translateResultToSpanish } from '@/lib/marketing/spanishResults';

/**
 * The Spanish version of a case story, at /es/resultados/<slug> (docs/case-stories.md). It translates
 * the attorney-approved English story (`englishSlug`, caseStories.ts) word for word: the same chapters,
 * paragraphs, figures, courts, and comparison, and nothing the English does not say. A story with a
 * published amount reads its amount, title, outcome, and year from the English story's result card,
 * translated by translateResultToSpanish; a confidential story carries its own Spanish title.
 */
export type SpanishCaseStory = Omit<CaseStory, 'announcement'> & {
  /** The English story this one translates. Its slug in spanishResults.ts's `spanishCaseStorySlugs` is this record's `slug`. */
  englishSlug: string;
  /** The firm's announcement. `inEnglish`: it has no Spanish version, so the page says "(en inglés)" beside the link. */
  announcement?: { label: string; href: string; inEnglish?: boolean };
};

/**
 * The firm's announcement of a result, in Spanish when the firm has a Spanish version of it
 * (newsArticles.ts, or an archived post's translation in spanishLegacyPosts.ts); otherwise the English post, marked as English.
 */
function announcement(label: string, englishHref: string): NonNullable<SpanishCaseStory['announcement']> {
  const spanish = [...newsArticleLocalizedRoutes, ...spanishLegacyPostLocalizedRoutes].find((route) => route.en === englishHref);
  return spanish ? { label, href: spanish.es } : { label, href: englishHref, inEnglish: true };
}

const approved = '2026-10-01';

/** One record per English story, in the same order. */
export const spanishCaseStories: SpanishCaseStory[] = [
  {
    slug: 'veredicto-fractura-craneo-estudiante',
    englishSlug: 'student-skull-fracture-verdict',
    summary:
      'Un niño de kínder se fracturó el cráneo en un ejercicio de velocidad de educación física. Tras un juicio de dos semanas en el Tribunal Superior de Los Ángeles, el jurado emitió un veredicto de $5.75 millones.',
    court: 'Tribunal Superior de Los Ángeles',
    practiceArea: { label: 'Responsabilidad escolar', href: '/es/abogado-de-responsabilidad-escolar-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Un estudiante de kínder hacía un ejercicio de velocidad cronometrado en la clase de educación física. El maestro enviaba a los niños en tandas por un campo de asfalto, y corrían a distintas velocidades.',
          'Otro niño se salió de su carril y volvió a entrar, y chocó con nuestro cliente, que cayó y se golpeó la cabeza contra el asfalto.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: [
          'Los estudios de imagen del hospital revelaron una fractura de cráneo, un hematoma subdural y una contusión cerebral. Una resonancia magnética posterior mostró rastros duraderos de sangrado en la superficie de su cerebro, y las pruebas neuropsicológicas encontraron una caída significativa en una parte de su coeficiente intelectual medido.',
        ],
      },
      {
        heading: 'El juicio',
        paragraphs: [
          'El distrito escolar negó su responsabilidad, y el caso llegó a un juicio con jurado de dos semanas en el Tribunal Superior de Los Ángeles. El jurado emitió un veredicto de $5.75 millones a favor del niño contra el Long Beach Unified School District.',
        ],
      },
    ],
    announcement: announcement(
      'El anuncio del despacho, noviembre de 2019',
      '/news/kyle-scott-keith-bruno-obtain-5-75-m-verdict-against-long-beach-unified-school-district',
    ),
    resolved: '2019-09',
    published: approved,
  },
  {
    slug: 'acuerdo-choque-interseccion-fontana',
    englishSlug: 'fontana-intersection-crash-settlement',
    summary:
      'Un choque en una intersección de Fontana lesionó a nuestra clienta y a sus dos hijos. Una demanda de acuerdo conjunta resolvió los reclamos de las cinco personas lesionadas por un total combinado de $2.7 millones.',
    court: 'Tribunal Superior de San Bernardino',
    practiceArea: { label: 'Accidentes de auto', href: '/es/abogado-de-accidentes-de-auto-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'En 2024, un conductor causó una colisión en una intersección de Fontana que lesionó a nuestra clienta, una madre, y a sus dos hijos, además de a miembros de otra familia.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: [
          'Nuestra clienta sufrió lesiones en ambas manos que requirieron tres cirugías para repararlas, y también necesitó tratamiento para la columna. Los niños también recibieron tratamiento por sus lesiones.',
        ],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'El despacho asumió el caso de manos del abogado anterior y presentó la demanda en el Tribunal Superior de San Bernardino. Junto con el abogado de la otra familia, el despacho presentó luego una demanda de acuerdo conjunta con plazo limitado. La aseguradora la aceptó, lo que resolvió los reclamos de las cinco personas lesionadas por un total combinado de $2.7 millones.',
        ],
      },
    ],
    resolved: '2026-09',
    published: approved,
  },
  {
    slug: 'acuerdo-abuso-consejero-escolar',
    englishSlug: 'school-counselor-abuse-settlement',
    summary:
      'Una sobreviviente adulta de abuso por parte de su consejero de preparatoria demandó al distrito después de que California revivió reclamos más antiguos. El distrito llegó a un acuerdo poco antes del juicio.',
    court: 'Tribunal Superior del Condado de Riverside',
    practiceArea: { label: 'Responsabilidad escolar', href: '/es/abogado-de-responsabilidad-escolar-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestra clienta, hoy adulta, alegó que su consejero escolar abusó sexualmente de ella cuando era estudiante de preparatoria. Durante décadas, un reclamo como el suyo habría llegado demasiado tarde.',
        ],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'Después de que California revivió reclamos más antiguos de abuso sexual infantil, el despacho presentó una demanda en el Tribunal Superior del Condado de Riverside contra el distrito escolar que empleaba al consejero, alegando que el distrito no la protegió. El tribunal le permitió continuar con un seudónimo para que su identidad quedara fuera de los documentos públicos del expediente.',
        ],
      },
      {
        heading: 'El resultado',
        paragraphs: [
          'El despacho litigó el caso durante aproximadamente un año y medio, y el distrito llegó a un acuerdo poco antes del juicio.',
        ],
      },
    ],
    resolved: '2024-02',
    published: approved,
  },
  {
    slug: 'acuerdo-atropello-cruce-peatonal',
    englishSlug: 'crosswalk-pedestrian-settlement',
    summary:
      'Un conductor no cedió el paso y atropelló a nuestra clienta en un cruce peatonal marcado de Hemet. Después de más de dos años de litigio, el caso se resolvió con un acuerdo en 2024.',
    court: 'Tribunal Superior del Condado de Riverside',
    practiceArea: { label: 'Accidentes de auto', href: '/es/abogado-de-accidentes-de-auto-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestra clienta cruzaba a pie una calle de Hemet por un cruce peatonal marcado cuando un conductor no le cedió el paso y la atropelló, y ella sufrió fracturas.',
        ],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'La demanda alegó que el conductor violó la norma del Código de Vehículos que exige a los conductores ceder el paso a los peatones en un cruce peatonal marcado. También alegó que el vehículo pertenecía a una compañía de alquiler de autos que se lo había confiado.',
          'El despacho presentó la demanda en el Tribunal Superior del Condado de Riverside contra el conductor y el propietario del vehículo, y más tarde incorporó al caso a la entidad que operaba la compañía de alquiler. Después de más de dos años de litigio, el caso se resolvió con un acuerdo en 2024.',
        ],
      },
    ],
    resolved: '2024-09',
    published: approved,
  },
  {
    slug: 'acuerdo-lanzamiento-calentamiento-estadio',
    englishSlug: 'ballpark-warm-up-throw-settlement',
    summary:
      'Un tiro de calentamiento de un lanzador golpeó en la cabeza a un niño de seis años cerca del dugout y le fracturó el cráneo. El caso se resolvió mediante un acuerdo que el tribunal aprobó.',
    court: 'Tribunal Superior del Condado de Orange',
    practiceArea: { label: 'Lesión cerebral traumática', href: '/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Un niño de seis años estaba con su padre en un estadio de béisbol profesional mucho antes de un partido. Caminaba por la primera fila de asientos a nivel del campo hacia el dugout del equipo local, donde los jugadores firmaban autógrafos; la demanda alegó que el equipo animaba a los niños a bajar antes de los partidos para conocer a los jugadores.',
          'Un lanzador que calentaba cerca lanzó una pelota hacia un compañero de equipo, que no la atrapó.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: ['La pelota golpeó al niño en el lado izquierdo de la cabeza, le fracturó el cráneo y le causó un sangrado en el cerebro.'],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'La demanda alegó que esa sección de asientos no tenía red de protección y que los aficionados no recibían ninguna advertencia de que los jugadores lanzaban allí. El despacho demandó en el Tribunal Superior del Condado de Orange por negligencia y responsabilidad de propiedades, y el caso se resolvió mediante un acuerdo que el tribunal aprobó para el niño.',
        ],
      },
    ],
    resolved: '2023-04',
    published: approved,
  },
  {
    slug: 'veredicto-choque-autobus-transporte-publico',
    englishSlug: 'octa-bus-crash-verdict',
    summary:
      'Un autobús de transporte público chocó por detrás contra la minivan detenida de nuestro cliente. La defensa sostuvo que el caso valía $157,000; un jurado del Condado de Orange emitió un veredicto de $928,493.12.',
    court: 'Tribunal Superior del Condado de Orange',
    practiceArea: { label: 'Accidentes de auto', href: '/es/abogado-de-accidentes-de-auto-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestro cliente, un conductor de setenta y tantos años, estaba detenido en el tráfico en la autopista 22 cuando un autobús de la Autoridad de Transporte del Condado de Orange (Orange County Transportation Authority) chocó contra la parte trasera de su minivan. El video del autobús mostró que este pudo haber circulado hasta a 35.7 mph justo antes del impacto.',
          'El choque hizo añicos el vidrio trasero de la minivan y la empujó contra una SUV grande. Quedó alterado, pero rechazó la atención de emergencia en el lugar.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: [
          'En los meses siguientes presentó pérdida de memoria, dificultad para encontrar las palabras y dificultad para resolver problemas. Los peritos no coincidieron sobre si tenía una lesión cerebral traumática leve, pero los psicólogos y el psiquiatra coincidieron en que un trastorno de adaptación con ansiedad y depresión, causado por el choque, estaba detrás de sus problemas cognitivos.',
        ],
      },
      {
        heading: 'El veredicto',
        paragraphs: [
          'El abogado de OCTA sostuvo que el caso valía $157,000. El jurado del Condado de Orange lo rechazó y emitió un veredicto de $928,493.12.',
        ],
      },
    ],
    comparison: {
      caption: 'Lo que sostuvo el abogado de OCTA y lo que decidió el jurado',
      figures: [
        { label: 'El abogado de OCTA sostuvo que el caso valía', amount: '$157,000', value: 157_000 },
        { label: 'El veredicto del jurado', amount: '$928,493.12', value: 928_493.12 },
      ],
    },
    announcement: announcement(
      'El anuncio del despacho, abril de 2017',
      '/news/oc-jury-provides-justice-man-suffering-cognitive-problems-928493-12-verdict',
    ),
    resolved: '2017-04',
    published: approved,
  },
  {
    slug: 'acuerdo-golpe-cabeza-practica-bateo',
    englishSlug: 'batting-practice-head-injury-settlement',
    summary:
      'Un joven de 14 años de una academia de béisbol juvenil recibió un lanzamiento en la cabeza sin casco. El despacho logró que se denegara el juicio sumario, y todos los demandados llegaron a un acuerdo.',
    court: 'Tribunal Superior del Condado de Orange',
    practiceArea: { label: 'Lesiones personales', href: '/es/abogado-de-lesiones-personales-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestro cliente, que entonces tenía 14 años, estaba inscrito en una academia de entrenamiento de béisbol juvenil que realizaba sus sesiones en unas instalaciones de entrenamiento bajo techo en el Condado de Orange. Durante una práctica de bateo, otro jugador joven le lanzó la pelota.',
          'Según la demanda, no le habían dado un casco de bateo ni le habían indicado que usara uno. El lanzamiento lo golpeó en el lado izquierdo de la cabeza, cerca del oído.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: ['La demanda alegó la rotura del tímpano izquierdo, pérdida auditiva y daño emocional, incluidos ansiedad, pesadillas y dificultad para dormir.'],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'El despacho demandó al operador de la academia y a los propietarios de las instalaciones en el Tribunal Superior del Condado de Orange por negligencia y responsabilidad de propiedades. Logró que se denegara una moción de juicio sumario de la defensa y llevó adelante el caso durante más de tres años, hasta que todos los demandados llegaron a un acuerdo.',
        ],
      },
    ],
    resolved: '2026-01',
    published: approved,
  },
  {
    slug: 'acuerdo-ulcera-presion-centro-enfermeria',
    englishSlug: 'nursing-facility-pressure-wound-settlement',
    summary:
      'La herida por presión de una adulta dependiente empeoró hasta volverse una úlcera infectada en un centro de enfermería. El despacho demandó según la Ley de Abuso de Personas Mayores de California, y el centro llegó a un acuerdo.',
    court: 'Tribunal Superior de Riverside',
    practiceArea: { label: 'Abuso y negligencia de personas mayores', href: '/es/abogado-de-abuso-de-personas-mayores-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestra clienta dependía por completo del personal para su cuidado: respiraba a través de una traqueostomía y no podía cambiar de posición por sí misma. En 2023 ingresó en un centro de enfermería de cuidados posagudos con una herida por presión en la parte baja de la espalda. Su plan de cuidados exigía que el personal la cambiara de posición al menos cada dos horas para aliviar la presión sobre la herida.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: [
          'La demanda alega que, en cambio, la herida empeoró hasta convertirse en una úlcera grande e infectada, y más tarde ella necesitó atención hospitalaria por una infección ósea y sepsis.',
        ],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'El despacho demandó en el Tribunal Superior de Riverside conforme a la Ley de Protección Civil de Personas Mayores y Adultos Dependientes de California (Elder Abuse and Dependent Adult Civil Protection Act) y por negligencia. El centro de enfermería llegó a un acuerdo; los términos son confidenciales.',
        ],
      },
    ],
    resolved: '2026-03',
    published: approved,
    confidential: { title: 'Adulta dependiente desarrolla una grave herida por presión bajo cuidados de enfermería' },
  },
  {
    slug: 'acuerdo-caida-piso-tienda',
    englishSlug: 'store-floor-fall-settlement',
    summary:
      'Una clienta pisó un objeto que había quedado en el piso de una tienda y se torció el tobillo. El despacho demandó a los operadores de la tienda, y el caso se resolvió con un acuerdo poco antes del juicio.',
    court: 'Tribunal Superior del Condado de Orange',
    practiceArea: { label: 'Resbalones y caídas', href: '/es/abogado-de-resbalones-y-caidas-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestra clienta estaba de compras en una tienda minorista del Condado de Orange. Mientras empujaba un carrito de la tienda hacia los probadores, pisó un objeto que estaba en el piso; su pierna izquierda se deslizó hacia afuera y se le torció el tobillo.',
          'Según la demanda, un empleado de la tienda que surtía los estantes cerca vio la caída y recogió el objeto, que parecía una tapa de botella de plástico negro, y la tienda preparó un informe del incidente.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: [
          'La demanda alegó lesiones en las piernas, incluido un desarreglo interno de las rodillas, y en la espalda, el cuello, las caderas, la cabeza, los brazos y los hombros.',
        ],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'Su esposo presentó un reclamo por pérdida de consorcio. El despacho demandó a los operadores de la tienda en el Tribunal Superior del Condado de Orange, y el caso se resolvió con un acuerdo poco antes del juicio.',
        ],
      },
    ],
    resolved: '2023-02',
    published: approved,
  },
  {
    slug: 'acuerdo-choque-alcance-autopista',
    englishSlug: 'freeway-rear-end-settlement',
    summary:
      'Una SUV chocó por detrás contra nuestro cliente en la autopista 55, y más tarde él necesitó un reemplazo de disco lumbar. Los demandados llegaron a un acuerdo por $700,000 en 2015.',
    court: 'Tribunal Superior del Condado de Orange',
    practiceArea: { label: 'Accidentes de auto', href: '/es/abogado-de-accidentes-de-auto-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestro cliente había reducido la velocidad por el tráfico en la autopista 55, en Santa Ana, cuando una SUV chocó contra la parte trasera de su vehículo. El impacto dañó su parachoques reforzado, el enganche para remolque, la puerta trasera levadiza y la ventana.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: [
          'Ese mismo día fue al hospital e informó que había perdido el conocimiento, además de dolor de cuello, dolor intenso en la parte baja de la espalda, dolores de cabeza y problemas de visión. La demanda alegó lesiones en la cabeza, la columna, los hombros, los brazos, las piernas, las caderas y las costillas.',
          'Al año siguiente se sometió a una cirugía para reemplazar un disco de la zona lumbar.',
        ],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'Su esposa presentó un reclamo por pérdida de consorcio. El despacho demandó en el Tribunal Superior del Condado de Orange, y los demandados llegaron a un acuerdo por $700,000 en 2015.',
        ],
      },
    ],
    resolved: '2015-08',
    published: approved,
  },
  {
    slug: 'acuerdo-caida-piscina-parque-acuatico',
    englishSlug: 'waterpark-pool-deck-fall-settlement',
    summary:
      'Una mujer resbaló en el área de una piscina, resbaladiza por el bloqueador solar traído de afuera. El despacho demandó al resort y a los constructores de esa área, y los demandados llegaron a un acuerdo.',
    court: 'Tribunal Superior del Condado de Orange',
    practiceArea: { label: 'Resbalones y caídas', href: '/es/abogado-de-resbalones-y-caidas-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Una mujer que visitaba con su familia un resort con parque acuático bajo techo caminaba por el área de la piscina cerca de un tobogán de agua, tomando de la mano a sus dos sobrinas pequeñas, cuando los pies se le resbalaron. Cayó, se golpeó la cabeza y perdió el conocimiento, y tenía una herida sangrante en la cabeza.',
          'Según la demanda, mientras ella seguía en el piso, el gerente de seguridad del resort reconoció que el bloqueador solar y la loción bronceadora de la piscina exterior se estaban trayendo hacia adentro, lo que volvía el área de la piscina irrazonablemente resbaladiza, y que otros huéspedes se habían resbalado de la misma manera.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: ['Después sufrió lesiones de cuello, espalda y cabeza, dolores de cabeza, problemas de memoria y vértigo.'],
      },
      {
        heading: 'El caso',
        paragraphs: [
          'El despacho demandó en el Tribunal Superior del Condado de Orange al resort y a las empresas que construyeron y revistieron el área de la piscina; su esposo también presentó un reclamo. Los demandados llegaron a acuerdos por etapas.',
        ],
      },
    ],
    resolved: '2020-02',
    published: approved,
  },
  {
    slug: 'acuerdo-choque-cadena-autopista',
    englishSlug: 'chain-reaction-freeway-crash-settlement',
    summary:
      'Un camionero distraído provocó un choque en cadena en la Interestatal 5 que lesionó a nuestro cliente. El caso se resolvió con un acuerdo en 2022.',
    court: 'Tribunal Superior del Condado de Orange',
    practiceArea: { label: 'Accidentes de auto', href: '/es/abogado-de-accidentes-de-auto-condado-de-orange' },
    chapters: [
      {
        heading: 'Qué ocurrió',
        paragraphs: [
          'Nuestro cliente conducía hacia el sur por la Interestatal 5, en el Condado de Orange, cuando el camión de una empresa de control de plagas, que circulaba a por lo menos 65 millas por hora, chocó contra el auto que iba delante de él. Según la demanda, el conductor del camión había bajado la vista y la había apartado de la carretera, y cuando levantó la mirada iba demasiado rápido para detenerse.',
          'El impacto hizo que el otro auto girara sin control hacia el carril de nuestro cliente, donde chocó contra su vehículo.',
        ],
      },
      {
        heading: 'Las lesiones',
        paragraphs: [
          'La demanda alegó lesiones en la cabeza, la columna, los hombros, los brazos, las piernas, las caderas y las costillas, incluidos una lesión cerebral traumática y déficits cognitivos, y un tratamiento que incluyó inyecciones para el dolor.',
        ],
      },
      {
        heading: 'El caso',
        paragraphs: ['El despacho demandó a la empresa y a su conductor en el Tribunal Superior del Condado de Orange, y el caso se resolvió con un acuerdo en 2022.'],
      },
    ],
    resolved: '2022-05',
    published: approved,
  },
];

export function spanishCaseStoryBySlug(slug: string) {
  return spanishCaseStories.find((story) => story.slug === slug);
}

/** The Spanish version of an English story (its result card's `story`). */
export function spanishCaseStoryByEnglishSlug(englishSlug: string) {
  return spanishCaseStories.find((story) => story.englishSlug === englishSlug);
}

/** Each story's English and Spanish pages, for the language switcher and hreflang (i18n.ts). */
export const caseStoryLocalizedRoutes = spanishCaseStories.map((story) => ({
  en: caseStoryPath(story.englishSlug),
  es: spanishCaseStoryPath(story.slug),
}));

/**
 * What a Spanish story shows as its figure, title, outcome, and year: its English story's result card,
 * translated, or "Confidencial" for a confidential settlement (as caseStoryHeadline does in English).
 */
export function spanishCaseStoryHeadline(story: SpanishCaseStory): CaseStoryHeadline {
  if (story.confidential) {
    return { figure: 'Confidencial', title: story.confidential.title, outcome: 'Acuerdo', year: story.confidential.year, confidential: true };
  }
  const english = caseStoryBySlug(story.englishSlug);
  const result = english ? caseStoryResult(english) : undefined;
  if (!result) throw new Error(`No case result links to the case story "${story.englishSlug}" behind "${story.slug}".`);
  const translated = translateResultToSpanish(result);
  return { figure: translated.amount, title: translated.title, outcome: translated.outcome ?? 'Resultado', year: translated.year, confidential: false };
}

/** The page title: "Veredicto del jurado de $5.75M: Estudiante sufre fractura de cráneo y hemorragia cerebral | Kyle Scott Law". */
export function spanishCaseStoryTitle(story: SpanishCaseStory) {
  const { figure, title, outcome, confidential } = spanishCaseStoryHeadline(story);
  return confidential ? `Acuerdo confidencial: ${title} | Kyle Scott Law` : `${outcome} de ${figure}: ${title} | Kyle Scott Law`;
}

/** Left out of the list, as in English (caseStories.ts): the $2.2M story repeats the firm's own $2.2M announcement. */
const unlisted = new Set(
  spanishCaseStories.filter((story) => story.englishSlug === 'school-counselor-abuse-settlement').map((story) => spanishCaseStoryPath(story.slug)),
);

/**
 * The Spanish case stories and the firm's Spanish case announcements, newest first, less the unlisted
 * one: the list caseStoryLinks() gives in English, linking Spanish pages only.
 */
export function spanishCaseStoryLinks(): CaseStoryLink[] {
  const stories = spanishCaseStories.map((story) => {
    const headline = spanishCaseStoryHeadline(story);
    return { href: spanishCaseStoryPath(story.slug), kicker: resultOutcomeLabel(headline), figure: headline.figure, title: headline.title, summary: story.summary, date: story.resolved };
  });
  const announcements = newsArticlesForLocale('es')
    .filter((article) => article.kind === 'case')
    .map((article) => ({ href: article.path, kicker: `${article.label} · ${article.date}`, figure: article.result ?? article.label, title: article.title, summary: article.excerpt, date: article.dateTime }));
  return [...stories, ...announcements].filter((link) => !unlisted.has(link.href)).sort((a, b) => b.date.localeCompare(a.date));
}
