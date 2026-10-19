import type { PageSource } from '@/lib/marketing/data/practiceAreas';
import type { ServiceAreaData } from '@/lib/marketing/data/serviceAreas';
import { spanishRoundFourServiceAreas } from '@/lib/marketing/data/spanishServiceAreasRoundFour';

/**
 * City pages in Spanish, at /es/abogado-de-lesiones-personales-<city>. Each translates the English
 * city page named by `englishKey` (same key, same local facts, the same counts in every list), with
 * Spanish guide slugs and Spanish practice paths. The pair is joined for hreflang and the language
 * switcher (`serviceAreaLocalizedRoutes`); an English city page without a translation keeps
 * hreflang on itself. `spanish-service-areas.test.ts` holds each translation to its original.
 */
export type SpanishServiceAreaData = ServiceAreaData & { englishKey: string };

/** UCI Health (página propia de una entidad pública): "the only Level 1 trauma center in Orange County". */
const UCI_LEVEL_I: PageSource = { label: 'UCI Health — servicios de emergencia (el único centro de trauma de nivel I del Condado de Orange)', url: 'https://www.ucihealth.org/medical-services/programs/emergency-services' };

/** La lista de centros de trauma del condado (sin sus niveles). */
const OC_EMS_TRAUMA_CENTERS: PageSource = { label: 'Política 240.30 de Orange County EMS — servicios especializados del Condado de Orange, incluidos los centros de trauma (vigente desde el 1 de junio de 2026)', url: 'https://www.ochealthinfo.com/sites/healthcare/files/2026-06/240.30%20OC%20Specialty%20Service%20(6-2026).pdf' };
const GOV_CLAIM_DEADLINE: PageSource = { label: 'Código de Gobierno, § 911.2: seis meses para presentar un reclamo por lesiones ante una entidad pública — California Legislative Information', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=911.2' };
const DOG_BITE_STATUTE: PageSource = { label: 'Código Civil, § 3342: la responsabilidad del dueño de un perro por mordeduras — California Legislative Information', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=3342' };

export const spanishServiceAreas: SpanishServiceAreaData[] = [
  {
    key: 'santa-ana',
    englishKey: 'santa-ana',
    path: '/es/abogado-de-lesiones-personales-santa-ana',
    city: 'Santa Ana',
    title: 'Abogado de lesiones personales en Santa Ana',
    eyebrow: 'Atendemos Santa Ana desde la oficina de Tustin',
    description:
      'Representación para personas lesionadas en Santa Ana en choques de auto y atropellos de peatones, caídas en tiendas y complejos de apartamentos, mordeduras de perro y otros reclamos por negligencia — en inglés y en español.',
    metaDescription:
      'El abogado de lesiones personales en Santa Ana Kyle Scott representa a personas lesionadas en accidentes de auto y atropellos de peatones, caídas y mordeduras de perro. Admisión bilingüe. Consulta gratuita; sin honorarios a menos que haya una recuperación.',
    introTitle: 'Santa Ana es la sede del condado, y ahí está el tribunal donde se decide la mayoría de los casos por lesiones del Condado de Orange.',
    intro: [
      'Santa Ana es la sede del condado y una de las ciudades más densamente pobladas de California. Los tribunales civiles del Tribunal Superior del Condado de Orange están en el centro de la ciudad, a pocas millas de la oficina del despacho en Tustin. Sus calles — Bristol, Main, First, 17th, y la 5, la 55 y la 22 que la cruzan — llevan un tráfico intenso de personas que viajan al trabajo y de peatones, y sus complejos de apartamentos, centros comerciales y MainPlace Mall generan los reclamos por caídas y propiedades inseguras que acompañan a una población grande y activa.',
      'Kyle Scott Law ha representado a clientes de Santa Ana durante más de 30 años. Como gran parte de la ciudad habla español en casa, el sitio web, el proceso de admisión y el portal del cliente del despacho están disponibles en español, y las consultas pueden hacerse en cualquiera de los dos idiomas.',
    ],
    keyPoints: [
      { title: 'Atropellos de peatones y choques en intersecciones', body: 'La densa cuadrícula de calles de Santa Ana y su gran tráfico peatonal producen lesiones graves de peatones y en cruces peatonales. El reclamo depende del informe policial, la programación de los semáforos, los testigos y el video de las cámaras cercanas — todo lo cual el despacho solicita temprano.' },
      { title: 'Complejos de apartamentos y comercios', body: 'Los arrendadores, los administradores de propiedades y las tiendas son responsables de los peligros que conocían o que debieron haber encontrado. Los registros de mantenimiento y las quejas anteriores suelen ser la prueba clave.' },
      { title: 'Representación bilingüe', body: 'La admisión, las actualizaciones del caso y el portal seguro del cliente funcionan en español. Los familiares que ayudan a comunicarse son bienvenidos, pero nada del reclamo depende del inglés del cliente.' },
      { title: 'Agencias públicas y transporte', body: 'Como sede del condado, Santa Ana tiene un tráfico público intenso: autobuses, vehículos del gobierno y las propias vías. Una lesión que involucra un autobús público, un vehículo de la ciudad o del condado, o una condición peligrosa en una vía pública requiere un reclamo gubernamental, por lo general dentro de seis meses.' },
    ],
    matters: [
      'Choques de auto, camión y viajes compartidos en la 5, la 55 y la 22 y en calles de Santa Ana',
      'Lesiones de peatones en intersecciones, cruces peatonales y paradas de autobús',
      'Caídas y lesiones por propiedades inseguras en complejos de apartamentos, tiendas y MainPlace Mall',
      'Lesiones que involucran autobuses públicos, vehículos del gobierno y propiedad de la ciudad',
      'Mordeduras de perro y ataques de animales en vecindarios de Santa Ana',
      'Choques vehiculares relacionados con el trabajo y lesiones causadas por terceros',
    ],
    local: [
      { label: 'Dónde se presentan los casos', items: ['Tribunal Superior del Condado de Orange, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Dónde se atiende a las personas', items: ['Orange County Global Medical Center, Santa Ana, que los Servicios Médicos de Emergencia del Condado de Orange (Orange County EMS) incluyen como centro de trauma', 'Providence St. Joseph Hospital, Orange', 'UCI Health — Orange (UCI Medical Center), el centro de trauma de nivel I del condado'] },
      { label: 'Reportes y agencias', items: ['Departamento de Policía de Santa Ana (Santa Ana Police Department) para choques en calles de la ciudad', 'Patrulla de Caminos de California (CHP) para la 5, la 55 y la 22', 'Santa Ana Police Department Animal Services (control de animales de la policía de Santa Ana) para reportes de mordeduras'] },
    ],
    faqs: [
      { question: '¿Puedo hacer todo el proceso en español?', answer: 'Sí. La consulta inicial, el proceso de admisión y el portal del cliente están disponibles en español. Visite la versión en español del sitio en kjslaw.com/es o llame al 714-544-1460.' },
      { question: '¿Dónde se presentaría un caso por lesiones de Santa Ana?', answer: 'En los tribunales civiles del Tribunal Superior del Condado de Orange en el centro de Santa Ana: el Central Justice Center y el Civil Complex Center. Muchos reclamos se resuelven primero con la aseguradora; cuando hace falta una demanda, el despacho la presenta y la lleva a juicio allí.' },
      { question: 'Me atropellaron en un cruce peatonal. ¿Qué debo hacer ahora?', answer: 'Primero reciba atención médica y luego conserve lo que pueda: el número del informe policial, los datos del conductor, fotografías del lugar y los nombres de quienes lo vieron. No dé una declaración grabada a la aseguradora del conductor antes de que se revisen los hechos.' },
      { question: 'Mi arrendador ignoró un peligro y me lesioné. ¿Eso es un caso?', answer: 'Puede serlo. El dueño o el administrador de una propiedad que conocía una condición peligrosa, o que debió haberla encontrado con una inspección razonable, puede ser responsable de las lesiones que esa condición causa. Importan las quejas anteriores, las solicitudes de reparación y las fotografías de la condición.' },
    ],
    guideSlugs: ['que-hacer-despues-de-un-accidente-de-auto-condado-de-orange', 'plazo-para-demandar-por-lesiones-personales-california', 'quien-paga-las-facturas-medicas-accidente-de-auto-california', 'que-hacer-despues-de-una-mordedura-de-perro-condado-de-orange'],
    relatedPracticePaths: ['/es/abogado-de-accidentes-de-auto-condado-de-orange', '/es/abogado-de-resbalones-y-caidas-condado-de-orange', '/es/abogado-de-mordeduras-de-perro-condado-de-orange', '/es/abogado-de-lesiones-personales-condado-de-orange'],
    sources: [UCI_LEVEL_I, OC_EMS_TRAUMA_CENTERS, GOV_CLAIM_DEADLINE],
  },
  {
    key: 'anaheim',
    englishKey: 'anaheim',
    path: '/es/abogado-de-lesiones-personales-anaheim',
    city: 'Anaheim',
    title: 'Abogado de lesiones personales en Anaheim',
    eyebrow: 'Atendemos Anaheim desde la oficina de Tustin',
    description:
      'Representación para personas lesionadas en Anaheim en choques de auto y camión, caídas e incidentes por propiedades inseguras en resorts, estadios, hoteles y tiendas, mordeduras de perro y otras lesiones evitables.',
    metaDescription:
      'El abogado de lesiones personales en Anaheim Kyle Scott representa a personas lesionadas en accidentes de auto, caídas en resorts y recintos, mordeduras de perro y otros reclamos por negligencia. Consulta gratuita; sin honorarios a menos que haya una recuperación.',
    introTitle: 'En Anaheim las lesiones ocurren donde se reúne el condado: sus autopistas, su zona de resorts y sus recintos.',
    intro: [
      'Anaheim es la ciudad más poblada del Condado de Orange y su destino de visitantes más concurrido. Sus parques temáticos y hoteles de resort, su estadio y su arena, y su centro de convenciones atraen a millones de personas al año a Harbor Boulevard, Katella Avenue y los corredores de la 5, la 57 y la 91 que llevan el tráfico hasta ellos. Ese volumen produce los reclamos que Kyle Scott Law atiende: choques con personas que viajan al trabajo, conductores de viajes compartidos, autobuses turísticos y camiones comerciales; caídas en hoteles, estructuras de estacionamiento, restaurantes y tiendas; y lesiones en propiedades que están abiertas al público y son responsables de mantenerlo seguro.',
      'El despacho representa a clientes de Anaheim desde su oficina en Tustin, a poca distancia en auto por la 55 o la 5. Cada reclamo empieza con una revisión gratuita y confidencial de lo que ocurrió, quién puede ser responsable, qué pólizas de seguro aplican y qué plazos ya están corriendo.',
    ],
    keyPoints: [
      { title: 'Reclamos por propiedades en resorts y recintos', body: 'Los hoteles, los parques temáticos, los estadios y sus contratistas tienen el deber de inspeccionar y corregir los peligros para los visitantes. Los reportes de incidentes, el video de vigilancia y los registros de mantenimiento se solicitan temprano, antes de que se sobrescriban.' },
      { title: 'Choques en los corredores', body: 'Los choques en la 5, la 57 y la 91 y en Harbor, Katella, State College y Ball Road a menudo involucran a conductores de fuera de la ciudad, autos de alquiler, viajes compartidos y vehículos comerciales — cada uno con su propia aseguradora y su propio ajustador.' },
      { title: 'Agencias públicas', body: 'Un autobús de transporte público, un vehículo de la ciudad o una condición peligrosa en una vía pública cambia las reglas: por lo general, un reclamo gubernamental debe presentarse dentro de seis meses, mucho antes del plazo ordinario para demandar.' },
      { title: 'Visitantes lesionados', body: 'Las personas lesionadas en Anaheim que viven en otra parte de California, en otro estado o en el extranjero también pueden presentar un reclamo aquí. El despacho coordina los expedientes de tratamiento y la comunicación para que la distancia no debilite el caso.' },
    ],
    matters: [
      'Choques de auto, camión, motocicleta y viajes compartidos en la 5, la 57 y la 91 y en calles de Anaheim',
      'Caídas y lesiones en hoteles, parques temáticos, restaurantes, tiendas y estructuras de estacionamiento',
      'Lesiones de peatones y ciclistas en la zona de resorts y cerca del Platinum Triangle',
      'Lesiones que involucran autobuses de transporte público, autobuses de enlace de los resorts y propiedad de la ciudad',
      'Mordeduras de perro y ataques de animales en vecindarios y parques de Anaheim',
      'Lesiones cerebrales traumáticas y lesiones ortopédicas graves después de cualquiera de los casos anteriores',
    ],
    local: [
      { label: 'Dónde se presentan los casos', items: ['Tribunal Superior del Condado de Orange, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana'] },
      { label: 'Dónde se atiende a las personas', items: ['Anaheim Regional Medical Center (AHMC)', 'Kaiser Permanente Orange County — Anaheim Medical Center', 'UCI Health — Orange (UCI Medical Center), el centro de trauma de nivel I del condado'] },
      { label: 'Reportes y agencias', items: ['Departamento de Policía de Anaheim (Anaheim Police Department) para choques e incidentes en calles de la ciudad', 'Patrulla de Caminos de California (CHP) para la 5, la 57 y la 91', 'OC Animal Care para reportes de mordeduras (la ciudad tiene contrato con esa agencia)'] },
    ],
    faqs: [
      { question: '¿Dónde se presentaría un caso por lesiones de Anaheim?', answer: 'La mayoría de las demandas por lesiones personales de Anaheim se presentan en el Tribunal Superior del Condado de Orange en Santa Ana. Muchos reclamos se resuelven con la aseguradora antes de presentar una demanda; si hace falta una, Kyle Scott Law ha llevado casos a juicio en ese tribunal durante más de 30 años.' },
      { question: '¿Tengo que ir a la oficina?', answer: 'No. La primera consulta es por teléfono o por videollamada, y el despacho puede organizar una reunión en persona cuando un caso lo necesita. La oficina de Tustin está a poca distancia en auto de Anaheim para cualquier cosa que requiera una visita.' },
      { question: 'Me lesioné en un resort o en un estadio. ¿Quién es responsable?', answer: 'Depende de quién controlaba el área y qué causó la lesión: el recinto, un contratista, una empresa de seguridad u otro visitante. El despacho identifica a cada parte que podría ser responsable y el seguro que hay detrás de cada una, y pide los reportes de incidentes y el video antes de que desaparezcan.' },
      { question: '¿Qué pasa si estuvo involucrado un autobús público o una agencia del gobierno?', answer: 'Los reclamos contra entidades públicas siguen un proceso aparte y más corto: por lo general se requiere un reclamo gubernamental por escrito dentro de los seis meses posteriores al incidente. Ese plazo es una razón para que los hechos se revisen pronto.' },
    ],
    guideSlugs: ['que-hacer-despues-de-un-accidente-de-auto-condado-de-orange', 'reclamo-gubernamental-por-lesiones-condado-de-orange', 'como-probar-un-reclamo-por-resbalon-y-caida-california', 'pruebas-para-un-reclamo-de-lesiones-personales-california'],
    relatedPracticePaths: ['/es/abogado-de-accidentes-de-auto-condado-de-orange', '/es/abogado-de-resbalones-y-caidas-condado-de-orange', '/es/abogado-de-mordeduras-de-perro-condado-de-orange', '/es/abogado-de-lesion-cerebral-traumatica-condado-de-orange'],
    sources: [UCI_LEVEL_I, GOV_CLAIM_DEADLINE],
  },
  {
    key: 'garden-grove',
    englishKey: 'garden-grove',
    path: '/es/abogado-de-lesiones-personales-garden-grove',
    city: 'Garden Grove',
    title: 'Abogado de lesiones personales en Garden Grove',
    eyebrow: 'Atendemos Garden Grove desde la oficina de Tustin',
    description:
      'Representación para personas lesionadas en Garden Grove — en choques en la 22 y en Harbor Boulevard, Garden Grove Boulevard, Brookhurst Street y Beach Boulevard, en atropellos de peatones, en caídas en hoteles, restaurantes, tiendas y complejos de apartamentos, y en ataques de perros.',
    metaDescription:
      'El abogado de lesiones personales en Garden Grove Kyle Scott representa a personas lesionadas en choques en la 22 y en los bulevares de la ciudad, atropellos de peatones, caídas en hoteles, restaurantes y tiendas, y mordeduras de perro.',
    introTitle: 'Las lesiones en Garden Grove ocurren en la 22 y en los bulevares anchos que cruzan la ciudad.',
    intro: [
      'La 22 cruza Garden Grove de este a oeste, en su mayor parte dentro de la ciudad o a lo largo de su límite con Westminster, con salidas desde Beach Boulevard hasta Harbor Boulevard. Harbor Boulevard lleva visitantes a los hoteles del extremo de la ciudad que colinda con Anaheim, y en Garden Grove Boulevard están los restaurantes y las tiendas del OC Koreatown, entre Beach Boulevard y Brookhurst Street. Los choques en las rampas y las intersecciones, los peatones atropellados al cruzar bulevares anchos y las caídas en hoteles, restaurantes, tiendas y complejos de apartamentos son los reclamos que resultan.',
      'Kyle Scott Law representa a clientes de Garden Grove desde su oficina en Tustin, a poca distancia en auto hacia el este. Las consultas están disponibles en inglés y en español, y cada reclamo empieza con los hechos: cómo ocurrió, quién puede ser responsable, qué seguro aplica y qué plazos ya están corriendo.',
    ],
    keyPoints: [
      { title: 'La 22 y sus rampas', body: 'Las incorporaciones y los cambios de carril en la 22, y las rampas que desembocan en bulevares concurridos, producen choques por alcance y de impacto lateral. La Patrulla de Caminos de California investiga los choques en la autopista y el Departamento de Policía de Garden Grove atiende las calles de la ciudad; el despacho obtiene los dos tipos de informes, y cualquier video, antes de que se pierdan.' },
      { title: 'Cruzar los bulevares', body: 'Harbor Boulevard, Garden Grove Boulevard y Beach Boulevard son calles anchas y concurridas, bordeadas de tiendas y restaurantes. El reclamo de un peatón depende de la programación de los semáforos, la iluminación, las líneas de visión, los testigos y las cámaras de los negocios que grabaron el cruce.' },
      { title: 'Hoteles, tiendas y complejos de apartamentos', body: 'Los hoteles de Harbor Boulevard, los centros comerciales, los restaurantes y los complejos de apartamentos deben un cuidado razonable a sus huéspedes, clientes e inquilinos. Cada reclamo depende de quién controlaba el área y qué sabía del peligro, por eso los reportes de incidentes, los registros de mantenimiento y el video se solicitan temprano.' },
      { title: 'Una mordedura de perro en Garden Grove', body: 'Garden Grove tiene su propio servicio de control de animales (Animal Care Services) en lugar de OC Animal Care, así que una mordedura en la ciudad se reporta allí. Conforme al Código Civil, sección 3342, el dueño es responsable de una mordedura en un lugar público o a alguien que estaba legalmente en una propiedad privada, aunque el perro nunca hubiera mordido a nadie antes.' },
    ],
    matters: [
      'Choques de auto, camión, motocicleta y viajes compartidos en la 22 y en los bulevares de Garden Grove',
      'Lesiones de peatones y ciclistas en intersecciones y cruces peatonales',
      'Caídas y lesiones por propiedades inseguras en hoteles, restaurantes, tiendas y centros comerciales',
      'Peligros en escaleras, pasillos e iluminación en complejos de apartamentos',
      'Mordeduras de perro y ataques de animales en vecindarios y parques de Garden Grove',
      'Lesiones cerebrales traumáticas, de columna y ortopédicas después de cualquiera de los casos anteriores',
    ],
    local: [
      { label: 'Dónde se presentan los casos', items: ['Tribunal Superior del Condado de Orange, Central Justice Center — 700 Civic Center Drive West, Santa Ana', 'Civil Complex Center — 751 West Santa Ana Boulevard, Santa Ana', 'West Justice Center — 8141 13th Street, Westminster, donde se presentan los casos penales y de tránsito de Garden Grove (por ejemplo, un cargo contra el otro conductor)'] },
      { label: 'Dónde se atiende a las personas', items: ['Garden Grove Hospital and Medical Center, Garden Grove Boulevard', 'UCI Health — Fountain Valley', 'Orange County Global Medical Center, Santa Ana, que los Servicios Médicos de Emergencia del Condado de Orange (Orange County EMS) incluyen como centro de trauma', 'UCI Health — Orange (UCI Medical Center), el centro de trauma de nivel I del condado'] },
      { label: 'Reportes y agencias', items: ['Departamento de Policía de Garden Grove (Garden Grove Police Department) para choques e incidentes en calles de la ciudad', 'Patrulla de Caminos de California (CHP) para la 22', 'Garden Grove Animal Care Services para reportes de mordeduras'] },
    ],
    faqs: [
      { question: '¿Dónde se presentaría un caso por lesiones de Garden Grove?', answer: 'En el Tribunal Superior del Condado de Orange en Santa Ana. Los casos penales y de tránsito de Garden Grove se presentan en el West Justice Center en Westminster, pero un reclamo por lesiones es un caso civil aparte, y muchos se resuelven con la aseguradora antes de que se presente una demanda.' },
      { question: 'Me atropellaron al cruzar uno de los bulevares. ¿Qué debo hacer ahora?', answer: 'Primero reciba atención médica y luego conserve lo que pueda: el número del informe policial, los datos del conductor, fotografías del cruce y los nombres de quienes lo vieron. Los negocios a lo largo del bulevar pueden tener cámaras que lo grabaron, y ese video suele regrabarse, por eso el despacho lo pide de inmediato.' },
      { question: 'Un perro me mordió en Garden Grove. ¿Quién toma el reporte?', answer: 'Garden Grove Animal Care Services: la ciudad tiene su propia agencia de control de animales en lugar de OC Animal Care. El reporte documenta al perro y a su dueño, lo que también ayuda a identificar el seguro que podría cubrir la mordedura.' },
      { question: '¿El despacho atiende casos de Garden Grove en español?', answer: 'Sí. Las consultas, los documentos y las actualizaciones están disponibles en español, y los familiares que ayudan a un cliente a comunicarse son bienvenidos.' },
    ],
    guideSlugs: ['que-hacer-despues-de-un-accidente-de-auto-condado-de-orange', 'que-hacer-despues-de-una-mordedura-de-perro-condado-de-orange', 'como-probar-un-reclamo-por-resbalon-y-caida-california', 'quien-paga-las-facturas-medicas-accidente-de-auto-california'],
    relatedPracticePaths: ['/es/abogado-de-accidentes-de-auto-condado-de-orange', '/es/abogado-de-resbalones-y-caidas-condado-de-orange', '/es/abogado-de-mordeduras-de-perro-condado-de-orange', '/es/abogado-de-lesiones-personales-condado-de-orange'],
    sources: [UCI_LEVEL_I, OC_EMS_TRAUMA_CENTERS, DOG_BITE_STATUTE],
  },
  ...spanishRoundFourServiceAreas,
];

export const spanishServiceAreaByKey = Object.fromEntries(spanishServiceAreas.map((area) => [area.key, area])) as Record<string, SpanishServiceAreaData>;

/** Every translated city page paired with its English original (the English path comes from serviceAreas.ts). */
export const serviceAreaLocalizedRoutes = (englishPathByKey: Record<string, string>) =>
  spanishServiceAreas.flatMap((area) => (englishPathByKey[area.englishKey] ? [{ en: englishPathByKey[area.englishKey], es: area.path }] : []));
