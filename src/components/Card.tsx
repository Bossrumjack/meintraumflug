import type { CSSProperties, ReactNode } from 'react';

type CardVariant = 'default' | 'featured' | 'sunken' | 'inverted';
type CardRadius = '2xl' | '3xl' | 'panel' | 'hero';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  radius?: CardRadius;
  padding?: number | string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function Card({ children, variant = 'default', radius = '2xl', padding = 32, style, ...rest }: CardProps) {
  const radii: Record<CardRadius, string> = {
    '2xl':  'var(--radius-2xl)',
    '3xl':  'var(--radius-3xl)',
    panel:  'var(--radius-panel)',
    hero:   'var(--radius-hero)',
  };

  const variants: Record<CardVariant, CSSProperties> = {
    default:  { background: 'var(--surface-card)',     color: 'var(--text-body)',    boxShadow: 'var(--ring-hairline)' },
    featured: { background: 'var(--surface-card)',     color: 'var(--text-body)',    boxShadow: 'var(--ring-accent), var(--shadow-accent-soft)' },
    sunken:   { background: 'var(--surface-sunken)',   color: 'var(--text-body)',    boxShadow: 'var(--ring-hairline)' },
    inverted: { background: 'var(--surface-inverted)', color: 'var(--text-on-dark)', boxShadow: 'none' },
  };

  return (
    <div style={{
      position: 'relative', boxSizing: 'border-box',
      borderRadius: radii[radius],
      padding: typeof padding === 'number' ? `${padding}px` : padding,
      ...variants[variant], ...style,
    }} {...rest}>
      {children}
    </div>
  );
}
