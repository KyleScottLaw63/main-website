import type { CaseResult, ResultCategory } from '@/lib/marketing/data/results';

export const spanishCategoryLabels: Record<ResultCategory, string> = {
  'Abuse & school liability': 'Abuso y responsabilidad escolar',
  'Auto & transportation': 'Autos y transporte',
  'Premises liability': 'Responsabilidad de propiedades',
  'Dog bites': 'Mordeduras de perro',
  'Malpractice': 'Negligencia profesional',
  'Assault & civil rights': 'Agresión y derechos civiles',
  'Other injury claims': 'Otros reclamos por lesiones',
};

const outcomes: Record<string, string> = {
  Settlement: 'Acuerdo',
  Recovery: 'Recuperación',
  'Jury verdict': 'Veredicto del jurado',
  'Settlement during trial': 'Acuerdo durante el juicio',
  'Arbitration award': 'Laudo arbitral',
};

const titles: Record<string, string> = {
  'Elementary school boys molested by a teacher': 'Alumnos de primaria abusados sexualmente por un maestro',
  'Huntington Beach student molested by her teacher and coach': 'Estudiante de Huntington Beach abusada por su maestro y entrenador',
  'Student suffers skull fracture and brain bleed': 'Estudiante sufre fractura de cráneo y hemorragia cerebral',
  'Mother and her children hurt in a Fontana intersection crash': 'Madre e hijos lesionados en un choque en una intersección de Fontana',
  'Riverside Superior Court jury verdict': 'Veredicto del jurado en el Tribunal Superior de Riverside',
  'Sexual molestation and sexual battery lawsuit': 'Demanda por abuso sexual y agresión sexual',
  'Personal injury settlement': 'Acuerdo por lesiones personales',
  'Motor vehicle crash settlement': 'Acuerdo por choque vehicular',
  'Motor vehicle crash claim against a city': 'Reclamo por choque vehicular contra una ciudad',
  'Uninsured/underinsured-motorist claim': 'Reclamo de conductor sin seguro o con seguro insuficiente',
  'Slip or trip and fall settlement': 'Acuerdo por resbalón o tropiezo y caída',
  'Premises liability settlement': 'Acuerdo por responsabilidad de propiedades',
  'Dog bite settlement': 'Acuerdo por mordedura de perro',
  'Assault and battery settlement': 'Acuerdo por asalto y agresión',
  'Workers’ compensation settlement': 'Acuerdo de compensación laboral',
  'Employment claim settlement': 'Acuerdo por un reclamo laboral',
  'Nursing-home neglect settlement': 'Acuerdo por negligencia en un hogar de ancianos',
  'Wrongful death settlement': 'Acuerdo por muerte injusta',
  'Sexual abuse settlement': 'Acuerdo por abuso sexual',
  'Medical malpractice settlement': 'Acuerdo por negligencia médica',
  'Underinsured-motorist claim': 'Reclamo de conductor con seguro insuficiente',
  'Teenage boy molested by church employee': 'Adolescente abusado sexualmente por un empleado de una iglesia',
  'OCTA bus crashes into minivan; man suffers cognitive problems': 'Autobús de OCTA choca contra una minivan; un hombre sufre problemas cognitivos',
  'Slip-and-fall claim involving complex regional pain syndrome': 'Reclamo por resbalón y caída con síndrome de dolor regional complejo',
  'Wrongful death of a Marine in an Osprey crash near Tucson': 'Muerte injusta de un infante de Marina en un accidente de Osprey cerca de Tucson',
  'Driver needs a lower-back disc replacement after a freeway rear-end crash': 'Conductor necesita un reemplazo de disco lumbar tras un choque por alcance en la autopista',
  'Dangerous flooring causes neck injury and cognitive issues': 'Piso peligroso causa lesión de cuello y problemas cognitivos',
  'Client suffers shooting and battery injuries': 'Cliente sufre lesiones por disparo y agresión',
  'Trip-and-fall claim involving a knee injury': 'Reclamo por tropiezo y caída con lesión de rodilla',
  'Trip and fall causes head injury and aggravated seizures': 'Tropiezo y caída causa lesión en la cabeza y agrava convulsiones',
  'Car crash causes neck injuries and headaches': 'Choque de auto causa lesiones de cuello y dolores de cabeza',
  'Rear-end crash causes lumbar radiculopathy': 'Choque por alcance causa radiculopatía lumbar',
  'Motorcycle rider suffers fractures in collision with minivan': 'Motociclista sufre fracturas en una colisión con una minivan',
  'Man injured while working for homeowner': 'Hombre lesionado mientras trabajaba para un propietario',
  'Couple suffers neck, back, and shoulder injuries in car crash': 'Pareja sufre lesiones de cuello, espalda y hombro en un choque',
  'Trip-and-fall claim involving a neck injury': 'Reclamo por tropiezo y caída con lesión de cuello',
  'Couple and child injured in car crash': 'Pareja y menor lesionados en un choque de auto',
  'Medical-supply employee injured in auto crash': 'Empleado de suministros médicos lesionado en un choque',
  'Shoulder surgery after slip and fall in supermarket': 'Cirugía de hombro después de un resbalón y caída en un supermercado',
  'Knee injury and arthroscopic surgery after car crash': 'Lesión de rodilla y cirugía artroscópica después de un choque',
  'Auto crash causes back injury': 'Choque de auto causa lesión de espalda',
  'Woman suffers hip fracture': 'Mujer sufre fractura de cadera',
  'Car crash causes neck injury and headaches': 'Choque de auto causa lesión de cuello y dolores de cabeza',
  'Knee surgery after collision with drunk driver': 'Cirugía de rodilla después de una colisión con un conductor ebrio',
  'Shoulder surgery after auto crash': 'Cirugía de hombro después de un choque de auto',
  'Neck injury and epidural injections after car crash': 'Lesión de cuello e inyecciones epidurales después de un choque',
  'Mother and daughter suffer back injuries in auto crash': 'Madre e hija sufren lesiones de espalda en un choque',
  'Child suffers dog bites to abdomen': 'Menor sufre mordeduras de perro en el abdomen',
  'Woman suffers wrist nerve damage from dog bite': 'Mujer sufre daño nervioso en la muñeca por mordedura de perro',
  'Neck and back injuries after auto crash': 'Lesiones de cuello y espalda después de un choque',
  'Woman suffers dog bite injuries': 'Mujer sufre lesiones por mordedura de perro',
  'Drunk driver causes neck and back injuries': 'Conductor ebrio causa lesiones de cuello y espalda',
  'Neck injuries requiring epidural injections after crash': 'Lesiones de cuello que requieren inyecciones epidurales después de un choque',
  'Store shelf strikes woman and causes chronic pain': 'Estante de tienda golpea a una mujer y causa dolor crónico',
  'Back surgery after auto crash': 'Cirugía de espalda después de un choque',
  'Woman suffers dog bite to face': 'Mujer sufre mordedura de perro en el rostro',
  'Woman suffers head injury in auto crash': 'Mujer sufre lesión en la cabeza en un choque',
  'Man beaten by police suffers excessive force': 'Hombre golpeado por la policía sufre uso excesivo de fuerza',
  'Woman suffers wrist fracture in auto incident': 'Mujer sufre fractura de muñeca en un accidente vehicular',
  'Rear-end freeway crash causes back injury': 'Choque por alcance en la autopista causa lesión de espalda',
  'Office Depot truck crash causes back injury': 'Choque con camión de Office Depot causa lesión de espalda',
  'Child suffers dog bite to face': 'Menor sufre mordedura de perro en el rostro',
  'Bicyclist struck by car suffers back injury': 'Ciclista atropellado por un auto sufre lesión de espalda',
  'Young man suffers dog bite injuries': 'Joven sufre lesiones por mordedura de perro',
  'Neighbor battery causes eye injury': 'Agresión de un vecino causa lesión ocular',
  'Bar patron battered by security guard': 'Cliente de un bar agredido por un guardia de seguridad',
  'Woman suffers back injuries in car crash': 'Mujer sufre lesiones de espalda en un choque',
  'Attorney malpractice while handling personal-injury claim': 'Negligencia de un abogado al manejar un reclamo por lesiones personales',
  'Woman injured in car crash': 'Mujer lesionada en un choque de auto',
  'Back surgery after motorcycle crash': 'Cirugía de espalda después de un accidente de motocicleta',
  'Man suffers back injury in automobile crash': 'Hombre sufre lesión de espalda en un choque',
  'Female student molested at charter elementary school': 'Estudiante abusada sexualmente en una escuela primaria chárter',
  'Woman suffers neck injury requiring epidural injections after crash': 'Mujer sufre lesión de cuello que requiere inyecciones epidurales después de un choque',
  'Woman suffers neck injury in car crash': 'Mujer sufre lesión de cuello en un choque',
  'Hip injury after car crash': 'Lesión de cadera después de un choque',
  'Knee injury after slipping on water in supermarket': 'Lesión de rodilla después de resbalar con agua en un supermercado',
  'Back injury after slip and fall': 'Lesión de espalda después de un resbalón y caída',
  'Pedestrian struck by pickup suffers back injury': 'Peatón atropellado por una camioneta sufre lesión de espalda',
  'Woman molested by hospital employee': 'Mujer abusada sexualmente por un empleado de hospital',
  'Medical malpractice involving failure to diagnose': 'Negligencia médica por falta de diagnóstico',
  'Neck injury after auto crash in San Bernardino': 'Lesión de cuello después de un choque en San Bernardino',
  'Woman suffers wrist fracture on Disneyland escalator': 'Mujer sufre fractura de muñeca en una escalera eléctrica de Disneyland',
};

