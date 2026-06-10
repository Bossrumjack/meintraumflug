import { useState, useId } from 'react';
import { Button } from './components/Button';
import { Badge } from './components/Badge';
import { Eyebrow } from './components/Eyebrow';
import { Field } from './components/Field';
import { useFocusTrap } from './hooks/useFocusTrap';
import type { Flight } from './data';

/* >>> STRIPE HANDOFF:
 * Step 4 "Bezahlen" is a UI placeholder. To wire real payments:
 * 1. POST to your backend to create a Stripe PaymentIntent → get client_secret
 * 2. Mount <PaymentElement> on that client_secret (replace the card Field block)
 * 3. On "Jetzt bezahlen": call stripe.confirmPayment() → on success setStep(5)
 * 4. Wire real availability to DATES/TIMES from Cal.com or custom slot model
 * 5. On success: send confirmation email (Resend) + Gutschein PDF if voucher
 */

const DATES = ['Sa, 14. Juni', 'So, 15. Juni', 'Sa, 21. Juni', 'So, 22. Juni'];
const TIMES = ['09:30', '11:00', '14:00', '16:30'];
const PAY_METHODS = ['Karte', 'Apple Pay', 'Google Pay', 'Klarna', 'SEPA'];
const TOTAL_STEPS = 4;

interface BookingDialogProps {
  flights: Flight[];
  initialFlight: Flight | null;
  onClose: () => void;
}

export function BookingDialog({ flights, initialFlight, onClose }: BookingDialogProps) {
  const [step, setStep] = useState(1);
  const [flightId, setFlightId] = useState(initialFlight ? initialFlight.id : flights[0].id);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState('Karte');
  const [paying, setPaying] = useState(false);
  const flight = flights.find((f) => f.id === flightId) || flights[0];
  const titleId = useId();
  const panelRef = useFocusTrap(true) as React.RefObject<HTMLDivElement>;

  const chip = (active: boolean) => ({
    padding: '10px 16px', borderRadius: 'var(--radius-xl)', fontSize: 'var(--text-sm)',
    fontWeight: 'var(--fw-medium)' as const, cursor: 'pointer', textAlign: 'center' as const,
    background: active ? 'var(--accent)' : 'var(--surface-sunken)',
    color: active ? 'var(--on-accent)' : 'var(--text-strong)',
    boxShadow: active ? 'none' : 'var(--ring-hairline)',
    transition: 'all var(--dur-base) var(--ease-standard)',
    border: 'none', fontFamily: 'var(--font-sans)',
  });

  const sectionLabel = { fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)' as const, textTransform: 'uppercase' as const, letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)', margin: '0 0 12px' };

  const headerLabel = step > TOTAL_STEPS ? 'Bestätigt' : `Schritt ${step} von ${TOTAL_STEPS}`;
  const headerTitle = step > TOTAL_STEPS ? 'Buchung bestätigt' : 'Flug buchen';

  const pay = () => {
    setPaying(true);
    // >>> STRIPE: replace with stripe.confirmPayment() → on success setStep(5)
    setTimeout(() => { setPaying(false); setStep(5); }, 900);
  };

  const onEsc = (e: React.KeyboardEvent) => { if (e.key === 'Escape') onClose(); };

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <p id="date-label" style={sectionLabel}>Datum</p>
                <div role="radiogroup" aria-labelledby="date-label" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {DATES.map((d) => (
                    <button key={d} role="radio" aria-checked={d === date} style={chip(d === date)} onClick={() => setDate(d)}>{d}</button>
                  ))}
                </div>
              </div>
              <div>
                <p id="time-label" style={sectionLabel}>Uhrzeit</p>
                <div role="radiogroup" aria-labelledby="time-label" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {TIMES.map((t) => (
                    <button key={t} role="radio" aria-checked={t === time} style={chip(t === time)} onClick={() => setTime(t)}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={sectionLabel}>Ihre Kontaktdaten</p>
              <Field label="Name" required placeholder="Max Mustermann" />
              <Field label="E-Mail" type="email" required placeholder="max@example.de" />
              <Field label="Telefon" type="tel" placeholder="+49 …" />
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <p id="pay-label" style={sectionLabel}>Zahlungsart</p>
                <div role="radiogroup" aria-labelledby="pay-label" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {PAY_METHODS.map((m) => (
                    <button key={m} role="radio" aria-checked={m === payMethod} style={{ ...chip(m === payMethod), padding: '9px 14px' }} onClick={() => setPayMethod(m)}>{m}</button>
                  ))}
                </div>
              </div>

              {/* >>> STRIPE: replace this block with <PaymentElement /> */}
              {payMethod === 'Karte' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Field label="Kartennummer" placeholder="4242 4242 4242 4242" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field label="Gültig bis" placeholder="MM / JJ" />
                    <Field label="CVC" placeholder="123" />
                  </div>
                  <Field label="Name auf der Karte" placeholder="Max Mustermann" />
                </div>
              ) : (
                <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--ring-hairline)', padding: '24px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
                    Sie werden zur Zahlung mit <strong style={{ color: 'var(--text-strong)' }}>{payMethod}</strong> weitergeleitet.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Gesamt</span>
                <span style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{flight.price}</span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '9999px', background: 'var(--brand-red)', flex: 'none' }} />
                Sichere Zahlung · 3 Jahre umbuchbar · Demo — keine echte Abbuchung
              </p>
            </div>
          )}

          {step === 5 && (
            <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0 12px' }}>
              <span aria-hidden="true" style={{ width: '44px', height: '44px', borderRadius: '9999px', background: 'var(--accent)', color: 'var(--on-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>✓</span>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-body)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>
                Ihr <strong style={{ color: 'var(--text-strong)' }}>{flight.title}</strong> am <strong style={{ color: 'var(--text-strong)' }}>{date || DATES[0]}</strong> um <strong style={{ color: 'var(--text-strong)' }}>{time || TIMES[0]} Uhr</strong> ist gebucht.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0 }}>
                Eine Bestätigung mit allen Details ist auf dem Weg in Ihr Postfach. Wir freuen uns auf Ihren Flug!
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
            {step > 1 && step <= TOTAL_STEPS && <Button variant="ghost" onClick={() => setStep(step - 1)}>Zurück</Button>}
            {step < 3 && <Button variant="primary" onClick={() => setStep(step + 1)} disabled={step === 2 && (!date || !time)}>Weiter</Button>}
            {step === 3 && <Button variant="primary" onClick={() => setStep(4)}>Zur Zahlung</Button>}
            {step === 4 && <Button variant="primary" onClick={pay} disabled={paying}>{paying ? 'Wird verarbeitet…' : `Jetzt bezahlen · ${flight.price}`}</Button>}
            {step === 5 && <Button variant="primary" onClick={onClose}>Schließen</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
