import { useState } from 'react';
import { useLang } from '../i18n';
import { useReveal } from '../hooks/useReveal';
import { useBreakpoint } from '../hooks/useBreakpoint';

const CONTACT = {
  phoneDisplay: '+49 (0) 89 123 456 78',
  phoneHref: '+498912345678',
  whatsappHref: '498912345678',
  email: 'info@meintraumflug.de',
};

function ChannelIcon({ name }: { name: string }) {
  if (name === 'whatsapp') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
  if (name === 'phone') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
    </svg>
  );
}

interface ContactProps {
  onCallback: (num: string) => void;
}

export function Contact({ onCallback }: ContactProps) {
  const { t } = useLang();
  const c = t.contact;
  const [num, setNum] = useState('');
  const [sent, setSent] = useState(false);
  const { isMobile } = useBreakpoint();
  const { ref: cardRef, style: cardStyle } = useReveal();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!num.trim()) return;
    setSent(true);
    onCallback(num.trim());
  };

  function Channel({ icon, tone, label, value, href, hint }: {
    icon: string; tone: string; label: string; value: string; href: string; hint: string;
  }) {
    const [hover, setHover] = useState(false);
    return (
      <a href={href} target={icon === 'whatsapp' ? '_blank' : undefined} rel="noreferrer"
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '16px', padding: '20px',
          background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-2xl)',
          boxShadow: hover ? 'inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.18)' : 'inset 0 0 0 1px rgba(255,255,255,0.10)',
          transition: 'background var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
          transform: hover ? 'translateY(-2px)' : 'none', textDecoration: 'none',
        }}>
        <span style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xl)', background: tone, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <ChannelIcon name={icon} />
        </span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-on-dark-muted)', marginBottom: '4px' }}>{label}</span>
          <span style={{ display: 'block', fontSize: 'var(--text-base)', fontWeight: 'var(--fw-medium)', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
          <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-on-dark-muted)', marginTop: '2px' }}>{hint}</span>
        </span>
      </a>
    );
  }

  return (
    <section id="kontakt-band" style={{ padding: `0 var(--gutter) ${isMobile ? '64px' : '96px'}` }}>
      <div ref={cardRef as React.RefObject<HTMLDivElement>} style={{ ...cardStyle,
        maxWidth: 'var(--container-max)', margin: '0 auto',
        background: 'var(--surface-inverted)', borderRadius: 'var(--radius-hero)',
        padding: isMobile ? '28px' : '56px', color: 'var(--text-on-dark)',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.85fr 1.15fr', gap: isMobile ? '32px' : '56px', alignItems: 'center',
      }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-on-dark-muted)', marginBottom: '24px' }}>
            <span style={{ width: '2rem', height: '1px', background: 'var(--brand-red)' }} />{c.eyebrow}
          </span>
          <div style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: '#fff', lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', marginBottom: '24px', textWrap: 'balance' } as React.CSSProperties}>
            {c.heading}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <picture>
              <source srcSet="/assets/photos/pilot-portrait.webp" type="image/webp" />
              <img src="/assets/photos/pilot-portrait.jpg" alt={c.pilotName} loading="lazy"
                style={{ width: '56px', height: '56px', borderRadius: '9999px', objectFit: 'cover', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)', flex: 'none' }} />
            </picture>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-on-dark-muted)' }}>{c.pilotName} · meintraumflug</div>
          </div>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-on-dark-muted)', lineHeight: 'var(--leading-relaxed)', maxWidth: '40ch', margin: 0 }}>
            {c.responseNote}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
            <Channel icon="whatsapp" tone="#1fa855" label={c.whatsappLabel} value={c.whatsappValue} hint={c.whatsappHint}
              href={`https://wa.me/${CONTACT.whatsappHref}`} />
            <Channel icon="phone" tone="var(--brand-red)" label={c.phoneLabel} value={CONTACT.phoneDisplay} hint={c.phoneHint}
              href={`tel:${CONTACT.phoneHref}`} />
          </div>
          <Channel icon="mail" tone="rgba(255,255,255,0.14)" label={c.emailLabel} value={CONTACT.email} hint={c.emailHint}
            href={`mailto:${CONTACT.email}`} />

          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-2xl)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)', padding: '20px' }}>
            {sent ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '9999px', background: 'var(--brand-red)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>✓</span>
                <span style={{ fontSize: 'var(--text-sm)', color: '#fff' }}>{c.callbackConfirm(num)}</span>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="cb-num" style={{ fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-on-dark-muted)' }}>
                  {c.callbackLabel}
                </label>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px' }}>
                  <input id="cb-num" type="tel" value={num} onChange={(e) => setNum(e.target.value)} placeholder={c.callbackPlaceholder}
                    style={{ flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: '#fff', outline: 'none', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }} />
                  <button type="submit" style={{ flex: 'none', background: 'var(--accent)', color: 'var(--on-accent)', border: 'none', borderRadius: 'var(--radius-xl)', padding: isMobile ? '13px' : '0 22px', width: isMobile ? '100%' : 'auto', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {c.callbackSubmit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
