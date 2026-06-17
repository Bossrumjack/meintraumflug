import { Button } from '../components/Button';
import { FlightCard } from '../components/FlightCard';
import { useLang } from '../i18n';
import { useReveal } from '../hooks/useReveal';
import { useBreakpoint } from '../hooks/useBreakpoint';
import type { Flight } from '../data';

interface ExperiencesProps {
  onBook: (flight: Flight) => void;
}

export function Experiences({ onBook }: ExperiencesProps) {
  const { t } = useLang();
  const { isMobile, isTablet } = useBreakpoint();
  const { ref: headRef, style: headStyle } = useReveal();
  const { ref: gridRef, style: gridStyle } = useReveal(120);
  const gridCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, minmax(0, 1fr))';

  return (
    <section id="rundfluege" style={{ padding: `${isMobile ? '64px' : '96px'} var(--gutter)`, background: 'rgba(244,244,245,0.5)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div ref={headRef as React.RefObject<HTMLDivElement>} style={{ ...headStyle, marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', margin: 0 }}>
            {t.experiences.heading}
          </h2>
        </div>
        <div ref={gridRef as React.RefObject<HTMLDivElement>} style={{ ...gridStyle, display: 'grid', gridTemplateColumns: gridCols, gap: '24px', alignItems: 'stretch' }}>
          {t.flights.map((f) => {
            const imgMap: Record<string, string> = { lokal: 'cockpit', entdeckung: 'castle', erlebnis: 'rotor', highlight: 'highlight' };
            const isFeatured = 'featured' in f && !!f.featured;
            return (
              <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FlightCard
                  image={`/assets/cards/card-${imgMap[f.id] ?? 'cockpit'}.webp`}
                  title={f.title}
                  price={f.price}
                  duration={'duration' in f ? (f as { duration?: string }).duration : undefined}
                  description={f.description}
                  featured={isFeatured}
                  style={{ flex: 1 }}
                />
                <Button
                  variant={isFeatured ? 'primary' : 'secondary'}
                  onClick={() => onBook({ id: f.id, image: '', title: f.title, price: f.price, duration: 'duration' in f ? (f as { duration?: string }).duration : undefined, description: f.description, featured: isFeatured })}
                  style={{ width: '100%' }}
                >
                  {t.experiences.select}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
