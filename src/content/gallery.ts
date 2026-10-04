export type Locale = 'de' | 'en';

export type GalleryImage = {
  slug: string;
  thumb: string;
  large: string;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  category: Record<Locale, string>;
  recommendedUse: Record<Locale, string>;
  featured?: boolean;
};

function image(slug: string, data: Omit<GalleryImage, 'slug' | 'thumb' | 'large'>): GalleryImage {
  return {
    slug,
    thumb: `/images/gallery/thumb/${slug}.jpg`,
    large: `/images/gallery/large/${slug}.jpg`,
    ...data,
  };
}

export const homeHeroImage = image('mischatangiandob', {
  alt: {
    de: 'Mischa Tangian dirigiert im dunklen Konzertlicht.',
    en: 'Mischa Tangian conducting in dark concert light.',
  },
  caption: {
    de: 'Beste Wahl fuer die Startseite: dunkel, konzentriert, viel Raum fuer Typografie.',
    en: 'Best homepage choice: dark, focused, with room for typography.',
  },
  category: { de: 'Dirigieren', en: 'Conducting' },
  recommendedUse: { de: 'Startseiten-Hintergrund', en: 'Homepage background' },
  featured: true,
});

export const portraitImage = image('mischa-portrait-anton-tal', {
  alt: {
    de: 'Portraet von Mischa Tangian.',
    en: 'Portrait of Mischa Tangian.',
  },
  caption: {
    de: 'Staerkstes klares Portraet fuer Ueber-Seite, Presse und Kontaktbereiche.',
    en: 'Strongest clean portrait for About, press, and contact sections.',
  },
  category: { de: 'Portraet', en: 'Portrait' },
  recommendedUse: { de: 'Ueber / Presse', en: 'About / press' },
  featured: true,
});

export const featuredWorkBackgroundImage = image('210904-shf-fsp-1572-hq', {
  alt: {
    de: 'Buehne mit rotem Licht und Ensemble.',
    en: 'Stage with red light and ensemble.',
  },
  caption: {
    de: 'Dramatisches Buehnenbild als Hintergrund fuer Werk- oder Konzertbereiche.',
    en: 'Dramatic stage image for work or concert sections.',
  },
  category: { de: 'Buehne', en: 'Stage' },
  recommendedUse: { de: 'Abschnittshintergrund', en: 'Section background' },
  featured: true,
});

export const contactBackgroundImage = image('190620-baylon-rec-73', {
  alt: {
    de: 'Nahaufnahme einer Violine.',
    en: 'Close-up of a violin.',
  },
  caption: {
    de: 'Detailbild fuer ruhige Hintergrundflaechen.',
    en: 'Detail image for quiet background surfaces.',
  },
  category: { de: 'Detail', en: 'Detail' },
  recommendedUse: { de: 'Kontakt-Hintergrund', en: 'Contact background' },
});

