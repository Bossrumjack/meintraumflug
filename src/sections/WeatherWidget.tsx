import { useEffect } from 'react';

const SCRIPT_ID = 'metar-taf-embed';

export function FlightWeather() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const s = document.createElement('script');
    s.id = SCRIPT_ID;
    s.src = 'https://metar-taf.com/de/embed-js/DE-0381?qnh=hPa&rh=rh&target=59ykzh1r';
    s.async = true;
    s.defer = true;
    s.crossOrigin = 'anonymous';
    document.body.appendChild(s);
  }, []);

  return (
    <div style={{
      background: 'rgba(12,12,15,0.38)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: '0 20px 40px -16px rgba(0,0,0,0.6)',
      padding: '16px',
      display: 'inline-block',
    }}>
      <a
        href="https://metar-taf.com/de/metar/DE-0381"
        id="metartaf-59ykzh1r"
        style={{ fontSize: '18px', fontWeight: 500, color: '#000', width: '300px', height: '435px', display: 'block' }}
      >
        METAR Straßham Ultralight Airfield
      </a>
    </div>
  );
}
