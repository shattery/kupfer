export const site = {
  name: '[FIRMENNAME]',
  street: '[STRASSE + HAUSNUMMER]',
  city: '[PLZ + ORT]',
  phone: '[TELEFONNUMMER]',
  email: '[E-MAIL]',
  hoursWeekday: '[ÖFFNUNGSZEIT MO–FR]',
  hoursSaturday: '[ÖFFNUNGSZEIT SA]',
  hoursSunday: 'geschlossen',
  legalEntity: '[FIRMENNAME]',
  vatId: '[UST-ID]',
  formspreeEndpoint: 'https://formspree.io/f/mwlkwbzk',
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

export const reviews = [
  {
    author: '[KUNDENNAME]',
    source: 'Google',
    rating: 5,
    quote: '[ZITAT AUS GOOGLE-REZENSION]',
  },
  {
    author: '[KUNDENNAME]',
    source: 'Google',
    rating: 5,
    quote: '[ZITAT AUS GOOGLE-REZENSION]',
  },
  {
    author: '[KUNDENNAME]',
    source: 'Google',
    rating: 5,
    quote: '[ZITAT AUS GOOGLE-REZENSION]',
  },
] as const;

export const navItems = [
  { href: '/ankaufspreise', label: 'Ankaufspreise' },
  { href: '/kabelarten', label: 'Kabelarten' },
  { href: '/kabel-verkaufen', label: 'Ablauf' },
  { href: '/vor-ort-verkaufen', label: 'Vor Ort' },
  { href: '/grosse-mengen', label: 'Große Mengen' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kontakt', label: 'Kontakt' },
] as const;

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
