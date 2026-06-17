import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'de' | 'en';

/* ------------------------------------------------------------------ */
/* Translation data                                                    */
/* ------------------------------------------------------------------ */
const T = {
  de: {
    lang: 'de' as Lang,
    langToggle: 'EN',
    langLabel: 'Switch to English',
    nav: {
      book: 'Jetzt buchen',
      links: [
        { href: '#rundfluege',   label: 'Rundflüge' },
        { href: '#ueber-mich',   label: 'Über mich' },
        { href: '#gutscheine',   label: 'Gutscheine' },
        { href: '#kontakt-band', label: 'Kontakt' },
        { href: '#kontakt',      label: 'Gut zu wissen' },
      ],
    },
    hero: {
      eyebrow: 'Freiheit neu definiert',
      title: 'Erleben Sie Bayern von oben.',
      sub: 'Modernste Gyrocopter, ein persönlicher Pilot und Panoramen, die man nicht vergisst. Steigen Sie ein und entdecken Sie die Welt aus einer völlig neuen Perspektive.',
      cta: 'Flug wählen',
      showreel: 'Showreel ansehen',
      metaLocation: 'Standort',
      metaLocationValue: 'Straßham · Hohenlinden',
      metaDuration: 'Flugdauer',
      metaDurationValue: '30 – 90 Minuten',
      metaFrom: 'Ab',
      metaFromValue: '149 €',
      discover: 'Mehr entdecken',
      weather: {
        label: 'Flugwetter heute',
        wind: 'Wind',
        gusts: 'Böen',
        vis: 'Sicht',
        clouds: 'Wolken ab',
        go: 'Flugbereit',
        limited: 'Eingeschränkt',
        no: 'Kein Flugbetrieb',
        liveMetar: 'Live METAR',
        stationName: 'Straßham · Hohenlinden',
      },
    },
    experiences: {
      heading: 'Unsere Flugerlebnisse',
      select: 'Auswählen',
    },
    flights: [
      { id: 'lokal',      title: 'Lokalrundflug',    price: '149 €', duration: '30 Min.', description: 'Der ideale Einstieg in die Welt des Gyrocopters. Eine halbe Stunde über die Heimat – vom weiten Ebersberger Forst bis zur Allianz Arena. Vertraute Orte, plötzlich von oben gesehen.' },
      { id: 'entdeckung', title: 'Entdeckungsrunde', price: '199 €', duration: '45 Min.', description: 'Etwas weiter hinaus: 45 Minuten über sanfte Hügel und glitzernde Flusstäler bis ins mittelalterliche Wasserburg am Inn. Bayern, wie man es selten zu sehen bekommt.' },
      { id: 'erlebnis',   title: 'Erlebnisrundflug', price: '249 €', duration: '60 Min.', featured: true, description: 'Eine volle Stunde am Himmel mit dem Chiemsee als großem Höhepunkt. Sehen Sie, wie das „Bayerische Meer" mit seinen Inseln unter Ihnen aufblitzt.' },
      { id: 'highlight',  title: 'Highlightrundflug', price: '349 €', duration: '90 Min.', description: '90 Minuten pures Panorama: die große Chiemgaurunde mit funkelnden Seen, weiten Mooren und der gesamten Alpenkette am Horizont. Unser eindrucksvollstes Erlebnis.' },
    ],
    about: {
      eyebrow: 'Über mich',
      heading: 'Persönlich begleitet statt anonym vermittelt.',
      body: 'Hinter meintraumflug steht echte Begeisterung für das Fliegen. Mir ist wichtig, dass jeder Flug persönlich, ruhig und mit viel Gefühl für Sicherheit, Vorbereitung und dieses besondere Erlebnis startet.',
      stats: [
        { label: 'Fokus',    value: 'Sicherheit & Vertrauen' },
        { label: 'Erlebnis', value: 'Fliegen mit echter Nähe' },
        { label: 'Region',   value: 'Bayern aus neuer Perspektive' },
      ],
      promise: 'Mein Anspruch',
      promiseText: 'Jeder Gast soll nicht nur einen Rundflug buchen, sondern mit einem sicheren, persönlichen und unvergesslichen Gefühl wieder landen.',
      preflight: 'Vor jedem Start',
      preflightText: 'Einweisung, Fragen, Wetterlage und Flugroute werden gemeinsam besprochen – klar, persönlich und ohne Hektik.',
      imgPilotAlt: 'Pilot neben seinem silbernen Gyrocopter',
      imgGyroAlt: 'Silberner Gyrocopter auf der Startwiese',
    },
    voucher: {
      eyebrow: 'Gutscheine',
      heading: 'Verschenken Sie den Himmel über Bayern',
      body: 'Ihr Gutschein – persönlich gestaltet, mit eigenem Motiv und Grußwort. So einzigartig wie der Flug selbst, 3 Jahre gültig und flexibel einsetzbar.',
      points: ['Sofort-Download als PDF', 'Hochwertiger Postversand optional', 'Übertragbar auf alle Flugrouten'],
      cta: 'Gutschein gestalten',
      live: 'Live gestalten',
      demoRecipient: 'Anna',
      demoMessage: 'Alles Gute zum Geburtstag – Zeit zu fliegen!',
    },
    process: {
      heading: 'In drei Schritten in die Luft',
      steps: [
        { n: '01', title: 'Termin wählen',     body: 'Suchen Sie sich online oder telefonisch Ihren Wunschtermin für das Abenteuer aus.' },
        { n: '02', title: 'Briefing erhalten', body: 'Vor dem Start erhalten Sie eine Sicherheitseinweisung und Einblicke in die Technik des Gyrocopters.' },
        { n: '03', title: 'Abheben',           body: 'Genießen Sie den Flug. Sie können die Steuerung unter Aufsicht sogar selbst kurz übernehmen.' },
      ],
    },
    preparation: {
      eyebrow: 'Vorbereitung',
      heading: 'Alles, was Sie wissen müssen',
      intro: 'Von der Anreise bis zur Flugurkunde – hier finden Sie alle praktischen Informationen für einen rundum gelungenen Tag am Flugplatz.',
      arrivalEyebrow: 'Anreise',
      arrivalHeading: 'Straßham bei Hohenlinden',
      arrivalAddress: 'Straßham Ultralight Airfield\nStraßham · 85664 Hohenlinden',
      arrivalItems: [
        'Mit dem Auto: A94 Richtung Passau, Ausfahrt Hohenlinden, dann ca. 5 km Richtung Straßham.',
        'Kostenfreie Parkplätze direkt am Flugplatz vorhanden.',
        'Bei Fragen zur Anreise gerne vorab melden – ich helfe weiter.',
      ],
      packEyebrow: 'Was mitbringen',
      packHeading: 'Ihre Checkliste für den Flugtag',
      packItems: [
        'Bequeme, wettergerechte Kleidung – auch im Sommer kann es in der Luft frisch werden.',
        'Festes Schuhwerk (keine Sandalen oder Flip-Flops).',
        'Sonnenbrille und ggf. Mütze oder Kappe.',
        'Smartphone oder Kompaktkamera für Fotos – am besten mit Umhängeband.',
        'Bei Minderjährigen: Personalausweis oder Reisepass (Piloten-Nachweis).',
        'Ihr Buchungsnachweis oder Gutschein (digital reicht).',
      ],
      packTip: 'Tipp: Verpflegung und Getränke finden Sie direkt am Flugplatz-Café.',
      dayEyebrow: 'Ihr Flugtag',
      dayHeading: 'So läuft Ihr Gyrocopter-Erlebnis ab',
      dayAriaLabel: 'Ablauf des Flugtages',
      dayPhases: [
        { n: '1', title: 'Ankommen & Einweisung',  body: 'Bitte 15–20 Minuten früher da sein. Ihr Pilot begrüßt Sie am Check-in, geht die Flugroute durch und erklärt Ihnen die wichtigsten Bedienelemente.' },
        { n: '2', title: 'Abheben & Erleben',       body: 'Sie heben ab – und unter Ihnen öffnet sich Bayern. Auf Wunsch können Sie die Steuerung kurz selbst übernehmen. Ihr Pilot ist jederzeit dabei.' },
        { n: '3', title: 'Landen & Erinnern',       body: 'Nach der Landung erhalten Sie Ihre persönliche Flugurkunde als dauerhaftes Andenken. Fotos und Videos vom Flug nehmen Sie direkt auf Ihrem Smartphone mit.' },
      ],
      afterEyebrow: 'Nach dem Flug',
      afterHeading: 'Das Andenken an Ihren Flug',
      afterItems: [
        'Persönliche Flugurkunde mit Ihrem Namen, Datum und Flugroute – gedruckt und unterschrieben vom Piloten.',
        'Fotos und Videos, die Sie selbst während des Fluges gemacht haben.',
        'Auf Wunsch: Bewertung bei Google oder Feedback direkt ans Team.',
      ],
      wxEyebrow: 'Warum wir Flüge verschieben',
      wxHeading: 'Flugwetter – unsere Kriterien',
      wxIntro: 'Gyrocopter sind robust, aber wir fliegen nur, wenn die Bedingungen sicher und angenehm sind. Unsere Richtwerte:',
      wxRows: [
        { k: 'Wind / Böen', v: 'max. 18 kt (33 km/h)', note: 'Ab 25 kt: Kein Betrieb' },
        { k: 'Sicht',       v: 'mind. 8 km',           note: 'Unter 5 km: Kein Betrieb' },
        { k: 'Wolkenbasis', v: 'mind. 2.500 ft (760 m)', note: 'Unter 1.500 ft: Kein Betrieb' },
      ],
      wxNote: 'Bei Verschiebung wegen Wetter: kostenlose Umbuchung auf Ihren nächsten Wunschtermin.',
    },
    faq: {
      heading: 'Häufige Fragen',
      guteysHeading: 'Das sollten Sie vor dem Flug wissen',
      guteysEyebrow: 'Gut zu wissen',
      guteysNote: 'Offene Fragen zu Ihrer Eignung? Wir klären sie unkompliziert vor der Buchung – Sicherheit geht immer vor.',
      facts: [
        { k: 'Plätze',         v: '1 Passagier',  sub: 'Neben dem Piloten im Tandem-Cockpit' },
        { k: 'Max. Gewicht',   v: 'bis 90 kg',    sub: 'Pro Passagier, aus Sicherheitsgründen' },
        { k: 'Mindestalter',   v: 'ab 8 Jahren',  sub: 'Minderjährige mit Einverständnis der Eltern' },
        { k: 'Flughöhe',       v: 'bis 3.500 m',  sub: 'Rundflüge meist auf 300–600 m über Grund' },
      ],
      notes: [
        'Wetterabhängig – bei Wind, Sicht oder Wolken entscheidet die Sicherheit',
        'Bequeme Kleidung & feste Schuhe; Sonnenbrille empfohlen',
        'Nicht geeignet in der Schwangerschaft oder bei frischen OPs',
        'Körpergröße bis ca. 2,00 m problemlos möglich',
      ],
      notesLabel: 'Besonderheiten',
    },
    faqs: [
      { q: 'Was ist ein Gyrocopter?', a: 'Ein Gyrocopter – auch Tragschrauber genannt – erzeugt Auftrieb durch einen frei drehenden, nicht angetriebenen Rotor und nutzt einen separaten Motor für den Vortrieb. Er ist stabiler als ein Hubschrauber, kommt auf kürzester Strecke hoch und runter und gilt als besonders sicheres Luftfahrzeug.' },
      { q: 'Ist ein Gyrocopter sicher?', a: 'Gyrocopter gelten als besonders gutmütig im Flugverhalten und können selbst bei Motorausfall kontrolliert landen. Jeder Start beginnt mit einer ausführlichen Sicherheitseinweisung, und es wird ausschließlich bei geeigneten Wetterbedingungen geflogen.' },
      { q: 'Was passiert bei schlechtem Wetter?', a: 'Bei ungeeignetem Wetter – zu starkem Wind, schlechter Sicht oder tiefen Wolken – verschieben wir Ihren Flug kostenlos auf einen neuen Wunschtermin. Sicherheit geht immer vor, und das aktuelle Flugwetter sehen Sie live im Wetterindikator auf dieser Seite.' },
      { q: 'Darf ich selbst steuern?', a: 'Ja! Während des Fluges können Sie die Steuerung kurz selbst übernehmen und einen echten Gyrocopter durch den Himmel lenken – natürlich immer unter direkter Aufsicht und mit jederzeiter Übernahme durch den Piloten.' },
      { q: 'Was muss ich gesundheitlich beachten?', a: 'Gyrocopter-Flüge sind für die meisten Menschen problemlos möglich. Nicht geeignet sind Flüge kurz nach Operationen, in der Schwangerschaft oder bei schweren Herzrhythmusstörungen. Im Zweifel sprechen Sie uns einfach vor der Buchung an – wir klären das unkompliziert.' },
      { q: 'Gibt es eine Gewichtsbeschränkung?', a: 'Aus Sicherheitsgründen gilt eine Obergrenze von 90 kg, die wir bei der Buchung gemeinsam unkompliziert klären.' },
      { q: 'Darf ich Fotos und Videos machen?', a: 'Natürlich! Bringen Sie Ihr Smartphone oder eine Kompaktkamera mit. Empfehlung: eine kurze Schlaufe, damit die Kamera sicher ist. Als dauerhaftes Andenken erhalten Sie außerdem eine persönliche Flugurkunde.' },
      { q: 'Wie lange ist ein Gutschein gültig?', a: 'Alle Wertgutscheine sind drei Jahre gültig und flexibel auf alle Flugrouten übertragbar.' },
    ],
    contact: {
      eyebrow: 'Kontakt',
      heading: 'Fragen? Sprechen Sie mit mir.',
      pilotName: 'Ihr Pilot',
      responseNote: 'Ich gehe selbst ans Telefon — Antwort meist in unter 2 Stunden. Kein Callcenter, keine Warteschleife — bei meintraumflug erreichen Sie direkt den Piloten.',
      whatsappLabel: 'WhatsApp',
      whatsappValue: 'Chat starten',
      whatsappHint: 'Schnellste Antwort',
      phoneLabel: 'Anrufen',
      phoneHint: 'Direkt zum Piloten',
      emailLabel: 'E-Mail',
      emailHint: 'Für ausführliche Anfragen & Gutscheine',
      callbackLabel: 'Lieber zurückgerufen werden?',
      callbackPlaceholder: 'Ihre Telefonnummer',
      callbackSubmit: 'Ruf mich an',
      callbackConfirm: (num: string) => `Danke! Ich rufe Sie schnellstmöglich unter ${num} zurück.`,
    },
    footer: {
      tagline: 'Exklusive Gyrocopter-Flüge im Herzen von Bayern. Präzision in jedem Detail.',
      copyright: '© 2026 meintraumflug GmbH. Alle Rechte vorbehalten.',
      cols: [
        { title: 'Navigation', links: [
          { label: 'Rundflüge',  href: '#rundfluege' },
          { label: 'Über mich',  href: '#ueber-mich' },
          { label: 'Gutscheine', href: '#gutscheine'  },
          { label: 'Ablauf',     href: '#ablauf'      },
        ]},
        { title: 'Rechtliches', links: [
          { label: 'Impressum',   href: '#impressum'   },
          { label: 'Datenschutz', href: '#datenschutz' },
          { label: 'AGB',         href: '#agb'         },
        ]},
        { title: 'Kontakt', links: [
          { label: 'Straßham bei Hohenlinden', href: 'https://maps.google.com/?q=Stra%C3%9Fham+Ultraleichtflugplatz,+Hohenlinden' },
          { label: '+49 (0) 89 123 456 78',      href: 'tel:+498912345678' },
          { label: 'info@meintraumflug.de',      href: 'mailto:info@meintraumflug.de' },
        ]},
      ],
    },
    skipLink: 'Zum Inhalt springen',
    showreelToast: 'Showreel folgt – Footage in Arbeit',
  },

  /* ── English ────────────────────────────────────────────────────── */
  en: {
    lang: 'en' as Lang,
    langToggle: 'DE',
    langLabel: 'Zu Deutsch wechseln',
    nav: {
      book: 'Book now',
      links: [
        { href: '#rundfluege',   label: 'Scenic Flights' },
        { href: '#ueber-mich',   label: 'About' },
        { href: '#gutscheine',   label: 'Gift Vouchers' },
        { href: '#kontakt-band', label: 'Contact' },
        { href: '#kontakt',      label: 'Good to know' },
      ],
    },
    hero: {
      eyebrow: 'Freedom redefined',
      title: 'Experience Bavaria from above.',
      sub: 'State-of-the-art gyrocopters, a personal pilot, and panoramas you will never forget. Step in and discover the world from a whole new perspective.',
      cta: 'Choose a flight',
      showreel: 'Watch showreel',
      metaLocation: 'Location',
      metaLocationValue: 'Straßham · Hohenlinden',
      metaDuration: 'Flight duration',
      metaDurationValue: '30 – 90 minutes',
      metaFrom: 'From',
      metaFromValue: '€149',
      discover: 'Discover more',
      weather: {
        label: 'Flight weather today',
        wind: 'Wind',
        gusts: 'Gusts',
        vis: 'Visibility',
        clouds: 'Clouds from',
        go: 'Ready to fly',
        limited: 'Limited',
        no: 'No operations',
        liveMetar: 'Live METAR',
        stationName: 'Straßham · Hohenlinden',
      },
    },
    experiences: {
      heading: 'Our flight experiences',
      select: 'Select',
    },
    flights: [
      { id: 'lokal',      title: 'Local Scenic Flight',    price: '€149', duration: '30 min.', description: 'The ideal introduction to the world of gyrocopters. Half an hour over the homeland — from the vast Ebersberg Forest to the Allianz Arena. Familiar places, suddenly seen from above.' },
      { id: 'entdeckung', title: 'Discovery Round',        price: '€199', duration: '45 min.', description: 'A little further out: 45 minutes over gentle hills and glittering river valleys to the medieval town of Wasserburg am Inn. Bavaria, as you rarely get to see it.' },
      { id: 'erlebnis',   title: 'Experience Scenic Flight', price: '€249', duration: '60 min.', featured: true, description: 'A full hour in the sky with the Chiemsee as the grand highlight. Watch the "Bavarian Sea" and its islands flash beneath you.' },
      { id: 'highlight',  title: 'Highlight Scenic Flight', price: '€349', duration: '90 min.', description: '90 minutes of pure panorama: the great Chiemgau loop with sparkling lakes, wide moors, and the entire Alpine chain on the horizon. Our most impressive experience.' },
    ],
    about: {
      eyebrow: 'About me',
      heading: 'Personal guidance, not anonymous booking.',
      body: 'meintraumflug is driven by a genuine passion for flying. Every flight starts personally, calmly, and with great care for safety, preparation, and that special experience.',
      stats: [
        { label: 'Focus',      value: 'Safety & trust' },
        { label: 'Experience', value: 'Flying with real closeness' },
        { label: 'Region',     value: 'Bavaria from a new angle' },
      ],
      promise: 'My promise',
      promiseText: 'Every guest should not just book a sightseeing flight, but land again with a sense of safety, personal connection, and an unforgettable memory.',
      preflight: 'Before every takeoff',
      preflightText: 'Briefing, questions, current weather and the flight route are discussed together — clearly, personally, and without any rush.',
      imgPilotAlt: 'Pilot next to his silver gyrocopter',
      imgGyroAlt: 'Silver gyrocopter on the airfield',
    },
    voucher: {
      eyebrow: 'Gift Vouchers',
      heading: 'Give the skies above Bavaria',
      body: 'Your voucher — personalised with your own motif and message. As unique as the flight itself, valid for 3 years, and transferable to any route.',
      points: ['Instant PDF download', 'Premium postal delivery optional', 'Transferable to all flight routes'],
      cta: 'Design a voucher',
      live: 'Customise live',
      demoRecipient: 'Anna',
      demoMessage: 'Happy Birthday – time to fly!',
    },
    process: {
      heading: 'Three steps to take off',
      steps: [
        { n: '01', title: 'Choose a date',      body: 'Pick your preferred date and time online or by phone — whenever suits you best.' },
        { n: '02', title: 'Receive briefing',   body: 'Before takeoff you receive a full safety briefing and an introduction to the gyrocopter.' },
        { n: '03', title: 'Take off',           body: 'Enjoy the flight. Under supervision you can even take the controls for a moment yourself.' },
      ],
    },
    preparation: {
      eyebrow: 'Preparation',
      heading: 'Everything you need to know',
      intro: 'From arrival to flight certificate — here you will find all the practical information for a perfect day at the airfield.',
      arrivalEyebrow: 'Getting there',
      arrivalHeading: 'Straßham bei Hohenlinden',
      arrivalAddress: 'Straßham Ultralight Airfield\nStraßham · 85664 Hohenlinden, Germany',
      arrivalItems: [
        'By car: A94 towards Passau, exit Hohenlinden, then approx. 5 km towards Straßham.',
        'Free parking directly at the airfield.',
        'Questions about directions? Feel free to get in touch — happy to help.',
      ],
      packEyebrow: 'What to bring',
      packHeading: 'Your flight-day checklist',
      packItems: [
        'Comfortable, weather-appropriate clothing — even in summer it can be fresh up in the air.',
        'Sturdy footwear (no sandals or flip-flops).',
        'Sunglasses and optionally a hat or cap.',
        'Smartphone or compact camera for photos — ideally with a wrist strap.',
        'For minors: ID card or passport (required by regulations).',
        'Your booking confirmation or voucher (digital is fine).',
      ],
      packTip: 'Tip: Refreshments and drinks are available at the airfield café.',
      dayEyebrow: 'Your flight day',
      dayHeading: 'How your gyrocopter experience unfolds',
      dayAriaLabel: 'Flight day itinerary',
      dayPhases: [
        { n: '1', title: 'Arrival & Briefing',  body: 'Please arrive 15–20 minutes early. Your pilot greets you at check-in, runs through the route and explains the key controls.' },
        { n: '2', title: 'Takeoff & Experience', body: 'You take off — and Bavaria opens up below you. On request, you can briefly take the controls. Your pilot is always right there.' },
        { n: '3', title: 'Landing & Memories',  body: 'After landing you receive your personal flight certificate as a lasting keepsake. Photos and videos you took on the flight are yours to keep.' },
      ],
      afterEyebrow: 'After the flight',
      afterHeading: 'Your souvenir from the skies',
      afterItems: [
        'Personal flight certificate with your name, date and route — printed and signed by your pilot.',
        'Photos and videos you captured yourself during the flight.',
        'Optional: leave a Google review or send feedback directly to the team.',
      ],
      wxEyebrow: 'Why we reschedule flights',
      wxHeading: 'Flight weather — our criteria',
      wxIntro: 'Gyrocopters are robust, but we only fly when conditions are safe and comfortable. Our benchmarks:',
      wxRows: [
        { k: 'Wind / Gusts', v: 'max. 18 kt (33 km/h)', note: 'From 25 kt: no ops' },
        { k: 'Visibility',   v: 'min. 8 km',            note: 'Below 5 km: no ops' },
        { k: 'Cloud base',   v: 'min. 2,500 ft (760 m)', note: 'Below 1,500 ft: no ops' },
      ],
      wxNote: 'If postponed due to weather: free rebooking to your next preferred date.',
    },
    faq: {
      heading: 'Frequently asked questions',
      guteysHeading: 'What to know before your flight',
      guteysEyebrow: 'Good to know',
      guteysNote: 'Questions about your suitability? We clarify everything simply before booking — safety always comes first.',
      facts: [
        { k: 'Seats',        v: '1 passenger',   sub: 'Next to the pilot in a tandem cockpit' },
        { k: 'Max. weight',  v: 'up to 90 kg',   sub: 'Per passenger, for safety reasons' },
        { k: 'Min. age',     v: 'from 8 years',  sub: 'Minors with parental consent' },
        { k: 'Flight altitude', v: 'up to 3,500 m', sub: 'Tours usually at 300–600 m AGL' },
      ],
      notes: [
        'Weather-dependent — wind, visibility, or clouds determine safety',
        'Comfortable clothing & sturdy shoes; sunglasses recommended',
        'Not suitable during pregnancy or shortly after surgery',
        'Height up to approx. 2.00 m presents no issues',
      ],
      notesLabel: 'Important notes',
    },
    faqs: [
      { q: 'What is a gyrocopter?', a: 'A gyrocopter — also called an autogyro — generates lift using a freely rotating, unpowered rotor and uses a separate engine for thrust. It is more stable than a helicopter, takes off and lands in very short distances, and is considered an exceptionally safe aircraft.' },
      { q: 'Is a gyrocopter safe?', a: 'Gyrocopters are known for their forgiving flight characteristics and can land in a controlled manner even in the event of an engine failure. Every flight starts with a thorough safety briefing, and we only fly in appropriate weather conditions.' },
      { q: 'What happens in bad weather?', a: 'In unsuitable weather — too much wind, poor visibility, or low clouds — we reschedule your flight free of charge to a new preferred date. Safety always comes first, and you can check the current flight weather live in the weather indicator on this page.' },
      { q: 'Can I take the controls?', a: 'Yes! During the flight you can briefly take the controls and steer a real gyrocopter through the sky — always under direct supervision with the pilot ready to take over at any moment.' },
      { q: 'Any health considerations?', a: 'Gyrocopter flights are fine for most people. They are not recommended shortly after surgery, during pregnancy, or with serious cardiac arrhythmias. If in doubt, just contact us before booking — we will sort it out without any fuss.' },
      { q: 'Is there a weight limit?', a: 'For safety reasons there is an upper limit of 90 kg, which we sort out together without any fuss at the time of booking.' },
      { q: 'Can I take photos and videos?', a: 'Of course! Bring your smartphone or a compact camera. Tip: use a short wrist strap to keep it safe. As a lasting memento you will also receive a personal flight certificate.' },
      { q: 'How long is a voucher valid?', a: 'All vouchers are valid for three years and can be freely transferred to any flight route.' },
    ],
    contact: {
      eyebrow: 'Contact',
      heading: 'Questions? Talk to me.',
      pilotName: 'Your pilot',
      responseNote: 'I answer the phone myself — usually responding within 2 hours. No call centre, no hold music — at meintraumflug you reach the pilot directly.',
      whatsappLabel: 'WhatsApp',
      whatsappValue: 'Start a chat',
      whatsappHint: 'Fastest response',
      phoneLabel: 'Call',
      phoneHint: 'Directly to your pilot',
      emailLabel: 'Email',
      emailHint: 'For detailed enquiries & vouchers',
      callbackLabel: 'Prefer a callback?',
      callbackPlaceholder: 'Your phone number',
      callbackSubmit: 'Call me back',
      callbackConfirm: (num: string) => `Thank you! I will call you back at ${num} as soon as possible.`,
    },
    footer: {
      tagline: 'Exclusive gyrocopter flights in the heart of Bavaria. Precision in every detail.',
      copyright: '© 2026 meintraumflug GmbH. All rights reserved.',
      cols: [
        { title: 'Navigation', links: [
          { label: 'Scenic flights', href: '#rundfluege' },
          { label: 'About',          href: '#ueber-mich' },
          { label: 'Gift vouchers',  href: '#gutscheine'  },
          { label: 'Process',        href: '#ablauf'      },
        ]},
        { title: 'Legal', links: [
          { label: 'Imprint',       href: '#impressum'   },
          { label: 'Privacy',       href: '#datenschutz' },
          { label: 'Terms',         href: '#agb'         },
        ]},
        { title: 'Contact', links: [
          { label: 'Straßham bei Hohenlinden', href: 'https://maps.google.com/?q=Stra%C3%9Fham+Ultraleichtflugplatz,+Hohenlinden' },
          { label: '+49 (0) 89 123 456 78',     href: 'tel:+498912345678' },
          { label: 'info@meintraumflug.de',     href: 'mailto:info@meintraumflug.de' },
        ]},
      ],
    },
    skipLink: 'Skip to content',
    showreelToast: 'Showreel coming soon — footage in progress',
  },
} as const;

export type Translations = typeof T.de;

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

interface LangCtxValue {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LangCtx = createContext<LangCtxValue>({
  lang: 'de',
  t: T.de,
  toggle: () => undefined,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');
  const toggle = () => setLang((l) => (l === 'de' ? 'en' : 'de'));
  return (
    <LangCtx.Provider value={{ lang, t: T[lang] as unknown as Translations, toggle }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}
