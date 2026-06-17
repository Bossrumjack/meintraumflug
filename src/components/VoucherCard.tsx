export const VOUCHER_MOTIFS = [
  { id: 'aerial',  src: '/assets/photos/aerial-bavaria.jpg',  label: 'Alpenpanorama' },
  { id: 'gyro',    src: '/assets/photos/gyrocopter.jpg',      label: 'Der Gyrocopter' },
  { id: 'cockpit', src: '/assets/photos/cockpit-flight.jpg',  label: 'Im Cockpit' },
];

export interface VoucherData {
  kind: 'value' | 'experience';
  value: number | string;
  experience: string;
  motif: string;
  recipient: string;
  message: string;
  code: string;
}

export const DEFAULT_VOUCHER: VoucherData = {
  kind: 'value', value: 279, experience: 'Alpenrundflug', motif: 'aerial',
  recipient: '', message: '', code: 'MTF-7K2Q-9X4D',
};

interface VoucherCardProps {
  data: VoucherData;
  scale?: number;
}

export function VoucherCard({ data: d, scale = 1 }: VoucherCardProps) {
  const motif = VOUCHER_MOTIFS.find((m) => m.id === d.motif) || VOUCHER_MOTIFS[0];
  const headline = d.kind === 'value' ? `${d.value} €` : d.experience;
  const kindLabel = d.kind === 'value' ? 'Wertgutschein' : 'Erlebnis-Gutschein';

  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: '1.62 / 1',
      borderRadius: 'var(--radius-hero)', overflow: 'hidden',
      boxShadow: '0 30px 60px -24px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.10)',
      color: '#fff', fontSize: `${scale}rem`,
    }}>
      <img src={motif.src} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(12,12,15,0.82) 0%, rgba(12,12,15,0.46) 46%, rgba(12,12,15,0.18) 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--brand-red)' }} />
      <div style={{ position: 'relative', height: '100%', padding: '1.6em 1.9em', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55em' }}>
            <svg width="1.7em" height="1.7em" viewBox="0 0 48 48" fill="none" style={{ flex: 'none' }}>
              <circle cx="24" cy="24" r="21" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
              <circle cx="24" cy="24" r="14.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
              <rect x="2.5" y="22" width="43" height="4" rx="2" fill="#fafafa" transform="rotate(-21 24 24)" />
              <circle cx="24" cy="24" r="4.6" fill="#d11210" />
            </svg>
            <span style={{ fontWeight: 'var(--fw-medium)', fontSize: '0.92em', textTransform: 'uppercase', letterSpacing: '-0.04em' }}>meintraumflug</span>
          </div>
          <span style={{ fontSize: '0.6em', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.8)' }}>Flug-Gutschein</span>
        </div>
        <div>
          <p style={{ margin: '0 0 0.35em', fontSize: '0.62em', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>{kindLabel}</p>
          <p style={{ margin: 0, fontSize: '2.5em', fontWeight: 'var(--fw-semibold)', lineHeight: 1, letterSpacing: '-0.03em', textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}>{headline}</p>
          {d.message ? (
            <p style={{ margin: '0.8em 0 0', fontSize: '0.82em', fontStyle: 'italic', color: 'rgba(255,255,255,0.88)', maxWidth: '24em', lineHeight: 1.45 }}>„{d.message}"</p>
          ) : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1em', paddingTop: '0.9em', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <div>
            <p style={{ margin: '0 0 0.25em', fontSize: '0.58em', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}>Für</p>
            <p style={{ margin: 0, fontSize: '1em', fontWeight: 'var(--fw-medium)' }}>{d.recipient || 'Ihre/n Beschenkte/n'}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 0.25em', fontSize: '0.72em', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.82)' }}>{d.code}</p>
            <p style={{ margin: 0, fontSize: '0.62em', color: 'rgba(255,255,255,0.6)' }}>3 Jahre gültig</p>
          </div>
        </div>
      </div>
    </div>
  );
}
