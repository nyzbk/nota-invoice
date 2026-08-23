import { defaultInvoice, type Invoice } from "./types";

const KEY = "nota-invoice-draft-v1";

export function loadDraft(): Invoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Invoice;
    if (!parsed || !parsed.from || !Array.isArray(parsed.items)) return null;
    return { ...defaultInvoice(), ...parsed, items: parsed.items.length ? parsed.items : defaultInvoice().items };
  } catch {
    return null;
  }
}

export function saveDraft(invoice: Invoice) {
  try {
    localStorage.setItem(KEY, JSON.stringify(invoice));
  } catch {
    /* quota / private mode */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
