import { Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdUnit } from "@/components/ads/AdUnit";
import { Area, Field } from "@/components/invoice/Field";
import { Preview } from "@/components/invoice/Preview";
import { Button } from "@/components/ui/button";
import { assertSafeLogo, buildInvoicePdf, validateEstimate } from "@/lib/invoice/pdf";
import { clearEstimateDraft, loadEstimateDraft, saveEstimateDraft } from "@/lib/invoice/storage";
import {
  CURRENCIES,
  addDays,
  defaultEstimate,
  newItem,
  type Invoice,
} from "@/lib/invoice/types";
import { bytesToBlob, downloadBlob, stampFilename } from "@/lib/utils";

export function EstimateApp() {
  const [invoice, setInvoice] = useState<Invoice>(() => defaultEstimate());
  const [hydrated, setHydrated] = useState(false);
  const [logo, setLogo] = useState<ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const draft = loadEstimateDraft();
    if (draft) setInvoice(draft);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => saveEstimateDraft(invoice), 250);
    return () => window.clearTimeout(t);
  }, [invoice, hydrated]);

  const patch = (partial: Partial<Invoice>) => {
    setInvoice((prev) => ({ ...prev, ...partial }));
    setDone(false);
    setError(null);
  };

  const patchParty = (side: "from" | "to", key: "name" | "email" | "address", value: string) => {
    setInvoice((prev) => ({ ...prev, [side]: { ...prev[side], [key]: value } }));
    setDone(false);
  };

  const patchItem = (id: string, key: "description" | "qty" | "unitPrice", value: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }));
    setDone(false);
  };

  const filename = useMemo(
    () => stampFilename(invoice.number || "estimate", "nota-estimate", "pdf"),
    [invoice.number],
  );

  async function onDownload() {
    const message = validateEstimate(invoice);
    if (message) {
      setError(message);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const bytes = await buildInvoicePdf(invoice, logo, "estimate");
      downloadBlob(bytesToBlob(bytes, "application/pdf"), filename);
      setDone(true);
    } catch {
      setError("Could not build this PDF. Try removing the logo or shortening notes.");
    } finally {
      setBusy(false);
    }
  }

  function onReset() {
    clearEstimateDraft();
    setInvoice(defaultEstimate());
    setLogo(null);
    setDone(false);
    setError(null);
  }

  return (
    <main className="mx-auto w-full max-w-5xl overflow-x-hidden px-4 py-8">
      <h1 className="font-display text-[1.75rem] font-medium leading-tight tracking-tight sm:text-4xl">
        Write an estimate, not a bill
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
        This page prints an ESTIMATE PDF in the tab. It is not a tax invoice and not a demand for
        payment. Totals use the same integer-cent math as the invoice generator. The title, the
        number prefix EST-, and Valid until are different on purpose.
      </p>
      <p className="mt-4 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink">
        Need a bill instead?{" "}
        <a href="/" className="underline underline-offset-4">
          Create an invoice PDF
        </a>
        {" · "}
        <a href="/tax" className="underline underline-offset-4">
          How tax is calculated
        </a>
        {" · "}
        <a href="/contact" className="underline underline-offset-4">
          Contact
        </a>
      </p>

      {!hydrated ? (
        <p className="mt-8 text-sm text-muted">Loading the form…</p>
      ) : (
        <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <form
            className="min-w-0 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              void onDownload();
            }}
          >
            <EstimateFields
              invoice={invoice}
              patch={patch}
              patchParty={patchParty}
              patchItem={patchItem}
              setLogo={setLogo}
              setError={setError}
            />
            {error ? (
              <p role="alert" className="text-sm text-danger">
                {error}
              </p>
            ) : null}
            <div className="sticky bottom-3 z-10 flex flex-col gap-3 rounded-lg border border-line bg-paper/95 p-3 shadow-soft backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
              <Button type="submit" className="min-h-12 w-full sm:w-auto sm:px-10" disabled={busy}>
                {busy ? "Building PDF…" : "Download estimate PDF"}
              </Button>
              <Button type="button" variant="ghost" onClick={onReset}>
                Start over
              </Button>
            </div>
          </form>
          <div className="lg:sticky lg:top-4 lg:self-start">
            <Preview invoice={invoice} kind="estimate" />
          </div>
        </div>
      )}

      {done ? (
        <section className="mt-8 rounded-xl border border-ok/30 bg-surface p-5">
          <h2 className="font-display text-xl font-medium">Estimate PDF ready</h2>
          <p className="mt-1 text-sm text-muted">
            The file is titled ESTIMATE. It is not a tax invoice. If the download did not start, tap
            again.
          </p>
          <Button type="button" className="mt-4" onClick={() => void onDownload()}>
            Download again
          </Button>
          <AdUnit slot="after-success" className="mt-6" />
        </section>
      ) : null}

      <AdUnit slot="mid" className="mt-10" />
    </main>
  );
}

