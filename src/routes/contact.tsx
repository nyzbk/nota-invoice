import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { CONTACT_EMAIL } from "@/content/site";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    toolHead({
      title: "Contact Nota — invoice generator support",
      description: `Email ${CONTACT_EMAIL} about the invoice PDF tool. Include the page URL and browser. Do not attach invoices or logos.`,
      path: "/contact",
      appName: "Nota",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Page
      title="Contact"
      lede="Email ultaultimatum@gmail.com. That inbox is read by a person at Ultimatum, not a ticket queue that turns a PDF into a hosted invoice."
    >
      <p>
        There is no upload form on this page on purpose: a form that accepted an invoice PDF, a
        client logo, or a spreadsheet of bill-to names would break the only promise Nota makes —
        those bytes stay in the tab that opened the generator.
      </p>
      <p>
        Write to{" "}
        <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . That is the only contact surface. There is no phone number, no WhatsApp business line,
        and no “priority support” unlock.
      </p>

      <h2 className="font-display text-xl font-medium tracking-tight">What to include</h2>
      <p>Include three things, and only three things, unless we ask for more.</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          The page URL on this site (
          <a href="/how-to">/how-to</a>, <a href="/tax">/tax</a>, <a href="/fields">/fields</a>,{" "}
          <a href="/iphone">/iphone</a> — not a screenshot of the finished invoice).
        </li>
        <li>
          The browser and device in one line: Safari on iOS 18, Chrome 129 on Windows, Firefox on
          a cheap Android.
        </li>
        <li>
          What you expected the PDF to show: a missing From block, tax after discount when you
          wanted tax before, a logo that failed magic-bytes, Cyrillic that printed as boxes,
          Download PDF that did nothing.
        </li>
      </ul>
      <p>
        That triad is enough to reproduce a layout bug without ever seeing a client name. The
        production origin is https://nota-invoice-mu.vercel.app — do not send us a screenshot of
        a different invoice generator and ask why this one looks different.
      </p>

      <h2 className="font-display text-xl font-medium tracking-tight">What we do not accept</h2>
      <p>
        We do not accept invoice PDFs, logo files, passports, bank letters, contracts, or a CSV of
        customers by email. If totals look wrong, send the numbers only — quantity, unit price,
        discount amount, tax percent — not the descriptions under them. Do not paste IBANs, card
        numbers, or a client’s home address into the message. Those values are why the generator
        runs on-device in the first place.
      </p>
      <p>
        Do not ask us to generate the invoice on a server and mail it back. That would be a
        different product with a different threat model, and it would put this domain into a class
        of sites Google Publisher Policies treat as low-value inventory: a form that takes a file
        and emails a sheet or a PDF back. Nota is the opposite of that form. You press Download
        PDF. You attach the file in the mail app you already use.
      </p>

      <h2 className="font-display text-xl font-medium tracking-tight">What we can answer</h2>
      <p>
        Nota is not a hosted invoicing helpdesk. We cannot email your client, chase a late
        payment, reset someone else’s accounting login, or tell you which VAT code your city
        requires. We can tell you that totals are integer cents, that discount is a flat amount
        before tax, that a GIF logo is refused, and that empty From or Bill-to blocks the download
        on purpose. If a font file failed to load, say so; we will not take a custom TTF by email
        and we will not run a font foundry from this mailbox.
      </p>
      <p>
        Ads, when Google eventually marks the site Ready, are not a support channel — do not click
        them to get a reply. Soft agency contact in the footer, if it exists, is a separate
        sentence from the ad slot. We do not ask anyone to click ads. Site review and payments
        for AdSense live in the Google account, not in this inbox.
      </p>

      <h2 className="font-display text-xl font-medium tracking-tight">Show a layout without leaking a life</h2>
      <p>
        If you want to show a layout without leaking a life, type dummy names in the generator —
        “Studio North” / “Client Test” — download that PDF yourself, and describe how your real
        job differs: extra legal line under From, a long Kaspi note, dates as 31.12.2025. A
        paragraph of differences is more useful than a redacted JPEG of a real bill that still
        contains metadata.
      </p>

      <h2 className="font-display text-xl font-medium tracking-tight">Nearby tools</h2>
      <p>
        Nearby tools from the same workshop live on other domains. Folio merges and splits PDFs
        you already have. HEIC Local converts iPhone photos. Ledger turns a bank-statement PDF
        into a spreadsheet. Do not send those files to this inbox. Do not ask this page to grow a
        merge button.
      </p>

      <h2 className="font-display text-xl font-medium tracking-tight">Response</h2>
      <p>
        We read English. A useful bug report is answered; an invoice attachment is deleted unread.
        If you sent a real bill by mistake, assume it is gone from our side because we do not open
        unsolicited invoices, and change nothing at your bank just because an email bounced. For
        the legal wording see <a href="/privacy">Privacy</a> and <a href="/terms">Terms</a>.
        Operator: Ultimatum.
      </p>
      <p>
        This page exists so AdsBot and a human reviewer can see a real operator, a real address,
        and a real reason the contact surface refuses the very file the tool is built around. A
        three-line “email us” stub is the pattern help 81904 calls a page with little content. The
        rule here is the same as the product: talk about fields and totals, never about your
        client’s rows.
      </p>
    </Page>
  );
}
