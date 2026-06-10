import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { LogoMark, Wordmark } from './LogoMark';
import { useLang } from '../i18n';

interface NavProps {
  onBook: () => void;
}

export function Nav({ onBook }: NavProps) {
  const { t, toggle } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onGlass = !solid;
  const linkColor = (active: boolean) => onGlass
    ? (active ? '#fff' : 'rgba(255,255,255,0.82)')
    : (active ? 'var(--zinc-950)' : 'var(--zinc-600)');

  return (
    <nav aria-label={t.lang === 'de' ? 'Hauptnavigation' : 'Main navigation'} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: solid ? 'rgba(250,250,250,0.85)' : 'rgba(12,12,15,0.14)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: solid ? '1px solid var(--border-soft)' : '1px solid rgba(255,255,255,0.10)',
      transition: 'background var(--dur-slow) var(--ease-standard), border-color var(--dur-slow) var(--ease-standard)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', height: 'var(--nav-height)',
        padding: '0 var(--gutter)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LogoMark dark={onGlass} />
          <Wordmark onDark={onGlass} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)',
                color: linkColor(hovered === l.href),
                transition: 'color var(--dur-base) var(--ease-standard)',
              }}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggle}
            aria-label={t.langLabel}
            style={{
              background: 'transparent',
              border: onGlass ? '1px solid rgba(255,255,255,0.30)' : '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: onGlass ? 'rgba(255,255,255,0.80)' : 'var(--text-body)',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 'var(--fw-bold)',
              letterSpacing: '0.08em',
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
            }}
          >
            {t.langToggle}
          </button>
          <Button variant="primary" size="sm" onClick={onBook}>{t.nav.book}</Button>
        </div>
      </div>
    </nav>
  );
}
