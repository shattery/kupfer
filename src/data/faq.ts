export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'ankauf' | 'ablauf' | 'preise' | 'ort';
}

export const faqs: FaqItem[] = [
  {
    id: 'nur-vor-ort',
    question: 'Kann ich Kabel per Paket schicken?',
    answer:
      'Nein. Der Ankauf findet ausschließlich persönlich am Firmenstandort statt. Es gibt keine Annahme von Sendungen und keine Abholung per Paketdienst.',
    category: 'ort',
  },
  {
    id: 'welche-kabel',
    question: 'Welche Kupferkabel kaufen Sie an?',
    answer:
      'Wir nehmen gängige Kupferkabel an, darunter Installationskabel (NYM-J), Erdkabel, Starkstromkabel, flexible Leitungen, Einzeladern, Industriekabel sowie Daten- und Koaxialkabel. Unklare Chargen prüfen wir vor Ort.',
    category: 'ankauf',
  },
  {
    id: 'preis-bindung',
    question: 'Sind die Preise auf der Website verbindlich?',
    answer:
      'Nein. Die angegebenen Werte sind unverbindliche Richtwerte. Der endgültige Ankaufspreis wird nach Prüfung und Verwiegung vor Ort festgelegt.',
    category: 'preise',
  },
  {
    id: 'auszahlung',
    question: 'Wann erhalte ich mein Geld?',
    answer:
      'Nach Annahme der Ware erfolgt die Auszahlung direkt vor Ort gemäß der vereinbarten Zahlungsart. Details klären wir am Standort.',
    category: 'ablauf',
  },
  {
    id: 'vorbereitung',
    question: 'Wie sollte ich die Kabel vorbereiten?',
    answer:
      'Sortieren Sie nach Möglichkeit nach Kabelart und entfernen Sie groben Schmutz sowie artfremde Materialien. Eine perfekte Trennung ist nicht zwingend – wir prüfen vor Ort.',
    category: 'ablauf',
  },
  {
    id: 'unbekannt',
    question: 'Ich kenne den Kabeltyp nicht. Kann ich trotzdem verkaufen?',
    answer:
      'Ja. Bringen Sie die Kabel zum Standort oder nutzen Sie das Foto-Formular. Die Identifikation und Bewertung erfolgen vor Ort.',
    category: 'ankauf',
  },
  {
    id: 'grosse-mengen',
    question: 'Nehmen Sie auch große Mengen von Betrieben an?',
    answer:
      'Ja. Für Handwerk, Elektriker und Industrie gibt es einen eigenen Anfrageweg. Mengen, Materialmix und Termin stimmen wir individuell ab – ebenfalls nur vor Ort.',
    category: 'ankauf',
  },
  {
    id: 'waage',
    question: 'Wie wird das Gewicht ermittelt?',
    answer:
      'Die Verwiegung erfolgt am Standort. Grundlage für das Angebot ist das dort festgestellte Gewicht nach Prüfung der Charge.',
    category: 'ablauf',
  },
  {
    id: 'oeffnungszeiten',
    question: 'Kann ich ohne Termin kommen?',
    answer:
      'Private Kleinmengen können in der Regel während der Öffnungszeiten vorbeigebracht werden. Bei großen Chargen empfehlen wir eine kurze Voranfrage, damit Prüfung und Verwiegung planbar sind.',
    category: 'ort',
  },
  {
    id: 'ausweis',
    question: 'Welche Angaben sind beim Ankauf nötig?',
    answer:
      'Für den Ankauf gelten die gesetzlichen Identifikationspflichten. Bringen Sie ein gültiges Ausweisdokument mit. Weitere Details nennen wir vor Ort.',
    category: 'ablauf',
  },
];
