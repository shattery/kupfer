import { site } from '../data/site';

export const FORMSPREE_ENDPOINT = site.formspreeEndpoint;

export class FormspreeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormspreeError';
  }
}

export type FormspreeFields = Record<string, string>;

export async function submitFormspree(fields: FormspreeFields): Promise<void> {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });

  if (response.ok) return;

  const body = (await response.json().catch(() => null)) as
    | { error?: string; errors?: Array<{ message?: string }> }
    | null;

  const raw =
    body?.error ||
    body?.errors?.map((item) => item.message).filter(Boolean).join(' ') ||
    'Die Anfrage konnte nicht gesendet werden. Bitte später erneut versuchen.';

  throw new FormspreeError(translateFormspreeError(raw));
}

function translateFormspreeError(message: string): string {
  if (/file uploads not permitted/i.test(message)) {
    return 'Datei-Uploads sind in diesem Formspree-Tarif nicht freigeschaltet. Die Anfrage wird ohne Dateien gesendet.';
  }
  return message;
}
