import { Button } from '../components/Button';
import { FlightCard } from '../components/FlightCard';
import { useLang } from '../i18n';
import type { Flight } from '../data';

interface ExperiencesProps {
  onBook: (flight: Flight) => void;
}

export function Experiences({ onBook }: ExperiencesProps) {
  const { t } = useLang();

  return (
    <section id="rundfluege" style={{ padding: '96px var(--gutter)', background: 'rgba(244,244,245,0.5)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', margin: 0 }}>
            {t.experiences.heading}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', alignItems: 'stretch' }}>
          {t.flights.map((f) => {
            const imgMap: Record<string, string> = { schnupper: 'cockpit', alpen: 'rotor', schloesser: 'castle' };
            const isFeatured = 'featured' in f && !!f.featured;
            return (
              <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FlightCard
                  image={`/assets/cards/card-${imgMap[f.id] ?? 'cockpit'}.webp`}
                  title={f.title}
                  price={f.price}
                  description={f.description}
                  featured={isFeatured}
                  style={{ flex: 1 }}
                />
                <Button
                  variant={isFeatured ? 'primary' : 'secondary'}
                  onClick={() => onBook({ id: f.id, image: '', title: f.title, price: f.price, description: f.description, featured: isFeatured })}
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
