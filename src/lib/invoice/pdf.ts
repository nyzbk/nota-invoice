import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { currencyOf, type Invoice } from "./types";
import { lineCents, parseMoney, pdfMoney, totals } from "./math";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const INK = rgb(0.11, 0.1, 0.09);
const MUTED = rgb(0.44, 0.4, 0.37);
const LINE = rgb(0.87, 0.83, 0.78);
const COPPER = rgb(0.49, 0.29, 0.18);
export const MAX_LOGO_BYTES = 2 * 1024 * 1024;

type PdfFont = { widthOfTextAtSize: (t: string, s: number) => number };

function wrap(text: string, font: PdfFont, size: number, max: number) {
  const words = String(text).replace(/\r/g, "").split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function isPng(bytes: Uint8Array) {
  return bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
}

function isJpeg(bytes: Uint8Array) {
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

let fontCache: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null;

async function loadUiFonts() {
  if (fontCache) return fontCache;
  const [regular, bold] = await Promise.all([
    fetch("/fonts/NotoSans-Regular.ttf").then((r) => {
      if (!r.ok) throw new Error("font");
      return r.arrayBuffer();
    }),
    fetch("/fonts/NotoSans-Bold.ttf").then((r) => {
      if (!r.ok) throw new Error("font");
      return r.arrayBuffer();
    }),
  ]);
  fontCache = { regular, bold };
  return fontCache;
}

export async function buildInvoicePdf(invoice: Invoice, logoBytes?: ArrayBuffer | null) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const page = doc.addPage([PAGE_W, PAGE_H]);

  let font;
  let bold;
  try {
    const files = await loadUiFonts();
    font = await doc.embedFont(files.regular, { subset: true });
    bold = await doc.embedFont(files.bold, { subset: true });
  } catch {
    font = await doc.embedFont(StandardFonts.Helvetica);
    bold = await doc.embedFont(StandardFonts.HelveticaBold);
  }

  const { symbol, id: currencyId } = currencyOf(invoice.currency);
  const money = (cents: number) => pdfMoney(cents, currencyId, symbol);
  const t = totals(invoice);
  let y = PAGE_H - MARGIN;

  const draw = (text: string, x: number, yy: number, size = 10, useBold = false) => {
    page.drawText(text, { x, y: yy, size, font: useBold ? bold : font, color: INK });
  };

  page.drawText("INVOICE", { x: MARGIN, y: y - 8, size: 22, font: bold, color: INK });
  const number = invoice.number || "—";
  const numSize = 12;
  const numW = bold.widthOfTextAtSize(number, numSize);
  page.drawText(number, { x: Math.max(MARGIN + 160, PAGE_W - MARGIN - numW), y: y - 2, size: numSize, font: bold, color: COPPER });
  y -= 36;

  if (logoBytes && logoBytes.byteLength > 24 && logoBytes.byteLength <= MAX_LOGO_BYTES) {
    try {
      const head = new Uint8Array(logoBytes);
      if (isPng(head) || isJpeg(head)) {
        const img = isPng(head) ? await doc.embedPng(logoBytes) : await doc.embedJpg(logoBytes);
        const maxW = 110;
        const maxH = 44;
        const scale = Math.min(maxW / img.width, maxH / img.height, 1);
        page.drawImage(img, {
          x: PAGE_W - MARGIN - img.width * scale,
          y: y - 4,
          width: img.width * scale,
          height: img.height * scale,
        });
      }
    } catch {
      /* skip bad logo */
    }
  }

  draw(`Issue ${invoice.issueDate || "—"}`, MARGIN, y, 9);
  draw(`Due ${invoice.dueDate || "—"}`, MARGIN + 160, y, 9);
  y -= 28;
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.8, color: LINE });
  y -= 20;

  const yStart = y;
  page.drawText("From", { x: MARGIN, y, size: 8, font: bold, color: INK });
  page.drawText("Bill to", { x: 310, y, size: 8, font: bold, color: INK });
  y -= 14;
  let yLeft = y;
  let yRight = y;
  const fromLines = [invoice.from.name, invoice.from.email, invoice.from.address].filter(Boolean) as string[];
  const toLines = [invoice.to.name, invoice.to.email, invoice.to.address].filter(Boolean) as string[];
  for (const line of fromLines) {
    const wrapped = wrap(line, font, 10, 240);
    for (const w of wrapped) {
      page.drawText(w, { x: MARGIN, y: yLeft, size: 10, font, color: INK });
      yLeft -= 13;
    }
  }
  for (const line of toLines) {
    const wrapped = wrap(line, font, 10, 230);
    for (const w of wrapped) {
      page.drawText(w, { x: 310, y: yRight, size: 10, font, color: INK });
      yRight -= 13;
    }
  }
  y = Math.min(yLeft, yRight, yStart - 40) - 8;

  const cols = { desc: MARGIN, qty: 360, price: 430, total: 500 };
  page.drawRectangle({ x: MARGIN, y: y - 6, width: PAGE_W - MARGIN * 2, height: 20, color: rgb(0.96, 0.94, 0.91) });
  draw("Description", cols.desc + 4, y, 8, true);
  draw("Qty", cols.qty, y, 8, true);
  draw("Price", cols.price, y, 8, true);
  draw("Amount", cols.total, y, 8, true);
  y -= 22;

  for (const item of invoice.items) {
    if (!item.description && !item.unitPrice) continue;
    if (y < 140) {
      draw("Additional items omitted — shorten the list.", MARGIN, y, 8);
      y -= 14;
      break;
    }
    const desc = wrap(item.description || "Item", font, 9, 250);
    const amount = money(lineCents(item.qty, item.unitPrice));
    desc.forEach((line, i) => draw(line, cols.desc + 4, y - i * 11, 9));
    draw(item.qty || "0", cols.qty, y, 9);
    draw(money(parseMoney(item.unitPrice)), cols.price, y, 9);
    draw(amount, cols.total, y, 9);
    y -= Math.max(18, desc.length * 11 + 6);
  }

  y -= 8;
  page.drawLine({ start: { x: 340, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.6, color: LINE });
  y -= 18;
  const row = (label: string, value: string, strong = false) => {
    page.drawText(label, { x: 360, y, size: 9, font: strong ? bold : font, color: strong ? INK : MUTED });
    const f = strong ? bold : font;
    const size = strong ? 11 : 9;
    page.drawText(value, { x: PAGE_W - MARGIN - f.widthOfTextAtSize(value, size), y, size, font: f, color: INK });
    y -= strong ? 20 : 16;
  };
  row("Subtotal", money(t.subtotal));
  if (t.discount) row("Discount", `-${money(t.discount)}`);
  if (t.tax) row(`Tax ${t.taxRate}%`, money(t.tax));
  row("Total", money(t.total), true);

  if (invoice.notes.trim()) {
    y -= 6;
    page.drawText("Notes", { x: MARGIN, y, size: 8, font: bold, color: INK });
    y -= 14;
    wrap(invoice.notes, font, 9, PAGE_W - MARGIN * 2)
      .slice(0, 8)
      .forEach((line) => {
        if (y < 48) return;
        draw(line, MARGIN, y, 9);
        y -= 12;
      });
  }

  page.drawText("Created with Nota", { x: MARGIN, y: 36, size: 8, font, color: MUTED });
  return doc.save();
}

export function validateInvoice(invoice: Invoice): string | null {
  if (!invoice.from.name.trim()) return "Add your name in From.";
  if (!invoice.to.name.trim()) return "Add who you are billing.";
  const usable = invoice.items.filter((i) => i.description.trim() && i.unitPrice.trim() !== "" && Number.isFinite(Number(i.unitPrice)));
  if (!usable.length) return "Add at least one line item with a price.";
  return null;
}

export function assertSafeLogo(file: File): string | null {
  if (file.size > MAX_LOGO_BYTES) return "Logo must be under 2 MB.";
  if (!/image\/(png|jpeg)/.test(file.type) && !/\.(png|jpe?g)$/i.test(file.name)) {
    return "Logo must be a PNG or JPEG.";
  }
  return null;
}
