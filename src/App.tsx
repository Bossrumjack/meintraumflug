import { useState, useEffect } from 'react';
import { LangProvider, useLang } from './i18n';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Showreel } from './Showreel';
import { Experiences } from './sections/Experiences';
import { About } from './sections/About';
import { Voucher } from './sections/Voucher';
import { Process } from './sections/Process';
import { FaqContact } from './sections/FaqContact';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { BookingDialog } from './BookingDialog';
import { VoucherConfigurator } from './VoucherConfigurator';
import { Impressum } from './pages/Impressum';
import { Datenschutz } from './pages/Datenschutz';
import { AGB } from './pages/AGB';
import { FLIGHTS } from './data';
import type { Flight } from './data';

type Page = 'home' | 'impressum' | 'datenschutz' | 'agb';

interface BookingState {
  flight: Flight | null;
}

function getPage(): Page {
  const h = window.location.hash.replace('#', '').toLowerCase();
  if (h === 'impressum') return 'impressum';
  if (h === 'datenschutz') return 'datenschutz';
  if (h === 'agb') return 'agb';
  return 'home';
}

function AppInner() {
  const { t } = useLang();
  const [page, setPage] = useState<Page>(getPage);
  const [booking, setBooking] = useState<BookingState | null>(null);
  const [voucherOpen, setVoucherOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onHash = () => {
      const next = getPage();
      if (next !== page) {
        setPage(next);
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [page]);

  const openBooking = (flight: Flight | null = null) => setBooking({ flight });
  const closeBooking = () => setBooking(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  if (page === 'impressum') return <Impressum />;
  if (page === 'datenschutz') return <Datenschutz />;
  if (page === 'agb') return <AGB />;

  return (
    <>
      <a href="#main-content" className="mtf-skip-link">{t.skipLink}</a>
      <Nav onBook={() => openBooking(null)} />
      <main id="main-content">
        <Hero onChoose={() => openBooking(null)} onShowreel={() => setShowreelOpen(true)} />
        <Experiences onBook={(f) => openBooking(f)} />
        <About />
        <Voucher onConfigure={() => setVoucherOpen(true)} />
        <Process />
        <FaqContact />
      </main>
      <Contact onCallback={(num) => showToast(`${num} – ${t.contact.callbackSubmit}`)} />
      <Footer />
      {booking && (
        <BookingDialog flights={FLIGHTS} initialFlight={booking.flight} onClose={closeBooking} />
      )}
      {voucherOpen && (
        <VoucherConfigurator
          onClose={() => setVoucherOpen(false)}
          onCheckout={(v) => { setVoucherOpen(false); showToast(`${v.total} € – Demo`); }}
        />
      )}
      {showreelOpen && <Showreel onClose={() => setShowreelOpen(false)} />}
      <div role="status" aria-live="polite" aria-atomic="true" style={{ position: 'fixed', bottom: 0, left: 0, pointerEvents: 'none', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        {toast}
      </div>
      {toast && <div className="mtf-toast" aria-hidden="true">{toast}</div>}
    </>
  );
}

export function App() {
  return <LangProvider><AppInner /></LangProvider>;
}

export default App;
