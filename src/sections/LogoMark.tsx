interface LogoMarkProps {
  size?: number;
  dark?: boolean;
}

export function LogoMark({ size = 30, dark = false }: LogoMarkProps) {
  const ink  = dark ? '#fafafa' : '#0c0c0f';
  const disc = dark ? 'rgba(255,255,255,0.30)' : '#c9c9d0';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ flex: 'none' }}>
      <circle cx="24" cy="24" r="21" stroke={disc} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="14.5" stroke={disc} strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
      <rect x="2.5" y="22" width="43" height="4" rx="2" fill={ink} transform="rotate(-21 24 24)" />
      <circle cx="24" cy="24" r="4.6" fill="#d11210" />
    </svg>
  );
}

interface WordmarkProps {
  onDark?: boolean;
  size?: number;
}

export function Wordmark({ onDark = false, size = 15 }: WordmarkProps) {
  return (
    <span style={{
      fontWeight: 'var(--fw-medium)', fontSize: size, textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tighter)',
      color: onDark ? 'var(--zinc-50)' : 'var(--zinc-950)',
    }}>
      meintraumflug
    </span>
  );
}
