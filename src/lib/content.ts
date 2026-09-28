export const salon = {
  name: "Studio Bloom",
  street: "Haarlemmerstraat 24",
  city: "Leiden",
  phoneDisplay: "06 12345678",
  phoneTel: "+31612345678",
  owner: "Daan",
  years: 12,
  rating: "4,8",
  ratingValue: "4.8",
  reviewCount: 240,
  mapsUrl: "https://maps.google.com/?q=Haarlemmerstraat+24,+Leiden",
  reviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Studio+Bloom+Haarlemmerstraat+24+Leiden",
  reviewsUpdated: "illustratief voorbeeld",
} as const;

export const reviewKeywords = [
  { label: "Vriendelijk", count: 18 },
  { label: "Precies", count: 14 },
  { label: "Ontspannen", count: 12 },
  { label: "Professioneel", count: 10 },
] as const;

export type Review = {
  name: string;
  rating: number;
  quote: string;
  date: string;
};

export const reviews: Review[] = [
  {
    name: "Sanne de Vries",
    rating: 5,
    quote:
      "Eindelijk een kapper die echt luistert naar wat je wilt in plaats van zijn eigen ding te doen. Kom hier al een tijd en het is elke keer weer raak.",
    date: "Voorbeeld review",
  },
  {
    name: "Mounir El Amrani",
    rating: 5,
    quote:
      "Rustige, nette salon en Daan neemt de tijd. Geen gehaaste knipbeurt van tien minuten, precies wat ik zocht.",
    date: "Voorbeeld review",
  },
  {
    name: "Fleur Bakker",
    rating: 5,
    quote:
      "Ging voor het eerst met mijn dochter en ze voelde zich meteen op haar gemak. Heel geduldig en lief.",
    date: "Voorbeeld review",
  },
  {
    name: "Tom Hendriks",
    rating: 4,
    quote:
      "Prima knipbeurt voor een eerlijke prijs, en je kunt gewoon binnenlopen zonder afspraak. Precies wat ik zocht na een verhuizing naar Leiden.",
    date: "Voorbeeld review",
  },
  {
    name: "Amara Osei",
    rating: 5,
    quote:
      "De sfeer is ontspannen zonder dat het aan vakmanschap ontbreekt. Ik vertrek hier altijd tevredener dan ik binnenkwam.",
    date: "Voorbeeld review",
  },
  {
    name: "Lars Jansen",
    rating: 4,
    quote: "Nette zaak, redelijke prijs, komt zijn afspraak na.",
    date: "Voorbeeld review",
  },
];

export type Service = {
  name: string;
  price: string;
  duration?: string;
  priceOnRequest?: boolean;
};

export type ServiceGroup = {
  id: string;
  label: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "heren",
    label: "Heren",
    services: [
      { name: "Heren knippen", price: "€24,50", duration: "20 min" },
      {
        name: "Heren knippen, studententarief",
        price: "€20,50",
        duration: "20 min",
      },
      { name: "Wassen en knippen", price: "€27,50", duration: "20 min" },
      { name: "Baard knippen / scheren", price: "€18", duration: "20 min" },
      { name: "Heren knippen (6 varianten)", price: "vanaf €18" },
    ],
  },
  {
    id: "dames",
    label: "Dames",
    services: [
      { name: "Dames knippen", price: "vanaf €24,50" },
      {
        name: "Wenkbrauwen epileren met draad",
        price: "Op aanvraag",
        priceOnRequest: true,
      },
    ],
  },
  {
    id: "kinderen",
    label: "Kinderen",
    services: [
      { name: "t/m 14 jaar knippen", price: "€19,95", duration: "20 min" },
    ],
  },
];

export const hours = [
  { label: "Maandag", time: "Gesloten", closed: true },
  { label: "Dinsdag – vrijdag", time: "09:00–18:00", closed: false },
  { label: "Zaterdag", time: "09:00–17:00", closed: false },
  { label: "Zondag", time: "Gesloten", closed: true },
] as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: salon.name,
  telephone: salon.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: salon.street,
    addressLocality: salon.city,
    addressCountry: "NL",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: salon.ratingValue,
    reviewCount: String(salon.reviewCount),
    bestRating: "5",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
};
