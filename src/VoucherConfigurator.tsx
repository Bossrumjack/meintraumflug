import { useState, useId } from 'react';
import { Button } from './components/Button';
import { Field } from './components/Field';
import { VoucherCard, VOUCHER_MOTIFS, DEFAULT_VOUCHER } from './components/VoucherCard';
import { useFocusTrap } from './hooks/useFocusTrap';
import type { VoucherData } from './components/VoucherCard';

const VALUE_PRESETS = [149, 279, 399];
const EXPERIENCES = [
  { id: 'Schnupperflug', label: 'Schnupperflug', price: 149 },
  { id: 'Alpenrundflug', label: 'Alpenrundflug', price: 279 },
  { id: 'Schlössertour', label: 'Schlössertour', price: 399 },
];
const SHIP = [
  { id: 'pdf',  label: 'PDF sofort',  sub: 'Per E-Mail',        fee: 0 },
  { id: 'post', label: 'Postversand', sub: 'Edle Klappkarte',   fee: 5 },
];

export interface VoucherCheckout extends VoucherData {
  ship: string;
  total: number;
}

interface Props {
  onClose: () => void;
  onCheckout: (v: VoucherCheckout) => void;
}

export function VoucherConfigurator({ onClose, onCheckout }: Props) {
  const [d, setD] = useState<VoucherData>({ ...DEFAULT_VOUCHER, recipient: '', message: '' });
  const [ship, setShip] = useState('pdf');
  const set = (patch: Partial<VoucherData>) => setD((prev) => ({ ...prev, ...patch }));
  const titleId = useId();
  const panelRef = useFocusTrap(true) as React.RefObject<HTMLDivElement>;
  const onEsc = (e: React.KeyboardEvent) => { if (e.key === 'Escape') onClose(); };

  const base = d.kind === 'value'
    ? Number(d.value || 0)
    : (EXPERIENCES.find((e) => e.id === d.experience)?.price || 0);
  const fee = SHIP.find((s) => s.id === ship)?.fee || 0;
  const total = base + fee;

  const chip = (active: boolean) => ({
    padding: '10px 14px', borderRadius: 'var(--radius-xl)', fontSize: 'var(--text-sm)',
    fontWeight: 'var(--fw-medium)', cursor: 'pointer', textAlign: 'center' as const,
    background: active ? 'var(--accent)' : 'var(--surface-sunken)',
    color: active ? 'var(--on-accent)' : 'var(--text-strong)',
    boxShadow: active ? 'none' : 'var(--ring-hairline)',
    transition: 'all var(--dur-base) var(--ease-standard)',
  });
  const seg = (active: boolean) => ({ ...chip(active), flex: 1 });

  const label = {
    fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase' as const,
    letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)', margin: '0 0 12px',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(12,12,15,0.6)',
        backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', overflowY: 'auto', animation: 'mtfFade 200ms var(--ease-standard)',
      }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onEsc}
        style={{
          width: '100%', maxWidth: '960px', background: 'var(--surface-page)',
          borderRadius: 'var(--radius-hero)', boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden', margin: 'auto', animation: 'mtfPop 240ms var(--ease-standard)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Live preview */}
        <div style={{ background: 'var(--surface-inverted)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-on-dark-muted)' }}>Live-Vorschau</span>
            <span style={{ width: '7px', height: '7px', borderRadius: '9999px', background: 'var(--brand-red)' }} />
          </div>
          <VoucherCard data={d} scale={0.92} />
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-on-dark-muted)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>
            So erhält Ihre/r Beschenkte/r den Gutschein – als hochwertiges PDF oder gedruckte Klappkarte.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '88vh' }}>
          <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)' }}>
            <h3 id={titleId} style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', margin: 0 }}>Gutschein gestalten</h3>
            <button onClick={onClose} aria-label="Schließen" style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}>×</button>
          </div>

          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
            {/* Art */}
            <div>
              <p style={label}>Art</p>
              <div role="radiogroup" aria-label="Gutschein-Art" style={{ display: 'flex', gap: '8px' }}>
                <button role="radio" aria-checked={d.kind === 'value'} style={seg(d.kind === 'value')} onClick={() => set({ kind: 'value' })}>Wertgutschein</button>
                <button role="radio" aria-checked={d.kind === 'experience'} style={seg(d.kind === 'experience')} onClick={() => set({ kind: 'experience' })}>Erlebnis</button>
              </div>
            </div>

            {d.kind === 'value' ? (
              <div>
                <p style={label}>Betrag</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 1.3fr', gap: '8px' }}>
                  {VALUE_PRESETS.map((v) => (
                    <button key={v} role="radio" aria-checked={Number(d.value) === v} style={chip(Number(d.value) === v)} onClick={() => set({ value: v })}>{v} €</button>
                  ))}
                  <div style={{ position: 'relative' }}>
                    <input type="number" value={d.value} onChange={(e) => set({ value: e.target.value })} aria-label="Freibetrag"
                      style={{
                        width: '100%', boxSizing: 'border-box', background: 'var(--surface-sunken)', border: 'none',
                        borderRadius: 'var(--radius-xl)', padding: '10px 24px 10px 12px', fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)',
                        outline: 'none', boxShadow: 'var(--ring-hairline)', textAlign: 'center',
                      }} />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>€</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p style={label}>Erlebnis</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {EXPERIENCES.map((e) => {
                    const active = d.experience === e.id;
                    return (
                      <button key={e.id} onClick={() => set({ experience: e.id })} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px',
                        cursor: 'pointer', background: 'var(--surface-card)', border: 'none', borderRadius: 'var(--radius-xl)',
                        boxShadow: active ? 'var(--ring-accent)' : 'var(--ring-hairline)',
                        transition: 'box-shadow var(--dur-base) var(--ease-standard)',
                      }}>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)' }}>{e.label}</span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{e.price} €</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Motiv */}
            <div>
              <p style={label}>Motiv</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {VOUCHER_MOTIFS.map((m) => {
                  const active = d.motif === m.id;
                  return (
                    <button key={m.id} onClick={() => set({ motif: m.id })} title={m.label} style={{
                      position: 'relative', padding: 0, border: 'none', cursor: 'pointer',
                      borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '16 / 10',
                      boxShadow: active ? 'var(--ring-accent)' : 'var(--ring-hairline)',
                    }}>
                      <img src={m.src} alt={m.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Empfänger:in" value={d.recipient} placeholder="z. B. Anna"
              onChange={(e) => set({ recipient: e.target.value })} />

            <div>
              <Field label="Persönliche Nachricht" multiline rows={2} value={d.message}
                placeholder="Ein paar Worte zum Geschenk…"
                onChange={(e) => set({ message: e.target.value.slice(0, 90) })} />
              <p style={{ margin: '6px 2px 0', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right' }}>{d.message.length}/90</p>
            </div>

            {/* Versand */}
            <div>
              <p style={label}>Versand</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {SHIP.map((s) => {
                  const active = ship === s.id;
                  return (
                    <button key={s.id} onClick={() => setShip(s.id)} style={{
                      flex: 1, textAlign: 'left', padding: '12px 14px', cursor: 'pointer', border: 'none',
                      borderRadius: 'var(--radius-xl)', background: 'var(--surface-card)',
                      boxShadow: active ? 'var(--ring-accent)' : 'var(--ring-hairline)',
                      transition: 'box-shadow var(--dur-base) var(--ease-standard)',
                    }}>
                      <span style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)' }}>{s.label}</span>
                      <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{s.sub}{s.fee ? ` · +${s.fee} €` : ' · gratis'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block' }}>Gesamt</span>
              <span style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{total} €</span>
            </div>
            <Button variant="primary" onClick={() => onCheckout({ ...d, ship, total })}>Weiter zur Zahlung</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