export const galleryImages: GalleryImage[] = [
  homeHeroImage,
  portraitImage,
  image('mischa', {
    alt: { de: 'Mischa Tangian am Klavier in Schwarz-Weiss.', en: 'Mischa Tangian at the piano in black and white.' },
    caption: { de: 'Ruhiges Autorenbild fuer Biografie oder Kompositionskontext.', en: 'Quiet author image for biography or composition context.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Ueber-Seite', en: 'About page' },
    featured: true,
  }),
  featuredWorkBackgroundImage,
  image('220427-babylon-339', {
    alt: { de: 'Babylon ORCHESTRA Ensemblefoto auf Treppen im Freien.', en: 'Babylon ORCHESTRA ensemble portrait on outdoor steps.' },
    caption: { de: 'Staerkstes Ensemblefoto fuer Galerie oder transkulturelle Projektabschnitte.', en: 'Strong ensemble image for gallery or transcultural project sections.' },
    category: { de: 'Ensemble', en: 'Ensemble' },
    recommendedUse: { de: 'Galerie / Babylon ORCHESTRA', en: 'Gallery / Babylon ORCHESTRA' },
    featured: true,
  }),
  image('14-08-23-wassermusik-auf-der-spree-markus-werner-94-von-518', {
    alt: { de: 'Mischa Tangian spielt Violine bei einem Open-Air-Konzert.', en: 'Mischa Tangian plays violin at an open-air concert.' },
    caption: { de: 'Helles Open-Air-Motiv fuer Galerie und lebendige Konzertkontexte.', en: 'Bright open-air image for gallery and live concert contexts.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
    featured: true,
  }),
  image('dsc0283', {
    alt: { de: 'Mischa Tangian spricht oder singt an einem Mikrofon.', en: 'Mischa Tangian speaking or singing at a microphone.' },
    caption: { de: 'Direktes Personenmotiv fuer Startseiten- oder Kontaktvarianten.', en: 'Direct artist image for homepage or contact variants.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Sekundaeres Portraet', en: 'Secondary portrait' },
  }),
  image('210703-bbl-afterdrinx-100', {
    alt: { de: 'Mischa Tangian im warmen Konzertlicht.', en: 'Mischa Tangian in warm concert light.' },
    caption: { de: 'Warmer, freundlicher Portraetmoment fuer Presse oder Galerie.', en: 'Warm, approachable portrait moment for press or gallery.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Presse / Galerie', en: 'Press / gallery' },
  }),
  image('210703-bbl-afterdrinx-11', {
    alt: { de: 'Orchesteraufbau in einem Konzertsaal.', en: 'Orchestra setup in a concert hall.' },
    caption: { de: 'Gutes Atmosphaerenbild fuer Termine oder Musikarchiv.', en: 'Good atmosphere image for dates or music archive.' },
    category: { de: 'Buehne', en: 'Stage' },
    recommendedUse: { de: 'Termine / Galerie', en: 'Dates / gallery' },
  }),
  image('210703-bbl-afterdrinx-12', {
    alt: { de: 'Ensemblegruppenfoto in einem Konzertsaal.', en: 'Ensemble group photo in a concert hall.' },
    caption: { de: 'Freundliches Gruppenbild fuer Galerie und Projektkontext.', en: 'Warm group image for gallery and project context.' },
    category: { de: 'Ensemble', en: 'Ensemble' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('210904-shf-fsp-1333-hq', {
    alt: { de: 'Liveauftritt mit blauem Buehnenlicht.', en: 'Live performance with blue stage light.' },
    caption: { de: 'Expressives Konzertbild fuer die Galerie.', en: 'Expressive concert image for the gallery.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('220427-babylon-1071', {
    alt: { de: 'Mischa Tangian blickt durch eine Violine.', en: 'Mischa Tangian looking through a violin.' },
    caption: { de: 'Spielerisches, starkes Motiv fuer Galerie, nicht als Hauptportraet.', en: 'Playful, strong image for gallery, not the main portrait.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('220427-babylon-600', {
    alt: { de: 'Mischa Tangian mit Violine im Freien.', en: 'Mischa Tangian with violin outdoors.' },
    caption: { de: 'Helles Musikerportraet fuer Galerie und Pressevarianten.', en: 'Bright musician portrait for gallery and press variants.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Galerie / Presse', en: 'Gallery / press' },
  }),
  image('230315-babylon-kh-10', {
    alt: { de: 'Publikum in einem Konzertsaal.', en: 'Audience in a concert venue.' },
    caption: { de: 'Starkes Raum- und Publikumsmotiv fuer Galerie oder Dates.', en: 'Strong venue and audience image for gallery or dates.' },
    category: { de: 'Konzert', en: 'Concert' },
    recommendedUse: { de: 'Galerie / Termine', en: 'Gallery / dates' },
  }),
  image('230315-kinan-naghib-sanaz-kuhlhaus-babylon-orchestra-babylon-kh-9', {
    alt: { de: 'Musikerinnen und Musiker auf einer kleinen Buehne.', en: 'Musicians on a small stage.' },
    caption: { de: 'Ensemblemoment fuer Galerie und Babylon-Kontext.', en: 'Ensemble moment for gallery and Babylon context.' },
    category: { de: 'Ensemble', en: 'Ensemble' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('230315-mischa-babylon-orchestra-kuhlhaus-kh-5', {
    alt: { de: 'Mischa Tangian dirigiert ein Kammerensemble.', en: 'Mischa Tangian conducting a chamber ensemble.' },
    caption: { de: 'Gutes Arbeitsbild fuer Dirigieren und Ensemblearbeit.', en: 'Good working image for conducting and ensemble activity.' },
    category: { de: 'Dirigieren', en: 'Conducting' },
    recommendedUse: { de: 'Galerie / Ueber', en: 'Gallery / about' },
  }),
  image('230315-mischa-kuhlhaus-babylon-kh-22', {
    alt: { de: 'Mischa Tangian im warmen Innenraum.', en: 'Mischa Tangian in a warm interior.' },
    caption: { de: 'Natuerliches Portraet fuer Galerie oder Kontakt.', en: 'Natural portrait for gallery or contact.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Kontakt / Galerie', en: 'Contact / gallery' },
  }),
  image('andreaslang-babylonorch-mischa-7760', {
    alt: { de: 'Mischa Tangian mit Violine und Hut vor hellem Hintergrund.', en: 'Mischa Tangian with violin and hat against a bright background.' },
    caption: { de: 'Charakterbild fuer Galerie; weniger geeignet als Hauptbild.', en: 'Character image for gallery; less suited as the main image.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('andreaslang-babylonorch-mischa-7824', {
    alt: { de: 'Mischa Tangian mit Violine auf einem Dach.', en: 'Mischa Tangian with violin on a rooftop.' },
    caption: { de: 'Vertikales Stadtmotiv fuer Galerie.', en: 'Vertical city image for gallery.' },
    category: { de: 'Portraet', en: 'Portrait' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('img-0028', {
    alt: { de: 'Schwarz-Weiss-Buehnenmoment mit Performer und Musiker.', en: 'Black-and-white stage moment with performer and musician.' },
    caption: { de: 'Theaterhaftes Archivbild fuer Galerie.', en: 'Theatrical archive image for gallery.' },
    category: { de: 'Buehne', en: 'Stage' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('img-0029', {
    alt: { de: 'Buehnenszene mit Geige und Bewegung.', en: 'Stage scene with violin and movement.' },
    caption: { de: 'Dynamischer Buehnenmoment fuer Galerie.', en: 'Dynamic stage moment for gallery.' },
    category: { de: 'Buehne', en: 'Stage' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('img-0078', {
    alt: { de: 'Liveauftritt mit Ensemble und erhobenen Haenden.', en: 'Live performance with ensemble and raised hands.' },
    caption: { de: 'Energiegeladenes Livebild fuer Galerie.', en: 'Energetic live image for gallery.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('img-3593', {
    alt: { de: 'Probe mit Kontrabass, Geige und Klavier.', en: 'Rehearsal with double bass, violin, and piano.' },
    caption: { de: 'Arbeitsfoto fuer Galerie oder Behind-the-scenes.', en: 'Working image for gallery or behind the scenes.' },
    category: { de: 'Probe', en: 'Rehearsal' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('img-3633', {
    alt: { de: 'Mischa Tangian spielt Violine in einer Probe.', en: 'Mischa Tangian plays violin in rehearsal.' },
    caption: { de: 'Nahes Probenbild fuer Galerie.', en: 'Close rehearsal image for gallery.' },
    category: { de: 'Probe', en: 'Rehearsal' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('mangler-cn25-day1-29-kh-og1-babylon-15', {
    alt: { de: 'Ensemble auf einer Buehne mit farbigem Licht.', en: 'Ensemble on stage with colored light.' },
    caption: { de: 'Gutes Live-Ensemblebild fuer Galerie.', en: 'Good live ensemble image for gallery.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('mangler-cn25-day1-29-kh-og1-babylon-17', {
    alt: { de: 'Musiker auf einer Buehne im roten Licht.', en: 'Musicians on stage in red light.' },
    caption: { de: 'Buehnenbild fuer Galerie.', en: 'Stage image for gallery.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('mangler-mischa-violin-babylon-2025-cn25-day1-29-kh-og1-babylon-11', {
    alt: { de: 'Mischa Tangian mit Violine auf einer Buehne.', en: 'Mischa Tangian with violin on stage.' },
    caption: { de: 'Starkes Live-Musikerbild fuer Galerie.', en: 'Strong live musician image for gallery.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('mischa-ahmet-conducting-dob-babylon', {
    alt: { de: 'Mischa Tangian dirigiert auf einer dunklen Buehne.', en: 'Mischa Tangian conducting on a dark stage.' },
    caption: { de: 'Atmosphaerisches Dirigierbild fuer Galerie oder Hero-Alternative.', en: 'Atmospheric conducting image for gallery or alternate hero.' },
    category: { de: 'Dirigieren', en: 'Conducting' },
    recommendedUse: { de: 'Alternative Hero', en: 'Alternate hero' },
  }),
  image('mischa-azin-mahir-classical-next-mangler-cn25-day1-29-kh-og1-babylon-02', {
    alt: { de: 'Drei Musikerinnen und Musiker auf einer Buehne von oben.', en: 'Three musicians on stage from above.' },
    caption: { de: 'Grafisches Buehnenbild fuer Galerie.', en: 'Graphic stage image for gallery.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('mischa-florent-3byantontal', {
    alt: { de: 'Mischa Tangian und Florent an Instrumenten in einem Studio.', en: 'Mischa Tangian and Florent with instruments in a studio.' },
    caption: { de: 'Studio-/Arbeitsbild fuer Galerie.', en: 'Studio/work image for gallery.' },
    category: { de: 'Studio', en: 'Studio' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('mischa-florentbyantontal', {
    alt: { de: 'Schwarz-Weiss-Foto von Musikern im Studio.', en: 'Black-and-white photo of musicians in a studio.' },
    caption: { de: 'Ruhiges Studiofoto fuer Galerie.', en: 'Quiet studio image for gallery.' },
    category: { de: 'Studio', en: 'Studio' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('mischa-lost-babylon-img-0081', {
    alt: { de: 'Intensiver Liveauftritt mit Ensemble.', en: 'Intense live performance with ensemble.' },
    caption: { de: 'Ausdrucksstarkes Konzertbild fuer Galerie.', en: 'Expressive concert image for gallery.' },
    category: { de: 'Live', en: 'Live' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('xuan-mischa', {
    alt: { de: 'Zwei Musiker mit Querfloete im Freien.', en: 'Two musicians with flute outdoors.' },
    caption: { de: 'Kleiner, freundlicher Begegnungsmoment fuer Galerie.', en: 'Small, warm encounter image for gallery.' },
    category: { de: 'Backstage', en: 'Backstage' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
  image('190620-baylon-rec-58', {
    alt: { de: 'Mischa Tangian am Klavier in Schwarz-Weiss.', en: 'Mischa Tangian at the piano in black and white.' },
    caption: { de: 'Alternative zum Biografie-Bild.', en: 'Alternative biography image.' },
    category: { de: 'Studio', en: 'Studio' },
    recommendedUse: { de: 'Ueber-Alternative', en: 'About alternate' },
  }),
  contactBackgroundImage,
  image('190620-baylon-rec-88', {
    alt: { de: 'Musiker mit Saiteninstrument in Schwarz-Weiss.', en: 'Musician with string instrument in black and white.' },
    caption: { de: 'Dokumentarischer Musikmoment fuer Galerie.', en: 'Documentary music moment for gallery.' },
    category: { de: 'Studio', en: 'Studio' },
    recommendedUse: { de: 'Galerie', en: 'Gallery' },
  }),
];

export const galleryPreviewImages = galleryImages.filter((item) => item.featured).slice(0, 4);

export function getGalleryImages() {
  return galleryImages;
}
