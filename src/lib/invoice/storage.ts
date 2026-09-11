import { defaultEstimate, defaultInvoice, type Invoice } from "./types";

const INVOICE_KEY = "nota-invoice-draft-v1";
const ESTIMATE_KEY = "nota-estimate-draft-v1";

function read(key: string, fallback: () => Invoice): Invoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Invoice;
    if (!parsed || !parsed.from || !Array.isArray(parsed.items)) return null;
    const base = fallback();
    return { ...base, ...parsed, items: parsed.items.length ? parsed.items : base.items };
  } catch {
    return null;
  }
}

function write(key: string, invoice: Invoice) {
  try {
    localStorage.setItem(key, JSON.stringify(invoice));
  } catch {
    /* quota / private mode */
  }
}

function remove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function loadDraft(): Invoice | null {
  return read(INVOICE_KEY, defaultInvoice);
}
export function saveDraft(invoice: Invoice) {
  write(INVOICE_KEY, invoice);
}
export function clearDraft() {
  remove(INVOICE_KEY);
}

export function loadEstimateDraft(): Invoice | null {
  return read(ESTIMATE_KEY, defaultEstimate);
}
export function saveEstimateDraft(invoice: Invoice) {
  write(ESTIMATE_KEY, invoice);
}
export function clearEstimateDraft() {
  remove(ESTIMATE_KEY);
}
