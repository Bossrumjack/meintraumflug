import type { CSSProperties, ReactNode } from 'react';

interface StatCardProps {
  label: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function StatCard({ label, children, style }: StatCardProps) {
  return (
    <div style={{
      background: 'var(--surface-sunken)', borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--ring-hairline)', padding: '20px', boxSizing: 'border-box',
      ...style,
    }}>
      <div style={{
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)',
        fontSize: 'var(--text-2xs)', textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)', marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-medium)',
        fontSize: 'var(--text-sm)', color: 'var(--text-strong)', lineHeight: 'var(--leading-snug)',
      }}>
        {children}
      </div>
    </div>
  );
}
