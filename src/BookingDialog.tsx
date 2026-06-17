import { useState, useId } from 'react';
import { Button } from './components/Button';
import { Badge } from './components/Badge';
import { Eyebrow } from './components/Eyebrow';
import { Field } from './components/Field';
import { useFocusTrap } from './hooks/useFocusTrap';
import type { Flight } from './data';


function fmtWish(iso: string) {
  if (!iso) return '';
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return iso; }
}

interface BookingDialogProps {
  flights: Flight[];
  initialFlight: Flight | null;
  onClose: () => void;
}

export function BookingDialog({ flights, initialFlight, onClose }: BookingDialogProps) {
  const [step, setStep] = useState(1);
  const [flightId, setFlightId] = useState(initialFlight ? initialFlight.id : flights[0].id);
  const [wishDate, setWishDate] = useState('');
  const [wishNote, setWishNote] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const flight = flights.find((f) => f.id === flightId) || flights[0];

  const totalSteps = 3;
  const titleId = useId();
  const panelRef = useFocusTrap(true) as React.RefObject<HTMLDivElement>;

  const sectionLabel = { fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)' as const, textTransform: 'uppercase' as const, letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)', margin: '0 0 12px' };

  const headerLabel = step > totalSteps ? 'Anfrage gesendet' : `Schritt ${step} von ${totalSteps}`;
  const headerTitle = step > totalSteps ? 'Wir melden uns!' : 'Flug anfragen';

  const onEsc = (e: React.KeyboardEvent) => { if (e.key === 'Escape') onClose(); };

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName:   name.trim(),
          customerEmail:  email.trim(),
          customerPhone:  phone.trim(),
          flightTitle:    flight.title,
          flightDuration: flight.duration || '',
          flightPrice:    flight.price,
          wishDate,
          wishNote,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error || `Fehler ${res.status}`);
      }
      setStep(4);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(12,12,15,0.55)',
        backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', animation: 'mtfFade 200ms var(--ease-standard)', overflowY: 'auto',
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
          width: '100%', maxWidth: '560px', background: 'var(--surface-page)',
          borderRadius: 'var(--radius-hero)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden',
          animation: 'mtfPop 240ms var(--ease-standard)', margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background: 'var(--surface-inverted)', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Eyebrow onDark>{headerLabel}</Eyebrow>
            <h3 id={titleId} style={{ color: 'var(--text-on-dark)', fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-semibold)', margin: '12px 0 0' }}>
              {headerTitle}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Dialog schließen" style={{ background: 'none', border: 'none', color: 'var(--text-on-dark-muted)', fontSize: '22px', cursor: 'pointer', lineHeight: 1, marginTop: '-2px' }}>×</button>
        </div>

        <div style={{ padding: '32px' }}>
          {step === 1 && (
            <div>
              <p id="step1-label" style={sectionLabel}>Flugerlebnis wählen</p>
              <div role="radiogroup" aria-labelledby="step1-label" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {flights.map((f) => {
                  const active = f.id === flightId;
                  return (
                    <button key={f.id} role="radio" aria-checked={active} onClick={() => setFlightId(f.id)} style={{
                      display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', textAlign: 'left', cursor: 'pointer',
                      background: 'var(--surface-card)', border: 'none', borderRadius: 'var(--radius-2xl)',
                      boxShadow: active ? 'var(--ring-accent)' : 'var(--ring-hairline)',
                      transition: 'box-shadow var(--dur-base) var(--ease-standard)',
                      fontFamily: 'var(--font-sans)', width: '100%',
                    }}>
                      <img src={f.image} alt="" aria-hidden="true" style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flex: 'none' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)', fontSize: 'var(--text-base)' }}>{f.title}</span>
                          {f.featured && <Badge variant="accent">Beliebt</Badge>}
                        </div>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{f.description.split('.')[0]}.</span>
                      </div>
                      <span style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{f.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Verfügbarkeitsinfo */}
              <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--ring-hairline)', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '18px', lineHeight: 1, marginTop: '1px' }}>🕓</span>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)' }}>
                        Täglich ab 16:00 Uhr
                      </p>
                      <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                        Bei schönem Wetter – Termine täglich nach Absprache
                      </p>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-hairline)' }} />
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '18px', lineHeight: 1, marginTop: '1px' }}>📅</span>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)' }}>
                        Wochenende: ganztägig
                      </p>
                      <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                        Samstag &amp; Sonntag – Termine vormittags und nachmittags möglich
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'rgba(209,18,16,0.06)', borderTop: '1px solid rgba(209,18,16,0.12)', padding: '12px 20px' }}>
                  <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-body)' }}>
                    Einfach Wunschtermin mitteilen – ich melde mich persönlich. Zahlung erst nach Bestätigung.
                  </p>
                </div>
              </div>

              {/* Wunschtermin */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="wish-date" style={sectionLabel}>Wunschdatum (optional)</label>
                  <input id="wish-date" type="date" value={wishDate} onChange={(e) => setWishDate(e.target.value)}
                    style={{
                      width: '100%', boxSizing: 'border-box', background: 'var(--surface-sunken)', border: 'none',
                      borderRadius: 'var(--radius-md)', padding: '12px', fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)', color: 'var(--text-strong)', outline: 'none',
                      boxShadow: 'inset 0 0 0 1px transparent',
                    }}
                    onFocus={(e) => { e.target.style.boxShadow = 'inset 0 0 0 1px var(--focus-ring)'; }}
                    onBlur={(e) => { e.target.style.boxShadow = 'inset 0 0 0 1px transparent'; }}
                  />
                </div>
                <Field label="Anmerkung" placeholder="z. B. lieber nachmittags, flexibel am Wochenende …"
                  value={wishNote} onChange={(e) => setWishNote(e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={sectionLabel}>Ihre Kontaktdaten</p>
              <Field label="Name" required placeholder="Max Mustermann"
                value={name} onChange={(e) => setName(e.target.value)} />
              <Field label="E-Mail" type="email" required placeholder="max@example.de"
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field label="Telefon" type="tel" placeholder="+49 …"
                value={phone} onChange={(e) => setPhone(e.target.value)} />
              {submitError && (
                <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--accent)', background: 'rgba(209,18,16,0.06)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
                  {submitError}
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0 12px' }}>
              <span aria-hidden="true" style={{ width: '44px', height: '44px', borderRadius: '9999px', background: 'var(--accent)', color: 'var(--on-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>✓</span>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-body)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>
                Ihre Anfrage für den <strong style={{ color: 'var(--text-strong)' }}>{flight.title}</strong>
                {wishDate ? <> zum Wunschdatum <strong style={{ color: 'var(--text-strong)' }}>{fmtWish(wishDate)}</strong></> : null} ist eingegangen.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0 }}>
                Ich melde mich persönlich mit einem passenden Terminvorschlag. Die Zahlung erfolgt erst nach Bestätigung.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 32px', borderTop: '1px solid var(--border-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--text-muted)' }}>{flight.title}</span>
            <span style={{ color: 'var(--text-strong)', fontWeight: 'var(--fw-semibold)', marginLeft: '8px' }}>{flight.price}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {step > 1 && step <= totalSteps && <Button variant="ghost" onClick={() => setStep(step - 1)}>Zurück</Button>}
            {step < totalSteps && <Button variant="primary" onClick={() => setStep(step + 1)}>Weiter</Button>}
            {step === totalSteps && (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={submitting || !name.trim() || !email.trim()}
              >
                {submitting ? 'Wird gesendet…' : 'Anfrage senden'}
              </Button>
            )}
            {step === 4 && <Button variant="primary" onClick={onClose}>Schließen</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
