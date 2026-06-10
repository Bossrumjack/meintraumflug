import type { ReactNode } from 'react';
import { LogoMark, Wordmark } from '../sections/LogoMark';

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,250,250,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-soft)',
      }}>
        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          height: 'var(--nav-height)', padding: '0 var(--gutter)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="#" onClick={() => { window.location.hash = ''; window.scrollTo(0, 0); }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LogoMark />
            <Wordmark />
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.scrollTo(0, 0); }}
            style={{
              fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)',
              color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'color var(--dur-base) var(--ease-standard)',
            }}
          >
            ← Zur Startseite
          </a>
        </div>
      </nav>

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '64px var(--gutter) 96px' }}>
        <h1 style={{
          fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)',
          color: 'var(--text-strong)', letterSpacing: 'var(--tracking-tight)',
          marginBottom: '48px', paddingBottom: '32px',
          borderBottom: '1px solid var(--border-soft)',
        }}>
          {title}
        </h1>
        <div className="legal-content">
          {children}
        </div>
      </main>

      <footer style={{
        background: 'var(--surface-inverted)', color: 'var(--text-on-dark-muted)',
        padding: '32px var(--gutter)', textAlign: 'center',
        borderTop: '1px solid var(--border-soft)',
      }}>
        <span style={{ fontSize: '10px', color: 'var(--zinc-600)' }}>
          © 2026 meintraumflug GmbH. Alle Rechte vorbehalten.
        </span>
      </footer>

      <style>{`
        .legal-content h2 {
          font-size: var(--text-h3);
          font-weight: var(--fw-semibold);
          color: var(--text-strong);
          margin: 40px 0 12px;
        }
        .legal-content h3 {
          font-size: var(--text-base);
          font-weight: var(--fw-semibold);
          color: var(--text-strong);
          margin: 28px 0 8px;
        }
        .legal-content p {
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
          color: var(--text-body);
          margin-bottom: 16px;
        }
        .legal-content ul, .legal-content ol {
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
          color: var(--text-body);
          padding-left: 24px;
          margin-bottom: 16px;
        }
        .legal-content li { margin-bottom: 6px; }
        .legal-content strong { color: var(--text-strong); font-weight: var(--fw-medium); }
        .legal-content a { color: var(--brand-red); }
        .legal-content a:hover { text-decoration: underline; }
        .legal-content .legal-block {
          background: var(--surface-sunken);
          border-radius: var(--radius-2xl);
          padding: 24px 28px;
          margin-bottom: 24px;
        }
        .legal-content .legal-block p { margin-bottom: 4px; }
      `}</style>
    </>
  );
}
