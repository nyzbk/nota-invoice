export const CURRENCIES = [
  { id: "USD", symbol: "$", label: "USD $" },
  { id: "EUR", symbol: "€", label: "EUR €" },
  { id: "GBP", symbol: "£", label: "GBP £" },
  { id: "KZT", symbol: "₸", label: "KZT ₸" },
] as const;

export type CurrencyId = (typeof CURRENCIES)[number]["id"];

export type Party = {
  name: string;
  email: string;
  address: string;
};

export type LineItem = {
  id: string;
  description: string;
  qty: string;
  unitPrice: string;
};

export type Invoice = {
  number: string;
  issueDate: string;
  dueDate: string;
  currency: CurrencyId;
  from: Party;
  to: Party;
  items: LineItem[];
  discount: string;
  taxPercent: string;
  notes: string;
};

export function isoDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

export function newItem(): LineItem {
  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`;
  return { id, description: "", qty: "1", unitPrice: "" };
}

export function defaultInvoice(): Invoice {
  const issue = isoDate();
  const stamp = issue.replace(/-/g, "");
  return {
    number: `INV-${stamp}-001`,
    issueDate: issue,
    dueDate: addDays(issue, 14),
    currency: "USD",
    from: { name: "", email: "", address: "" },
    to: { name: "", email: "", address: "" },
    items: [{ id: "item-1", description: "", qty: "1", unitPrice: "" }],
    discount: "",
    taxPercent: "",
    notes: "",
  };
}

export function currencyOf(id: CurrencyId) {
  return CURRENCIES.find((c) => c.id === id) ?? CURRENCIES[0];
}
