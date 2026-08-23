import { currencyOf, type Invoice } from "@/lib/invoice/types";
import { formatCents, lineCents, totals } from "@/lib/invoice/math";

export function Preview({ invoice }: { invoice: Invoice }) {
  const { symbol } = currencyOf(invoice.currency);
  const t = totals(invoice);
  const money = (c: number) => formatCents(c, symbol);
  const items = invoice.items.filter((i) => i.description || i.unitPrice);

  return (
    <article className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="font-display text-2xl font-medium tracking-tight">Invoice</p>
        <p className="text-right text-sm font-medium text-copper">{invoice.number || "—"}</p>
      </div>
      <p className="mt-2 text-xs text-muted">
        Issue {invoice.issueDate || "—"} · Due {invoice.dueDate || "—"}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-subtle">From</p>
          <p className="mt-1 text-sm font-medium">{invoice.from.name || "Your name"}</p>
          {invoice.from.email ? <p className="text-sm text-muted">{invoice.from.email}</p> : null}
          {invoice.from.address ? <p className="whitespace-pre-line text-sm text-muted">{invoice.from.address}</p> : null}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-subtle">Bill to</p>
          <p className="mt-1 text-sm font-medium">{invoice.to.name || "Client name"}</p>
          {invoice.to.email ? <p className="text-sm text-muted">{invoice.to.email}</p> : null}
          {invoice.to.address ? <p className="whitespace-pre-line text-sm text-muted">{invoice.to.address}</p> : null}
        </div>
      </div>
      <div className="mt-6">
        <div className="hidden border-b border-line text-xs uppercase tracking-wide text-subtle sm:grid sm:grid-cols-[1fr_3rem_5rem_5.5rem] sm:gap-2">
          <span className="py-2 font-medium">Description</span>
          <span className="py-2 font-medium">Qty</span>
          <span className="py-2 font-medium">Price</span>
          <span className="py-2 text-right font-medium">Amount</span>
        </div>
        <ul>
          {(items.length ? items : [{ id: "empty", description: "Line items appear here", qty: "—", unitPrice: "" }]).map((item) => (
            <li key={item.id} className="border-b border-line/70 py-2.5 text-sm sm:grid sm:grid-cols-[1fr_3rem_5rem_5.5rem] sm:gap-2">
              <p className="break-words">{item.description || "—"}</p>
              <p className="text-muted sm:text-ink">
                <span className="sm:hidden">Qty </span>
                {item.qty || "—"}
              </p>
              <p className="text-muted sm:text-ink">
                <span className="sm:hidden">Price </span>
                {item.unitPrice ? money(lineCents("1", item.unitPrice)) : "—"}
              </p>
              <p className="text-right font-medium">
                {item.unitPrice ? money(lineCents(item.qty, item.unitPrice)) : "—"}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <dl className="mt-4 ml-auto w-full max-w-xs space-y-1.5 text-sm">
        <div className="flex justify-between text-muted">
          <dt>Subtotal</dt>
          <dd>{money(t.subtotal)}</dd>
        </div>
        {t.discount ? (
          <div className="flex justify-between text-muted">
            <dt>Discount</dt>
            <dd>−{money(t.discount)}</dd>
          </div>
        ) : null}
        {t.tax ? (
          <div className="flex justify-between text-muted">
            <dt>Tax {t.taxRate}%</dt>
            <dd>{money(t.tax)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between border-t border-line pt-2 font-medium">
          <dt>Total</dt>
          <dd>{money(t.total)}</dd>
        </div>
      </dl>
      {invoice.notes ? <p className="mt-6 whitespace-pre-line text-sm text-muted">{invoice.notes}</p> : null}
    </article>
  );
}
