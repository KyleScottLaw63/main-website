import type { SiteLocale } from '@/lib/marketing/i18n';
import { noRecoveryTerms } from '@/lib/marketing/no-recovery-terms';

const en = noRecoveryTerms.en.statement;
const es = noRecoveryTerms.es.statement;

/**
 * "Why hire us": the honest case for the firm, in both languages. Every
 * figure here is one the firm publishes elsewhere on the site (verdict
 * labels, years in practice, the fee model); nothing is invented for effect.
 */
export type WhyHireUsContent = {
  path: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  lede: string;
  reasons: { title: string; body: string }[];
  fee: { eyebrow: string; title: string; intro: string; points: string[] };
  firstWeek: { eyebrow: string; title: string; steps: { title: string; body: string }[] };
  questions: { eyebrow: string; title: string; intro: string; items: { question: string; answer: string }[] };
  featuredResults: string[];
  cta: { eyebrow: string; title: string; body: string; button: string };
};

export const whyHireUs: Record<SiteLocale, WhyHireUsContent> = {
  en: {
    path: '/why-hire-us',
    title: 'Why Hire Kyle Scott Law',
    metaDescription:
      'Why hire Kyle Scott Law: a trial attorney since 1991, published results of $6.8M, $6M, and $5.75M, no fee unless there is a recovery, and a Tustin office serving Orange County in English and Spanish.',
    eyebrow: 'Straight answers before you decide',
    heading: 'Why hire Kyle Scott Law',
    lede: 'Choosing a lawyer after an injury is a decision most people make once, under pressure. This page sets out plainly how the firm works, what it costs, what happens in the first week, and the questions worth asking any lawyer you are considering.',
    reasons: [
      { title: 'You work with the attorney', body: 'Kyle Scott has practiced law in California since 1991 and has run his own firm since 2003. He takes the first call, reviews the file, and stays on the case; it is not handed to a case manager after the signing.' },
      { title: 'A trial record insurers recognize', body: 'The firm’s published results include a $6.8M school negligence settlement, a $6M abuse case, and a $5.75M brain injury verdict. Insurers price a claim on whether the lawyer will actually try it. Prior results do not guarantee a similar outcome.' },
      { title: en, body: 'The fee is a percentage agreed in writing before any work starts. The firm advances the case costs, from records to experts, while the case is pending.' },
      { title: 'Local, and in your language', body: 'The office is on Irvine Boulevard in Tustin, a short drive from the Orange County courthouse in Santa Ana where cases are filed. Consultations, documents, and updates are available in English and Spanish.' },
    ],
    fee: {
      eyebrow: 'How the fee works',
      title: 'Nothing up front, and the math is on paper before you sign.',
      intro: 'A contingency fee means the firm is paid from the recovery, not by you. The details are straightforward and written into the agreement:',
      points: [
        'The percentage is fixed in the written fee agreement before any work begins.',
        'The firm advances every case cost — records, investigators, experts, filing fees — while the case is pending.',
        'Medical bills and liens are negotiated and resolved from the settlement, not left for you afterward.',
        'At the end you receive a written settlement statement showing the recovery, the fee, the costs, and your net.',
        `${en}.`,
      ],
    },
    firstWeek: {
      eyebrow: 'What happens first',
      title: 'The first week, step by step.',
      steps: [
        { title: 'The call', body: 'A free, confidential conversation about what happened, who was involved, and what has been said to any insurer so far. You will get a plain answer about whether the firm can help.' },
        { title: 'The agreement', body: 'If the firm takes the case, the fee agreement and a short list of what is needed from you are explained line by line and signed electronically or in person.' },
        { title: 'Notices and deadlines', body: 'Insurers are notified that you are represented, so calls to you stop. Deadlines are calendared, including the six-month government claim if a public entity is involved.' },
        { title: 'Evidence', body: 'Police reports, footage, photographs, witness details, and medical records are requested before they disappear. Treatment continues on your schedule while the firm handles the paperwork.' },
      ],
    },
    questions: {
      eyebrow: 'Questions to ask any lawyer',
      title: 'Ask these before you hire anyone, including us.',
      intro: 'These are the questions the firm hears most often, with its answers. A lawyer who cannot answer them plainly is telling you something.',
      items: [
        { question: 'Who will actually handle my case?', answer: 'At Kyle Scott Law, the attorney. Kyle Scott reviews the facts, directs the investigation, negotiates with the insurer, and tries the case if it comes to that. Support staff help with records and scheduling; they do not run the case.' },
        { question: 'Have you taken cases like mine to trial?', answer: 'Yes. The firm’s published results include jury verdicts and settlements in vehicle collisions, falls, brain injuries, dog bites, medical malpractice, and abuse and school cases. Prior results do not guarantee a similar outcome, but trial experience is what insurers weigh.' },
        { question: 'What will it cost me?', answer: `Nothing up front. The fee is a percentage of the recovery, agreed in writing before work starts, and the firm advances the costs. ${en}.` },
        { question: 'How long will my case take?', answer: 'It depends on how long treatment takes and whether the insurer settles or a lawsuit is needed. Many claims resolve within months of treatment ending; litigated cases take longer. The firm gives an honest range once the medical picture is clear.' },
        { question: 'Should I talk to the insurance adjuster?', answer: 'Not before you have advice. Recorded statements and quick settlement offers are designed to limit the claim. Once the firm is retained, the insurer deals with the firm.' },
        { question: 'How will I know what is happening?', answer: 'Every call, letter, and deadline on the case is logged, and you can reach the office by phone or email. Bigger decisions, such as accepting or rejecting an offer, are always yours.' },
      ],
    },
    featuredResults: ['Elementary school boys molested by a teacher', 'Huntington Beach student molested by her teacher and coach', 'Student suffers skull fracture and brain bleed'],
    cta: {
      eyebrow: 'Free consultation',
      title: 'Talk to the attorney about your case.',
      body: 'Call 714-544-1460 or send the details through the form. Every inquiry is reviewed by the firm, and there is no fee unless there is a recovery.',
      button: 'Request a free consultation',
    },
  },
  es: {
    path: '/es/por-que-elegirnos',
    title: 'Por qué elegir a Kyle Scott Law',
    metaDescription:
      'Por qué elegir a Kyle Scott Law: abogado litigante desde 1991, resultados de $6.8M, $6M y $5.75M, sin honorarios a menos que haya recuperación, y oficina en Tustin con atención en español.',
    eyebrow: 'Respuestas claras antes de decidir',
    heading: 'Por qué elegir a Kyle Scott Law',
    lede: 'Elegir a un abogado después de una lesión es una decisión que la mayoría toma una sola vez y bajo presión. Esta página explica con claridad cómo trabaja el despacho, cuánto cuesta, qué ocurre en la primera semana y qué preguntas conviene hacerle a cualquier abogado que esté considerando.',
    reasons: [
      { title: 'Usted trabaja con el abogado', body: 'Kyle Scott ejerce el derecho en California desde 1991 y dirige su propio despacho desde 2003. Él atiende la primera llamada, revisa el expediente y sigue a cargo del caso; no se le entrega a un administrador de casos después de firmar.' },
      { title: 'Un historial de juicios que las aseguradoras reconocen', body: 'Los resultados publicados del despacho incluyen un acuerdo de $6.8M por negligencia escolar, un caso de abuso de $6M y un veredicto de $5.75M por lesión cerebral. Las aseguradoras valoran un reclamo según si el abogado realmente lo llevará a juicio. Los resultados anteriores no garantizan un resultado similar.' },
      { title: es, body: 'El honorario es un porcentaje acordado por escrito antes de empezar. El despacho adelanta los gastos del caso, desde expedientes hasta peritos, mientras el caso está en curso.' },
      { title: 'Local, y en su idioma', body: 'La oficina está en Irvine Boulevard, en Tustin, a poca distancia del tribunal del Condado de Orange en Santa Ana, donde se presentan los casos. Las consultas, los documentos y las actualizaciones están disponibles en español e inglés.' },
    ],
    fee: {
      eyebrow: 'Cómo funciona el honorario',
      title: 'Nada por adelantado, y las cuentas quedan por escrito antes de firmar.',
      intro: 'Un honorario de contingencia significa que el despacho cobra de la recuperación, no de usted. Los detalles son sencillos y quedan en el contrato:',
      points: [
        'El porcentaje se fija en el contrato de honorarios por escrito antes de que comience el trabajo.',
        'El despacho adelanta todos los gastos del caso: expedientes, investigadores, peritos y tarifas judiciales, mientras el caso está en curso.',
        'Las facturas médicas y los gravámenes se negocian y se resuelven del acuerdo, no se le dejan a usted después.',
        'Al final recibe un estado de cuenta por escrito que muestra la recuperación, el honorario, los gastos y su cantidad neta.',
        `${es}.`,
      ],
    },
    firstWeek: {
      eyebrow: 'Qué ocurre primero',
      title: 'La primera semana, paso a paso.',
      steps: [
        { title: 'La llamada', body: 'Una conversación gratuita y confidencial sobre lo que pasó, quiénes estuvieron involucrados y qué se le ha dicho a alguna aseguradora hasta ahora. Recibirá una respuesta clara sobre si el despacho puede ayudar.' },
        { title: 'El contrato', body: 'Si el despacho acepta el caso, el contrato de honorarios y una lista corta de lo que se necesita de usted se explican línea por línea y se firman electrónicamente o en persona.' },
        { title: 'Avisos y plazos', body: 'Se notifica a las aseguradoras que usted tiene representación, así que las llamadas a usted se detienen. Los plazos se registran en el calendario, incluido el reclamo gubernamental de seis meses si hay una entidad pública involucrada.' },
        { title: 'Las pruebas', body: 'Reportes policiales, video, fotografías, datos de testigos y expedientes médicos se solicitan antes de que desaparezcan. Su tratamiento continúa a su ritmo mientras el despacho se encarga del papeleo.' },
      ],
    },
    questions: {
      eyebrow: 'Preguntas para cualquier abogado',
      title: 'Haga estas preguntas antes de contratar a alguien, incluidos nosotros.',
      intro: 'Estas son las preguntas que el despacho escucha con más frecuencia, con sus respuestas. Un abogado que no puede responderlas con claridad le está diciendo algo.',
      items: [
        { question: '¿Quién va a manejar realmente mi caso?', answer: 'En Kyle Scott Law, el abogado. Kyle Scott revisa los hechos, dirige la investigación, negocia con la aseguradora y lleva el caso a juicio si es necesario. El personal de apoyo ayuda con expedientes y citas; no dirige el caso.' },
        { question: '¿Ha llevado casos como el mío a juicio?', answer: 'Sí. Los resultados publicados del despacho incluyen veredictos de jurado y acuerdos en choques de vehículos, caídas, lesiones cerebrales, mordeduras de perro, negligencia médica y casos de abuso y escuelas. Los resultados anteriores no garantizan un resultado similar, pero la experiencia en juicio es lo que las aseguradoras toman en cuenta.' },
        { question: '¿Cuánto me va a costar?', answer: `Nada por adelantado. El honorario es un porcentaje de la recuperación, acordado por escrito antes de empezar, y el despacho adelanta los gastos. ${es}.` },
        { question: '¿Cuánto tiempo tomará mi caso?', answer: 'Depende de cuánto dure el tratamiento y de si la aseguradora llega a un acuerdo o se necesita una demanda. Muchos reclamos se resuelven meses después de terminar el tratamiento; los casos litigados toman más tiempo. El despacho le dará un rango honesto cuando el panorama médico esté claro.' },
        { question: '¿Debo hablar con el ajustador de la aseguradora?', answer: 'No antes de recibir asesoría. Las declaraciones grabadas y las ofertas rápidas están diseñadas para limitar el reclamo. Una vez contratado el despacho, la aseguradora trata con el despacho.' },
        { question: '¿Cómo sabré qué está pasando?', answer: 'Cada llamada, carta y plazo del caso queda registrado, y puede comunicarse con la oficina por teléfono o correo electrónico. Las decisiones importantes, como aceptar o rechazar una oferta, siempre son suyas.' },
      ],
    },
    featuredResults: ['Elementary school boys molested by a teacher', 'Huntington Beach student molested by her teacher and coach', 'Student suffers skull fracture and brain bleed'],
    cta: {
      eyebrow: 'Consulta gratuita',
      title: 'Hable con el abogado sobre su caso.',
      body: 'Llame al 714-544-1460 o envíe los detalles por el formulario. El despacho revisa cada consulta, y no hay honorarios a menos que haya una recuperación.',
      button: 'Solicitar una consulta gratuita',
    },
  },
};
