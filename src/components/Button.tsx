import { useState } from 'react';
import type { CSSProperties, ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  href,
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const sizes: Record<string, CSSProperties> = {
    sm: { padding: '8px 16px', fontSize: '13px' },
    md: { padding: '10px 24px', fontSize: '14px' },
    lg: { padding: '14px 32px', fontSize: '15px' },
  };

  const variants: Record<string, CSSProperties> = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      boxShadow: 'inset 0 0 0 1px var(--accent), var(--shadow-sm)',
      filter: hover && !disabled ? 'brightness(1.1)' : 'none',
    },
    secondary: {
      background: hover && !disabled ? 'var(--zinc-200)' : 'var(--surface-sunken)',
      color: 'var(--text-strong)',
      boxShadow: 'var(--ring-hairline), var(--shadow-sm)',
    },
    ghost: {
      background: hover && !disabled ? 'var(--surface-sunken)' : 'transparent',
      color: hover && !disabled ? 'var(--text-strong)' : 'var(--text-body)',
      boxShadow: 'none',
    },
  };

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-medium)',
    lineHeight: 1,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 'var(--radius-xl)',
    transition: 'filter var(--dur-fast) var(--ease-standard), background var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), color var(--dur-base) var(--ease-standard)',
    transform: press && !disabled ? 'scale(0.98)' : 'scale(1)',
    opacity: disabled ? 0.5 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };

  if (href && !disabled) {
    return (
      <a href={href} style={baseStyle} onClick={onClick as (e: MouseEvent<HTMLAnchorElement>) => void} {...handlers} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} aria-disabled={disabled || undefined} onClick={onClick as (e: MouseEvent<HTMLButtonElement>) => void} style={baseStyle} {...handlers} {...rest}>
      {children}
    </button>
  );
}
