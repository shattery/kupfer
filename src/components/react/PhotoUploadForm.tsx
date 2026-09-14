import { useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { CheckCircle2, ImagePlus, LoaderCircle, Trash2, Upload } from 'lucide-react';
import { cables } from '../../data/cables';
import { submitFormspree } from '../../lib/formspree';
import { addInquiry } from '../../lib/storage';

interface PreviewFile {
  file: File;
  url: string;
}

export default function PhotoUploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [weight, setWeight] = useState('');
  const [cableType, setCableType] = useState('unbekannt');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list).filter((file) => file.type.startsWith('image/'));
    setFiles((current) => {
      const next = [...current];
      for (const file of incoming) {
        if (next.some((item) => item.file.name === file.name && item.file.size === file.size)) continue;
        next.push({ file, url: URL.createObjectURL(file) });
      }
      return next.slice(0, 8);
    });
  };

  const removeFile = (index: number) => {
    setFiles((current) => {
      const copy = [...current];
      URL.revokeObjectURL(copy[index].url);
      copy.splice(index, 1);
      return copy;
    });
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
  };

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) addFiles(event.target.files);
  };

  const selectedLabel = useMemo(
    () => cables.find((cable) => cable.id === cableType)?.name ?? cableType,
    [cableType],
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSending(true);

    const photoNames = files.map((item) => item.file.name);

    try {
      await submitFormspree({
        _subject: 'Foto-Anfrage Kupferkabel',
        formular: 'Foto-Anfrage',
        name,
        email,
        telefon: phone,
        kabelart: selectedLabel,
        gewicht: weight,
        nachricht: message,
        foto_dateien: photoNames.length ? photoNames.join(', ') : 'keine',
        hinweis: 'Ankauf ausschließlich vor Ort. Keine Sendungsannahme.',
      });
      addInquiry({
        type: 'foto',
        name,
        phone,
        email,
        cableType: selectedLabel,
        weight,
        message,
        photoCount: files.length,
        photoNames,
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
        <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950">Anfrage erhalten</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Vielen Dank. Wir prüfen Ihre Angaben und Fotos und melden uns zur Abstimmung eines Vor-Ort-Termins.
          Es findet kein Paketversand statt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card p-6 sm:p-8">
      <div className="mb-8">
        <p className="kicker">Foto-Anfrage</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Sie wissen nicht, welche Kabel Sie haben? Senden Sie ein Foto
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Mehrere Bilder möglich. Die Bewertung und der Ankauf erfolgen ausschließlich vor Ort.
        </p>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`rounded-2xl border-2 border-dashed px-4 py-10 text-center transition ${
          dragActive ? 'border-copper-400 bg-copper-50' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <Upload className="mx-auto h-8 w-8 text-copper-500" />
        <p className="mt-3 text-sm font-medium text-slate-800">Bilder hierher ziehen oder auswählen</p>
        <p className="mt-1 text-xs text-slate-500">JPG, PNG oder WEBP · bis zu 8 Dateien zur Vorschau</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-outline mt-4"
        >
          <ImagePlus className="h-4 w-4" />
          Dateien wählen
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onSelect}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {files.map((item, index) => (
            <li key={item.url} className="relative overflow-hidden rounded-xl border border-slate-200">
              <img src={item.url} alt="" className="h-28 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-2 top-2 rounded-full bg-slate-950/80 p-1 text-white"
                aria-label="Bild entfernen"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Geschätztes Gewicht (kg)
          <input
            required
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
            placeholder="z. B. 40"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Kabelart-Vermutung
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
          Name
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
            placeholder="[TELEFONNUMMER]"
          />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-slate-700">
          E-Mail
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
          />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-slate-700">
          Nachricht
          <textarea
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
            placeholder="Kurz beschreiben, was Sie vor Ort anbieten möchten."
          />
        </label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>
      )}

      <button type="submit" className="btn-copper mt-6" disabled={sending}>
        {sending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        {sending ? 'Wird gesendet…' : 'Foto-Anfrage senden'}
      </button>
    </form>
  );
}
