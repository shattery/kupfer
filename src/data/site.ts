export const site = {
  name: 'Cupravo',
  street: '[STRASSE + HAUSNUMMER]',
  city: '[PLZ + ORT]',
  phone: '[TELEFONNUMMER]',
  email: '[E-MAIL]',
  hoursWeekday: '[ÖFFNUNGSZEIT MO–FR]',
  hoursSaturday: '[ÖFFNUNGSZEIT SA]',
  hoursSunday: 'geschlossen',
  legalEntity: 'Cupravo',
  vatId: '[UST-ID]',
  /** Inhaber / Geschäftsführer für Impressum */
  representative: '[Inhaber / GF — Vor- und Nachname]',
  /** Handelsregister oder „nicht eingetragen“ */
  registerInfo: '[Handelsregister oder „nicht eingetragen“]',
  formspreeEndpoint: 'https://formspree.io/f/mwlkwbzk',
  /**
   * Hero-Kennzahl „Jahre Erfahrung“.
   * `null` = Counter ausblenden, bis der echte Wert steht (keine Fake-Zahlen).
   */
  yearsExperience: null as number | null,
} as const;

export const processSteps = [
  {
    number: '01',
    title: 'Kabel mitbringen',
    text: 'Besuchen Sie uns persönlich am Standort. Der Ankauf findet ausschließlich vor Ort statt.',
  },
  {
    number: '02',
    title: 'Prüfung',
    text: 'Wir identifizieren Kabelart, Reinheit und Kupferanteil Ihrer Charge.',
  },
  {
    number: '03',
    title: 'Verwiegung',
    text: 'Das Gewicht wird am Standort festgestellt und bildet die Grundlage für das Angebot.',
  },
  {
    number: '04',
    title: 'Angebot',
    text: 'Sie erhalten ein klares Angebot auf Basis von Prüfung und Verwiegung.',
  },
  {
    number: '05',
    title: 'Ankauf & Sofort-Auszahlung',
    text: 'Bei Annahme erfolgt der Ankauf direkt vor Ort inklusive Auszahlung.',
  },
] as const;

/**
 * Nur echte, freigegebene Google-Rezensionen eintragen.
 * Leer = Bewertungsblock auf der Startseite wird nicht gerendert.
 */
export const reviews: ReadonlyArray<{
  author: string;
  source: string;
  rating: number;
  quote: string;
}> = [];

export const navItems = [
  { href: '/ankaufspreise', label: 'Ankaufspreise' },
  { href: '/kabelarten', label: 'Kabelarten' },
  { href: '/kabel-verkaufen', label: 'Ablauf' },
  { href: '/vor-ort-verkaufen', label: 'Vor Ort' },
  { href: '/grosse-mengen', label: 'Große Mengen' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kontakt', label: 'Kontakt' },
] as const;

/** Sekundär: Desktop unter „Mehr“, mobil weiter in der Liste. */
const moreNavHrefs = new Set<string>(['/vor-ort-verkaufen', '/grosse-mengen', '/faq']);

export const primaryNav = navItems.filter((item) => !moreNavHrefs.has(item.href));

export const moreNav = [
  ...navItems.filter((item) => moreNavHrefs.has(item.href)),
  { href: '/ueber-uns', label: 'Über uns' },
];

export function isNavActive(currentPath: string, href: string): boolean {
  const normalize = (value: string) => {
    const path = value.split(/[?#]/)[0].replace(/\/+$/, '');
    return path === '' ? '/' : path;
  };
  return normalize(currentPath) === normalize(href);
}

export function mapsSearchUrl(): string {
  const query = `${site.street}, ${site.city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsDirectionsUrl(): string {
  const query = `${site.street}, ${site.city}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function telHref(): string {
  return `tel:${site.phone.replace(/\s/g, '')}`;
}
