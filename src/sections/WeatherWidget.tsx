/* Flight-weather widget — METAR live data via aviationweather.gov (NOAA).
 * No API key required. CORS enabled for browser requests.
 * Station: EDMO (Flugplatz Oberpfaffenhofen)
 */

import { useState, useEffect } from 'react';
import { useLang } from '../i18n';

export type FlyStatus = 'go' | 'limited' | 'no';

interface Weather {
  station: string;
  updated: string;
  windKt: number;
  windDir: string;
  gustKt: number;
  visKm: number;
  tempC: number;
  cloudBaseFt: number;
  live: boolean;
}

const DEMO: Weather = {
  station: 'EDMO · Oberpfaffenhofen',
  updated: '—',
  windKt: 8, windDir: 'NW', gustKt: 14,
  visKm: 12, tempC: 18, cloudBaseFt: 4500,
  live: false,
};

const METAR_URL = 'https://aviationweather.gov/api/data/metar?ids=EDMO&format=json&hours=1';

function degToCard(deg: number): string {
  const dirs = ['N','NNO','NO','ONO','O','OSO','SO','SSO','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function formatAge(iso: string): string {
  const diff = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (diff < 2) return 'gerade eben';
  if (diff < 60) return `vor ${diff} Min.`;
  return `vor ${Math.round(diff / 60)} Std.`;
}

type SkyCond = { cover: string; base?: number };
type MetarRecord = { reportTime?: string; wdir?: number | 'VRB'; wspd?: number; wgst?: number | null; visib?: string | number; temp?: number; sky?: SkyCond[] };

function parseMetar(raw: unknown): Weather {
  const m = raw as MetarRecord;
  const windKt  = m.wspd ?? 0;
  const gustKt  = m.wgst ?? windKt;
  const windDir = m.wdir === 'VRB' ? 'vrb' : degToCard(Number(m.wdir ?? 0));
  const visSM   = String(m.visib ?? '10+').replace('+', '');
  const visKm   = Math.min(Math.round(parseFloat(visSM) * 1.609), 10);
  const sky     = (m.sky ?? []) as SkyCond[];
  const ceiling = sky.filter(l => l.cover === 'BKN' || l.cover === 'OVC').map(l => l.base ?? 99_999).sort((a, b) => a - b)[0] ?? 99_999;
  return {
    station: 'EDMO · Oberpfaffenhofen',
    updated: m.reportTime ? formatAge(m.reportTime) : 'aktuell',
    windKt: Math.round(windKt), windDir,
    gustKt: Math.round(gustKt),
    visKm: String(m.visib ?? '').endsWith('+') ? 10 : visKm,
    tempC: Math.round(m.temp ?? 15),
    cloudBaseFt: ceiling,
    live: true,
  };
}

function useFlightWeather(): Weather {
  const [wx, setWx] = useState<Weather>(DEMO);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(METAR_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: unknown = await res.json();
        if (!Array.isArray(json) || json.length === 0) throw new Error('empty');
        if (!cancelled) setWx(parseMetar(json[0]));
      } catch { /* keep DEMO on failure */ }
    }
    load();
    const id = setInterval(load, 20 * 60 * 1000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);
  return wx;
}

export function assess(w: Weather): { key: FlyStatus; label: string; tone: string } {
  if (w.gustKt >= 25 || w.visKm < 5 || w.cloudBaseFt < 1500)
    return { key: 'no',      label: '—', tone: '#a2a2ab' };
  if (w.gustKt >= 18 || w.visKm < 8 || w.cloudBaseFt < 2500)
    return { key: 'limited', label: '—', tone: '#e6b800' };
  return   { key: 'go',      label: '—', tone: '#ffffff' };
}

function FlagMast({ status }: { status: FlyStatus }) {
  return (
    <svg viewBox="0 0 60 170" width="40" height="113" aria-hidden="true" style={{ flexShrink: 0 }}>
      <ellipse cx="22" cy="163" rx="14" ry="4" fill="rgba(255,255,255,0.08)" />
      <rect x="20.5" y="16" width="3" height="147" rx="1.5" fill="rgba(255,255,255,0.38)" />
      <circle cx="22" cy="15" r="5" fill="rgba(255,255,255,0.55)" />
      <rect x="19" y="152" width="6" height="3" rx="1" fill="rgba(255,255,255,0.22)" />
      <rect
        className={`mtf-flag-body mtf-flag-${status}`}
        x="23" y="22" width="30" height="16" rx="2"
        fill={status === 'no' ? 'rgba(161,161,171,0.40)' : '#d11210'}
      />
    </svg>
  );
}

function WxMetric({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.45)' }}>{k}</span>
      <span style={{ fontSize: '12px', fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>{v}</span>
    </div>
  );
}

export function FlightWeather() {
  const w = useFlightWeather();
  const { t } = useLang();
  const wt = t.hero.weather;

  const statusKey = assess(w).key;
  const statusLabels: Record<FlyStatus, string> = { go: wt.go, limited: wt.limited, no: wt.no };
  const statusTones: Record<FlyStatus, string>  = { go: '#ffffff', limited: '#e6b800', no: '#a2a2ab' };
  const label = statusLabels[statusKey];
  const tone  = statusTones[statusKey];

  const visDisplay   = w.visKm >= 10 ? `> 10 km` : `${w.visKm} km`;
  const ceilDisplay  = w.cloudBaseFt >= 99_000 ? (t.lang === 'de' ? 'klar' : 'clear') : `${w.cloudBaseFt.toLocaleString('de-DE')} ft`;

  return (
    <aside
      aria-label={`${wt.label}: ${label}`}
      style={{
        width: '296px',
        background: 'rgba(12,12,15,0.38)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.14)', borderRadius: 'var(--radius-2xl)',
        boxShadow: '0 20px 40px -16px rgba(0,0,0,0.6)',
        padding: '18px 20px 18px 14px', display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#fff',
      }}
    >
      <FlagMast status={statusKey} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.50)', marginBottom: '5px' }}>{wt.label}</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: tone, lineHeight: 1.1 }}>{label}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>{w.updated}</span>
            {w.live && (
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.30)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '9999px', background: '#22c55e', display: 'inline-block' }} aria-hidden="true" />
                {wt.liveMetar}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 8px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
          <WxMetric k={wt.wind}   v={`${w.windKt} kt ${w.windDir}`} />
          <WxMetric k={wt.gusts}  v={`${w.gustKt} kt`} />
          <WxMetric k={wt.vis}    v={visDisplay} />
          <WxMetric k={wt.clouds} v={ceilDisplay} />
        </div>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.04em' }}>{wt.stationName}</span>
      </div>
    </aside>
  );
}
