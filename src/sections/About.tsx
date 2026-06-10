import { Eyebrow } from '../components/Eyebrow';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { useLang } from '../i18n';

const h2style = { fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', margin: 0, textWrap: 'balance' } as const;

export function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="ueber-mich" style={{ padding: '96px var(--gutter)', borderTop: '1px solid var(--border-soft)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '48px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <h2 style={h2style}>{a.heading}</h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-body)', maxWidth: '58ch', margin: 0 }}>{a.body}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {a.stats.map((s) => (
              <StatCard key={s.label} label={s.label}>{s.value}</StatCard>
            ))}
          </div>
          <Card variant="inverted" radius="panel" padding={40}>
            <p style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-on-dark-muted)', margin: '0 0 16px' }}>{a.promise}</p>
            <p style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--fw-medium)', lineHeight: 'var(--leading-snug)', color: 'var(--text-on-dark)', maxWidth: '26ch', margin: 0, textWrap: 'balance' }}>
              {a.promiseText}
            </p>
          </Card>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '20px' }}>
          <picture>
            <source srcSet="/assets/photos/pilot-portrait.webp" type="image/webp" />
            <img src="/assets/photos/pilot-portrait.jpg" alt={a.imgPilotAlt} loading="lazy"
              style={{ width: '100%', height: '100%', minHeight: '320px', objectFit: 'cover', borderRadius: 'var(--radius-panel)', boxShadow: 'var(--ring-hairline)' }} />
          </picture>
          <div style={{ display: 'grid', gap: '20px' }}>
            <picture>
              <source srcSet="/assets/photos/cockpit-flight.webp" type="image/webp" />
              <img src="/assets/photos/cockpit-flight.jpg" alt={a.imgCockpitAlt} loading="lazy"
                style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: 'var(--radius-3xl)', boxShadow: 'var(--ring-hairline)' }} />
            </picture>
            <Card variant="sunken" radius="3xl" padding={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
              <p style={{ fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)', margin: 0 }}>{a.preflight}</p>
              <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--fw-medium)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-strong)', margin: 0 }}>
                {a.preflightText}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
