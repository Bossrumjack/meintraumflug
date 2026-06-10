import { useState } from 'react';
import type { CSSProperties, ChangeEvent } from 'react';

interface FieldProps {
  label?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function Field({ label, multiline = false, rows = 4, type = 'text', required = false, placeholder, value, onChange, id, style, ...rest }: FieldProps) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || (label ? `f-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const controlStyle: CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'var(--surface-sunken)', border: 'none',
    borderRadius: 'var(--radius-md)', padding: '12px',
    fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
    color: 'var(--text-strong)', outline: 'none',
    boxShadow: focus ? 'inset 0 0 0 1px var(--focus-ring)' : 'inset 0 0 0 1px transparent',
    transition: 'box-shadow var(--dur-base) var(--ease-standard)',
    resize: multiline ? 'none' : undefined,
  };

  const handlers = {
    id: fieldId, required, placeholder, value, onChange,
    onFocus: () => setFocus(true),
    onBlur:  () => setFocus(false),
    style: controlStyle,
    ...rest,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)',
          fontSize: 'var(--text-2xs)', textTransform: 'uppercase',
          letterSpacing: 'var(--tracking-wide)', color: 'var(--text-muted)',
        }}>
          {label}
        </label>
      )}
      {multiline ? <textarea rows={rows} {...handlers as React.TextareaHTMLAttributes<HTMLTextAreaElement>} /> : <input type={type} {...handlers as React.InputHTMLAttributes<HTMLInputElement>} />}
    </div>
  );
}
