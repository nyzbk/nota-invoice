import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/use-cases")({
  head: () => pageHead("/use-cases"),
  component: UseCasesPage,
});

function UseCasesPage() {
  return (
    <Page
      title="Use cases: one invoice, no product account"
      lede="Nota is for people who already did the work and need a PDF the buyer can open. It is not a replacement for a bookkeeping suite."
    >
      <h2 className="font-display text-xl font-medium tracking-tight">Freelance design and copy</h2>
      <p>
        A brand job closes on Friday. The client’s AP desk wants a PDF with a PO number in the
        notes, a 12% tax line and a due date. You are not going to migrate their vendor portal for
        one file. Fill From with the studio name (Cyrillic is fine), Bill to with the legal entity,
        one or two lines (“Identity system, week 3”), tax 12, notes with the PO. Download. Attach
        in the thread you already have.
      </p>
      <h2 className="font-display text-xl font-medium tracking-tight">Contractors billing in KZT</h2>
      <p>
        Tenge is a first-class currency on this form, not an afterthought USD conversion. The PDF
        prints KZT and a two-decimal amount. Discount is a flat tenge amount so a “loyalty 5 000”
        line does not fight a percent. If your tax office wants a BIN on the page, put it in
        Address or Notes — we do not invent tax IDs.
      </p>
      <h2 className="font-display text-xl font-medium tracking-tight">On a job with only a phone</h2>
      <p>
        Safari on iPhone can fill the form and save the PDF to Files. That is the whole point of
        client-side generation when you are not at a laptop. See the{" "}
        <a href="/iphone">iPhone guide</a> for the download sheet and popup quirks.
      </p>
      <h2 className="font-display text-xl font-medium tracking-tight">Agency billing a client</h2>
      <p>
        An agency already has a contract. They need a dated invoice that matches a milestone, not
        another login for the intern. Use invoice numbers you control (INV-20260828-004). Put
        payment details once in Notes. Keep the logo under 2 MB PNG. Do not paste the whole
        statement of work into the line-item list — A4 will clip it.
      </p>
      <h2 className="font-display text-xl font-medium tracking-tight">A late-payment reminder</h2>
      <p>
        Re-open the draft in this browser, change the due date, add “second notice” in Notes,
        download again. There is no dunning sequence here. That is a feature: we do not store the
        debtor list.
      </p>
      <p>
        If your life is 200 invoices a month with reminders and tax filings, buy software built
        for that. If you need one honest page today, use the <a href="/">generator</a>.
      </p>
    </Page>
  );
}
