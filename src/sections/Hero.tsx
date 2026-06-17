import { Button } from '../components/Button';
import { FlightWeather } from './WeatherWidget';
import { useLang } from '../i18n';

interface HeroProps {
  onChoose: () => void;
  onShowreel: () => void;
}

export function Hero({ onChoose, onShowreel }: HeroProps) {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section id="top" className="mtf-hero">
      <video
        className="mtf-hero-media"
        autoPlay muted loop playsInline
        aria-hidden="true"
        poster="/assets/photos/aerial-bavaria.webp"
      >
        <source src="/assets/video/hero-web.mp4" type="video/mp4" />
        <picture>
          <source srcSet="/assets/photos/aerial-bavaria.webp" type="image/webp" />
          <img className="mtf-hero-media mtf-hero-media-img" src="/assets/photos/aerial-bavaria.jpg" alt="" fetchPriority="high" />
        </picture>
      </video>
      <div className="mtf-hero-body">
        <div className="mtf-hero-wx">
          <FlightWeather />
        </div>
        <span className="mtf-hero-eyebrow">{h.eyebrow}</span>
        <h1 className="mtf-hero-title">{h.title}</h1>
        <p className="mtf-hero-sub">{h.sub}</p>
        <div className="mtf-hero-cta">
          <Button variant="primary" size="lg" onClick={onChoose}>{h.cta}</Button>
          <button className="mtf-hero-ghost" onClick={onShowreel}>
            <span className="mtf-play">▶</span> {h.showreel}
          </button>
          <a
            href="mailto:info@meintraumflug.de"
            className="mtf-hero-ghost"
            aria-label="E-Mail schreiben"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            E-Mail
          </a>
          <a
            href="https://wa.me/491796828007"
            target="_blank"
            rel="noopener noreferrer"
            className="mtf-hero-whatsapp"
            aria-label="WhatsApp – Chat starten"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.41A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="#25D366"/>
              <path d="M17.006 14.56c-.274-.137-1.62-.8-1.872-.89-.251-.091-.434-.137-.617.137-.183.274-.708.89-.868 1.073-.16.183-.32.206-.594.069-.274-.137-1.157-.426-2.204-1.36-.815-.727-1.365-1.624-1.525-1.898-.16-.274-.017-.422.12-.559.123-.123.274-.32.411-.48.137-.16.183-.274.274-.457.091-.183.046-.343-.023-.48-.068-.137-.617-1.486-.845-2.034-.223-.534-.45-.462-.617-.47l-.525-.009c-.183 0-.48.068-.731.343-.251.274-.96.937-.96 2.286s.983 2.651 1.12 2.834c.137.183 1.935 2.953 4.687 4.14.655.283 1.166.452 1.565.579.658.209 1.257.18 1.73.109.527-.079 1.62-.663 1.849-1.302.228-.64.228-1.188.16-1.302-.068-.114-.251-.183-.525-.32Z" fill="#fff"/>
            </svg>
            WhatsApp
          </a>
        </div>
        <div className="mtf-hero-meta">
          <div className="mtf-hero-meta-group">
            <div className="mtf-hero-meta-item"><span className="k">{h.metaLocation}</span><span className="v">{h.metaLocationValue}</span></div>
            <div className="mtf-hero-meta-item"><span className="k">{h.metaDuration}</span><span className="v">{h.metaDurationValue}</span></div>
            <div className="mtf-hero-meta-item"><span className="k">{h.metaFrom}</span><span className="v">{h.metaFromValue}</span></div>
          </div>
          <a href="#rundfluege" className="mtf-hero-scroll">{h.discover} <span className="arrow">↓</span></a>
        </div>
      </div>
    </section>
  );
}
