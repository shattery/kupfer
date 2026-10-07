import { useEffect, useState, type FormEvent } from 'react';
import AdminDashboard from './AdminDashboard';

const STORAGE_KEY = 'kupfer-admin-unlocked';
/** Vor Go-Live in .env als PUBLIC_ADMIN_PIN setzen. Clientseitig sichtbar — kein echter Server-Schutz. */
const PIN = (import.meta.env.PUBLIC_ADMIN_PIN as string | undefined)?.trim() || 'kupfer-lokal';

export default function AdminGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pin === PIN) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      setError('');
      return;
    }
    setError('PIN falsch. Standard für Lokaltests: kupfer-lokal — vor Go-Live ändern.');
  };

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md surface-card p-8">
        <p className="kicker">Intern</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950">Admin-Freigabe</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Dieser Bereich ist nur für den Betrieb gedacht. Daten liegen in diesem Browser
          (localStorage), nicht auf einem Server. Fotos und Preise werden nicht geräteübergreifend
          synchronisiert.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-800">
            PIN
            <input
              type="password"
              autoComplete="current-password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900"
            />
          </label>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <button type="submit" className="btn-copper w-full justify-center">
            Entsperren
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
        <p className="font-semibold">Hinweis zum lokalen Admin</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Preise und Anfragen nur in diesem Browser (localStorage).</li>
          <li>Kein serverseitiger Login — PIN schützt nur vor versehentlichem Öffnen.</li>
          <li>Footer-Link entfernt; URL <code>/admin</code> bewusst unauffällig halten.</li>
          <li>
            PIN über <code>PUBLIC_ADMIN_PIN</code> in <code>.env</code> setzen (Build neu starten).
          </li>
        </ul>
      </div>
      <AdminDashboard />
    </div>
  );
}
