export interface Flight {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  featured?: boolean;
}

export const FLIGHTS: Flight[] = [
  {
    id: 'schnupper',
    image: '/assets/cards/card-cockpit.png',
    title: 'Schnupperflug',
    price: '149 €',
    description: 'Der perfekte Einstieg. 30 Minuten pure Faszination inklusive Einweisung in die Technik.',
  },
  {
    id: 'alpen',
    image: '/assets/cards/card-rotor.png',
    title: 'Alpenrundflug',
    price: '279 €',
    featured: true,
    description: '60 Minuten atemberaubende Panoramaausblicke über die Zugspitze und das Voralpenland.',
  },
  {
    id: 'schloesser',
    image: '/assets/cards/card-castle.png',
    title: 'Schlössertour',
    price: '399 €',
    description: 'Königliche Perspektiven. 90 Minuten Flugzeit über Neuschwanstein und Hohenschwangau.',
  },
];

export const NAV_LINKS = [
  { href: '#rundfluege',    label: 'Rundflüge' },
  { href: '#ueber-mich',   label: 'Über mich' },
  { href: '#gutscheine',   label: 'Gutscheine' },
  { href: '#vorbereitung', label: 'Vorbereitung' },
  { href: '#kontakt-band', label: 'Kontakt' },
];

export const FAQS = [
  { q: 'Was ist ein Gyrocopter?', a: 'Ein Gyrocopter – auch Tragschrauber genannt – erzeugt Auftrieb durch einen frei drehenden, nicht angetriebenen Rotor und nutzt einen separaten Motor für den Vortrieb. Er ist stabiler als ein Hubschrauber, kommt auf kürzester Strecke hoch und runter und gilt als besonders sicheres Luftfahrzeug.' },
  { q: 'Ist ein Gyrocopter sicher?', a: 'Gyrocopter gelten als besonders gutmütig im Flugverhalten und können selbst bei Motorausfall kontrolliert landen. Jeder Start beginnt mit einer ausführlichen Sicherheitseinweisung, und es wird ausschließlich bei geeigneten Wetterbedingungen geflogen.' },
  { q: 'Was passiert bei schlechtem Wetter?', a: 'Bei ungeeignetem Wetter – zu starkem Wind, schlechter Sicht oder tiefen Wolken – verschieben wir Ihren Flug kostenlos auf einen neuen Wunschtermin. Sicherheit geht immer vor, und das aktuelle Flugwetter sehen Sie live im Wetterindikator auf dieser Seite.' },
  { q: 'Darf ich selbst steuern?', a: 'Ja! Während des Fluges können Sie die Steuerung kurz selbst übernehmen und einen echten Gyrocopter durch den Himmel lenken – natürlich immer unter direkter Aufsicht und mit jederzeiter Übernahme durch den Piloten.' },
  { q: 'Was muss ich gesundheitlich beachten?', a: 'Gyrocopter-Flüge sind für die meisten Menschen problemlos möglich. Nicht geeignet sind Flüge kurz nach Operationen, in der Schwangerschaft oder bei schweren Herzrhythmusstörungen. Im Zweifel sprechen Sie uns einfach vor der Buchung an – wir klären das unkompliziert.' },
  { q: 'Gibt es eine Gewichtsbeschränkung?', a: 'Aus Sicherheitsgründen gilt eine Obergrenze von 110 kg, die wir bei der Buchung gemeinsam unkompliziert klären.' },
  { q: 'Darf ich Fotos und Videos machen?', a: 'Natürlich! Bringen Sie Ihr Smartphone oder eine Kompaktkamera mit. Empfehlung: eine kurze Schlaufe, damit die Kamera sicher ist. Als dauerhaftes Andenken erhalten Sie außerdem eine persönliche Flugurkunde.' },
  { q: 'Wie lange ist ein Gutschein gültig?', a: 'Alle Wertgutscheine sind drei Jahre gültig und flexibel auf alle Flugrouten übertragbar.' },
];

export const STEPS = [
  { n: '1', title: 'Termin wählen',     body: 'Suchen Sie sich online oder telefonisch Ihren Wunschtermin für das Abenteuer aus.' },
  { n: '2', title: 'Briefing erhalten', body: 'Vor dem Start erhalten Sie eine Sicherheitseinweisung und Einblicke in die Technik des Gyrocopters.' },
  { n: '3', title: 'Abheben',           body: 'Genießen Sie den Flug. Sie können die Steuerung unter Aufsicht sogar selbst kurz übernehmen.' },
];
