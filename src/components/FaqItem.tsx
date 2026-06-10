import { useState, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface FaqItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
  style?: CSSProperties;
}

let idCounter = 0;

export function FaqItem({ question, children, defaultOpen = false, style }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [hover, setHover] = useState(false);
  const id = useRef(`faq-${++idCounter}`);

  return (
    <div style={{ borderTop: '1px solid var(--border-hairline)', ...style }}>
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '16px', padding: '20px 0',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-medium)',
          fontSize: 'var(--text-sm)', color: 'var(--text-strong)',
        }}
        aria-expanded={open}
        aria-controls={id.current}
      >
        <span>{question}</span>
        <span aria-hidden="true" style={{
          flex: 'none', fontSize: '18px', lineHeight: 1,
          color: hover || open ? 'var(--brand-red)' : 'var(--text-muted)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform var(--dur-slow) var(--ease-standard), color var(--dur-fast) var(--ease-standard)',
        }}>+</span>
      </button>
      <div
        id={id.current}
        role="region"
        aria-label={question}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows var(--dur-slow) var(--ease-standard)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p style={{
            margin: 0, paddingBottom: open ? '20px' : 0,
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)', color: 'var(--text-body)', maxWidth: '54ch',
          }}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
