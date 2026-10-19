import type { PageSource } from '@/lib/marketing/data/practiceAreas';
import type { SpanishServiceAreaData } from '@/lib/marketing/data/spanishServiceAreas';

/**
 * Content round 4 (2026-10-19), in Spanish: the city pages that translate an English city page of
 * the round (`serviceAreasNorthWestCounty.ts` and the other round-four files). Each says what its
 * English page says: the same local facts, the same sources (same URLs, same order), the same
 * featured results, and the same number of items in every list (`spanish-service-areas.test.ts`).
 */

const CODE_NAMES = { CCP: 'Código de Procedimiento Civil', CIV: 'Código Civil', GOV: 'Código de Gobierno' } as const;

/** The official text of a California code section on the Legislature's site (the same URL the English page lists). */
const leginfo = (lawCode: keyof typeof CODE_NAMES, sectionNum: string) =>
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=${lawCode}&sectionNum=${sectionNum}`;

/** A code section as a source, labeled in Spanish; the official page itself is in English. */
const ley = (lawCode: keyof typeof CODE_NAMES, sectionNum: string, note: string): PageSource => ({
  label: `${CODE_NAMES[lawCode]} de California, § ${sectionNum} (${note})`,
  url: leginfo(lawCode, sectionNum),
});

export const spanishRoundFourServiceAreas: SpanishServiceAreaData[] = [
  {
    key: 'fountain-valley',
    englishKey: 'fountain-valley',
    path: '/es/abogado-de-lesiones-personales-fountain-valley',
    city: 'Fountain Valley',
    title: 'Abogado de lesiones personales en Fountain Valley',
    eyebrow: 'Atendemos Fountain Valley desde la oficina de Tustin',
    description:
      'Representación para personas lesionadas en Fountain Valley — en choques en la 405 y en Brookhurst, Euclid y Magnolia, en caídas en tiendas y en propiedades públicas, en Mile Square Park y en ataques de perros.',
    metaDescription:
      'El abogado de lesiones personales en Fountain Valley Kyle Scott representa a personas lesionadas en choques en la 405 y en los bulevares de la ciudad, caídas, lesiones en Mile Square Park y mordeduras de perro. Consulta gratuita; sin honorarios a menos que haya una recuperación.',
    introTitle: 'Las lesiones en Fountain Valley ocurren donde la 405 atraviesa una cuadrícula de bulevares concurridos, y alrededor de Mile Square Park.',
    intro: [
      'La 405 cruza Fountain Valley en diagonal. Las calles Brookhurst, Euclid, Magnolia, Bushard y Ward llevan el tráfico de norte a sur, y las avenidas Edinger, Warner, Slater, Talbert y Ellis las cruzan. Mile Square Regional Park, administrado por el Condado, y el Santa Ana River Trail (el sendero que sigue el río Santa Ana) a lo largo del borde este de la ciudad llevan a ciclistas y peatones a la mezcla. Los reclamos que resultan son choques en la autopista y en intersecciones, ciclistas y peatones atropellados cerca del parque y del sendero del río, caídas en tiendas, restaurantes y oficinas, y mordeduras de perro en zonas residenciales.',
      'Kyle J. Scott, admitido en el Colegio de Abogados de California (State Bar of California) en 1991, fundó Kyle Scott Law en 2003. El despacho no tiene oficina en Fountain Valley; representa a sus clientes de Fountain Valley desde su oficina en Tustin, a la que se llega por la 55 y la 405, y también a personas lesionadas en las ciudades vecinas de Huntington Beach, Costa Mesa, Santa Ana y Garden Grove. Cada reclamo empieza con una revisión gratuita y confidencial de lo que ocurrió, quién era dueño o tenía el control de la vía o de la propiedad (la Ciudad de Fountain Valley, el Condado de Orange, un distrito escolar o un negocio privado), qué seguro aplica y qué plazos ya están corriendo.',
    ],
    keyPoints: [
      { title: 'La 405 por el centro de la ciudad', body: 'Cuando un choque ocurre cerca de una rampa o de un cambio de carril, la culpa suele depender de quién cambió de carril y cuándo, por eso el informe, el video de las cámaras de tablero y los datos del vehículo se preservan cuanto antes. La oficina del Área de Westminster de la Patrulla de Caminos de California (CHP) patrulla la 405.' },
      { title: 'Brookhurst, Euclid y los bulevares', body: 'Los giros a la izquierda en bulevares anchos, los choques por pasarse un semáforo en rojo y los peatones atropellados en cruces peatonales cerca de centros comerciales y escuelas son investigados por el Departamento de Policía de Fountain Valley (Fountain Valley Police Department), que entrega los informes de choques en línea a través de LexisNexis. Cuando una aseguradora alega que la persona lesionada tuvo parte de la culpa, la regla de responsabilidad comparativa de California reduce la recuperación en ese porcentaje en lugar de impedirla (CACI No. 405).' },
      { title: 'Mile Square Park y otras propiedades públicas', body: 'Mile Square Regional Park es un parque del Condado de Orange administrado por OC Parks, y la Ciudad de Fountain Valley administra su Recreation Center & Sports Park en terrenos del parque que arrienda a lo largo de Brookhurst Street. Las calles y las aceras pertenecen a la ciudad, y los planteles escolares, a sus distritos escolares. Un reclamo contra cualquiera de ellos por lo general debe presentarse dentro de seis meses (Código de Gobierno, § 911.2), y los reclamos por propiedades públicas tienen sus propios límites legales (Código de Gobierno, § 835), por eso el despacho determina primero quién controlaba el lugar.' },
      { title: 'Mordeduras de perro en los vecindarios de Fountain Valley', body: 'California hace responsable al dueño de un perro por las lesiones de una mordedura sufridas en un lugar público o por alguien que estaba legalmente en una propiedad privada, aunque el perro nunca hubiera mordido a nadie antes (Código Civil, § 3342). Fountain Valley tiene contrato con el Condado para el control de animales, así que el reporte de la mordedura va a OC Animal Care. Ese reporte, las fotografías de las heridas y los datos del seguro del dueño son las primeras pruebas.' },
    ],
    matters: [
      'Choques de auto, camión, motocicleta y viajes compartidos en la 405 y en Brookhurst, Euclid, Magnolia, Warner, Talbert y otras calles de Fountain Valley',
      'Lesiones de peatones y ciclistas en intersecciones, en el Santa Ana River Trail y en los senderos alrededor de Mile Square Park',
      'Caídas y lesiones por propiedades inseguras en tiendas, restaurantes, consultorios médicos y comunidades de apartamentos',
      'Lesiones en Mile Square Park, en el Sports Park, en escuelas y en otras propiedades públicas',
      'Mordeduras de perro y ataques de animales en vecindarios y parques de Fountain Valley',
      'Reclamos por negligencia médica, y lesiones cerebrales traumáticas y de columna después de cualquiera de los casos anteriores',
    ],
    local: [
      { label: 'Dónde se presentan los casos', items: ['Tribunal Superior del Condado de Orange, Central Justice Center — 700 Civic Center Drive West, Santa Ana (casos civiles)', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana (casos designados como complejos)', 'West Justice Center — 8141 13th Street, Westminster, donde se presentan los casos penales y de tránsito de Fountain Valley (por ejemplo, un cargo contra el otro conductor)'] },
      { label: 'Dónde se atiende a las personas', items: ['MemorialCare Orange Coast Medical Center, Brookhurst Street', 'UCI Health — Fountain Valley (antes Fountain Valley Regional Hospital), Euclid Street', 'UCI Health — Orange (UCI Medical Center), el centro de trauma de nivel I para adultos del condado'] },
      { label: 'Reportes y agencias', items: ['Departamento de Policía de Fountain Valley para choques en calles de la ciudad', 'Patrulla de Caminos de California (CHP), Área de Westminster, para la 405', 'OC Animal Care para reportes de mordeduras (la ciudad tiene contrato con el Condado para el control de animales)'] },
      { label: 'Reclamos gubernamentales', items: ['Secretaría Municipal (City Clerk) de Fountain Valley, para reclamos contra la ciudad', 'Secretaría de la Junta de Supervisores (Clerk of the Board of Supervisors) del Condado de Orange, para reclamos contra el Condado, incluidas las lesiones en las partes de Mile Square Park administradas por el Condado'] },
    ],
    faqs: [
      { question: '¿Dónde se presentaría un caso por lesiones de Fountain Valley?', answer: 'En el Tribunal Superior del Condado de Orange, que atiende los casos civiles de todo el condado en el Central Justice Center en Santa Ana; los casos designados como complejos van al Civil Complex Center. Los casos penales y de tránsito de Fountain Valley se presentan en el West Justice Center en Westminster, incluido un cargo contra un conductor que causó un choque, pero el reclamo por lesiones es un caso civil aparte, y muchos se resuelven con la aseguradora antes de que se presente una demanda.' },
      { question: 'Me lesioné en Mile Square Park. ¿Quién es responsable?', answer: 'Depende de en qué parte del parque ocurrió y qué lo causó. OC Parks administra Mile Square Regional Park para el Condado de Orange; la Ciudad de Fountain Valley administra el Recreation Center & Sports Park en terrenos que arrienda a lo largo de Brookhurst Street; y el alquiler de bicicletas y de botes de pedales lo opera un concesionario. Un reclamo contra el Condado o contra la ciudad por lo general debe presentarse dentro de seis meses, así que primero se determinan el lugar exacto y quién lo controlaba.' },
      { question: 'Un perro me mordió en Fountain Valley. ¿El dueño es responsable?', answer: 'Con frecuencia, sí. Conforme a la sección 3342 del Código Civil de California, el dueño de un perro es responsable de las lesiones de una mordedura sufridas en un lugar público o mientras la persona estaba legalmente en una propiedad privada, aunque el perro nunca hubiera mordido a nadie antes. Reciba atención médica, reporte la mordedura a OC Animal Care, que presta los servicios de control de animales de Fountain Valley bajo un contrato con el Condado, fotografíe las heridas y obtenga el nombre y la dirección del dueño y cualquier dato de su seguro de propietario de vivienda o de inquilino.' },
      { question: '¿Cómo obtengo el informe policial de un choque en Fountain Valley?', answer: 'Depende de dónde ocurrió el choque. El Departamento de Policía de Fountain Valley atiende los choques en calles de la ciudad y entrega los informes en línea a través de LexisNexis, y su Oficina de Registros (Records Bureau) atiende los choques en los que hubo una muerte o un arresto. Los choques en la 405 los atiende la oficina del Área de Westminster de la Patrulla de Caminos de California. En cualquier caso, guarde el número de informe que le dieron en el lugar.' },
      { question: '¿Cuánto tiempo tengo para presentar un reclamo?', answer: 'Por lo general dos años desde la lesión para presentar una demanda (Código de Procedimiento Civil, sección 335.1). Si la Ciudad de Fountain Valley, el Condado de Orange o un distrito escolar puede ser responsable (una calle de la ciudad, Mile Square Park, un plantel), por lo general debe presentarse un reclamo gubernamental por escrito dentro de seis meses (Código de Gobierno, sección 911.2). Los reclamos contra un médico o un hospital siguen una regla aparte con sus propios plazos (Código de Procedimiento Civil, sección 340.5).' },
      { question: '¿Tengo que ir a la oficina de Tustin?', answer: 'No. Kyle Scott Law no tiene una oficina en Fountain Valley; representa a sus clientes de Fountain Valley desde 17671 Irvine Blvd. en Tustin. La primera consulta es gratuita y puede ser por teléfono o por videollamada, en español o en inglés, y las reuniones en persona se organizan siempre que un caso las requiere.' },
    ],
    guideSlugs: ['que-hacer-despues-de-un-accidente-de-auto-condado-de-orange', 'reclamo-gubernamental-por-lesiones-condado-de-orange', 'que-hacer-despues-de-una-mordedura-de-perro-condado-de-orange', 'compensacion-si-tuvo-parte-de-la-culpa-california'],
    relatedPracticePaths: ['/es/abogado-de-accidentes-de-auto-condado-de-orange', '/es/abogado-de-resbalones-y-caidas-condado-de-orange', '/es/abogado-de-mordeduras-de-perro-condado-de-orange', '/es/abogado-de-negligencia-medica-condado-de-orange'],
    featuredResults: ['Driver hurt in a chain-reaction freeway crash caused by a distracted truck driver', 'Shopper twists her ankle on an object left on a store floor', 'Woman suffers wrist nerve damage from dog bite'],
    sources: [
      ley('CCP', '335.1', 'dos años para demandar por lesiones personales'),
      ley('GOV', '911.2', 'plazo de seis meses para presentar un reclamo'),
      ley('CCP', '340.5', 'reclamos contra proveedores de atención médica'),
      ley('CIV', '3342', 'mordeduras de perro'),
      ley('GOV', '835', 'condición peligrosa de una propiedad pública'),
      { label: 'Consejo Judicial de California — CACI No. 405, responsabilidad comparativa', url: 'https://courts.ca.gov/system/files/file/judicial_council_of_california_civil_jury_instructions_2026.pdf' },
      { label: 'Tribunal Superior del Condado de Orange — Lista de designación de tribunales (qué centro de justicia atiende los casos de cada ciudad)', url: 'https://www.occourts.org/system/files/general/court-designation-list.pdf' },
      { label: 'Patrulla de Caminos de California — oficina del Área de Westminster', url: 'https://www.chp.ca.gov/find-an-office/border-division/670-westminster/' },
      { label: 'UCI Health — centro de trauma en UCI Medical Center, Orange', url: 'https://ucihealth.org/medical-services/trauma-critical-care-surgery' },
      { label: 'Ciudad de Fountain Valley — informe de la policía o de un choque de tránsito', url: 'https://fountainvalley.gov/1046/Police-or-Traffic-Collision-Report' },
      { label: 'Ciudad de Fountain Valley — control de animales (contrato con el Condado)', url: 'https://fountainvalley.gov/634/Animal-Control' },
      { label: 'Ciudad de Fountain Valley — reclamos', url: 'https://fountainvalley.gov/153/Claims' },
      { label: 'Ciudad de Fountain Valley — Recreation Center & Sports Park', url: 'https://fountainvalley.gov/205/Recreation-Center' },
      { label: 'Ciudad de Fountain Valley — Actualización del Plan General (General Plan Update), Informe de condiciones existentes (calles, ciclovías, Santa Ana River Trail)', url: 'https://www.fountainvalley.gov/DocumentCenter/View/17433' },
      { label: 'OC Parks — Mile Square Regional Park', url: 'https://parks.oc.gov/milesquare' },
      { label: 'Condado de Orange — Secretaría de la Junta de Supervisores, formularios de reclamo', url: 'https://cob.ocgov.com/forms' },
      { label: 'OC Animal Care — ciudades atendidas por los servicios de campo (Field Services)', url: 'https://animalcare.oc.gov/field-operations' },
      { label: 'OC Animal Care — reportar una mordedura de animal', url: 'https://animalcare.oc.gov/field-operations/report-animal-bite' },
    ],
  },
];
