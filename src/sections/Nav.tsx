import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { useLang } from '../i18n';
import { useBreakpoint } from '../hooks/useBreakpoint';

interface NavProps {
  onBook: () => void;
}

export function Nav({ onBook }: NavProps) {
  const { t, toggle } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mode, setMode] = useState<'transparent' | 'dark' | 'light'>('transparent');
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 10) setMode('transparent');
      else if (y < window.innerHeight - 64) setMode('dark');
      else setMode('light');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const onGlass = mode !== 'light';

  return (
    <>
      <nav aria-label={t.lang === 'de' ? 'Hauptnavigation' : 'Main navigation'} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: mode === 'light' ? 'rgba(250,250,250,0.88)' : mode === 'dark' ? 'rgba(0,0,0,0.45)' : 'transparent',
        backdropFilter: mode !== 'transparent' ? 'blur(12px)' : 'none', WebkitBackdropFilter: mode !== 'transparent' ? 'blur(12px)' : 'none',
        borderBottom: mode === 'light' ? '1px solid var(--border-soft)' : '1px solid transparent',
        transition: 'background var(--dur-slow) var(--ease-standard), border-color var(--dur-slow) var(--ease-standard)',
      }}>
        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto', height: 'var(--nav-height)',
          padding: '0 var(--gutter)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={onGlass ? '/assets/logo-meintraumflug-light.png' : '/assets/logo-meintraumflug.png'}
              alt="meintraumflug"
              height={48}
              style={{ height: '48px', width: 'auto', display: 'block', transition: 'opacity var(--dur-base) var(--ease-standard)' }}
            />
          </a>

          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {t.nav.links.map((l) => (
                <a key={l.href} href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)',
                    color: mode === 'light' ? 'var(--text-strong)' : '#fff',
                    textDecoration: 'none',
                    paddingBottom: '3px',
                    borderBottom: hovered === l.href ? '2px solid var(--brand-red)' : '2px solid transparent',
                    transition: 'color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
                  }}>
                  {l.label}
                </a>
              ))}
            </div>
          )}

          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={toggle}
                aria-label={t.langLabel}
                style={{
                  background: 'transparent',
                  border: onGlass ? '1px solid rgba(255,255,255,0.30)' : '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-xl)',
                  color: onGlass ? 'rgba(255,255,255,0.80)' : 'var(--text-body)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 'var(--fw-bold)',
                  letterSpacing: '0.08em',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  transition: 'color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
                }}
              >
                {t.langToggle}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' }}>
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <Button variant="primary" size="md" onClick={onBook}>{t.nav.book}</Button>
            </div>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              style={{
                background: 'transparent', border: 'none', padding: '8px',
                cursor: 'pointer',
                color: onGlass && !menuOpen ? '#fff' : 'var(--text-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'rgba(0,0,0,0.94)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column',
          paddingTop: 'var(--nav-height)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '32px var(--gutter)', gap: 0, flex: 1, overflowY: 'auto' }}>
            {t.nav.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '1.25rem', fontWeight: 'var(--fw-medium)',
                  color: '#fff', textDecoration: 'none',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                {l.label}
              </a>
            ))}
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="primary" size="md" onClick={() => { setMenuOpen(false); onBook(); }} style={{ width: '100%' }}>
                {t.nav.book}
              </Button>
              <button onClick={toggle} aria-label={t.langLabel} style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.30)',
                borderRadius: 'var(--radius-xl)', color: 'rgba(255,255,255,0.80)',
                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 'var(--fw-bold)',
                letterSpacing: '0.08em', padding: '12px 20px', cursor: 'pointer', width: '100%',
              }}>
                {t.langToggle}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
