import type { Invoice } from "./types";

export function parseMoney(raw: string): number {
  const n = Number(String(raw).replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100);
}

export function parseQty(raw: string): number {
  const n = Number(String(raw).replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export function lineCents(qty: string, unitPrice: string): number {
  return Math.round(parseQty(qty) * parseMoney(unitPrice));
}

export function totals(invoice: Invoice) {
  const subtotal = invoice.items.reduce((sum, item) => sum + lineCents(item.qty, item.unitPrice), 0);
  const discount = Math.min(parseMoney(invoice.discount), subtotal);
  const afterDiscount = subtotal - discount;
  const taxPct = Number(String(invoice.taxPercent).replace(/,/g, "").trim());
  const taxRate = Number.isFinite(taxPct) && taxPct > 0 ? taxPct : 0;
  const tax = Math.round(afterDiscount * (taxRate / 100));
  const total = afterDiscount + tax;
  return { subtotal, discount, tax, total, taxRate };
}

export function formatCents(cents: number, symbol: string) {
  const n = cents / 100;
  const body = n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${symbol}${body}`;
}

export function pdfMoney(cents: number, currencyId: string, symbol: string) {
  const body = (cents / 100).toFixed(2);
  if (currencyId === "KZT") return `KZT ${body}`;
  return `${symbol}${body}`;
}
