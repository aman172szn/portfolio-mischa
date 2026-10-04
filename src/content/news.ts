export type Locale = 'de' | 'en';

export type PublicNewsItem = {
  slug: string;
  title: Record<Locale, string>;
  source: string;
  context: Record<Locale, string>;
  category: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string[]>;
  sourceUrl?: string;
  featured?: boolean;
};

export const newsItems: PublicNewsItem[] = [
  {
    slug: 'moby-dick-deutschlandfunk',
    title: {
      de: 'Deutschlandfunk ueber Moby Dick',
      en: 'Deutschlandfunk on Moby Dick',
    },
    source: 'Deutschlandfunk',
    context: {
      de: 'Youth Opera: Moby Dick',
      en: 'Youth opera: Moby Dick',
    },
    category: {
      de: 'Presse',
      en: 'Press',
    },
    excerpt: {
      de: 'Mischa Tangian fange die Stimmung an Bord der Pequod abwechslungsreich und atmosphaerisch ein und arbeite mit einer schillernden Klangpalette.',
      en: 'Deutschlandfunk describes the score as varied and atmospheric, with a shimmering palette for the psychological depth of Melville\'s novel.',
    },
    body: {
      de: [
        'Deutschlandfunk hebt die atmosphaerische Anlage von Moby Dick hervor. Die Musik wird als abwechslungsreiche Klangwelt beschrieben, die die psychologische Tiefe von Melvilles Roman auf die Buehne bringt.',
        'Besonders betont wird, dass Tangian abseits musikalischer Klischees arbeitet und die Stimmung an Bord des Walfangschiffs Pequod mit einer schillernden Palette fasst.',
      ],
      en: [
        'Deutschlandfunk highlights the atmospheric design of Moby Dick. The music is described as a varied sound world that brings the psychological depth of Melville\'s novel onto the stage.',
        'The review emphasizes Tangian\'s distance from musical cliches and his use of a shimmering palette to capture the mood aboard the whaling ship Pequod.',
      ],
    },
    featured: true,
  },
  {
    slug: 'moby-dick-salzburger-nachrichten',
    title: {
      de: 'Salzburger Nachrichten ueber Moby Dick',
      en: 'Salzburger Nachrichten on Moby Dick',
    },
    source: 'Salzburger Nachrichten',
    context: {
      de: 'Youth Opera: Moby Dick',
      en: 'Youth opera: Moby Dick',
    },
    category: {
      de: 'Presse',
      en: 'Press',
    },
    excerpt: {
      de: 'Tangian bricht die herkoemmliche Opernformel auf und experimentiert mit Rhythmen nahe am Puls heutiger Strassenszenen.',
      en: 'The Austrian review notes how Tangian breaks open conventional opera formulas and experiments with street-scene rhythms.',
    },
    body: {
      de: [
        'Die Salzburger Nachrichten beschreiben Moby Dick als bewusste Abkehr von der herkoemmlichen Opernformel.',
        'Die Kritik verweist auf rhythmische Experimente, die nahe am Puls heutiger Strassenszenen liegen, und benennt zugleich die herausfordernde avantgardistische Instrumentation.',
      ],
      en: [
        'Salzburger Nachrichten frames Moby Dick as a deliberate break with conventional opera formulas.',
        'The review points to rhythmic experiments close to the heartbeat of today\'s street scene, while also noting the challenging avant-garde edge of the instrumentation.',
      ],
    },
    featured: true,
  },
  {
    slug: 'moby-dick-sueddeutsche-zeitung',
    title: {
      de: 'Sueddeutsche Zeitung ueber Moby Dick',
      en: 'Sueddeutsche Zeitung on Moby Dick',
    },
    source: 'Sueddeutsche Zeitung',
    context: {
      de: 'Youth Opera: Moby Dick',
      en: 'Youth opera: Moby Dick',
    },
    category: {
      de: 'Presse',
      en: 'Press',
    },
    excerpt: {
      de: 'Die Partitur verzichtet bewusst auf gefaellige Kindertheater-Melodik und verlangt Konzentration durch Rhythmusverschiebungen und Dissonanzen.',
      en: 'The review describes a demanding score that avoids easy children\'s-theatre melody in favor of rhythmic shifts and dissonance.',
    },
    body: {
      de: [
        'Die Sueddeutsche Zeitung betont den anspruchsvollen Charakter von Moby Dick.',
        'Tangians Musik verzichte bewusst auf gefaellige Kindertheater-Melodik. Rhythmische Verschiebungen und gezielte Dissonanzen fordern die jungen Hoererinnen und Hoerer heraus.',
      ],
      en: [
        'Sueddeutsche Zeitung emphasizes the demanding nature of Moby Dick.',
        'Tangian\'s music is described as deliberately avoiding easy children\'s-theatre melody. Rhythmic shifts and intentional dissonance ask young listeners to concentrate closely.',
      ],
    },
  },
  {
    slug: 'theater-der-zeit-fragmentation',
    title: {
      de: 'Theater der Zeit ueber Rhythmus und Fragment',
      en: 'Theater der Zeit on rhythm and fragmentation',
    },
    source: 'Theater der Zeit',
    context: {
      de: 'Musiktheater / Kammeroper',
      en: 'Music theatre / chamber opera',
    },
    category: {
      de: 'Presse',
      en: 'Press',
    },
    excerpt: {
      de: 'Ein spannendes Experiment zur Rhythmisierung von Sprache, das den klassischen Begriff von Theatermusik radikal hinterfragt.',
      en: 'Theatre der Zeit describes an experiment in rhythmic language that radically questions the classical idea of theatre music.',
    },
    body: {
      de: [
        'Theater der Zeit beschreibt Tangians kompositorischen Ansatz als hochmodern und dekonstruiert.',
        'Die Komposition verharre oft im Zustand des Fragmentarischen. Motive werden beruehrt und unmittelbar zurueckgeworfen - ein Experiment, das Sprache rhythmisiert und Theatermusik neu befragt.',
      ],
      en: [
        'Theater der Zeit describes Tangian\'s compositional approach as highly modern and deconstructed.',
        'The composition is said to remain in a state of fragmentation, touching motifs only to throw them back immediately. The result is an experiment in rhythmic language and a radical questioning of theatre music.',
      ],
    },
  },
  {
    slug: 'die-nacht-der-seeigel-die-welt',
    title: {
      de: 'Die Welt ueber Die Nacht der Seeigel',
      en: 'Die Welt on Die Nacht der Seeigel',
    },
    source: 'Die Welt',
    context: {
      de: 'Kammeroper: Die Nacht der Seeigel',
      en: 'Chamber opera: Die Nacht der Seeigel',
    },
    category: {
      de: 'Kritik',
      en: 'Review',
    },
    excerpt: {
      de: 'Die Kritik beschreibt akustisch faszinierende Welten und eine sensible musikalische Handschrift fuer innere seelische Raeume.',
      en: 'The review points to fascinating acoustic worlds and a sensitive musical language for inner psychological spaces.',
    },
    body: {
      de: [
        'Die Welt beschreibt Die Nacht der Seeigel als Stueck ueber Isolation und die Suche nach Naehe.',
        'Im Mittelpunkt der Wahrnehmung steht eine musikalische Handschrift, die moderne Oper mit inneren seelischen Raeumen verbindet und akustisch faszinierende Welten oeffnet.',
      ],
      en: [
        'Die Welt describes Die Nacht der Seeigel as a piece about isolation and the search for closeness.',
        'The review focuses on a musical language that connects modern opera with inner psychological spaces and opens fascinating acoustic worlds.',
      ],
    },
  },
  {
    slug: 'in-absentia-deutsche-oper-berlin',
    title: {
      de: 'Deutsche Oper Berlin ueber in absentia',
      en: 'Deutsche Oper Berlin on in absentia',
    },
    source: 'Deutsche Oper Berlin',
    context: {
      de: 'Neue Szenen II',
      en: 'Neue Szenen II',
    },
    category: {
      de: 'Auszeichnung',
      en: 'Award',
    },
    excerpt: {
      de: 'in absentia wird als packendes musikalisches Kammerspiel zwischen klanglicher Zerbrechlichkeit und orchestraler Wucht beschrieben.',
      en: 'in absentia is described as gripping chamber music theatre between sonic fragility and orchestral force.',
    },
    body: {
      de: [
        'Die Deutsche Oper Berlin stellte in absentia im Kontext von Neue Szenen II vor.',
        'Die Partitur wird als virtuos pendelnd zwischen klanglicher Zerbrechlichkeit und orchestraler Wucht beschrieben.',
      ],
      en: [
        'Deutsche Oper Berlin presented in absentia in the context of Neue Szenen II.',
        'The score is described as moving virtuously between sonic fragility and orchestral force.',
      ],
    },
  },
  {
    slug: 'the-order-of-time-staatsoper-stuttgart',
    title: {
      de: 'Staatsoper Stuttgart ueber The Order of Time',
      en: 'Staatsoper Stuttgart on The Order of Time',
    },
    source: 'Staatsoper Stuttgart',
    context: {
      de: 'Symphonische Komposition',
      en: 'Symphonic composition',
    },
    category: {
      de: 'Programmnotiz',
      en: 'Program note',
    },
    excerpt: {
      de: 'The Order of Time wird als organischer Dialog zwischen europaeischen und nicht-europaeischen Musikkulturen beschrieben.',
      en: 'The Order of Time is described as an organic dialogue between European and non-European musical cultures.',
    },
    body: {
      de: [
        'Die Staatsoper Stuttgart beschreibt The Order of Time als Begegnung, in der europaeische und nicht-europaeische Musikkulturen einander wirklich treffen.',
        'Die Programmnotiz hebt einen anspruchsvollen, organischen Dialog hervor.',
      ],
      en: [
        'Staatsoper Stuttgart describes The Order of Time as an encounter where European and non-European musical cultures truly meet.',
        'The program note emphasizes a sophisticated, organic dialogue.',
      ],
    },
  },
  {
    slug: 'babylon-orchestra-schallplattenkritik',
    title: {
      de: 'Preis der deutschen Schallplattenkritik fuer Babylon ORCHESTRA',
      en: 'German Record Critics\' Award recognition for Babylon ORCHESTRA',
    },
    source: 'Preis der deutschen Schallplattenkritik',
    context: {
      de: 'Babylon ORCHESTRA Debuetalbum',
      en: 'Babylon ORCHESTRA debut album',
    },
    category: {
      de: 'Auszeichnung',
      en: 'Award',
    },
    excerpt: {
      de: 'Das Debuetalbum besticht durch geschickte, unverkrampfte, jazzig inspirierte Arrangements, die Musiker aus Mittelmeerraum und Europa verbinden.',
      en: 'The debut album is noted for relaxed, skillful, jazz-inspired arrangements connecting musicians from the Mediterranean region and Europe.',
    },
    body: {
      de: [
        'Das von Mischa Tangian produzierte Debuetalbum des Babylon ORCHESTRA wurde in der Bestenliste des Preises der deutschen Schallplattenkritik hervorgehoben.',
        'Im Fokus stehen geschickte, unverkrampfte und jazzig inspirierte Arrangements, die Musikerinnen und Musiker aus dem Mittelmeerraum und Europa verbinden.',
      ],
      en: [
        'The Babylon ORCHESTRA debut album produced by Mischa Tangian was recognized by the German Record Critics\' Award Bestenliste.',
        'The note highlights skillful, relaxed, jazz-inspired arrangements that connect musicians from the Mediterranean region and Europe.',
      ],
    },
    sourceUrl: 'https://www.babylonorchestra.com/',
  },
  {
    slug: 'babylon-orchestra-globalsounds',
    title: {
      de: 'Globalsounds.info ueber Babylon ORCHESTRA',
      en: 'Globalsounds.info on Babylon ORCHESTRA',
    },
    source: 'Globalsounds.info',
    context: {
      de: 'Orchestrale Fusion-Kompositionen',
      en: 'Orchestral fusion compositions',
    },
    category: {
      de: 'Rezension',
      en: 'Review',
    },
    excerpt: {
      de: 'Die Kompositionen werden durch unverkrampfte, jazzig inspirierte Arrangements zusammengehalten und formen einen dynamischen Weltensound.',
      en: 'The review describes a dynamic world sound shaped by relaxed, jazz-inspired arrangements.',
    },
    body: {
      de: [
        'Globalsounds.info beschreibt die Arbeit des Babylon ORCHESTRA als dynamisch und facettenreich.',
        'Die Kompositionen werden durch geschickte, unverkrampfte, jazzig inspirierte Arrangements zusammengehalten und schaffen einen stimmigen Weltensound.',
      ],
      en: [
        'Globalsounds.info describes the Babylon ORCHESTRA work as dynamic and multi-faceted.',
        'The compositions are held together by skillful, relaxed, jazz-inspired arrangements and create a coherent world sound.',
      ],
    },
  },
  {
    slug: 'babylon-orchestra-taz',
    title: {
      de: 'taz ueber interkulturelle Klangraeume',
      en: 'taz on intercultural sound spaces',
    },
    source: 'taz',
    context: {
      de: 'Transkulturelle Konzertreihe',
      en: 'Transcultural concert series',
    },
    category: {
      de: 'Kritik',
      en: 'Review',
    },
    excerpt: {
      de: 'Die taz hebt Tangians Gespuer fuer interkulturelle Klangraeume und die natuerliche Verbindung orientalischer Instrumente mit moderner Klassik hervor.',
      en: 'taz highlights Tangian\'s feeling for intercultural sound spaces and the natural fusion of oriental instruments with modern classical music.',
    },
    body: {
      de: [
        'Die taz beschreibt die Ensemblearbeit als dynamisch geleitet und geformt durch Mischa Tangians Gespuer fuer interkulturelle Klangraeume.',
        'Hervorgehoben wird ein Sound, in dem traditionelle orientalische Instrumente und moderne Klassik natuerlich miteinander verschmelzen.',
      ],
      en: [
        'taz describes the ensemble work as dynamically led and shaped by Mischa Tangian\'s sense for intercultural sound spaces.',
        'The review highlights a sound in which traditional oriental instruments and modern classical music merge naturally.',
      ],
    },
  },
];

export function getNewsItems() {
  return newsItems;
}

export function getFeaturedNewsItems() {
  const featured = newsItems.filter((item) => item.featured);
  return (featured.length > 0 ? featured : newsItems).slice(0, 2);
}

export function getNewsItem(slug: string | undefined) {
  if (!slug) return null;
  return newsItems.find((item) => item.slug === slug) ?? null;
}
