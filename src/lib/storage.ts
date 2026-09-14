export const INQUIRY_STORAGE_KEY = 'kupfer-inquiries';
export const PRICE_STORAGE_KEY = 'kupfer-admin-prices';

export type InquiryStatus =
  | 'Neu'
  | 'Wird geprüft'
  | 'Rückfrage erforderlich'
  | 'Termin vereinbart'
  | 'Vor Ort eingetroffen'
  | 'Ware wird geprüft'
  | 'Ankauf abgeschlossen'
  | 'Auszahlung erfolgt'
  | 'Abgelehnt';

export const INQUIRY_STATUSES: InquiryStatus[] = [
  'Neu',
  'Wird geprüft',
  'Rückfrage erforderlich',
  'Termin vereinbart',
  'Vor Ort eingetroffen',
  'Ware wird geprüft',
  'Ankauf abgeschlossen',
  'Auszahlung erfolgt',
  'Abgelehnt',
];

export interface Inquiry {
  id: string;
  createdAt: string;
  type: 'foto' | 'b2b';
  status: InquiryStatus;
  name: string;
  company?: string;
  phone: string;
  email: string;
  cableType: string;
  weight: string;
  message: string;
  photoCount: number;
  photoNames: string[];
}

export function loadInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(INQUIRY_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Inquiry[]) : [];
  } catch {
    return [];
  }
}

export function saveInquiries(inquiries: Inquiry[]): void {
  localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
  const next: Inquiry = {
    ...inquiry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'Neu',
  };
  const all = loadInquiries();
  all.unshift(next);
  saveInquiries(all);
  return next;
}

export function loadPriceOverrides(): Record<string, number | null> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PRICE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number | null>) : {};
  } catch {
    return {};
  }
}

export function savePriceOverrides(prices: Record<string, number | null>): void {
  localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(prices));
}
