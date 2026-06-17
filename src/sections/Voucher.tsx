import { Button } from '../components/Button';
import { VoucherCard, DEFAULT_VOUCHER } from '../components/VoucherCard';
import { useLang } from '../i18n';
import { useReveal } from '../hooks/useReveal';
import { useBreakpoint } from '../hooks/useBreakpoint';

const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto' };
const h2 = { fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', margin: 0 } as const;

interface VoucherProps {
  onConfigure: () => void;
}

export function Voucher({ onConfigure }: VoucherProps) {
  const { t } = useLang();
  const v = t.voucher;
  const { isMobile } = useBreakpoint();
  const { ref, style: revealStyle } = useReveal();

  return (
    <section id="gutscheine" style={{ padding: `${isMobile ? '64px' : '96px'} var(--gutter)` }}>
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ ...revealStyle,
        ...wrap,
        background: 'var(--surface-inverted)', borderRadius: 'var(--radius-hero)',
        padding: isMobile ? '32px' : '64px', color: 'var(--text-on-dark)',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr', gap: isMobile ? '40px' : '56px', alignItems: 'center',
      }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--text-on-dark-muted)', marginBottom: '20px' }}>
            <span style={{ width: '2rem', height: '1px', background: 'var(--brand-red)' }} />{v.eyebrow}
          </span>
          <h2 style={{ ...h2, color: 'var(--text-on-dark)', textWrap: 'balance', marginBottom: '24px' } as React.CSSProperties}>
            {v.heading}
          </h2>
          <p style={{ color: 'var(--text-on-dark-muted)', maxWidth: '46ch', marginBottom: '36px' }}>{v.body}</p>
          <ul style={{ listStyle: 'none', margin: '0 0 40px', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {v.points.map((p) => (
              <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: 'var(--text-sm)', color: 'var(--text-on-dark)' }}>
                <span style={{ width: '16px', height: '16px', borderRadius: '9999px', background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: '#fff' }} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={onConfigure} style={{ boxShadow: 'var(--shadow-accent-strong)' }}>
            {v.cta}
          </Button>
        </div>

        {!isMobile && <div style={{ position: 'relative' }}>
          <VoucherCard data={{ ...DEFAULT_VOUCHER, recipient: v.demoRecipient, message: v.demoMessage }} />
          <button onClick={onConfigure} style={{
            position: 'absolute', bottom: '-16px', right: '-16px', background: 'var(--surface-page)',
            color: 'var(--text-strong)', border: 'none', borderRadius: 'var(--radius-full)',
            padding: '12px 22px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
            fontWeight: 'var(--fw-medium)', cursor: 'pointer', boxShadow: 'var(--shadow-lg)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '9999px', background: 'var(--brand-red)' }} />
            {v.live}
          </button>
        </div>}
      </div>
    </section>
  );
}
