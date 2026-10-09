import type { Locale } from '../app/i18n';

export type LocalizedText = Record<Locale, string>;

export type AboutFact = {
  label: LocalizedText;
  value: LocalizedText;
};

export const aboutContent = {
  title: {
    de: 'Biographie',
    en: 'About Mischa Tangian',
  },
  summary: {
    de: 'Der aus Moskau stammende Komponist Mischa Tangian lebt und arbeitet seit 2013 in Berlin.',
    en: 'Moscow-born composer Mischa Tangian has lived and worked in Berlin since 2013.',
  },
  biography: {
    de: [
      'Der aus Moskau stammende Komponist Mischa Tangian sammelte erste musikalische Erfahrungen als Geiger bei verschiedenen Orchestern, darunter dem Bundesjugendorchester, sowie in Konzerten und Wettbewerben. In den Fächern Violine und Klavier war er bereits während der Schulzeit Jungstudent an den Hochschulen Dortmund, Münster und zuletzt in Köln.',
      'Von 2006 bis 2012 studierte er Komposition bei Manfred Trojahn an der RSH Düsseldorf und schloss sein Diplom mit Auszeichnung ab. Das ermöglichte ihm ein Masterstudium bei George Benjamin am King\'s College London, gefördert durch ein Jahresstipendium des DAAD (Deutscher Akademischer Austauschdienst).',
      'Mischa Tangian erhielt zahlreiche Preise und Stipendien. Von 2016 bis 2018 war er Stipendiat der Akademie Musiktheater Heute der Deutschen Bank Stiftung. 2014 gewann er außerdem den 2. Internationalen Opernwettbewerb "Neue Szenen" der Deutschen Oper Berlin.',
      'Seit 2013 lebt und arbeitet Mischa Tangian in Berlin. Für die Spielzeit 2014/15 wurde er mit zwei Projekten an der Deutschen Oper Berlin beauftragt. Zusammen mit der Regisseurin Eva Abelein entwickelte er die Musiktheatershow In Transit als Arrangeur und Komponist, worin er auch als Performer an der Violine mitwirkte. Ferner wurde seine erste Oper in absentia im April 2015 im Rahmen von "Neue Szenen II" an der Tischlerei der Deutschen Oper Berlin uraufgeführt.',
      'Für die Spielzeit 2014/15 komponierte er die Kurzoper Carmen en los infiernos, einen Auftrag des Festival Castell Peralada in Spanien, die auch an der Neuköllner Oper Berlin und im Arts Centre St. Monica in Barcelona gezeigt wurde. Im September 2016 wurde die Kinderoper Moby Dick in Hannover uraufgeführt, ein Auftrag des Staatstheaters Hannover mit einem Libretto von Dorothea Hartmann.',
      'Während seiner Zeit als Stipendiat der Akademie Musiktheater Heute der Deutschen Bank Stiftung arbeitete Tangian an einem neuen Musiktheater für die Staatsoper Hamburg. Im Rahmen des Orchesterworkshops mit Toshio Hosokawa beim Festival Manifeste 2017 in Paris wurde sein Orchesterstück Introduction to an Urban Dance Suite vom Orchestre Philharmonique de Radio France unter der Leitung von Pierre-André Valade aufgeführt.',
    ],
    en: [
      'Moscow-born composer Mischa Tangian gained his first musical experience as a violinist in various orchestras, including the Bundesjugendorchester, as well as in concerts and competitions. While still at school, he was a junior student in violin and piano at the music academies in Dortmund, Münster, and later Cologne.',
      'From 2006 to 2012 he studied composition with Manfred Trojahn at the RSH Düsseldorf and completed his diploma with distinction. This enabled him to pursue a master\'s degree with George Benjamin at King\'s College London, supported by a one-year DAAD scholarship.',
      'Mischa Tangian has received numerous prizes and scholarships. From 2016 to 2018 he was a fellow of the Deutsche Bank Foundation\'s Akademie Musiktheater Heute. In 2014 he also won Deutsche Oper Berlin\'s 2nd International Opera Competition "Neue Szenen".',
      'Since 2013, Mischa Tangian has lived and worked in Berlin. For the 2014/15 season he was commissioned for two projects at Deutsche Oper Berlin. Together with director Eva Abelein, he developed the music-theatre show In Transit as arranger and composer, also appearing as a violin performer. His first opera, in absentia, premiered in April 2015 as part of "Neue Szenen II" at the Tischlerei of Deutsche Oper Berlin.',
      'For the 2014/15 season he composed the short opera Carmen en los infiernos, commissioned by Festival Castell Peralada in Spain, which was also shown at Neuköllner Oper Berlin and at Arts Centre St. Monica in Barcelona. In September 2016, the children\'s opera Moby Dick premiered in Hanover, commissioned by Staatstheater Hannover with a libretto by Dorothea Hartmann.',
      'During his fellowship with the Deutsche Bank Foundation\'s Akademie Musiktheater Heute, Tangian worked on a new music-theatre piece for Staatsoper Hamburg. As part of the orchestral workshop with Toshio Hosokawa at the 2017 Manifeste Festival in Paris, his orchestral work Introduction to an Urban Dance Suite was performed by the Orchestre Philharmonique de Radio France under Pierre-André Valade.',
    ],
  },
  factsTitle: {
    de: 'Kurzprofil',
    en: 'Profile',
  },
} as const;

export const aboutFacts: AboutFact[] = [
  {
    label: { de: 'Rolle', en: 'Role' },
    value: { de: 'Komponist', en: 'Composer' },
  },
  {
    label: { de: 'Herkunft', en: 'Origin' },
    value: { de: 'Moskau', en: 'Moscow' },
  },
  {
    label: { de: 'In Berlin seit', en: 'Berlin since' },
    value: { de: '2013', en: '2013' },
  },
  {
    label: { de: 'Ausbildung', en: 'Studies' },
    value: { de: 'RSH Düsseldorf; King\'s College London', en: 'RSH Düsseldorf; King\'s College London' },
  },
];
