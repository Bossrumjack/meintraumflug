import type { CSSProperties, ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'accent' | 'solid' | 'soft' | 'outline';
  style?: CSSProperties;
}

export function Badge({ children, variant = 'accent', style }: BadgeProps) {
  const variants: Record<string, CSSProperties> = {
    accent:  { background: 'var(--accent)', color: 'var(--on-accent)' },
    solid:   { background: 'var(--surface-inverted)', color: 'var(--text-on-dark)' },
    soft:    { background: 'var(--surface-sunken)', color: 'var(--text-body)', boxShadow: 'var(--ring-hairline)' },
    outline: { background: 'transparent', color: 'var(--text-strong)', boxShadow: 'var(--ring-strong)' },
  };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)',
      fontSize: '10px', lineHeight: 1, textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)', padding: '5px 12px',
      borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
      ...variants[variant], ...style,
    }}>
      {children}
    </span>
  );
}
