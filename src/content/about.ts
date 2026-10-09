import type { Locale } from '../app/i18n';

export type LocalizedText = Record<Locale, string>;

export type AboutFact = {
  label: LocalizedText;
  value: LocalizedText;
};

export type AboutSource = {
  label: string;
  href: string;
};

export const aboutContent = {
  title: {
    de: 'Ueber Mischa Tangian',
    en: 'About Mischa Tangian',
  },
  summary: {
    de: 'Mischa Tangian ist ein in Moskau geborener Komponist und Violinist, dessen Arbeit Musiktheater, zeitgenoessische Ensemblemusik, Orchesterprojekte und transkulturelle Konzertformate verbindet.',
    en: 'Mischa Tangian is a Moscow-born composer and violinist whose work connects music theatre, contemporary ensemble writing, orchestral projects, and transcultural concert formats.',
  },
  biography: {
    de: [
      'Tangian studierte Komposition bei Manfred Trojahn an der Robert Schumann Hochschule Duesseldorf und vertiefte seine Arbeit mit Sir George Benjamin am King\'s College London, gefoerdert durch ein DAAD-Stipendium.',
      'Seine Musik wurde von Ensembles und Orchestern wie dem Orchestre National d\'Ile de France, dem Orchestre de Radio France, dem Russian Philharmonic Orchestra, dem Festino Chamber Choir, dem Zafraan Ensemble, dem Quatuor Diotima, dem Cosmos Quartet und dem Babylon ORCHESTRA aufgefuehrt.',
      'Im Bereich Musiktheater entwickelte er In Transit fuer die Deutsche Oper Berlin und schrieb die Oper in absentia, beide uraufgefuehrt in der Tischlerei der Deutschen Oper. Weitere Arbeiten umfassen Carmen en los infiernos mit der Autorin Helena Tornero, Moby Dick fuer die Staatsoper Hannover und Die Nacht der Seeigel fuer die Hamburgische Staatsoper.',
      '2016 gruendete Tangian gemeinsam mit Sofia Surgutschowa das Babylon ORCHESTRA in Berlin. Das Ensemble bringt Musikerinnen und Musiker aus dem Nahen Osten und Europa zusammen und bewegt sich zwischen zeitgenoessischer Klassik, Jazz und musikalischen Traditionen aus unterschiedlichen Regionen. Tangian praegt das Projekt als kuenstlerischer Leiter, Komponist, Arrangeur und Produzent.',
      'Fuer seine Arbeit erhielt er unter anderem Auszeichnungen und Foerderungen der Carl Doerken Stiftung, der Deutsche Bank Stiftung und von E.On. 2014 gewann er den internationalen Opernwettbewerb Neue Szenen II der Deutschen Oper Berlin; 2018 war er Finalist des Kompositionswettbewerbs Ile de Creation in Paris. Das Debuetalbum des Babylon ORCHESTRA, das mehrere seiner Kompositionen enthaelt und von ihm produziert wurde, erhielt 2020 den Preis der deutschen Schallplattenkritik im Bereich Weltmusik.',
    ],
    en: [
      'Tangian studied composition with Manfred Trojahn at the Robert Schumann Hochschule Duesseldorf and developed his work further with Sir George Benjamin at King\'s College London, supported by a DAAD scholarship.',
      'His music has been performed by ensembles and orchestras including the Orchestre National d\'Ile de France, Orchestre de Radio France, Russian Philharmonic Orchestra, Festino Chamber Choir, Zafraan Ensemble, Quatuor Diotima, Cosmos Quartet, and Babylon ORCHESTRA.',
      'In music theatre, he developed In Transit for Deutsche Oper Berlin and wrote the opera in absentia, both premiered at the Tischlerei of Deutsche Oper Berlin. Further works include Carmen en los infiernos with writer Helena Tornero, Moby Dick for Staatsoper Hannover, and Die Nacht der Seeigel for Hamburg State Opera.',
      'In 2016, Tangian co-founded Babylon ORCHESTRA in Berlin with Sofia Surgutschowa. The ensemble brings together musicians from the Middle East and Europe and works between contemporary classical music, jazz, and musical traditions from different regions. Tangian shapes the project as artistic director, composer, arranger, and producer.',
      'His work has received awards and support from institutions including the Carl Doerken Foundation, Deutsche Bank Foundation, and E.On. In 2014 he won Deutsche Oper Berlin\'s international opera competition Neue Szenen II; in 2018 he was a finalist in the Ile de Creation composition competition in Paris. Babylon ORCHESTRA\'s debut album, which includes several of his compositions and was produced by him, received the German Record Critics\' Award for best world music album in 2020.',
    ],
  },
  noteTitle: {
    de: 'Redaktionelle Stimme',
    en: 'Editorial voice',
  },
  note: {
    de: 'Die Biografie ist bewusst in der dritten Person formuliert. So funktioniert sie auf Mischas eigener Website, kann aber auch von Veranstaltern, Presse und Institutionen direkt verwendet werden.',
    en: 'The biography is intentionally written in the third person. That works on Mischa\'s own site while also making the text reusable by presenters, press, and institutions.',
  },
  factsTitle: {
    de: 'Kurzprofil',
    en: 'Profile',
  },
  sourcesTitle: {
    de: 'Quellen',
    en: 'Sources',
  },
} as const;

export const aboutFacts: AboutFact[] = [
  {
    label: { de: 'Rolle', en: 'Role' },
    value: { de: 'Komponist, Violinist, kuenstlerischer Leiter', en: 'Composer, violinist, artistic director' },
  },
  {
    label: { de: 'Geboren', en: 'Born' },
    value: { de: 'Moskau', en: 'Moscow' },
  },
  {
    label: { de: 'Ausbildung', en: 'Studies' },
    value: { de: 'Robert Schumann Hochschule Duesseldorf; King\'s College London', en: 'Robert Schumann Hochschule Duesseldorf; King\'s College London' },
  },
  {
    label: { de: 'Ensemble', en: 'Ensemble' },
    value: { de: 'Mitgruender des Babylon ORCHESTRA', en: 'Co-founder of Babylon ORCHESTRA' },
  },
];

export const aboutSources: AboutSource[] = [
  {
    label: 'Rundfunk-Sinfonieorchester Berlin',
    href: 'https://www.rsb-online.de/en/artists/mischa-tangian/',
  },
  {
    label: 'Babylon ORCHESTRA',
    href: 'https://www.babylonorchestra.com/who-we-are',
  },
  {
    label: 'Deutsche Oper Berlin',
    href: 'https://deutscheoperberlin.de/en_EN/mein-seelenort_micha-tangian',
  },
  {
    label: 'concerti.de',
    href: 'https://www.concerti.de/portraets/babylon-orchestra/',
  },
];
