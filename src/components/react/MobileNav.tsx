import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, site } from '../../data/site';

interface Props {
  currentPath: string;
}

export default function MobileNav({ currentPath }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
        aria-expanded={open}
        aria-label="Menü öffnen"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/70"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col bg-slate-950 px-6 py-6 text-white shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">{site.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
                aria-label="Menü schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-3 text-sm font-medium ${
                    currentPath === item.href ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="/kabel-verkaufen" className="btn-copper mt-8">
              KABEL VERKAUFEN
            </a>
          </aside>
        </div>
      )}
    </>
  );
}