function EstimateFields({
  invoice,
  patch,
  patchParty,
  patchItem,
  setLogo,
  setError,
}: {
  invoice: Invoice;
  patch: (partial: Partial<Invoice>) => void;
  patchParty: (side: "from" | "to", key: "name" | "email" | "address", value: string) => void;
  patchItem: (id: string, key: "description" | "qty" | "unitPrice", value: string) => void;
  setLogo: (bytes: ArrayBuffer | null) => void;
  setError: (msg: string | null) => void;
}) {
  return (
    <>
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-sm font-medium">From</h2>
          <Field label="Name" value={invoice.from.name} onChange={(e) => patchParty("from", "name", e.target.value)} />
          <Field label="Email" type="email" value={invoice.from.email} onChange={(e) => patchParty("from", "email", e.target.value)} />
          <Field label="Address" value={invoice.from.address} onChange={(e) => patchParty("from", "address", e.target.value)} />
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-medium">Prepared for</h2>
          <Field label="Name" value={invoice.to.name} onChange={(e) => patchParty("to", "name", e.target.value)} />
          <Field label="Email" type="email" value={invoice.to.email} onChange={(e) => patchParty("to", "email", e.target.value)} />
          <Field label="Address" value={invoice.to.address} onChange={(e) => patchParty("to", "address", e.target.value)} />
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <Field label="Estimate number" value={invoice.number} onChange={(e) => patch({ number: e.target.value })} />
        <Field label="Issue date" type="date" value={invoice.issueDate} onChange={(e) => patch({ issueDate: e.target.value })} />
        <Field
          label="Valid until"
          type="date"
          value={invoice.dueDate}
          onChange={(e) => patch({ dueDate: e.target.value || addDays(invoice.issueDate, 30) })}
        />
      </section>
      <label className="block text-sm">
        <span className="text-xs font-medium text-muted">Currency</span>
        <select
          className="mt-1 min-h-11 w-full rounded-md border border-line bg-surface px-3 text-sm"
          value={invoice.currency}
          onChange={(e) => patch({ currency: e.target.value as Invoice["currency"] })}
        >
          {CURRENCIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id} ({c.symbol})
            </option>
          ))}
        </select>
      </label>
      <section>
        <h2 className="text-sm font-medium">Line items</h2>
        <ul className="mt-3 space-y-4">
          {invoice.items.map((item) => (
            <li key={item.id} className="rounded-lg border border-line bg-surface p-3">
              <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_5rem_7rem_2.75rem]">
                <Field
                  label="Description"
                  value={item.description}
                  onChange={(e) => patchItem(item.id, "description", e.target.value)}
                />
                <Field label="Qty" inputMode="decimal" value={item.qty} onChange={(e) => patchItem(item.id, "qty", e.target.value)} />
                <Field
                  label="Price"
                  inputMode="decimal"
                  value={item.unitPrice}
                  onChange={(e) => patchItem(item.id, "unitPrice", e.target.value)}
                />
                <button
                  type="button"
                  className="mt-6 flex size-11 items-center justify-center rounded-md text-muted hover:bg-ink/5 hover:text-danger"
                  aria-label="Remove item"
                  onClick={() =>
                    patch({ items: invoice.items.length > 1 ? invoice.items.filter((i) => i.id !== item.id) : [newItem()] })
                  }
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-copper"
          onClick={() => patch({ items: [...invoice.items, newItem()] })}
        >
          <Plus className="size-4" /> Add item
        </button>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <Field label="Discount (amount)" inputMode="decimal" value={invoice.discount} onChange={(e) => patch({ discount: e.target.value })} />
        <Field label="Tax %" inputMode="decimal" value={invoice.taxPercent} onChange={(e) => patch({ taxPercent: e.target.value })} />
      </section>
      <Area label="Notes / scope" value={invoice.notes} onChange={(e) => patch({ notes: e.target.value })} />
      <label className="block text-sm">
        <span className="text-xs font-medium text-muted">Logo (optional, stays on device)</span>
        <input
          type="file"
          accept="image/png,image/jpeg"
          className="mt-1 block w-full max-w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:text-paper"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) {
              setLogo(null);
              return;
            }
            const problem = assertSafeLogo(file);
            if (problem) {
              setError(problem);
              e.target.value = "";
              setLogo(null);
              return;
            }
            setLogo(await file.arrayBuffer());
          }}
        />
      </label>
    </>
  );
}
