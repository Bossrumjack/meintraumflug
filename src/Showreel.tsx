import { useRef, useEffect } from 'react';

interface ShowreelProps {
  onClose: () => void;
}

export function Showreel({ onClose }: ShowreelProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (v) {
      v.muted = false;
      v.volume = 0.8;
      v.play().catch(() => {});
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
      style={{
        position: 'fixed', inset: 0, zIndex: 120,
        background: 'rgba(8,8,11,0.86)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px',
        animation: 'mtfFade 200ms var(--ease-standard)',
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', width: '100%', maxWidth: '1040px',
        animation: 'mtfPop 260ms var(--ease-standard)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'rgba(255,255,255,0.78)' }}>
            <span style={{ width: '2rem', height: '1px', background: 'var(--brand-red)' }} />Showreel · Regenrunde
          </span>
          <button
            onClick={onClose}
            aria-label="Schließen"
            style={{
              width: '40px', height: '40px', borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.22)',
              background: 'rgba(255,255,255,0.08)', color: '#fff',
              fontSize: '20px', cursor: 'pointer', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        </div>
        <video
          ref={ref}
          controls
          autoPlay
          playsInline
          preload="auto"
          poster="/assets/photos/aerial-bavaria.webp"
          style={{
            width: '100%', aspectRatio: '16 / 9', objectFit: 'cover',
            borderRadius: 'var(--radius-3xl)',
            boxShadow: '0 30px 70px -20px rgba(0,0,0,0.7)',
            background: '#000', display: 'block',
          }}
        >
          <source src="/assets/photos/regenrunde.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
