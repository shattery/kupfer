import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ChevronDown, Info, Scale, SlidersHorizontal } from 'lucide-react';
import { cables, formatEuro, formatPrice, type CableCategoryId } from '../../data/cables';
import { loadPriceOverrides } from '../../lib/storage';

function CableSelect({
  value,
  onChange,
}: {
  value: CableCategoryId;
  onChange: (id: CableCategoryId) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(
    0,
    cables.findIndex((cable) => cable.id === value),
  );
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeBuffer = useRef('');
  const typeTimer = useRef<number | null>(null);
  const listId = useId();
  const labelId = useId();
  const valueId = useId();
  const selected = cables[selectedIndex] ?? cables[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const option = listRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (!option) return;
    const list = listRef.current;
    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, activeIndex]);

  useEffect(() => {
    return () => {
      if (typeTimer.current !== null) window.clearTimeout(typeTimer.current);
    };
  }, []);

  const commit = (index: number) => {
    const cable = cables[index];
    if (!cable) return;
    onChange(cable.id);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setActiveIndex(selectedIndex);
        setOpen(true);
        return;
      }
      setActiveIndex((index) => {
        const next = event.key === 'ArrowDown' ? index + 1 : index - 1;
        return (next + cables.length) % cables.length;
      });
      return;
    }

    if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(cables.length - 1);
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault();
      commit(activeIndex);
      return;
    }

    if (event.key === 'Escape') {
      if (!open) return;
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }

    if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      typeBuffer.current = `${typeBuffer.current}${event.key.toLowerCase()}`;
      const match = cables.findIndex((cable) => cable.name.toLowerCase().startsWith(typeBuffer.current));
      if (match >= 0) {
        setActiveIndex(match);
        setOpen(true);
      }
      if (typeTimer.current !== null) window.clearTimeout(typeTimer.current);
      typeTimer.current = window.setTimeout(() => {
        typeBuffer.current = '';
      }, 500);
    }
  };

  return (
    <div ref={rootRef} className={`relative min-w-0 ${open ? 'z-30' : ''}`}>
      <span id={labelId} className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
        <SlidersHorizontal className="h-4 w-4 text-copper-500" aria-hidden="true" />
        Kabelart
      </span>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${labelId} ${valueId}`}
        aria-activedescendant={open ? `${listId}-option-${cables[activeIndex]?.id}` : undefined}
        onClick={() => {
          setActiveIndex(selectedIndex);
          setOpen((current) => !current);
        }}
        onKeyDown={onButtonKeyDown}
        className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm text-slate-900 outline-none transition hover:border-copper-300 focus-visible:border-copper-400 focus-visible:ring-2 focus-visible:ring-copper-400 ${
          open ? 'border-copper-400 ring-2 ring-copper-400' : 'border-slate-200'
        }`}
      >
        <span id={valueId} className="min-w-0 flex-1 whitespace-normal break-words">
          {selected.name}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          className="absolute left-0 z-30 mt-2 max-h-72 w-full min-w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {cables.map((cable, index) => {
            const isSelected = cable.id === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={cable.id}
                id={`${listId}-option-${cable.id}`}
                role="option"
                aria-selected={isSelected}
                data-active={isActive ? 'true' : 'false'}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commit(index)}
                className={`cursor-pointer px-4 py-2.5 text-left text-sm text-slate-900 ${
                  isActive ? 'bg-copper-100 text-copper-900' : isSelected ? 'bg-copper-50 text-copper-800' : ''
                } ${isSelected ? 'font-semibold' : ''}`}
              >
                <span className="block whitespace-normal break-words">{cable.name}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function PriceCalculator() {
  const [cableId, setCableId] = useState<CableCategoryId>('nym-j');
  const [weight, setWeight] = useState(25);
  const [overrides, setOverrides] = useState<Record<string, number | null>>({});

  useEffect(() => {
    setOverrides(loadPriceOverrides());
  }, []);

  const selected = useMemo(
    () => cables.find((cable) => cable.id === cableId) ?? cables[0],
    [cableId],
  );

  const unitPrice = useMemo(() => {
    const override = overrides[selected.id];
    if (override === undefined) return selected.pricePerKg;
    return override;
  }, [overrides, selected]);

  const estimate = unitPrice === null ? null : unitPrice * weight;

  return (
    <div className="price-calc surface-card min-w-0 w-full">
      <div className="rounded-t-2xl border-b border-slate-100 bg-slate-950 px-5 py-5 text-white sm:px-6">
        <p className="kicker text-copper-300">Preisrechner</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Was sind Ihre Kabel wert?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Unverbindliche Schätzung auf Basis der hinterlegten Richtwerte. Der Ankauf erfolgt ausschließlich vor Ort.
        </p>
      </div>

      <div className="price-calc-grid p-5 sm:p-6">
        <div className="min-w-0 space-y-6">
          <CableSelect value={cableId} onChange={setCableId} />

          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Scale className="h-4 w-4 shrink-0 text-copper-500" aria-hidden="true" />
                Gewicht in kg
              </span>
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {weight} kg
              </span>
            </div>
            <input
              type="number"
              min={0.1}
              max={5000}
              step={0.1}
              value={weight}
              onChange={(event) => setWeight(Math.max(0, Number(event.target.value)))}
              className="mb-4 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-copper-400 transition focus:border-copper-400 focus:ring-2"
            />
            <input
              type="range"
              min={1}
              max={500}
              step={1}
              value={Math.min(weight, 500)}
              aria-label="Gewicht in kg"
              onChange={(event) => setWeight(Number(event.target.value))}
              className="w-full accent-copper-500"
            />
            <div className="mt-1 flex justify-between gap-3 text-xs text-slate-400">
              <span>1 kg</span>
              <span>500 kg</span>
            </div>
          </div>
        </div>

        <div className="price-calc-result flex min-w-0 flex-col justify-between rounded-2xl bg-slate-50 p-4 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div className="min-w-[7.5rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Richtwert</p>
              <p className="mt-1 text-sm text-slate-700">{formatPrice(unitPrice)}</p>
            </div>
            <div className="shrink-0">
              <p className="text-sm text-slate-500">Geschätzter Wert</p>
              <p className="mt-1 font-display text-4xl font-semibold leading-none tracking-tight text-slate-950">
                {formatEuro(estimate)}
              </p>
            </div>
          </div>

          <div className="mt-6 min-w-0 space-y-4">
            <div className="flex min-w-0 gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs leading-relaxed text-amber-950">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
              <p className="min-w-0">
                Unverbindliche Schätzung. Der endgültige Ankaufspreis wird nach Prüfung und Verwiegung vor Ort festgelegt.
              </p>
            </div>
            <a href="/vor-ort-verkaufen" className="btn-copper w-full text-center">
              JETZT VOR ORT VERKAUFEN
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
