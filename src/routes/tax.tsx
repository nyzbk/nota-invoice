import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/tax")({
  head: () =>
    toolHead({
      title: "Invoice tax and discount math — Nota",
      description:
        "Qty × price in integer cents. Flat discount capped at subtotal. Tax percent after discount. Worked example: 2 × 1500 − 100 + 12% = 3248.",
      path: "/tax",
      appName: "Nota",
    }),
  component: TaxPage,
});

function TaxPage() {
  return (
    <Page
      title="How tax and discount are calculated"
      lede="Floating-point money is how Excel prints 29.999. Nota stores amounts as integer cents, then formats them for the PDF."
    >
      <p>
        Each line: parse quantity (comma stripped), parse unit price as a non-negative number,
        multiply, round to cents. Rows without a numeric price are ignored at download time even
        if they still show in the form.
      </p>
      <p>
        Subtotal is the sum of those line cents. Discount is parsed the same way as money and then
        clamped so it cannot exceed the subtotal. You cannot discount a zero invoice into a
        negative total.
      </p>
      <p>
        Tax percent is a number such as 12 meaning twelve percent. It is applied to (subtotal −
        discount), then rounded to cents. Total = after-discount + tax. There is no compound tax,
        no withholding line, no reverse charge flag.
      </p>
      <h2 className="font-display text-xl font-medium tracking-tight">Worked example</h2>
      <p>
        Two units at 1 500.00, discount 100.00, tax 12%. Subtotal 3 000.00. After discount 2
        900.00. Tax 348.00. Total 3 248.00. That path is covered by the generator’s own check
        script so a future layout change cannot silently ship 3 247.99.
      </p>
      <p>
        Discount is not a percent field. If a client earned 10% off a 3 000 subtotal, type 300 in
        Discount. Mixing “10” into that box would subtract ten currency units, not ten percent —
        which is the correct reading of a money field, and a common support mix-up.
      </p>
      <p>
        KZT uses the same cents path (tiyn). The PDF prints <code>KZT 3248.00</code> rather than a
        lone ₸ that some viewers lack. USD, EUR and GBP print their symbols in Noto Sans.
      </p>
      <p>
        This is not tax advice. Reduced rates, exemptions and digital-services VAT are your
        accountant’s job. Nota will happily print 0% if you leave Tax blank.
      </p>
      <p>
        Worked order is always subtotal, then flat discount, then tax percent of what remains.
        Changing the percent does not change the order. A “price includes VAT” workflow belongs in
        software with tax codes per line. Do not split one service into two rows just to fake a
        different order — the sheet will still add the same way, and the PDF will look like two
        jobs. Currency is a label plus integer minor units. KZT prints as letters plus the number
        so a missing tenge glyph cannot blank the total.
      </p>
      <p>
        Back to the <a href="/">form</a> or the <a href="/fields">field list</a>.
      </p>
    </Page>
  );
}
