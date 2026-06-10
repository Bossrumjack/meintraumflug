import { FaqItem } from '../components/FaqItem';
import { Card } from '../components/Card';
import { Eyebrow } from '../components/Eyebrow';
import { useLang } from '../i18n';

const h2 = { fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', margin: 0 } as const;

function FactIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#d11210', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const n = name.toLowerCase();
  if (n.includes('plätze') || n.includes('seats')) return (
    <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17.5" cy="9" r="2.2" /><path d="M16 19a4 4 0 0 1 5.5-3.7" /></svg>
  );
  if (n.includes('gewicht') || n.includes('weight')) return (
    <svg {...common}><path d="M7 7h10l2.5 12.5H4.5L7 7Z" /><circle cx="12" cy="4.5" r="1.6" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
  );
  if (n.includes('alter') || n.includes('age')) return (
    <svg {...common}><path d="M12 21s-7-4.5-7-9.5a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11.5C19 16.5 12 21 12 21Z" /></svg>
  );
  return (
    <svg {...common}><path d="M12 21V7" /><path d="M5 12s3-5 7-5 7 5 7 5" /><path d="M9 21h6" /></svg>
  );
}

export function FaqContact() {
  const { t } = useLang();
  const f = t.faq;

  return (
    <section id="kontakt" style={{ padding: '96px var(--gutter)', background: 'rgba(244,244,245,0.5)', borderTop: '1px solid var(--border-soft)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
        <div>
          <h2 style={{ ...h2, marginBottom: '32px' }}>{f.heading}</h2>
          <div>
            {t.faqs.map((faq, i) => (
              <FaqItem key={faq.q} question={faq.q} defaultOpen={i === 0}>{faq.a}</FaqItem>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow>{f.guteysEyebrow}</Eyebrow>
          <h2 style={{ ...h2, margin: '16px 0 28px' }}>{f.guteysHeading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
            {f.facts.map((fact) => (
              <Card key={fact.k} padding={20} radius="2xl">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <FactIcon name={fact.k} />
                  <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)' }}>{fact.k}</span>
                </div>
                <div style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 1.1 }}>{fact.v}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 'var(--leading-snug)' }}>{fact.sub}</div>
              </Card>
            ))}
          </div>
          <Card variant="sunken" padding={24} radius="2xl">
            <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)', marginBottom: '16px' }}>{f.notesLabel}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {f.notes.map((n) => (
                <li key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-snug)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: 'var(--brand-red)', flex: 'none', marginTop: '7px' }} />{n}
                </li>
              ))}
            </ul>
          </Card>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: '16px 2px 0' }}>{f.guteysNote}</p>
        </div>
      </div>
    </section>
  );
}
