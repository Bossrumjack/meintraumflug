import type { CSSProperties, ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  rule?: boolean;
  onDark?: boolean;
  style?: CSSProperties;
}

export function Eyebrow({ children, rule = true, onDark = false, style }: EyebrowProps) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-2xs)', lineHeight: 1, textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-label)',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      ...style,
    }}>
      {rule && <span style={{ width: '2rem', height: '1px', background: 'var(--brand-red)', flex: 'none' }} />}
      {children}
    </span>
  );
}
