import { useRef, useState, useEffect } from 'react';
import { useLang } from '../i18n';

function IconKalender() {
  return (
    <svg className="mtf-ico mtf-ico-cal" width="56" height="56" viewBox="0 0 48 48" fill="none">
      <path className="d d1" pathLength={1} d="M9 12.5h30a2 2 0 0 1 2 2V38a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V14.5a2 2 0 0 1 2-2Z" stroke="#0c0c0f" strokeWidth="2" strokeLinejoin="round" />
      <path className="d d2" pathLength={1} d="M7 20h34" stroke="#0c0c0f" strokeWidth="2" />
      <path className="d d3" pathLength={1} d="M15 8.5v6M33 8.5v6" stroke="#0c0c0f" strokeWidth="2" strokeLinecap="round" />
      <circle className="pop p1" cx="24" cy="30" r="5.4" fill="#d11210" />
      <path className="d d4" pathLength={1} d="m21.6 30 1.7 1.7 3.1-3.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBriefing() {
  return (
    <svg className="mtf-ico mtf-ico-brief" width="56" height="56" viewBox="0 0 48 48" fill="none">
      <path className="d d1" pathLength={1} d="M12 9h24a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Z" stroke="#0c0c0f" strokeWidth="2" strokeLinejoin="round" />
      <path className="d d2" pathLength={1} d="M19 9V7.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V9" stroke="#0c0c0f" strokeWidth="2" strokeLinejoin="round" />
      <path className="check c1" pathLength={1} d="m16 18.5 1.8 1.8 3.4-3.6" stroke="#d11210" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className="d ln l1" pathLength={1} d="M25 18.5h8" stroke="#0c0c0f" strokeWidth="2" strokeLinecap="round" />
      <path className="check c2" pathLength={1} d="m16 26.5 1.8 1.8 3.4-3.6" stroke="#d11210" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className="d ln l2" pathLength={1} d="M25 26.5h8" stroke="#0c0c0f" strokeWidth="2" strokeLinecap="round" />
      <path className="check c3" pathLength={1} d="m16 34.5 1.8 1.8 3.4-3.6" stroke="#d11210" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className="d ln l3" pathLength={1} d="M25 34.5h8" stroke="#0c0c0f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconAbheben() {
  return (
    <svg className="mtf-ico mtf-ico-takeoff" width="56" height="56" viewBox="0 0 48 48" fill="none">
      <path className="d trail" pathLength={1} d="M7 41c8 0 12-4 18-11s9-13 9-19" stroke="#c9c9d0" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.5 6" />
      <g className="rotor">
        <circle cx="34" cy="11" r="9.5" stroke="#0c0c0f" strokeWidth="2" />
        <g className="blade">
          <rect x="22.5" y="9.4" width="23" height="3.2" rx="1.6" fill="#0c0c0f" />
        </g>
        <circle cx="34" cy="11" r="2.6" fill="#d11210" />
      </g>
    </svg>
  );
}

const ICONS = [IconKalender, IconBriefing, IconAbheben];

export function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const trigger = () => { if (!done) { done = true; setInView(true); } };
    let obs: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) trigger(); }); }, { threshold: 0.35 });
      obs.observe(el);
    }
    const onScroll = () => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight * 0.85 && r.bottom > 0) trigger(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const tm = setTimeout(trigger, 1200);
    return () => { obs?.disconnect(); window.removeEventListener('scroll', onScroll); clearTimeout(tm); };
  }, []);

  return (
    <section id="ablauf" style={{ padding: '96px var(--gutter)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', textAlign: 'center', marginBottom: '72px' }}>
          {t.process.heading}
        </h2>
        <ol ref={ref} className={`mtf-steps${inView ? ' in' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', listStyle: 'none', margin: 0, padding: 0 }}>
          {t.process.steps.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li key={s.n} className="mtf-step" style={{ ['--i' as string]: i, position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="mtf-step-tile" aria-hidden="true">
                  <Icon />
                  <span className="mtf-step-num">{s.n}</span>
                </div>
                <h4 style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)', margin: '24px 0 12px' }}>{s.title}</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', maxWidth: '34ch', margin: 0 }}>{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
