import { LogoMark, Wordmark } from './LogoMark';
import { useLang } from '../i18n';

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer style={{ background: 'var(--surface-inverted)', color: 'var(--text-on-dark-muted)', padding: '64px var(--gutter)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LogoMark size={26} dark />
            <Wordmark onDark size={13} />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', maxWidth: '24ch' }}>{f.tagline}</p>
        </div>
        {f.cols.map((col) => (
          <div key={col.title}>
            <h4 style={{ color: 'var(--zinc-50)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', margin: '0 0 24px' }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {col.links.map((l) => {
                const link = l as { label: string; href: string | null };
                const isExternal = link.href?.startsWith('http');
                return (
                  <li key={link.label} style={{ fontSize: 'var(--text-xs)', lineHeight: 1.4 }}>
                    {link.href ? (
                      <a href={link.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        onClick={isExternal ? undefined : () => window.scrollTo(0, 0)}
                        style={{ color: 'inherit', transition: 'color var(--dur-base) var(--ease-standard)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--zinc-50)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
                        {link.label}
                      </a>
                    ) : link.label}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 'var(--container-max)', margin: '48px auto 0', paddingTop: '32px', borderTop: '1px solid var(--border-on-dark)' }}>
        <span style={{ fontSize: '10px', color: 'var(--zinc-600)' }}>{f.copyright}</span>
      </div>
    </footer>
  );
}
