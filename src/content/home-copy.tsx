import { invoiceFaq } from "@/content/faq";
import { FaqSection } from "@/components/site/FaqSection";
import { HowItWorks } from "@/components/site/HowItWorks";

export const HOME_HOW_TO_STEPS = [
  "Enter your name and address in From, then the client in Bill to.",
  "Set the invoice number, issue date and due date (default is 14 days).",
  "Add line items with a quantity and a unit price. Tax is a percent after a flat discount.",
  "Check the live preview. Download PDF — the file is built in this browser, not on a server.",
];

export function HomeCopy() {
  return (
    <div className="mx-auto mt-4 w-full max-w-5xl px-4 pb-4">
      <HowItWorks steps={HOME_HOW_TO_STEPS} />

      <article className="mt-14 max-w-3xl space-y-5 text-sm leading-relaxed text-ink/90">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Why generate an invoice PDF in the browser
        </h2>
        <p>
          Freelancers still lose hours to Word templates that jump margins, Excel sheets that
          round VAT wrong, and “free” invoice SaaS that locks the PDF behind an account. Nota is
          the opposite shape: one A4 page, filled here, downloaded here. The numbers are qty ×
          price in integer cents so $10.10 × 3 does not become 30.299999. If you have ever had a
          payable clerk reject a file because the total was a pixel off, that is the bug this
          math is for.
        </p>
        <p>
          Cloud generators want the client list, the logo and often the bank details on their
          disk. That is a poor fit when you invoice a hospital, a law firm or a buyer who signed
          an NDA. Nota never posts the form. pdf-lib draws an A4 layout with Noto Sans embedded,
          so “ТОО Акация” and “Studio Atabek” both print instead of throwing a WinAnsi error.
          Selectable text means someone can copy the IBAN from Notes instead of retyping it from
          a screenshot.
        </p>
        <p>
          The file is a normal PDF. Open it in Preview, Adobe Reader or a phone Files app. The
          header says INVOICE plus your number. From is left, Bill to is right. Line items sit
          under a Description / Qty / Price / Amount row. Totals sit on the right: subtotal,
          optional flat discount, optional tax percent, then total. Notes at the bottom are for
          IBAN, Kaspi, PayPal or “net 14”. Extra lines that would fall off the page are omitted
          with a short notice rather than a second blank sheet.
        </p>
        <h2 className="font-display text-2xl font-medium tracking-tight">What this tool is not</h2>
        <p>
          It is not accounting software. It does not email the client, chase late invoices, store
          a customer book or talk to a tax office. It does not watermark the amount. It does not
          cap downloads. If you need recurring invoices with a CRM, use that CRM; export a PDF
          here when you just need one clean page today.
        </p>
        <p>
          Currencies on the form: US dollar, euro, pound sterling and Kazakh tenge. Tenge prints
          as the letters KZT plus the amount so a missing glyph cannot blank the total. Tax is
          applied after discount. Discount is money, not a percent — if you need 10% off, type
          the amount yourself.
        </p>
        <p>
          Optional logo: PNG or JPEG under 2 MB. We read magic bytes, not just the file
          extension, and skip anything else. GIF banners and SVG marks are not embedded. A bad
          logo never blocks the rest of the invoice.
        </p>
        <p>
          Drafts live in this browser’s local storage with a short debounce. Another phone does
          not see them. Tap Start over to wipe the draft. Hosting still records ordinary page
          hits (IP, user-agent) the way every public site does; that log is not your invoice.
        </p>
        <p>
          Longer walkthroughs: <a href="/how-to">how to create an invoice PDF without uploading</a>
          , <a href="/fields">which fields belong on the page</a>, <a href="/tax">tax and
          discount math</a>, <a href="/use-cases">who this is for</a>, and{" "}
          <a href="/iphone">using Nota in Safari on iPhone</a>. Questions sit on the{" "}
          <a href="/faq">FAQ</a>. Mail: <a href="/contact">contact</a>.
        </p>
      </article>
      <FaqSection items={invoiceFaq} />
    </div>
  );
}
