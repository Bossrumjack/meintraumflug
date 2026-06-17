import 'dotenv/config';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { sendBookingEmails } from './emails/sendEmail.js';
import type { BookingInquiry } from './emails/sendEmail.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3600;

const app = express();
app.use(express.json());

app.post('/api/inquiry', async (req, res) => {
  const body = req.body as Partial<BookingInquiry>;

  if (!body.customerName || !body.customerEmail || !body.flightTitle) {
    res.status(400).json({ error: 'Pflichtfelder fehlen.' });
    return;
  }

  const data: BookingInquiry = {
    customerName:   String(body.customerName).trim(),
    customerEmail:  String(body.customerEmail).trim(),
    customerPhone:  String(body.customerPhone || '').trim(),
    flightTitle:    String(body.flightTitle).trim(),
    flightDuration: String(body.flightDuration || '').trim(),
    flightPrice:    String(body.flightPrice || '').trim(),
    wishDate:       String(body.wishDate || '').trim(),
    wishNote:       String(body.wishNote || '').trim(),
  };

  await sendBookingEmails(data);
  res.json({ ok: true });
});

const distDir = join(__dirname, 'dist');
app.use(express.static(distDir));
app.use((_req, res) => {
  res.sendFile(join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`meintraumflug server on :${PORT}`);
});