function translateDetail(detail: string) {
  return detail
    .replaceAll('Orange County Superior Court', 'Tribunal Superior del Condado de Orange')
    .replaceAll('Riverside County Superior Court', 'Tribunal Superior del Condado de Riverside')
    .replaceAll('Riverside Superior Court', 'Tribunal Superior de Riverside')
    .replaceAll('Los Angeles Superior Court', 'Tribunal Superior de Los Ángeles')
    .replaceAll('San Bernardino Superior Court', 'Tribunal Superior de San Bernardino')
    .replaceAll('San Joaquin Superior Court', 'Tribunal Superior de San Joaquín')
    .replaceAll('Orange County', 'Condado de Orange')
    .replaceAll('Riverside County', 'Condado de Riverside')
    .replaceAll('Settlement and arbitration award', 'Acuerdo y laudo arbitral')
    .replaceAll('Combined settlement for five injured people', 'Acuerdo combinado para cinco personas lesionadas')
    .replaceAll('Details not published', 'Detalles no publicados')
    .replaceAll('Details confidential', 'Detalles confidenciales')
    .replaceAll('Confidential matter', 'Asunto confidencial')
    .replaceAll('Confidential', 'Confidencial')
    .replaceAll('Uninsured-motorist claim', 'Reclamo de conductor sin seguro')
    .replaceAll('Underinsured-motorist claim', 'Reclamo de conductor con seguro insuficiente')
    .replaceAll('UM claim', 'Reclamo de conductor sin seguro')
    .replaceAll('UM and bad-faith claims', 'Reclamos de conductor sin seguro y mala fe')
    .replaceAll('Binding arbitration', 'Arbitraje vinculante')
    .replaceAll('Former teacher', 'Exmaestro')
    .replaceAll('Two-week jury trial', 'Juicio con jurado de dos semanas')
    .replaceAll('Claim against LBUSD', 'Reclamo contra el Distrito Escolar Unificado de Long Beach')
    .replaceAll('Claim against school district', 'Reclamo contra el distrito escolar')
    .replaceAll('School district negligence', 'Negligencia del distrito escolar')
    .replaceAll('Largest molestation settlement at the time', 'Mayor acuerdo por abuso sexual en ese momento')
    .replaceAll('Clergy malpractice', 'Negligencia del clero');
}

export function translateResultToSpanish(result: CaseResult): CaseResult {
  return {
    ...result,
    title: titles[result.title] ?? result.title,
    detail: translateDetail(result.detail),
    category: result.category,
    outcome: result.outcome ? (outcomes[result.outcome] ?? result.outcome) : undefined,
  };
}

export function spanishResultCategory(category: ResultCategory) {
  return spanishCategoryLabels[category];
}
