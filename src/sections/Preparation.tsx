import type { CSSProperties } from 'react';
import { useLang } from '../i18n';

const CARD_STYLE: CSSProperties = { background: 'var(--surface-page)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-panel)', padding: '32px' };
const SUNKEN: CSSProperties = { background: 'var(--surface-sunken)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-xl)', padding: '20px 24px' };
const LABEL: CSSProperties = { fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)' as const, textTransform: 'uppercase' as const, letterSpacing: 'var(--tracking-label)', color: 'var(--brand-red)', marginBottom: '12px' };
const H3: CSSProperties = { fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-semibold)' as const, color: 'var(--text-strong)', lineHeight: 'var(--leading-snug)', margin: '0 0 20px' };
const BODY: CSSProperties = { fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-normal)', margin: 0 };

function IcoPin() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 1.5a6 6 0 0 1 6 6c0 3.5-4.5 9.5-6 11-1.5-1.5-6-7.5-6-11a6 6 0 0 1 6-6Z" stroke="var(--brand-red)" strokeWidth="1.5" fill="none"/><circle cx="10" cy="7.5" r="2.2" stroke="var(--brand-red)" strokeWidth="1.5"/></svg>;
}
function IcoBag() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="7" width="14" height="10" rx="2" stroke="var(--brand-red)" strokeWidth="1.5"/><path d="M7 7V5.5a3 3 0 0 1 6 0V7" stroke="var(--brand-red)" strokeWidth="1.5"/></svg>;
}
function IcoAircraft() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 13.5c4-1.5 7-5.5 7-10" stroke="var(--brand-red)" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 3.5c0 4.5 3 8 7 9.5" stroke="var(--brand-red)" strokeWidth="1.5" strokeLinecap="round"/><path d="M5 17c1.5-1 3.5-3 5-4s3-2 5-2" stroke="var(--brand-red)" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IcoStar() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2l2.06 5.43H17.5l-4.53 3.27 1.72 5.43L10 13.1l-4.69 3.03 1.72-5.43L2.5 7.43H7.94L10 2Z" stroke="var(--brand-red)" strokeWidth="1.4" strokeLinejoin="round"/></svg>;
}

function CheckItem({ text }: { text: string }) {
  return (
    <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-normal)', paddingBottom: '8px' }}>
      <span style={{ color: 'var(--brand-red)', fontSize: '14px', lineHeight: '1.6', flexShrink: 0 }}>✓</span>
      <span>{text}</span>
    </li>
  );
}

export function Preparation() {
  const { t } = useLang();
  const p = t.preparation;

  return (
    <section id="vorbereitung" aria-labelledby="vorbereitung-heading" style={{ padding: '96px var(--gutter)', background: 'var(--surface-alt)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: '60ch', marginBottom: '64px' }}>
          <p style={LABEL}>{p.eyebrow}</p>
          <h2 id="vorbereitung-heading" style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', margin: '0 0 20px' }}>
            {p.heading}
          </h2>
          <p style={{ ...BODY, fontSize: 'var(--text-lg)' }}>{p.intro}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <article aria-labelledby="anreise-heading" style={CARD_STYLE}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <IcoPin />
              <p style={{ ...LABEL, margin: 0 }}>{p.arrivalEyebrow}</p>
            </div>
            <h3 id="anreise-heading" style={H3}>{p.arrivalHeading}</h3>
            <p style={BODY}>{t.lang === 'de' ? 'Wir starten von einem der traditionsreichsten Flugplätze Oberbayerns:' : 'We depart from one of the most traditional airfields in Upper Bavaria:'}</p>
            <div style={{ ...SUNKEN, margin: '16px 0' }}>
              <p style={{ ...BODY, fontWeight: 'var(--fw-medium)' as const }}>{p.arrivalAddress.split('\n').map((line, i) => <span key={i}>{line}{i === 0 ? <br /> : null}</span>)}</p>
            </div>
            <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
              {p.arrivalItems.map((item) => <CheckItem key={item} text={item} />)}
            </ul>
          </article>

          <article aria-labelledby="mitbringen-heading" style={CARD_STYLE}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <IcoBag />
              <p style={{ ...LABEL, margin: 0 }}>{p.packEyebrow}</p>
            </div>
            <h3 id="mitbringen-heading" style={H3}>{p.packHeading}</h3>
            <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
              {p.packItems.map((item) => <CheckItem key={item} text={item} />)}
            </ul>
            <div style={{ ...SUNKEN, marginTop: '16px' }}>
              <p style={BODY}>{p.packTip}</p>
            </div>
          </article>
        </div>

        <div style={{ ...CARD_STYLE, marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <IcoAircraft />
            <p style={{ ...LABEL, margin: 0 }}>{p.dayEyebrow}</p>
          </div>
          <h3 style={{ ...H3, marginBottom: '32px' }}>{p.dayHeading}</h3>
          <ol aria-label={p.dayAriaLabel} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {p.dayPhases.map((ph) => (
              <li key={ph.n} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span aria-hidden="true" style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '9999px', background: 'var(--brand-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-sm)' }}>{ph.n}</span>
                <div>
                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', margin: '0 0 8px' }}>{ph.title}</h4>
                  <p style={BODY}>{ph.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <article aria-labelledby="nachflug-heading" style={CARD_STYLE}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <IcoStar />
              <p style={{ ...LABEL, margin: 0 }}>{p.afterEyebrow}</p>
            </div>
            <h3 id="nachflug-heading" style={H3}>{p.afterHeading}</h3>
            <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
              {p.afterItems.map((item) => <CheckItem key={item} text={item} />)}
            </ul>
          </article>

          <article aria-labelledby="wetter-heading" style={{ ...CARD_STYLE, background: 'var(--surface-inverted)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ ...LABEL, color: 'rgba(255,255,255,0.55)' }}>{p.wxEyebrow}</p>
            <h3 id="wetter-heading" style={{ ...H3, color: '#fff' }}>{p.wxHeading}</h3>
            <p style={{ ...BODY, color: 'rgba(255,255,255,0.70)', marginBottom: '20px' }}>{p.wxIntro}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {p.wxRows.map((row) => (
                <div key={row.k} style={{ ...SUNKEN, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' as const }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: 'var(--fw-bold)' as const, textTransform: 'uppercase' as const, letterSpacing: 'var(--tracking-label)', color: 'rgba(255,255,255,0.45)', marginBottom: '4px' }}>{row.k}</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)' as const, color: '#fff' }}>{row.v}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.40)', whiteSpace: 'nowrap' as const }}>{row.note}</span>
                </div>
              ))}
            </div>
            <p style={{ ...BODY, color: 'rgba(255,255,255,0.55)', marginTop: '16px', fontSize: '12px' }}>{p.wxNote}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
