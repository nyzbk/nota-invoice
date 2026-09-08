import type { FaqItem } from "@/components/site/FaqSection";

export const invoiceFaq: FaqItem[] = [
  {
    q: "Does my invoice leave this device?",
    a: "No. Names, line items, tax, notes and the optional logo stay in this tab. pdf-lib builds the PDF in memory. Closing the tab drops the file bytes. A draft may sit in this browser’s local storage until you tap Start over or clear site data.",
  },
  {
    q: "Do I have to create an account?",
    a: "No. There is no signup wall, no email capture and no daily quota. Fill From, Bill to and one priced line, then download.",
  },
  {
    q: "Is there a watermark or a cap on downloads?",
    a: "No watermark over totals. A small “Created with Nota” line sits in the page footer of the PDF. You can download as many files as this device can store.",
  },
  {
    q: "Which browsers and iPhones work?",
    a: "Current Chrome, Firefox, Edge and Safari, including iOS Safari. On iPhone the PDF saves through the browser download sheet. If a popup blocker eats the file, tap Download PDF again.",
  },
  {
    q: "What is the logo limit?",
    a: "PNG or JPEG only, magic-bytes checked, 2 MB max. GIF, SVG and PDF logos are rejected. A broken image is skipped; the invoice still downloads.",
  },
  {
    q: "Which currencies can I print?",
    a: "USD, EUR, GBP and KZT. Amounts are rounded to cents (tiyn for tenge). On the PDF, tenge is written as KZT plus the number so the glyph never falls out of the font.",
  },
  {
    q: "How are tax and discount calculated?",
    a: "Each line is qty × unit price in cents. Discount is a flat amount, never a percent, and cannot exceed the subtotal. Tax is a percent of the amount after discount. Total = subtotal − discount + tax.",
  },
  {
    q: "Will Cyrillic names print?",
    a: "Yes. Nota embeds Noto Sans (regular and bold) and subsets the glyphs you actually typed. Helvetica-only generators throw on “ТОО” or “Студия”. If font files fail to load, Latin still prints with a fallback.",
  },
  {
    q: "Can I send the invoice by email from here?",
    a: "No. Nota does not mail PDFs, does not store clients and is not a collections inbox. Download the file and attach it in the mail app you already use.",
  },
  {
    q: "Is the Vercel domain safe for invoice data?",
    a: "The app is static files plus client JavaScript. Invoice fields are not posted to our origin. Hosting still sees ordinary request logs (IP, user-agent) like any public site. Do not paste bank passwords into Notes.",
  },
  {
    q: "When will ads appear?",
    a: "Slots after a successful download, mid-page and in the footer are placeholders until Google marks the site Ready. We do not ask you to click ads. Auto ads overlays are off so Download PDF is not covered.",
  },
  {
    q: "Who runs Nota and how do I write?",
    a: "Nota is a public invoice utility from the same workshop as Folio (PDF toolkit) and HEIC Local. Email ultaultimatum@gmail.com. Do not attach invoices or logos to that mailbox — describe the page URL, browser and what you expected.",
  },
  {
    q: "Is this an official tax form or legal advice?",
    a: "No. You remain responsible for fields your country requires (VAT ID, company number, payment terms). Nota is a layout tool. It does not file returns or talk to a tax office.",
  },
  {
    q: "What if Download PDF does nothing?",
    a: "Add a From name, a Bill-to name and at least one line with a numeric price. Empty price fields are ignored. If a logo was huge or not PNG/JPEG, remove it and try again. Very long notes are clipped on a single A4 page.",
  },
  {
    q: "Why is tax after discount?",
    a: "Because the total formula is subtotal − discount + tax. A line-item VAT-before-discount workflow belongs in an accounting suite with tax codes. Nota is a one-page A4 for people who already know the numbers. See /tax for the worked example. Do not invent a 0.01 line to game the order.",
  },
  {
    q: "Will you store my client list if I leave the tab open?",
    a: "A draft may sit in this browser’s localStorage until Start over or until you clear site data. Another phone does not see it. We do not have a server copy to restore. Treat Download PDF as save. Do not type secrets you would not want in ordinary browser storage.",
  },
  {
    q: "Can I attach a scanned contract instead of a logo?",
    a: "No. The logo slot accepts PNG/JPEG only, checked by magic bytes. A PDF, HEIC or GIF is refused. The invoice body is drawn as text. If you need to merge a signed scan, that is Folio on a different domain, after you already have the invoice PDF.",
  },
];
