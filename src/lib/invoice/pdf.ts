import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { currencyOf, type Invoice } from "./types";
import { lineCents, parseMoney, pdfMoney, totals } from "./math";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const INK = rgb(0.11, 0.1, 0.09);
const MUTED = rgb(0.44, 0.4, 0.37);
const LINE = rgb(0.87, 0.83, 0.78);
const COPPER = rgb(0.49, 0.29, 0.18);

function wrap(text: string, font: { widthOfTextAtSize: (t: string, s: number) => number }, size: number, max: number) {
  const words = text.replace(/\r/g, "").split(/\s+/);
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

export async function buildInvoicePdf(invoice: Invoice, logoBytes?: ArrayBuffer | null) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE_W, PAGE_H]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const { symbol, id: currencyId } = currencyOf(invoice.currency);
  const money = (cents: number) => pdfMoney(cents, currencyId, symbol);
  const t = totals(invoice);

  let y = PAGE_H - MARGIN;

  const draw = (text: string, x: number, yy: number, size = 10, useBold = false) => {
    page.drawText(text, { x, y: yy, size, font: useBold ? bold : font, color: INK });
  };

  page.drawText("INVOICE", { x: MARGIN, y: y - 8, size: 22, font: bold, color: INK });
  page.drawText(invoice.number || "—", { x: PAGE_W - MARGIN - bold.widthOfTextAtSize(invoice.number || "—", 12), y: y - 2, size: 12, font: bold, color: COPPER });
  y -= 36;

  if (logoBytes && logoBytes.byteLength > 24) {
    try {
      const head = new Uint8Array(logoBytes.slice(0, 8));
      const isPng = head[0] === 0x89 && head[1] === 0x50;
      const img = isPng ? await doc.embedPng(logoBytes) : await doc.embedJpg(logoBytes);
      const maxW = 110;
      const maxH = 44;
      const scale = Math.min(maxW / img.width, maxH / img.height);
      page.drawImage(img, { x: PAGE_W - MARGIN - img.width * scale, y: y - 8, width: img.width * scale, height: img.height * scale });
    } catch {
      /* skip bad logo */
    }
  }

  draw(`Issue ${invoice.issueDate || "—"}`, MARGIN, y, 9);
  draw(`Due ${invoice.dueDate || "—"}`, MARGIN + 160, y, 9);
  y -= 28;
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.8, color: LINE });
  y -= 22;

  draw("From", MARGIN, y, 8, true);
  draw("Bill to", 310, y, 8, true);
  y -= 14;
  const fromLines = [invoice.from.name, invoice.from.email, invoice.from.address].filter(Boolean);
  const toLines = [invoice.to.name, invoice.to.email, invoice.to.address].filter(Boolean);
  const partyRows = Math.max(fromLines.length, toLines.length, 1);
  for (let i = 0; i < partyRows; i++) {
    if (fromLines[i]) {
      wrap(fromLines[i]!, font, 10, 240).forEach((line, li) => draw(line, MARGIN, y - li * 12, 10));
    }
    if (toLines[i]) {
      wrap(toLines[i]!, font, 10, 230).forEach((line, li) => draw(line, 310, y - li * 12, 10));
    }
    y -= 14;
  }
  y -= 10;

  const cols = { desc: MARGIN, qty: 360, price: 430, total: 500 };
  page.drawRectangle({ x: MARGIN, y: y - 6, width: PAGE_W - MARGIN * 2, height: 20, color: rgb(0.96, 0.94, 0.91) });
  draw("Description", cols.desc + 4, y, 8, true);
  draw("Qty", cols.qty, y, 8, true);
  draw("Price", cols.price, y, 8, true);
  draw("Amount", cols.total, y, 8, true);
  y -= 22;

  for (const item of invoice.items) {
    if (!item.description && !item.unitPrice) continue;
    const desc = wrap(item.description || "Item", font, 9, 250);
    const amount = money(lineCents(item.qty, item.unitPrice));
    desc.forEach((line, i) => draw(line, cols.desc + 4, y - i * 11, 9));
    draw(item.qty || "0", cols.qty, y, 9);
    draw(money(parseMoney(item.unitPrice)), cols.price, y, 9);
    draw(amount, cols.total, y, 9);
    y -= Math.max(18, desc.length * 11 + 6);
    if (y < 160) break;
  }

  y -= 8;
  page.drawLine({ start: { x: 340, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.6, color: LINE });
  y -= 18;
  const row = (label: string, value: string, strong = false) => {
    page.drawText(label, { x: 360, y, size: 9, font: strong ? bold : font, color: strong ? INK : MUTED });
    page.drawText(value, { x: PAGE_W - MARGIN - (strong ? bold : font).widthOfTextAtSize(value, strong ? 11 : 9), y, size: strong ? 11 : 9, font: strong ? bold : font, color: INK });
    y -= strong ? 20 : 16;
  };
  row("Subtotal", money(t.subtotal));
  if (t.discount) row("Discount", `−${money(t.discount)}`);
  if (t.tax) row(`Tax ${t.taxRate}%`, money(t.tax));
  row("Total", money(t.total), true);

  if (invoice.notes.trim()) {
    y -= 8;
    draw("Notes", MARGIN, y, 8, true);
    y -= 14;
    wrap(invoice.notes, font, 9, PAGE_W - MARGIN * 2).slice(0, 8).forEach((line) => {
      draw(line, MARGIN, y, 9);
      y -= 12;
    });
  }

  page.drawText("Created with Folio Invoice", {
    x: MARGIN,
    y: 36,
    size: 8,
    font,
    color: MUTED,
  });

  return doc.save();
}

export function validateInvoice(invoice: Invoice): string | null {
  if (!invoice.from.name.trim()) return "Add your name in From.";
  if (!invoice.to.name.trim()) return "Add who you are billing.";
  const usable = invoice.items.filter((i) => i.description.trim() && parseFloat(i.unitPrice) >= 0 && i.unitPrice !== "");
  if (!usable.length) return "Add at least one line item with a price.";
  return null;
}
