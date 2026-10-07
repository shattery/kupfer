import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Building2, CheckCircle2, ImagePlus, LoaderCircle } from 'lucide-react';
import { cables } from '../../data/cables';
import { submitFormspree } from '../../lib/formspree';
import { addInquiry } from '../../lib/storage';

export default function B2BInquiryForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cableType, setCableType] = useState('industrie');
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedLabel = useMemo(
    () => cables.find((cable) => cable.id === cableType)?.name ?? cableType,
    [cableType],
  );

  const onFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const incoming = event.target.files ? Array.from(event.target.files) : [];
    setPhotos(incoming.slice(0, 8));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSending(true);

    try {
      await submitFormspree({
        _subject: 'B2B-Anfrage Kupferkabel',
        formular: 'B2B-Anfrage',
        firma: company,
        name,
        email,
        telefon: phone,
        kabelart: selectedLabel,
        menge: weight,
        nachricht: message,
        foto_dateien: photos.length ? photos.map((file) => file.name).join(', ') : 'keine',
        hinweis: 'Ankauf ausschließlich vor Ort. Keine Sendungsannahme.',
      });
      addInquiry({
        type: 'b2b',
        company,
        name,
        phone,
        email,
        cableType: selectedLabel,
        weight,
        message,
        photoCount: photos.length,
        photoNames: photos.map((file) => file.name),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Senden fehlgeschlagen.');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="surface-card px-6 py-12 text-center sm:px-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950">Anfrage gesendet</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Wir melden uns zur Abstimmung eines Vor-Ort-Termins für Prüfung, Verwiegung und Ankauf.
        </p>
      </div>
    );
  }

  return (
    <div className="surface-card">
    <form onSubmit={onSubmit} className="p-6 sm:p-8">
      <div className="mb-8 flex items-start gap-3">
        <div className="rounded-xl bg-copper-50 p-2 text-copper-700">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="kicker">B2B-Anfrage</p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-slate-950">
            Anfrage für Handwerk, Elektriker und Industrie
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Große Mengen werden ausschließlich am Standort angenommen. Kein Paketversand.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Firma
          <input
            required
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Ansprechpartner
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Telefon
          <input
            required
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          E-Mail
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Kabelart
          <select
            value={cableType}
            onChange={(event) => setCableType(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
          >
            {cables.map((cable) => (
              <option key={cable.id} value={cable.id}>
                {cable.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Geschätzte Menge / Gewicht
          <input
            required
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
            placeholder="z. B. 1,2 t oder 350 kg"
          />
        </label>
        <div className="sm:col-span-2">
          <p className="text-sm font-medium text-slate-700">Foto-Upload (optional)</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="btn-outline mt-1.5"
          >
            <ImagePlus className="h-4 w-4" />
            Bilder anhängen
          </button>
          <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
          {photos.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">{photos.map((file) => file.name).join(', ')}</p>
          )}
        </div>
        <label className="sm:col-span-2 text-sm font-medium text-slate-700">
          Freitext
          <textarea
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
            placeholder="Materialmix, gewünschter Vor-Ort-Termin, besondere Hinweise."
          />
        </label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>
      )}

      <button type="submit" className="btn-copper mt-6" disabled={sending}>
        {sending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        {sending ? 'Wird gesendet…' : 'B2B-Anfrage senden'}
      </button>
    </form>
    </div>
  );
}
