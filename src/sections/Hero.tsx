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
        <div className="mtf-hero-content-row">
          <div className="mtf-hero-text">
            <span className="mtf-hero-eyebrow">{h.eyebrow}</span>
            <h1 className="mtf-hero-title">{h.title}</h1>
            <p className="mtf-hero-sub">{h.sub}</p>
            <div className="mtf-hero-cta">
              <Button variant="primary" size="lg" onClick={onChoose}>{h.cta}</Button>
              <button className="mtf-hero-ghost" onClick={onShowreel}>
                <span className="mtf-play">▶</span> {h.showreel}
              </button>
            </div>
          </div>
          <div className="mtf-hero-wx">
            <FlightWeather />
          </div>
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
