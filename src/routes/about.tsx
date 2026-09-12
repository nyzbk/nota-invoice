import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { CONTACT_EMAIL } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("/about"),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Page
      title="About Nota"
      lede="Local-first means the bill is built where you type it. That is a product choice, not a slogan."
    >
      <p>
        Most “free invoice” pages are a funnel into a monthly plan. The PDF is the bait. We
        already run paid work (brand systems, $10k websites, custom apps). Nota exists so a
        freelancer can leave with a file without becoming a lead.
      </p>
      <p>
        This site does one job: turn From, Bill to, dates, line items, a flat discount and a tax
        percent into a single A4 PDF. The library is pdf-lib. Fonts are Noto Sans so a Kazakh or
        Russian legal name does not crash Helvetica. Money is integer cents. Logo is optional PNG
        or JPEG with a 2 MB cap and magic-byte check. If a line would run off the page, we stop
        and say so instead of inventing a second sheet of empty letterhead.
      </p>
      <p>
        Local-first is the same reason people still keep a paper copy: once the file is on their
        disk, a vendor outage does not lock the bill. The cost is that we cannot “restore your
        last ten invoices” from a dashboard. Keep the PDFs you send. If that sounds like too much
        work, a hosted suite is a better fit — we would rather say that than pretend Nota is
        QuickBooks.
      </p>
      <p>
        We do not create accounts. We do not upload invoices. We do not keep a customer book. We
        do not email PDFs. We do not watermark the total. We do not sell invoice contents. Hosting
        logs (IP, user-agent, referrer) may exist for security, like any public site — that is
        not a copy of your bill.
      </p>
      <p>
        Ads, when Google marks the site Ready, sit after a successful download, mid-page and in
        the footer. Until then the slots are labelled placeholders. Auto ads overlays stay off so
        they cannot cover Download PDF. We will not ask you to click an ad.
      </p>
      <p>
        Operator mailbox:{" "}
        <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . Same address as on <a href="/contact">Contact</a>. Do not send files there.
      </p>
      <p>
        One neighbouring tool:{" "}
        <a className="underline underline-offset-4" href="https://folio-pdf-toolkit.vercel.app">
          Folio
        </a>{" "}
        merges, splits and compresses PDFs in the browser. Different name, different job. Invoice
        is Nota, not Folio.
      </p>
    </Page>
  );
}
