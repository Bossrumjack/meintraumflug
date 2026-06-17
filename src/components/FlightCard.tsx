import type { CSSProperties } from 'react';
import { Badge } from './Badge';

interface FlightCardProps {
  image?: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  featured?: boolean;
  badge?: string;
  style?: CSSProperties;
}

export function FlightCard({ image, title, description, price, duration, featured = false, badge = 'Beliebtester', style }: FlightCardProps) {
  return (
    <article style={{
      position: 'relative', display: 'flex', flexDirection: 'column', height: '100%',
      background: 'var(--surface-card)', borderRadius: 'var(--radius-2xl)',
      padding: '32px', boxSizing: 'border-box',
      boxShadow: featured ? 'var(--ring-accent), var(--shadow-accent-soft)' : 'var(--ring-hairline)',
      ...style,
    }}>
      {featured && badge && (
        <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)' }}>
          <Badge variant="accent">{badge}</Badge>
        </div>
      )}
      {image && (
        <img src={image} alt="" loading="lazy" style={{
          width: '64px', height: '64px', objectFit: 'cover',
          borderRadius: 'var(--radius-xl)', boxShadow: 'var(--ring-hairline)', marginBottom: '24px',
        }} />
      )}
      <h3 style={{
        margin: '0 0 12px', fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-medium)',
        fontSize: 'var(--text-h3)', color: 'var(--text-strong)',
      }}>
        {title}
      </h3>
      <p style={{
        margin: '0 0 32px', flexGrow: 1, fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)',
        color: 'var(--text-body)', maxWidth: '48ch',
      }}>
        {description}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)',
          fontSize: 'var(--text-h3)', color: 'var(--text-strong)',
        }}>
          {price}
        </span>
        {duration && (
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)',
            fontSize: 'var(--text-2xs)', textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-label)', color: 'var(--text-muted)',
          }}>
            {duration}
          </span>
        )}
      </div>
    </article>
  );
}
