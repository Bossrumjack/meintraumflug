export interface Flight {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  featured?: boolean;
}

export const FLIGHTS: Flight[] = [
  {
    id: 'lokal',
    image: '/assets/cards/card-cockpit.webp',
    title: 'Lokalrundflug',
    price: '149 €',
    duration: '30 Min.',
    description: 'Der ideale Einstieg in die Welt des Gyrocopters. Eine halbe Stunde über die Heimat – vom weiten Ebersberger Forst bis zur Allianz Arena. Vertraute Orte, plötzlich von oben gesehen.',
  },
  {
    id: 'entdeckung',
    image: '/assets/cards/card-castle.webp',
    title: 'Entdeckungsrunde',
    price: '199 €',
    duration: '45 Min.',
    description: 'Etwas weiter hinaus: 45 Minuten über sanfte Hügel und glitzernde Flusstäler bis ins mittelalterliche Wasserburg am Inn. Bayern, wie man es selten zu sehen bekommt.',
  },
  {
    id: 'erlebnis',
    image: '/assets/cards/card-rotor.webp',
    title: 'Erlebnisrundflug',
    price: '249 €',
    duration: '60 Min.',
    featured: true,
    description: 'Eine volle Stunde am Himmel mit dem Chiemsee als großem Höhepunkt. Sehen Sie, wie das „Bayerische Meer" mit seinen Inseln unter Ihnen aufblitzt.',
  },
  {
    id: 'highlight',
    image: '/assets/cards/card-highlight.webp',
    title: 'Highlightrundflug',
    price: '349 €',
    duration: '90 Min.',
    description: '90 Minuten pures Panorama: die große Chiemgaurunde mit funkelnden Seen, weiten Mooren und der gesamten Alpenkette am Horizont. Unser eindrucksvollstes Erlebnis.',
  },
];

export const NAV_LINKS = [
  { href: '#rundfluege',  label: 'Rundflüge' },
  { href: '#ueber-mich', label: 'Über mich' },
  { href: '#gutscheine', label: 'Gutscheine' },
  { href: '#kontakt-band', label: 'Kontakt' },
  { href: '#kontakt',    label: 'Gut zu wissen' },
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
