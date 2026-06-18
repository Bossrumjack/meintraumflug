import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'www729.your-server.de',
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM    = process.env.SMTP_FROM    || 'meintraumflug <noreply@meintraumflug.de>';
const NOTIFY  = process.env.NOTIFY_TO    || 'info@meintraumflug.de';

export interface BookingInquiry {
  customerName:   string;
  customerEmail:  string;
  customerPhone:  string;
  flightTitle:    string;
  flightDuration: string;
  flightPrice:    string;
  wishDate:       string;
  wishNote:       string;
}

function fillTemplate(file: string, vars: Record<string, string>): string {
  let html = readFileSync(join(__dirname, file), 'utf8');
  for (const [k, v] of Object.entries(vars)) {
    html = html.replaceAll(`{{${k}}}`, v || '—');
  }
  return html;
}

function fmtDate(iso: string): string {
  if (!iso) return 'Kein Wunschtermin angegeben';
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('de-DE', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch { return iso; }
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 9).toUpperCase();
}

export async function sendBookingEmails(data: BookingInquiry): Promise<void> {
  const confirmationHtml = fillTemplate('confirmation.html', {
    name:           data.customerName,
    flightTitle:    data.flightTitle,
    flightDuration: data.flightDuration,
    flightPrice:    data.flightPrice,
    wishDate:       fmtDate(data.wishDate),
    wishNote:       data.wishNote || 'Keine Anmerkung',
  });

  const notificationHtml = fillTemplate('notification.html', {
    customerName:   data.customerName,
    customerEmail:  data.customerEmail,
    customerPhone:  data.customerPhone || 'Nicht angegeben',
    flightTitle:    data.flightTitle,
    flightDuration: data.flightDuration,
    flightPrice:    data.flightPrice,
    wishDate:       fmtDate(data.wishDate),
    wishNote:       data.wishNote || 'Keine Anmerkung',
    submittedAt:    new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
    requestId:      randomId(),
  });

  await Promise.all([
    transporter.sendMail({
      from:    FROM,
      to:      data.customerEmail,
      subject: `Ihre Anfrage ist eingegangen – meintraumflug`,
      html:    confirmationHtml,
    }),
    transporter.sendMail({
      from:    FROM,
      to:      NOTIFY,
      subject: `⚡ Neue Anfrage: ${data.flightTitle} – ${data.customerName}`,
      html:    notificationHtml,
    }),
  ]);
}

/*
  API-Route Beispiel (Express / Next.js):

  import { sendBookingEmails } from '../emails/sendEmail';

  app.post('/api/inquiry', async (req, res) => {
    await sendBookingEmails(req.body);
    res.json({ ok: true });
  });
*/
