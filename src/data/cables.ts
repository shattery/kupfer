export const PRICE_PLACEHOLDER = 'XX,XX €/kg';
/** Stand der Richtwerte. Orientierung am veröffentlichten Ankaufsmarkt, keine Garantie. */
export const PRICE_UPDATED_AT = '06.10.2026';

export type CableCategoryId =
  | 'nym-j'
  | 'erdkabel'
  | 'starkstrom'
  | 'flexibel'
  | 'einzeladern'
  | 'industrie'
  | 'daten'
  | 'koax'
  | 'gemischt'
  | 'unbekannt';

export interface CableCategory {
  id: CableCategoryId;
  name: string;
  shortName: string;
  standards: string;
  description: string;
  features: string[];
  typicalUse: string;
  /**
   * Unverbindlicher Richtwert in €/kg.
   * Stand 06.10.2026, angelehnt an veröffentlichte Ankaufspreise
   * (MKM Metals, Menge bis 40 kg; Marktspannen von Schrottradar/Schrottmonitor).
   * `null` = noch kein Wert hinterlegt.
   */
  pricePerKg: number | null;
  accepted: boolean;
}

export const cables: CableCategory[] = [
  {
    id: 'nym-j',
    name: 'Installationskabel (NYM-J)',
    shortName: 'NYM-J',
    standards: 'NYM-J / NYM-O',
    description:
      'Klassische Mantelleitungen aus der Gebäudeinstallation mit Kupferleitern und Isolierung.',
    features: [
      'Mehradrig mit Schutzleiter',
      'PVC-Mantel, typisch grau',
      'Häufig aus Sanierung und Elektroinstallation',
    ],
    typicalUse: 'Wohnungs- und Gebäudeinstallation',
    pricePerKg: 4.7,
    accepted: true,
  },
  {
    id: 'erdkabel',
    name: 'Erdkabel',
    shortName: 'Erdkabel',
    standards: 'NYY / NAYY (Kupferanteil prüfen)',
    description:
      'Erdverlegte Energiekabel. Ankauf nach Prüfung des Kupferanteils und der Reinheit.',
    features: ['Robustes Außenmantel-Material', 'Oft feuchtigkeitsbelastet', 'Vor Ort auf Kupferanteil geprüft'],
    typicalUse: 'Erdverlegung, Außenanlagen, Hausanschluss',
    pricePerKg: 5.7,
    accepted: true,
  },
  {
    id: 'starkstrom',
    name: 'Starkstromkabel',
    shortName: 'Starkstrom',
    standards: 'NYY, NYCWY, Energiekabel',
    description:
      'Leistungskabel mit höherem Querschnitt. Der Ankaufspreis richtet sich nach Leiterquerschnitt und Reinheit.',
    features: ['Große Querschnitte', 'Hoher Kupferanteil möglich', 'Prüfung und Verwiegung vor Ort'],
    typicalUse: 'Industrie, Verteiler, Energieverteilung',
    pricePerKg: 6.1,
    accepted: true,
  },
  {
    id: 'flexibel',
    name: 'Flexible Kabel (H05VV-F, H07RN-F)',
    shortName: 'Flexible Kabel',
    standards: 'H05VV-F, H07RN-F',
    description:
      'Schlauchleitungen und Gummikabel mit feindrähtigen Kupferleitern.',
    features: ['Feindrähtige Kupferlitzen', 'PVC- oder Gummimantel', 'Gut geeignet bei sortenreiner Abgabe'],
    typicalUse: 'Geräte, Baustelle, bewegliche Anschlüsse',
    pricePerKg: 4.7,
    accepted: true,
  },
  {
    id: 'einzeladern',
    name: 'Einzeladern (H07V-U, H07V-K)',
    shortName: 'Einzeladern',
    standards: 'H07V-U, H07V-K, H07V-R',
    description:
      'Einzelne Adern aus Schaltschränken und Installationen. Sortenrein bewertet.',
    features: ['Massiv oder feindrähtig', 'Farbige Isolierung', 'Oft hoher Kupferanteil'],
    typicalUse: 'Schaltschrank, Installation, Verdrahtung',
    pricePerKg: 6.1,
    accepted: true,
  },
  {
    id: 'industrie',
    name: 'Industriekabel',
    shortName: 'Industrie',
    standards: 'Steuerleitungen, Sonderleitungen',
    description:
      'Steuer- und Sonderleitungen aus industriellen Anlagen. Bewertung nach Aufbau und Kupferanteil.',
    features: ['Vielfältige Aufbauten', 'Schirmung möglich', 'Individuelle Prüfung vor Ort'],
    typicalUse: 'Maschinen, Anlagen, Industrieabbau',
    pricePerKg: 4.7,
    accepted: true,
  },
  {
    id: 'daten',
    name: 'Daten-/Netzwerkkabel (Cat)',
    shortName: 'Datenkabel',
    standards: 'Cat5 / Cat6 / Cat7',
    description:
      'Netzwerkkabel mit geringerem Kupferanteil je Kilogramm. Ankauf nach Prüfung.',
    features: ['Mehrpaarig', 'Teilweise geschirmt', 'Geringerer Kupferanteil als Energiekabel'],
    typicalUse: 'IT-Infrastruktur, Büroverkabelung',
    pricePerKg: 3.6,
    accepted: true,
  },
  {
    id: 'koax',
    name: 'Koaxial-/Telefonkabel',
    shortName: 'Koax / Telefon',
    standards: 'Koax, Fernmeldekabel',
    description:
      'Koaxial- und Telefonleitungen. Der Kupferanteil variiert stark und wird vor Ort bestimmt.',
    features: ['Unterschiedliche Schirmungen', 'Oft gemischte Chargen', 'Bewertung nach Sichtprüfung'],
    typicalUse: 'Antenne, Telefon, Altbauverkabelung',
    pricePerKg: 2.18,
    accepted: true,
  },
  {
    id: 'gemischt',
    name: 'Gemischte Kupferkabel',
    shortName: 'Gemischt',
    standards: 'Sortenmix',
    description:
      'Unsortierte Kabelchargen. Der Preis wird nach Sichtung, Sortierung und Verwiegung festgelegt.',
    features: ['Unterschiedliche Typen in einer Charge', 'Sortierung kann den Erlös erhöhen', 'Unverbindliche Schätzung möglich'],
    typicalUse: 'Entrümpelung, Baustellenreste, Bestände',
    pricePerKg: 3.74,
    accepted: true,
  },
  {
    id: 'unbekannt',
    name: 'Ich weiß es nicht',
    shortName: 'Unbekannt',
    standards: 'Nach Prüfung',
    description:
      'Keine Zuordnung nötig. Bringen Sie die Kabel vor Ort mit oder senden Sie ein Foto zur ersten Einschätzung.',
    features: ['Keine Vorkenntnisse erforderlich', 'Identifikation vor Ort', 'Foto-Anfrage möglich'],
    typicalUse: 'Private Bestände, unklare Herkunft',
    pricePerKg: 3.74,
    accepted: true,
  },
];

export const calculatorCables = cables;

export function formatPrice(pricePerKg: number | null): string {
  if (pricePerKg === null || Number.isNaN(pricePerKg)) {
    return PRICE_PLACEHOLDER;
  }
  return `${pricePerKg.toFixed(2).replace('.', ',')} €/kg`;
}

export function formatEuro(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return 'XX,XX €';
  }
  return `${value.toFixed(2).replace('.', ',')} €`;
}

export function getCableById(id: string): CableCategory | undefined {
  return cables.find((cable) => cable.id === id);
}
